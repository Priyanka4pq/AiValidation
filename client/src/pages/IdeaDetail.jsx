import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const IdeaDetail = () => {
  const { id } = useParams();
  const [idea, setIdea] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await axios.get(
          `https://aivalidation.onrender.com/ideas/${id}`
        );
        setIdea(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchIdea();
  }, [id]);

  if (!idea) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const a = idea.analysis || {};

  const riskColor =
    a.risk_level === "High"
      ? "text-red-600"
      : a.risk_level === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-sm text-gray-600 hover:underline"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {idea.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {idea.description}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card title="Problem" content={a.problem} />
          <Card title="Customer" content={a.customer} />
          <Card title="Market" content={a.market} />
        </div>

        {/* Competitors */}
        <div className="mt-6 bg-white p-5 rounded-xl border">
          <h2 className="font-semibold mb-3">Competitors</h2>

          <div className="space-y-3">
            {Array.isArray(a.competitors) &&
              a.competitors.map((comp, i) =>
                typeof comp === "string" ? (
                  <p key={i} className="text-sm text-gray-600">
                    • {comp}
                  </p>
                ) : (
                  <div key={i}>
                    <p className="font-medium">{comp.name}</p>
                    <p className="text-sm text-gray-500">
                      {comp.differentiation}
                    </p>
                  </div>
                )
              )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 bg-white p-5 rounded-xl border">
          <h2 className="font-semibold mb-2">Tech Stack</h2>

          <div className="flex flex-wrap gap-2">
            {a.tech_stack?.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Score + Risk */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border">
            <h2 className="text-sm text-gray-500">
              Profitability Score
            </h2>
            <p className="text-2xl font-bold">
              {a.profitability_score}/100
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <h2 className="text-sm text-gray-500">
              Risk Level
            </h2>
            <p className={`text-2xl font-bold ${riskColor}`}>
              {a.risk_level}
            </p>
          </div>
        </div>

        {/* Justification */}
        <div className="mt-6 bg-white p-5 rounded-xl border">
          <h2 className="font-semibold mb-2">AI Justification</h2>
          <p className="text-gray-600 text-sm">
            {a.justification}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Card = ({ title, content }) => (
  <div className="bg-white p-5 rounded-xl border">
    <h2 className="font-semibold mb-2">{title}</h2>
    <p className="text-sm text-gray-600">
      {content || "N/A"}
    </p>
  </div>
);

export default IdeaDetail;