/* ****************
 * Loading the page
 * ****************/
var mousePos;
var mouseDownPos; 
var mouseUpPos;
canvas.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(canvas, evt);
        currState();
    }, false);
canvas.addEventListener('mousedown', function(evt) {
        mouseDownPos = getMousePos(canvas, evt);
        if (currentTool !== tools[3]) {
            dispatch(evt);
        }
        currState();
    }, false);
canvas.addEventListener('mouseup', function(evt) {
        if (currentTool === tools[3]) {
            mouseUpPos = getMousePos(canvas, evt);
            console.log('[' + mouseDownPos.x + ', ' + mouseDownPos.y + '], [' + mouseUpPos.x + ', ' + mouseUpPos.y + ']');
            placeWall(mouseDownPos.x, mouseDownPos.y, mouseUpPos.x, mouseUpPos.y);
        }
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

//Draws the grid
drawBackCanvas();

//Fills the legend
var legend = $('#legend')[0];
for(e in materialsProperties) {
    var div = $('<div />', {
        class: "col-md-2",
        style: "color:gold;font-weight:bold;background-color:"+materialsProperties[e].color,
        text: e
    });
    div.appendTo(legend);
};

$('#debug').toggle();