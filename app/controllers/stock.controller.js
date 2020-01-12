const mongoose = require('mongoose');
var Schema = mongoose.Schema;
Stock=mongoose.model('stocks', new Schema(), 'stocks');

exports.getStock=(req,res)=>{
    var sp = req.body.salesRep;
    var df=new Date(req.body.dateFrom);  
    var dt=new Date(req.body.dateTo);  
    df.setUTCHours(0,0,0,0);
    dt.setUTCHours(24,0,0,0); 
    if(sp==="All"){
        Stock.aggregate([        
            { $match: { dateandtime :{
                $gte: new Date(df),
                $lt: new Date(dt)
            }
        }, 
    },]).then(rep=> {
                res.status(200).json(rep)
          })
          .catch(err => 
            {
                res.status(400).json(err);
              
    
          })
    }
    else{
        Stock.aggregate([        
            { $match: { dateandtime :{
                $gte: new Date(df),
                $lt: new Date(dt)
            },repname :{
                $eq: sp
            },
        }, 
    },
           ]).then(rep=> {
                res.status(200).json(rep)
          })
          .catch(err => 
            {
                res.status(400).json(err);
              
    
          })
    }
           
    
  
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