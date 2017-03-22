const back = $('canvas')[0];
const wallsCanvas = $('canvas')[1];
const canvas = $('canvas')[2];
const ctx = canvas.getContext('2d');
const ctxBack = back.getContext('2d');
const ctxWalls = wallsCanvas.getContext('2d');

const materials = ["Plaque de platre",
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

const materialsProperties = {
    "Plaque de platre" : {
        'color': '#003366', 
        '2.4': 3, 
        '5.8': 4},
    "Parois interieure" : {
        'color': '#3366cc', 
        '2.4': 4, 
        '5.8': 5},
    "Parois de cabine": {
        'color' : '#33cccc',
        '2.4': 5, 
        '5.8': 9},
    "Porte en bois": {
        'color': '#663300', 
        '2.4': 4, 
        '5.8': 7},
    "Mur en brique": {
        'color': '#993300', 
        '2.4': 6, 
        '5.8': 1},
    "Mur en beton (10cm)": {
        'color': '#669999', 
        '2.4': 9, 
        '5.8': 1},
    "Mur en beton (25cm)": {
        'color': '#666699', 
        '2.4': 15,
        '5.8': 5},
    "Mur en beton arme": {
        'color': '#9933ff', 
        '2.4': 18,
        '5.8': 0},
    "Dalle en beton arme": {
        'color': '#660066', 
        '2.4': 23,
        '5.8': 5},
    "Verre simple": {
        'color': '#99ccff', 
        '2.4': 3, 
        '5.8': 8},
    "Double vitrage": {
        'color': '#3366ff', 
        '2.4': 13,
        '5.8': 0},
    "Verre pare-balles": {
        'color': '#0000ff', 
        '2.4': 10,
        '5.8': 0},
    "Porte blindee": {
        'color': '#003300', 
        '2.4': 19,
        '5.8': 2}
};

const tools = ["sourceLow", "sourceHigh", "receptor", "wall", "none"];
var currentTool = "none";
var existingsrc = false;
var srcStrength = 20;
var srcFreq = 0;
var src = {x: -1, y: -1};
var receptor = [];
var currentMaterial;
var select = $('#materials')[0];
var walls = [];