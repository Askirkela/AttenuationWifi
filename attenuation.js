/**
    Selects the apropriate tool
 */
var selectTool = function(toolIndex) {
    resetTool();
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
    currState();
};

/**
	Places the source on the canvas
 */
var placeSource = function(x, y) {
	if (!existingSource && (currentTool === tools[0] || currentTool === tools[1])) {
		source.x = x;
		source.y = y;
		existingSource = true;
        drawSource(x, y);
        resetTool();
	}
};

/**
	Places the receptor on the canvas
 */
var placeReceptor = function(x, y) {
	if(currentTool === tools[2]) {
        receptor.x = x;
        receptor.y = y;
        drawReceptor(x, y);
        resetTool();
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
var drawSource = function(x, y) {
    drawSquare(x, y, "blue");
};

var removeSource = function() {
    if (existingSource) {
        drawSquare(source.x, source.y, "white");
        source = {x:-1, y:-1};
        existingSource = false;
        currentTool = tools[4];
    }
};

var drawReceptor = function(x, y) {
    drawSquare(x, y, "green");
};

var getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   	};
};

var writeMessage = function(canvas, message, x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(message, x, y);
};

var drawSquare = function(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x-5, y-5, x+5, y+5);
};

var clearCanvas = function() {
    resetTool();
    existingSource = false;
    source = {x:-1, y:-1};
    receptor = {x:-1, y:-1};
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

var resetTool = function() {
    currentTool = tools[4];
};

var dispatch = function() {
    switch(currentTool) {
        case tools[0]:
            placeSource(mousePos.x, mousePos.y);
            break;
        case tools[1]:
            placeSource(mousePos.x, mousePos.y);
            break;
        case tools[2]:
            placeReceptor(mousePos.x, mousePos.y);
            break;
        case tools[3]:
            console.log("Place wall");
            break;
        default:
            break;
    }
};

var mousePos; 
canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
        currState();
    }, false);
canvas.addEventListener('mousedown', function(evt) {
        mousePos = getMousePos(canvas, evt);
        dispatch();
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
    var infocurtool = document.getElementById('infocurtool');
    var infocurmat = document.getElementById('infocurmat');
    var infoexistingsource = document.getElementById('infoexistingsource');
    var infosourcepos = document.getElementById('infosourcepos');
    var inforeceptorpos = document.getElementById('inforeceptorpos');
    var infomousepos = document.getElementById('infomousepos');

    infocurtool.innerText = currentTool;
    infocurmat.innerText = currentMaterial;
    infoexistingsource.innerText = existingSource;
    infosourcepos.innerText = JSON.stringify(source);
    inforeceptorpos.innerText = JSON.stringify(receptor);
    infomousepos.innerText = JSON.stringify(mousePos);
};

/** Ca teste! */
/*selectTool(0);
placeSource(0,0);
selectTool(2);
placeReceptor(50, 100);
resetTool();*/