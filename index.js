const permute = require("email-permutator");
const express = require("express");
const emailUsedIn = require("./helpers");
const app = express();

app.get("/emailPermutator", (req, res) => {
  console.log(req.query);
  const {
    firstName = "",
    lastName = "",
    nickName = "",
    middleName = "",
    domain1 = "",
    domain2 = "",
    domain3 = "",
  } = req.query;
  if (firstName === "" || lastName === "" || domain1 === "") {
    return res
      .status(400)
      .json({ error: "firstName, lastName and domain1 are required" });
  }
  const permutations = permute({
    firstName,
    lastName,
    nickName,
    middleName,
    domain1,
    domain2,
    domain3,
  });
  res.json(permutations);
});

app.get("/hasAccountsIn", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }
  res.json(await emailUsedIn(email));
});

app.listen(process.env.PORT || 4433, () => {
  console.log(
    `Server is running on port localhost:${process.env.PORT || 4433}`
  );
});
