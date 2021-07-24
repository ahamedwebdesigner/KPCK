var citiesRef = db.collection("cities");

citiesRef.doc("SF").set({
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"] });
citiesRef.doc("LA").set({
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"] });
citiesRef.doc("DC").set({
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"] });
citiesRef.doc("TOK").set({
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"] });
citiesRef.doc("BJ").set({
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"] });


# where condition
const stateQuery = citiesRef.where("state", "==", "CA");
const populationQuery = citiesRef.where("population", "<", 100000);
const nameQuery = citiesRef.where("name", ">=", "San Francisco");


# in operator
citiesRef.where('country', 'in', ["USA", "Japan", "China"])

# Compound equality queries
citiesRef.where("state", "==", "CO").where("name", "==", "Denver")

citiesRef.where("country", "==", "USA")
         .where("capital", "==", false)
         .where("state", "==", "CA")
         .where("population", "==", 860000)

admin.firestore
     .collection('users')
     .doc('uid')
     .collection('sub-collection')
     .limit(1)
     .get()
     .then(query => query.size);



# composite index 
 If you need to run a compound query that uses a range comparison (<, <=, >, or >=) 
 if you need to sort by a different field, you must create a composite index for that query.


 # query the regions array field:

citiesRef.where("regions", "array-contains", "west_coast")
// array-contains-any and array-contains use the same indexes
citiesRef.where("regions", "array-contains-any", ["west_coast", "east_coast"])


# Queries supported by composite indexes

citiesRef.where("country", "==", "USA").orderBy("population", "asc")
citiesRef.where("country", "==", "USA").where("population", "<", 3800000)
citiesRef.where("country", "==", "USA").where("population", ">", 690000)
// in and == clauses use the same index
citiesRef.where("country", "in", ["USA", "Japan", "China"])
         .where("population", ">", 690000)


 # Order by desending 



citiesRef.where("country", "==", "USA").orderBy("population", "desc")

citiesRef.where("country", "==", "USA")
         .where("population", "<", 3800000)
         .orderBy("population", "desc")

citiesRef.where("country", "==", "USA")
         .where("population", ">", 690000)
         .orderBy("population", "desc")

citiesRef.where("country", "in", ["USA", "Japan", "China"])
         .where("population", ">", 690000)
         .orderBy("population", "desc")

# composit indexing

You also need to create a composite index to combine an array-contains or array-contains-any query with additional clauses.

citiesRef.where("regions", "array-contains", "east_coast")
         .where("capital", "==", true)

// array-contains-any and array-contains use the same index
citiesRef.where("regions", "array-contains-any", ["west_coast", "east_coast"])
         .where("capital", "==", true)

# Queries supported by collection group indexes

var citiesRef = db.collection("cities");

citiesRef.doc("SF").collection("landmarks").doc().set({
    name: "Golden Gate Bridge",
    category : "bridge" });
citiesRef.doc("SF").collection("landmarks").doc().set({
    name: "Golden Gate Park",
    category : "park" });

citiesRef.doc("DC").collection("landmarks").doc().set({
    name: "National Gallery of Art",
    category : "museum" });
citiesRef.doc("DC").collection("landmarks").doc().set({
    name: "National Mall",
    category : "park" });


citiesRef.doc("SF").collection("landmarks").where("category", "==", "park")
citiesRef.doc("SF").collection("landmarks").where("category", "in", ["park", "museum"])  

## ndex enabled, you can query the landmarks collection group:

var landmarksGroupRef = db.collectionGroup("landmarks");

landmarksGroupRef.where("category", "==", "park")
landmarksGroupRef.where("category", "in", ["park", "museum"])





db.collection("restaurants").where("category", "==", "burgers")
                            .where("city", "==" "San Francisco")
                            .where("editors_pick", "==", true )
                            .orderBy("star_rating")

db.collection("restaurants").where("editors_pick", "==", true)
                            .orderBy("star_rating")