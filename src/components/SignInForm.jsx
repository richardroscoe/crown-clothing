import {SignInContainer, ButtonsContainer} from "./SignInForm.styles.jsx";
import { useState } from "react";
import {
  signInWithGooglePopup,
  signInWithGoogleEmailAndPassword,
} from "../utils/firebase";

import FormInput from "./FormInput";
import Button, {BUTTON_TYPE_CLASSES} from "./Button";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMsg, setErrorMsg] = useState("");

  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const changeHandler = ({ target }) => {
    const { value, name } = target;
    setFormFields((p) => ({ ...p, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const { email, password } = formFields;

    try {
      await signInWithGoogleEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setErrorMsg("Wrong password for email");
          break;
        case "auth/user-not-found":
          setErrorMsg("No user with this email");
          break;
        default:
          setErrorMsg(error.message);
          break;
      }
    }
  };

  const loginWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitHandler}>
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
        <ButtonsContainer>
          <Button type="submit" onSubmit={onSubmitHandler}>
            Sign In
          </Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={loginWithGoogle}>
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
      {errorMsg && <div>{errorMsg}</div>}
    </SignInContainer>
  );
};

export default SignInForm;
