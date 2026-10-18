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
          <span className="text-xs font-bold uppercase tracking-widest text-[#800000] dark:text-[var(--gold)]">
            Visual Highlights
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E3A8A] dark:text-blue-300 font-serif">
            Campus Photo Gallery
          </h1>
          <p className="text-sm text-[var(--text)]/80">
            A glimpse into life at RBANMS Pre-University College: heritage architecture, laboratories, athletic competitions, and cultural celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-[var(--card)] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#1E3A8A] hover:shadow-xl transition"
            >
              <div className="relative w-full h-64 overflow-hidden bg-[var(--maroon-dark)]">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[var(--maroon-dark)]/90 backdrop-blur-md text-[var(--gold)] border border-[var(--gold)]/30 text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-bold text-base text-[#1E3A8A] dark:text-blue-300 group-hover:text-[#800000] dark:group-hover:text-[var(--gold)] transition">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="text-xs text-[var(--text)]/70 line-clamp-2">
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
