import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/AppRouter.jsx";
import { AuthProvider } from "./context/Authcontext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
