# Inspiration Workbench (`inspiration/`)

> [!NOTE]
> **Temporary Workspace**: This directory is an internal staging ground used exclusively during the design and development phase of the design system. It contains reference implementations, spring curves, micro-interaction snippets, and design patterns lifted from world-class designers and engineering teams.
>
> **This entire directory will be removed prior to the final public release.**

---

## 📁 Recommended Structure

```text
inspiration/
├── emilkowalski/          # Micro-interactions, spring curves, sonner/vaul physics, gestures
├── impeccable/            # Typography, layout precision, editorial spacing, craft heuristics
├── vercel/                # Geist design system tokens, monochrome depth, optical borders
├── apple/                 # Human Interface Guidelines, translucency, materials, haptics
└── snippets/              # Ad-hoc code snippets, shaders, SVG filters, raw CSS experiments
```

---

## 🎯 How to Use This Directory

1. **Drop Reference Files**:
   - Copy component code, hooks, animation configs, or CSS files directly into the relevant subfolder.
2. **LLM Reference Grounding**:
   - When instructing the agent (or using LLM skills), reference these files directly (e.g., *"Extract the spring physics and drag mechanics from `inspiration/emilkowalski/fluid-tabs.tsx` and adapt it into our Base UI Tabs primitive"*).
3. **De-slop Benchmark**:
   - Compare new components against these reference files to ensure our implementation matches or exceeds this caliber of craft.
4. **Cleanup**:
   - When the design system is fully built, simply delete this directory:
     ```bash
     rm -rf inspiration
     ```
