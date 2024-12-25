import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};

function Login() {
  const data = useActionData();
  const { loginWithEmailAndPassword } = useLogin();
  useEffect(() => {
    if (data) {
      if (!data.email || !data.password) {
        toast.error("Please fill all the fields!");
        return;
      }
      loginWithEmailAndPassword(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Log In</h2>
        <FormInput type="email" placeholder="Name" label="Email" name="email" />
        <FormInput type="password" placeholder="Password" label="Password" />
        <div className="my-5">
          <button type="submit" className="btn btn-success btn-block">
            Log In
          </button>
        </div>
        <div className="text-center">
          <p>
            If you donot have account,{" "}
            <Link className="link link-success" to="/register">
              Register
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;