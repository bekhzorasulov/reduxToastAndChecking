import { useSelector } from "react-redux";
import FormInput from "../components/FormInput";
import { Form } from "react-router-dom";
import { useFireStore } from "../hooks/useFireStore";

function Profile() {
  const { state } = useFireStore("user");
  const { user } = useSelector((store) => store.user);

  return (
    <div className="min-h-screen bg-base p-6 flex flex-col items-center">
      <div className="relative w-full max-w-4xl">
        <div className="h-[200px] bg-gradient-to-r from-warning to-neutral rounded-xl shadow-lg"></div>
        <img
          src={user.photoURL}
          alt=""
          className="w-[150px] h-[150px] rounded-full text bg-base-100 border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 -bottom-12"
        />
      </div>

      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold text-gray-800">{user.displayName}</h1>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </div>

      <div className="w-full max-w-3xl mt-8 bg-white p-6 rounded-xl shadow-lg">
        <Form className="flex flex-col gap-4">
          <FormInput
            label="Username"
            type="text"
            placeholder="Enter your username"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
        </Form>
      </div>

      <div className="mt-6 w-full max-w-3xl">
        {!state.isPanding ? (
          <button className="w-full bg-gradient-to-r from-warning to-neutral text-white py-3 rounded-lg  transition-all">
            Save
          </button>
        ) : (
          <button
            className="w-full bg-gradient-to-r from-warning to-neutral text-white py-3 rounded-lg cursor-not-allowed opacity-75"
            disabled
          >
            Saving...
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
