Why Use Curly Braces in MongoDB Pipelines?

1,Curly braces {} define key-value pairs.
Each stage in an aggregation pipeline is an object.
  
2,Pipeline Stages are Objects
Each stage in the pipeline starts with a stage operator (like $match, $group, $project, $sord) , followed by its options inside curly braces.

db.collection.aggregate([
  { $match: { status: "active" } },  // Stage 1: Filter documents (outer {} for stage, inner {} for filter)
  { 
    $group: {                        // Stage 2: Group documents
      _id: "$category",              // Grouping key
      total: { $sum: "$quantity" }   // Accumulator expression
    } 
  },
  { $sort: { total: -1 } }           // Stage 3: Sort results (outer {} for stage, inner {} for sorting options)
]);

 { $match: { status: "active" } }   // Outer curly braces define the $match stage.Inner curly braces define the filter condition: { status: "active" }.

  
  
1,$MATCH
The $match stage in MongoDB's aggregation framework is used to filter documents based on specified criteria.
It works similarly to the find() query but is used within an aggregation pipeline to filter data at specific stages.
// [{ "_id": 1, "name": "Alice", "age": 28, "status": "active", "city": "New York" },
//   { "_id": 2, "name": "Bob", "age": 34, "status": "inactive", "city": "Los Angeles" },
//   { "_id": 3, "name": "Charlie", "age": 22, "status": "active", "city": "Chicago" },
//   { "_id": 4, "name": "David", "age": 30, "status": "inactive", "city": "New York" },
//   { "_id": 5, "name": "Eve", "age": 25, "status": "active", "city": "New York" }]
!,db.users.aggregate([
  {
    $match: { status: "active" }
  }
])
// [{ "_id": 1, "name": "Alice", "age": 28, "status": "active", "city": "New York" },
//   { "_id": 3, "name": "Charlie", "age": 22, "status": "active", "city": "Chicago" },
//   { "_id": 5, "name": "Eve", "age": 25, "status": "active", "city": "New York" }]
!!,db.users.aggregate([
  {
    $match: { age: { $gt: 25 } }
  }
]);
// [{ "_id": 1, "name": "Alice", "age": 28, "status": "active", "city": "New York" },
//   { "_id": 2, "name": "Bob", "age": 34, "status": "inactive", "city": "Los Angeles" },
//   { "_id": 4, "name": "David", "age": 30, "status": "inactive", "city": "New York" }]
!!!,db.users.aggregate([
  {
    $match: { city: "New York", age: { $lte: 30 } }
  }
]);
// [{ "_id": 1, "name": "Alice", "age": 28, "status": "active", "city": "New York" },
//   { "_id": 5, "name": "Eve", "age": 25, "status": "active", "city": "New York" }]
!V,db.users.aggregate([   
  {    rentu la ethathu onnu match ana pothum 
    $match: {
      $or: [ { status: "inactive" }, { age: { $gt: 30 } } ]
    }
  }
]);
// [{ "_id": 2, "name": "Bob", "age": 34, "status": "inactive", "city": "Los Angeles" },
//   { "_id": 4, "name": "David", "age": 30, "status": "inactive", "city": "New York" }]

1.$in
// [{ "_id": 1, "name": "Alice", "role": "admin" },
// { "_id": 2, "name": "Bob", "role": "manager" },
// { "_id": 3, "name": "Charlie", "role": "employee" },
// { "_id": 4, "name": "David", "role": "admin" }]

const roles = ["admin", "manager"];
const users = await User.aggregate([
  {$match: {role: { $in: roles }}} // Only include users with "admin" or "manager" roles
]);
// [{ "_id": 1, "name": "Alice", "role": "admin" },
// { "_id": 2, "name": "Bob", "role": "manager" },
// { "_id": 4, "name": "David", "role": "admin" }]
___
// [{ "_id": 101, "name": "Laptop", "tags": ["electronics", "gadget"] },
// { "_id": 102, "name": "Vacuum Cleaner", "tags": ["home-appliance"] },
// { "_id": 103, "name": "Smartphone", "tags": ["electronics", "mobile"] }]
const tagsToFind = ["electronics", "mobile"];
const products = await Product.aggregate([
  {$match: { tags: { $in: tagsToFind }}} // Match products with at least one of these tags
]);
// [{ "_id": 101, "name": "Laptop", "tags": ["electronics", "gadget"] },
// { "_id": 103, "name": "Smartphone", "tags": ["electronics", "mobile"]}]

