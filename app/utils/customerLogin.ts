import { isValidEmail } from "@/app/utils/validation";
import { FormEvent } from "react";

export const SubmitLogin = (
    event: FormEvent<HTMLFormElement>,
    email: string,
    setValidity: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    lastInputRef: React.RefObject<HTMLInputElement | null>
): void => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Reset the Error message
    setErrorMessage("");

    if (email.trim() === "") {
        alert("Email field cannot be empty!");
        lastInputRef.current?.focus();
        setValidity(false);
        setErrorMessage("Email field cannot be empty!");
    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address!");
        setValidity(false);
        setErrorMessage("Email field is invalid!");
        lastInputRef.current?.focus();
    } else {
        alert(`Added the user ${email}`);
        console.log("Form submitted with email:", email);
        setValidity(true);
    }
};