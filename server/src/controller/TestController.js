
const Test = require('../models/Test');

class TestController {
    async getAllTest(req, res) {
        try {
            const tests = await Test.find({});
            res.json(tests);
        } catch (err) {
            res.status(400).json({ error: 'error!' });
        }
    }
    async createTest(req, res){
        try{
            const newTest= new Test(req.body);
            await newTest.save();
            res.status(201).json({ message: 'Tạo loại xét nghiệm thành công', test: newTest });
        } catch(err){
            res.status(400).json({ message: 'Tạo loại xét nghiệm thất bại', error });
        }
    }
}

module.exports = new TestController();