2.$or
// [{ "_id": 1, "name": "Alice", "role": "admin" },
// { "_id": 2, "name": "Bob", "role": "manager" },
// { "_id": 3, "name": "Charlie", "role": "employee" },
// { "_id": 4, "name": "David", "role": "admin" }]
db.users.aggregate([
    { $match: { $or: [ { role: "admin" },{ _id: { $gt: 2 }}]}}
  ]);
//[{ "_id": 1, "name": "Alice", "role": "admin" },
//{ "_id": 3, "name": "Charlie", "role": "employee" },
//{ "_id": 4, "name": "David", "role": "admin" }]  

3.$and
// [{ "_id": 1, "name": "Alice", "role": "admin", "age": 30 },
// { "_id": 2, "name": "Bob", "role": "manager", "age": 35 },
// { "_id": 3, "name": "Charlie", "role": "employee", "age": 25 },
// { "_id": 4, "name": "David", "role": "admin", "age": 40 }]
db.users.aggregate([
    { $match: {$and: [{ role: "admin" },{ age: { $gt: 30 } }]}}
]);  
// [{ "_id": 4, "name": "David", "role": "admin", "age": 40 }]

-------------------------------------------------------------
2,$COUNT
// [
//   { "_id": 1, "name": "Alice", "age": 28, "status": "active" },
//   { "_id": 2, "name": "Bob", "age": 34, "status": "inactive" },
//   { "_id": 3, "name": "Charlie", "age": 22, "status": "active" },
//   { "_id": 4, "name": "David", "age": 30, "status": "inactive" },
//   { "_id": 5, "name": "Eve", "age": 25, "status": "active" }
// ]
!,to count total number of user?
db.users.aggregate([
  { $count: "totalUsers" }
]);
// [{ "totalUsers": 5 }]
!!, Count Documents Matching a Condition
db.users.aggregate([
  { $match: { status: "active" } },
  { $count: "activeUsers" }
]);
// [ { "activeUsers": 3 }]
!!!, Count Documents with a Range Condition
db.users.aggregate([
  { $match: { age: { $gt: 25 } } },
  { $count: "usersAbove25" }
]);
// [ { "usersAbove25": 3 }]
----------------------------------------------------
3,$GROUP
// [
//   { "_id": 1, "name": "Alice", "age": 28, "status": "active" },
//   { "_id": 2, "name": "Bob", "age": 34, "status": "inactive" },
//   { "_id": 3, "name": "Charlie", "age": 22, "status": "active" },
//   { "_id": 4, "name": "David", "age": 30, "status": "inactive" },
//   { "_id": 5, "name": "Eve", "age": 25, "status": "active" }
// ]
!,Count the number of documents grouped by status:
  db.users.aggregate([
  {
    $group: {
      _id: "$status",  // Group by the "status" field
      count: { $sum: 1 }  // Count the number of documents in each group
    }
  }
]);
// [ { "_id": "active", "count": 3 },
//   { "_id": "inactive", "count": 2 }]
!!,Calculate the total age for each status:
db.users.aggregate([
  {
    $group: {
      _id: "$status",  // Group by "status"
      totalAge: { $sum: "$age" }  // Sum the "age" field
    }
  }
]);
// [ { "_id": "active", "totalAge": 75 },
//   { "_id": "inactive", "totalAge": 64 }]
!!!, Find Minimum and Maximum Values ,Find the youngest and oldest user for each status:
db.users.aggregate([
  {
    $group: {
      _id: "$status",  // Group by "status"
      youngest: { $min: "$age" },  // Minimum age
      oldest: { $max: "$age" }  // Maximum age
    }
  }
]);
// [ { "_id": "active", "youngest": 22, "oldest": 28 },
//   { "_id": "inactive", "youngest": 30, "oldest": 34 }]
!V, Create an Array of Field Values , Create an array of names for each status:
  db.users.aggregate([
  {
    $group: {
      _id: "$status",  // Group by "status"
      names: { $push: "$name" }  // Collect all "name" values into an array
    }
  }
]);
// [ { "_id": "active", "names": ["Alice", "Charlie", "Eve"] },
//   { "_id": "inactive", "names": ["Bob", "David"] }]
V. Get Unique Values,Create an array of unique ages for each status:
db.users.aggregate([
  {
    $group: {
      _id: "$status",  // Group by "status"
      uniqueAges: { $addToSet: "$age" }  // Collect unique "age" values
    }
  }
]);
// [ { "_id": "active", "uniqueAges": [28, 22, 25] },
//   { "_id": "inactive", "uniqueAges": [34, 30] }]
V!,
  db.users.aggregate([
  { $match: { status: "active" } }, // Filter active users
  { $group: { 
      _id: "$status", 
      avgAge: { $avg: "$age" },
      users: { $push: "$name" }
  } }
]);
// [{ "_id": "active", "avgAge": 25, "users": ["Alice", "Charlie", "Eve"] }]
----------------------------------------------
4,$SUM
// [
//   { "_id": 1, "product": "Laptop", "quantity": 2, "price": 1000, "category": "Electronics" },
//   { "_id": 2, "product": "Phone", "quantity": 5, "price": 500, "category": "Electronics" },
//   { "_id": 3, "product": "Tablet", "quantity": 3, "price": 300, "category": "Electronics" },
//   { "_id": 4, "product": "Chair", "quantity": 4, "price": 150, "category": "Furniture" },
//   { "_id": 5, "product": "Desk", "quantity": 1, "price": 200, "category": "Furniture" }
// ]
!,Total Quantity of All Products, To calculate the total quantity of all products:
db.sales.aggregate([
  {
    $group: {
      _id: null,  // Combine all documents into one group
      totalQuantity: { $sum: "$quantity" }  // Sum the "quantity" field
    }
  }
]);
// [{ "totalQuantity": 15 }]
!!,Total Sales Revenue for Each Category, To calculate the total revenue (quantity * price) for each category
db.sales.aggregate([
  {
    $group: {
      _id: "$category",  // Group by "category"
      totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }  // Multiply and sum
    }
  }
]);
// [ { "_id": "Electronics", "totalRevenue": 4600 },
//   { "_id": "Furniture", "totalRevenue": 800 }]
!!!, Count the Number of Products in Each Category,To count the total number of products in each category
db.sales.aggregate([
  {
    $group: {
      _id: "$category",  // Group by "category"
      productCount: { $sum: 1 }  // Sum 1 for each document in the group
    }
  }
]);
// [ { "_id": "Electronics", "productCount": 3 },
//   { "_id": "Furniture", "productCount": 2 }]
!V,Total Revenue Across All Products,To calculate the total revenue for all products:
db.sales.aggregate([
  {
    $group: {
      _id: null,  // Combine all documents into one group
      totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }  // Multiply and sum
    }
  }
]);
// [ { "totalRevenue": 5400 }]
V,Total Quantity Sold for Electronics Only,To calculate the total quantity sold for category: "Electronics":
db.sales.aggregate([
  {
    $match: { category: "Electronics" }  // Filter for Electronics category
  },
  {
    $group: {
      _id: "$category",  // Group by category
      totalQuantity: { $sum: "$quantity" }  // Sum the "quantity" field
    }
  }
])
// [ { "_id": "Electronics", "totalQuantity": 10 }]
------------------------------------------------------
5,$expr and $eq
  The $expr operator in MongoDB allows you to use aggregation expressions inside a query.
  This is useful when you need to compare fields within the same document or apply conditions that involve expressions.

  The $eq operator checks if two values are equal. It returns true if they are equal, 
  and false otherwise. When combined with $expr, it becomes a powerful tool for comparing fields,
  expressions, or constants.
  
