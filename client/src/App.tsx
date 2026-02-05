import { Global } from "@emotion/react";
import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog/Catalog";
import Favorites from "./pages/Favorites/Favorites";
import { GLOBAL_STYLES } from "./styles/global.styles";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <Global styles={GLOBAL_STYLES} />
    </Router>
  );
};

export default App;