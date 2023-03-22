exports.userBoard = (req, res) => {
  const email = req.email;
    res.status(200).json({ message: `Welcome ${email}!` });
    res.status(200).send("Authenticated");
  };