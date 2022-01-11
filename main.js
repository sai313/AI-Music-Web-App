song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song1 = loadSound("HarryPotter.mp3");
    song2 = loadSound("PeterPan.mp3");
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("model loaded");
}

function gotPoses(result) {
    if (result.length > 0) {
        console.log(result);
        scoreRightWrist = result[0].pose.keypoints[10].score;
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        rightWristX = result[0].pose.rightWrist.x;
        rightWristY = result[0].pose.rightWrist.y;
        leftWristX = result[0].pose.leftWrist.x;
        leftWristY = result[0].pose.leftWrist.y;
    }
}

function draw() {
    image(video,0,0,500,500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if (song1Status == false) {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing Harry Potter song...";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX.leftWristY,20);
        song1.stop();
        if (song2Status == false) {
            song2.play()
            document.getElementById("song_name").innerHTML = "Playing Peter Pan song...";
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}