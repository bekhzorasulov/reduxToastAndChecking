import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";

function useFireStore(collectionName) {
  const [isPanding, setIsPanding] = useState(false);
  const [error, setError] = useState(null);

  const addDocument = async (data) => {
    setIsPanding(true);
    try {
      await addDoc(collection(db, collectionName), data);
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error(error.code);
      setError(error.code);
    } finally {
      setIsPanding(false);
    }
  };

  const deleteDocument = () => {
    setIsPanding(true);

    setIsPanding(false);
  };

  const updateDocument = () => {
    setIsPanding(true);

    setIsPanding(false);
  };

  return { addDocument, deleteDocument, updateDocument, isPanding, error };
}

export { useFireStore };
