---
description: How to deploy the Portfolio CMS to Vercel
---

# Deploying to Vercel

Follow these steps to publish your Next.js application to the web using Vercel.

## 1. Push to GitHub (or Git Provider)
Ensure your latest code is pushed to a remote repository (GitHub, GitLab, or Bitbucket).

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## 2. Import Project in Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** > **"Project"**.
3.  Select your repository (`BlogApp` or similar).
4.  Click **Import**.

## 3. Configure Project
Vercel will auto-detect Next.js. You don't need to change build settings.

### Environment Variables
**Crucial:** You must add your Supabase keys here for the app to work.
Expand the **"Environment Variables"** section and add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | *Your Supabase Project URL* |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *Your Supabase Anon API Key* |

*You can find these in your local `.env.local` file.*

## 4. Deploy
1.  Click **"Deploy"**.
2.  Wait for the build to complete (usually 1-2 minutes).
3.  Once done, you will see a screenshot of your site. Click it to visit your live URL!

## 5. Post-Deployment Checks
-   **Visit `/admin`**: Check if it correctly redirects to Home (since you are not logged in).
-   **Login**: Go to your secret URL (`/admin/anildaspoolatt/login`) and try logging in.
-   **Test Images**: Upload an image in the admin panel to verify Supabase Storage connection.

> **Note:** If you make changes later, just `git push` again. Vercel will automatically redeploy the new version.
