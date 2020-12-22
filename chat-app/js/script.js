let firebaseConfig = '';

$.getJSON('firebase.json', (data) => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    firebaseConfig = {
        apiKey: data['apiKey'],
        authDomain: data['authDomain'],
        projectId: data['projectId'],
        storageBucket: data['storageBucket'],
        messagingSenderId: data['messagingSenderId'],
        appId: data['appId'],
        measurementId: data['measurementId'],
    }
});

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// firebaseへの処理
const newPostRef = firebase.database();
let room = 'room1';

const send = document.getElementById('send');
const username = document.getElementById('username');
const text = document.getElementById('text');
const output = document.getElementById('output');

send.addEventListener('click', function() {
    newPostRef.ref(room).push({
        username: username.value,
        text: text.value
    });
    text.value = "";
});

newPostRef.ref(room).on('child_added', function(data){
    const v = data.val();
    const k = data.key;
    let str = '';

    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.text + '</div>';

    output.innerHTML += str;
});