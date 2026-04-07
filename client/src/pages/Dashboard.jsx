import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  Plus,
  TrendingUp,
  AlertTriangle,
  Shield,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const riskConfig = {
  Low: { icon: Shield, className: "bg-green-100 text-green-600" },
  Medium: { icon: AlertTriangle, className: "bg-yellow-100 text-yellow-600" },
  High: { icon: AlertTriangle, className: "bg-red-100 text-red-600" },
};

const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await axios.get(
          "https://aivalidation.onrender.com/ideas"
        );
        setIdeas(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">Your Ideas</h1>

          <button
            onClick={() => navigate("/submit")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            New Idea
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : ideas.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 border rounded-xl bg-white">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-lg font-semibold">No ideas yet</h2>
            <p className="text-gray-500 mb-4">
              Submit your first idea to get AI analysis
            </p>
            <button
              onClick={() => navigate("/submit")}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Submit Idea
            </button>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ideas.map((idea) => {
              const analysis = idea.analysis || {};
              const risk = analysis?.risk_level || "Medium";
              const score = analysis?.profitability_score ?? 0;
              const RiskIcon =
                riskConfig[risk]?.icon || AlertTriangle;

              return (
                <div
                  key={idea._id}
                  onClick={() => navigate(`/ideas/${idea._id}`)}
                  className="cursor-pointer border bg-white p-5 rounded-xl hover:shadow relative"
                >
                  {/* Delete */}
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();

                      const confirmDelete =
                        window.confirm("Delete this idea?");
                      if (!confirmDelete) return;

                      try {
                        setDeletingId(idea._id);

                        await axios.delete(
                          `https://aivalidation.onrender.com/ideas/${idea._id}`
                        );

                        setIdeas((prev) =>
                          prev.filter((i) => i._id !== idea._id)
                        );
                      } catch (err) {
                        console.log(err);
                        alert("Delete failed");
                      } finally {
                        setDeletingId(null);
                      }
                    }}
                    className="absolute top-2 right-2 text-red-500 text-xs hover:underline"
                  >
                    {deletingId === idea._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-1">
                    {idea.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {idea.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${riskConfig[risk].className}`}
                    >
                      <RiskIcon className="w-3 h-3 inline mr-1" />
                      {risk}
                    </span>

                    <span
                      className={`font-semibold ${getScoreColor(score)}`}
                    >
                      {score}/100
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;