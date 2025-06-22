import type {
  ICreateMovieResponse,
  IDeleteMovieResponse,
  IFetchMoviesParams,
  IFetchMoviesResponse,
  IMovieInfoResponse,
  INewMovie,
} from "@/types";
import axiosInstance from "./axiosInstance";

class MovieService {
  private BASE_URL = "/movies";

  async fetchAll(search: string): Promise<IFetchMoviesResponse> {
    const trimmed = search.trim();

    const params: IFetchMoviesParams = {
      sort: "title",
      order: "ASC",
      ...(trimmed && { search: trimmed }),
    };

    const res = await axiosInstance.get<IFetchMoviesResponse>(this.BASE_URL, {
      params,
    });
    return res.data;
  }

  async getMovieInfo(id: number): Promise<IMovieInfoResponse> {
    const res = await axiosInstance.get<IMovieInfoResponse>(
      `${this.BASE_URL}/${id}`
    );
    return res.data;
  }

  async fetchDeleteMovie(id: number) {
    const res = await axiosInstance.delete<IDeleteMovieResponse>(
      `${this.BASE_URL}/${id}`
    );
    return res.data;
  }

  async fetchCreateMovie(newMovie: INewMovie) {
    const res = await axiosInstance.post<ICreateMovieResponse>(this.BASE_URL, {
      ...newMovie,
    });
    return res.data;
  }

  async fetchImportTxt(form: FormData) {
    const res = await axiosInstance.post(`${this.BASE_URL}/import`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
}

export const movieService = new MovieService();
