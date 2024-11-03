import { isValidEmail } from "@/app/utils/validation";
import { FormEvent } from "react";

export const SubmitLogin = (
    event: FormEvent<HTMLFormElement>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setValidity: React.Dispatch<React.SetStateAction<boolean>>,
    lastInputRef: React.RefObject<HTMLInputElement>
): void => {
    event.preventDefault();
    if (email.trim() === "") {
        alert("Email field cannot be empty!");
        lastInputRef.current?.focus();
        setValidity(false);
    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address!");
        setValidity(false);
        lastInputRef.current?.focus();
    } else {
        console.log("Form submitted with email:", email);
        setValidity(true);
    }
};