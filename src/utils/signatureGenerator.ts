import type { SignatureData } from '../types';

// Social media icon URLs (using reliable CDN)
const ICONS = {
  linkedin:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%230077B5" viewBox="0 0 24 24"%3E%3Cpath d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/%3E%3C/svg%3E',
  facebook:
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%231877F2" viewBox="0 0 24 24"%3E%3Cpath d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/%3E%3C/svg%3E',
  x: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="%23000000" viewBox="0 0 24 24"%3E%3Cpath d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/%3E%3C/svg%3E',
};

export const generateSignatureHTML = (data: SignatureData): string => {
  const { name, jobRole, phone, logoBase64, linkedinUrl, facebookUrl, xUrl } = data;

  // Build social media icons
  const socialIcons = [];
  if (linkedinUrl) {
    socialIcons.push(
      `<a href="${linkedinUrl}" style="text-decoration: none; margin-right: 8px;"><img src="${ICONS.linkedin}" alt="LinkedIn" width="24" height="24" style="display: inline-block; vertical-align: middle; border: 0;"></a>`
    );
  }
  if (facebookUrl) {
    socialIcons.push(
      `<a href="${facebookUrl}" style="text-decoration: none; margin-right: 8px;"><img src="${ICONS.facebook}" alt="Facebook" width="24" height="24" style="display: inline-block; vertical-align: middle; border: 0;"></a>`
    );
  }
  if (xUrl) {
    socialIcons.push(
      `<a href="${xUrl}" style="text-decoration: none;"><img src="${ICONS.x}" alt="X" width="24" height="24" style="display: inline-block; vertical-align: middle; border: 0;"></a>`
    );
  }

  const socialRow =
    socialIcons.length > 0
      ? `<tr><td colspan="2" style="padding-top: 10px;">${socialIcons.join('')}</td></tr>`
      : '';

  const logoCell = logoBase64
    ? `<td style="padding-right: 20px; vertical-align: top;"><img src="${logoBase64}" alt="Company Logo" width="80" height="80" style="display: block; border: 0;"></td>`
    : '';

  return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; line-height: 1.5;">
  <tr>
    ${logoCell}
    <td style="vertical-align: top;">
      <table cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size: 16px; font-weight: bold; color: #2c3e50; padding-bottom: 4px;">${name}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; color: #7f8c8d; padding-bottom: 8px;">${jobRole}</td>
        </tr>
        <tr>
          <td style="font-size: 14px; color: #2c3e50;">
            <span style="color: #3498db;">📞</span> ${phone}
          </td>
        </tr>
        ${socialRow}
      </table>
    </td>
  </tr>
</table>
`.trim();
};
