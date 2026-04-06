import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SubmitIdea from "./pages/SubmitIdea";
import IdeaDetail from "./pages/IdeaDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Index />} />

        {/* Submit Idea */}
        <Route path="/submit" element={<SubmitIdea />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Idea Details */}
        <Route path="/ideas/:id" element={<IdeaDetail />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;