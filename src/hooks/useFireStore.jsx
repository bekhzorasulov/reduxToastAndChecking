import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useFireStore(collectionName) {
  const navigate = useNavigate();
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

  const deleteDocument = async (id) => {
    setIsPanding(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Project deleted successfully!");
      navigate("/");
    } catch {
      toast.error(error.code);
      setError(error.code);
    } finally {
      setIsPanding(false);
    }
  };

  const updateDocument = () => {
    setIsPanding(true);

    setIsPanding(false);
  };

  return { addDocument, deleteDocument, updateDocument, isPanding, error };
}

export { useFireStore };
