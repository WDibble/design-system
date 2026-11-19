// @vitest-environment node
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import readline from "node:readline";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number;
  result?: {
    protocolVersion?: string;
    tools?: { name: string }[];
    content?: { type: string; text: string }[];
    contents?: { uri: string; text: string }[];
    isError?: boolean;
  };
  error?: { code: number; message: string };
}

class StdioMcpClient {
  private proc: ChildProcessWithoutNullStreams;
  private pending = new Map<number, (res: JsonRpcResponse) => void>();
  private nextId = 1;

  constructor() {
    this.proc = spawn(process.execPath, ["scripts/mcp-server.mjs"], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    const rl = readline.createInterface({ input: this.proc.stdout });
    rl.on("line", (line) => {
      if (!line.trim()) return;
      const msg = JSON.parse(line) as JsonRpcResponse;
      const resolver = this.pending.get(msg.id);
      if (resolver) {
        this.pending.delete(msg.id);
        resolver(msg);
      }
    });
  }

  request(method: string, params?: Record<string, unknown>): Promise<JsonRpcResponse> {
    const id = this.nextId++;
    return new Promise((resolve) => {
      this.pending.set(id, resolve);
      this.proc.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
    });
  }

  notify(method: string, params?: Record<string, unknown>) {
    this.proc.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", method, params })}\n`);
  }

  close() {
    this.proc.stdin.end();
    this.proc.kill();
  }
}

describe("Design System Local MCP Server", () => {
  let client: StdioMcpClient;

  beforeAll(() => {
    client = new StdioMcpClient();
  });

  afterAll(() => {
    client.close();
  });

  it("initialises over stdio and lists all four tools", async () => {
    const init = await client.request("initialize", {
      protocolVersion: "2024-11-05",
      clientInfo: { name: "vitest", version: "1.0.0" },
      capabilities: {},
    });
    expect(init.result?.protocolVersion).toBe("2024-11-05");
    client.notify("notifications/initialized");

    const tools = await client.request("tools/list");
    const names = tools.result?.tools?.map((t) => t.name) ?? [];
    expect(names).toEqual([
      "recommend_components",
      "get_component_spec",
      "search_icons",
      "validate_snippet",
    ]);
  });

  it("recommends alert-dialog for destructive delete confirmations and returns full spec markdown", async () => {
    const rec = await client.request("tools/call", {
      name: "recommend_components",
      arguments: { query: "destructive delete confirmation modal" },
    });
    const payload = JSON.parse(rec.result?.content?.[0]?.text ?? "{}");
    const slugs = payload.recommendations.map((r: { slug: string }) => r.slug);
    expect(slugs).toContain("alert-dialog");

    const spec = await client.request("tools/call", {
      name: "get_component_spec",
      arguments: { slug: "button" },
    });
    const md = spec.result?.content?.[0]?.text ?? "";
    expect(md).toContain("# Button");
    expect(md).toContain("## Defining Constraint");
    expect(md).toContain("## Verified Example");
  });

  it("searches kinetic icons and validates JSX snippets against static invariants", async () => {
    const iconsRes = await client.request("tools/call", {
      name: "search_icons",
      arguments: { query: "sparkles" },
    });
    const iconsPayload = JSON.parse(iconsRes.result?.content?.[0]?.text ?? "{}");
    expect(iconsPayload.icons.some((i: { symbol: string }) => i.symbol === "SparklesIcon")).toBe(
      true
    );

    const invalidRes = await client.request("tools/call", {
      name: "validate_snippet",
      arguments: {
        code: `import { SparklesIcon } from "@/components/icons";\nexport const Bad = () => <button className="hover:font-bold"><SparklesIcon /></button>;`,
      },
    });
    const invalidPayload = JSON.parse(invalidRes.result?.content?.[0]?.text ?? "{}");
    expect(invalidPayload.valid).toBe(false);
    expect(invalidPayload.violationCount).toBeGreaterThanOrEqual(2);

    const validRes = await client.request("tools/call", {
      name: "validate_snippet",
      arguments: {
        code: `import { SparklesIcon } from "@/components/icons";\nexport const Good = () => <SparklesIcon size={16} />;`,
      },
    });
    const validPayload = JSON.parse(validRes.result?.content?.[0]?.text ?? "{}");
    expect(validPayload.valid).toBe(true);
  });

  it("reads component manual resources over design-system:// URIs", async () => {
    const res = await client.request("resources/read", {
      uri: "design-system://components/alert-dialog",
    });
    const text = res.result?.contents?.[0]?.text ?? "";
    expect(text).toContain("# AlertDialog");
    expect(text).toContain("AlertDialogTrigger");
  });
});
