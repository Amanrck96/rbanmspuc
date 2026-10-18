import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=================================================");
  console.log("   UPDATING FACULTY & LEADERSHIP IMAGES IN DB    ");
  console.log("=================================================");

  const facultyUpdates: Record<string, { photoUrl: string; qual?: string; desig?: string }> = {
    "Dr. K. S. Rajendra": { photoUrl: "/uploads/principal.jpg", qual: "M.Sc., Ph.D.", desig: "Principal" },
    "Sri. N. Bhaskaran": { photoUrl: "/uploads/faculty/bhaskaran.jpg", qual: "M.Sc., B.Ed.", desig: "Senior Lecturer & HoD" },
    "Sri. B. Thyagaraj": { photoUrl: "/uploads/faculty/thyagaraj.jpg", qual: "M.Sc., M.Phil.", desig: "Senior Lecturer & HoD" },
    "Sri. Terasa Babu": { photoUrl: "/uploads/faculty/terasa-babu.jpg", qual: "M.Com, B.Ed.", desig: "Lecturer in Mathematics" },
    "Dr. G. K. Ranganathan": { photoUrl: "/uploads/faculty/ranganathan.jpg", qual: "M.Com, M.Phil, Ph.D.", desig: "Senior Lecturer & Vice-Principal" },
    "Smt. Rukshanasan Qureshi": { photoUrl: "/uploads/faculty/rukshanasan.jpg", qual: "M.A., B.Ed.", desig: "Senior Lecturer" },
    "Smt. Sujatha": { photoUrl: "/uploads/faculty/sujatha.jpg", qual: "M.A., B.Ed.", desig: "Senior Lecturer" },
    "Sri. Devakki Rudramuni": { photoUrl: "/uploads/faculty/devakki.jpg", qual: "M.Sc., M.Phil.", desig: "Senior Lecturer in Economics" },
    "Dr. C. R. Premalatha": { photoUrl: "/uploads/faculty/premalatha.jpg", qual: "M.Sc., M.Phil., Ph.D.", desig: "Senior Lecturer in Kannada" },
    "Smt. Amudha": { photoUrl: "/uploads/faculty/amudha.jpg", qual: "M.Sc.", desig: "Senior Lecturer in English" },
    "Smt. Parimala P.": { photoUrl: "/uploads/faculty/parimala.jpg", qual: "B.E. (CS), M.Sc. (IT)", desig: "Lecturer in Computer Science" },
    "Dr. Avinash V.": { photoUrl: "/uploads/faculty/avinash.jpg", qual: "M.A., Ph.D.", desig: "Lecturer in Statistics" },
    "Smt. Pavithra": { photoUrl: "/uploads/faculty/pavithra.jpg", qual: "M.A., B.Ed.", desig: "Senior Lecturer in History" },
    "Sri. T. Shiva Reddy": { photoUrl: "/uploads/faculty/shiva-reddy.jpg", qual: "M.A.", desig: "Senior Lecturer in Political Science" },
    "Sri. Muralidharan": { photoUrl: "/uploads/faculty/muralidharan.jpg", qual: "M.A., M.P.Ed., NIS Coach", desig: "Physical Education Director" },
    "Smt. Rajani": { photoUrl: "/uploads/faculty/rajani.jpg", qual: "M.Sc., M.L.I.Sc.", desig: "Senior Lecturer & Librarian" },
    "Sri. S. H. Nagaraj": { photoUrl: "/uploads/faculty/nagaraj.jpg", qual: "M.A., B.Com.", desig: "Administrative Officer" },
  };

  const allFaculty = await prisma.faculty.findMany();
  for (const fac of allFaculty) {
    const update = facultyUpdates[fac.name];
    if (update) {
      await prisma.faculty.update({
        where: { id: fac.id },
        data: {
          photoUrl: update.photoUrl,
          qualification: update.qual || fac.qualification,
          designation: update.desig || fac.designation,
        },
      });
      console.log(`✅ Updated ${fac.name} -> ${update.photoUrl}`);
    }
  }

  // Update Page Images (principals-message, history, sports, etc.)
  await prisma.page.updateMany({
    where: { slug: "principals-message" },
    data: {
      bannerImage: "/uploads/principal-img.jpg",
    },
  });
  console.log("✅ Updated principals-message bannerImage to /uploads/principal-img.jpg");

  await prisma.page.updateMany({
    where: { slug: "history" },
    data: {
      bannerImage: "/uploads/about.jpg",
    },
  });

  await prisma.page.updateMany({
    where: { slug: "sports" },
    data: {
      bannerImage: "/uploads/cricket.jpg",
    },
  });

  await prisma.page.updateMany({
    where: { slug: "computer-lab" },
    data: {
      bannerImage: "/uploads/comp_lab_photo1.jpg",
    },
  });

  console.log("=================================================");
  console.log("🎉 ALL IMAGES SUCCESSFULLY UPDATED IN DATABASE!  ");
  console.log("=================================================");
}

main().catch(console.error).finally(() => prisma.$disconnect());
