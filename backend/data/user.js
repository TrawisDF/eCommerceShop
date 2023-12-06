import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
		isAdmin:true,
  },
	{
    name: "Jave",
    email: "jave@email.com",
    password: bcrypt.hashSync("123456", 10),
		isAdmin:false,
  },
	{
    name: "Jake",
    email: "jake@email.com",
    password: bcrypt.hashSync("123456", 10),
		isAdmin:false,
  },
];
export default users;
