"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FavoritesContextType = {
favorites: string[];
toggleFavorite: (id: string) => void;
isFavorite: (id: string) => boolean;
showFavorites: boolean;
toggleShowFavorites: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
const [favorites, setFavorites] = useState<string[]>([]);
const [showFavorites, setShowFavorites] = useState(false);

// Carrega favoritos do localStorage
useEffect(() => {
const saved = localStorage.getItem("favorites");
if (saved) setFavorites(JSON.parse(saved));
}, []);

// Salva favoritos no localStorage sempre que mudar
useEffect(() => {
localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

const toggleFavorite = (id: string) => {
setFavorites((prev) =>
    prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
);
};

const isFavorite = (id: string) => favorites.includes(id);

const toggleShowFavorites = () => setShowFavorites((prev) => !prev);

return (
<FavoritesContext.Provider
    value={{ favorites, toggleFavorite, isFavorite, showFavorites, toggleShowFavorites }}
>
    {children}
</FavoritesContext.Provider>
);
}

export const useFavorites = () => {
const ctx = useContext(FavoritesContext);
if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
return ctx;
};
