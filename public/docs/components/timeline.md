# Timeline

> Chronological event feed with pulse nodes and packet connectors.

- **Category**: Data & Feedback
- **Import**: `import { Timeline, TimelineActionNode, TimelineAvatarNode, TimelineBody } from "@/components/ui/timeline";`
- **Source**: `src/components/ui/timeline/index.ts`
- **Dependencies**: `react`

## Defining Constraint

Connects chronological milestones using compositor-pure pulse nodes and continuous vertical connector stems with zero paint-filter repaints.

## When to Use

- Deployment pipelines, git commit histories, audit logs, and workflow execution traces.
- Ordered milestone feeds mixing avatar actors, commit hashes, and live status nodes.

## When Not to Use (Use Instead)

| Alternative               | Reason                                                                    |
| :------------------------ | :------------------------------------------------------------------------ |
| [table](table.md)         | Use Table when comparing flat tabular fields across many uniform records. |
| [accordion](accordion.md) | Use Accordion for static Q&A disclosure sections.                         |

## Anatomy

```tsx
<Timeline>
  <TimelineItem>
    <TimelineIndicator status="success" />
    <TimelineConnector />
    <TimelineContent>
      <TimelineTitle>Checks Passed</TimelineTitle>
      <TimelineDescription>61 test suites green.</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

## Verified Example

```tsx
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineTitle,
} from "@/components/ui/timeline";

export function TimelineExample() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineIndicator status="success" />
        <TimelineConnector />
        <TimelineContent>
          <TimelineTitle>AST Specs Verified</TimelineTitle>
          <TimelineDescription>57 component specs compiled cleanly.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineIndicator status="primary" />
        <TimelineContent>
          <TimelineTitle>Invariants Passing</TimelineTitle>
          <TimelineDescription>18 directives verified at zero warnings.</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
```

## Props Reference

| Prop               | Type                                                                | Required | Description                              |
| :----------------- | :------------------------------------------------------------------ | :------- | :--------------------------------------- |
| `fallback`         | `string`                                                            | Yes      | Configures fallback on Timeline.         |
| `label`            | `string`                                                            | Yes      | Configures label on Timeline.            |
| `activeFlow`       | `boolean`                                                           | No       | Configures activeFlow on Timeline.       |
| `badgeIcon`        | `React.ReactNode`                                                   | No       | Configures badgeIcon on Timeline.        |
| `badgeStatus`      | `"default" \| "primary" \| "success" \| "warning" \| "destructive"` | No       | Configures badgeStatus on Timeline.      |
| `connectorStatus`  | `TimelineConnectorStatus`                                           | No       | Configures connectorStatus on Timeline.  |
| `connectorVariant` | `TimelineConnectorVariant`                                          | No       | Configures connectorVariant on Timeline. |
| `disabled`         | `boolean`                                                           | No       | Configures disabled on Timeline.         |
| `dotVariant`       | `"solid" \| "ring" \| "glow"`                                       | No       | Configures dotVariant on Timeline.       |
| `heartbeat`        | `boolean`                                                           | No       | Configures heartbeat on Timeline.        |
| `icon`             | `React.ReactNode`                                                   | No       | Configures icon on Timeline.             |
| `interactive`      | `boolean`                                                           | No       | Configures interactive on Timeline.      |
| `isLast`           | `boolean`                                                           | No       | Configures isLast on Timeline.           |
| `onClick`          | `(e: React.MouseEvent<HTMLButtonElement>) => void`                  | No       | Configures onClick on Timeline.          |
| `progress`         | `number \| "indeterminate"`                                         | No       | Configures progress on Timeline.         |
| `pulse`            | `boolean`                                                           | No       | Configures pulse on Timeline.            |
| `size`             | `TimelineSize`                                                      | No       | Configures size on Timeline.             |
| `src`              | `string`                                                            | No       | Configures src on Timeline.              |
| `state`            | `"pending" \| "current" \| "completed"`                             | No       | Configures state on Timeline.            |
| `status`           | `TimelineConnectorStatus`                                           | No       | Configures status on Timeline.           |
| `step`             | `number`                                                            | No       | Configures step on Timeline.             |
| `variant`          | `TimelineConnectorVariant`                                          | No       | Configures variant on Timeline.          |

## Accessibility Contract

- Uses semantic list hierarchy connecting TimelineTitle and TimelineDescription cleanly.
- Avoids cramming dense multi-word strings into 28px indicator circles.

## Do and Don't

| Do                                                                                                 | Don't                                                                     |
| :------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| Pair TimelineAvatarNode or TimelineCommitNode for rich actor/sha attribution cleanly inside stems. | Omit TimelineConnector between intermediate sequential steps.             |
| Place detailed logs in TimelineBody/TimelineDescription rather than inside indicator circles.      | Animate non-compositor filter or layout properties on active pulse nodes. |

## Slots & Pairing

Exports TimelineItem, TimelineIndicator, TimelineConnector, TimelineContent, TimelineTitle, TimelineDescription, and node variants.
