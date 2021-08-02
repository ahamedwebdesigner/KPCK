


let Emp = bookshelf.model('Emp', {
  tableName: 'employees',
  offiece() {
    return this.belongsTo('Offiece','officeCode','officeCode');  //regester model , //Foreign key in this model // Column in the `Target` model's table which `foreignKey`

  }
});
  

let Offiece = bookshelf.model('Offiece', {
  tableName: 'offices',
  emp() {
    return this.hasMany('Emp')
  }
});





  try {
    let  allEMp = await new Emp({ employeeNumber: 1621}).fetch(
      {withRelated: ['offiece']}
    );
    console.log(allEMp.toJSON())
  } catch (error) {
      console.log(error);
}