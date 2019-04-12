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

var returnValue = null;



d3.csv("candy.csv", function(csv) {
    




	//============================Thomas==================================
    //reformat the locations to have a consistent format
    //every entry in q5 is changed to an abbreviation of 2 letters
    //the abbreviation lists are in the folder named such
    var updatedAbbr = csv.map(function(d) {

    	//check to see the entry has a value
	    if (d.Q5_STATE_PROVINCE != null) { 
	  		
	  		//the country is the united States
	    	if (d.Q4_COUNTRY == "United States") {
	    		//if the state value is longer than two characters, find the abbreviation
	    		if (d.Q5_STATE_PROVINCE.length > 2) {
	    			var usAbbreviation = findAbbreviation("USA", d.Q5_STATE_PROVINCE);
	    			if (usAbbreviation != null) {
	    				d.Q5_STATE_PROVINCE = usAbbreviation;	
	    			}
	    		}

	    	//the country is canada
	    	} else if (d.Q4_COUNTRY == "Canada") {
	    		//if the province value is longer than two characters, find the abbreviation
	    		if (d.Q5_STATE_PROVINCE.length > 2) {
	    			var canAbbreviation = findAbbreviation("CANADA", d.Q5_STATE_PROVINCE);
	    			if (canAbbreviation != null) {
	 					d.Q5_STATE_PROVINCE = canAbbreviation;	    				
	    			}

	    		}
	    	//the country is not the United States or Canada
	    	//do not use this entry
	    	}
	    }
    });


    //============================Thomas==================================
});


//find the abbreviation of the passed in state, if country == usa, or province if country == canada
function findAbbreviation(country, fullName) {
	

	if (country == "USA") {
		d3.csv("usStatesAndAbbreviations.csv", function(csv) {
			getUsAbbreviation(fullName, csv);
		});
	} else {
		d3.csv("canadaProvincesAndAbbreviations.csv", function(csv) {
			getCanAbbreviation(fullName, csv);
		});
	}
	console.log("return value: " + returnValue);
}

function getUsAbbreviation(fullName, csv) {
	var ret = csv.filter(function(d) {
		if (fullName = d.full) {
			returnValue = d.abbreviation;
			return;
		}
	});
}

function getCanAbbreviation(fullName, csv) {
	var ret = csv.filter(function(d) {
		if (fullName = d.fullname) {
			returnValue = d.abbreviation;
			return;
		}
	});
}
