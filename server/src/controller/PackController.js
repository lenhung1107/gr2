
const Pack = require('../models/Pack');

class PackController {
    async getPack(req, res) {
        try {
            const packs = await Pack.find({});
            res.json(packs);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
}

module.exports = new PackController();