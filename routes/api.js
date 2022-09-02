const express = require('express');
const Ninja = require('../models/Ninja');

const router = express.Router();

/*
{
    "name": "Ryu",
    "rank": "red-belt",
    "available": true,
    "geometry": { "type": "Point", "coordinates": [-80, 25.791] }
}

{
    "name": "Yoshi",
    "rank": "black-belt",
    "available": true,
    "geometry": { "type": "Point", "coordinates": [-80.245, 25.391] }
}

{
    "name": "Crystal",
    "rank": "pink-belt",
    "available": true,
    "geometry": { "type": "Point", "coordinates": [-80.789, 25.701] }
}

{
    "name": "Mario",
    "rank": "blue-belt",
    "available": true,
    "geometry": { "type": "Point", "coordinates": [-82.589, 26.701] }
}

{
    "name": "Luigi",
    "rank": "pink-belt",
    "available": true,
    "geometry": { "type": "Point", "coordinates": [-81.1, 24.95] }
}

{
    "name": "Hitaki",
    "rank": "yellow-belt",
    "available": true,
    "geometry": { "type": "Point", "coordinates": [-79.789, 25.01] }
}
*/

// get list of the ninjas
router.get('/ninjas', (req, res, next) => {
 
    // this gives all the ninjas in the db

//     Ninja.find({}).then(ninjas => {
//     res.send(ninjas);
//    });

    // this gives only ninjas who nearby

    Ninja.aggregate().near({
        near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000, 
        spherical: true,
        distanceField: "distance"
  })
  .then(ninjas => {
    if (ninjas) {
      if (ninjas.length === 0)
        return res.send({
          message:
            "maxDistance is too small, or your query params {lng, lat} are incorrect (too big or too small)."
        });
      return res.send(ninjas);
    }
  })
  .catch(next);
});
    
    

// add a new ninja
router.post('/ninjas', (req, res, next) => {
    //console.log(req.body);

    Ninja.create(req.body)
        .then((ninja) => {
            res.send(ninja);
        })
        .catch(next);
});

// update a ninja 
router.put('/ninjas/:id', (req, res, next) => {
   Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
        Ninja.findOne({ _id: req.params.id }).then((ninja) => {
            res.send(ninja);
        });
    });
});

// delete a ninja
router.delete('/ninjas/:id', (req, res, next) => {

    Ninja.findByIdAndRemove({ _id: req.params.id })
        .then((ninja) => {
            res.send(ninja);
    });
});

module.exports = router;