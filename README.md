# JBIT Email Signature Generator

A modern web application for creating professional email signatures compatible with Microsoft Outlook, Apple Mail, Gmail, and other email clients.

## Features

- ✨ Clean, intuitive interface
- 📝 Form-based signature creation
- 🖼️ Company logo support (converted to base64)
- 🔗 Social media links (LinkedIn, Facebook, X/Twitter)
- 👁️ Live preview
- 💾 Save and load templates (localStorage)
- 📋 One-click copy for different email clients
- 📱 Responsive design
- ✅ Email client compatibility (table-based layout, inline styles)

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Styling
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Deployment

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jbit-signature-gen.git
   cd jbit-signature-gen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/
│   ├── SignatureForm/      # Form inputs for signature data
│   ├── SignaturePreview/   # Live preview of signature
│   ├── ExportOptions/      # Copy and export functionality
│   └── TemplateManager/    # Save/load templates
├── utils/
│   ├── signatureGenerator.ts      # HTML signature generation
│   ├── emailClientFormatters.ts   # Email client specific logic
│   ├── storage.ts                 # localStorage utilities
│   └── imageUtils.ts              # Image upload and validation
├── types/
│   └── index.ts           # TypeScript type definitions
└── App.tsx                # Main application component
```

## Email Client Compatibility

Signatures are generated with maximum compatibility:

- **Table-based layout** - Email clients have poor CSS support
- **Inline styles only** - `<style>` tags are often stripped
- **Base64 images** - No external image dependencies
- **Tested with:**
  - Microsoft Outlook (Windows)
  - Microsoft Outlook (Mac)
  - Apple Mail
  - Gmail (Web)

## CI/CD Pipeline

The project uses GitHub Actions for:

- **Continuous Integration** (`ci.yml`):
  - Type checking
  - Linting
  - Format checking
  - Build verification
  - Runs on push and PR to main/develop

- **Deployment** (`deploy.yml`):
  - Automatic deployment to GitHub Pages
  - Runs on push to main branch

## Deployment

The application is automatically deployed to GitHub Pages when code is pushed to the main branch.

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions, please open an issue on GitHub.
