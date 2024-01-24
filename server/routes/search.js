const express = require('express');
const requireAuth = require("../middleware/requireAuth");
const clientsController = require('../controllers/clients-controller')
const {Region} = require('../models/region');
const router = express.Router();

/*
    POST /customers
    GET /customers/:formId
*/

// https://mongoosejs.com/docs/api/aggregate.html#Aggregate.prototype.search()
// https://stackoverflow.com/questions/71933543/mongoose-search-returning-empty-array
// https://www.mongodb.com/docs/atlas/atlas-search/operators-and-collectors/

router.get("/search", async (req, res) => {
    const query = req.query.q;
    console.log(query)

    const results = await Region.aggregate().
        search({
            index: "searchRegions",
            text: {
              query: query,
              path: {
                wildcard: "*"
              }
            },
            scoreDetails: true
    })
    // .project(
    //     {
    //           "scoreDetails": {"$meta": "searchScoreDetails"}
    //         }
    // );
    console.log(results)
    res.json(results)
});



module.exports = router;