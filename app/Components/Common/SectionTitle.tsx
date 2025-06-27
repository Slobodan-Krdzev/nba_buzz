import React from "react";

interface SectionTitleProps {

    title: string
}

const SectionTitle = ({title}: SectionTitleProps) => {
  return (
    <h2
      className={`text-center text-5xl tracking-tighter mb-6 font-black uppercase text-titles`}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
