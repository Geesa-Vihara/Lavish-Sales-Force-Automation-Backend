const mongoose = require('mongoose');
var Schema = mongoose.Schema;
Stock=mongoose.model('stocks', new Schema(), 'stocks');

exports.getAll=(req,res)=>{
    Stock
        .find()
        .then(stock => {
            res.status(200).json(stock);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}

exports.getById=(req,res)=>{
    Stock
        .findById(req.params.id)
        .then(stock => {
            res.status(200).json(stock);
        })
        .catch(err => {
            res.status(400).json(err);
        }) 
}