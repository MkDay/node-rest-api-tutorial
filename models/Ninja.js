const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// geo location schema
const geoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

// ninja schema
const ninjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: geoSchema    
});

// ninjaSchema.statics.findByCoord = (coordinates, maxDistance) => {
//     return this.aggregate([{
//         $geoNear: {
//             near: { type: 'Point', coordinates: coordinates },
//             maxDistance: maxDistance,
//             spherical: true,
//             distanceField: 'dist.calculated'
//         }
//     }]);
// };

const Ninja = mongoose.model('ninja', ninjaSchema);


module.exports = Ninja;