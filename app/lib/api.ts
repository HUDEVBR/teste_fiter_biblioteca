export async function fetchBooks(page: number, limit: number) {
  // simula demora de rede
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const res = await fetch(`http://localhost:4000/books?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Erro ao buscar livros");
  return res.json();
}

export async function fetchBookById(id: string) {
  const res = await fetch(`http://localhost:4000/books/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar livro");
  return res.json();
}
  