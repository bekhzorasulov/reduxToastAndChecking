import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const document = {
  document: null,
  isPanding: false,
  error: null,
  success: true,
};

const changeState = (state, action) => {
  switch (action.type) {
    case "IS_PENDING": {
      return {
        document: null,
        isPanding: true,
        error: null,
        success: false,
      };
    }
    case "ADD_DOCUMENT": {
      return {
        document: action.payload,
        isPanding: false,
        error: null,
        success: true,
      };
    }
    case "DELETE_DOCUMENT": {
      return {
        document: null,
        isPanding: false,
        error: null,
        success: true,
      };
    }
    case "ERROR": {
      return {
        document: null,
        isPanding: false,
        error: action.payload,
        success: false,
      };
    }
    case "UPDATE_DOCUMENT": {
      return {
        document: action.payload,
        isPanding: false,
        error: null,
        success: false,
      };
    }
  }
};

function useFireStore(collectionName) {
  const [state, dispatch] = useReducer(changeState, document);
  const navigate = useNavigate();

  const addDocument = async (data) => {
    dispatch({ type: "IS_PENDING", payload: true });
    try {
      let newDoc = await addDoc(collection(db, collectionName), data);
      toast.success("Project added successfully!");
      navigate("/");
      dispatch({ type: "ADD_DOCUMENT", payload: newDoc });
    } catch (error) {
      toast.error(error.code);
      dispatch({ type: "ERROR", payload: error.code });
    } finally {
      dispatch({ type: "IS_PENDING", payload: false });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING", payload: true });
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success("Project deleted successfully!");
      navigate("/create");
      dispatch({ type: "DELETE_DOCUMENT" });
    } catch (error) {
      toast.error(error.code);
      dispatch({ type: "ERROR", payload: error.code });
    } finally {
      dispatch({ type: "IS_PENDING", payload: false });
    }
  };

  const updateDocument = async (document, id) => {
    dispatch({ type: "IS_PENDING", payload: true });
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, document);
    dispatch({ type: "IS_PENDING", payload: false });
  };

  return { addDocument, deleteDocument, updateDocument, state };
}

export { useFireStore };
