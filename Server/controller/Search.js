import { JobPost } from "../model/JobPost.js";

export const search = async (req, res) => {
    try {
        const {
            JobName,
            Skills
        } = req.body;

        const Job = new RegExp(JobName, "i"); 
        const skill = new RegExp(Skills, "i"); 
        const filter = await JobPost.find({ JobName: Job  ,Skills:skill });

        if (filter.length > 0) {
            const response = {
                message: "Matching job posts found",
                matchingPosts: filter
            };
            res.send(response);
        } else {
            res.send({ message: "No matching job posts found" });
        }
    } catch (e) {
        res.send({ message: "An error occurred", error: e });
    }
}
