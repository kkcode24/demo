function $$(id) {
	return document.getElementById(id);
}
var intR,intG,intB,strColor;
function setColor(){
	intR = $$("txtR").value;
	intG = $$("txtG").value;
	intB = $$("txtB").value;	
    strColor="rgb("+intR+","+intG+","+intB+")";
    $$("showColor").innerHTML = strColor;
	$$("Prev").style.backgroundColor =strColor;
}



