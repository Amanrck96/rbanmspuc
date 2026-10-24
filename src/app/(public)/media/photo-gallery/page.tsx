import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Camera, Image as ImageIcon } from "lucide-react";

export default async function PhotoGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            Visual Highlights
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black font-serif">
            Campus Photo Gallery
          </h1>
          <p className="text-sm text-gray-700">
            A glimpse into life at RBANMS Pre-University College: heritage architecture, laboratories, athletic competitions, and cultural celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:border-black transition"
            >
              <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300 grayscale"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-black border border-gray-300 text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-bold text-base text-black group-hover:underline transition">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
