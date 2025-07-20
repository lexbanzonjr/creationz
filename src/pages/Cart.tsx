import React, { useEffect, useState } from "react";

import { Image } from "../types/global";
import useCart from "../hooks/useCart";
import { useAuthStore } from "../hooks/useAuthStore";
import { getImage as getImageApi } from "../api/binaryApi";
import ImageCarousel from "../components/ImageCarousel";

const Cart: React.FC = () => {
  const { cart: myCart, calculateSubTotal, fetch: fetchCart } = useCart();
  const { token } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<Record<string, Image>>({});
  const [subTotal, setSubTotal] = useState<string>("0.0");

  useEffect(() => {
    const fetchCartData = async () => {
      if (!token) return;

      try {
        const cart = await fetchCart({ token });
        if (!cart?.products) return;

        // Fetch all product images
        const imageIds = cart.products
          .filter((item) => item.product?.image_id)
          .flatMap((item) => item.product.image_id);

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

        const total = await calculateSubTotal({ token });
        setSubTotal(total);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [calculateSubTotal, fetchCart, token]);

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  const CartItem = ({ item }: { item: any }) => {
    if (!item.product?.image_id) return null;

    const productImages = item.product.image_id
      .map((id: string) => images[id])
      .filter(Boolean);

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-48">
          <ImageCarousel
            images={productImages}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {item.product.name}
          </h3>
          <p className="text-gray-600 mb-2">{item.product.description}</p>
          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Quantity: {item.quantity}</span>
              <span className="text-lg font-bold text-blue-600">
                ${(item.product.cost * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {myCart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {myCart.products.map((item, index) => (
            <CartItem
              key={item?.product?._id || `cart-item-${index}`}
              item={item}
            />
          ))}
          <div className="bg-white rounded-lg shadow-md p-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${subTotal}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
