1.$in
[{ "_id": 1, "name": "Alice", "role": "admin" },
{ "_id": 2, "name": "Bob", "role": "manager" },
{ "_id": 3, "name": "Charlie", "role": "employee" },
{ "_id": 4, "name": "David", "role": "admin" }]

const roles = ["admin", "manager"];
const users = await User.aggregate([
  {$match: {role: { $in: roles }}} // Only include users with "admin" or "manager" roles
]);
// [{ "_id": 1, "name": "Alice", "role": "admin" },
// { "_id": 2, "name": "Bob", "role": "manager" },
// { "_id": 4, "name": "David", "role": "admin" }]

[{ "_id": 101, "name": "Laptop", "tags": ["electronics", "gadget"] },
{ "_id": 102, "name": "Vacuum Cleaner", "tags": ["home-appliance"] },
{ "_id": 103, "name": "Smartphone", "tags": ["electronics", "mobile"] }]

const tagsToFind = ["electronics", "mobile"];
const products = await Product.aggregate([
  {$match: { tags: { $in: tagsToFind }}} // Match products with at least one of these tags
]);
// [{ "_id": 101, "name": "Laptop", "tags": ["electronics", "gadget"] },
// { "_id": 103, "name": "Smartphone", "tags": ["electronics", "mobile"]}]
______________________________________________________________________
2.$or
[{ "_id": 1, "name": "Alice", "role": "admin" },
{ "_id": 2, "name": "Bob", "role": "manager" },
{ "_id": 3, "name": "Charlie", "role": "employee" },
{ "_id": 4, "name": "David", "role": "admin" }]

db.users.aggregate([
    { $match: { $or: [ { role: "admin" },{ _id: { $gt: 2 }}]}}
  ]);
//[{ "_id": 1, "name": "Alice", "role": "admin" },
//{ "_id": 3, "name": "Charlie", "role": "employee" },
//{ "_id": 4, "name": "David", "role": "admin" }]  
_____________________________________________________________________
3.$and
[{ "_id": 1, "name": "Alice", "role": "admin", "age": 30 },
{ "_id": 2, "name": "Bob", "role": "manager", "age": 35 },
{ "_id": 3, "name": "Charlie", "role": "employee", "age": 25 },
{ "_id": 4, "name": "David", "role": "admin", "age": 40 }]

db.users.aggregate([
    { $match: {$and: [{ role: "admin" },{ age: { $gt: 30 } }]}}
]);  
// [{ "_id": 4, "name": "David", "role": "admin", "age": 40 }]
____________________________________________________________________
$and $or $in mix that three query pipeline
[
  { "_id": 1, "name": "Alice", "role": "admin", "age": 30 },
  { "_id": 2, "name": "Bob", "role": "editor", "age": 25 },
  { "_id": 3, "name": "Charlie", "role": "admin", "age": 35 },
  { "_id": 4, "name": "David", "role": "user", "age": 28 },
  { "_id": 5, "name": "Eve", "role": "user", "age": 32 }
]
db.users.aggregate([
  {
    $match: {
      $and: [
        { role: { $in: ["admin", "editor"] } },  // Role must be "admin" or "editor"
        { age: { $in: [30, 35] } }  // Age must be 30 or 35
      ]
    }
  }
// ]);
// [{ "_id": 1, "name": "Alice", "role": "admin", "age": 30 },
// { "_id": 3, "name": "Charlie", "role": "admin", "age": 35 }]

  

______________________________________________________
4.$expr   (compare thwe documends inside fields)
!,[{ "_id": 1, "totalPrice": 500, "discountedPrice": 450 },
  { "_id": 2, "totalPrice": 1000, "discountedPrice": 1000 },
  { "_id": 3, "totalPrice": 750, "discountedPrice": 700 }]
const discountedOrders = await Order.aggregate([
  {
    $match: {
      $expr: { $lt: ["$discountedPrice", "$totalPrice"] } // discountedPrice < totalPrice
    }
  }
]);
// [{ "_id": 1, "totalPrice": 500, "discountedPrice": 450 },
// { "_id": 3, "totalPrice": 750, "discountedPrice": 700 }]

!!,event starting age vita enting athigama erukanum?
{"_id": 1,"name": "Event 1","startDate": "2025-02-01T10:00:00Z","endDate": "2025-02-01T12:00:00Z"},
{"_id": 2,"name": "Event 2","startDate": "2025-02-01T10:00:00Z","endDate": "2025-02-01T09:00:00Z"}
 const events = await Event.aggregate([
      {
        $match: {
          $expr: { $gt: ["$endDate", "$startDate"] } // Compare endDate > startDate
        }
      }
    ]);  
// [ { "_id": 1,"name": "Event 1", "startDate": "2025-02-01T10:00:00Z", "endDate": "2025-02-01T12:00:00Z"}]

!!!,using $eq query which price and discountprice equal value only show?
{"_id": 1,"name": "Product 1","price": 100,"discountPrice": 100},
{"_id": 2,"name": "Product 2","price": 150,"discountPrice": 130}
const equalPriceProducts = await Product.aggregate([
    {
       $match: {
        $expr: { $eq: ["$price", "$discountPrice"] } // Compare price == discountPrice
      }
    }
    ]);
// [{ "_id": 1,"name": "Product 1","price": 100,"discountPrice": 100}]
____________________________________________________________
