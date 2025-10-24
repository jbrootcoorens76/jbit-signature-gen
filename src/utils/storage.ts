import type { TemplateItem, SignatureData } from '../types';

const STORAGE_KEY = 'jbit-signature-templates';

export const saveTemplate = (name: string, data: SignatureData): void => {
  const templates = getTemplates();
  const newTemplate: TemplateItem = {
    id: crypto.randomUUID(),
    name,
    data,
    createdAt: new Date().toISOString(),
  };
  templates.push(newTemplate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

export const getTemplates = (): TemplateItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteTemplate = (id: string): void => {
  const templates = getTemplates();
  const filtered = templates.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const loadTemplate = (id: string): SignatureData | null => {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === id);
  return template ? template.data : null;
};
