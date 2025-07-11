import React from "react";

interface SingleFeatureProps {
    icon: React.ElementType;
    title: string;
    description: string;
    titleClass?: string;
    textSize?: string;
  }


  const SingleFeature: React.FC<SingleFeatureProps> = ({
    icon: Icon,
    title,
    description,
  }) => {
    return (
      <div className="text-center md:text-left">
        <Icon className="w-8 h-8 mx-auto md:mx-0 mb-4 text-titles" />
        <h3 className={`font-bold text-2xl text-transparent 
             bg-clip-text 
             bg-[linear-gradient(to_right,_#ffd452,_#544a7d)] 
             bg-[length:200%_200%] 
             animate-gradientMove`}>{title}</h3>
        <p className={`text-md text-gray-600 mt-1`}>{description}</p>
      </div>
    );
  };
  
  export default SingleFeature;
