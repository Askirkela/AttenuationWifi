var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var signalAttenuation = {
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
    	},
    "Materials": {
    	"2.4Ghz": {
    		"Plaque de platre": 3,
    		"Parois interieure": 4,
    		"Parois de cabine": 5,
    		"Porte en bois": 4,
    		"Mur en brique": 6,
    		"Mur en beton (10cm)": 9,
    		"Mur en beton (25cm)": 15,
    		"Mur en beton arme": 18,
    		"Dalle en beton arme": 23,
    		"Verre simple": 3,
    		"Double vitrage": 13,
    		"Verre pare-balles": 10,
    		"Porte blindee" : 19
    		},
    	"5.8GHz": {
    		"Plaque de platre": 4,
    		"Parois interieure": 5,
    		"Parois de cabine": 9,
    		"Porte en bois": 7,
    		"Mur en brique": 10,
    		"Mur en beton (10cm)": 13,
    		"Mur en beton (25cm)": 25,
    		"Mur en beton arme": 30,
    		"Dalle en beton arme": 35,
    		"Verre simple": 8,
    		"Double vitrage": 20,
    		"Verre pare-balles": 20,
    		"Porte blindee" : 32
    		}
    	}
    };


var currentTool = "none";
var existingSource = false;
var sourceStrength = 20;
var source;

/**
	Places the source on the canvas
 */
function placeSource() {
	if(!existingSource) {
		
		source["x"] = mousePos["x"];
		source["y"] = mousePos["y"];
		existingSource = true;
	}
}

/**
	Selects the receptor
 */
function selectReceptor() {
	if(currentTool === tools[1]) {
	}
}

/**
	Places the receptor on the canvas
 */
function placeReceptor() {
	if(currentTool === tools[1]) {
	}
}

/**
	Selects the wall material
 */
function selectMaterial() {
	if(currentTool === tools[2]) {
	}
}

/** 
	Draws a rectangle with the right material
 */
function placeRoom() {
	if(currentTool === tools[2]) {
	}
}

/**
	Calculates the distance between source and receptor
 */
function getDistance(source, receptor) {
	return Math.sqrt(Math.pow(source.x - source.y, 2) + Math.pow(receptor.x - receptor.y));
}

/**
	Calculates the signal's attenuation from source to receptor
	Atténuation = 92,45+20*LOG10(Freq en GHz)+20*LOG10(Dist en km)
 */
function getAttenuation(freq, distance) {
	return -Math.floor(92.45+20*Math.log10(freq)+20*Math.log10(distance/1000));
}

/**
	Returns a quality value for the signal
 */
function getSignalStrength(attenuation) {
	if (attenuation > -77) {
		return "Excellent";
	}
	if (attenuation > -78 && attenuation < -86) {
		return "Good";
	}
	if (attenuation > -87 && attenuation < -92) {
		return "Weak";
	}
	else {
		return "None";
	}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   	};
}

function writeMessage(canvas, message, x, y) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, x, y);
}

var mousePos; 
canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
      }, false);
canvas.addEventListener('mouseButtonDown', function(evt) {
	var pos = getMousePos(canvas, evt);
});

