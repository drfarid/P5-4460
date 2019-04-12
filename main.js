
d3.csv("candy.csv", function(csv) {
    




	//============================Thomas==================================
    //reformat the locations to have a consistent format
    //every entry in q5 is changed to an abbreviation of 2 letters
    //the abbreviation lists are in the folder named such
    var updatedAbbr = csv.map(function(d) {

    	//check to see the entry has a value
	    if (d.Q5_STATE != null) { 
	  		
	  		//the country is the united States
	    	if (d.Q4_COUNTRY == "United States") {
	    		//if the state value is longer than two characters, find the abbreviation
	    		if (d.Q5_STATE.length > 2) {
	    			var usAbbreviation = findAbbreviation("USA", d.Q5_STATE);
	    			if (usAbbreviation != null) {
	    				d.Q5_STATE = usAbbreviation;	
	    			}
	    		}

	    	//the country is canada
	    	} else if (d.Q4_COUNTRY == "Canada") {
	    		//if the province value is longer than two characters, find the abbreviation
	    		if (d.Q5_STATE.length > 2) {
	    			var canAbbreviation = findAbbreviation("CANADA", d.Q5_STATE);
	    			if (canAbbreviation != null) {
	 					d.Q5_STATE = canAbbreviation;	    				
	    			}

	    		}
	    	//the country is not the United States or Canada
	    	//do not use this entry
	    	}
	    }
    });


    //============================Thomas==================================
});

var returnValue = null;
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

	setTimeout(function(){
		console.log("return Value: " + returnValue);
	},2000);
	return returnValue;
}

function getUsAbbreviation(fullName, csv) {
	var ret = csv.filter(function(d) {
		if (fullName == d.full) {
			// console.log("joy and peace: " + d.abbreviation);
			returnValue = d.abbreviation;
			return;
		}
	});
}

function getCanAbbreviation(fullName, csv) {
	var ret = csv.filter(function(d) {
		if (fullName == d.fullname) {
			// console.log("joy and peace: " + d.abbreviation);
			returnValue = d.abbreviation;
			return;
		}
	});
}
