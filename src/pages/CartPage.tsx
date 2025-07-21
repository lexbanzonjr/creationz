import React, { useEffect, useState } from "react";

import { Image } from "../types/global";
import useCart from "../hooks/useCart";
import { getImage as getImageApi } from "../api/binaryApi";
import ImageCarousel from "../components/ImageCarousel";

const CartPage: React.FC = () => {
  const { cart: myCart, calculateSubTotal, fetch: fetchCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Record<string, Image>>({});
  const [subTotal, setSubTotal] = useState<string>("0.00");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cart = await fetchCart();
        if (!cart?.items) return;

        const imageIds: string[] = [];
        for (const item of cart.items) {
          const product = item.product;
          for (const image of product.image_id) {
            imageIds.push(image);
          }
        }

        if (imageIds.length > 0) {
          const imageResults = await Promise.all(
            imageIds.map((id) => getImageApi({ _id: id }))
          );

          const imageMap = imageResults.filter(Boolean).reduce((acc, image) => {
            acc[image._id] = image;
            return acc;
          }, {} as Record<string, Image>);

          setImages(imageMap);
        }

        const total = await calculateSubTotal();
        setSubTotal(total);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [calculateSubTotal, fetchCart]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (myCart.items.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      <div className="space-y-6">
        {myCart.items.map((item, index) => {
          const productImages = item.product?.image_id
            ?.map((id: string) => images[id])
            .filter(Boolean) || [];

          return (
            <div
              key={item?.product?._id || `cart-item-${index}`}
              className="bg-white rounded-lg border p-4"
            >
              <div className="flex gap-4">
                <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded">
                  {productImages.length > 0 ? (
                    <div className="w-full h-full">
                      <ImageCarousel images={productImages} />
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">
                      ${(item.product.cost * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t-2">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold">${subTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
