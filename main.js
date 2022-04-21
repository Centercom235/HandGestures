prediction1="";

Webcam.set({
    width:350,

    height:300,

    image_format:"png",

    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src='"+data_uri+"'>";
    });
}

console.log("ml5 version: ", ml5.version); 
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/8NAfgDH0A/model.json",modelLoaded);

function modelLoaded(){
    console.log("model has been loaded");
}

function speak(){
    synth=window.speechSynthesis;
    speak_data1=toSpeak;
    utterThis=new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    prediction1=results[0].label;
    toSpeak="";
    

    if(prediction1=="Amazing"){
        toSpeak="Your food is AWESOME!";
        document.getElementById("update_emoji").innerHTML="&#128076;";

    }
    if(prediction1=="Best"){
        toSpeak="Good Luck!";
        document.getElementById("update_emoji").innerHTML="&#128077;";

    }
    if(prediction1=="Victory"){
        toSpeak="You WON!";
        document.getElementById("update_emoji").innerHTML="&#9996;";

    }
    

    speak();
}
}
