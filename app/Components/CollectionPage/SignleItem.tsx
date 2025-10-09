import { Product } from '@/app/Types/Types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SingleItemProps = {

  product: Product
}

const SingleItem = ({ product }: SingleItemProps) => {



  return (
    <Link href={'/product/1'} className='border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 flex'>
      <div>
        <h3 className='text-xl font-bold'>{product.title}</h3>
        <p>${product.price}.00</p>
      </div>

      <Image src={product.featuredImage} alt={product.title} width={300} height={300} className='object-cover' />
    </Link>
  )
}

export default SingleItem
