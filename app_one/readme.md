npm i nodemon cors express firebase


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDSjSZHNxJz3cAv3J9ztFYY8GaHQR1gDxU",
    authDomain: "app-one-trile.firebaseapp.com",
    projectId: "app-one-trile",
    storageBucket: "app-one-trile.appspot.com",
    messagingSenderId: "886124432482",
    appId: "1:886124432482:web:fc0ea65d917d90f2bfd53b",
    measurementId: "G-YPSD3CW0YC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>


SET DEBUG=app-one:* & npm start


npm outdated
