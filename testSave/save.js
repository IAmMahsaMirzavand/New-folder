
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors"
import mongoose from "mongoose";
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());


mongoose.connect('mongodb+srv://mahsacb74:ZkE5LPrl0bQ1DhBW@cluster0.5phbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


const fileSchema = new mongoose.Schema({
  name: String,
  data: String,
  contentType: String
});

const File = mongoose.model('File', fileSchema);


app.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadedFile = req.files.file;

  const base64Data = uploadedFile.data.toString('base64');

  const newFile = new File({
    name: uploadedFile.name,
    data: base64Data,
    contentType: uploadedFile.mimetype
  });

  try {
    await newFile.save();
    res.json({ base64Data: base64Data, contentType: uploadedFile.mimetype });
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = 3080;
app.listen(port, () => console.log(`Server star
ted on port ${port}`));