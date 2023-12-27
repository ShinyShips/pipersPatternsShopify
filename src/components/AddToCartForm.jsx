import React, { useState, useEffect } from 'react';
import { addCartItem, isCartUpdating, cart } from '../stores/cart.ts';

function AddToCartForm({ variantId, variantQuantityAvailable, variantAvailableForSale }) {
  const [variantInCart, setVariantInCart] = useState(null);
  const [noQuantityLeft, setNoQuantityLeft] = useState(false);

  useEffect(() => {
    const variant = cart && cart.lines?.nodes.filter((item) => item.merchandise.id === variantId)[0];
    setVariantInCart(variant);
    setNoQuantityLeft(variant && variantQuantityAvailable <= variant?.quantity);
  }, [cart, variantId, variantQuantityAvailable]);

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
    <form onSubmit={addToCart}>
      <input type="hidden" name="id" value={variantId} />
      <input type="hidden" name="quantity" value="1" />

      <button
        type="submit"
        className="button mt-10 w-full"
        disabled={isCartUpdating || noQuantityLeft || !variantAvailableForSale}
      >
        Add to Cart
      </button>
    </form>
  );
}

export default AddToCartForm;