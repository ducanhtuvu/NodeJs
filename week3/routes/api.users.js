const User = require('../models/User');
const collection = 'users';

module.exports = router => {
    // GET (get all)
    router.get(`/${collection}`, (req, res) => {
        User.find({})
        .exec()
        .then((users) =>{
            res.sendRest(users);        
        })
        .catch((err)=>{
            res.sendRest(err);
        })
    });

    // POST (create)
    router.post(`/${collection}`, (req, res) => {

        User.create(req.body)
        .then((newUser) =>{
            res.sendRest(newUser);
        })
        .catch((err)=>{
            res.sendRest(err);
        })
    });

    // GET (get one)
    router.get(`/${collection}/:id`, (req, res) => {
        const id = req.params.id;
        User.findById(id)
        .exec()
        .then((user) =>{
            res.sendRest(user);        
        })
        .catch((err)=>{
            res.sendRest(err);
        })
    });

    // PATCH (update one)
    router.patch(`/${collection}/:id`, (req, res) => {
        const id = req.params.id;
        // update one document

        const updateBody = req.body;
        User.findByIdAndUpdate(id, updateBody, {runValidators: true})
        .exec()
        .then((user)=>{
            res.sendRest({...user.toObject() , ...updateBody});
        })
        .catch((err)=>{
            res.sendRest(err);
        })

    });

    // DELETE (delete one)
    router.delete(`/${collection}/:id`, (req, res) => {
        // delete one document
        const id = req.params.id;
        User.findByIdAndRemove(id)
        .exec()
        .then((user) =>{
            res.sendRest(user);        
        })
        .catch((err)=>{
            res.sendRest(err);
        })
    });
};
