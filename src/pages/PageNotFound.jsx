import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function PageNotFound() {
  const error = useRouteError();

  if (error.status == 404) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-4xl">Page Not Found</h2>
          <Link to="/" className="btn btn-success">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-4xl">Something went wrong</h2>
        <Link to="/" className="btn btn-success">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
