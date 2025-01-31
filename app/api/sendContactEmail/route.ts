import { NextResponse } from 'next/server';
import emailjs from 'emailjs-com';

emailjs.init(process.env.EMAILJS_PUBLIC_KEY!);

export async function POST(request: Request) {
  try {
    const contactFormData = await request.json();
    const contactFormEmailContent = {
        contactName: contactFormData.name,
        contactEmail: contactFormData.email,
        contactPhone: contactFormData.phone,
        contactMessage: contactFormData.message,
      };
    // Validate required fields
    

    // Send email using EmailJS
    try {
        const result = await emailjs.send(
          process.env.EMAILJS_SERVICE_ID!,
          process.env.EMAILJS_CONTACT_TEMPLATE_ID!,
          contactFormEmailContent
        );
        console.log("Email sent successfully", result);
      } catch (error) {
        console.error("Error sending email:", error);
      }

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
     contactFormEmailContent
    });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}