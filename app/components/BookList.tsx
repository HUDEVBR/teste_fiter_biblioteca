"use client";
import { useEffect, useState } from "react";
import { fetchBooks } from "../lib/api";
import { getErrorMessage } from "../lib/error";

import { BookCard, BookCardSkeleton } from "./BookCard";
import { useSearch } from "../context/SearchContext";

type Book = {
id: string;
name: string;
authors: string[];
description: string;
imagelink?: string;
};

export default function BookList() {
const [books, setBooks] = useState<Book[]>([]);
const [page, setPage] = useState(1);
const [hasMore, setHasMore] = useState(true);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const { query, setQuery } = useSearch(); // pega o valor do search bar

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
const filteredBooks = books.filter(
(book) =>
    book.name.toLowerCase().includes(query.toLowerCase()) ||
    book.authors.some((a) => a.toLowerCase().includes(query.toLowerCase()))
);

return (
<main className="max-w-6xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6">📚 Livraria (Bookshelf)</h1>

    {/* GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
    ))}

    {/* Skeletons durante o loading */}
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
