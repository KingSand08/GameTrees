import { isValidEmail } from "@/app/utils/validateEmailStr";
// import { redirect } from "next/navigation";
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
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    refs: {
        nameRef: React.RefObject<HTMLInputElement>;
        usernameRef: React.RefObject<HTMLInputElement>;
        emailRef: React.RefObject<HTMLInputElement>;
        birthDayRef: React.RefObject<HTMLInputElement>;
        phoneNumRef: React.RefObject<HTMLInputElement>;
    }
): void => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Reset the Error message
    setErrorMessage("");

    if (name.trim() === "") {
        alert("Name field cannot be empty!");
        setNameValidity(false);
        setErrorMessage("Name field cannot be empty!");
        refs.nameRef.current?.focus();
        return;
    }

    if (username.trim() === "") {
        alert("Username field cannot be empty!");
        setUsernameValidity(false);
        setErrorMessage("Username field cannot be empty!");
        refs.usernameRef.current?.focus();
        return;
    }

    if (email.trim() === "") {
        alert("Email field cannot be empty!");
        setEmailValidity(false);
        setErrorMessage("Email field cannot be empty!");
        refs.emailRef.current?.focus();
        return;

    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address!");
        setEmailValidity(false);
        setErrorMessage("Email field is invalid!");
        refs.emailRef.current?.focus();
        return;
    }

    if (birthDay.trim() === "") {
        alert("Birth Day field cannot be empty!");
        setBirthDayValidity(false);
        setErrorMessage("Birthday field cannot be empty!");
        refs.birthDayRef.current?.focus();
        return;
    }

    if (phoneNum.trim() === "") {
        alert("Phone Number field cannot be empty!");
        setErrorMessage("Phone Number field cannot be empty!");
        setPhoneNumValidity(false);
        refs.phoneNumRef.current?.focus();
        return;
    }

    alert(`Added the user ${username}, ${name}, ${email}, ${birthDay}, ${phoneNum}`);
    console.log("Form submitted with:", username, name, email, birthDay, phoneNum);
    setNameValidity(true);
    setUsernameValidity(true);
    setEmailValidity(true);
    setBirthDayValidity(true);
    setPhoneNumValidity(true);

    // Submit to DB
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, birthDay, phoneNum }),
    })
};
