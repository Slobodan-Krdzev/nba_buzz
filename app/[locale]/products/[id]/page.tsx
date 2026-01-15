// import FeaturedProducts from "@/app/Components/Common/FeaturedProducts";
import FeaturedProducts from "@/app/Components/Common/FeaturedProducts";
import MobileProductGalery from "@/app/Components/Common/MobileProductGalery";
import DimensionsTable from "@/app/Components/Common/SizingTable";
import DesktopSizesAndColors from "@/app/Components/ProductPage/DesktopSizesAndColors";
import MobileProductActions from "@/app/Components/ProductPage/MobileProductActions";
import JerseyGallery from "@/app/Components/ProductPage/ProductGallery";
import { Product } from "@/app/Types/Types";
import { getTranslations } from "next-intl/server";

interface Props {
  params: Promise<{ id: string, locale: string }>; // note: params is async
}

export default async function UserPage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations('product');

  const res = await fetch(`https://adminbuzzmk.com/api/products/${id}?locale=${locale.toUpperCase()}`, {
    // Keep fresh during development
    cache: "no-store",
  });

  if (!res.ok) {
    return <>{t('notFound')}</>;
  }

  const data = await res.json();
  const productToRender = data?.product as Product | undefined;

  if (!productToRender || !productToRender.isActive) {
    return <>{t('notFound')}</>;
  }

  const images = productToRender.galleryImages?.length
    ? productToRender.galleryImages
    : productToRender.featuredImage
    ? [productToRender.featuredImage]
    : [];

  return (
    <>
      <main className="hidden lg:flex w-[95%] gap-[3%] pt-[2vh] m-auto min-h-[100dvh] justify-between items-start">
        <div className="basis-[70%] h-full ">
          <JerseyGallery images={images} />
        </div>

        <div className="basis-[30%] h-full ">
          <h1 className="text-5xl lg:text-6xl tracking-tighter mb-6 font-black capitalize">
            {productToRender.title}
          </h1>

          <p className="text-md tracking-tighter mb-6 font-normal">
            {productToRender.description}
          </p>
          <ul className="text-md tracking-tighter mb-6 font-normal list-inside list-disc">
            <li>
              {t('materials')} {" "}
              {productToRender.materials.map((m, idx: number, arr) => (
                <span key={m.materialName}>
                  {m.percentage}% {m.materialName}{" "}
                  {idx === arr.length - 1 ? "" : "- "}
                </span>
              ))}
            </li>
            <li>
              {t('details')} {" "}
              {productToRender.details.map((d, idx: number, arr) => (
                <span key={d}>
                  {d} {idx === arr.length - 1 ? "" : "- "}
                </span>
              ))}
            </li>
            <li>{t('washing')} {productToRender.washing}</li>
          </ul>

          <div className="text-5xl lg:text-6xl tracking-tighter mb-6 font-black capitalize">
            {productToRender.isPromotion && productToRender.salePrice ? (
              <div className="flex items-center gap-3">
                <span className="text-[#FF6B35]">€ {productToRender.salePrice}.00</span>
                <span className="text-accent line-through opacity-70 text-3xl lg:text-4xl">€ {productToRender.price}.00</span>
              </div>
            ) : (
              <span className="text-accent">€ {productToRender.price}.00</span>
            )}
          </div>

          <DesktopSizesAndColors product={productToRender} />

          {/* <CounterAddButton /> */}

          <div className="my-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              {t('dimensions')}
            </h2>
            <DimensionsTable productType={productToRender.type} productTitle={productToRender.title} />
          </div>
        </div>
      </main>


            {/* MOBILE */}
      <main className="pt-[1vw] min-h-[100dvh] w-[95%] m-auto block lg:hidden">
        <MobileProductGalery images={images} />

        <h1 className="text-3xl tracking-tighter mb-6 font-black capitalize">
          {productToRender.title}
        </h1>

        <p className="text-md tracking-tighter mb-6 font-normal">
          {productToRender.description}
        </p>

        <ul className="text-md tracking-tighter mb-6 font-normal list-inside list-disc">
          <li>
            {t('materials')} {" "}
            {productToRender.materials.map((m, idx: number, arr) => (
              <span key={m.materialName}>
                {m.percentage}% {m.materialName}{" "}
                {idx === arr.length - 1 ? "" : "- "}
              </span>
            ))}
          </li>
          <li>
            {t('details')} {" "}
            {productToRender.details.map((d, idx: number, arr) => (
              <span key={d}>
                {d} {idx === arr.length - 1 ? "" : "- "}
              </span>
            ))}
          </li>
          <li>{t('washing')} {productToRender.washing}</li>
        </ul>

        <div className="text-5xl tracking-tighter mb-6 font-black capitalize">
          {productToRender.isPromotion && productToRender.salePrice ? (
            <div className="flex items-center gap-3">
              <span className="text-[#FF6B35]">€ {productToRender.salePrice}.00</span>
              <span className="text-accent line-through opacity-70 text-3xl">€ {productToRender.price}.00</span>
            </div>
          ) : (
            <span className="text-accent">€ {productToRender.price}.00</span>
          )}
        </div>

        <div className="my-6">
          <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
            {t('dimensions')}
          </h2>
          <DimensionsTable productType={productToRender.type} productTitle={productToRender.title} />
        </div>
      </main>

      <MobileProductActions product={productToRender} />
      <FeaturedProducts />
    </>
  );
}
