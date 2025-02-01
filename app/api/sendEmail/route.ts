import { NextResponse } from 'next/server';
import emailjs from 'emailjs-com';

export async function POST(req: Request) {
  try {
    const { formData } = await req.json();

    const emailContent = {
      userType: formData.userType || "",
      grade: formData.grade || "",
      selectedSubjects: Array.isArray(formData.selectedSubjects) ? formData.selectedSubjects.join(", ") : "",
      firstName: formData.studentInfo?.firstName || "",
      lastName: formData.studentInfo?.lastName || "",
      reason: formData.studentInfo?.reason || "",
      performance: formData.studentInfo?.performance || "",
      learningNeeds: formData.studentInfo?.learningNeeds || "",
      lessonType: formData.lessonDetails?.type || "",
      lessonDuration: formData.lessonDetails?.duration || "",
      lessonFrequency: formData.lessonDetails?.frequency || "",
      availability: JSON.stringify(formData.lessonDetails?.availability) || "{}",
      parentFirstName: formData.parentDetails?.fname || "",
      parentLastName: formData.parentDetails?.lname || "",
      parentEmail: formData.parentDetails?.email || "",
      parentPhone: formData.parentDetails?.phone || "",
      parentSuburb: formData.parentDetails?.suburb || "",
      parentAddDetails: formData.parentDetails?.addDetails || "",
    };

    try {
        const result = await emailjs.send(
          process.env.EMAILJS_SERVICE_ID!,
          process.env.EMAILJS_TEMPLATE_ID!,
          emailContent,
          process.env.EMAILJS_USER_ID!

        );
        console.log("Email sent successfully", result);
      } catch (error) {
        console.error("Error sending email:", error);
      }

    

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
}
