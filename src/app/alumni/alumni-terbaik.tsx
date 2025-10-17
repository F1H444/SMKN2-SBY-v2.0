"use client";
import React, { useState, useMemo } from "react";
import { Search, Briefcase, Award, Building2, Users } from "lucide-react";

const AlumniPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const alumniData = [
    {
      id: 1,
      name: "Marsekal TNI (Purn.) Soewoto Sukendar",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soewoto",
      department: "Teknik Penerbangan",
      year: "1945",
      position: "Kepala Staf TNI Angkatan Udara (KASAU)",
      company: "TNI Angkatan Udara",
      achievement:
        "Menjabat sebagai KASAU ke-4, seorang perwira tinggi yang visioner dalam pengembangan alutsista TNI AU.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jenderal TNI (Purn.) Widjojo Soejono",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Widjojo",
      department: "Teknik Mesin",
      year: "1948",
      position: "Kepala Staf Kopkamtib",
      company: "Tentara Nasional Indonesia",
      achievement:
        "Tokoh militer berpengaruh pada masanya dan pernah menjabat sebagai Panglima Kowilhan II.",
      rating: 5,
    },
    {
      id: 3,
      name: "Letnan Jenderal TNI (Purn.) Bambang Triantoro",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bambang",
      department: "Teknik Bangunan",
      year: "1955",
      position: "Sekretaris Jenderal",
      company: "Departemen Pendidikan dan Kebudayaan",
      achievement:
        "Berkontribusi besar dalam administrasi pendidikan nasional sebagai Sekjen Depdikbud.",
      rating: 5,
    },
    {
      id: 4,
      name: "Cak Kartolo",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kartolo",
      department: "Seni dan Budaya",
      year: "1960",
      position: "Seniman Ludruk Legendaris",
      company: "Pekerja Seni",
      achievement:
        "Maestro ludruk dan seniman kebanggaan Jawa Timur yang melestarikan budaya lokal.",
      rating: 5,
    },
    {
      id: 5,
      name: "Drs. H. M. Said",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Said",
      department: "Teknik Mesin",
      year: "1962",
      position: "Kepala Sekolah",
      company: "SMK Negeri 2 Surabaya",
      achievement:
        "Salah satu kepala sekolah yang berperan penting dalam sejarah dan pengembangan SMKN 2 Surabaya.",
      rating: 4,
    },
    {
      id: 6,
      name: "Budi Sulistyo",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=BudiSulistyo",
      department: "Teknik Otomotif",
      year: "1985",
      position: "Pengusaha Otomotif",
      company: "Wirausaha",
      achievement:
        "Sukses membangun jaringan bengkel dan bisnis di bidang otomotif.",
      rating: 4,
    },
    {
      id: 7,
      name: "Dr. Ir. Wahid Wahyudi, M.T.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wahid",
      department: "Teknik Sipil",
      year: "1979",
      position: "Kepala Dinas Pendidikan Provinsi Jawa Timur",
      company: "Pemerintah Provinsi Jawa Timur",
      achievement:
        "Seorang birokrat yang mendedikasikan karirnya di bidang perhubungan dan pendidikan di Jawa Timur.",
      rating: 5,
    },
    {
      id: 8,
      name: "Prof. Dr. Ir. Mochamad Ashari, M.Eng.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ashari",
      department: "Teknik Elektro",
      year: "1982",
      position: "Rektor",
      company: "Institut Teknologi Sepuluh Nopember (ITS)",
      achievement:
        "Menjabat sebagai Rektor ITS periode 2019-2024, seorang akademisi terkemuka di bidang teknik elektro.",
      rating: 5,
    },
  ];

  const departments = [
    "all",
    ...new Set(alumniData.map((alumni) => alumni.department)),
  ];

  const filteredAlumni = useMemo(() => {
    return alumniData.filter((alumni) => {
      const matchesSearch =
        alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alumni.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        selectedDepartment === "all" ||
        alumni.department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [searchTerm, selectedDepartment]);

  return (
    // --- PERBAIKAN UTAMA ---
    // Class bg-white dark:bg-black DIHAPUS dari div ini.
    // Sekarang div ini akan transparan dan mengambil warna dari `body`
    // yang diatur oleh `bg-background` di globals.css
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Menggunakan `text-foreground` dari tema */}
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Alumni SMKN 2 Surabaya
          </h1>
          {/* Menggunakan `text-muted-foreground` dari tema */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Jejak prestasi para alumni yang telah mengukir kesuksesan dan
            memberikan kontribusi nyata bagi bangsa dan negara.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12">
          {/* Menggunakan `bg-muted` dan `border-border` dari tema */}
          <div className="bg-muted rounded-2xl border border-border p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari nama, perusahaan, atau posisi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // Menggunakan warna `input` dan `ring` dari tema
                  className="w-full pl-12 pr-4 py-3 bg-background border-2 border-input rounded-xl focus:border-primary focus:ring-4 focus:ring-ring/20 transition-all outline-none text-foreground"
                />
              </div>

              {/* Department Filter */}
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full md:w-auto pl-12 pr-8 py-3 bg-background border-2 border-input rounded-xl focus:border-primary focus:ring-4 focus:ring-ring/20 transition-all outline-none appearance-none cursor-pointer min-w-[250px] text-foreground"
                >
                  <option value="all">Semua Jurusan</option>
                  {departments.slice(1).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-muted-foreground text-center md:text-left">
            Menampilkan {filteredAlumni.length} alumni
          </p>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                // Menggunakan `bg-card` dan `border-border` dari tema
                className="bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-2 flex flex-col"
              >
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1 ring-4 ring-border overflow-hidden mb-4">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-full h-full object-cover rounded-full bg-background"
                    />
                  </div>
                  {/* Menggunakan `text-card-foreground` dari tema */}
                  <h3 className="text-xl font-bold text-card-foreground">
                    {alumni.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    Lulusan Tahun {alumni.year}
                  </p>
                </div>

                <div className="p-6 border-t border-border space-y-4 flex-grow">
                  <div>
                    {/* Menggunakan `bg-accent` dan `text-accent-foreground` dari tema */}
                    <span className="inline-block px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full font-medium">
                      {alumni.department}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {alumni.position}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {alumni.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      {alumni.achievement}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-4">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Alumni Tidak Ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba ubah filter atau kata kunci pencarian Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniPage;
