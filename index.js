import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import Contact from "./models/contact.js";
import mongoose from "mongoose";
import Checkout from "./models/checkout.js";
import Email from "./models/subscribes.js";

const app = express();

const port = 8000;
// Today i made some function
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
  await mongoose.connect(
    "mongodb+srv://Nasar_Ali:Password@nasarali.sjrfgg4.mongodb.net/ZeeshiContact"
  );
} catch (error) {
  console.log("MonogDb Connection Error", error);
}

app.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  console.log(name, email);
  const newContact = new Contact({
    name: name,
    email: email,
    subject: subject,
    message: message,
  });
  newContact.save().then(() => {
    console.log("User Created Successfully");
  });
});

app.post("/checkout", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const country = req.body.country;
  const city = req.body.city;
  const totalPrice = req.body.price;
  console.log(totalPrice);
  const newChecout = new Checkout({
    name: name,
    phone: phone,
    address: address,
    country: country,
    city: city,
    totalPrice: totalPrice,
  });
  newChecout.save().then(() => {
    console.log("User Created Successfully");
  });
});

app.post("/email", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  const existngEmail = await Email.findOne({ email: email });
  if (existngEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const newEmail = new Email({
    email: email,
  });
  newEmail.save();
  console.log("Email store");
  return res.status(200).json({ message: "Email stored successfully" });
});
app.listen(port, () => {
  console.log(`App is lesting on http://localhost:${port}`);
});
