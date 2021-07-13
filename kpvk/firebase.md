 npm install --save firebase

npm i nodemon cors express firebase


Project Console: https://console.firebase.google.com/project/ngtech-0012/overview
Hosting URL: https://ngtech-0012.web.app



<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.7.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCChBGLxm7e8TpLzATlcftPiJUGGA7hK-Q",
    authDomain: "kdpvk-24195.firebaseapp.com",
    projectId: "kdpvk-24195",
    storageBucket: "kdpvk-24195.appspot.com",
    messagingSenderId: "438665628446",
    appId: "1:438665628446:web:95fd3eb2f29d725ea9d70f",
    measurementId: "G-FQZQM92CVK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>