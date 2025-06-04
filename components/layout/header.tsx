"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LoaderCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useSession } from '../providers/SessionProvider';
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const { session, logout } = useSession();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(false)
  }, [session])

  const navItems = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'คำนวณ', href: '/calculator' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'ผลกระทบ', href: '/impact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-[5px] shadow-sm'
        : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
          <span className="font-bold text-xl">Carbon footprint assessment</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${pathname === item.href
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400'
                }`}
            >
              {item.name}
            </Link>
          ))}
          {
            loading ? (
              <LoaderCircle className="animate-spin h-6 w-6 text-primary my-auto" />
            ) : session ? (
              <>
                <Link
                  href={"/profile"}
                  className={`text-sm font-medium transition-colors ${pathname === "/profile"
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400'
                    }`}
                >
                  โปรไฟล์
                </Link>

                <Button asChild className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                  <div className="cursor-pointer" onClick={() => {
                    logout()
                  }}>ออกจากระบบ</div>
                </Button>
              </>
            ) : (
              <Button asChild className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
                <Link href="/auth/signin">เข้าสู่ระบบ</Link>
              </Button>
            )
          }

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-colors py-2 ${pathname === item.href
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-200'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {
              session ? loading == true ? (
                <LoaderCircle className="animate-spin h-6 w-6 text-primary my-auto" />
              ) : (
                <>
                  <Link
                    href={"/profile"}
                    className={`text-sm font-medium transition-colors ${pathname === "/profile"
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400'
                      }`}
                  >
                    โปรไฟล์
                  </Link>

                  <Button asChild className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
                    <div className="cursor-pointer" onClick={() => {
                      logout()
                    }}>ออกจากระบบ</div>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 w-full mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href="/auth/signin">คำนวณตอนนี้</Link>
                  </Button>
                </>
              )
            }
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;