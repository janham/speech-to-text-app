let newPostRef = '';
let room = 'room1';

$.getJSON('firebase.json', (data) => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    let firebaseConfig = {
        apiKey: data['apiKey'],
        authDomain: data['authDomain'],
        projectId: data['projectId'],
        storageBucket: data['storageBucket'],
        messagingSenderId: data['messagingSenderId'],
        appId: data['appId'],
        measurementId: data['measurementId'],
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // firebaseへの処理
    newPostRef = firebase.database();

    const username = document.getElementById('username');
    const output = document.getElementById('output');

    

    function time() {
        let date = new Date();
        let hh = ("0" + date.getHours()).slice(-2);
        let min = ("0" + date.getMinutes()).slice(-2);
        let sec = ("0" + date.getSeconds()).slice(-2);
    
        let time = hh + ":" + min + ":" + sec;
        return time;
    }

    // newPostRef.ref(room).push({
    //     username: username.value,
    //     text: text.value,
    //     time: time()
    // });
    // text.value = "";
    

    // 音声認識処理
    const speech = new webkitSpeechRecognition();
    speech.lang = 'ja-JP';

    const join = document.getElementById('join');
    const content = document.getElementById('content');

    join.addEventListener('click', function() {
        room = document.getElementById('join-room').value;
        speech.start();
        text();
    });

    const endcall = document.getElementById('end-call');

    endcall.addEventListener('click', function(){
        location.reload();
    });

    speech.onresult = function(e) {
        speech.stop();
        if(e.results[0].isFinal){
            var autoText = e.results[0][0].transcript
            console.log(e);
            console.log(autoText);

            newPostRef.ref(room).push({
                username: username.value,
                text: autoText,
                time: time()
            })
        }
    }

    speech.onend = () => {
        speech.start();
    }
});

function text() {
    newPostRef.ref(room).on('child_added', function(data){
        const v = data.val();
        const k = data.key;
        let str = '';

        str += '<div id="' + k + '" class="msg_main">'
        str += '<div class="msg_left">';
        // str += '<div class=""><img src="img/icon_person.png" alt="" class="icon ' + v.username + '" width="30"></div>';
        str += '<div class="msg">';
        str += '<div class="name">' + v.username + '</div>';
        str += '<div class="text">' + v.text + '</div>';
        str += '</div>';
        str += '</div>';
        str += '<div class="msg_right">';
        str += '<div class="time">' + v.time + '</div>';
        str += '</div>';
        str += '</div>';

        output.innerHTML += str;
        $("#output").scrollTop( $("#output")[0].scrollHeight );
    });
}




