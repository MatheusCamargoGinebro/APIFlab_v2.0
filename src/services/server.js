const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
