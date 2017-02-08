var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

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
var source = {x: -1, y: -1};
var receptor = {x: -1, y: -1};
var currentMaterial;
var select = document.getElementById('materials');