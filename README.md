# 🚀 Website Redesign SMKN 2 Surabaya (v2.0)

Selamat datang di repositori Website Profil SMKN 2 Surabaya v2.0! Ini adalah proyek *redesign* total yang dibangun menggunakan **Next.js 16 (App Router)** dengan fokus pada performa tinggi, animasi yang kaya, dan pengalaman pengguna yang modern.

Proyek ini bukan sekadar website statis, melainkan aplikasi web interaktif penuh yang menampilkan berbagai fitur canggih untuk profil sekolah.

## 🔴 Demo Langsung (Live Demo)

Coba aplikasi ini secara langsung di Vercel:

### [https://smkn2-sby-v02.vercel.app/](https://smkn2-sby-v02.vercel.app/)

---

## 📸 Tampilan Proyek

![Demo Website SMKN 2 Surabaya](https://user-images.githubusercontent.com/...) 

---

## ✨ Fitur Unggulan

Proyek ini dikemas dengan fitur-fitur modern untuk menciptakan pengalaman pengguna yang menarik dan interaktif:

* **Navigasi Multi-Halaman:** Website lengkap dengan 7 halaman utama (Beranda, Tentang, Jurusan, Alumni, Eskul, Berita, Kontak).
* **Routing Dinamis:** Halaman detail dibuat secara dinamis untuk semua 11 Jurusan/page.tsx] dan 16+ Ekstrakurikuler/page.tsx].
* **Sistem Berita (Blog):** Halaman berita fungsional dengan pemfilteran kategori dan halaman detail artikel/page.tsx].
* **Formulir Kontak Fungsional:** Menggunakan **EmailJS** untuk mengirim pesan dari formulir kontak langsung ke email admin.
* **Autentikasi Sederhana:** Sistem Login/Logout (berbasis `localStorage`) yang membuka fitur-fitur khusus seperti berkomentar di berita atau menambah "Mimpi".

### 🌟 Fitur Interaktif & Animasi

* **360° Facility Tour:** Tur virtual fasilitas sekolah menggunakan **React Photo Sphere Viewer**.
* **Homepage Horizontal Scrolling:** Bagian beranda utama dibuat dengan **GSAP & ScrollTrigger** untuk menciptakan efek *horizontal scroll* yang sinematik.
* **Animated Theme Toggler:** Tombol *Dark Mode* unik berbentuk "tarikan lampu" yang menggunakan **View Transitions API** untuk animasi perubahan tema yang mulus.
* **Wall of Dreams:** Fitur interaktif di mana pengguna dapat men-drag-and-drop "kartu mimpi" di papan tulis virtual.
* **Animasi Lainnya:** Dibuat dengan **Framer Motion** untuk animasi *timeline* sejarah, `react-countup` untuk statistik, dan `react-simple-typewriter`.

---

## 🛠️ Tech Stack Utama

* **Framework:** <img src="https://simpleicons.org/icons/nextdotjs.svg" width="16"> **Next.js 16** (App Router)
* **Library:** <img src="https://simpleicons.org/icons/react.svg" width="16"> **React 19**
* **Bahasa:** <img src="https://simpleicons.org/icons/typescript.svg" width="16"> **TypeScript**
* **Styling:** <img src="https://simpleicons.org/icons/tailwindcss.svg" width="16"> **TailwindCSS 4**
* **Animasi:**
    * <img src="https://simpleicons.org/icons/framer.svg" width="16"> **Framer Motion**
    * <img src="https://simpleicons.org/icons/greensock.svg" width="16"> **GSAP (ScrollTrigger)**
* **UI:** [Lucide React](https://lucide.dev/) (Icons)
* **Lain-lain:** [Next-Themes](https://github.com/pacocoursey/next-themes) (Dark Mode), [EmailJS](https://www.emailjs.com/) (Kontak), [React Photo Sphere Viewer](https://react-photo-sphere-viewer.js.org/) (360 Tour).

---

## ⚡ Performa & Optimasi

Performa adalah fokus utama dari proyek ini.

* **ISR (Incremental Static Regeneration):** Halaman beranda utama menggunakan `revalidate = 3600` untuk disajikan secara statis dari CDN, memastikan *load time* yang instan.
* **Lazy Loading (Code Splitting):** Komponen-komponen berat di bawah "the fold" (seperti 360 Viewer, Wall of Dreams, dan Horizontal Scroll) dimuat secara dinamis menggunakan `next/dynamic`.
* **Optimasi Gambar:** Menggunakan `next/image` di seluruh proyek, dengan `priority` di LCP (Largest Contentful Paint) dan `loading="lazy"` di gambar lainnya/page.tsx].
* **Optimasi Bundle:** Menggunakan `experimental.optimizePackageImports` di `next.config.ts` untuk *tree-shaking* otomatis `lucide-react`.
* **Memoization:** Penggunaan `React.memo`, `useCallback`, dan `useMemo` secara ekstensif untuk mencegah *re-render* yang tidak perlu pada komponen interaktif.

---

## 💻 Menjalankan Proyek Secara Lokal

Ingin mencoba atau berkontribusi pada proyek ini?

1.  **Clone repositori:**
    ```bash
    git clone [https://github.com/F1H444/smkn2-sby-v2.0.git](https://github.com/F1H444/smkn2-sby-v2.0.git)
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd smkn2-sby-v2.0
    ```

3.  **Install dependensi:**
    ```bash
    npm install
    ```

4.  **Siapkan Environment Variables:**
    Buat file `.env.local` di root proyek dan tambahkan kredensial EmailJS Anda (diperlukan untuk halaman Kontak):
    ```env
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
    ```
    *Anda bisa mendapatkan kunci ini secara gratis di [EmailJS.com](https://www.emailjs.com/)*.

5.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

6.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🤝 Kontribusi

Kontribusi, isu, dan permintaan fitur sangat diharapkan!
