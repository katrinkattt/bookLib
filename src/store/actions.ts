import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL, loadData, editBook, addBook } from "../apiClient/ConstAPI";
import apiClient from "../apiClient/instance";
import { Book } from "./types";

export const loadBooks = createAsyncThunk<
  Book[],
  {
    link?: string;
    onSuccess?: (response: Book[]) => void;
    onError?: (e: any) => void;
  }
>('getBooks', async arg => {
  try {
    const { data: response } = await apiClient.get<Book[]>(
      API_BASE_URL + loadData,
    );
    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});
export const bookEdit = createAsyncThunk<
  Book,
  {
    data: Book;
    onSuccess?: (response: Book) => void;
    onError?: (e: any) => void;
  }
  >('editBook', async arg => {
  try {
    const { data: response } = await apiClient.post<Book>(
      API_BASE_URL + editBook,
      { ...arg.data }
    );
    arg.onSuccess?.(response);
    return response;
  } catch (e: any) {
    arg.onError?.(e.response);
    throw e;
  }
});//не используется тк нет данных в ответе

export const bookAdd = createAsyncThunk<
  Book,
  {
    data: Book;
    onSuccess?: (response: Book) => void;
    onError?: (e: any) => void;
  }>('addBook', async arg => {
    try {
      const { data: response } = await apiClient.post<Book>(
        API_BASE_URL + addBook,
        { ...arg.data }
      );
      arg.onSuccess?.(response);
      return response;
    } catch (e: any) {
      arg.onError?.(e.response);
      throw e;
    }
  }); //here not use because not info from response