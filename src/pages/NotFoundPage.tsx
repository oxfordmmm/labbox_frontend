import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center rounded-lg bg-background p-5 shadow-2xl">
        <FaExclamationTriangle className="mb-4 text-6xl text-yellow-400" />
        <h1 className="mb-4 text-6xl font-bold">404 Not Found</h1>
        <p className="mb-5 text-xl">This page does not exist</p>
        <Link
          to="/"
          className="text-forground mt-4 rounded-md bg-primary px-3 py-2 hover:bg-gray-900"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
