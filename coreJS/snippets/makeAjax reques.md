# syntax

    httpRequest = new XMLHttpRequest()
    httpRequest.open('GET', 'http://www.example.org/some.file')
    httpRequest.send()

   ## Simple POST request

    httpRequest = new XMLHttpRequest()
    httpRequest.open('POST', 'http://www.example.org/some/endpoint')
    httpRequest.send('some data')



# Example:  Make Ajax request with vJS
   
    <script type="text/javascript">
    function loadXMLDoc() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
            if (xmlhttp.status == 200) {
                document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
            }
            else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            }
            else {
                alert('something else other than 200 was returned');
            }
            }
        };

        xmlhttp.open("GET", "ajax_info.txt", true);
        xmlhttp.send();
    }
    </script>


# With jQuery:

    $.ajax({
        url: "test.html",
        context: document.body,
        success: function(){
        $(this).addClass("done");
        }
    });

## Example 1 :


    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


