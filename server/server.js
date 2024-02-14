const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

require("dotenv").config({ path: path.resolve(__dirname, "config.env") });


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
  
app.use('/api', require("./routes/auth"));
app.use('/api', require("./routes/sites"));
app.use('/api', require("./routes/portals"));
app.use('/api', require("./routes/prompts"));
app.use(require("./routes/live"));
// app.use(require("./routes/forms"));
// app.use(require("./routes/organizations"));
app.use('/api', require("./routes/customers"));
app.use('/api', require("./routes/payments"));
app.use(require("./routes/webhooks"));
app.use('/api', require("./routes/integrations"));

app.use('/static', express.static(path.join(__dirname, 'public'))); // Images on 'uploads' directory are visible


const buildPath = path.join(__dirname, './../client/build');
app.use(express.static(buildPath, { extensions: ['html', 'js', 'css'] }));


// Serve widget
const distPath = path.join(__dirname, './../client/dist');
app.use('/widget', express.static(distPath));


const dbURI = process.env.ATLAS_URI;

mongoose.connect(dbURI)
.then((res) => {
    // Production / development build
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
      
        app.get('*', (req, res) =>
          res.sendFile(
            path.resolve(__dirname, '../', 'client', 'build', 'index.html')
          )
        );
        console.log("Production server setup")
    }

    app.listen(process.env.PORT, () => {
        console.log(`Server is live at port ${process.env.PORT}`)
    })
})
.catch(err => console.log("Mongoose error"))