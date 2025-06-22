import type { IMovie } from "@/types";
import { Button } from "../ui/button";

import { useMovieInfo } from "@/hooks/useMovieInfo";
import { MovieInfoPopup } from "./MovieInfoPopup";
import { movieService } from "@/services/movies.service";
import { toast } from "sonner";
import { useMovies } from "@/hooks/useMovies";

type Props = {
  movie: IMovie;
  refresh: () => void;
};

export default function MovieListItem({ movie, refresh }: Props) {
  const { handleOpenMovieInfo, setIsOpen, isOpen, movieInfo } = useMovieInfo();

  const handleDeleteMovie = async (id: number) => {
    const res = await movieService.fetchDeleteMovie(id);
    if (res?.status == 1) {
      toast.success("Фільм видалено");
      // refetch all movies for actual info
      refresh();
    } else {
      toast.error("Error", { description: res?.error.code });
    }
  };

  return (
    <li
      key={movie.id}
      className="flex justify-between items-center p-4 border-b"
    >
      <div>
        <h3 className="text-xl font-bold">
          {movie.title} ({movie.year})
        </h3>
        <p>Формат: {movie?.format}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant={"secondary"}
          className="cursor-pointer"
          onClick={() => handleOpenMovieInfo(movie.id)}
        >
          Інформація
        </Button>
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          onClick={() => handleDeleteMovie(movie.id)}
        >
          Видалити
        </Button>
      </div>

      <MovieInfoPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        movieInfo={movieInfo}
      />
    </li>
  );
}