!,// [ { "_id": 1, "name": "Phone", "price": 500, "discountedPrice": 500 },
//   { "_id": 2, "name": "Laptop", "price": 1200, "discountedPrice": 1000 },
//   { "_id": 3, "name": "Tablet", "price": 300, "discountedPrice": 300 }]
db.products.find({
  $expr: { $eq: ["$price", "$discountedPrice"] }
})
// [{ "_id": 1, "name": "Phone", "price": 500, "discountedPrice": 500 },
// { "_id": 3, "name": "Tablet", "price": 300, "discountedPrice": 300 }]
!!,find employees whose salary is greater than their bonus?
// [{ "_id": 1, "name": "Alice", "salary": 50000, "bonus": 5000 },
//   { "_id": 2, "name": "Bob", "salary": 40000, "bonus": 45000 },
//   { "_id": 3, "name": "Charlie", "salary": 60000, "bonus": 20000 }]
db.employees.find({
  $expr: {
    $gt: ["$salary", "$bonus"]
  }
})    
// [{ "_id": 1, "name": "Alice", "salary": 50000, "bonus": 5000 },
//   { "_id": 3, "name": "Charlie", "salary": 60000, "bonus": 20000 }]
!!!, Find Products Where sellingPrice is Greater Than costPrice
// [{ "_id": 1, "name": "Laptop", "costPrice": 800, "sellingPrice": 1000 },
//   { "_id": 2, "name": "Phone", "costPrice": 500, "sellingPrice": 450 },
//   { "_id": 3, "name": "Tablet", "costPrice": 300, "sellingPrice": 400 }]
db.products.find({
  $expr: {
    $gt: ["$sellingPrice", "$costPrice"]
  }
})
// [{ "_id": 1, "name": "Laptop", "costPrice": 800, "sellingPrice": 1000 },
//   { "_id": 3, "name": "Tablet", "costPrice": 300, "sellingPrice": 400 }]
!V,Find Orders Where totalAmount is Less Than discount
// [{ "_id": 1, "customer": "Alice", "totalAmount": 600, "discount": 100 },
//   { "_id": 2, "customer": "Bob", "totalAmount": 300, "discount": 400 },
//   { "_id": 3, "customer": "Charlie", "totalAmount": 500, "discount": 200 }]
db.orders.find({
  $expr: { $lt: ["$totalAmount", "$discount"] }
})
// [{ "_id": 2, "customer": "Bob", "totalAmount": 300, "discount": 400 }]

