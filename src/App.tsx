import MainContent from "./Components/MainContent";
import ProductPage from "./Components/ProductPage";
import SideBar from "./Components/SideBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
