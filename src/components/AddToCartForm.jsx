import React, { useState, useEffect } from 'react';
import { addCartItem, isCartUpdating, cart } from '../stores/cart.ts';
import { useStore } from '@nanostores/react';


function AddToCartForm({ variantId, variantQuantityAvailable, variantAvailableForSale }) {
  const [variantInCart, setVariantInCart] = useState(null);
  const [noQuantityLeft, setNoQuantityLeft] = useState();
  const $cart = useStore(cart);
  const $isCartUpdating = useStore(isCartUpdating);



  useEffect(() => {
    const variant = $cart && $cart.lines?.nodes.filter((item) => item.merchandise.id === variantId)[0];
    setVariantInCart(variant);
    setNoQuantityLeft(variant && variantQuantityAvailable <= variantInCart?.quantity);
  }, [$cart, variantId, variantQuantityAvailable]);

  function addToCart(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { id, quantity } = Object.fromEntries(formData.entries());
    const item = {
      id,
      quantity: parseInt(quantity),
    };
    addCartItem(item);
  }

  return (
    <form onSubmit={(e) => addToCart(e)}>
      <input type="hidden" name="id" value={variantId} />
      <input type="hidden" name="quantity" value="1" />

      <button
        type="submit"
        className={`flex justify-center button mt-10 w-full bg-black text-white py-3 rounded hover:bg-gray-900 disabled:bg-gray-400 ${noQuantityLeft || !variantAvailableForSale ? 'cursor-not-allowed' : ''}`}
        disabled={$isCartUpdating || noQuantityLeft || !variantAvailableForSale}
      >
        {$isCartUpdating &&
          <svg className="animate-spin inline-block mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        }
        {variantAvailableForSale ? 'Add to Cart' : 'Sold Out'}
      </button>
      {
        noQuantityLeft && (
          <div className="text-center text-red-600">
            <small>You already have all units left in your cart</small>
          </div>
        )
      }
    </form>
  );
}

export default AddToCartForm;