______________________________________________________________________
6,$project: Shape Output Documents
// Include only the name and salary fields while renaming salary to income.
// dp la erukura name namma usecase ku ethamathiri rename pannikalam
  db.employees.aggregate([
  { $project: { _id: 0, name: 1, income: "$salary" } }
])
!,quantity and price sa multiple panni total amount ah sollum
// [ { "_id": 1, "product": "A", "quantity": 10, "price": 5 },
//   { "_id": 2, "product": "B", "quantity": 5, "price": 20 },
//   { "_id": 3, "product": "C", "quantity": 8, "price": 15 }]

db.orders.aggregate([
  {
    $project: {
      product: 1,
      total: { $multiply: ["$quantity", "$price"] } // Calculate total for each order
    }
  }
])

// [ { "_id": 1, "product": "A", "total": 50 },
//   { "_id": 2, "product": "B", "total": 100 },
//   { "_id": 3, "product": "C", "total": 120 } ]
__________________________________________________________________
7,$unset is used for removing documents in dp totally
   const removedata=await reffer.updateOne(
      { refferancename:"siva"  }, // Find the user by their ID
      { $unset: { leveluser: "" } } // Remove the 'leveluser' field totally in documents
    )
 $set set method is used for leveluser data erunjuna atha emty stringa mathirum null kuta vaikalam 
  const removedata=await reffer.updateOne(
        { refferancename:"siva"  }, // Find the user by their ID
        { $set: { leveluser: "" } } // Remove the 'profilePicture' field
      )
