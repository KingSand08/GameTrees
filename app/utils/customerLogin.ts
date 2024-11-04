import { isValidEmail } from "@/app/utils/validateEmailStr";
import { FormEvent } from "react";

export const SubmitLogin = (
    event: FormEvent<HTMLFormElement>,
    email: string,
    setValidity: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    lastInputRef: React.RefObject<HTMLInputElement>
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
        return;
    } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address!");
        setValidity(false);
        setErrorMessage("Email field is invalid!");
        lastInputRef.current?.focus();
        return;
    }


    alert(`Correct login ${email}`);
    console.log("Form submitted with email:", email);
    setValidity(true);

    // Make API request to send MagicLink
    fetch('/api/auth/magiclink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to send magic link");
            }
            return response.json();
        })
        .then(data => {
            setErrorMessage("Magic link sent! Check your email.");
            setValidity(true);
            console.log("Magic link sent:", data);
        })
        .catch(error => {
            console.error('Magic link error:', error);
            setErrorMessage("Could not send magic link. Try again.");
            setValidity(false);
        });
};