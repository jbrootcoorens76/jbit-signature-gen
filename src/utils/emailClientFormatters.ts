import type { ExportFormat } from '../types';

export const EMAIL_CLIENTS: ExportFormat[] = [
  {
    client: 'outlook-windows',
    label: 'Outlook (Windows)',
    instructions: `
1. Open Outlook
2. Click File > Options > Mail > Signatures
3. Click "New" to create a new signature
4. Paste the copied HTML in the signature editor
5. Click OK to save
    `.trim(),
  },
  {
    client: 'outlook-mac',
    label: 'Outlook (Mac)',
    instructions: `
1. Open Outlook
2. Click Outlook > Preferences > Signatures
3. Click the "+" button to create a new signature
4. Paste the copied HTML in the signature editor
5. Close the preferences to save
    `.trim(),
  },
  {
    client: 'apple-mail',
    label: 'Apple Mail',
    instructions: `
1. Open Mail app
2. Click Mail > Settings > Signatures
3. Click the "+" button to add a new signature
4. Paste the copied HTML in the signature editor
5. Close preferences to save
    `.trim(),
  },
  {
    client: 'gmail',
    label: 'Gmail (Web)',
    instructions: `
1. Open Gmail in your browser
2. Click the gear icon > See all settings
3. Scroll to the "Signature" section
4. Click "Create new" signature
5. Paste the copied HTML
6. Scroll down and click "Save Changes"
    `.trim(),
  },
];

export const copyToClipboard = async (html: string): Promise<void> => {
  // Create a blob with HTML MIME type
  const blob = new Blob([html], { type: 'text/html' });
  const plainTextBlob = new Blob([html], { type: 'text/plain' });

  // Use the Clipboard API with both HTML and plain text
  const clipboardItem = new ClipboardItem({
    'text/html': blob,
    'text/plain': plainTextBlob,
  });

  await navigator.clipboard.write([clipboardItem]);
};
