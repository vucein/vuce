# Vuce Backend - Cloudflare Workers

Backend API for handling Vuce contact form submissions using Cloudflare Workers and Resend for email delivery.

Based on the [Resend Cloudflare Workers Example](https://github.com/resend/resend-cloudflare-workers-example).

## 🚀 Features

- ✅ Contact form submission handling
- ✅ Email confirmation sent to clients
- ✅ Admin notification email with full form details
- ✅ Beautiful React-based email templates
- ✅ CORS support for frontend integration
- ✅ Error handling and validation

## 📋 Prerequisites

1. **Cloudflare Account**
   - Sign up at [cloudflare.com](https://cloudflare.com)
   - Install Wrangler CLI: `npm install -g wrangler`
   - Login: `wrangler login`

2. **Resend Account**
   - Sign up at [resend.com](https://resend.com)
   - Get your API key from [resend.com/api-keys](https://resend.com/api-keys)
   - Verify your domain (optional but recommended for production)

3. **Node.js** (v18 or higher)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars` and add your actual values:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=your-email@vuce.in
```

### 3. Local Development

Start the development server:

```bash
npm run dev
```

The worker will run at `http://localhost:8787`

Test with:

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

### 4. Deploy to Cloudflare Workers

#### Step 1: Set up secrets in Cloudflare

```bash
# Set Resend API key
wrangler secret put RESEND_API_KEY

# Set contact email
wrangler secret put CONTACT_EMAIL

# Optional: Set custom from email
wrangler secret put FROM_EMAIL
```

#### Step 2: Deploy

```bash
npm run deploy
```

After deployment, you'll get a URL like: `https://vuce-backend.your-subdomain.workers.dev`

#### Step 3: Update Frontend

Update your frontend `.env.local` to point to the deployed worker:

```env
NEXT_PUBLIC_API_URL=https://vuce-backend.your-subdomain.workers.dev
```

Or set up a custom domain in `wrangler.toml`:

```toml
routes = [
  { pattern = "api.vuce.in/*", zone_name = "vuce.in" }
]
```

## 📧 Email Templates

### Client Confirmation Email
Sent to users who submit the contact form:
- Personalized thank you message
- Project details summary
- Next steps information

### Admin Notification Email
Sent to the business owner:
- Full contact information
- Complete project details
- Quick action links (reply, call)

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `CONTACT_EMAIL` | Yes | Email address to receive form submissions |
| `FROM_EMAIL` | No | Custom from email (default: onboarding@resend.dev) |

### Wrangler Configuration

Edit `wrangler.toml` to customize:
- Worker name
- Routes (for custom domains)
- Environment-specific settings

## 🧪 Testing

The worker includes:
- Request validation
- Email format validation
- Error handling
- CORS support

Test locally before deploying:

```bash
npm run dev
```

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Resend Documentation](https://resend.com/docs)
- [Resend Cloudflare Workers Example](https://github.com/resend/resend-cloudflare-workers-example)

## 🐛 Troubleshooting

### Email not sending?
1. Check your Resend API key is correct
2. Verify your domain is verified in Resend (for custom from emails)
3. Check Cloudflare Workers logs: `wrangler tail`

### CORS issues?
- The worker includes CORS headers
- Make sure your frontend URL is allowed

### Type errors?
- Run `npm run type-check` to check TypeScript errors
- Make sure `@cloudflare/workers-types` is installed

## 📝 License

MIT
