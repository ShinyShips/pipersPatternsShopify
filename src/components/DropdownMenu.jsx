export default function DropdownMenu({open, setOpen}) {
    return (
        <div className={`absolute transition-all  ${open ? "top-[5.75rem] duration-300" : "-top-96 duration-500"} left-0 z-20`}>
            <nav className="flex flex-col bg-black w-screen h-fit pl-8 pb-8">
                <a className="text-xl hover:text-gray-400 underline-offset-4 text-white pt-8" href="/" onClick={() => setOpen(!open)}>
                    Home
                </a>
                <a className="text-xl hover:text-gray-400 underline-offset-4 text-white pt-8" href="/shop" onClick={() => setOpen(!open)}>
                    Shop
                </a>
                <a className="text-xl hover:text-gray-400 underline-offset-4 text-white pt-8" href="/#about" onClick={() => setOpen(!open)}>
                    About
                </a>
                <a className="text-xl hover:text-gray-400 underline-offset-4 text-white pt-8" href="#" onClick={() => setOpen(!open)}>
                    Contact
                </a>
            </nav>
        </div>
    );
}