__________________________________________________________________
8, $densify️ 
   When to Use $densify?
   Time-Series Data – Fill in missing dates.
   Numerical Sequences – Fill missing values in ordered data.
   Analytics & Reporting – Ensure continuous data for analysis.
   $densify fills in missing data points in a sequence.Works with dates and numbers.

!, Missing date 2024-01-02 is added but with null sales.
// [{ "date": ISODate("2024-01-01"), "sales": 100 },
//   { "date": ISODate("2024-01-03"), "sales": 200 }]
db.sales.aggregate([
  {
    $densify: {
      field: "date",
      range: {
        step: 1,        // Step interval (1 day)
        unit: "day",    // Time unit
        bounds: "full"  // Fills missing values across full range
      }
    }
  }
]);
// [ { "date": ISODate("2024-01-01"), "sales": 100 },
//   { "date": ISODate("2024-01-02") },  // New entry (sales missing)
//   { "date": ISODate("2024-01-03"), "sales": 200 }]
!!,Filling Missing Numeric Values ?  Numbers 2 and 3 are added with null values.
// [ { "x": 1, "value": 10 },
//   { "x": 4, "value": 40 }]
db.numbers.aggregate([
  {
    $densify: {
      field: "x",
      range: { step: 1, bounds: "full" }
    }
  }
]);
// [ { "x": 1, "value": 10 },
//   { "x": 2 },  // New entry with missing value
//   { "x": 3 },  // New entry with missing value
//   { "x": 4, "value": 40 }]
________________________________________________________________
9,exec()
Where Can You Use .exec()?
// find()	User.find({ age: 20 }).exec();
// findOne()	User.findOne({ username: "john" }).exec();
// updateOne()	User.updateOne({ _id: 1 }, { $set: { age: 25 } }).exec();
// deleteOne()	User.deleteOne({ username: "john" }).exec();
// aggregate()	User.aggregate([ { $match: { age: { $gte: 18 } } } ]).exec();

.exec() executes queries as a Promise instead of using callbacks.
Works with find(), findOne(), updateOne(), deleteOne(), aggregate(), etc.
Recommended when using async/await for cleaner and more readable code.


















-------------------------------------------------
2, how many category user select this category?
  
 db.orders.aggregate([
    {  $match: { Categoryis: "abc"  } },
    {  $count: "value" }
])
  
// value 3
--------------------------------------------------
3, price list la 50 ku mela erukura price only show akum
  // [ { "_id": 1, "name": "Laptop", "price": 1200 },
  // { "_id": 2, "name": "Smartphone", "price": 800 },
  // { "_id": 3, "name": "Headphones", "price": 100 },
  // { "_id": 4, "name": "Mouse", "price": 25 },
  // { "_id": 5, "name": "Keyboard", "price": 60 },
  // { "_id": 6, "name": "Monitor", "price": 200 },
  // { "_id": 7, "name": "Charger", "price": 50 }]
db.products.aggregate([
  { $match: { price: { $gt: 50 } } }, // Filter products with price > 50
  { $sort: { price: -1 } }           // Sort by price descending
])
// [{ "_id": 1, "name": "Laptop", "price": 1200 },
//   { "_id": 2, "name": "Smartphone", "price": 800 },
//   { "_id": 6, "name": "Monitor", "price": 200 },
//   { "_id": 3, "name": "Headphones", "price": 100 },
//   { "_id": 5, "name": "Keyboard", "price": 60 }]
----------------------------------------------------
4,How do you calculate the total sales and average sales in the same pipeline?
  // [{ "_id": 1, "product": "Laptop", "amount": 1200 },
  // { "_id": 2, "product": "Smartphone", "amount": 800 },
  // { "_id": 3, "product": "Headphones", "amount": 100 },
  // { "_id": 4, "product": "Mouse", "amount": 50 },
  // { "_id": 5, "product": "Keyboard", "amount": 150 }]
