import { useState } from 'react';
import type { SignatureData, ExportFormat } from '../../types';
import { generateSignatureHTML } from '../../utils/signatureGenerator';
import { EMAIL_CLIENTS, copyToClipboard } from '../../utils/emailClientFormatters';

interface ExportOptionsProps {
  data: SignatureData;
}

export const ExportOptions = ({ data }: ExportOptionsProps) => {
  const [copiedClient, setCopiedClient] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<ExportFormat | null>(null);

  const handleCopy = async (client: ExportFormat) => {
    try {
      const html = generateSignatureHTML(data);
      await copyToClipboard(html);
      setCopiedClient(client.client);
      setSelectedClient(client);
      setTimeout(() => setCopiedClient(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy signature. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Export Signature</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {EMAIL_CLIENTS.map((client) => (
          <button
            key={client.client}
            onClick={() => handleCopy(client)}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              copiedClient === client.client
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            <div className="font-semibold text-gray-800 mb-1">{client.label}</div>
            <div className="text-sm text-gray-600">
              {copiedClient === client.client ? '✓ Copied!' : 'Click to copy'}
            </div>
          </button>
        ))}
      </div>

      {selectedClient && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-3 text-gray-800">
            Installation Instructions - {selectedClient.label}
          </h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {selectedClient.instructions}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
