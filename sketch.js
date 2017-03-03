//  Original Code by Jaap de Maat & Sion Fletcher - CSM GCD BA Y1 Unit 3 - Jan 2017
//  reference: http://www.lyceelecorbusier.eu/p5js/?p=2583
//  edited by Tze Ki Woo(Kiki) - Feb2017


var NORTH = 0;
var NORTHEAST = 1; 
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST= 7;

var stepSize = 1;
var diameter = 1;

var drawMode = 1;
var counter = 0;

var direction;
var posX, posY;

function setup() {
  //set Canvas to size of window
  createCanvas(600, 600);
  colorMode(RGB);
  smooth();
  noStroke();

  posX = 600/2;
  posY = 600/2;

//Intoduction Page
  background(113,238,255);
    
  //create Button object 1 (Hong Kong)
  button1 = createButton('Hong Kong');
  button1.position(100, 20);
  //Load Data when Button 1 is Pressed
  button1.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22kowloon%2C%20Hong%20Kong%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });

  //create Button object 2 (Toronto, Canada)
  button2 = createButton('Toronto');
  button2.position(195, 20);
  //Load Data when Button 2 is Pressed
  button2.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22toronto%2C%20Canada%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
  //create Button object 3 (Los Angeles, CA, US)
  button3 = createButton('Los Angeles');
  button3.position(270, 20);
  //Load Data when Button 3 is Pressed
  button3.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22los%20angeles%2C%20USA%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
  //create Button object 4 (Osaka, Japan)
  button4 = createButton('Osaka');
  button4.position(370, 20);
  //Load Data when Button 4 is Pressed
  button4.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22osaka%2C%20Japan%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
  //create Button object 5 (Seoul, Korea)
  button5 = createButton('Seoul');
  button5.position(445, 20);
  //Load Data when Button 5 is Pressed
  button5.mousePressed(function() {
  loadJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22seoul%2C%20korea%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
  weatherLoaded);
  });
  
}

  
  function weatherLoaded(data) {
  var temp = data.query.results.channel.item.condition.temp;
  var windSpeed = data.query.results.channel.wind.speed;
  var windDirection = data.query.results.channel.wind.direction;
  
  //forcast data
  var tempD2H = data.query.results.channel.item.forecast[0].high;
  var tempD2L = data.query.results.channel.item.forecast[0].low;
  
// HOW to get avarage of tempD2H+tempD2L?!?!
  var tempforcast1 = ((tempD2H+tempD2L)/2);
 



//print data to the console
print(temp);
print(windSpeed);
print(tempD2H);
print(tempD2L);
print(windDirection);
print(tempforcast1);


  //add data info in bottom left corner of the screen
  //for more information about using text in a P5js sketch visit:
  //http://creative-coding.decontextualize.com/text-and-type/
  
background(113,238,255);


  textSize(30);
  textFont("Times");
     
    fill(255,241,0)
    text(windSpeed, 500, 290 - 50);
    fill(255,0,170);
    text(temp, 500, 340 - 30);
    fill(0);
    text(windDirection, 500, 390 - 10);
    // text(windangle, 30 windowHeight);

  //create ellipse and set width and height of the ellipse to windSpeed data
  fill(255,241,0);
  noStroke();
  ellipse(600 / 2, 600 / 2, windSpeed * 10, windSpeed * 10);
  
   //create ellipse and set width and height of the ellipse to temp data
  noFill();
  strokeWeight(7);
  stroke(255,0,170);
  ellipse(600 / 4, 600 / 2, temp * 2, temp * 2);
  
  
  //create rect and set rotation of rect to windDirection
  translate(600 / 2, 600 / 2);
  fill(0);
  noStroke();
  angleMode(DEGREES); // Change the mode to DEGREES
  rotate(windDirection);
  rotate(tempforcast1);
  rect(0, 0, 150, 5);

}


function draw() {
    colorMode(RGB);
  for (var i=0; i<=mouseX; i++) {
    counter++;

    // random number for the direction of the next step
    if (drawMode == 2) {
      direction = round(random(0, 3));    // only NORTH, NORTHEAST, EAST possible
    }
    else {
      direction = int(random(0, 7));    // all directions without NORTHWEST
    }

    if (direction == NORTH) {  
      posY -= stepSize;  
    } 
    else if (direction == NORTHEAST) {
      posX += stepSize;
      posY -= stepSize;
    } 
    else if (direction == EAST) {
      posX += stepSize;
    } 
    else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    }
    else if (direction == SOUTH) {
      posY += stepSize;
    }
    else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    }
    else if (direction == WEST) {
      posX -= stepSize;
    }
    else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > 600) posX = 0;
    if (posX < 0) posX = 600;
    if (posY < 0) posY = 600;
    if (posY > 600) posY = 0;
    if (drawMode == 3) {
      if (counter >= 100){
        counter = 0;
        fill(192, 100, 64, 80);
        ellipse(posX+stepSize/2, posY+stepSize/2, diameter+7, diameter+7);
      } 
    }
    fill(0, 40);
    ellipse(posX+stepSize/2, posY+stepSize/2, diameter, diameter);
  }
}
