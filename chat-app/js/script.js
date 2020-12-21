let firebaseConfig = '';

$.getJSON('firebase.json', (data) => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    firebaseConfig = {
        apiKey: data["apiKey"],
        authDomain: data["authDomain"],
        projectId: data["projectId"],
        storageBucket: data["storageBucket"],
        messagingSenderId: data["messagingSenderId"],
        appId: data["appId"],
        measurementId: data["measurementId"],
    }
});
    
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();