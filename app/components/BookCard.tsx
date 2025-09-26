/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

export type BookType = {
  id: string;
  name: string;
  authors: string[];
  description: string;
  imagelink?: string;
};

export function BookCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse">
      <div className="w-full h-64 bg-gray-300 rounded" />
      <div className="h-4 bg-gray-300 rounded mt-3 w-3/4" />
      <div className="h-3 bg-gray-300 rounded mt-2 w-1/2" />
      <div className="h-3 bg-gray-300 rounded mt-2 w-full" />
    </div>
  );
}

export function BookCard({ book }: { book: BookType }) {
  const sanitizeImage = (url?: string) => {
    if (!url) return "/No_Image_Available.jpg";
    // remove caracteres estranhos no final, ex: "]" e espaços
    return url.trim().replace(/[\]\s]+$/, "");
  };

  return (
    <Link href={`/book/${book.id}`} className="block">
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer">
        <img
          src={sanitizeImage(book.imagelink)}
          alt={book.name}
          className="w-full h-64 object-contain rounded"
          onError={(e) => {
            e.currentTarget.src = "/No_Image_Available.jpg";
          }}
        />
        <h2 className="text-lg font-bold mt-3">Autor(es): {book.name}</h2>
        <p className="text-sm font-semibold text-gray-900">
          {book.authors?.join(", ")}
        </p>
        <p className="text-sm text-gray-600 line-clamp-3">Saiba mais ...</p>
      </div>
    </Link>
  );
}
