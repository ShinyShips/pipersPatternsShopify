import { useState } from 'react';
import DogIcon from '../icons/DogIcon.jsx';
import MenuIcon from '../icons/MenuIcon.jsx';
import ShoppingCartIcon from '../icons/ShoppingCartIcon.jsx';
import DropdownMenu from './DropdownMenu.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';
import CartDrawer from './CartDrawer.jsx';


export default function Header() {
    const [open, setOpen] = useState(false);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

    const handleCartIconClick = () => {
        setIsCartDrawerOpen(true);
    };

    const closeCartDrawer = () => {
        setIsCartDrawerOpen(false);
    };

    return (
        <>
            <AnnouncementBar open={open} />
            <header>
                <div className={`relative px-4 lg:px-6 h-14 flex items-center justify-between z-20 transition-all duration-200 ${open ? "bg-black border-white" : "bg-white border-black"}  border-b-2 border-t-2`}>
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
                        <a className="text-sm font-bold hover:text-black underline-offset-4 text-black scroll-smooth" href="#about">
                        About
                        </a>
                        <a className="text-sm font-bold hover:text-black underline-offset-4 text-black" href="#">
                        Contact
                        </a>
                    </nav>
                    <nav className="flex w-20 justify-between" >
                        <button
                            className="flex lg:ml-auto"
                            disabled={open}
                            onClick={handleCartIconClick}
                            aria-label="Open cart"
                        >
                            <ShoppingCartIcon />
                        </button>
                        { !open ?
                            <button
                                className={`flex lg:hidden transition-all duration-250 ${open ? "text-white" : "text-black"}`}
                                onClick={() => setOpen(!open)}
                                aria-label="Open menu"
                            >
                                <MenuIcon />
                            </button> :
                            <div className="ml-3 flex h-7 items-center">
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
            </header>
            <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />
        </>

    );
}
