# Hostinger Deployment Guide for Thinktools.in

This project is built with **Next.js + Tailwind CSS** and is optimized to run smoothly on your **Hostinger Business Web Hosting** account.

---

## Method 1: Using Hostinger's Built-in Node.js Manager (Recommended)

Hostinger Business Web Hosting includes a native Node.js application manager in hPanel.

### Step 1: Prepare the Production Build
In `next.config.ts`, set standalone output:
```ts
const nextConfig: NextConfig = {
  output: 'standalone',
  // ...
};
```
Then run:
```bash
npm run build
```
This produces a self-contained `.next/standalone` folder.

### Step 2: Upload Files to Hostinger
1. In Hostinger **hPanel**, go to **Files → File Manager**.
2. Navigate to your domain directory (`domains/thinktools.in/` or `public_html`).
3. Upload:
   - The contents of `.next/standalone`
   - The `public` folder
   - The `.next/static` folder into `.next/standalone/.next/static`

### Step 3: Start Node.js in hPanel
1. In hPanel, search for **Node.js**.
2. Set **Node.js Version** to `20.x` or `22.x`.
3. Set **Application Root** to your app directory.
4. Set **Application Startup File** to `server.js`.
5. Click **Start App**.

---

## Method 2: High-Performance Static Export (Easiest)

If you prefer zero server management with maximum load speed on Hostinger's LiteSpeed servers:

1. In `next.config.ts`, set:
```ts
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
```
2. Run `npm run build`.
3. Next.js will generate an `out/` folder containing static HTML, CSS, and JS.
4. Drag and drop all files from the `out/` folder directly into your Hostinger `public_html/`.
5. Your store and landing pages will load instantly worldwide!

---

## Securing Digital Product Files in Hostinger

For your Excel (`.xlsx`) and PDF deliverables:

1. In Hostinger File Manager, create a folder named `private_storage/` in your account home directory (one level above `public_html/`):
   ```
   /home/u123456789/
   ├── private_storage/
   │   └── Construction_Calculator_Pro_v4_Master.xlsx
   └── public_html/ (your website)
   ```
2. Files inside `private_storage` cannot be directly accessed by web browsers via URL, keeping your digital products protected from unauthorized downloads.
