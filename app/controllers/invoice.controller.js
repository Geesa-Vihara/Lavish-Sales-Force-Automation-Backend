const Invoice = require("../models/invoice.model");


exports.getAll=(req,res)=>{

    Invoice
        .find()
        .then(invoices => {
            res.status(200).json(invoices);
        })
        .catch(err=>{
            res.status(400).json(err);
        });
}

exports.getbyId = (req,res)=>{
    Invoice
        .findById(req.params.id)
        .then(invoice =>{
            if(invoice){
                res.status(200).json(invoice);
            }
            else{
                res.status(400).send("cannot find invoice with given id");
            }
        })
        .catch(err=>{
            res.status(400).json(err);
        });
}