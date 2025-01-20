"use client";

import BeyondAcademics from "@/components/Subjects/BeyondAcademics/BeyondAcademics";
import Header from "@/components/Subjects/Header/Header";
import HolisticSupport from "@/components/Subjects/HolisticSupport/HolisticSupport";
import UniqueApproach from "@/components/Subjects/UniqueApproach/UniqueApproach";
import WhatWeOffer12 from "@/components/Subjects/WhatWeOffer12/WhatWeOffer12";
import WhyK6 from "@/components/Subjects/WhyK6/WhyK6";
import WhyParents from "@/components/Subjects/WhyParents/WhyParents";

const SubjectsOffered = () => {
  return (
    <div>
      {/* First Section */}
      <Header
      backgroundImage="/images/11-12.png"
      tagline="Journey Development Network: Building the Pillars of Success"
      heading="Years 11–12 (HSC) Tutoring: Your Path to Success "
    />
      {/* section 2 */}
      <WhyK6
       contentImage="/images/ex11-12.jpg"
       heading="Excelling in the Final Years"
       description="Years 11 and 12 are critical stages in every student’s academic journey, with the Higher School Certificate (HSC) determining future opportunities. Our tutors empower students to excel academically, master exam techniques, and build the resilience and confidence needed to succeed."
     />
      {/* 3rd Section */}
      <WhatWeOffer12/>
      {/* 4th Section */}
      <HolisticSupport/>
      <UniqueApproach pageType="11-12"/>

      <BeyondAcademics pageType="11-12"/>

      <WhyParents/>
    </div>
  );
};

export default SubjectsOffered;
