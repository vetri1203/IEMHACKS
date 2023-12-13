import { JobPost } from "../model/JobPost.js";

export const AboutCompany = async (req, res) => {
  try {
    const { companyId } = req.body;

    try {
      const filter = await JobPost.find({ _id: companyId });
      if (filter) {
        res.send(filter);
      } else {
        res.send({ message: "Something went worng! 1" });
      }
    } catch (e) {
      res.send({ message: "Something went worng! 2", e });
    }
  } catch (e) {
    console.log(e);
  }
};
