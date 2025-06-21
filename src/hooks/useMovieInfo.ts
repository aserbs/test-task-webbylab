import { movieService } from "@/services/movies.service";
import type { IMovieInfo } from "@/types";
import React from "react";
import { toast } from "sonner";

export function useMovieInfo() {
  const [movieInfo, setMovieInfo] = React.useState<IMovieInfo | undefined>(
    undefined
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenMovieInfo = async (id: number) => {
    const res = await movieService.getMovieInfo(id);
    if (res?.data && res?.status === 1) {
      setIsOpen(true);
      setMovieInfo(res?.data);
    } else toast.error("Error", { description: res.error.code });
  };

  const handleClose = () => {
    setIsOpen(false);
    setMovieInfo(undefined);
  };

  return {
    movieInfo,
    isOpen,
    setIsOpen,
    handleClose,
    handleOpenMovieInfo,
  };
}
