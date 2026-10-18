"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, GraduationCap, Award, BookOpen } from "lucide-react";

interface FacultyItem {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  email?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  isPublished: boolean;
}

interface DepartmentItem {
  id: string;
  name: string;
  stream: string;
  labs?: string | null;
  faculty: FacultyItem[];
}

export default function FacultyDirectoryClient({
  departments,
}: {
  departments: DepartmentItem[];
}) {
  const [selectedStream, setSelectedStream] = useState("ALL");

  const streams = ["ALL", "Science", "Commerce", "Arts", "Languages"];

  const filteredDepts =
    selectedStream === "ALL"
      ? departments
      : departments.filter(
          (d) => d.stream.toLowerCase() === selectedStream.toLowerCase()
        );

  return (
    <div className="space-y-12">
      {/* Stream Tabs with Maroon (#800000) for Active Tab */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {streams.map((stream) => {
          const isActive = selectedStream.toLowerCase() === stream.toLowerCase();
          return (
            <button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                isActive
                  ? "tab-active bg-[#800000] text-white shadow-md border border-[#800000]"
                  : "tab-inactive bg-[#F1F5F9] text-black border border-[#CBD5E1] hover:border-[#800000]/40 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700"
              }`}
            >
              {stream === "ALL" ? "All Faculties" : `${stream} Stream`}
            </button>
          );
        })}
      </div>

      {/* Departments & Faculty Cards */}
      <div className="space-y-14">
        {filteredDepts.map((dept) => (
          <div key={dept.id} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="badge-blue text-xs font-bold px-3 py-0.5 rounded-full uppercase">
                  {dept.stream} Stream
                </span>
                <h2 className="text-2xl font-bold text-[#1E3A8A] dark:text-blue-300 font-serif">
                  {dept.name}
                </h2>
              </div>
              {dept.labs && (
                <span className="text-xs text-[var(--text)]/70 bg-white dark:bg-[var(--card)] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
                  🔬 {dept.labs}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.faculty.map((fac) => (
                <div
                  key={fac.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[var(--card)] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-[#1E3A8A] transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-[var(--maroon-tint)] shrink-0 border-2 border-[var(--gold)]/50 shadow-xs">
                        <Image
                          src={fac.photoUrl || "/uploads/avatar-placeholder.svg"}
                          alt={fac.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[#1E3A8A] dark:text-blue-300 leading-snug">
                          {fac.name}
                        </h3>
                        <div className="text-xs text-[#800000] dark:text-[var(--gold)] font-semibold">
                          {fac.designation}
                        </div>
                        <div className="text-[11px] text-[var(--text)]/60">{fac.experience} Experience</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-[var(--text)]/80">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                        <span>{fac.qualification}</span>
                      </div>
                      {fac.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#800000] dark:text-[var(--gold)] shrink-0" />
                          <a
                            href={`mailto:${fac.email}`}
                            className="hover:underline text-[#800000] dark:text-[var(--gold)] link-maroon"
                          >
                            {fac.email}
                          </a>
                        </div>
                      )}
                      {fac.bio && (
                        <p className="text-xs text-[var(--text)]/70 pt-1 italic line-clamp-3">
                          &ldquo;{fac.bio}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
