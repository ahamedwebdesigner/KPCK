# Topics : HTML CSS JS
 
> #  CC Q1: writh JScode to make heading text change red color on clicking button 

- add click event to the button and in event listner function
    - select hl element and using style property change  styles

<pre>
    document.getElementById('button').addEventListener('click',(e)=>{
        document.querySelector("h1").style.color = "red";
        document.querySelector("h1").style.backgroundColor  = "#efefef";
    });
</pre>

- using cssText property we can add multiple styles at a time

<pre>
    document.getElementById('button').addEventListener('click',(e)=>{
        document.querySelector('h1').style.cssText = "background:red; color:#fff";
    });
</pre>

