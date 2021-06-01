# working with promises and Ajax

## simple ajax call using javascript

     const XmlHttprequestObj = new XMLHttpRequest();
        XmlHttprequestObj.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                if (this.status == 200) {
                    console.log(XmlHttprequestObj.responseText);
                } else {
                    console.log("Error Occured");
                }
            }
        }
        XmlHttprequestObj.open("GET", '/ajax/getName', true);
        XmlHttprequestObj.send();
