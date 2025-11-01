# 🎵 Drewap Music Catalog

A modern, interactive music catalog website for rapper Drewap, featuring a sleek
audio player with Framer Motion animations.

## ✨ Features

- 🎨 **Modern Design** - Beautiful gradient backgrounds with glass morphism
  effects
- ⚡ **Fast & Responsive** - Built with Next.js 14 for optimal performance
- 🎭 **Smooth Animations** - Powered by Framer Motion for fluid interactions
- 🎵 **Custom Audio Player** - Full-featured player with progress bar, volume
  control, and visual feedback
- 📱 **Mobile-Friendly** - Fully responsive design for all devices
- 🔗 **QR Code Ready** - Perfect for sharing via QR codes

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Add Your Songs

Place your MP3 files in the `public/songs/` directory and name them:

- `track1.mp3`
- `track2.mp3`
- `track3.mp3`
- `track4.mp3`
- `track5.mp3`

### 3. Update Song Information

Edit `src/app/page.tsx` to update song titles and metadata:

```typescript
const songs: Song[] = [
    {
        id: 1,
        title: "Your Song Title", // Update this
        artist: "Drewap",
        file: "/songs/track1.mp3",
    },
    // ... update other songs
];
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Add New Project"
4. Import your GitHub repository: `https://github.com/Armib20/DrewapCatalog`
5. Vercel will auto-detect Next.js and configure everything
6. Click "Deploy"
7. Your site will be live in ~2 minutes! 🎉

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts` and `src/app/globals.css` to customize the color
scheme.

### Modify Animations

All animations are in `src/app/page.tsx` and `src/components/AudioPlayer.tsx`.
Adjust Framer Motion parameters to change timing and effects.

### Add More Songs

1. Add more song objects to the `songs` array in `src/app/page.tsx`
2. Place corresponding MP3 files in `public/songs/`

### Add Cover Art (Optional)

```typescript
const songs: Song[] = [
    {
        id: 1,
        title: "Track Title",
        artist: "Drewap",
        file: "/songs/track1.mp3",
        coverArt: "/images/cover1.jpg", // Add this
    },
];
```

## 📱 Creating QR Codes

Once deployed, create QR codes pointing to your Vercel URL:

1. Use a QR code generator like
   [qr-code-generator.com](https://www.qr-code-generator.com/)
2. Enter your Vercel deployment URL (e.g., `https://drewap-catalog.vercel.app`)
3. Customize the design if desired
4. Download and print!

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📝 Project Structure

```
DrewapCatalog/
├── public/
│   └── songs/           # Your MP3 files go here
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Main page with song list
│   │   └── globals.css  # Global styles
│   └── components/
│       └── AudioPlayer.tsx  # Custom audio player
├── package.json
├── tailwind.config.ts
└── next.config.mjs
```

## 🐛 Troubleshooting

### Songs Won't Play

- Ensure MP3 files are in `public/songs/` directory
- Check that file names match exactly (case-sensitive)
- Verify browser supports MP3 format
- Check browser console for errors

### Animations Not Working

- Clear browser cache
- Ensure JavaScript is enabled
- Try a different browser

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and `node_modules`, then reinstall
- Check Node.js version (requires Node 18+)

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

MIT License - feel free to use this project for your own music catalog.

---

Built with ❤️ for Drewap
