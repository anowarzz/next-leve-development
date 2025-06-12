const path = require("path");
const fs = require("fs");

const inputArguments = process.argv.slice(2);
const text = inputArguments.join(" "); 

// creating a proper timestamp
const options = {
  year: "numeric",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

const now = new Date();
const readableTimeStamp = now.toLocaleString(undefined, options);

const message = `${text} ${readableTimeStamp}\n`;
console.log(text);

if (!message) {
  console.log("❌ Please provide some text to log.");
  console.log("Example : node index.js Hello World!");

  process.exit(1);
}

const filePath = path.join(__dirname, "log.txt");
fs.appendFile(filePath, message, { encoding: "utf-8" }, () => {
  console.log("Log added successfully");
});

// const now = new Date();
// const formattedDate = now.toLocaleDateString();
// const formattedTime = now.toLocaleTimeString();
// const readableTimeStamp = `${formattedDate} ${formattedTime}`;
