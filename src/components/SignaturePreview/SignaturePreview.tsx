import type { SignatureData } from '../../types';
import { generateSignatureHTML } from '../../utils/signatureGenerator';

interface SignaturePreviewProps {
  data: SignatureData;
}

export const SignaturePreview = ({ data }: SignaturePreviewProps) => {
  const signatureHTML = generateSignatureHTML(data);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>

      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <div
          className="signature-preview"
          dangerouslySetInnerHTML={{ __html: signatureHTML }}
        />
      </div>

      <p className="text-sm text-gray-500 mt-4">
        This is how your signature will appear in most email clients.
      </p>
    </div>
  );
};
