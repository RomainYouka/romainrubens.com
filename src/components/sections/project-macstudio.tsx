"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectMacStudioProps {
  language: "FR" | "EN" | "ՀԱՅ";
}

export default function ProjectMacStudio({ language }: ProjectMacStudioProps) {
  return (
    <section
      className="w-full bg-[#F5F5F7] overflow-hidden">

      <div className="container mx-auto px-5 md:px-10 py-16 md:py-20 w-full max-w-[1200px]">
        <div className="w-full flex justify-center">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/macstudio-1762113738841.png?width=8000&height=8000&resize=contain"
            alt="Mac Studio Setup"
            width={1200}
            height={800}
            className="w-full max-w-[95%] md:max-w-[85%] lg:max-w-full h-auto"
            priority />

        </div>
      </div>
    </section>);

}