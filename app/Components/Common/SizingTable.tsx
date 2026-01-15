"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import { Type } from '@/app/Types/Types';

interface SizeDimension {
  size: string;
  length: string;
  waist: string;
  shoulder: string;
}

interface DimensionsTableProps {
  productType: Type;
  productTitle: string;
}

// Dimensions data sets
const TSHIRT_SIZES: SizeDimension[] = [
  { size: 'S', length: '70 cm', waist: '52 cm', shoulder: '45 cm' },
  { size: 'M', length: '72 cm', waist: '54 cm', shoulder: '47 cm' },
  { size: 'L', length: '74 cm', waist: '56 cm', shoulder: '49 cm' },
  { size: 'XL', length: '76 cm', waist: '58 cm', shoulder: '51 cm' },
  { size: 'XXL', length: '78 cm', waist: '60 cm', shoulder: '53 cm' },
];

const HOODIE_SIZES: SizeDimension[] = [
  { size: 'S', length: '68 cm', waist: '54 cm', shoulder: '46 cm' },
  { size: 'M', length: '70 cm', waist: '56 cm', shoulder: '48 cm' },
  { size: 'L', length: '72 cm', waist: '58 cm', shoulder: '50 cm' },
  { size: 'XL', length: '74 cm', waist: '60 cm', shoulder: '52 cm' },
  { size: 'XXL', length: '76 cm', waist: '62 cm', shoulder: '54 cm' },
];

const OVERSIZED_TSHIRT_SIZES: SizeDimension[] = [
  { size: 'S', length: '72 cm', waist: '56 cm', shoulder: '50 cm' },
  { size: 'M', length: '74 cm', waist: '58 cm', shoulder: '52 cm' },
  { size: 'L', length: '76 cm', waist: '60 cm', shoulder: '54 cm' },
  { size: 'XL', length: '78 cm', waist: '62 cm', shoulder: '56 cm' },
  { size: 'XXL', length: '80 cm', waist: '64 cm', shoulder: '58 cm' },
];

function selectSizes(productType: Type, productTitle: string): SizeDimension[] {
  const typeName = (productType?.name || '').toLowerCase();
  const title = (productTitle || '').trim().toLowerCase();
  if (typeName === 'hoodie' || typeName === 'hoodies') {
    return HOODIE_SIZES;
  }
  if (typeName === 't-shirt' || typeName === 'tshirt' || typeName === 't-shirts') {
    if (title === 'ho77ywood') return OVERSIZED_TSHIRT_SIZES;
    return TSHIRT_SIZES;
  }
  // Default to regular T-Shirt if type is unknown
  return TSHIRT_SIZES;
}

const DimensionsTable: React.FC<DimensionsTableProps> = ({ productType, productTitle }) => {
  const t = useTranslations('product');
  const sizes = selectSizes(productType, productTitle);
  return (
    <table className="w-full text-left border-collapse ">
      <thead>
        <tr className="bg-[#e0dede]">
          <th className="p-2 border text-center">{t('sizeHeader')}</th>
          <th className="p-2 border text-center">{t('lengthHeader')}</th>
          <th className="p-2 border text-center">{t('waistHeader')}</th>
          <th className="p-2 border text-center">{t('shoulderHeader')}</th>
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


// Expose the charts if needed elsewhere
export const SizeCharts = {
  TSHIRT_SIZES,
  HOODIE_SIZES,
  OVERSIZED_TSHIRT_SIZES,
};