import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../api/api";
import { extractCodeFromShortLink } from "../utils/url";

const FRONTEND_URL = window.location.origin;

interface LinkResponse {
  shortLink: string;
}

interface LinkState {
  currentLink: { shortLink: string; statsLink: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: LinkState = {
  currentLink: null,
  loading: false,
  error: null,
};

export const createLink = createAsyncThunk<
  { shortLink: string; statsLink: string },
  string,
  { rejectValue: string }
>("links/create", async (url: string, { rejectWithValue }) => {
  try {
    const response = await api.post<LinkResponse>("/api/links", { url });
    const { shortLink } = response.data;
    const code = extractCodeFromShortLink(shortLink);
    const statsLink = `${FRONTEND_URL}/stats/${code}`;
    return { shortLink, statsLink };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.error) {
      return rejectWithValue(err.response.data.error);
    }
    return rejectWithValue("Failed to create link");
  }
});

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLink = action.payload;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export default linkSlice.reducer;
