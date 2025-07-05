import express from "express";
import mongoose from "mongoose";
import { DATA } from "./models/Schema.js";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/management");
app.use(express.static("public")); 

app.get('/generate', async (req, res) => {
  await DATA.deleteMany({}); 

  let fetchmany = [];

  let languages = ["Python", "C++", "JavaScript"];
  let cities = ["Mumbai", "Delhi", "Pune", "Hyderabad"];
  let names = ["Karan", "Aman", "Riya", "John", "Neha"];

  for (let i = 0; i < 10; i++) {
    let randomName = names[Math.floor(Math.random() * names.length)];
    let randomCity = cities[Math.floor(Math.random() * cities.length)];
    let randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    let randomSalary = Math.floor(Math.random() * 1000000) + 50000;
    let isManager = Math.random() > 0.5;

    fetchmany.push(new DATA({
      Name: randomName,
      City: randomCity,
      Language: randomLanguage,
      Salary: randomSalary,
      IsManager: isManager
    }));
  }

  await DATA.insertMany(fetchmany);
  res.send("10 Dummy Employees Generated!");
});

app.get('/', (req, res) => {
  res.send('Hello Coder!');
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
