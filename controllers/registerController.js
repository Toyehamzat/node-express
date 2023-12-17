const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username or password not provided" });
  // checking for duplicate username
  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate)
    return res.status(409).json({ message: "username already in use" }); // status code 409 means conflict
  try {
    //encrypt pwd
    const hashedPassword = await bcrypt.hash(pwd, 10);
    //store new user
    const NewUser = { username: user, password: hashedPassword };
    usersDB.setUsers([...usersDB.users, NewUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `new user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
