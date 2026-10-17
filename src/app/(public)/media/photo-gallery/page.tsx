import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Camera, Image as ImageIcon } from "lucide-react";

export default async function PhotoGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
            Visual Highlights
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 font-serif">
            Campus Photo Gallery
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A glimpse into life at RBANMS Pre-University College: heritage architecture, laboratories, athletic competitions, and cultural celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition"
            >
              <div className="relative w-full h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
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
