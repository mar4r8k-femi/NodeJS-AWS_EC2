const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envPath)) {
  require('dotenv').config();
  console.log('.env file found and loaded');
} else {
  console.log('No .env file found, continuing without loading dotenv');
}

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/error");


// Connect to DB
connectDB();

// Express App
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/products", (req, res) => {
  return res.status(200).json({
    message: 'This is new feature change, a new route for products'
  })
});

// MongoDB connection
const client = new MongoClient(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get other database and collection
const database = client.db('sample_mflix');
const collection = database.collection('movies');

// Route to fetch data
app.get('/api/data', async (req, res) => {
    try {
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.use(errorHandler);

const server = app.listen(port, () =>
  console.log(`Server started listening on ${port}`)
);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});
