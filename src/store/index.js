import { createStore, combineReducers } from "redux";
import TitleReducer from "./fiture/responseSearch/reducer";
import parameterSendReducer from "./fiture/parameterSearchSend/reducer";
import statusRequestSearchReducer from "./fiture/statusSearch/reducer";
import parameterDetailProductReducer from "./fiture/parameterDetailProduct/reducer";
import detailsProductReducer from "./fiture/responseDetailProduct/reducer";
import stepMenuReducer from "./fiture/step/reducer";
import changeBreadcrumReducer from "./fiture/parmeterHandlerBreadcrum/reducer";
import changeFirmApiReducer from "./fiture/firmApi/reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  TitleReducer,
  parameterSendReducer,
  statusRequestSearchReducer,
  parameterDetailProductReducer,
  detailsProductReducer,
  stepMenuReducer,
  changeBreadcrumReducer,
  changeFirmApiReducer,
});

const persistConfig = {
  key: "mercado_libre",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() // plugin de chrome para examinar la store
);
const persistor = persistStore(store);

export { store, persistor };
