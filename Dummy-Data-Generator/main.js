import express, { Router } from "express";
import mongoose from "mongoose";
import { DATA } from "./models/Schema.js";
const app = express()
const port = 3000
mongoose.connect("mongodb://localhost:27017/management");

app.get('/generate', async (req, res) => {
  try {
    await DATA.deleteMany({});

    const emp = ["Karan", "Aman", "Riya", "John", "Neha"];
    const cities = ["Mumbai", "Delhi", "Pune", "Hyderabad"];
    const languages = ["Python", "C++", "JavaScript"];

    let fetchdata = [];

    for (let i = 0; i < 10; i++) {

      const doc = new DATA({
        Name: emp[Math.floor(Math.random() * emp.length)],
        City: cities[Math.floor(Math.random() * cities.length)],
        Language: languages[Math.floor(Math.random() * languages.length)],
        Salary: Math.floor(Math.random() * 1000000) + 50000,
        IsManager: Math.random() > 0.5
      });

      fetchdata.push(doc);

    }
    await DATA.insertMany(fetchdata);

  } catch (error) {
    console.log(`Error: ${error}`)
    res.status(454).send("Data not generated...")
  }
  res.send('Generating 10 Dummy Data')
})

app.use(express.static("public"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
