// /app/api/sendEmail/route.ts
import { NextResponse } from 'next/server';
import emailjs from 'emailjs-com';

// This function handles POST requests to send the email
export async function POST(request: Request) {
    try {
        const { formData } = await request.json();

        const emailContent = {
            userType: formData.userType,
            grade: formData.grade,
            selectedSubjects: formData.selectedSubjects.join(", "),
            firstName: formData.studentInfo.firstName,
            lastName: formData.studentInfo.lastName,
            reason: formData.studentInfo.reason,
            performance: formData.studentInfo.performance,
            learningNeeds: formData.studentInfo.learningNeeds,
            lessonType: formData.lessonDetails.type,
            lessonDuration: formData.lessonDetails.duration,
            lessonFrequency: formData.lessonDetails.frequency,
            availability: JSON.stringify(formData.lessonDetails.availability),
            parentFirstName: formData.parentDetails.fname,
            parentLastName: formData.parentDetails.lname,
            parentEmail: formData.parentDetails.email,
            parentPhone: formData.parentDetails.phone,
            parentSuburb: formData.parentDetails.suburb,
            parentAddDetails: formData.parentDetails.addDetails,
        };

        // Send email using EmailJS with environment variables
        await emailjs.send(
            process.env.EMAILJS_SERVICE_ID as string, // Server-side environment variable
            process.env.EMAILJS_TEMPLATE_ID as string, // Server-side environment variable
            emailContent,
            process.env.EMAILJS_USER_ID as string // Server-side environment variable
        );

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
