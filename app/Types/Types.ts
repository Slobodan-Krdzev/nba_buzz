export interface Product {
  _id: string
  title: string
  description: string
  featuredImage: string
  galleryImages: string[]
  isPromotion: boolean
  sizes: Sizes
  price: number
  type: Type
  isFeatured: boolean
  materials: Material[]
  colors: Color[]
  details: string[]
  washing: string
  collection: string
  isActive: boolean
  date_added: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Sizes {
  xs: number
  s: number
  m: number
  l: number
  xl: number
  xxl: number
}

export interface Type {
  _id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  slug: string
  __v: number
}

export interface Material {
  percentage: number
  materialName: string
}

export interface Color {
  name: string
  color: string
}

export interface HeroSlideItemType {
  id: number;
  title: string;
  img: string;
  link: string;
  subtitle: string
}
