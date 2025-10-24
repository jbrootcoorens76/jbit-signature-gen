import { useState } from 'react';
import type { SignatureData } from './types';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import { ExportOptions } from './components/ExportOptions';
import { TemplateManager } from './components/TemplateManager';

const initialData: SignatureData = {
  name: '',
  jobRole: '',
  phone: '',
  logoBase64: '',
  linkedinUrl: '',
  facebookUrl: '',
  xUrl: '',
};

function App() {
  const [signatureData, setSignatureData] = useState<SignatureData>(initialData);

  const isValid = signatureData.name && signatureData.jobRole && signatureData.phone;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JBIT Email Signature Generator
          </h1>
          <p className="text-gray-600">
            Create professional email signatures for Outlook, Apple Mail, and more
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form and Templates */}
          <div className="lg:col-span-1 space-y-6">
            <SignatureForm data={signatureData} onChange={setSignatureData} />
            <TemplateManager currentData={signatureData} onLoad={setSignatureData} />
          </div>

          {/* Right Column - Preview and Export */}
          <div className="lg:col-span-2 space-y-6">
            {isValid ? (
              <>
                <SignaturePreview data={signatureData} />
                <ExportOptions data={signatureData} />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Fill in the required fields
                </h3>
                <p className="text-gray-500">
                  Complete the form on the left to see your signature preview and export options.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Made with ❤️ by JBIT</p>
        </div>
      </div>
    </div>
  );
}

export default App;
