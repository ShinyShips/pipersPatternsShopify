import React, { useState, useEffect, useRef } from 'react';
import {
    cart,
    isCartDrawerOpen,
    removeCartItems,
    isCartUpdating,
} from "../stores/cart";

export default function CartDrawer({isOpen, onClose}) {
    const cartDrawerEl = useRef(null);

    useEffect(() => {
    if (isOpen) {
        document.querySelector("body")?.classList.add("overflow-hidden");
        cartDrawerEl.current?.focus();
    }
    }, [isOpen]);

    const removeItem = (id) => {
        removeCartItems([id]);
    };

    const closeCartDrawer = () => {
        document.querySelector("body")?.classList.remove("overflow-hidden");
        onClose();
    };

    const onKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    };

    return (
        <div
            className="relative z-50"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
            aria-label="cart drawer"
        >
            <div className={`${isOpen ? 'fixed' : `relative`} inset-0 bg-slate-400/50 backdrop-blur-sm transition-opacity`} />
            <div className={`${isOpen ? 'fixed' : `relative`} inset-0 overflow-hidden`}>
            <div className="relative inset-0 overflow-hidden">
                <div
                    className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => closeCartDrawer()}
                    ref={cartDrawerEl}
                    onKeyDown={onKeyDown}
                >
                <div className={`fixed flex flex-col pointer-events-auto w-11/12 h-full max-w-lg max-h-screen bg-white border-l-2 border-black transition-all ${isOpen ? "right-0 duration-300" : "-right-[100rem] duration-500"}`}>
                    <div className="flex w-full justify-between font-semibold text-2xl px-4 py-4 border-b">
                        <h2>Your Cart</h2>
                        <div className="ml-3 flex h-7 items-center">
                            <button
                                onClick={() => closeCartDrawer()}
                                type="button"
                                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Close panel</span>
                                <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="px-4 mt-8">
                        <div className="flex-1 overflow-y-scroll">
                            <div className="px-5">
                            {cart.value && cart.value.lines?.nodes.length > 0 ? (
                                <ul role="list" className={`divide-y divide-zinc-100 ${cartIsUpdatingClass}`}>
                                {cart.value.lines.nodes.map((item) => (
                                    <li className="grid py-8 grid-cols-12 gap-3" key={item.id}>
                                    <div className="overflow-hidden rounded-lg col-span-3 lg:col-span-2">
                                        <ShopifyImage
                                        image={item.merchandise.image}
                                        classList="object-cover h-full object-center aspect-1"
                                        sizes="(min-width: 100px) 100px"
                                        loading="lazy"
                                        />
                                    </div>
                                    <div className="col-span-7 lg:col-span-8 flex flex-col gap-2">
                                        <a className="hover:underline w-fit" href={`/products/${item.merchandise.product.handle}`}>
                                        {item.merchandise.product.title}
                                        </a>
                                        <p className="text-xs">
                                        <Money price={item.cost.amountPerQuantity} />
                                        </p>
                                    </div>
                                    <div className="col-span-2 items-end flex justify-between flex-col">
                                        <button
                                        onClick={() => {
                                            removeItem(item.id);
                                        }}
                                        type="button"
                                        disabled={isCartUpdating}
                                        >
                                        {/* SVG code omitted for brevity */}
                                        </button>
                                        <div>
                                        <p className="font-medium">
                                            <Money price={item.cost.totalAmount} />
                                        </p>
                                        </div>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            ) : (
                                <div className="text-center mt-20">
                                <p className="text-gray-500">Your cart is empty</p>
                                <a href="/" className="font-semibold text-emerald-900 hover:text-emerald-700">
                                    Continue Shopping <span aria-hidden="true"> &rarr;</span>
                                </a>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                    {cart.value && cart.value.lines?.nodes.length > 0 &&
                        <div className="absolute flex flex-col w-full bottom-0 px-4 py-8 border-t">
                            <div className="flex justify-between w-full font-semibold">
                                <p>Subtotal</p>
                                <p className='text-right'>
                                    <Money
                                        price={cart.value.cost.subtotalAmount}
                                        showCurrency={true}
                                    />
                                </p>
                            </div>
                            <p className="text-sm mt-1">Shipping and taxes calculated at checkout.</p>
                            <a href={cart.value.checkoutUrl} className='relative w-full h-fit mt-6 p-4 bg-black text-white rounded-lg'>
                                Checkout
                            </a>
                        </div>
                    }
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};