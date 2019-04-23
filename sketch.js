/*
Choreography Class Final
by Mingna, Allie, Ning, Yuguang
 */

//toggle of mouse mode
let mouseMode = false;

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

let hipLeftHandTipRightDistance = 0;

//-------------------Visual Stuff------------------

// // Variables for circle
// let a = 0;

// //time factor for circles control by knee trial
// let t = 0; // time variable


//-------------------Corner Stuff------------------
// let corner1;
// let corner2;
// let changeTime = 180; // frequency of changing a new corner, in ms
// let nextLocationX1;
// let nextLocationY1;
// let nextDirection = 0;
// let nextAngle = 90;
// let padding = 100; //distance btw tip of the corner to the edges
// let easing = 10;


function setup() {
  createCanvas(500, 696);
  background(0);
  blue = loadImage('blue.jpg')

  // Define and create an instance of kinectron
  kinectron = new Kinectron("10.17.201.104");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);


  // if (!mouseMode) {
  //   noCursor();
  // }

  //------------visual setup for corner
  // corner1 = new Corner(width / 2, height / 2, 90, 255);
  // corner2 = new Corner(width / 2, height / 2, 90, 10);
  // angleMode(DEGREES);
  // nextLocationX1 = width / 2;
  // nextLocationY1 = height / 2;
  // noStroke();
}


function draw() {
  frameRate(30);

  // x = mouseX + random(1, 10);
  // y = mouseY + random(1, 10);
  // x = vizTipRight.x
  // y = vizTipRight.y
  c = blue.get(x, y);
  size = random(10, 50);
  fill(c[0], c[1], c[2], random(50, 100));
  //console.log(c);
  noStroke();
  ellipse(x, y, random(10, 80), random(10, 80));
  console.log(x, y)

  //visualization for skeleton-----------------------------
  // stroke(200);
  // strokeWeight(1);

  // text("distance controls echo", 10, 20);
  // for (let i in [1, 2, 3]) {
  //   line(i * width / 3, 0, i * width / 3, height);
  // }
  // if (vizHipLeft && vizTipRight) {
  //   line(vizHipLeft.x, vizHipLeft.y, vizTipRight.x, vizTipRight.y);
  // }

  //-----------------------distance & skeleton testing------------------------------
  //get distance in case we need it
  // let d = 10;
  // if (!mouseMode) {
  //   d = map(hipLeftHandTipRightDistance, 0, width / 2, 0, width);
  // } else {
  //   let dis = dist(mouseX, mouseY, 0, height / 2);
  //   d = map(dis, 0, width / 2, 0, width);
  // }

  //get hipRight for controlling next location of corner
  // let nextLocationX = width/2,
  //     nextLocationY = height/2;
  // if (!mouseMode) {
  //   if (vizTipRight) {
  //     nextLocationX = vizTipRight.x;
  //     nextLocationY = vizTipRight.y;
  //   }
  // } else {

  // }

  //the actual drawing
  //background(0, 127);

  // if (frameCount % changeTime == changeTime - 1) {
  //   // nextLocationX1 = random(padding, width - padding);
  //   // nextLocationY1 = random(padding, height - padding);
  //   nextLocationX1 = nextLocationX;
  //   nextLocationY1 = nextLocationY;

  //   nextDirection += 37;
  //   nextAngle = random(30, 150);
  //   console.log(vizTipRight);
  // }

  //move corner
  //   let nextLocation1 = createVector(nextLocationX1, nextLocationY1);
  //   corner1.velocity = nextLocation1.sub(corner1.location);
  //   let currentVelMag1 = corner1.velocity.mag();
  //   corner1.velocity.setMag(currentVelMag1 / easing);


  //   let nextLocation2 = createVector(nextLocationX1, nextLocationY1);
  //   corner2.velocity = nextLocation2.sub(corner1.location);
  //   let currentVelMag2 = corner1.velocity.mag();
  //   let rSpeed2 = nextDirection - corner1.currentRotationAngle;
  //   let aSpeed2 = nextAngle - corner1.angle;

  //   //rotate corner
  //   let rSpeed1 = nextDirection - corner1.currentRotationAngle;
  //   corner1.rotationSpeed = rSpeed1 / easing;

  //   //resize corner angle
  //   let aSpeed1 = nextAngle - corner1.angle;
  //   corner2.angleChange = aSpeed1 / easing;

  //   corner1.update();
  //   corner2.update();

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
  //console.log(vizTipRight)
  // vizHipLeft = hipLeft;
  // vizKneeRight = kneeRight;
  // vizElbowLeft = elbowLeft;
  // print(vizTipRight);


  // // Draw a line
  // stroke(255);
  // line(start.x, start.y, end.x, end.y);
  // let d = dist(start.x, start.y, end.x, end.y);

  // // Map the distance to angle speed
  // let aspeed = map(d, 0, width, 0, PI/2);
  // // Inverse, non-linear mapping
  // //let aspeed = 1/d;

  // a+=aspeed;

  // noStroke();
  // // Calculate circular pathway
  // let x = cos(a)*width/4 + width/2;
  // let y = sin(a)*width/4 + width/2;
  // ellipse(x, y, 5, 5);
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