# displaying  mongodata  

> ### route
<pre>

router.get("/", async (req, res) => {
 
        //----------------------------------------
        //GBEMS :inventory
        let mungourl = 'mongodb+srv://kdpvk_db_user:mOtWSRqQsrsc3dLI@kpvk.npdza.mongodb.net/KDPVK?retryWrites=true&w=majority';
        try {
                let mClient =  await MongoClient.connect(mungourl,{useNewUrlParser: true, useUnifiedTopology: true}); // 1) MongoClient
                const db = mClient.db("GBEMS");    //Db
                const result = await db.collection("emp").find({d}).toArray(); // grater thna 
                 res.render('mongo',{userData:result})
           
            } catch (error) {
                console.log('----------ERROR: -----------');
                          console.log(JSON.parse(JSON.stringify(error)))
                          console.log(error)
                console.log('----------#ERROR: -----------');

                res.status(500).send(error); 
          
             }
        //---------------------------------------- res.sendStatus
 });//#end get

</pre>

### 

```
    <!DOCTYPE html>
<html>
  <head>
    <title>working with mongos</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body >



<div class="container-fluid">
    <div class="row">
        <div class="col-sm-12">
            <div id="tablecontainer"></div>
        </div>
    </div>
</div>

   
<!-- footer.ejs -->

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/json2html/2.1.0/json2html.min.js"></script>

** <script src="/javascripts/jsontohtml.js"></script> ** 
<script type="text/javascript">


    window.addEventListener('load', function(){
        var userData = '<%- JSON.stringify(userData) %>' ;
        let userdat = JSON.parse(userData);
        //   console.log(userdat);
        document.querySelector("#tablecontainer").appendChild(buildHtmlTable(userdat,'table'))

});
</script>


</body>
</html>

```

# jsontohtml.js convert json to html 


<pre>

var _table_ = document.createElement('table'),
_tr_ = document.createElement('tr'),
_th_ = document.createElement('th'),
_td_ = document.createElement('td');

// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(arr,tableClass) {
var table = _table_.cloneNode(false)
table.classList.add(tableClass);
  var columns = addAllColumnHeaders(arr, table);
for (var i = 0, maxi = arr.length; i < maxi; ++i) {
  var tr = _tr_.cloneNode(false);
  for (var j = 0, maxj = columns.length; j < maxj; ++j) {
    var td = _td_.cloneNode(false);
    cellValue = arr[i][columns[j]];
    if( typeof cellValue ==='object'){
      td.appendChild(document.createTextNode(JSON.stringify(arr[i][columns[j]]) || ''));
    }else{
      td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
    }
 
    
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders(arr, table) {
var columnSet = [],
  tr = _tr_.cloneNode(false);
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                columnSet.push(key);
                var th = _th_.cloneNode(false);
                th.appendChild(document.createTextNode(key));
                tr.appendChild(th);
            }
        }
    }
table.appendChild(tr);
return columnSet;
}

</pre>