import type { SignatureData } from '../types';

// Social media icon URLs - base64 encoded PNGs for maximum email client compatibility
const ICONS = {
  // LinkedIn icon (blue, 24x24)
  linkedin:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA8UlEQVR4nO2VwQrCMBBE3/+/6k8IHkQQD4IXRfDiQbx48SB48OLBg+BBEAQPHrwIij+gFoZKabpJ2tgFCW3SzmNm0yYppZRSXyAHjsAFeANPYA8U/1ZgA9zt7PpX4ACMf61ADVxt4gZYhBZYAjeb/GLyUCkwsQe1LW5CClRW4GETj0MK5FbgYvLCCoTMxS1wAwrXxWbA2RayeRu4tbkz1sCzzd/bQgd0gWc28dUKuIpZAlNgAdSBJTCzdcOmfQMHW0S76czcXkpd3RGoKFCxNagpkNvPT7afK6XU/yL0Pd0baMYLiNFb9PeQjR9SSqkv8QaFuHVHsMVW0wAAAABJRU5ErkJggg==',
  // Facebook icon (blue, 24x24)
  facebook:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA9UlEQVR4nO2VQQrCMBBF3/1v1ZsILkQQF4LgRhBciCC4EEF04UJcuBAERFy4cCEo/oBWGJRKm9hJpQuFhrbpfGYmkzZKKaVUEGTAGXgAN+AFHIEs+FZgC1zt7PFX4AyMg20FlsDZJr4Yd1ApMDQHlS0uxQpkVuBs8swKhMrFLXAHUteF5sDZFrJ5K7i1uRvWwNPOP9pCB7SBZzbx1Qq4iFkDC2AJlIE1MLN1/aZ9BwebRLvp3NxeSl1dEcgoUDE1KCiQ2c+Ptp8rpdT/IvQ97Ruohwuo0Vv095CNb1JKqS/xBklidI/fRjuGAAAAAElFTkSuQmCC',
  // X/Twitter icon (black, 24x24)
  x: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7klEQVR4nO2VwQrCMAyG//+v+hPBgyCIB0FwI4gXL4IHL148eBB8g1oYKmubrW0OgpA2bfLxp01aSinllPpCAZyAO/ACnsAeKH6twBa42tnpr8AZGAXbCqyAi018Ne5QUmBsDmpb3IQUKKzAxeS5FQiVi1vgDqSuC82Bqy1k81Zwa3MXrIGnzb/bQge0gWc28c0KuIpZAAtoA1VgDcxs3ahp38DRFtFuOje3l1JXVwQKClRsDQoKZPbzk+3nSin1vwh9T7sGGvEC6uhb9PeQjR9SSqlv4gNBBnTmwHi33QAAAABJRU5ErkJggg==',
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
