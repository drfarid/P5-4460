var width =500;
var height= 500;

var color = "black";

var brush;
var brush2;
var xScale;
var yScale;
var xScale2;
var yScale2;

var selected;


//reformat the locations to have a consistent format
d3.csv("candy.csv", function(csv) {
    // console.log(csv[0]);
    if (csv.Q4_COUNTRY == "United States") {
    	var updatedUSAbbr = csv.map(function(d) {
    		if (csv.Q5_STATE_PROVINCE.length > 2) {
    			console.log(this);
    		}
    	});
    }
    
});