import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { store } from "./features/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer
      position="top-center"
      autoClose={3200}
      newestOnTop={false}
      closeOnClick
    />
  </>
);
