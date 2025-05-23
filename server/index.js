const express = require("express");
const cors = require("cors");
const gameRoutes = require("./Routes/gameRoutes");

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (request,response) => {
    response.json({
        message: "Backend is working!"
    });
});

app.use("/api", gameRoutes);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}