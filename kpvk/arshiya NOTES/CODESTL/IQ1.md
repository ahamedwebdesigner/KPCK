# Topics : HTML CSS JS

> #  CC Q1: writh JScode to display array of element to html ordered list

```
    var arr1 = ['appele','bol','cat'];
    var unorderedList = document.createElement('ul');
    document.body.appendChild(unorderedList);
    for (var i=0; i<3; i++) {
      var listItem = document.createElement('li');
      listItem.appendChild(document.createTextNode(arr1[i]));
      unorderedList.appendChild(listItem);
    }
```
### using array forEach

```
var arr1 = ['appele','bol','cat'];
var unorderedList = document.createElement('ul');    //1) creating ul
arr1.forEach((element)=>{
  var listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(element));
  unorderedList.appendChild(listItem);
})
document.body.appendChild(unorderedList);

```

NOTE: the li element content can be created using createTextnode mentod
or simply using innerHTML

<pre>
var arr1 = ['appele','bol','cat'];
var unorderedList = document.createElement('ul');    //1) creating ul
arr1.forEach((element)=>{
   <b>
      var listItem = document.createElement('li');
      listItem.innerHTML =element;
  </b>
  unorderedList.appendChild(listItem);
})
</pre>