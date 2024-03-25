import app from "./src/app.ts";

const PORT = 3001;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce with start ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit Server Express");
  });
});
