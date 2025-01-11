import { useState } from "react";
import { useFireStore } from "../hooks/useFireStore";
import { useParams } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import useDocument from "../hooks/useDocument";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase/firestore";

function About() {
  const { id } = useParams();
  const { document } = useDocument("projects", id);
  const [content, setContent] = useState("");
  const { deleteDocument, updateDocument } = useFireStore("projects");
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      id: uuidv4(),
      content,
      createdAt: Timestamp.fromDate(new Date()),
      owner: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
    };
    await updateDocument(
      {
        comments: [...document.comments, comment],
      },
      id
    );

    setContent("");
  };

  if (!document) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading project details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <div className="card bg-warning  text-slate-950 w-[400px] h-[350px]  ">
          <div className="card-body ">
            <h2 className="card-title  text-2xl"> {document.name}</h2>
            <h3 className="text-x italic font-extralight">
              {document.projectType}
            </h3>
            <hr />

            <p className="w-full p-2 bg-success text-black rounded-md mt-2 ">
              {document.description}
            </p>
            {/*BUTTONS */}
            <div className="card-actions flex  justify-center gap-10">
              <div className="flex ">
                <button
                  className="py-2 px-4 mt-4 btn btn-warning text-black border-black hover:text-white"
                  type="button"
                  onClick={() => updateDocument(document.id)}
                >
                  Completed Project
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  className="py-2 px-4 mt-4 btn btn-warning text-black border-black hover:text-white"
                  type="button"
                  onClick={() => deleteDocument(id)}
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="max-h-[400px] overflow-x-auto">
          <h2 className="text-2xl ">Chat for comments:</h2>
          {document.comments.length == 0 ? (
            <h4 className="text-center my-10 italic opacity-50">
              No comments yet!
            </h4>
          ) : (
            <>
              {document.comments.map((comment) => {
                return (
                  <div
                    key={document.id}
                    className={`chat ${
                      user.uid == comment.owner.id ? "chat-end" : "chat-start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src={comment.owner.photoURL}
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {comment.owner.displayName}
                    </div>
                    <div className="chat-bubble">{comment.content}</div>
                    <div className="chat-footer opacity-50">
                      <time className="text-xs opacity-90">
                        {new Date(
                          comment.createdAt.toDate()
                        ).toLocaleTimeString()}
                      </time>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div>
            <form onSubmit={handleSubmit}>
              <label className="form-control">
                <textarea
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  className="textarea textarea-bordered h-24"
                  placeholder="Type here"
                ></textarea>
              </label>
              <button className="btn btn-neutral mt-2 btn-block">
                Send
                <VscSend />
              </button>
            </form>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default About;
