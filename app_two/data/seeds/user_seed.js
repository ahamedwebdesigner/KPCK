
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {"id":1,"username":"mustaq","email":"mustaq@gmail.com","name":"mushy","age":32,"location":"Anantapur","role":"user"},
        {"id":2,"username":"arshiya","email":"arshiya@gmail.com","name":"arshiya","age":26,"location":"Kamalanager","role":"reguser"},
        {"id":3,"username":"blis","email":"blis@gmail.com","name":"blis","age":26,"location":"Rayadurgam","role":"user"},
        {"id":4,"username":"scott","email":"scott@gmail.com","name":"scott","age":27,"location":"Hyderabad","role":"reguser"}

      ]);
    });
};
