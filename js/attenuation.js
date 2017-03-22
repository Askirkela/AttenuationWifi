/**
 * Selects the apropriate tool
 */
var selectTool = (toolIndex) => {
    resetTool();
    currentMaterial = "";
    try {
        currentTool = tools[toolIndex];
        if (toolIndex === 3) {
            var opt = select.options;
            currentMaterial = opt[opt.selectedIndex].value;
        }
    } catch (err) {
        alert("An error occured while selecting the tool : " + err);
    }
    currState();
};

/**
 * Places the source on the canvas
 */
var placeSource = (x, y) => {
	if (!existingsrc && (currentTool === tools[0] || currentTool === tools[1])) {
		src.x = x;
		src.y = y;
		existingsrc = true;
        drawSource(x, y);
        resetTool();
	}
};

/**
 * Places the receptor on the canvas
 */
var placeReceptor = (x, y) => {
	if(currentTool === tools[2]) {
        receptor.push({"x":x, "y":y});
        drawReceptor(x, y);
        //Text adjustment
        writeMessage(canvas, receptor.length, x-2, y+17);
        resetTool();
	}
};

/** 
 * Draws a rectangle with the right material
 */
var placeWall = (x, y, u, v) => {
	if(currentTool === tools[3]) {
        var mat = select.selectedIndex;
        console.log("Selected Material : " + materials[mat]);
        var materialName = materials[mat];
        ctxWalls.lineWidth = 5;
        ctxWalls.strokeStyle = materialsProperties[materialName].color;
        drawSquare2(x, y, u, v);
        walls.push({'x': x, 'y': y, 'u': u, 'v': v, 'color': materialsProperties[materialName].color});
	}
};

/* ================================================================================================================================================== */

/**
 * Calculates the distance between source and receptor
 */
var getDistance = (src, receptor) => {
	return Math.sqrt(Math.pow(src.x - src.y, 2) + Math.pow(receptor.x - receptor.y, 2));
};

/**
 * Calculates the signal's attenuation from source to receptor in the air
 * Atténuation = 92,45+20*LOG10(Freq en GHz)+20*LOG10(Dist en km)
 */
var getAirAttenuation = (freq, distance) => {
	return Math.floor(92.45+20*Math.log10(freq)+20*Math.log10(distance/1000));
};

/**
 * Sums the signal attenuation from crossing materials
 */
var getMaterialsAttenuation = (freq, mat) => {
    var sum = 0;
    mat.forEach((e) => {
        sum += materialsProperties[e].att[freq];
    });
    return sum;
};

var getTotalAttenuation = (freq, dist, mat) => {
    return srcStrength - getAirAttenuation(freq, dist) - getMaterialsAttenuation(freq, mat);
};

/**
 * Returns a quality value for the signal
 */
var getSignalStrength = (freq, dist, mat) => {
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

/* ================================================================================================================================================== */

/**
 * Draws the source on canvas
 */
var drawSource = (x, y) => { drawSquare(x, y, "blue"); };

/* ******************
 * Remove X functions
 * ******************/
var removeSource = () => {
    if (existingsrc) {
        ctx.clearRect(src.x, src.y, 10, 20);
        src = {x:-1, y:-1};
        existingsrc = false;
        resetTool();
        currState();
    }
};

var removeReceptor = () => {
    if (receptor) {
        receptor.forEach((e) => { ctx.clearRect(e.x, e.y, 10, 20); });
        receptor = [];
        resetTool();
        currState();    
    }
};

var removeWalls = () => {
    ctxWalls.clearRect(0, 0, canvas.width, canvas.height);
    walls = [];
    resetTool();
    currState(); 
};

var drawReceptor = (x, y) => { drawSquare(x, y, "green"); };

var getMousePos = (canvas, evt) => {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left) - (evt.clientX - rect.left) % 10,
      y: (evt.clientY - rect.top) - (evt.clientY - rect.top) % 10
   	};
};

var writeMessage = (canvas, message, x, y) => {
    /*ctx.clearRect(0, 0, canvas.width, canvas.height);*/
    ctx.font = '18pt Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(message, x, y);
};

var drawSquare = (x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 10, 20);
};

var drawSquare2 = (x, y, u, v) => {
    ctxWalls.beginPath();
    ctxWalls.moveTo(x, y);
    ctxWalls.lineTo(u, y);
    ctxWalls.stroke();

    ctxWalls.beginPath();
    ctxWalls.moveTo(x, y);
    ctxWalls.lineTo(x, v);
    ctxWalls.stroke();

    ctxWalls.beginPath();
    ctxWalls.moveTo(u, y);
    ctxWalls.lineTo(u, v);
    ctxWalls.stroke();

    ctxWalls.beginPath();
    ctxWalls.moveTo(x, v);
    ctxWalls.lineTo(u, v);
    ctxWalls.stroke();
};

var clearCanvas = () => {
    resetTool();
    removeSource();
    removeReceptor();
    removeWalls();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currState();
};

var resetTool = () => { currentTool = tools[4]; };

/* ================================================================================================================================================== */

var dispatch = (evt) => {
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
            console.log("Called to place a wall");
            break;
        default:
            break;
    }
};


/**
 * In-page debug
 */
var currState = () => {
    var infocurtool = $('#infocurtool')[0];
    var infocurmat = $('#infocurmat')[0];
    var infoexistingsrc = $('#infoexistingsource')[0];
    var infosrcpos = $('#infosourcepos')[0];
    var inforeceptorpos = $('#inforeceptorpos')[0];
    var infomousepos = $('#infomousepos')[0];
    var infoWalls = $('#infowalls')[0];

    infocurtool.innerText = currentTool;
    infocurmat.innerText = currentMaterial;
    infoexistingsrc.innerText = existingsrc;
    infosrcpos.innerText = JSON.stringify(src);
    inforeceptorpos.innerText = JSON.stringify(receptor);
    infomousepos.innerText = JSON.stringify(mousePos);
    infoWalls.innerText = JSON.stringify(walls);
};

/**
 * Draws a 10px grid on canvas 'can'
 */
var drawBackCanvas = () => {
    ctxBack.strokeStyle = '#999';
    for (var i = 0; i < back.height; i += 10) {
        ctxBack.beginPath();
        ctxBack.moveTo(0, i);
        ctxBack.lineTo(back.width, i);
        ctxBack.stroke();
    }
    for (var i = 0; i < back.width; i += 10) {
        ctxBack.beginPath();
        ctxBack.moveTo(i, 0);
        ctxBack.lineTo(i, back.height);
        ctxBack.stroke();
    }
}

/* ================================================================================================================================================== */

/*var setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("Setting cookie : " + cname + "=" + cvalue + ";" + expires + ";path=/");
};
var getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};
var isDark = () => {
    console.log('Checking cookie "Dark"');
    var dark = getCookie("dark");
    console.log("Dark : " + dark);
    if (dark) {
        $('body').toggleClass('dark');
    }
};*/