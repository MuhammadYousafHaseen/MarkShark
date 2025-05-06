# MarkShark 🦈

Welcome to **MarkShark**, an intelligent digital platform designed for efficient educational assessment and management. It enables teachers to evaluate students' papers, mark answers, maintain records, and enhance the overall examination experience digitally.

🌐 Live Website: https://markshark.co

---

## 📁 Project Directory Structure

```
MarkShark/
├── app/                   # Main Next.js App Router
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── dashboard/         # Dashboard pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main landing page
├── lib/                   # Utility functions and helpers
├── models/                # Mongoose models
│   ├── meeting.model.ts
│   └── user.model.ts
├── pages/api/             # Next.js API routes
│   ├── meeting/           # Meeting endpoints
│   ├── messages/          # Message endpoints
│   └── admin/             # Admin delete endpoints
├── public/                # Public assets (images, video, favicon)
├── styles/                # Global CSS and Tailwind config
├── .env.example           # Environment variable sample
├── next.config.js         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

---

## 🛠️ Technologies & Dependencies

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide-React
- **Animations**: Framer Motion
- **Authentication**: next-auth
- **Database**: MongoDB with Mongoose
- **HTTP Client**: Axios

---

## ⚙️ Environment Variables

Create a `.env.local` file and add the following variables:

```
MONGODB_URI=your_mongo_connection_string
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

---

## 🚀 Available Scripts

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Export static site
npm run export

# Lint & type-check
npm run lint
```

---

## 📤 Deployment

### Vercel

1. Push your code to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables in Vercel settings.
4. Deploy and enjoy!

### Static Export

```bash
npm run build
npm run export
```

Upload the `out/` folder contents to any static host.

---

## 🤝 Contribution

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request.

---

## 🗣️ Contact

**Author**: Muhammad Yousaf Haseen  
**Website**: https://markshark.co  
**Email**: muhammadyousaf71eb@gmail.com  
