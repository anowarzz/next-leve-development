import app from "./app";

let server;
const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
  server = app.listen(PORT, () => {
    console.log(`Example app listening on port ${5000}`);
  });
};

bootstrap();