db.sales.aggregate([
  {
    $group: {
      _id: null,
      totalSales: { $sum: "$amount" },
      avgSales: { $avg: "$amount" }
    }
  }
])
// [{
//     "_id": null,
//     "totalSales": 2300,        // 1200 + 800 + 100 + 50 + 150
//     "avgSales": 460            // (2300 / 5)
// }]
----------------------------------------------------
5,$addFields
// [{  _id: 1, student: "Maya",  homework: [ 10, 5, 10 ], quiz: [ 10, 8 ], extraCredit: 0 },
//    {  _id: 2, student: "Ryan", homework: [ 5, 6, 5 ],  quiz: [ 8, 8 ],  extraCredit: 8 }]
db.scores.aggregate([
   {
     $addFields: {
       totalHomework: { $sum: "$homework" } ,
       totalQuiz: { $sum: "$quiz" }
     }
   },
   {
     $addFields: { totalScore:
       { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
   }
])
// [{ _id: 1,student: "Maya",  homework: [ 10, 5, 10 ], quiz: [ 10, 8 ], extraCredit: 0,
//   totalHomework: 25, totalQuiz: 18, totalScore: 43 },
//   {_id: 2, student: "Ryan", homework: [ 5, 6, 5 ],quiz: [ 8, 8 ],  extraCredit: 8,
//   totalHomework: 16, totalQuiz: 16,  totalScore: 40}]
-----------------------------------------------------
6, "$bucket" The $bucket stage is used to group documents into specified ranges (buckets) based on a field's value
1️⃣ How default Works
When a document’s groupBy field value does not match any range in boundaries, it will be placed into the default bucket.
If default is not specified, values that don't match any range are excluded from the results.
  
!,Age Group Categorization
// [{ "_id": 1, "name": "John", "age": 15 },
//   { "_id": 2, "name": "Mary", "age": 25 },
//   { "_id": 3, "name": "Alex", "age": 35 },
//   { "_id": 4, "name": "Kate", "age": 45 },
//   { "_id": 5, "name": "Emma", "age": 55 }]
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 20, 40, 60],
      default: "Other",
      output: {
        count: { $sum: 1 },
        users: { $push: "$name" }
      }
    }
  }
])
  
// [{ "_id": 0, "count": 1, "users": ["John"] },
//   { "_id": 20, "count": 2, "users": ["Mary", "Alex"] },
//   { "_id": 40, "count": 2, "users": ["Kate", "Emma"] }]
------------------------------------------------------
7,$facet
  // [ { "name": "Phone", "category": "Electronics", "price": 800 },
  // { "name": "Laptop", "category": "Electronics", "price": 1200 },
  // { "name": "Shirt", "category": "Fashion", "price": 50 },
  // { "name": "Shoes", "category": "Fashion", "price": 100 },
  // { "name": "Book", "category": "Education", "price": 20 }]
db.products.aggregate([
  {
    $facet: {
      priceStats: [
        { $group: { _id: null, maxPrice: { $max: "$price" }, minPrice: { $min: "$price" }, avgPrice: { $avg: "$price" } } }
      ],
      categoryCounts: [
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ],
      highPriceItems: [
        { $match: { price: { $gte: 100 } } },
        { $project: { name: 1, price: 1, _id: 0 } }
      ]
    }
  }
])

// {
//   "priceStats": [
//     { "maxPrice": 1200, "minPrice": 20, "avgPrice": 434 }
//   ],
//   "categoryCounts": [
//     { "_id": "Electronics", "count": 2 },
//     { "_id": "Fashion", "count": 2 },
//     { "_id": "Education", "count": 1 }
//   ],
//   "highPriceItems": [
//     { "name": "Phone", "price": 800 },
//     { "name": "Laptop", "price": 1200 },
//     { "name": "Shoes", "price": 100 }
//   ]
// }
------------------------------------------------------
8, collation() for case-insensitive search, sorting, and indexing.
  
  db.users.find({ name: "john" });
  Only matches "john", but not match "John", "JOHN", "jOhN".

  db.users.find({ name: "john" }).collation({ locale: "en", strength: 2 });
  Matches "john", "John", "JOHN", "jOhN".

  db.users.find().sort({ name: 1 });
  Default sorting (case-sensitive):
 [ { "name": "Alice" },{ "name": "Bob" },{ "name": "Zara" },{ "name": "alice" },{ "name": "bob" }]  // Lowercase appears after uppercas

  db.users.find().sort({ name: 1 }).collation({ locale: "en", strength: 2 });
  [ { "name": "Alice" },{ "name": "alice" },{ "name": "Bob" },{ "name": "bob" },{ "name": "Zara" }]

