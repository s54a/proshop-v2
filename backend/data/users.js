import brcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: brcrypt.hashSync("123456987", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: brcrypt.hashSync("123456987", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: brcrypt.hashSync("123456987", 10),
    isAdmin: false,
  },
];

export default users;
