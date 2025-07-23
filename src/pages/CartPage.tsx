import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cart, CartItem, Image, Order } from "../types/global";
import useCart from "../hooks/useCart";
import { getImage as getImageApi } from "../api/binaryApi";
import ImageCarousel from "../components/ImageCarousel";
import RemoveButton from "../components/RemoveButton";
import GreenButton from "../components/GreenButton";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    calculateSubTotal,
    fetch: fetchCart,
    removeItem,
    createOrder,
  } = useCart();
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const [images, setImages] = useState<Record<string, Image>>({});
  const [subTotal, setSubTotal] = useState<string>("0.00");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cart = await fetchCart();
        setCart(cart);
        if (!cart?.items?.length) return; // Collect all unique image IDs and filter out invalid ones
        const imageIds = Array.from(
          new Set(cart.items.flatMap((item) => item.product.image_id))
        ).filter((id) => id && id.trim() !== "");

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
  const handleCreateOrder = async () => {
    setIsOrdering(true);
    try {
      const orderData: Order = {
        _id: "",
        status: "pending",
      };

      const createdOrder = await createOrder(orderData);

      // Navigate to order summary page with the order data
      navigate("/order-summary", { state: { order: createdOrder } });
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Failed to create order. Please try again.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }
  const CartItem = ({ item, index }: { item: CartItem; index: number }) => {
    const productImages =
      item.product?.image_id?.map((id: string) => images[id]).filter(Boolean) ||
      [];

    const handleRemove = async () => {
      try {
        const updatedCart = await removeItem(item._id!);
        setCart(updatedCart);
        const total = await calculateSubTotal();
        setSubTotal(total);
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    };

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
            <div className="text-right flex flex-col justify-between items-end">
              <RemoveButton onClick={handleRemove} />
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
        {cart.items.map((item: CartItem, index: number) => (
          <CartItem
            key={item?.product?._id || `cart-item-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>{" "}
      <div className="mt-8 pt-4 border-t-2">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">Total:</span>
          <span className="text-2xl font-bold">${subTotal}</span>
        </div>

        <div className="flex justify-end">
          <GreenButton
            onClick={handleCreateOrder}
            disabled={isOrdering || cart.items.length === 0}
            className="px-8 py-3 text-lg"
          >
            {isOrdering ? "Processing..." : "Place Order"}
          </GreenButton>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
