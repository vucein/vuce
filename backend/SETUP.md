# Cloudflare Workers Backend Setup Guide

## ✅ What's Been Created

### Directory Structure
```
backend/
├── src/
│   ├── index.tsx              # Main Cloudflare Worker handler
│   └── emails/
│       ├── client-confirmation.tsx   # Email template for clients
│       └── admin-notification.tsx    # Email template for admin
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript configuration
├── wrangler.toml             # Cloudflare Workers config
├── .dev.vars.example         # Environment variables template
├── .gitignore                # Git ignore rules
├── README.md                 # Documentation
└── SETUP.md                  # This file
```

### Features
- ✅ Contact form submission handler
- ✅ Client confirmation email template (beautiful HTML email)
- ✅ Admin notification email template (with all form details)
- ✅ CORS support for frontend
- ✅ Error handling and validation
- ✅ React-based email templates using Resend

## 🚀 Quick Start Guide

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `resend` - Email sending service
- `wrangler` - Cloudflare Workers CLI
- `@cloudflare/workers-types` - TypeScript types
- `typescript` - TypeScript compiler

### Step 2: Set Up Resend Account

1. **Sign up** at [resend.com](https://resend.com)
2. **Get API key** from [resend.com/api-keys](https://resend.com/api-keys)
3. **Verify your domain** (optional but recommended for production)
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add and verify `vuce.in` domain
   - This allows you to send from `contact@vuce.in` instead of `onboarding@resend.dev`

### Step 3: Configure Local Environment

1. **Create `.dev.vars` file**:
```bash
cp .dev.vars.example .dev.vars
```

2. **Edit `.dev.vars`** and add your values:
```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=your-email@vuce.in
```

### Step 4: Test Locally

1. **Start the worker**:
```bash
npm run dev
```

2. **Test with curl**:
```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "country": "US",
    "phone": "1234567890",
    "phonePrefix": "+1",
    "projectGoal": "Build from Scratch",
    "blocker": "Need technical expertise",
    "timeline": "Immediate",
    "engagementScale": "Standard Build",
    "origin": "Search Engine"
  }'
```

3. **Check your email** - You should receive:
   - Client confirmation email at `john@example.com`
   - Admin notification email at `your-email@vuce.in`

### Step 5: Deploy to Cloudflare Workers

1. **Login to Cloudflare**:
```bash
wrangler login
```

2. **Set secrets** (these are encrypted and stored securely):
```bash
# Set Resend API key
wrangler secret put RESEND_API_KEY
# When prompted, paste your API key: re_xxxxx

# Set contact email
wrangler secret put CONTACT_EMAIL
# When prompted, enter: your-email@vuce.in

# Optional: Set custom from email
wrangler secret put FROM_EMAIL
# When prompted, enter: Vuce <contact@vuce.in>
```

3. **Deploy**:
```bash
npm run deploy
```

4. **Get your worker URL**:
After deployment, you'll get a URL like:
```
https://vuce-backend.your-subdomain.workers.dev
```

### Step 6: Update Frontend

1. **Update `.env.local`** in the root directory:
```env
NEXT_PUBLIC_API_URL=https://vuce-backend.your-subdomain.workers.dev
CLOUDFLARE_WORKER_URL=https://vuce-backend.your-subdomain.workers.dev
```

2. **Update `.env.example`** for production:
```env
NEXT_PUBLIC_API_URL=https://vuce-backend.your-subdomain.workers.dev
```

### Step 7: Set Up Custom Domain (Optional)

If you want to use `api.vuce.in` instead of `workers.dev`:

1. **Update `wrangler.toml`**:
```toml
[env.production]
routes = [
  { pattern = "api.vuce.in/*", zone_name = "vuce.in" }
]
```

2. **Add DNS record** in Cloudflare:
   - Type: `CNAME`
   - Name: `api`
   - Target: `vuce-backend.your-subdomain.workers.dev`
   - Proxy: ON

3. **Update frontend**:
```env
NEXT_PUBLIC_API_URL=https://api.vuce.in
```

## 📧 Email Templates

### Client Confirmation Email
- **Sent to**: User who submits the form
- **Includes**: 
  - Personalized thank you message
  - Project goal and timeline
  - Next steps information
  - Link to website

### Admin Notification Email
- **Sent to**: You (business owner)
- **Includes**:
  - Full contact information (name, email, phone)
  - Complete project details
  - LinkedIn/GitHub links (if provided)
  - Quick action links (reply, call)
  - Formatted in easy-to-read table

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key (starts with `re_`) |
| `CONTACT_EMAIL` | Yes | Email to receive form submissions |
| `FROM_EMAIL` | No | Custom from email (default: `onboarding@resend.dev`) |

### Wrangler Configuration

Edit `wrangler.toml` to customize:
- Worker name
- Routes (for custom domains)
- Environment-specific settings

## 🐛 Troubleshooting

### "Email not sending"
1. ✅ Check your Resend API key is correct
2. ✅ Verify `CONTACT_EMAIL` is set
3. ✅ Check Cloudflare Workers logs: `wrangler tail`
4. ✅ Verify domain is verified in Resend (for custom from emails)

### "CORS errors"
- The worker includes CORS headers
- Make sure your frontend URL is making requests correctly

### "Type errors"
- Run `npm run type-check` to check TypeScript errors
- Make sure all dependencies are installed: `npm install`

### "Module not found"
- Make sure you're in the `backend` directory
- Run `npm install` again

## 📚 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Set up Resend account and get API key
3. ✅ Configure `.dev.vars` for local development
4. ✅ Test locally with `npm run dev`
5. ✅ Deploy to Cloudflare Workers
6. ✅ Update frontend `.env.local` with worker URL
7. ✅ Test the complete flow from frontend to email

## 🎉 You're Done!

Once deployed, your contact form will:
1. Accept submissions from your Next.js frontend
2. Send a beautiful confirmation email to clients
3. Send a detailed notification email to you
4. Handle errors gracefully
5. Work at scale with Cloudflare's global network

## 📖 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Resend Documentation](https://resend.com/docs)
- [Resend Cloudflare Workers Example](https://github.com/resend/resend-cloudflare-workers-example)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
