import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  fullName: string;
  email: string;
  linkedin?: string;
  github?: string;
  country: string;
  phone: string;
  phonePrefix: string;
  projectGoal: string;
  blocker: string;
  vision?: string;
  timeline: string;
  engagementScale: string;
  origin: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactFormData;
    const { fullName, email, projectGoal, blocker } = body;

    // Basic validation
    if (!fullName || !email || !projectGoal || !blocker) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Forward to Cloudflare Worker backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.CLOUDFLARE_WORKER_URL;
    
    if (!apiUrl) {
      // Fallback: Log in development if backend is not configured
      if (process.env.NODE_ENV === 'development') {
        console.log('⚠️ Cloudflare Worker URL not configured. Add NEXT_PUBLIC_API_URL to .env.local');
        console.log('Contact form submission:', body);
        return NextResponse.json(
          { 
            success: true,
            message: 'Thank you for your message! We will get back to you soon.' 
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Forward request to Cloudflare Worker
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Failed to send message' },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
