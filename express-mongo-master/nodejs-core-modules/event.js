const EventEmitter = require("node:events");

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on("ring", () => {
  console.log("Yahoo !! Class Over");
});

schoolBell.on("ring", () => {
  console.log("Opss ! Another class to attend");
});

schoolBell.on("broken", () => {
  console.log("Oh No ! Bell Broken");
});

schoolBell.emit("ring");
schoolBell.emit("broken");
