# Deployment Guide: Thinktools.in on Hostinger & GitHub

This document details the deployment setup for **Thinktools.in** on your **Hostinger Business Web Hosting** and **GitHub**.

---

## 1. GitHub Repository Details

The project repository has been initialized and pushed to GitHub:
- **Repository URL:** [https://github.com/naseem3421/thinktools](https://github.com/naseem3421/thinktools)
- **Default Branch:** `main`
- **Visibility:** Public

### Git Remote Configuration
```bash
git remote -v
# origin  https://github.com/naseem3421/thinktools.git (fetch)
# origin  https://github.com/naseem3421/thinktools.git (push)
```

---

## 2. Hostinger Account & Domain Status (Verified via API)

- **Domain:** `thinktools.in` (Active in Hostinger portfolio until 2029)
- **DNS A Record:** `2.57.91.91` (Hostinger LiteSpeed Server)
- **DNS CNAME:** `www` &rarr; `thinktools.in.`
- **Hosting Plan:** `Business Web Hosting` (Active until 2030)

---

## 3. Production Deployment Package

A standalone production build has been created with Next.js static export:
- **Build Output Directory:** `out/`
- **Deployment Archive:** `thinktools-deploy.zip` (2.06 MB)
- **Includes:**
  - `index.html` (Homepage with Bestseller Storefront & Indian conversion hooks)
  - `p/construction-calculator-pro/index.html` (Construction Pro sales page with all 8 real screenshots)
  - `p/construction-calculator-pro/download/index.html` (Digital download page)
  - `screenshots/` (All 8 Excel calculator screenshots)
  - `.htaccess` (LiteSpeed configuration for clean URLs, HTTPS redirection, Gzip compression, and browser caching)

---

## 4. How to Deploy on Hostinger (Choose Either Method)

### Method A: Upload Zip in File Manager (Fastest — 30 Seconds)
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com).
2. Go to **Websites** &rarr; Select `thinktools.in` &rarr; **Manage**.
3. Under **Files**, open **File Manager**.
4. Navigate to `public_html` (or `domains/thinktools.in/public_html`).
5. Click **Upload** and select `thinktools-deploy.zip` from your local machine:
   ```
   D:\Anti Gravity Projects\Thinktools\thinktools-deploy.zip
   ```
6. Right-click `thinktools-deploy.zip` in File Manager and select **Extract** into the current directory.
7. Visit [https://thinktools.in](https://thinktools.in) — your live website is immediately active!

---

### Method B: Git Auto-Deployment from GitHub
1. In [Hostinger hPanel](https://hpanel.hostinger.com), go to **Websites** &rarr; `thinktools.in` &rarr; **Manage**.
2. In the left sidebar, go to **Advanced** &rarr; **Git**.
3. Enter the repository details:
   - **Repository:** `https://github.com/naseem3421/thinktools.git`
   - **Branch:** `main`
   - **Install directory:** `public_html`
4. Click **Create & Deploy**.
5. Every time you push changes to GitHub (`git push origin main`), Hostinger can automatically update your website!
