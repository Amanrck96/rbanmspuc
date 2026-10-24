import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { eventDate: "asc" },
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-black">
            College Calendar
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black font-serif">
            Events & Celebrations
          </h1>
          <p className="text-sm text-gray-700">
            From Founder&apos;s Memorial Day and Science Fests to Athletic Meets and Cultural Extravaganzas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:border-black transition flex flex-col justify-between"
            >
              {ev.imageUrl && (
                <div className="relative w-full h-48 bg-gray-100">
                  <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover grayscale" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-black border border-gray-300 text-xs font-bold uppercase">
                      {ev.category}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-black font-semibold">
                  <Calendar className="w-4 h-4 shrink-0 text-black" />
                  <span>
                    {new Date(ev.eventDate).toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black font-serif">
                  {ev.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {ev.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-black" /> {ev.venue}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
