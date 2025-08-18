export interface Product {
  _id: string
  userId: number
  id: number
  description: Description
  gallery: Gallery
  date_added: number
  isPromotion: boolean
  sizes: Sizes
  price: number
  type: 'T-shirt' | 'Hoodie' | "Jersey"
  materials: Material[]
  details: string[]
  washing: string
  name: string
}

export interface Description {
  player: string
  desc: string
}

export interface Gallery {
  front: string
  back: string
  left: string
  right: string
  model: string
  modelFront: string
  modelBack: string
  modelLeft: string
  modelRight: string
}

export interface Sizes {
  l: number
  m: number
  s: number
  xl: number
  xs: number
  xxl: number
}

export interface Material {
  percentage: number
  materialName: string
}
