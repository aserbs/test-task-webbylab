import type { IMovie } from "./types";
import MovieListItem from "./components/shared/MovieListItem";
import { useMovies } from "./hooks/useMovies";
import TopBar from "./components/shared/TopBar";
import { Toaster } from "sonner";
import AddFilmForm from "./components/shared/AddFilmForm";
import React from "react";
import { AnimatePresence } from "framer-motion";

export const App = () => {
  const { movies, status, error, refresh } = useMovies();
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <div className="">
      <TopBar setIsFormOpen={setIsFormOpen} />
      <AnimatePresence>
        {isFormOpen && (
          <AddFilmForm setIsFormOpen={setIsFormOpen} refresh={refresh} />
        )}
      </AnimatePresence>
      <div className="p-3 pt-0">
        <h1 className="mt-[15px] text-[20px] font-bold">Фільми:</h1>

        {status === "failed" && (
          <div className="text-red-500">Помилка: {error}</div>
        )}
        {status === "loading" && <div>Завантаження...</div>}

        <ul>
          {movies?.length == 0 && status !== "loading" ? (
            <div>Фільмів немає</div>
          ) : (
            movies?.map((movie: IMovie) => (
              <MovieListItem key={movie.id} movie={movie} refresh={refresh} />
            ))
          )}
        </ul>
      </div>

      <Toaster />
    </div>
  );
};
