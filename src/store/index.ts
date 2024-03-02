// import { combineReducers } from "redux";
import { bookReducer } from "./slice";
import { PayloadAction, configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-community/async-storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";


const combinedReducer = combineReducers({
  StateBooks: bookReducer
});
// @ts-ignore
const rootReducer: typeof combinedReducer = (
  state: any,
  action: PayloadAction,
) => {
  return combinedReducer(state, action)
};

const setupStore = () => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return configureStore({
    reducer: persistedReducer,
  });
};
const store = setupStore();

const persistor = persistStore(store);

export { persistor, store };

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];