const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require("dotenv").config({ path: "./config.env" });


const app = express();

app.use(cors());
app.use(morgan('dev'));

// bodyparser middleware
// const urlencodedParser = bodyParser.urlencoded({extended: false})
// app.use(bodyParser.json(), urlencodedParser)
app.use(express.urlencoded());
app.use(
    express.json({
      // We need the raw body to verify webhook signatures.
      // Let's compute it only when hitting the Stripe webhook endpoint.
      verify: function (req, res, buf) {
        if (req.originalUrl.startsWith("/webhook")) {
          req.rawBody = buf.toString();
        }
      },
    })
);
  
app.use(require("./routes/auth"));
app.use(require("./routes/forms"));
app.use(require("./routes/organizations"));
app.use(require("./routes/customers"));
app.use(require("./routes/payments"));


app.use('/static', express.static('public')); // Images on 'uploads' directory are visible

const buildPath = path.join(__dirname, './../client/build');

app.use(express.static(buildPath, { extensions: ['html', 'js', 'css'] }));



const dbURI = process.env.ATLAS_URI;

mongoose.connect(dbURI)
.then((res) => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is live at port ${process.env.PORT}`)
    })
})
.catch(err => console.log("Mongoose error"))