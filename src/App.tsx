import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/global";
import { Router } from "./routes";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </>
  );
}

export default App;
