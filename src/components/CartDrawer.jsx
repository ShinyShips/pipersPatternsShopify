import { useEffect, useRef, useState } from 'react';
import {
    cart,
    isCartDrawerOpen,
    removeCartItems,
    isCartUpdating,
} from "../stores/cart";
import ShopifyImage from "./ShopifyImage";
import Money from "./Money";
import { useStore } from '@nanostores/react';


export default function CartDrawer() {
    const cartDrawerEl = useRef(null);
    const $isCartDrawerOpen = useStore(isCartDrawerOpen);
    const [isCartDrawerOpenInstance, setisCartDrawerOpenInstance] = useState($isCartDrawerOpen);
    const $cart = useStore(cart);
    const [cartInstance, setCartInstance] = useState(null);

    let cartIsUpdatingClass = isCartUpdating.value ? "opacity-50 pointer-events-none" : "";

    useEffect(() => {
        setisCartDrawerOpenInstance($isCartDrawerOpen);
        setCartInstance($cart);
        if ($isCartDrawerOpen) {
            document.querySelector("body")?.classList.add("overflow-hidden");
            cartDrawerEl.current?.focus();
        }
    }, [$cart, $isCartDrawerOpen]);

    const removeItem = (id) => {
        removeCartItems([id]);
    };

    const closeCartDrawer = () => {
        document.querySelector("body")?.classList.remove("overflow-hidden");
        isCartDrawerOpen.set(false);
    };

    const onKeyDown = (event) => {
        if (event.key === "Escape") {
            isCartDrawerOpen.set(false);
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
            <div className={`${isCartDrawerOpenInstance ? 'fixed' : `relative`} inset-0 bg-slate-400/50 backdrop-blur-sm transition-opacity`} />
            <div
                className={`${isCartDrawerOpenInstance ? 'fixed' : `relative`} inset-0 overflow-hidden`}
                onClick={() => closeCartDrawer()}
            >
                <div className="relative inset-0 overflow-hidden">
                    <div
                        className="pointer-events-none fixed inset-y-0 right-0 flex w-screen pl-6 focus:outline-none"
                        tabIndex={-1}
                        ref={cartDrawerEl}
                        onKeyDown={onKeyDown}
                    >
                        <div
                            className={`fixed flex flex-col pointer-events-auto w-11/12 h-full max-w-lg max-h-screen bg-white border-l-2 border-black transition-all ${isCartDrawerOpenInstance ? "right-0 duration-300" : "-right-[100rem] duration-500"}`}
                        >
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
                            <div className="px-4 mt-2">
                                <div className="flex-1 overflow-y-hidden">
                                    <div className="px-5">
                                    {cartInstance && cartInstance.lines?.nodes.length > 0 ? (
                                        <ul role="list" className={`divide-y divide-zinc-100 ${cartIsUpdatingClass}`}>
                                        {cartInstance.lines.nodes.map((item) => (
                                            <li className="grid py-8 grid-cols-12 gap-3 overflow-hidden" key={item.id}>
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
                                                    <p className="text-xs">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="col-span-2 items-end flex justify-between flex-col">
                                                    <button
                                                        onClick={() => {
                                                            removeItem(item.id);
                                                        }}
                                                        type="button"
                                                        disabled={isCartUpdating.value}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
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
                                        <a href="/shop" className="font-semibold text-emerald-900 hover:text-emerald-700">
                                            Continue Shopping <span aria-hidden="true"> &rarr;</span>
                                        </a>
                                        </div>
                                    )}
                                    </div>
                                </div>
                            </div>
                            {cartInstance && cartInstance.lines?.nodes.length > 0 &&
                                <div className="absolute flex flex-col w-full bottom-0 px-4 py-8 border-t">
                                    <div className="flex justify-between w-full font-semibold">
                                        <p>Subtotal</p>
                                        <p className='text-right'>
                                            <Money
                                                price={cartInstance.cost.subtotalAmount}
                                                showCurrency={true}
                                            />
                                        </p>
                                    </div>
                                    <p className="text-sm mt-1">Shipping and taxes calculated at checkout.</p>
                                    <a href={cartInstance.checkoutUrl} className='relative flex justify-center w-full h-fit mt-6 p-4 bg-black text-white rounded-lg'>
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