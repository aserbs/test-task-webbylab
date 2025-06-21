// src/store/slices/moviesSlice.ts
import { movieService } from "@/services/movies.service";
import type { IFetchMoviesResponse, IMovie } from "@/types";
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchAll",

  async (search: string, { rejectWithValue }) => {
    try {
      const data = await movieService.fetchAll(search);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Thunk для видалення фільму
// export const deleteMovie = createAsyncThunk(
//   'movies/delete',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       await movieService.delete(id);
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// Тут можна додати інші thunks: addMovie, importMovies...

interface MoviesState {
  items: IMovie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MoviesState = {
  items: [],
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<IFetchMoviesResponse>) => {
          state.status = "succeeded";
          state.items = action.payload.data;
        }
      )
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
