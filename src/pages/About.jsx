import { useEffect, useState } from "react";
import { useFireStore } from "../hooks/useFireStore";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

function About() {
  const [project, setProject] = useState(null);
  const { isPending, deleteDocument, updateDocument } =
    useFireStore("projects");

  const { id } = useParams();

  useEffect(() => {
    const fetchedProjects = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch {
        console.error("Error fetching document:", error);
      }
    };

    fetchedProjects();
  }, [id]);

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading project details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <div className="card bg-yellow-400 text-slate-950 w-[500px]  ">
          <div className="card-body ">
            <h2 className="card-title  text-2xl"> {project.name}</h2>
            <h3 className="text-x italic font-extralight ">
              {project.projectType}
            </h3>
            <hr />

            <p className="w-full p-2 bg-white text-black rounded-md mt-2 ">
              {project.description}
            </p>
            {/*BUTTONS */}
            <div className="card-actions flex  justify-center gap-10">
              <div className="flex ">
                <button
                  className="py-2 px-4 mt-4 btn btn-outline btn-warning"
                  type="button"
                  onClick={() => updateDocument(project.id)}
                >
                  Completed Project
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  className="py-2 px-4 mt-4 btn btn-outline btn-warning"
                  type="button"
                  onClick={() => deleteDocument(id)}
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
