const userController = {};

// create a user using 'POST' login not required
userController.post = (req, res) => {
  res.send("Mateen Mirani is here for you guys!");
};

export default userController;
