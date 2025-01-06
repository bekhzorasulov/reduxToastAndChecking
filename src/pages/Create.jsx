import FormTextare from "../components/FormTextare";
import FormInput from "../components/FormInput";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useFireStore } from "../hooks/useFireStore";
import { useCollection } from "../hooks/useCollection";

const animatedComponents = makeAnimated();

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.fromDate(new Date(form.get("dueTo")));
  return { name, description, dueTo };
}

const projectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
];

function Create() {
  const navigate = useNavigate();
  const { addDocument, isPanding } = useFireStore("projects");
  const { documents } = useCollection("users");
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUser] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(
      documents?.map((document) => {
        return { value: { ...document }, label: document.displayName };
      })
    );
  }, [documents]);

  const selectUser = (user) => {
    setAssignedUser(user);
    console.log(user);
  };

  const selectProjectType = (type) => {
    setProjectType(type.value);
  };

  useEffect(() => {
    if (createActionData) {
      addDocument({
        ...createActionData,
        assignedUsers,
        projectType,
        createdAt: serverTimestamp(new Date()),
      }).then(() => {
        navigate("/");
      });
    }
  }, [createActionData]);

  return (
    <div className="flex flex-col items-center px-5">
      <h2 className="text-3xl font-semibold text-black mb-10 text-center">
        {" "}
        Create a new project
      </h2>
      <Form
        method="post"
        className="flex flex-col gap-7 max-w-[700px] w-full justify-center bg-white p-10 shadow-lg rounded-lg border border-gray-300"
      >
        <FormInput
          label="Project name"
          type="text"
          placeholder="Write project name here."
          name="name"
        />
        <FormTextare label="Project descripton" name="description" />
        <FormInput label="Due to" type="date" name="dueTo" />
        <label className="form-control">
          <div className="label">
            <span className="label-text">Project Types</span>
          </div>
          <Select onChange={selectProjectType} options={projectTypes} />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Assigned Users</span>
          </div>
          <Select
            onChange={selectUser}
            options={users}
            isMulti
            components={animatedComponents}
          />
        </label>
        {isPanding && (
          <div className="flex justify-end">
            <button className="btn btn-outline btn-success" disabled>
              Loading...
            </button>
          </div>
        )}
        {!isPanding && (
          <div className="flex justify-end">
            <button className="btn btn-outline btn-success">Add project</button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Create;
