import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

function Home() {
  const { documents } = useCollection("projects");
  return (
    <div className="flex flex-col items-center px-5">
      <h1 className="text-4xl font-bold text-neutral mb-10">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
        {documents &&
          documents.map((doc) => {
            return (
              <Link
                to={`/about/${doc.id}`}
                key={doc.id}
                className="card w-full bg-neutral shadow-lg rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-semibold  mb-4">
                    {doc.name}
                  </h2>
                  {/* <p className="text-slate-400">
                    Created at:{" "}
                    <span className="font-medium text-teal-600">
                      {new Date(doc.createdAt.toDate()).toLocaleDateString()}
                    </span>
                  </p> */}
                  <p className="text-slate-400 mb-4">
                    Due Date:{" "}
                    <span className="font-medium text-lime-600">
                      {new Date(doc.dueTo.toDate()).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
