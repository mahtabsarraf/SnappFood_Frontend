import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import LoadingScreen from "./app/pages/LoadingScreen";
import Routes from "./app/router/route";
import "./app/sass/index.scss";

function App({ basename }) {
   return (
      <React.Suspense fallback={<LoadingScreen />}>
         <BrowserRouter basename={basename}>
            <ToastContainer
               position="bottom-right"
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />
            <Routes />
         </BrowserRouter>
      </React.Suspense>
   );
}

export default App;
