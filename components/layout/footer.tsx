import React from 'react';
import Link from 'next/link';
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              <span className="font-bold text-lg">Carbon footprint assessment website</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              ช่วยให้บุคคลและธุรกิจเข้าใจและลดการปล่อยคาร์บอนเพื่ออนาคตที่ยั่งยืนมากขึ้น
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className=''>

            <div>
              <ul className="space-y-3">
                <li>
                  <Link href="/calculator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    เครื่องคำนวณคาร์บอน
                  </Link>
                </li>
                <li>
                  <Link href="/impact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    ผลกระทบต่อสิ่งแวดล้อม
                  </Link>
                </li>
                <li>
                  <Link href="/tips" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    เคล็ดลับการลดคาร์บอน
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    บล็อกความยั่งยืน
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    เกี่ยวกับเรา
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    ติดต่อเรา
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
                    เงื่อนไขการให้บริการ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Carbon footprint assessment website. สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;