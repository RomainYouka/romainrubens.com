"use client";

import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

interface SkeletonProps extends HTMLMotionProps<"div"> {
  className?: string;
}

function Skeleton({ className, variant = "light", ...props }: SkeletonProps & { variant?: "light" | "dark" }) {
  return (
    <motion.div
      data-slot="skeleton"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        variant === "dark" ? "bg-[#272727]" : "bg-gray-200",
        "rounded-md",
        className
      )}
      {...props}
    />
  )
}

const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-[50px] w-full">
      {/* Banner Skeleton removed */}
      
      <Skeleton className="h-10 md:h-12 w-full rounded-[20px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative w-full aspect-[2.16/1] overflow-hidden rounded-[14.44px]">
            <Skeleton className="size-full" />
            <div className="absolute bottom-[13px] left-[26px] right-[26px] flex justify-between items-center">
              <Skeleton className="h-3 w-8" />
              <Skeleton className="size-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExplorationSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 md:gap-[50px] w-full">
      <Skeleton variant="dark" className="h-10 md:h-12 w-full rounded-[20px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[50px] w-full">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative w-full aspect-[2.16/1] overflow-hidden rounded-[14.44px]">
            <Skeleton variant="dark" className="size-full" />
            <div className="absolute bottom-[13px] right-[26px]">
              <Skeleton variant="dark" className="size-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Skeleton, ProjectSkeleton, ExplorationSkeleton }
