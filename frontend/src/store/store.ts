import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import bookmarkReducer from './slices/bookmarkSlice';
import examReducer from './slices/examSlice';
import generatorReducer from './slices/generatorSlice';
import glossaryReducer from './slices/glossarySlice';
import guideReducer from './slices/guideSlice';
import progressReducer from './slices/progressSlice';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer,
  exam: examReducer,
  progress: progressReducer,
  bookmarks: bookmarkReducer,
  generator: generatorReducer,
  guide: guideReducer,
  glossary: glossaryReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'exam', 'progress', 'bookmarks'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['store']['getState']>;
export type AppDispatch = AppStore['store']['dispatch'];
