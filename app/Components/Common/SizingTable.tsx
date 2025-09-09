import React from 'react';

interface SizeDimension {
  size: string;
  length: string;
  waist: string;
  shoulder: string;
}

interface DimensionsTableProps {
  sizes: SizeDimension[];
}

const DimensionsTable: React.FC<DimensionsTableProps> = ({ sizes }) => {
  return (
    <table className="w-full text-left border-collapse ">
      <thead>
        <tr className="bg-[#e0dede]">
          <th className="p-2 border text-center">Size</th>
          <th className="p-2 border text-center">Length</th>
          <th className="p-2 border text-center">Waist Size</th>
          <th className="p-2 border text-center">Shoulder Size</th>
        </tr>
      </thead>
      <tbody>
        {sizes.map((size, index) => (
          <tr key={index} className="border">
            <td className="p-2 border text-center">{size.size}</td>
            <td className="p-2 border text-center">{size.length}</td>
            <td className="p-2 border text-center">{size.waist}</td>
            <td className="p-2 border text-center">{size.shoulder}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DimensionsTable;


export const sizes: { size: string; length: string; waist: string; shoulder: string }[] = [
  { size: 'S', length: '105cm', waist: '105cm', shoulder: '105cm' },
  { size: 'M', length: '105cm', waist: '105cm', shoulder: '105cm' },
  { size: 'L', length: '105cm', waist: '105cm', shoulder: '105cm' },
  { size: 'XL', length: '105cm', waist: '105cm', shoulder: '105cm' },
  { size: 'XXL', length: '105cm', waist: '105cm', shoulder: '105cm' },
];