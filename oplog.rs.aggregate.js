// displays the namespaces where the highest document insert volume (by bsonsize) occurred 

const myresult = [];  
db.getSiblingDB("local")  
  .getCollection("oplog.rs")  
  .aggregate([  
    { $match: { op: { $in: ["i"] } } },  
    { $addFields: { mySize: { $bsonSize: "$$ROOT" } } },  
    { $group: { _id: { coll: "$ns", type: "$op" }, mysize: { $sum: "$mySize" } } },  
    { $sort: { mysize: -1 } },
    {$limit: 20}
  ])  
  .forEach(doc => myresult.push(doc));  
console.table(myresult);  
