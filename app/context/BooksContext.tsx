"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Book = {
id: string;
name: string;
authors: string[];
description: string;
imagelink?: string;
publishedat: string;
};

type BooksContextType = {
books: Book[];
setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: ReactNode }) {
const [books, setBooks] = useState<Book[]>([]);

return (
<BooksContext.Provider value={{ books, setBooks }}>
    {children}
</BooksContext.Provider>
);
}

export function useBooks() {
const context = useContext(BooksContext);
if (!context) throw new Error("useBooks deve ser usado dentro do BooksProvider");
return context;
}
