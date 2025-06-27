import React from "react";

interface SectionTitleProps {

    title: string
    color?: string
}

const SectionTitle = ({title, color='titles'}: SectionTitleProps) => {
  return (
    <h2
      className={`text-center text-5xl tracking-tighter mb-6 font-black uppercase text-${color}`}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
