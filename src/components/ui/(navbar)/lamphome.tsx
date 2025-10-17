"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  useMemo,
} from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/app/context/AuthContext";
import { UserCircle2, LogOut } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
}

// Data statis didefinisikan di luar komponen untuk efisiensi.
const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Beranda" },
  { href: "/tentang", label: "Tentang" },
  { href: "/jurusan", label: "Jurusan" },
  { href: "/alumni", label: "Alumni" },
  { href: "/eskul", label: "Ekstrakulikuler" },
  { href: "/berita", label: "Berita" },
  { href: "/kontak", label: "Kontak" },
];

// --- Sub-komponen yang di-memoize untuk performa ---

const NavLink = memo(({ item }: { item: NavItem }) => (
  <Link
    href={item.href}
    className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative group whitespace-nowrap"
  >
    {item.label}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
  </Link>
));
NavLink.displayName = "NavLink";

const MobileNavLink = memo(
  ({ item, onClick }: { item: NavItem; onClick: () => void }) => (
    <Link
      href={item.href}
      onClick={onClick}
      className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
    >
      {item.label}
    </Link>
  )
);
MobileNavLink.displayName = "MobileNavLink";

const Logo = memo(
  ({
    src,
    srcDark,
    alt,
    isDark,
  }: {
    src?: string;
    srcDark?: string;
    alt?: string;
    isDark: boolean;
  }) => {
    const effectiveSrc = isDark && srcDark ? srcDark : src;
    if (!effectiveSrc) return null;
    return (
      <div className="relative flex items-center justify-center">
        <Image
          key={effectiveSrc}
          src={effectiveSrc}
          alt={alt || "Logo"}
          width={110}
          height={40}
          priority
          className="cursor-pointer hover:scale-110 transition-transform duration-300"
        />
      </div>
    );
  }
);
Logo.displayName = "Logo";

// FIX: Memberikan tipe spesifik untuk props
interface ChainPullProps {
  isDark: boolean;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

const ChainPull = memo(({ isDark, onDragEnd }: ChainPullProps) => (
  <div className="absolute right-6 top-full mt-2 flex flex-col items-center group z-10">
    <motion.div
      className="w-1 bg-gradient-to-b from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full shadow-sm"
      animate={{ height: 48 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 12 }}
      dragElastic={0.1}
      onDragEnd={onDragEnd}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.12 }}
      className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 rounded-full shadow-lg border-2 border-yellow-500 dark:border-yellow-400 cursor-grab active:cursor-grabbing"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center h-full"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-800"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center h-full"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-100"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
));
ChainPull.displayName = "ChainPull";

// FIX: Menambahkan interface untuk props komponen
interface LamphomeProps {
  logoSrc: string;
  logoSrcDark: string;
  logoAlt: string;
  navItems?: NavItem[];
  children: React.ReactNode;
}

export function Lamphome({
  logoSrc,
  logoSrcDark,
  logoAlt,
  navItems = NAV_ITEMS,
  children,
}: LamphomeProps): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  // FIX: Menghapus 'theme' yang tidak digunakan
  const { setTheme, resolvedTheme } = useTheme();
  const { isLoggedIn, isLoading, logout } = useAuth();

  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 8) {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }
    },
    [resolvedTheme, setTheme]
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const navLinksRender = useMemo(
    () =>
      navItems.map((item: NavItem) => <NavLink key={item.href} item={item} />),
    [navItems]
  );
  const mobileNavLinksRender = useMemo(
    () =>
      navItems.map((item: NavItem) => (
        <MobileNavLink key={item.href} item={item} onClick={toggleMobileMenu} />
      )),
    [navItems, toggleMobileMenu]
  );

  return (
    <>
      {/* PERUBAHAN KUNCI: Menambahkan left-1/2 -translate-x-1/2 untuk centering horizontal */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center justify-between w-[95%] max-w-6xl py-3 px-3 md:px-6 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm border-2 border-white dark:border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50">
        <div className="flex items-center flex-shrink-0">
          {isMounted && (
            <Logo
              src={logoSrc}
              srcDark={logoSrcDark}
              alt={logoAlt}
              isDark={isDarkMode}
            />
          )}
        </div>

        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-1 justify-center">
          {navLinksRender}
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <div className="relative" ref={profileRef}>
            {isLoading ? (
              <div className="hidden sm:flex items-center justify-center w-[86px] h-[36px] bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
            ) : isLoggedIn ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
                aria-label="User Profile"
              >
                <UserCircle2 className="w-6 h-6 text-slate-600 dark:text-slate-300" />
              </button>
            ) : (
              <Link href="/login" passHref>
                <button
                  className="hidden sm:flex items-center px-3 md:px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                  aria-label="Login"
                >
                  Login
                </button>
              </Link>
            )}

            <AnimatePresence>
              {isProfileOpen && isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`absolute top-full right-0 mt-2 w-48 rounded-xl shadow-lg border p-1 ${
                    isDarkMode
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold truncate text-slate-800 dark:text-slate-200">
                      SMKN 2 Surabaya
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Admin
                    </p>
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex justify-center items-center p-2 bg-gray-100 dark:bg-neutral-900 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </motion.svg>
          </button>
        </div>

        {isMounted && (
          <ChainPull isDark={isDarkMode} onDragEnd={handleDragEnd} />
        )}

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 lg:hidden bg-white/90 dark:bg-neutral-950/90 border border-gray-200 dark:border-gray-700/50 rounded-xl shadow-lg backdrop-blur-sm z-50 max-h-[calc(100vh-120px)] overflow-y-auto"
            >
              <nav className="flex flex-col py-2">
                {mobileNavLinksRender}
                {!isLoggedIn && (
                  <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 px-4 pb-2">
                    <Link href="/login" passHref>
                      <button className="sm:hidden w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium text-sm rounded-lg shadow-md">
                        Login
                      </button>
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="w-full">{children}</main>
    </>
  );
}