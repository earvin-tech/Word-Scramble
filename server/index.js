const express = require("express");
const cors = require("cors");

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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});