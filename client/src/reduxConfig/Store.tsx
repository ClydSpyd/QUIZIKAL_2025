import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import chatReducer from './reducers/chatReducer'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import quizReducer from './reducers/quizReducer';

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  quiz: quizReducer
},
)
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch