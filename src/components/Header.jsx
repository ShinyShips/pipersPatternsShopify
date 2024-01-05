import { useState } from 'react';
import DogIcon from '../icons/DogIcon.jsx';
import MenuIcon from '../icons/MenuIcon.jsx';
import ShoppingCartIcon from '../icons/ShoppingCartIcon.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import CartDrawer from './CartDrawer.jsx';


export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="fixed top- left-0 z-50 w-screen">
            <AnnouncementBar open={open} />
            <div>
                <div className={`relative px-4 lg:px-6 h-14 flex items-center justify-between z-20 transition-all duration-500 ${open ? "bg-black border-white" : "bg-white border-black"}  border-b-2 border-t-2`}>
                    <a className="relative flex items-center justify-center" href="/">
                        <DogIcon />
                        <span className="lg:flex ml-2 text-lg font-extrabold tracking-wide text-black">Piper's Patterns</span>
                        <span className="sr-only">Piper's Patterns Store</span>
                    </a>
                    <nav className="hidden lg:flex ml-auto gap-4 sm:gap-6">
                        <a className="text-sm font-bold hover:text-black underline-offset-4 text-black" href="/">
                        Home
                        </a>
                        <a className="text-sm font-bold hover:text-black underline-offset-4 text-black" href="/shop">
                        Shop
                        </a>
                        <a className="text-sm font-bold hover:text-black underline-offset-4 text-black scroll-smooth" href="/#about">
                        About
                        </a>
                        <a className="text-sm font-bold hover:text-black underline-offset-4 text-black" href="/contact">
                        Contact
                        </a>
                    </nav>
                    <nav className="flex w-20 items-center justify-between" >
                        { !open ?
                            <>
                                <div
                                    className="flex lg:ml-auto"
                                    disabled={open}
                                    aria-label="Open cart"
                                >
                                    <ShoppingCartIcon />
                                </div>
                                <button
                                    className={`flex justify-center items-center lg:hidden transition-all duration-250 ${open ? "text-white" : "text-black"}`}
                                    onClick={() => setOpen(!open)}
                                    aria-label="Open menu"
                                >
                                    <MenuIcon />
                                </button>
                            </> :
                            <div className="mr-0 ml-auto flex h-7 items-end justify-end">
                                <button
                                    onClick={() => setOpen(!open)}
                                    type="button"
                                    className="-m-2 p-2 text-white hover:text-gray-500"
                                    aria-label='Close menu'
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
                        }
                    </nav>
                </div>
                <DropdownMenu open={open} setOpen={setOpen}/>
            </div>
            <CartDrawer />
        </header>

    );
}

