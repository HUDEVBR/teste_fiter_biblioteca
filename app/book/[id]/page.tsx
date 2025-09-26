"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchBookById } from "../../lib/api";

type Book = {
  id: string;
  name: string;
  authors: string;
  description: string;
  imagelink?: string;
};

function sanitizeImage(url?: string) {
  if (!url || url.trim() === "") return "/No_Image_Available.jpg";
  // remove ] ou espaços no final
  return url.trim().replace(/[\]\s]+$/, "");
}

export default function BookDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function load() {
      const data = await fetchBookById(id as string);
      setBook(data.data);
    }
    load();
  }, [id]);

  if (!book) return <p>Carregando...</p>;

  return (
    <main className="max-w-xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Voltar
      </button>
            <img
              src={sanitizeImage(book.imagelink)}
              alt={book.name}
              className="w-full h-100 object-contain rounded"
              onError={(e) => { e.currentTarget.src = "/No_Image_Available.jpg"; }}
            />
      <h1 className="text-2xl font-bold mt-4">{book.name}</h1>
      <p className="font-semibold">{book.authors}</p>
      <p className="mt-2">{book.description}</p>
    </main>
  );
}
