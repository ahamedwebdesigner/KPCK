## get all customer count

let  Customercount = await new  Customer().count();
    console.log("NO of customers: "+Customercount)


## getting all customers


     try {
    

    let  allData = await Customer.collection().fetch();
    // let  allData = await new  Customer().fetchAll();
    // let  allData = await new  Customer().fetch();  // get single modle
    allData.forEach(e=>console.log(e.get('customerName')));

//  console.log(allData.toJSON())
  } catch (error) {
    console.log('---------------error-----------------')
    console.log(error)
    console.log('---------------error-----------------')
  }