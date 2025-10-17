"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Tag,
  ChevronLeft,
  Share2,
  Eye,
  MessageCircle,
  Heart,
  Facebook,
  Twitter,
  Link as LinkIcon,
  User,
  Send,
  ThumbsUp,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export default function NewsDetailPage() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(142);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Budi Santoso",
      avatar: "BS",
      date: "16 Mei 2024, 09:30",
      text: "Selamat untuk tim futsal SMKN 2! Kalian membanggakan sekolah. Semoga sukses di tingkat nasional!",
      likes: 12,
      liked: false,
    },
    {
      id: 2,
      user: "Siti Nurhaliza",
      avatar: "SN",
      date: "16 Mei 2024, 10:15",
      text: "Prestasi yang luar biasa! Ini membuktikan bahwa SMKN 2 Surabaya tidak hanya unggul di akademik tapi juga olahraga.",
      likes: 8,
      liked: false,
    },
    {
      id: 3,
      user: "Ahmad Rizaldi",
      avatar: "AR",
      date: "16 Mei 2024, 14:20",
      text: "Mantap jiwa! Terus berprestasi dan harumkan nama sekolah kita 🔥",
      likes: 15,
      liked: false,
    },
  ]);
  const [selectedNewsId, setSelectedNewsId] = useState(1);

  // MODIFIKASI: Melengkapi data 'allNews' untuk memperbaiki error saat klik berita terkait
  const allNews = {
    1: {
      id: 1,
      slug: "juara-futsal-tingkat-provinsi-smkn-2-surabaya",
      title: "Juara Futsal Tingkat Provinsi Diraih SMKN 2 Surabaya",
      category: "Competition",
      date: "15 Mei 2024",
      time: "10:15 WIB",
      author: "Admin SMKN 2",
      views: 1234,
      commentsCount: 45,
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=600&fit=crop",
      content: `
              <p>Tim futsal SMKN 2 Surabaya berhasil meraih juara pertama dalam kompetisi futsal antar sekolah se-Jawa Timur yang diselenggarakan di GOR Pancasila, Surabaya. Pertandingan final yang berlangsung sengit berakhir dengan skor 5-3 melawan SMKN 1 Malang.</p>
              <p>Prestasi gemilang ini merupakan hasil kerja keras tim yang telah berlatih intensif selama 6 bulan terakhir di bawah bimbingan pelatih profesional, Bapak Agus Santoso. "Kami sangat bangga dengan pencapaian anak-anak. Mereka menunjukkan dedikasi dan semangat juang yang luar biasa," ujar Kepala Sekolah SMKN 2 Surabaya, Ibu Dr. Sri Wahyuni, M.Pd.</p>
              <h2>Perjalanan Menuju Juara</h2>
              <p>Tim futsal SMKN 2 Surabaya harus melewati perjalanan panjang untuk mencapai gelar juara. Dimulai dari babak penyisihan, tim berhasil meraih kemenangan di semua pertandingan dengan total 8 kali menang beruntun. Di babak semifinal, tim menghadapi SMAN 3 Surabaya dan berhasil menang dengan skor 4-2.</p>
            `,
      tags: ["Futsal", "Kompetisi", "Juara", "Olahraga", "Prestasi"],
    },
    2: {
      id: 2,
      slug: "tim-basket-smkn-2-lolos-final-regional",
      title: "Tim Basket SMKN 2 Lolos ke Final Regional",
      category: "Competition",
      date: "1 Mei 2024",
      time: "14:30 WIB",
      author: "Admin SMKN 2",
      views: 890,
      commentsCount: 32,
      image:
        "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=1200&h=600&fit=crop",
      content: `
              <p>Tim basket putra SMKN 2 Surabaya berhasil lolos ke babak final kompetisi basket regional Jawa Timur setelah mengalahkan SMAN 5 Surabaya dengan skor 78-65 di babak semifinal.</p>
              <p>Kemenangan ini diraih berkat penampilan luar biasa dari pemain bintang kami, Andi Wijaya, yang mencetak 28 poin, 10 rebound, dan 6 assist. "Ini adalah hasil kerja keras seluruh tim. Kami akan memberikan yang terbaik di final nanti," ujar Andi setelah pertandingan.</p>
            `,
      tags: ["Basket", "Kompetisi", "Semifinal", "Olahraga"],
    },
    3: {
      id: 3,
      slug: "siswa-smkn-2-raih-medali-emas-olimpiade-matematika",
      title: "Siswa SMKN 2 Raih Medali Emas Olimpiade Matematika",
      category: "Academic",
      date: "12 Mei 2024",
      time: "11:00 WIB",
      author: "Admin SMKN 2",
      views: 1567,
      commentsCount: 58,
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop",
      content: `
              <p>Prestasi membanggakan kembali ditorehkan siswa SMKN 2 Surabaya. Ananda Putri Maharani, siswi kelas XI Teknik Komputer dan Jaringan, berhasil meraih medali emas dalam Olimpiade Matematika Tingkat Nasional yang diselenggarakan di Bandung.</p>
              <p>Ananda harus bersaing dengan 150 peserta terbaik dari seluruh Indonesia dalam olimpiade bergengsi ini. Dengan skor sempurna 100, ia berhasil mengalahkan pesaing-pesaingnya dan membawa pulang medali emas.</p>
            `,
      tags: ["Matematika", "Olimpiade", "Medali Emas", "Prestasi", "Akademik"],
    },
    4: {
      id: 4,
      slug: "smkn-2-juara-umum-lks-tingkat-kota",
      title: "SMKN 2 Juara Umum LKS Tingkat Kota",
      category: "Competition",
      date: "24 Apr 2024",
      time: "15:45 WIB",
      author: "Admin SMKN 2",
      views: 2103,
      commentsCount: 67,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop",
      content: `
              <p>SMKN 2 Surabaya kembali membuktikan keunggulannya dengan meraih gelar Juara Umum dalam Lomba Kompetensi Siswa (LKS) Tingkat Kota Surabaya 2024. Sekolah berhasil mengumpulkan 12 medali emas, 8 medali perak, dan 5 medali perunggu dari berbagai bidang lomba.</p>
              <p>Prestasi gemilang ini diraih dari berbagai jurusan, termasuk Teknik Komputer dan Jaringan, Rekayasa Perangkat Lunak, Multimedia, Teknik Elektronika, dan Administrasi Perkantoran.</p>
            `,
      tags: ["LKS", "Juara Umum", "Kompetisi", "Prestasi", "Teknologi"],
    },
  };

  const newsDetail = allNews[selectedNewsId as keyof typeof allNews];

  const relatedNews = [
    {
      id: 2,
      title: "Tim Basket SMKN 2 Lolos ke Final Regional",
      category: "Competition",
      date: "1 Mei 2024",
      image:
        "https://images.unsplash.com/photo-1587329310686-91414b8e3cb7?w=400&h=250&fit=crop",
    },
    {
      id: 3,
      title: "Siswa SMKN 2 Raih Medali Emas Olimpiade Matematika",
      category: "Competition",
      date: "12 Mei 2024",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    },
    {
      id: 4,
      title: "SMKN 2 Juara Umum LKS Tingkat Kota",
      category: "Competition",
      date: "24 Apr 2024",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    },
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = newsDetail.title;
    // ...logika share
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = {
      id: comments.length + 1,
      user: "Current User",
      avatar: "CU",
      date: new Date().toLocaleString("id-ID"),
      text: comment,
      likes: 0,
      liked: false,
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

  const handleCommentLike = (commentId: number) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const handleNewsClick = (newsId: number) => {
    setSelectedNewsId(newsId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Kembali ke Berita</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2">
            <div className="backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border bg-white/90 border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-700/50">
              <div className="relative h-64 sm:h-96 overflow-hidden">
                <img
                  src={newsDetail.image}
                  alt={newsDetail.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-sm font-semibold shadow-lg bg-white/95 text-blue-600 dark:bg-gray-800/95 dark:text-blue-400">
                    <Tag className="w-4 h-4" />
                    {newsDetail.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                  {newsDetail.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium">
                      {newsDetail.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm">{newsDetail.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm">{newsDetail.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Eye className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm">{newsDetail.views} views</span>
                  </div>
                </div>

                <div
                  className="prose prose-lg max-w-none mb-8 text-gray-700 dark:text-gray-300 prose-headings:text-gray-900 dark:prose-headings:text-white"
                  dangerouslySetInnerHTML={{ __html: newsDetail.content }}
                />

                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                      isLiked
                        ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span>{likes}</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    <span>{comments.length}</span>
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Bagikan</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageCircle className="w-6 h-6" />
                    Komentar ({comments.length})
                  </h2>

                  {isLoading ? (
                    <div className="mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse">
                      <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  ) : isLoggedIn ? (
                    <form onSubmit={handleSubmitComment} className="mb-8">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          CU
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tulis komentar Anda..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl"
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              type="submit"
                              disabled={!comment.trim()}
                              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
                            >
                              <Send className="w-4 h-4" />
                              Kirim
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border">
                      <div className="flex items-center gap-4">
                        <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Login untuk Berkomentar
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Silakan login terlebih dahulu untuk memberikan
                            komentar.
                          </p>
                        </div>
                        <button
                          onClick={() => router.push("/login")}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
                        >
                          Login Sekarang
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {c.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {c.user}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {c.date}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {c.text}
                          </p>
                          <button
                            onClick={() => handleCommentLike(c.id)}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                              c.liked
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                          >
                            <ThumbsUp
                              className={`w-4 h-4 ${
                                c.liked ? "fill-current" : ""
                              }`}
                            />
                            <span>{c.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="backdrop-blur-lg rounded-2xl shadow-lg p-6 border bg-white/90 border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-700/50">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Berita Terkait
                </h2>
                <div className="space-y-4">
                  {relatedNews.map((news) => (
                    <article
                      key={news.id}
                      onClick={() => handleNewsClick(news.id)}
                      className="group cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl p-3 transition-all"
                    >
                      <div className="flex gap-3">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={news.image}
                            alt={news.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {news.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{news.date}</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
