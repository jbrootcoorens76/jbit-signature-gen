import { useState } from 'react';
import type { SignatureData, TemplateItem } from '../../types';
import { saveTemplate, getTemplates, deleteTemplate, loadTemplate } from '../../utils/storage';

interface TemplateManagerProps {
  currentData: SignatureData;
  onLoad: (data: SignatureData) => void;
}

export const TemplateManager = ({ currentData, onLoad }: TemplateManagerProps) => {
  const [templates, setTemplates] = useState<TemplateItem[]>(getTemplates());
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const handleSave = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    saveTemplate(templateName, currentData);
    setTemplates(getTemplates());
    setTemplateName('');
    setShowSaveDialog(false);
  };

  const handleLoad = (id: string) => {
    const data = loadTemplate(id);
    if (data) {
      onLoad(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(id);
      setTemplates(getTemplates());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Templates</h2>

      <button
        onClick={() => setShowSaveDialog(true)}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors mb-4"
      >
        Save Current as Template
      </button>

      {showSaveDialog && (
        <div className="mb-4 p-4 border border-gray-300 rounded-md bg-gray-50">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setTemplateName('');
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {templates.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No saved templates yet. Save your first template above!
          </p>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{template.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(template.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLoad(template.id)}
                  className="bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(template.id)}
                  className="bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
