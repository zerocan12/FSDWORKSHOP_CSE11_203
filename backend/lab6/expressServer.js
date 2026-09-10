import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userdata = [
  {
    id: 101,
    name: "cm",
    email: "cmrj88@gmail.com"
  }
];

const registerData = [];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to express server"
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users data",
    data: userdata
  });
});

app.get("/registered", (req, res) => {
  res.status(200).json({
    message: "Registered users",
    data: registerData
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = userdata.find((item) => item.id === Number(id));

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json({
    message: "User fetched successfully",
    data: user
  });
});

app.post("/create", (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({
      message: "id, name, and email are required"
    });
  }

  const newUser = {
    id: Number(id),
    name,
    email
  };

  userdata.push(newUser);
  registerData.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    data: newUser
  });
});

app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = userdata.findIndex((user) => user.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  userdata[userIndex] = {
    id: Number(id),
    name: name || userdata[userIndex].name,
    email: email || userdata[userIndex].email
  };

  res.status(200).json({
    message: "User updated successfully",
    data: userdata[userIndex]
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
