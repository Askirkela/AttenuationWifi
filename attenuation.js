var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var materials = ["Plaque de platre",
            "Parois interieure",
            "Parois de cabine",
            "Porte en bois",
            "Mur en brique",
            "Mur en beton (10cm)",
            "Mur en beton (25cm)",
            "Mur en beton arme",
            "Dalle en beton arme",
            "Verre simple",
            "Double vitrage",
            "Verre pare-balles",
            "Porte blindee"];

/**
    material : {freq1 : attenuation, freq2 : attenuation}
 */
var materialsAttenuation = {
	"Plaque de platre": {2.4: 3, 5.8: 4},
	"Parois interieure": {2.4: 4, 5.8: 5},
	"Parois de cabine": {2.4: 5, 5.8: 9},
	"Porte en bois": {2.4: 4, 5.8: 7},
	"Mur en brique": {2.4: 6, 5.8: 10},
	"Mur en beton (10cm)": {2.4: 9, 5.8: 13},
	"Mur en beton (25cm)": {2.4: 15, 5.8: 25},
	"Mur en beton arme": {2.4: 18, 5.8: 30},
	"Dalle en beton arme": {2.4: 23, 5.8: 35},
	"Verre simple": {2.4: 3, 5.8: 8},
	"Double vitrage": {2.4: 13, 5.8: 20},
	"Verre pare-balles": {2.4: 10, 5.8: 20},
	"Porte blindee" : {2.4: 19, 5.8: 32}
};

var tools = ["sourceLow", "sourceHigh", "receptor", "wall", "none"];
var currentTool = "none";
var existingSource = false;
var sourceStrength = 20;
var source = {"x":0, "y":0};
var currentMaterial;
var select = document.getElementById('materials');

/**
    Selects the apropriate tool
 */
var selectTool = function(toolIndex) {
    currentTool = tools[4];
    currentMaterial = "";
    try {
        currentTool = tools[toolIndex];
        if (toolIndex === 3) {
            var opt = document.getElementById('materials').options;
            currentMaterial = opt[opt.selectedIndex].value;
        }
    } catch (err) {
        alert("An error occured while selecting the tool : " + err);
    }
    console.log(currentTool);
    console.log(currentMaterial);
};

/**
	Places the source on the canvas
 */
var placeSource = function(x, y) {
	if (!existingSource && (currentTool === tools[0] || currentTool === tools[1])) {
		source["x"] = x;
		source["y"] = y;
		existingSource = true;
        drawSource(source["x"], source["y"], currentTool);
        currentTool = tools[4];
	}
};

/**
	Places the receptor on the canvas
 */
var placeReceptor = function() {
	if(currentTool === tools[2]) {
	}
};

/** 
	Draws a rectangle with the right material
 */
var placeRoom = function() {
	if(currentTool === tools[3]) {
	}
};

/**
	Calculates the distance between source and receptor
 */
var getDistance = function(source, receptor) {
	return Math.sqrt(Math.pow(source["x"] - source["y"], 2) + Math.pow(receptor["x"] - receptor["y"]));
};

/**
	Calculates the signal's attenuation from source to receptor in the air
	Atténuation = 92,45+20*LOG10(Freq en GHz)+20*LOG10(Dist en km)
 */
var getAirAttenuation = function(freq, distance) {
	return Math.floor(92.45+20*Math.log10(freq)+20*Math.log10(distance/1000));
};

/**
    Sums the signal attenuation from crossing materials
 */
var getMaterialsAttenuation = function(freq, mat) {
    var sum = 0;
    mat.forEach(function(e) {
        sum += materialsAttenuation[e][freq];
    });
    return sum;
};

var getTotalAttenuation = function(freq, dist, mat) {
    return sourceStrength - getAirAttenuation(freq, dist) - getMaterialsAttenuation(freq, mat);
};

/**
	Returns a quality value for the signal
 */
var getSignalStrength = function(freq, dist, mat) {
    var attenuation = getTotalAttenuation(freq, dist, mat);
	if (attenuation > -77) {
		return "Excellent";
	}
	if (attenuation < -78 && attenuation > -86) {
		return "Good";
	}
	if (attenuation < -87 && attenuation > -92) {
		return "Weak";
	}
	else {
		return "None";
	}
};

/**
    Draws the source on canvas
 */
var drawSource = function(x, y, currentSource) {
    drawSquare(x, y, "blue");
};

var removeSource = function() {
    if (existingSource) {
        drawSquare(source["x"], source["y"], "white");
        source = {"x":0, "y":0};
        existingSource = false;
        currentTool = tools[4];
    }
};

var getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   	};
};

var writeMessage = function(canvas, message, x, y) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, x, y);
};

var drawSquare = function(x, y, color) {
    context.beginPath();
    context.rect(x-50, y-50, x+50, y+50);
    context.fillStyle = color;
    context.fill();
    context.stroke();
};

var mousePos; 
canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
    }, false);
canvas.addEventListener('mousedown', function(evt) {
        currState();
        mousePos = getMousePos(canvas, evt);
        console.log("mousedown : " + mousePos["x"] + "," + mousePos["y"]);
        placeSource(mousePos["x"], mousePos["y"]);
        currState();
    }, false);

/**
    Fills the select list of materials
 */
materials.forEach(function(e) {
    var opt = document.createElement("option");
    var text = document.createTextNode(e);
    opt.append(text);
    select.append(opt);
});

var currState = function() {
    console.log("---- Current state of affairs ----");
    console.log("Current tool : "+currentTool);
    console.log("Current material : "+currentMaterial);
    console.log("Existing source : "+existingSource);
    console.log("Source pos : "+JSON.stringify(source));
};







/*var signalAttenuation = {
    "Air": {
        "2.4Ghz": {
            "2m": 46, 
            "4m": 52, 
            "6m": 56, 
            "10m": 60, 
            "15m": 64, 
            "20m": 66, 
            "50m": 74, 
            "100m": 80, 
            "250m": 88, 
            "500m": 94
            },
        "5.8GHz": {
            "2m": 54, 
            "4m": 58, 
            "6m": 63, 
            "10m": 68, 
            "15m": 71, 
            "20m": 74, 
            "50m": 82, 
            "100m": 88, 
            "250m": 96, 
            "500m": 102
            }
        },*/