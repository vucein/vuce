/**
 * Cloudflare Worker for handling Vuce contact form submissions
 * Based on: https://github.com/resend/resend-cloudflare-workers-example
 */

import * as React from 'react';
import { Resend } from 'resend';
import { ClientConfirmationEmail } from './emails/client-confirmation';
import { AdminNotificationEmail } from './emails/admin-notification';

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

interface Env {
  RESEND_API_KEY: string;
  CONTACT_EMAIL: string;
  // Optional: Allow customizing from email
  FROM_EMAIL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // CORS headers for frontend
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed. Use POST.' }),
        {
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    try {
      // Parse request body
      const body: ContactFormData = await request.json();

      // Validate required fields
      if (!body.fullName || !body.email || !body.projectGoal || !body.blocker) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields: fullName, email, projectGoal, blocker' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return new Response(
          JSON.stringify({ error: 'Invalid email address' }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Check environment variables
      if (!env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return new Response(
          JSON.stringify({ error: 'Server configuration error' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      if (!env.CONTACT_EMAIL) {
        console.error('CONTACT_EMAIL is not set');
        return new Response(
          JSON.stringify({ error: 'Server configuration error' }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Initialize Resend
      const resend = new Resend(env.RESEND_API_KEY);

      const fromEmail = env.FROM_EMAIL || 'Vuce <onboarding@resend.dev>';

      // Send confirmation email to client
      const clientEmailResult = await resend.emails.send({
        from: fromEmail,
        to: [body.email],
        subject: `Thank You, ${body.fullName}! We've Received Your Project Inquiry`,
        react: React.createElement(ClientConfirmationEmail, {
          fullName: body.fullName,
          projectGoal: body.projectGoal,
          timeline: body.timeline,
        }),
      });

      // Send notification email to admin/business owner
      const adminEmailResult = await resend.emails.send({
        from: fromEmail,
        to: [env.CONTACT_EMAIL],
        subject: `🎯 New Contact Form Submission: ${body.fullName} - ${body.projectGoal}`,
        react: React.createElement(AdminNotificationEmail, body),
      });

      // Check if emails were sent successfully
      if (clientEmailResult.error || adminEmailResult.error) {
        console.error('Email sending error:', {
          clientError: clientEmailResult.error,
          adminError: adminEmailResult.error,
        });

        return new Response(
          JSON.stringify({
            error: 'Failed to send emails',
            details: clientEmailResult.error || adminEmailResult.error,
          }),
          {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Success response
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
          emailIds: {
            client: clientEmailResult.data?.id,
            admin: adminEmailResult.data?.id,
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    } catch (error) {
      console.error('Contact form error:', error);

      return new Response(
        JSON.stringify({
          error: 'Failed to process request',
          message: error instanceof Error ? error.message : 'Unknown error',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
} satisfies ExportedHandler<Env>;
