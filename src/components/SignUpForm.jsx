import { useState } from "react";
import { SignUpContainer} from "./SignUpForm.styles.jsx";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase";

import FormInput from "./FormInput";
import Button from "./Button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMsg, setErrorMsg] = useState("");

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const changeHandler = ({ target }) => {
    const { value, name } = target;
    setFormFields((p) => ({ ...p, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) {
      setErrorMsg("Passwords must match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Connot create user, email already in use");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          value={displayName}
          name="displayName"
          required
          onChange={changeHandler}
        />

        <FormInput
          label="Email"
          type="email"
          value={email}
          name="email"
          autoComplete="username"
          required
          onChange={changeHandler}
        />

        <FormInput
          label="Password"
          type="password"
          value={password}
          name="password"
          autoComplete="new-password"
          required
          onChange={changeHandler}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          autoComplete="new-password"
          required
          onChange={changeHandler}
        />

        <Button type="submit" onSubmit={onSubmitHandler}>
          Register
        </Button>
      </form>
      {errorMsg && <div>{errorMsg}</div>}
    </SignUpContainer>
  );
};

export default SignUpForm;
