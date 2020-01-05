exports.dailyOrders=(req,res)=>{
    var d = new Date();
    d.setUTCHours(0,0,0,0);
    var n = new Date();
    n.setUTCHours(24,0,0,0); 
    /* var d=new Date("2019-12-09T00:00:00.000Z");
    var n=new Date("2019-12-10T00:00:00.000Z");  */
    Invoice
        .find({ orderDate: 
            {
            $gte: new Date(d),
            $lt: new Date(n)
        }
    })
        .then(invoice => {
            res.status(200).json(invoice);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}
exports.topCustomer=(req,res)=>{
    var d = new Date();
    d.setUTCHours(0,0,0,0);
    var n = new Date();
    n.setUTCHours(24,0,0,0); 
    /* var d=new Date("2019-12-09T00:00:00.000Z");
    var n=new Date("2019-12-10T00:00:00.000Z");  */
    Invoice
        .find({ orderDate: 
            {
            $gte: new Date(d),
            $lt: new Date(n)
        }
    }).sort({totalValue:-1}).limit(1)
        .then(invoice => {
            res.status(200).json({invoice});
        })
        .catch(err => {
            res.status(400).json(err);
        })
}