import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* Left */}
        <div className="text-center md:text-left">
          <h2
            onClick={() => navigate("/")}
            className="font-bold text-lg cursor-pointer"
          >
            IdeaValidator
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            AI-powered startup validation tool
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-black"
          >
            Home
          </span>
          <span
            onClick={() => navigate("/submit")}
            className="cursor-pointer hover:text-black"
          >
            Submit
          </span>
          <span
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:text-black"
          >
            Dashboard
          </span>
        </div>

        {/* Right */}
        <p className="text-xs text-gray-400 text-center md:text-right">
          © {new Date().getFullYear()} IdeaValidator. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;