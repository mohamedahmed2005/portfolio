# 🚀 Mohamed Ahmed - Backend Developer Portfolio

<div align="center">

![Portfolio Status](https://img.shields.io/badge/Portfolio-v3.0.0--Refactored-brightgreen?style=for-the-badge&logo=github)
![Vercel](https://img.shields.io/badge/Vercel-Serverless%20Functions-black?style=for-the-badge&logo=vercel)
![Spring Boot](https://img.shields.io/badge/Spring--Boot-Intern-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![ASP.NET Core](https://img.shields.io/badge/.NET-Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)

**A multi-page, responsive portfolio featuring Vercel Serverless Email API, vertical career timeline, dynamic counters, and modern UI design.**

[📧 Contact](mailto:ahmd.mohamed200515@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/mohamed-ahmed-ba0815307/) • [🐙 GitHub](https://github.com/mohamedahmed2005)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features & Architecture](#-key-features--architecture)
- [🆕 Recent Major Updates](#-recent-major-updates)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Vercel & Resend API Setup](#-vercel--resend-api-setup)
- [🚀 Quick Start](#-quick-start)
- [📞 Contact](#-contact)
- [📄 License](#-license)

---

## 🌟 Overview

Welcome to my personal developer portfolio! I am **Mohamed Ahmed**, a **Backend Developer Intern @ Enovira** building production-grade REST APIs using **Java & Spring Boot**, and a Junior Computer Science student at **Faculty of Computers and Artificial Intelligence, Cairo University (FCAI-CU)**.

This portfolio showcases my software engineering projects, core technical stack (.NET Core, Spring Boot, MS SQL Server, C++), state-certified qualifications (DEPI Full-Stack Web Development), and interactive career milestones.

---

## ✨ Key Features & Architecture

### 🌐 **Multi-Page Architecture (6 Dedicated Pages)**
- **Landing Page (`index.html`)**: Executive summary featuring hero, bio overview, stats, featured projects preview, skills matrix highlight, state certificates preview, and active internship callout.
- **Projects Page (`pages/projects.html`)**: Comprehensive showcase of 5+ backend, desktop, and full-stack software applications with GitHub links.
- **Skills Matrix (`pages/skills.html`)**: Interactive tech grid showcasing Spring Boot, .NET Core, C#, MS SQL Server, MySQL, C++, Python, and Git.
- **Certificates Showcase (`pages/certificates.html`)**: Highlighted DEPI Gold State Certification alongside HackerRank and GDG credentials.
- **Career Timeline (`pages/experience.html`)**: Interactive vertical scroll timeline tracking milestones from FCAI-CU entry to active internship at Enovira.
- **Contact Channel (`pages/contact.html`)**: Real-time message form, QR codes, and direct social links.

### ⚡ **Serverless Contact API (Vercel Functions + Resend API)**
- **Zero-Dependency Serverless Backend**: Powered by Vercel Function (`/api/contact.js`).
- **Resend API Integration**: Direct email delivery to inbox with HTML email formatting and user auto-reply confirmation.
- **Real-Time Toast Feedback**: Interactive loading, success, and error notifications with mailto fallback.

### ⏳ **Animated Vertical Career Timeline**
- Alternating left/right timeline cards on desktop, left-aligned on mobile devices.
- Smooth scroll reveals using `IntersectionObserver`.
- Special glowing **"NOW"** badge highlighting current active internship at Enovira.

### 🎨 **Minimalist & Calm Design System**
- **Dual Theme Engine**: Seamless Light and Dark mode switching with persistent `localStorage` theme state across pages.
- **Calm Animations**: Subtle 14px scroll fade-ups, gentle `-4px` hover card lifts, and custom brand-specific footer icon hovers (GitHub, LinkedIn, Email).
- **Light Mode High Contrast**: High contrast colors and clean gradient icon containers.

---

## 🆕 Recent Major Updates

### **v3.0.0 — Multi-Page & Vercel Functions Refactor**
- ✅ **Multi-Page Split**: Reorganized single-page portfolio into 6 dedicated HTML pages inside `/pages`.
- ✅ **Vercel Serverless Function**: Built `/api/contact.js` using Resend API for reliable email delivery.
- ✅ **Vertical Timeline**: Replaced circular timeline with a responsive animated vertical timeline.
- ✅ **Clean Animations Overhaul**: Removed bouncy springs and 3D tilts for a sleek, calm UX.
- ✅ **Theme State Persistence**: Retained dark/light theme choice across all pages using `localStorage`.

---

## 🛠️ Tech Stack

### **Frontend & Layout**
- **HTML5 & CSS3**: Semantic HTML5, CSS Grid, Flexbox, Custom Properties (CSS Variables).
- **JavaScript (ES6+)**: DOM Manipulation, `IntersectionObserver`, Fetch API, Async/Await.
- **Icons & Fonts**: FontAwesome 6, Google Fonts (Poppins, Inter).

### **Backend & APIs**
- **Vercel Serverless Functions**: Node.js runtime API handling.
- **Resend API**: Email delivery service.
- **EmailJS**: Secondary fallback integration.

---

## 📁 Project Structure

```text
portfolio/
├── 📄 index.html                    # Root Executive Showcase Page
├── 📄 vercel.json                   # Vercel Deployment & Route Rewrites Configuration
├── 📄 .env.example                  # Environment Variables Template (RESEND_API_KEY)
├── 📄 README.md                    # Project Documentation
├── 📄 LICENSE                      # MIT License
├── 📁 api/
│   └── ⚡ contact.js                # Vercel Serverless Function (/api/contact)
├── 📁 pages/                        # Multi-Page Architecture
│   ├── 📁 projects.html             # Full Projects Matrix Page
│   ├── 📁 skills.html               # Technical Skills & Stack Page
│   ├── 📁 certificates.html         # Verified Certificates & DEPI Showcase
│   ├── 📁 experience.html           # Work Experience & Vertical Timeline Page
│   └── 📁 contact.html              # Contact Form & QR Channels Page
├── 📁 assets/                       # Images, Certificates PDFs, QR codes & Icons
│   ├── 🖼️ my-image.jpg              # Profile Image
│   ├── 🖼️ my-icon.png               # Favicon & Logo Icon
│   ├── 🖼️ Gmail.png                 # Gmail QR Code
│   ├── 🖼️ linkedin.png              # LinkedIn QR Code
│   ├── 🖼️ github.png                # GitHub QR Code
│   ├── 📄 Mohamed Ahmed Mohamed.pdf # DEPI State Certificate PDF
│   └── 📄 my_certificate.pdf        # GDG Certificate PDF
├── 📁 scripts/                      # JavaScript Modules
│   ├── 🟨 main.js                   # Navigation, Active Highlighting & Smooth Scroll
│   ├── 📧 email.js                  # Contact Form Submission Handler
│   ├── 🎨 themes.js                 # Theme Engine (Light / Dark Mode Manager)
│   ├── ✨ animations.js              # IntersectionObserver Scroll Reveal
│   ├── 🔢 counters.js                # Dynamic Counter Engine
│   └── ⏰ timeline.js                # Vertical Timeline Scroll Observer
└── 📁 styles/                       # CSS Architecture
    ├── 🎨 main.css                  # Global Stylesheet & Imports
    ├── 📱 responsive.css            # Responsive Breakpoints & Drawers
    ├── 📁 sections/                 # Section-Specific Component CSS
    │   ├── 📁 About/                # Hero & Profile Card Styles
    │   ├── 📁 Certificates/         # Certificate Grid & DEPI Ribbon Styles
    │   ├── 📁 Contact/              # Contact Form, QR & Social Hover Styles
    │   ├── 📁 Main_Form/            # Cards, Keyframes, Transitions & Utilities
    │   ├── 📁 Navigation/           # Navbar & Logo Styles
    │   ├── 📁 Projects/             # Project Cards Styles
    │   ├── 📁 Skills/               # Skill Cards Styles
    │   └── 📁 Timeline/             # Vertical Timeline Styles
    └── 📁 themes/                   # Theme Variations
        ├── ☀️ light.css             # Light Theme Contrast Rules
        └── 🌙 dark.css              # Dark Theme Style Overrides
```

---

## ⚡ Vercel & Resend API Setup

To run the contact form with your own Resend API key when deploying to Vercel:

1. **Get Resend API Key**:
   - Sign up at [Resend.com](https://resend.com) (Free Tier).
   - Create an API key under **API Keys** (`re_123456...`).

2. **Add Environment Variables on Vercel**:
   - Open your project on [Vercel Dashboard](https://vercel.com).
   - Go to **Settings** ➔ **Environment Variables**.
   - Add:
     - `RESEND_API_KEY` = `your_resend_api_key`
     - `TO_EMAIL` = `ahmd.mohamed200515@gmail.com`

3. **Deploy**:
   - Vercel automatically deploys `/api/contact.js` as a Serverless Function!

---

## 🚀 Quick Start

1. **Clone Repository**
   ```bash
   git clone https://github.com/mohamedahmed2005/portfolio.git
   cd portfolio
   ```

2. **Run Locally**
   Open `index.html` in any web browser, or use a local HTTP server:
   ```bash
   npx serve .
   ```

---

## 📞 Contact

<div align="center">

**Mohamed Ahmed**  
*Backend Developer Intern @ Enovira | Computer Science Student @ FCAI-CU*

[![Email](https://img.shields.io/badge/Email-ahmd.mohamed200515%40gmail.com-blue?style=for-the-badge&logo=gmail)](mailto:ahmd.mohamed200515@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Mohamed%20Ahmed-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/mohamed-ahmed-ba0815307/)
[![GitHub](https://img.shields.io/badge/GitHub-mohamedahmed2005-black?style=for-the-badge&logo=github)](https://github.com/mohamedahmed2005)

**📍 Location**: Cairo / Giza, Egypt  
**🎓 Education**: FCAI-CU (B.Sc. Computer Science)  
**💼 Current Role**: Backend Developer Intern at Enovira (Java & Spring Boot)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**© 2026 Mohamed Ahmed. Built with clean code & modern design.**

</div>