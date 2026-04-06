import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg sm:text-xl font-bold cursor-pointer"
        >
          IdeaValidator
        </h1>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-6">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/submit")}>Submit</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-2">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/submit")}>Submit</button>
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;