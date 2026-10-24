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
      {/* Stream Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {streams.map((stream) => {
          const isActive = selectedStream.toLowerCase() === stream.toLowerCase();
          return (
            <button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                isActive
                  ? "tab-active bg-black text-white shadow-xs border border-black"
                  : "tab-inactive bg-gray-100 text-black border border-gray-300 hover:bg-gray-200 transition"
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <span className="bg-gray-100 text-black border border-gray-300 text-xs font-bold px-3 py-0.5 rounded-full uppercase">
                  {dept.stream} Stream
                </span>
                <h2 className="text-2xl font-bold text-black font-serif">
                  {dept.name}
                </h2>
              </div>
              {dept.labs && (
                <span className="text-xs text-black bg-white px-3 py-1 rounded-full border border-gray-200 shadow-xs">
                  🔬 {dept.labs}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dept.faculty.map((fac) => (
                <div
                  key={fac.id}
                  className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow hover:border-black transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-300 shadow-xs">
                        <Image
                          src={fac.photoUrl || "/uploads/avatar-placeholder.svg"}
                          alt={fac.name}
                          fill
                          className="object-cover grayscale"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-black leading-snug">
                          {fac.name}
                        </h3>
                        <div className="text-xs text-gray-700 font-semibold">
                          {fac.designation}
                        </div>
                        <div className="text-[11px] text-gray-500">{fac.experience} Experience</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-black">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-black shrink-0" />
                        <span>{fac.qualification}</span>
                      </div>
                      {fac.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-black shrink-0" />
                          <a
                            href={`mailto:${fac.email}`}
                            className="hover:underline text-black"
                          >
                            {fac.email}
                          </a>
                        </div>
                      )}
                      {fac.bio && (
                        <p className="text-xs text-gray-600 pt-1 italic line-clamp-3">
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
