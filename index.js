const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/task');

const app = express();
const port = 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
	origin: ['https://localhost:3000', 'http://localhost:4000'],
	credentials: true,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));



mongoose.connect("mongodb+srv://admin123:admin123@b546.8yotent.mongodb.net/TodoList");
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

app.use("/tasks", taskRoutes);

if(require.main === module){
	app.listen(port, () => console.log(`Server running at port ${port}`));
}


module.exports = {app, mongoose};