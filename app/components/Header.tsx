"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Menu, X, Heart, Search, Moon, Sun } from "lucide-react";
import { useSearch } from "../context/SearchContext";
import { useBooks, type Book } from "../context/BooksContext";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";
import { useFavorites } from "../context/FavoritesContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery } = useSearch();
  const { books } = useBooks();
  const { theme, toggleTheme } = useTheme();
  const { favorites, showFavorites, toggleShowFavorites } = useFavorites();

  //função gera sugestões de busca
  const suggestions : Book[] = useMemo(() => {
    if (!query.trim()) return []
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
    setQuery(suggestion)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Image src="/books_logo.webp" alt="Logo" width={30} height={30} /> Bookshelf
          </Link>

          {/* SEARCH BAR - Desktop */}
          <div className="hidden md:flex flex-1 justify-center mx-6 relative">
            <div className="w-full max-w-lg relative">
              <SearchBar />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />

               {/* AUTOCOMPLETE */}
              {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 w-full bg-white border rounded-lg mt-1 shadow-md z-50">
                  {suggestions.map((book) => (
                    <li
                      key={book.id}
                      onClick={() => handleSelectSuggestion(book.name)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {book.name}{" "}
                      <span className="text-xs text-gray-500">
                        ({book.authors.join(", ")})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Ícones */}
          <div className="flex items-center gap-4">
          <button
            onClick={toggleShowFavorites}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Heart className={`h-6 w-6 ${showFavorites ? "text-red-500" : ""}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

            {/* Botão tema */}
          <button
              onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
      {theme === "dark" ? <Sun /> : <Moon />}
        </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU RESPONSIVO */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="p-4 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/favorites" className="block text-gray-700 hover:text-blue-600">
              Favoritos
            </Link>
            {/* SearchBar no mobile */}
            <div className="relative mt-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar livros..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
