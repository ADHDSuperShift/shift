"use client";
import Link from 'next/link';

const AdminButton = () => {
  return (
    <Link href="/admin">
      <button className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors shadow-lg text-sm font-semibold z-50">
        Admin
      </button>
    </Link>
  );
};

export default AdminButton;
