
const Doctor = require('../models/Doctor');

class DoctorDetailController {
    async getDoctor(req, res) {
        Doctor.findOne({id:req.params.id})
            .then(doctor =>{
                res.json(doctor);
            })
            .catch(next());
    }
}

module.exports = new DoctorDetailController();