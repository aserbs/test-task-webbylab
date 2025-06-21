// src/hooks/useMovies.ts
import {
  useState,
  useEffect,
  useMemo,
  type ChangeEventHandler,
  useCallback,
} from "react";
import debounce from "lodash/debounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMovies } from "@/store/slices/moviesSlice";

export function useMovies(debounceMs = 500) {
  const dispatch = useAppDispatch();
  const { items: movies, status, error } = useAppSelector((s) => s.movies);

  //filter movies
  const [search, setSearch] = useState<string>("");

  const debouncedFetch = useMemo(
    () =>
      debounce((q: string) => {
        dispatch(fetchMovies(q));
      }, debounceMs),
    [dispatch, debounceMs]
  );

  useEffect(() => {
    debouncedFetch(search);
    return () => {
      debouncedFetch.cancel();
    };
  }, [search, debouncedFetch]);

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const refresh = useCallback(() => {
    dispatch(fetchMovies(search));
  }, [dispatch, search]);

  return {
    search,
    setSearch,
    handleSearchChange,
    refresh,
    movies,
    status,
    error,
  };
}
