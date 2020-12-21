const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const btn = document.getElementById('btn');
const content = document.getElementById('content');

btn.addEventListener('click', function() {
    speech.start();
});

speech.addEventListener('result', function(e) {
    console.log(e);

    const text = e.results[0][0].transcript;
    content.innerText = text;
})