import Counter from "@/app/Components/Common/Counter";
import FeaturedProducts from "@/app/Components/Common/FeaturedProducts";
import MobileProductGalery from "@/app/Components/Common/MobileProductGalery";
import DimensionsTable, { sizes } from "@/app/Components/Common/SizingTable";
import { allProducts } from "@/app/Components/Home/ListItemsByTypeSection";
import JerseyGallery from "@/app/Components/ProductPage/ProductGallery";


interface Props {
  params: Promise<{ id: string }>; // note: params is async
}

export default async function UserPage({ params }: Props) {
  const { id } = await params;
  //   const res = await fetch(`https://api.example.com/users/${id}`);
  //   const user = await res.json();

  const productToRender = allProducts.find((p) => p._id === id);

  if (!productToRender) return <>No Product</>;

  const images = Object.values(productToRender.gallery);

  return (
    <>
      <main className="hidden lg:flex w-[95%] gap-[3%] m-auto min-h-[100dvh] pt-[80px] justify-between items-start">
        <div className="basis-[70%] h-full ">
          <JerseyGallery images={images} />
        </div>

        <div className="basis-[30%] h-full ">
          <h1 className="text-5xl tracking-tighter mb-6 font-black capitalize">
            {productToRender.name}
          </h1>

          <p className="text-md tracking-tighter mb-6 font-normal">
            {productToRender.description.desc}
          </p>
          <ul className="text-md tracking-tighter mb-6 font-normal list-inside list-disc">
            <li>
              Materials:{" "}
              {productToRender.materials.map((m, idx: number, arr) => (
                <span key={m.materialName}>
                  {m.percentage}% {m.materialName}{" "}
                  {idx === arr.length - 1 ? "" : "- "}
                </span>
              ))}
            </li>
            <li>
              Details:{" "}
              {productToRender.details.map((d, idx: number, arr) => (
                <span key={d}>
                  {d} {idx === arr.length - 1 ? "" : "- "}
                </span>
              ))}
            </li>
            <li>Washing: {productToRender.washing}</li>
          </ul>

          <p className="text-5xl tracking-tighter mb-6 font-black capitalize text-accent">
            € {productToRender.price}.00
          </p>

          <div className="mb-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Sizes
            </h2>
            <div className="flex justify-start items-center gap-1">
              {Object.entries(productToRender.sizes)
                .map(([name, quantity]) => ({ name, quantity }))
                .map((s) => (
                  <button
                    disabled={s.quantity === 0}
                    key={s.name}
                    className={`hover:scale-105 transition-transform ease-in-out delay-100 cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px]  p-1 w-[30px] h-[30px] ${
                      s.quantity === 0
                        ? "bg-[#e0dede] border-gray-400 text-gray-500"
                        : "border-black"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
            </div>
          </div>

           <div className="mb-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Colors
            </h2>
            <div className="flex justify-start items-center gap-1">
              {productToRender.colors
                .map((s) => (
                  <button
                    // disabled={s.quantity === 0}
                    key={s.name}
                    className={`hover:scale-105 transition-transform ease-in-out delay-100 cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px] p-1 w-[30px] h-[30px]`}
                    style={{backgroundColor: s.color}}
                  >
                  </button>
                ))}
            </div>
          </div>

          <div className="mb-6 pb-6 border-b-[1px] border-black">
            <p className="text-sm">Add to Cart</p>
            <div className="flex gap-4">
             <Counter borderColor="#000000"/>
              <button className="bg-black p-2 px-8 text-white">
                Add To Cart
              </button>
            </div>
          </div>

          <div className="my-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Dimensions
            </h2>
            <DimensionsTable sizes={sizes} />
          </div>
        </div>
      </main>

      <main className="pt-[80px] min-h-[100dvh] w-[95%] m-auto block lg:hidden">

        <MobileProductGalery images={images}/>

        <h1 className="text-3xl tracking-tighter mb-6 font-black capitalize">
          {productToRender.name}
        </h1>

        <p className="text-md tracking-tighter mb-6 font-normal">
          {productToRender.description.desc}
        </p>

          <ul className="text-md tracking-tighter mb-6 font-normal list-inside list-disc">
            <li>
              Materials:{" "}
              {productToRender.materials.map((m, idx: number, arr) => (
                <span key={m.materialName}>
                  {m.percentage}% {m.materialName}{" "}
                  {idx === arr.length - 1 ? "" : "- "}
                </span>
              ))}
            </li>
            <li>
              Details:{" "}
              {productToRender.details.map((d, idx: number, arr) => (
                <span key={d}>
                  {d} {idx === arr.length - 1 ? "" : "- "}
                </span>
              ))}
            </li>
            <li>Washing: {productToRender.washing}</li>
          </ul>

          <p className="text-5xl tracking-tighter mb-6 font-black capitalize text-accent">
            € {productToRender.price}.00
          </p>

          <div className="mb-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Sizes
            </h2>
            <div className="flex justify-start items-center gap-1">
              {Object.entries(productToRender.sizes)
                .map(([name, quantity]) => ({ name, quantity }))
                .map((s) => (
                  <button
                    disabled={s.quantity === 0}
                    key={s.name}
                    className={`cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px]  p-1 w-[30px] h-[30px] ${
                      s.quantity === 0
                        ? "bg-[#e0dede] border-gray-400 text-gray-500"
                        : "border-black"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
            </div>
          </div>
            <div className="mb-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Colors
            </h2>
            <div className="flex justify-start items-center gap-1">
              {productToRender.colors
                .map((s) => (
                  <button
                    // disabled={s.quantity === 0}
                    key={s.name}
                    className={`hover:scale-105 transition-transform ease-in-out delay-100 cursor-pointer flex justify-center items-center uppercase text-sm font-medium border-[1px] p-1 w-[30px] h-[30px]`}
                    style={{backgroundColor: s.color}}
                  >
                  </button>
                ))}
            </div>
          </div>

           <div className="my-6">
            <h2 className="text-2xl tracking-tighter mb-2 font-black capitalize">
              Dimensions
            </h2>
            <DimensionsTable sizes={sizes} />
          </div>
      </main>

      <div className="fixed lg:hidden z-[9000] left-0 bottom-0 right-0 bg-white flex justify-between items-stretch  shadow-glow-top">
        <Counter />
        <div className="basis-[25%] text-lg tracking-tighter py-5 font-black capitalize text-white flex justify-center items-center bg-black">
          €{productToRender.price}.00
        </div>
        <button className="font-bold tracking-tighter basis-[40%] bg-accent !bg-t-[#c39f3f] text-white ">
          Add To Cart
        </button>
      </div>
      <FeaturedProducts />

    </>
  );
}
