"use client";
import Link from 'next/link';

const AdminButton = () => {
  return (
    <Link href="/admin">
      <button className="fixed bottom-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg text-sm font-semibold z-50 border border-gray-600">
        Admin
      </button>
    </Link>
  );
};

export default AdminButton;
