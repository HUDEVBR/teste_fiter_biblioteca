"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart, Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery } = useSearch();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            📚 Bookshelf
          </Link>

          {/* SEARCH BAR - Desktop */}
          <div className="hidden md:flex flex-1 justify-center mx-6">
            <div className="relative w-full max-w-lg">
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

          {/* Ícones */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Heart className="h-6 w-6 text-red-500" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
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
