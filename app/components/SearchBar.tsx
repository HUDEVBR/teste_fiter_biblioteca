"use client";

import { useMemo } from "react";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useBooks, type Book } from "../context/BooksContext";

export default function SearchBar() {
const { query, setQuery } = useSearch();
const { books } = useBooks();

const suggestions: Book[] = useMemo(() => {
if (!query.trim()) return [];
return books
    .filter(
    (book) =>
        book.name.toLowerCase().includes(query.toLowerCase()) ||
        book.authors.some((a) =>
        a.toLowerCase().includes(query.toLowerCase())
        )
    )
    .slice(0, 5);
}, [query, books]);

function handleSelectSuggestion(suggestion: string) {
setQuery(suggestion);
}

return (
<div className="relative w-full max-w-lg">
    <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Buscar livros..."
    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
    <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />

    {suggestions.length > 0 && (
    <ul className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 shadow-md z-50">
        {suggestions.map((book) => (
        <li
            key={book.id}
            onClick={() => handleSelectSuggestion(book.name)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
        >
            <strong>{book.name}</strong>{" "}
            <span className="text-xs text-gray-500">
            — {book.authors.join(", ")}
            </span>
        </li>
        ))}
    </ul>
    )}
</div>
);
}
