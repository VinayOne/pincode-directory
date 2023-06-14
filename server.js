const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const requestIp = require('request-ip');
const routes = require("./routes/routes");

const url = `mongodb+srv://vinayone:12Ekq1qw9Dh1G5J1@cluster0.5vd7f.mongodb.net/indian-pincodes?retryWrites=true&w=majority`;

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then( () => {
    app.use(express.json());
    app.use(cors());
    app.use(requestIp.mw());

		// app.use(express.static(path.join(__dirname, "dist", "pincode-directory")));

		app.use("/api", routes);

		// app.get('*', (req, res) => {
		//   res.sendFile(path.join(__dirname, "dist", "pincode-directory", "index.html"));
		// });

		const port = process.env.PORT || 3200;

		app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

// app.use(express.static(path.join(__dirname, 'dist/angular-starter/browser')));

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'dist/angular-starter/browser', 'index.html'));
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`)
// })

