const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Define MongoDB schema and model
const dataSchema = new mongoose.Schema({
    ts: {
      type: Date,
      required: true,
    },
    machine_status: {
      type: Number,
      required: true,
    },
    vibration: {
      type: Number,
      required: true,
    },
});

const SampleData = mongoose.model('SampleData', dataSchema);

// Route to fetch data
app.get('/', async (req, res) => {
  try {
    const data = await SampleData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/exam1",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => { 
    console.log("Connected to MongoDB successfully!");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})
.catch((err) => { console.log("Error connecting to MongoDB: ", err); });
