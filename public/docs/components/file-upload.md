# FileUpload

> Drag-and-drop asset uploader with client-side validation and progress state.

- **Category**: Forms & Input
- **Import**: `import { FileUpload, formatAcceptedTypes, formatFileSize } from "@/components/ui/file-upload";`
- **Source**: `src/components/ui/file-upload.tsx`
- **Dependencies**: `react`

## Defining Constraint

Validates accepted MIME types and maximum byte size client-side inside an accessible drag-and-drop region backed by a visually hidden file input.

## When to Use

- Uploading JSON token themes, CSV datasets, images, or PDF reports with client validation.
- Accepting dropped assets alongside explicit file dialogue fallback buttons.

## When Not to Use (Use Instead)

| Alternative       | Reason                                             |
| :---------------- | :------------------------------------------------- |
| [input](input.md) | Use standard Input for short text strings or URLs. |

## Anatomy

```tsx
<FileUpload
  title="Drop token preset"
  description="JSON files up to 5MB"
  accept=".json"
  onFilesSelected={handleFiles}
/>
```

## Verified Example

```tsx
import { FileUpload } from "@/components/ui/file-upload";

export function FileUploadExample() {
  return (
    <div className="w-full max-w-md">
      <FileUpload
        title="Upload OKLCH theme preset"
        description="JSON token bundles up to 2MB"
        accept=".json"
        aria-label="Upload OKLCH theme preset file"
      />
    </div>
  );
}
```

## Props Reference

| Prop          | Type                          | Required | Description                           |
| :------------ | :---------------------------- | :------- | :------------------------------------ |
| `accept`      | `string`                      | No       | Configures accept on FileUpload.      |
| `description` | `React.ReactNode`             | No       | Configures description on FileUpload. |
| `disabled`    | `boolean`                     | No       | Configures disabled on FileUpload.    |
| `maxFiles`    | `number`                      | No       | Configures maxFiles on FileUpload.    |
| `maxSizeMB`   | `number`                      | No       | Configures maxSizeMB on FileUpload.   |
| `onChange`    | `(files: FileItem[]) => void` | No       | Configures onChange on FileUpload.    |
| `title`       | `React.ReactNode`             | No       | Configures title on FileUpload.       |
| `value`       | `FileItem[]`                  | No       | Configures value on FileUpload.       |

## Accessibility Contract

- Provides keyboard-focusable button/dropzone activation plus explicit aria-label support.
- Validation errors announce clearly without silently swallowing rejected files.

## Do and Don't

| Do                                                                          | Don't                                                                              |
| :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Specify concrete accept filters and maxSize limits matching backend limits. | Leave uploaded file names invisible after selection.                               |
| Display explicit unit constraints in description copy.                      | Require drag-and-drop only; always preserve click/keyboard file dialogue fallback. |

## Slots & Pairing

Pairs with Progress bars when uploading multi-megabyte bundles asynchronously.
