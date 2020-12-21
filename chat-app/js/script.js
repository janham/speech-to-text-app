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

// firebaseへの処理
const newPostRef = firebase.database();
let room = "room1";

newPostRef.ref(room).push({

});

newPostRef.ref(room).on("child_added", function(data){
    const v = data.val();
    const k = data.key;

});