export interface IMoviesResponse {
  data: IMovie[];
  status: number;
  meta: object;
}

export interface IMovie {
  id: number;
  title: string;
  year: number;
  format: string;
}

export interface IMovieInfo {
  id: string;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
  actors: IActor[];
}

export interface IMovieInfoResponse {
  data: IMovieInfo;
  status: number;
  error: IResponseError;
}

export interface IActor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IFetchMoviesParams {
  search?: string;
  sort?: string;
  order?: string;
  limit?: number;
  offset?: number;
}

export interface IFetchMoviesResponse {
  data: IMovie[];
  meta: { total: number };
  status: number;
}

export interface IDeleteMovieResponse {
  status: number;
  error: IResponseError;
}

export interface IResponseError {
  code: string;
  fields: {};
}

export interface INewMovie {
  title: string;
  year: number;
  format: string;
  actors: string[];
}

export interface ICreateMovieResponse {
  data: IMovieInfo;
  status: number;
  error: {
    code: string;
    fields: {
      year: string;
      title: string;
      format: string;
      actors: string;
    };
  };
}
