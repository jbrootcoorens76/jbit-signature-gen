import type { SignatureData } from '../types';

// Social media icon URLs - using reliable hosted images for email compatibility
const ICONS = {
  // LinkedIn icon - official brand color
  linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg',
  // Facebook icon - official brand color
  facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg',
  // X (Twitter) icon
  x: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg',
};

export const generateSignatureHTML = (data: SignatureData): string => {
  const { name, jobRole, phone, logoBase64, linkedinUrl, facebookUrl, xUrl } = data;

  // Build social media icons
  const socialIcons = [];
  if (linkedinUrl) {
    socialIcons.push(
      `<a href="${linkedinUrl}" style="text-decoration: none; margin-right: 8px; display: inline-block;"><img src="${ICONS.linkedin}" alt="LinkedIn" width="20" height="20" style="display: block; border: 0; filter: invert(30%) sepia(95%) saturate(2878%) hue-rotate(190deg) brightness(95%) contrast(101%);"></a>`
    );
  }
  if (facebookUrl) {
    socialIcons.push(
      `<a href="${facebookUrl}" style="text-decoration: none; margin-right: 8px; display: inline-block;"><img src="${ICONS.facebook}" alt="Facebook" width="20" height="20" style="display: block; border: 0; filter: invert(31%) sepia(92%) saturate(2595%) hue-rotate(205deg) brightness(101%) contrast(96%);"></a>`
    );
  }
  if (xUrl) {
    socialIcons.push(
      `<a href="${xUrl}" style="text-decoration: none; display: inline-block;"><img src="${ICONS.x}" alt="X" width="20" height="20" style="display: block; border: 0;"></a>`
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
