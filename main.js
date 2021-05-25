var prediction1 = "";
var prediction2 = "";

Webcam.set({
    width: 350,
    height: 270,
    image_format: 'png',
    png_quality: 90
})

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="' + data_uri + '"/>'
    })
}

console.log("The Current Ml5 Version is: ", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/AQictKFiL/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Is Loaded");
}

function speak() {
    synth = window.speechSynthesis;
    speak_data1 = "The First Prediction is " + prediction1;
    speak_data2 = "The Second Prediction is " + prediction2;
    utterThis = new SpeechSynthesisUtterance(speak_data1 + "and the" + speak_data2);
    synth.speak(utterThis);
}

function check() {
    var img = document.getElementById("capturedImg");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if (result[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522"
        }
        if (result[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532"
        }
        if (result[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548"
        }
        if (result[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522"
        }
        if (result[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532"
        }
        if (result[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548"
        }
    }
}