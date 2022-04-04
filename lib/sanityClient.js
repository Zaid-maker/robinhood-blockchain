import sanityClient from "@sanity/client";
require("dotenv").config();

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "v1",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});
