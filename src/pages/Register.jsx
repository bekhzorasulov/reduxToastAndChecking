import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { validateSignupOrLoginData } from "../utils";
import { useSelector } from "react-redux";
import { useAuthWithGoogle } from "../hooks/useAuthWithGoogle";

// action
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("repeatPassword");
  return { displayName, email, password, confirmPassword };
};

function Register() {
  const { googleSignIn, isPanding } = useAuthWithGoogle();
  const { isPending } = useSelector((store) => store.user);
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { registerWithEmailAndPassword } = useRegister();
  const signUpActionData = useActionData();
  useEffect(() => {
    if (signUpActionData) {
      const { valid, errors } = validateSignupOrLoginData(
        signUpActionData,
        true
      );
      if (valid) {
        const { displayName, email, password } = signUpActionData;
        registerWithEmailAndPassword(displayName, email, password);
      } else {
        setError(errors);
      }
    }
  }, [signUpActionData]);

  return (
    <div className="min-h-screen grid place-items-center w-full">
      <Form method="post" className="max-w-96 mx-auto w-full">
        <h2 className="text-4xl text-center mb-5 font-bold">Register</h2>
        <FormInput
          type="text"
          placeholder="Name"
          label="Display Name"
          name="name"
          error={error.displayName && "input-error"}
          errorText={error.displayName}
        />
        <FormInput
          type="email"
          placeholder="Email"
          label="Email"
          name="email"
          error={error.email && "input-error"}
          errorText={error.email}
        />
        <FormInput
          type="password"
          placeholder="Password"
          label="Password"
          name="password"
          error={error.password && "input-error"}
          errorText={error.password}
        />
        <FormInput
          type="password"
          placeholder="Repeat Password"
          label="Repeat Password"
          name="repeatPassword"
          error={error.confirmPassword && "input-error"}
          errorText={error.confirmPassword}
        />
        <div className="my-5">
          {!isPending && (
            <button type="submit" className="btn btn-success btn-block">
              Register
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
        <div>
          <button
            disabled={isPanding}
            onClick={googleSignIn}
            type="button"
            className="btn btn-success btn-block"
          >
            {isPanding ? "Loading.." : "Google"}
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
