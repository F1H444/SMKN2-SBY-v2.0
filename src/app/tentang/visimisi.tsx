"use client";

import { motion, easeOut } from "framer-motion";
import { Target, Users, Award, Zap, BookOpen, Globe } from "lucide-react";

const misiList = [
  {
    icon: BookOpen,
    title: "Pendidikan Berkualitas",
    description:
      "Menyelenggarakan pendidikan kejuruan yang berkualitas sesuai dengan tuntutan dunia kerja dan perkembangan teknologi.",
  },
  {
    icon: Users,
    title: "Karakter Unggul",
    description:
      "Membentuk peserta didik yang berkarakter, berakhlak mulia, dan memiliki jiwa kewirausahaan.",
  },
  {
    icon: Zap,
    title: "Kompetensi Profesional",
    description:
      "Mengembangkan kompetensi profesional siswa yang sesuai dengan kebutuhan industri dan dunia kerja.",
  },
  {
    icon: Globe,
    title: "Wawasan Global",
    description:
      "Mempersiapkan lulusan yang berdaya saing tinggi di tingkat nasional dan internasional.",
  },
  {
    icon: Award,
    title: "Prestasi Optimal",
    description:
      "Meningkatkan prestasi akademik dan non-akademik melalui pembinaan berkelanjutan.",
  },
];

// ✅ Animation Variants (fixed easing)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut, // ✅ gunakan preset dari framer-motion
    },
  },
};

export default function VisiMisiSMKN2() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* --- Header --- */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Visi & Misi
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Arah dan tujuan yang menjadi landasan SMKN 2 Surabaya dalam mencetak
            generasi unggul.
          </p>
        </motion.div>

        {/* --- Visi Section --- */}
        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <Target className="w-10 h-10" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                  Visi Sekolah
                </h2>
                <blockquote className="text-xl text-slate-700 dark:text-slate-300 italic leading-relaxed">
                  "Terwujudnya SMK Negeri 2 Surabaya sebagai lembaga pendidikan
                  kejuruan yang unggul, berkarakter, berwawasan lingkungan, dan
                  mampu menghasilkan lulusan yang profesional serta siap
                  bersaing di era global."
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Misi Section --- */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Misi Kami
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Lima pilar utama untuk mencapai visi unggul.
          </p>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {misiList.map((misi, index) => {
            const Icon = misi.icon;
            return (
              <motion.div
                key={index}
                className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-sm text-center transition-all duration-300 hover:!border-blue-500 shadow-md flex-grow basis-full sm:basis-[45%] lg:basis-[30%]"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="inline-block p-4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 group-hover:bg-blue-500 dark:group-hover:bg-blue-500 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white dark:group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {misi.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {misi.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
