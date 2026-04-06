import { useNavigate } from "react-router-dom";
import { Sparkles, BarChart3 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col  bg-gray-50">

      <Navbar />
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
        AI Startup Validator
      </h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Validate your startup ideas using AI. Get insights on market, risk, and profitability instantly.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/submit")}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded"
        >
          <Sparkles className="w-5 h-5" />
          Validate Idea
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 border px-6 py-3 rounded"
        >
          <BarChart3 className="w-5 h-5" />
          Dashboard
        </button>
      </div>

    </div>
     <Footer />
    </div>
  );
};

export default Index;