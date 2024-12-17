"use client";

import BeyondAcademics from "@/components/Subjects/BeyondAcademics/BeyondAcademics";
import Header from "@/components/Subjects/Header/Header";
import UniqueApproach from "@/components/Subjects/UniqueApproach/UniqueApproach";
import WhatWeOffer from "@/components/Subjects/WhatWeOffer/WhatWeOffer";
import WhyK6 from "@/components/Subjects/WhyK6/WhyK6";
import Image from "next/image";
import Link from "next/link";
import { FaBookOpen, FaCalculator, FaFlask, FaPen, FaBrain } from 'react-icons/fa';
import { FaPiggyBank, FaDesktop, FaNewspaper, FaWrench, FaCheck } from "react-icons/fa";

const SubjectsOffered = () => {
  return (
    <div>
      {/* First Section */}
      <Header/>
      {/* section 2 */}
      <WhyK6/>
      {/* 3rd Section */}
      <WhatWeOffer/>
      {/* 4th Section */}
      <UniqueApproach/>

      <BeyondAcademics/>
    </div>
  );
};

export default SubjectsOffered;
