"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "../lib/api";
import { getErrorMessage } from "../lib/error";
import { BookCard, BookCardSkeleton } from "./BookCard";
import { useSearch } from "../context/SearchContext";
import { useFavorites } from "../context/FavoritesContext";
import { Heart, HeartOff } from "lucide-react";

type Book = {
  id: string;
  name: string;
  authors: string[];
  description: string;
  imagelink?: string;
  publishedat: string;
};

type SortOption = "az" | "oldest" | "newest";

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { query } = useSearch();
  const [sort, setSort] = useState<SortOption>("az");

  const { favorites, toggleFavorite, isFavorite, showFavorites } = useFavorites();

  async function loadBooks(nextPage: number) {
    try {
      setLoading(true);
      const data = await fetchBooks(nextPage, 5);
      setBooks((prev) => {
        const all = [...prev, ...data.data];
        const unique = Array.from(new Map(all.map((b) => [b.id, b])).values());
        return unique;
      });
      setHasMore(data.hasMore);
      setPage(nextPage);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks(1);
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Filtra pelo search (nome ou autor)
  let filteredBooks = books.filter(
    (book) =>
      book.name.toLowerCase().includes(query.toLowerCase()) ||
      book.authors.some((a) => a.toLowerCase().includes(query.toLowerCase()))
  );

  // Se showFavorites estiver ativo, filtra só favoritos
  if (showFavorites) {
    filteredBooks = filteredBooks.filter((b) => favorites.includes(b.id));
  }

  // Ordena os livros
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sort === "az") return a.name.localeCompare(b.name);
    if (sort === "oldest")
      return new Date(a.publishedat).getTime() - new Date(b.publishedat).getTime();
    if (sort === "newest")
      return new Date(b.publishedat).getTime() - new Date(a.publishedat).getTime();
    return 0;
  });

  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📚 Livraria (Bookshelf)</h1>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="az">A–Z</option>
          <option value="oldest">Mais antigos</option>
          <option value="newest">Mais recentes</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <div key={book.id} className="relative">
            <BookCard book={book} />
            {/* Coração de favorito */}
            <button
              onClick={() => toggleFavorite(book.id)}
              className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 shadow"
            >
              {isFavorite(book.id) ? (
                <Heart className="text-red-500 h-5 w-5" />
              ) : (
                <HeartOff className="h-5 w-5" />
              )}
            </button>
          </div>
        ))}

        {/* Skeletons */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <BookCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* BOTÃO CARREGAR MAIS */}
      <div className="flex justify-center mt-6">
        {hasMore ? (
          <button
            onClick={() => loadBooks(page + 1)}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Carregar mais"}
          </button>
        ) : (
          <p className="text-gray-500">Todos os livros foram carregados ✅</p>
        )}
      </div>
    </main>
  );
}
