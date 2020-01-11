exports.yearlySales=(req,res)=>{
    var d = new Date(req.body.year);
    Invoice.aggregate([        
        {"$project": { 
            "year": {
             "$year": "$orderDate"
          },
          "month": {
            "$month": "$orderDate"
          },
          "tot":"$totalValue"
        
        }}, {
        "$match": {
          "year": new Date(d).getFullYear(),          
        }
      }, {$group : {
          _id :"$month",
          sum:{$sum:"$tot"}        

    }}
    ]).then(rep=> {
        res.status(200).json(rep)
      })
      .catch(err => 
        {
            res.status(400).json(err);
          

      })
}
