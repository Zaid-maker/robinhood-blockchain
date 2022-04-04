import { client } from "../../lib/sanityClient";

const createUser = async (req, res) => {
  try {
    const userDoc = {
      _type: "users",
      _id: req.body.walletAddress,
      userName: "Unnamed",
      address: req.body.walletAddress,
    };
  } catch (err) {
    res.status(500).send({
      message: "Error creating user",
      data: err.message,
    });
  }
};
