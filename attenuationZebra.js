

zebra.ready(function() {
	eval(zebra.Import("ui", "layout"));

	var root = (new zCanvas(700, 700)).root;
	/*root.properties({
		layout: new BorderLayout(8, 8),
		border: new Border(),
		padding: 8,
		kids: {
			TOP:new TextField("Hi...", true), 
			CENTER: new TextField("Hi...", true),
			BOTTOM: new Button("Clear").properties({
				canHaveFocus: false
			})
		}
	});*/
	
	drawUI(root);


/*	root.find("//zebra.ui.Button").bind(function() {
		root.find("//zebra.ui.TextField").setValue("");
	});*/
});

var x = 10;
var y = 10;
var uiWidth = 200;
var uiHeigth = 300;
uiButtonWidth = 150;
uiButtonHeigth = 20;

function drawUI(root) {
	//Main UI panel
	var uiPanel = new zebra.ui.Panel();
	uiPanel.setBounds(x, y, uiWidth, uiHeigth);
	uiPanel.setBackground("yellow");
	root.add(uiPanel);

	var sourcePanel = drawSourcePanel();
	uiPanel.add(sourcePanel);
	var receptorPanel = drawReceptorPanel();
	uiPanel.add(receptorPanel);

}

function drawSourcePanel() {
	var sourcePanel = new zebra.ui.Panel();
	sourcePanel.setBounds(x, y, uiWidth-5, 100);
	sourcePanel.setBackground("blue");

	var sourceLabel = new zebra.ui.Label("Source");
	sourceLabel.setBounds(x, y, uiWidth, 20);
	sourcePanel.add(sourceLabel);

	//Source buttons
	var lowFreqButton = new zebra.ui.Button("2.4GHz");
	lowFreqButton.setBounds(x+10, y+25, uiButtonWidth, uiButtonHeigth);
	var highFreqButton = new zebra.ui.Button("5.8GHz");
	highFreqButton.setBounds(x+10, y+50, uiButtonWidth, uiButtonHeigth);
	sourcePanel.add(lowFreqButton);
	sourcePanel.add(highFreqButton);

	return sourcePanel;	
}

function drawReceptorPanel() {
	var receptorPanel = new zebra.ui.Panel();
	receptorPanel.setBounds(x, y+105, uiWidth-5, 75);
	receptorPanel.setBackground("blue");

	var receptorLabel = new zebra.ui.Label("Receptor");
	receptorLabel.setBounds(x, y, uiWidth, 20);
	receptorPanel.add(receptorLabel);

	//Source buttons
	var receptorButton = new zebra.ui.Button("Place receptor");
	receptorButton.setBounds(x+10, y+25, uiButtonWidth, uiButtonHeigth);
	receptorPanel.add(receptorButton);

	return receptorPanel;		
}

function drawMaterialsPanel() {

}