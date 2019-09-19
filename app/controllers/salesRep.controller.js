
const config = require('../../config/database.config');
const SalesRep = require("../models/salesRep.model.js");

exports.add = (req,res) => {

    const salesRep = new SalesRep({           //const salesRep = new SalesRep(req.body)
        id       : req.body.id,
        userName : req.body.userName,
        fullName : req.body.fullName,
        nic      : req.body.nic,
        area     : req.body.area,
        address  : req.body.address,
        phoneNo  : req.body.phoneNo,
        email    : req.body.email

    });

    salesRep.save()                   
        .then(salesRep => {
            res.status(200).json({salesRep});
        })
        .catch(err => {
            res.status(400).send({message:err.message || 'Failed to add salesRep'});
        });
        
}


exports.update = (req,res)=>{

    SalesRep.findByIdAndUpdate(req.params.id ,{
                userName : req.body.userName,
                fullName : req.body.fullName,
                area     : req.body.area,
                address  : req.body.address,
                phoneNo  : req.body.phoneNo
    } ,{new :true})
        .then(salesRep => {
            if(salesRep){
                res.status(200).send("successfuly updated");  
            }
            else{
                res.status(400).send("cannot find salesRep with given id");
            }
        })
        .catch(err => {
            res.status(400).send("Error when updating salesRep data");
        });

}

// Remove salesREp from system
exports.delete = (req,res) => {

    SalesRep.findByIdAndRemove(req.params.id)
        .then(salesRep => {
            if(salesRep){

                salesRep.save()                   
                .then(salesRep => {
                    res.status(200).json({'salesRep' : 'salesRep deleted successfuly !'});
                })
                .catch(err => {
                    res.status(400).send('Failed to delete salesRep');
                });       
        }
        else{
            res.status(400).send("cannot find salesRep with given id");
        }
        })
        .catch(err => {
            res.status(400).send("Error when deleting data");
        });


}

//geting all salesrep data to table
exports.getAll = (req,res)=>{  

    SalesRep.find()
        .then(salesReps => {
            res.status(200).json(salesReps);
        })
        .catch(err => {
            res.status(400).send("Error loading salesReps data");
        });
       
}

//get one salesRep data by id
exports.getbyId = (req,res)=>{

    SalesRep.findById(req.params.id)
        .then(salesRep => {
            res.status(200).json(salesRep);
        })
        .catch(err => {
            res.status(400).send("Error loading salesRep data");
        });
}