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
        if (!cart?.items?.length) return;

        // Collect all unique image IDs
        const imageIds = [
          ...new Set(cart.items.flatMap((item) => item.product.image_id)),
        ];

        // Fetch images and subtotal in parallel
        const [imageResults, total] = await Promise.all([
          Promise.all(imageIds.map((id) => getImageApi({ _id: id }))),
          calculateSubTotal(),
        ]);

        // Build image map
        const imageMap = imageResults
          .filter(Boolean)
          .reduce((acc, image) => ({ ...acc, [image._id]: image }), {});

        setImages(imageMap);
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

  if (!myCart.items.length) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const CartItem = ({ item, index }: { item: any; index: number }) => {
    const productImages =
      item.product?.image_id
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
              <ImageCarousel images={productImages} />
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
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      <div className="space-y-6">
        {myCart.items.map((item, index) => (
          <CartItem
            key={item?.product?._id || `cart-item-${index}`}
            item={item}
            index={index}
          />
        ))}
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
