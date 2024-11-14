import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { error } = req.query;

    if (error === "NoAccount") {
        res.redirect("/signup");
    } else {
        res.redirect("/login");
    }
};
