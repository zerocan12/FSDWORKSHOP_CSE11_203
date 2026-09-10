import express from "express";
const app = express();
// const port = 3000;

const userdata = [
  {
    id: 101,
    name: "cm",
    email: "cmrj88@gmail.com"
  },
  {}
];

const registerData = [];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to express server"
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
