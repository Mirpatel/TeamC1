exports.userBoard = (req, res) => {
  const email = req.email;
    res.status(200).send(email);
  };