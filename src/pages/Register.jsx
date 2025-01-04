import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";
import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const repeatPassword = form.get("repeatPassword");
  return { displayName, email, password, repeatPassword };
};

function Register() {
  const { registerWithEmailAndPassword } = useRegister();
  const data = useActionData();
  console.log(data);
  useEffect(() => {
    if (data) {
      if (!data.email || !data.password || !data.displayName) {
        toast.error("Please fill all the fields!");
        return;
      }
      if (data.password !== data.repeatPassword) {
        toast.error("Password is not correct!");
        return;
      }
      toast.success("Successfully registered!");
      registerWithEmailAndPassword(data.displayName, data.email, data.password);
    }
  }, [data]);

  return (
    <div className="min-h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Register</h2>
        <FormInput
          type="text"
          placeholder="Name"
          label="Display Name"
          name="name"
        />
        <FormInput
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
        />
        <FormInput
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
        />
        <FormInput
          type="password"
          placeholder="Repeat Password"
          label="Repeat Password"
          name="repeatPassword"
        />
        <div className="my-5">
          <button type="submit" className="btn btn-success btn-block">
            Register
          </button>
        </div>
        <div className="text-center">
          <p>
            If you have an account,{" "}
            <Link className="link link-success" to="/login">
              Log In
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Register;
