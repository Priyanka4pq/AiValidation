import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SubmitIdea = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/ideas", {
        title,
        description
      });

      navigate(`/ideas/${res.data._id}`);
    } catch (err) {
      console.log(err);
      alert("Error generating idea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />
    <div className="flex-1 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="p-8 border rounded-xl space-y-4 w-full max-w-md">
        
        <input
          type="text"
          placeholder="Idea Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
          rows={5}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin w-4 h-4" />}
          {loading ? "Analyzing..." : "Validate Idea"}
        </button>

      </form>
    </div>
     <Footer />
    </div>
  );
};

export default SubmitIdea;