db.products.aggregate([
  { $match: { category: "electronics" } },
  { $sort: { name: 1 } },
  { $collation: { locale: "en", strength: 2 } }
]);
------------------------------------------------------
9,$sortByCount
// The $sortByCount stage in MongoDB's aggregation framework is a convenient way to group documents
// by a specific field or expression, count the number of documents in each group, and sort the groups
// in descending order by their count. It combines the functionality of $group and $sort into a single stage.

// [{ "name": "Phone", "category": "Electronics" },
//   { "name": "Laptop", "category": "Electronics" },
//   { "name": "Shirt", "category": "Fashion" },
//   { "name": "Shoes", "category": "Fashion" },
//   { "name": "Book", "category": "Education" }]
db.products.aggregate([
  { $sortByCount: "$category" }
])
// [ { "_id": "Electronics", "count": 2 },
//   { "_id": "Fashion", "count": 2 },
//   { "_id": "Education", "count": 1 } ]
---------------------------------------------------------
10,$sample
// sample pipeline is used to randomly select collection data
// [ { "name": "Phone", "price": 800 },
//   { "name": "Laptop", "price": 1200 },
//   { "name": "Tablet", "price": 400 },
//   { "name": "Monitor", "price": 300 },
//   { "name": "Keyboard", "price": 100 }]
db.products.aggregate([
  { $sample: { size: 2 } }
])
  
// [{ "name": "Tablet", "price": 400 },
//   { "name": "Laptop", "price": 1200 }]
--------------------------------------------------------
11,$year
// [{ "_id": 1, "orderDate": ISODate("2023-12-01T10:00:00Z") },
//   { "_id": 2, "orderDate": ISODate("2024-01-15T12:30:00Z") },
//   { "_id": 3, "orderDate": ISODate("2023-07-20T08:15:00Z") }]
db.orders.aggregate([
  {
    $project: {
      _id: 1,
      orderYear: { $year: "$orderDate" }
    }
  }
])

// [{ "_id": 1, "orderYear": 2023 },
//   { "_id": 2, "orderYear": 2024 },
//   { "_id": 3, "orderYear": 2023 }]
---------------------------------------------------------

---------------------------------------------------------




























// graphlookup
exports.graphlookup = async (req,res) =>{
  try {
    const siva=await reffer.aggregate([
      {
        $match: {
          "refferalid": new mongoose.Types.ObjectId(Onlineid)
        }
      },
        {      
          $graphLookup: {
            from: "refferalusers",
            startWith: "$refferalid",
            connectFromField: "downlines.childid",
            connectToField: "refferalid",
            as: "string"
          }
        },
        {
          $unwind: "$string"
        },
    ])
    let store=[]
    for (let i = 0; i < siva.length; i++) {
    store.push(siva[i].string.downlines)  
    }
    let a=store.flat().length
   
    if (a >=1 && a<=2) {
    const levelup=await reffer.updateOne({refferalid:Onlineid},{ $set: { leveluser: 1,rewart:10 } }) 
    return res.send({status:true,data:levelup,message:"level 1 complete"})  
    } else if (a >= 3&& a <= 9){
      const levelup=await reffer.updateOne({refferalid:Onlineid},{ $set: { leveluser: 2,rewart:20 } }) 
      return res.send({status:true,data:levelup,message:"level 2 complete"}) 
    } else {
      const levelup=await reffer.updateOne({refferalid:Onlineid},{ $set: { leveluser: 3,rewart:30 } }) 
      return res.send({status:true,data:levelup,message:"level 3 complete"})    
    }

  } catch (error) {
    res.send(error)
  }
}




