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
      backgroundImage="/images/7-10.png"
      tagline="Journey Development Network: Building the Pillars of Success"
      heading="Years 7–10 Tutoring: Thriving Through Transition"
    />
      {/* section 2 */}
      <WhyK6
       contentImage="/images/2.png"
       heading="The Middle School Leap"
       description="As students enter their teen years, academic challenges evolve. JDN Tuition bridges the gap between foundational knowledge and the advanced concepts required for senior school success, whilst helping our students to develop essential study habits."
     />
      {/* 3rd Section */}
      <WhatWeOffer pageType="7-10"/>
      {/* 4th Section */}
      <UniqueApproach pageType="7-10"/>

      <BeyondAcademics pageType="7-10"/>

      <WhyParents/>
    </div>
  );
};

export default SubjectsOffered;
