import { createStore, combineReducers } from "redux";
import TitleReducer from "./fiture/responseSearch/reducer";
import parameterSendReducer from "./fiture/responseSearch/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  TitleReducer,
  parameterSendReducer,
  //AppControlReducer
});

const persistConfig = {
  key: "mercado_libre",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_() // plugin de chrome para examinar la store
);
const persistor = persistStore(store);

export { store, persistor };
