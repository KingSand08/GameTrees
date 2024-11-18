import { NextApiRequest, NextApiResponse } from "next";

// Assign the handler function to a named variable
const handleAuthError = (req: NextApiRequest, res: NextApiResponse) => {
    const { error } = req.query;

    if (error === "NoAccount") {
        res.redirect("/signup");
    } else {
        res.redirect("/login");
    }
};

export default handleAuthError;
