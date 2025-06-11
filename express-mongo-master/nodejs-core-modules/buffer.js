const fs = require("fs");
// creating read stream
const readStream = fs.createReadStream("./hello-world.txt", {
  encoding: "utf-8",
});
// creating write stream
const writeStream = fs.createWriteStream("./hello.txt", { encoding: "utf-8" });

readStream.on("data", (chunk) => {
  console.log(chunk);

  writeStream.write(chunk, (err) => {
    if (err) {
      throw new Error("Error", err);
    }
  });
});

// readStream error catch
readStream.on("error", (err) => {
  if (err) {
    throw new Error("Error", err);
  }
});

// write stream error catch
writeStream.on("error", (err) => {
  if (err) {
    throw new Error("Error", err);
  }
});

// reading ends
readStream.on("end", () => {
  console.log("reading ended\n");
  writeStream.end();
});

writeStream.on("finish", () => {
  console.log("written succesfully");
});
