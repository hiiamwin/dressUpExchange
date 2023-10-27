import { getAllProduct, getProductByCategory } from "@/lib";
import { IProduct, IProductList } from "@/types";
import React, { Suspense } from "react";
import { ProductCard } from "./components";
import Link from "next/link";
import Loading from "./loading";

export default async function Product({
  searchParams,
}: {
  searchParams: { category: string; SortOrderPrice?: string };
}) {
  const listProduct: IProductList = await getProductByCategory(
    searchParams.category,
    searchParams.SortOrderPrice
  );
  return (
    <div className="flex">
      <div className="w-[12%] p-4 my-5 ml-5 bg-stone-200">
        <div className="font-bold text-base">Category</div>
        <div className="ml-4">
          <div className="ml-2 mt-1">
            <Link
              className="text-xs hover:text-orange-500"
              href="/product?category=costume"
              replace={true}
            >
              Costume
            </Link>
          </div>
          <div className="ml-2 mt-1">
            <Link
              className="text-xs hover:text-orange-500"
              href="/product?category=wig"
              replace={true}
            >
              Wig
            </Link>
          </div>
          <div className="ml-2 mt-1">
            <Link
              className="text-xs hover:text-orange-500"
              href="/product?category=others"
              replace={true}
            >
              Others
            </Link>
          </div>
        </div>
        <div className="font-bold text-base mt-2">Sort By</div>
        <div className="ml-4">
          <div id="dropdown" className="z-10 ">
            <ul
              className="py-2 text-xs"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="mb-2 hover:text-orange-500">
                <Link
                  href={`/product?SortOrderPrice=0&category=${searchParams.category}`}
                  className="px-2 py-2 my-2"
                  replace={true}
                >
                  Ascending Price
                </Link>
              </li>
              <li className="mb-2 hover:text-orange-500">
                <Link
                  href={`/product?SortOrderPrice=1&category=${searchParams.category}`}
                  className="px-2 py-2 my-2"
                  replace={true}
                >
                  Decending Price
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="font-bold text-base my-2">My Wish List</div>
        <div className="text-xs ml-5 my-2 text-stone-500">
          You have no items in your wishlist.
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <div className="flex-1 mx-5 grid grid-cols-4 gap-4 my-5 p-4 bg-stone-200">
          {listProduct?.items.map((product) => (
            <ProductCard
              key={product.productId}
              name={product.name}
              price={product.price}
              productId={product.productId}
              thumbnail={product.thumbnail}
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
