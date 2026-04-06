import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />
    <div className="flex-1 flex items-center justify-center">
      <div>
        <h1>404</h1>
        <a href="/">Go Home</a>
      </div>
    </div>
     <Footer />
    </div>
  );
};

export default NotFound;