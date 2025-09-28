"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "../lib/api";

type Book = {
  id: number;
  name: string;
  authors: string;
  imagelink?: string;
};

export default function Admin() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchBooks(1, 50);
      setBooks(data.data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="mt-10 text-center">Carregando livros...</p>;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🔧 Admin - Livros</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Capa</th>
            <th className="border p-2">Título</th>
            <th className="border p-2">Autores</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border p-2">
                <img src={book.imagelink || "/No_Image_Available.jpg"} alt={book.name} className="h-16 object-cover" />
              </td>
              <td className="border p-2">{book.name}</td>
              <td className="border p-2">{book.authors}</td>
              <td className="border p-2">
                {/* Botões de editar/excluir podem ser adicionados aqui */}
                <button className="px-2 py-1 bg-blue-500 text-white rounded">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}