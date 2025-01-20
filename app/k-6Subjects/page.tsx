"use client";

import BeyondAcademics from "@/components/Subjects/BeyondAcademics/BeyondAcademics";
import Header from "@/components/Subjects/Header/Header";
import UniqueApproach from "@/components/Subjects/UniqueApproach/UniqueApproach";
import WhatWeOffer from "@/components/Subjects/WhatWeOffer/WhatWeOffer";
import WhyK6 from "@/components/Subjects/WhyK6/WhyK6";
import WhyParents from "@/components/Subjects/WhyParents/WhyParents";

const SubjectsOffered = () => {
  return (
    <div>
      {/* First Section */}
      <Header
      backgroundImage="/images/k-6.png"
      tagline="Journey Development Network: Building the Pillars of Success"
      heading="K–6 Tutoring: Building Strong Foundations"
    />
      {/* section 2 */}
      <WhyK6
        contentImage="/images/kg-6.jpg"
        heading="Why K–6 is Critical"
        description="These formative years lay the groundwork for future academic and personal success. At JDN Tuition, we specialize in making learning engaging, enjoyable, and effective. Our K–6 tutoring services are designed to develop literacy, numeracy, thinking skills, and writing, while cultivating a lifelong love for learning."
      />
      {/* 3rd Section */}
      <WhatWeOffer pageType="K-6"/>
      {/* 4th Section */}
      <UniqueApproach pageType="K-6"/>

      <BeyondAcademics pageType="K-6"/>

      <WhyParents/>
    </div>
  );
};

export default SubjectsOffered;
