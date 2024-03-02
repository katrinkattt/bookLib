
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book, Books } from "./types";
import { PersistConfig, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { bookEdit, loadBooks } from "./actions";

export const initialStateBooks: Books = {
  books: [],
  loading: false,
}

const booksSlice = createSlice({
  name: 'books',
  initialState: initialStateBooks,
  reducers: {
    LOADBooks: (state, action) => {
      const { arr } = action.payload;
      state.books = arr;
      return state;
    } //NOT NED HERE
  },
  extraReducers: builder => {
    builder.addCase(
      loadBooks.fulfilled.type,
      (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      }
    ), builder.addCase(loadBooks.pending.type, state => {
      state.loading = true;
    }),
      builder.addCase(loadBooks.rejected.type, state => {
        state.loading = false;
      });

    builder.addCase(
      bookEdit.fulfilled.type,
      (state, action: PayloadAction<Book>) => {
        state.loading = false;
        console.log('ACTION PAYLOAD', action.payload);

      }
    ), builder.addCase(bookEdit.pending.type, state => {
      state.loading = true;
      console.log('PENDINGGGGG')
    }),
      builder.addCase(bookEdit.rejected.type, state => {
        state.loading = false;
        console.log('REJECTEDDDD')
      });
  }
});
const persistConfig: PersistConfig<Books> = {
  key: 'books',
  storage: AsyncStorage,
  whitelist: ['load', 'setState'],
}
export const bookReducer = persistReducer(persistConfig, booksSlice.reducer);