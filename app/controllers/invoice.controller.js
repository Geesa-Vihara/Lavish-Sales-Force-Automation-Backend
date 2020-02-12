const Invoice = require("../models/invoice.model");


exports.getAll=(req,res)=>{

    // var df=new Date(req.body.dateFrom);  
    // var dt=new Date(req.body.dateTo);  
    // df.setUTCHours(0,0,0,0);
    // dt.setUTCHours(24,0,0,0); 

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