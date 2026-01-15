# 🚀 No-Code SaaS Builder

> **Modern, powerful, and intuitive website builder designed for creating SaaS landing pages with ease.**

![Project Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Motion-Framer-purple?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

## 📖 Overview

**No-Code SaaS Builder** is a cutting-edge interface that allows users to construct beautiful, responsive high-performance landing pages using a drag-and-drop system. Built on the latest web technologies, it offers a seamless "What You See Is What You Get" (WYSIWYG) experience.

Whether you are prototyping a startup idea or deploying a full-scale marketing site, this builder provides the components and flexibility you need.

## ✨ Key Features

- **🎨 Visual Canvas editor**: Real-time drag-and-drop interface powered by `dnd-kit`.
- **🧩 15+ Premium Components**: Ready-to-use blocks including Hero, Pricing, Testimonials, Features, and more.
- **⚡️ Blazing Fast Performance**: Built on Next.js 15 (App Router) and optimized for core web vitals.
- **📱 Fully Responsive**: All components are mobile-first and strictly typed with TypeScript.
- **💅 Global Theme Control**: Manage primary/secondary colors and styling centrally.
- **🔄 Dynamic Property Panels**: Edit text, images, icons, and array lists (like plans or team members) instantly.
- **🎭 Rich Animations**: Smooth transitions and scroll effects powered by Framer Motion.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **State Management**: React Context & Hooks
- **Drag & Drop**: [@dnd-kit/core](https://dndkit.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) based architecture

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nocode-saas-builder.git
   cd nocode-saas-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000/builder](http://localhost:3000/builder) to start building!

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages
│   ├── builder/          # Main builder editor route
│   └── layout.tsx        # Root layout
├── components/
│   ├── builder/          # Core builder logic (Canvas, Sidebar, PropertyPanel)
│   ├── builder-blocks/   # Draggable components (Hero, Features, Pricing, etc.)
│   └── ui/               # Reusable base UI components
├── lib/                  # Utilities and helper functions
├── hooks/                # Custom React hooks
└── types/                # TypeScript interface definitions (BuilderElement, etc.)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by Emre Can
</p>
