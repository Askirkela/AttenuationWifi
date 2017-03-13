var canvas = $('canvas')[1];
var back = $('canvas')[0];
var ctx = canvas.getContext('2d');
var ctxBack = back.getContext('2d');

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

var materialsColors = {"Plaque de platre" : '#003366',
            "Parois interieure" : '#3366cc',
            "Parois de cabine": '#33cccc',
            "Porte en bois": '#663300',
            "Mur en brique": '#993300',
            "Mur en beton (10cm)": '#669999',
            "Mur en beton (25cm)": '#666699',
            "Mur en beton arme": '#9933ff',
            "Dalle en beton arme": '#660066',
            "Verre simple": '#99ccff',
            "Double vitrage": '#3366ff',
            "Verre pare-balles": '#0000ff',
            "Porte blindee": '#003300'};

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
var existingsrc = false;
var srcStrength = 20;
var srcSig = [2.4, 5.8];
var src = {x: -1, y: -1};
var receptor = [];
var currentMaterial;
var select = $('#materials')[0];