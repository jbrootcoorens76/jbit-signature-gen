import type { ChangeEvent } from 'react';
import type { SignatureData } from '../../types';
import { convertImageToBase64, validateImageFile } from '../../utils/imageUtils';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: SignatureData) => void;
}

export const SignatureForm = ({ data, onChange }: SignatureFormProps) => {
  const handleInputChange = (field: keyof SignatureData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      alert('Please upload a valid image file (JPEG, PNG, GIF) under 2MB');
      return;
    }

    try {
      const base64 = await convertImageToBase64(file);
      handleInputChange('logoBase64', base64);
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Signature Details</h2>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Job Role */}
        <div>
          <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-1">
            Job Role *
          </label>
          <input
            type="text"
            id="jobRole"
            value={data.jobRole}
            onChange={(e) => handleInputChange('jobRole', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Senior Developer"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        {/* Company Logo */}
        <div>
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
            Company Logo
          </label>
          <input
            type="file"
            id="logo"
            accept="image/jpeg,image/jpg,image/png,image/gif"
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {data.logoBase64 && (
            <div className="mt-2">
              <img
                src={data.logoBase64}
                alt="Logo preview"
                className="w-20 h-20 object-contain border border-gray-200 rounded"
              />
            </div>
          )}
        </div>

        {/* LinkedIn URL */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedin"
            value={data.linkedinUrl}
            onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        {/* Facebook URL */}
        <div>
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
            Facebook URL
          </label>
          <input
            type="url"
            id="facebook"
            value={data.facebookUrl}
            onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://facebook.com/username"
          />
        </div>

        {/* X (Twitter) URL */}
        <div>
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 mb-1">
            X (Twitter) URL
          </label>
          <input
            type="url"
            id="x"
            value={data.xUrl}
            onChange={(e) => handleInputChange('xUrl', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://x.com/username"
          />
        </div>
      </div>
    </div>
  );
};
