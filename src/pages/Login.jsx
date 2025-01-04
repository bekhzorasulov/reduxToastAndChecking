import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  return { email, password };
};

function Login() {
  const { isPending } = useSelector((store) => store.user);
  const { loginWithEmailAndPassword } = useLogin();
  const data = useActionData();
  console.log(data);
  useEffect(() => {
    if (data) {
      loginWithEmailAndPassword(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="min-h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Log In</h2>
        <FormInput type="email" placeholder="Name" label="Email" name="email" />
        <FormInput
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
        />
        <div className="my-5">
          {!isPending && (
            <button type="submit" className="btn btn-success btn-block">
              Log In
            </button>
          )}
          {isPending && (
            <button
              type="submit"
              className="btn btn-success btn-block"
              disabled
            >
              Loading...
            </button>
          )}
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
