import React from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="py-4 border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© ลิขสิทธิ์ {new Date().getFullYear()} สาขาวิชาเทคโนโลยีสารสนเทศ - วิทยาลัยเทคนิคเชียงใหม่ </p>
      </div>
    </footer>
  );
};

export default Footer;