"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "../lib/api";
import { getErrorMessage } from "../lib/error";

import { BookCard, BookCardSkeleton } from "./BookCard";
import { useSearch } from "../context/SearchContext";
import { useBooks, type Book as BookType } from "../context/BooksContext";

type SortOption = "az" | "oldest" | "newest";

export default function BookList() {
const { books, setBooks } = useBooks(); // agora pega do contexto
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const { query } = useSearch();
const [sort, setSort] = useState<SortOption>("az");

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
} catch (err) {
    setError(getErrorMessage(err));
} finally {
    setLoading(false);
}
}

useEffect(() => {
// carrega a primeira página
loadBooks(1);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

if (error) return <p className="text-center text-red-500">{error}</p>;

// 1) filtra
const filteredBooks = books.filter(
(book) =>
    book.name.toLowerCase().includes(query.toLowerCase()) ||
    book.authors.some((a) => a.toLowerCase().includes(query.toLowerCase()))
);

// 2) ordena o resultado filtrado
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
        <BookCard key={book.id} book={book as BookType} />
    ))}

    {loading &&
        Array.from({ length: 4 }).map((_, i) => (
        <BookCardSkeleton key={`skeleton-${i}`} />
        ))}
    </div>

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
