import { client } from "../../lib/sanityClient";

const createUser = async (req, res) => {
  try {
    console.log("CREATING USER");
    const userDoc = {
      _type: "users",
      _id: req.body.walletAddress,
      userName: "Unnamed",
      address: req.body.walletAddress,
    };

    await client.createIfNotExists(userDoc);

    res.status(201).send({
      message: "User created",
    });
  } catch (err) {
    res.status(500).send({
      message: "Error creating user",
      data: err.message,
    });
  }
};

export default createUser;
