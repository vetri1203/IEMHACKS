import { JobPost } from "../model/JobPost.js";

export const search = async (req, res) => {
  try {
    const { JobName } = req.body;

    if (!JobName) {
      const filter = await JobPost.find();
      const response = {
        message: "Matching job posts found",
        matchingPosts: filter,
      };
      res.send(response);
    } else {
      const Job = new RegExp(JobName, "i");
      const filter = await JobPost.find({ JobName: Job });
      if (filter.length > 0) {
        const response = {
          message: "Matching job posts found",
          matchingPosts: filter,
        };
        console.log(response.matchingPosts);
        res.send(response);
      } else {
        res.send({ message: "No matching job posts found" });
      }
    }
  } catch (e) {
    res.send({ message: "An error occurred", error: e });
  }
};
