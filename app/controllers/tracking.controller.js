exports.getMarkers=(req,res)=>{
    var sp = req.body.salesRep;
    var df=new Date(req.body.dateFrom);  
    var dt=new Date(req.body.dateTo);  
    df.setUTCHours(0,0,0,0);
    dt.setUTCHours(24,0,0,0); 
    if(sp==="All"){
        Invoice.aggregate([        
            { $match: { orderDate :{
                $gte: new Date(df),
                $lt: new Date(dt)
            }
        }, 
    },
            {"$project": 
            {orderId:"$Invoiceno",salesrep:"$salesrepName",customer:"$customerName",date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }, hour: { $hour: "$orderDate" },
            minutes: { $minute: "$orderDate" },lat:"$lat",lng:"$lng"}
        }]).then(rep=> {
                res.status(200).json(rep)
          })
          .catch(err => 
            {
                res.status(400).json(err);
              
    
          })
    }
    else{
        Invoice.aggregate([        
            { $match: { orderDate :{
                $gte: new Date(df),
                $lt: new Date(dt)
            },salesrepName :{
                $eq: sp
            },
        }, 
    },
            {"$project": 
            {orderId:"$Invoiceno",salesrep:"$salesrepName",customer:"$customerName",date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } }, hour: { $hour: "$orderDate" },
            minutes: { $minute: "$orderDate" },lat:"$lat",lng:"$lng"}
        }]).then(rep=> {
                res.status(200).json(rep)
          })
          .catch(err => 
            {
                res.status(400).json(err);
              
    
          })
    }
           
    
  
}