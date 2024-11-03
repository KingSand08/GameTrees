// utils/customerSignup.ts
import { isValidEmail } from "@/app/utils/validation";
import { FormEvent } from "react";

export const SubmitSignup = (
    event: FormEvent<HTMLFormElement>,
    name: string,
    username: string,
    email: string,
    birthDay: string,
    phoneNum: string,
    setNameValidity: React.Dispatch<React.SetStateAction<boolean>>,
    setUsernameValidity: React.Dispatch<React.SetStateAction<boolean>>,
    setEmailValidity: React.Dispatch<React.SetStateAction<boolean>>,
    setBirthDayValidity: React.Dispatch<React.SetStateAction<boolean>>,
    setPhoneNumValidity: React.Dispatch<React.SetStateAction<boolean>>,
    refs: {
        nameRef: React.RefObject<HTMLInputElement>;
        usernameRef: React.RefObject<HTMLInputElement>;
        emailRef: React.RefObject<HTMLInputElement>;
        birthDayRef: React.RefObject<HTMLInputElement>;
        phoneNumRef: React.RefObject<HTMLInputElement>;
    }
): void => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate fields in order and focus on the first invalid one
    if (name.trim() === "") {
        alert("Name field cannot be empty!"); // Alert if empty
        refs.nameRef.current?.focus(); // Focus the name input
        setNameValidity(false);
        return;
    }

    if (username.trim() === "") {
        alert("Username field cannot be empty!"); // Alert if empty
        refs.usernameRef.current?.focus(); // Focus the username input
        setUsernameValidity(false);
        return;
    }

    if (email.trim() === "") {
        alert("Email field cannot be empty!"); // Alert if empty
        refs.emailRef.current?.focus(); // Focus the email input
        setEmailValidity(false);
        return;

    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address!"); // Alert for invalid email format
        setEmailValidity(false);
        refs.emailRef.current?.focus(); // Focus the email input
        return;
    }

    if (birthDay.trim() === "") {
        alert("Birth Day field cannot be empty!"); // Alert if empty
        refs.birthDayRef.current?.focus(); // Focus the birthday input
        setBirthDayValidity(false);
        return;
    }

    if (phoneNum.trim() === "") {
        alert("Phone Number field cannot be empty!"); // Alert if empty
        refs.phoneNumRef.current?.focus(); // Focus the phone number input
        setPhoneNumValidity(false);
        return;
    }

    console.log("Form submitted with:", username, name, email, birthDay, phoneNum);
    setNameValidity(true);
    setUsernameValidity(true);
    setEmailValidity(true);
    setBirthDayValidity(true);
    setPhoneNumValidity(true);
};
