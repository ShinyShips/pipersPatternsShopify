export default function AnnouncementBar({open}) {
  const message = "🎄 Free delivery for Christmas 🎁";
  return (
    <div className={`sticky flex items-center min-h-[36px] justify-center transition-all duration-200 ${open ? 'bg-black text-black' : 'bg-gradient-to-r from-[#2ca5d5] to-[#e81cff]'} px-4 py-2 text-sm font-bold text-white sm:px-6 lg:px-8 z-20`}>
      {open ? null : message}
    </div>
  );
}

