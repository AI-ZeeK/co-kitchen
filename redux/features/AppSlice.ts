import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDataApi, getFolderDataApi} from "../services/appApi";
export interface DataType {
  id: string;
  type: string;
  name: string;
  src: string;
  favourite: boolean;
  created_at: string;
  contents: DataType[];
}
interface InitialTypes {
  data: DataType[];
  fileData: DataType[];
  filedata: DataType;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isError2: boolean;
  isSuccess2: boolean;
  isLoading2: boolean;
  isModal: boolean;
}
const initialState: InitialTypes = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isError2: false,
  isSuccess2: false,
  isLoading2: false,
  isModal: false,
  data: [],
  fileData: [],
  filedata: {
    id: "",
    type: "",
    name: "",
    src: "",
    favourite: false,
    created_at: "",
    contents: [],
  },
};
// Get Data
export const getData: any = createAsyncThunk("data", async (_, thunkAPI) => {
  try {
    return await getDataApi();
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// fetch the data for each folder using its id
export const getFolderData: any = createAsyncThunk(
  "folder data",
  async (id: string, thunkAPI) => {
    try {
      return await getFolderDataApi(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const AppSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    openModal: (state, {payload}) => {
      state.filedata = payload;
      state.isModal = true;
    },
    closeModal: (state) => {
      state.isModal = false;
    },
    reset: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getData.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = payload;
      })
      .addCase(getData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(getFolderData.pending, (state) => {
        state.isLoading2 = true;
      })
      .addCase(getFolderData.fulfilled, (state, {payload}) => {
        state.isLoading2 = false;
        state.isSuccess2 = true;
        state.fileData = payload;
      })
      .addCase(getFolderData.rejected, (state) => {
        state.isLoading2 = false;
        state.isError = true;
        console.log('3218942384')
      });
  },
});

export const {openModal, closeModal, reset} = AppSlice.actions;
export default AppSlice.reducer;
