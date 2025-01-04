import FormTextare from "../components/FormTextare";
import FormInput from "../components/FormInput";
import { Form, useActionData } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useFireStore } from "../hooks/useFireStore";

const animatedComponents = makeAnimated();

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.fromDate(new Date(form.get("dueTo")));
  return { name, description, dueTo };
}

const usersOptions = [
  { value: "user1", label: "User1" },
  { value: "user2", label: "User2" },
  { value: "user3", label: "User3" },
];

const projectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
];

function Create() {
  const { addDocument } = useFireStore();
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUser] = useState([]);
  const [projectType, setProjectType] = useState([]);

  const selectUser = (user) => {
    setAssignedUser(user);
    console.log(user);
  };

  const selectProjectType = (type) => {
    setProjectType(type);
  };

  useEffect(() => {
    if (createActionData) {
      addDocument("projects", {
        ...createActionData,
        assignedUsers,
        projectType,
        createdAt: serverTimestamp(new Date()),
      });
    }
  }, [createActionData]);

  return (
    <div className="mx-48">
      <h2 className="text-3xl font-semibold text-black">
        {" "}
        Create a new project
      </h2>
      <Form method="post" className="flex flex-col gap-7 max-w-[450px] w-full">
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
            options={usersOptions}
            isMulti
            components={animatedComponents}
          />
        </label>
        <div className="flex justify-end">
          <button className="btn btn-outline btn-success">Add project</button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
