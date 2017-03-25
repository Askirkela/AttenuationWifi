const backCanvas = $('canvas')[0];
const wallsCanvas = $('canvas')[1];
const canvas = $('canvas')[2];
const ctx = canvas.getContext('2d');
const ctxBack = backCanvas.getContext('2d');
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
        'low': 3, 
        'high': 4},
    "Parois interieure" : {
        'color': '#3366cc', 
        'low': 4, 
        'high': 5},
    "Parois de cabine": {
        'color' : '#33cccc',
        'low': 5, 
        'high': 9},
    "Porte en bois": {
        'color': '#663300', 
        'low': 4, 
        'high': 7},
    "Mur en brique": {
        'color': '#993300', 
        'low': 6, 
        'high': 1},
    "Mur en beton (10cm)": {
        'color': '#669999', 
        'low': 9, 
        'high': 1},
    "Mur en beton (25cm)": {
        'color': '#666699', 
        'low': 15,
        'high': 5},
    "Mur en beton arme": {
        'color': '#9933ff', 
        'low': 18,
        'high': 0},
    "Dalle en beton arme": {
        'color': '#660066', 
        'low': 23,
        'high': 5},
    "Verre simple": {
        'color': '#99ccff', 
        'low': 3, 
        'high': 8},
    "Double vitrage": {
        'color': '#3366ff', 
        'low': 13,
        'high': 0},
    "Verre pare-balles": {
        'color': '#0000ff', 
        'low': 10,
        'high': 0},
    "Porte blindee": {
        'color': '#003300', 
        'low': 19,
        'high': 2}
};

const tools = ["sourceLow", "sourceHigh", "receptor", "wall", "none"];
var currentTool = "none";
var existingsrc = false;
var srcStrength = 20;
var srcFreq = '';
var src = {x: -1, y: -1};
var receptor = [];
var currentMaterial;
var select = $('#materials')[0];
var walls = [];