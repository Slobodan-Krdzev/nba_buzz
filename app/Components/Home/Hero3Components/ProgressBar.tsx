"use client";
import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full h-[4px] bg-white/20 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-[#ffd452] to-[#544a7d] transition-all duration-100 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

export default ProgressBar;
