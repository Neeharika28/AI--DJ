song = "";
Lx = 0;
Ly = 0;
Rx = 0;
Ry = 0;
score_l = 0;
score_r = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(500, 450);
    canvas.position(350, 150);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is intialized");
}

function start() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function draw() {
    image(video, 0, 0, 700, 450);
    fill("#5bc0de");
    stroke("#5bc0de");
    if (score_l > 0.2) {
        circle(Lx, Ly, 20);
        InNumberLy = Number(Ly);
        remove_decimals = floor(InNumberLy);
        Lx_1000 = remove_decimals / 1000;
        volume = Lx_1000 * 2;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);


    }
    
        if(score_r > 0.2){
        circle(Rx,Ry,20);
        if(Ry > 0 && Ry <= 100){
            document.getElementById("sp").innerHTML = "Song Speed = 0.5x"
            song.rate(0.5);
        }
        if(Ry > 100 && Ry <= 200){
            document.getElementById("sp").innerHTML = "Song Speed = 1x"
            song.rate(1);
        }
        if(Ry > 200 && Ry <= 300){
            document.getElementById("sp").innerHTML = "Song Speed = 1.5x"
            song.rate(1.5);
        }
        if(Ry > 300 && Ry <= 400){
            document.getElementById("sp").innerHTML = "Song Speed = 2x"
            song.rate(2);
        }
        if(Ry > 400 && Ry <= 500){
            document.getElementById("sp").innerHTML = "Song Speed = 2.5x"
            song.rate(2.5);
        }
    }
    
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_r = results[0].pose.keypoints[10].score;
        score_l = results[0].pose.keypoints[9].score;
        console.log("Score Left = " + score_l + "Score Right "+ score_r);
        Lx = results[0].pose.leftWrist.x;
        Ly = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + Lx + " Left Wrist X " + Ly);
        Rx = results[0].pose.rightWrist.x;
        Ry = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + Rx + " Right Wrist X " + Ry);
    }
}