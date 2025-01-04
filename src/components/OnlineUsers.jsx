import { useCollection } from "../hooks/useCollection";

function OnlineUsers() {
  const { documents } = useCollection("users");

  return (
    <div className="w-[200px] bg-slate-600 p-10">
      <ul>
        {documents &&
          documents.map((doc) => {
            return (
              <li key={doc.id}>
                <div className=" flex  gap-5">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2 mb-5">
                    <img src={doc.photoURL} />
                  </div>
                  <p
                    className={`${
                      doc.online ? "text-lime-600" : "text-red-600"
                    }`}
                  >
                    {doc.displayName}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
