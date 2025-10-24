export interface SignatureData {
  name: string;
  jobRole: string;
  phone: string;
  logoBase64: string;
  linkedinUrl: string;
  facebookUrl: string;
  xUrl: string;
}

export interface TemplateItem {
  id: string;
  name: string;
  data: SignatureData;
  createdAt: string;
}

export type EmailClient = 'outlook-windows' | 'outlook-mac' | 'apple-mail' | 'gmail';

export interface ExportFormat {
  client: EmailClient;
  label: string;
  instructions: string;
}
