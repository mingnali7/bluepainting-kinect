/*
Choreography Class Final
by Mingna, Allie, Ning, Yuguang
 */

//toggle of mouse mode
let mouseMode = false;
let frame;
let blue;
let color;
let value;
let color2;
let stopdraw = true;

let x;
let y;
let c;
let size;

//----------------------------Kinectron Stuff-------------------
// Declare kinectron
let kinectron = null;

//visualization of joints
let vizHipLeft;
let vizTipRight;
let vizKneeRight;
let vizElbowLeft;

function preload() {
  //frame = loadImage('frame.png');
  blue = loadImage('blue.jpg')
  color = loadImage('color3.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //frameRate(30);
  background(0);
  noCursor();

  // imageMode(CENTER);


  // Define and create an instance of kinectron
  kinectron = new Kinectron("10.18.160.87");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

}

function draw() {
  //background(0)
  //image(frame, width / 2, height / 2, windowWidth, windowHeight);


  size = random(10, 50);



  //console.log(c);
  noStroke();
  if (stopdraw == false) {
    if (x && y) {
      y = map(y, 300, 600, 0, 600)
      if (mouseMode == false) {
        c = blue.get(x, y);
      }
      if (mouseMode == true) {
        c = color.get(x, y);
      }


      fill(c[0], c[1], c[2], random(10, 30));
      ellipse(x, y, random(10, 80), random(10, 80));
      console.log(x, y)
    }
  }

}


function bodyTracked(body) {

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  let head = scaleJoint(body.joints[kinectron.HEAD]);
  let neck = scaleJoint(body.joints[kinectron.NECK]);
  let spineShoulder = scaleJoint(body.joints[kinectron.SPINESHOULDER]);
  let spineMid = scaleJoint(body.joints[kinectron.SPINEMID]);
  let spineBase = scaleJoint(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  let shoulderRight = scaleJoint(body.joints[kinectron.SHOULDERRIGHT]);
  let elbowRight = scaleJoint(body.joints[kinectron.ELBOWRIGHT]);
  let wristRight = scaleJoint(body.joints[kinectron.WRISTRIGHT]);
  let handRight = scaleJoint(body.joints[kinectron.HANDRIGHT]);
  let handTipRight = scaleJoint(body.joints[kinectron.HANDTIPRIGHT]);
  let thumbRight = scaleJoint(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  let shoulderLeft = scaleJoint(body.joints[kinectron.SHOULDERLEFT]);
  let elbowLeft = scaleJoint(body.joints[kinectron.ELBOWLEFT]);
  let wristLeft = scaleJoint(body.joints[kinectron.WRISTLEFT]);
  let handLeft = scaleJoint(body.joints[kinectron.HANDLEFT]);
  let handTipLeft = scaleJoint(body.joints[kinectron.HANDTIPLEFT]);
  let thumbLeft = scaleJoint(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  let hipRight = scaleJoint(body.joints[kinectron.HIPRIGHT]);
  let kneeRight = scaleJoint(body.joints[kinectron.KNEERIGHT]);
  let ankleRight = scaleJoint(body.joints[kinectron.ANKLERIGHT]);
  let footRight = scaleJoint(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  let hipLeft = scaleJoint(body.joints[kinectron.HIPLEFT]);
  let kneeLeft = scaleJoint(body.joints[kinectron.KNEELEFT]);
  let ankleLeft = scaleJoint(body.joints[kinectron.ANKLELEFT]);
  let footLeft = scaleJoint(body.joints[kinectron.FOOTLEFT]);

  // Pick 2 joints to connect
  let start = handTipRight;
  let end = hipLeft;
  hipLeftHandTipRightDistance = dist(start.x, start.y, end.x, end.y);

  vizTipRight = handTipRight;
  x = vizTipRight.x
  y = vizTipRight.y

}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size
  // stroke(255);
  // strokeWeight(5);
  point(pos.x, pos.y);
}

function keyTyped() {
  if (key === '1') {
    mouseMode = !mouseMode;
  }
  if (key === 's') {
    stopdraw = !stopdraw;
    background(0);
  }
  console.log(stopdraw)
}