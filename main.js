var counterUS = 0;
var clickedCandy = null;

var width = 500;
var height = 500;

var xScale;
var yScale;

var selected;
var compData;
var totalPeople = 0;
var candyNames = ["Any full sized candy bar", "Butterfinger", "Candy Corn", "Chiclets", "Dots", "Fuzzy Peaches", "Good N Plenty", "Gummy Bears straight up", "Healthy Fruit", "Heath Bar",	"Hershey's Dark Chocolate", "Hershey's Milk Chocolate", "Hershey's Kisses", "Jolly Rancher Bad Flavor", "Jolly Ranchers Good Flavor", "Junior Mints", "Kit Kat", "LaffyTaffy", "LemonHeads", "Licorice Not Black", "Licorice Yes Black", "Lollipops", "Milk Duds", "Milky Way", "Regular M Ms", "Peanut M M s", "Mint Kisses", "Mr Goodbar", "Nerds", "Nestle Crunch", "Peeps", "Pixy_Stix", "Reese's Peanut Butter Cups", "Reese's Pieces", "Rolos", "Skittles", "Snickers", "Sourpatch Kids", "Starburst", "Swedish Fish", "Tic Tacs", "Three_Musketeers", "Tolberone", "Trail Mix", "Twix", "Whatchamacallit Bars", "York Peppermint Patties"];

google.charts.load('current', {
	    'packages':['geochart'],
	    'mapsApiKey': 'AIzaSyAgyOWtjPkSfyInVxvcdUY6wVGXIM7evDU'
});

google.setOnLoadCallback(function () {
    createMap(null);
});




//main csv function that creates scatterplot and heatmap
d3.csv("candy.csv", function(csv) {
	compData = [];
	for (var i = 0; i < 47; i++) {
		compData.push([0.0, 0.0, ""]);
	}
	
	for (var i=0; i<csv.length; ++i) {
		if (csv[i].Q4_COUNTRY == "United States") {
			totalPeople += 1.0;
			var candies = [csv[i].Q6_Any_full_sized_candy_bar, csv[i].Q6_Butterfinger, csv[i].Q6_Candy_Corn, csv[i].Q6_Chiclets, csv[i].Q6_Dots, csv[i].Q6_Fuzzy_Peaches, csv[i].Q6_Good_N_Plenty, csv[i].Q6_Gummy_Bears_straight_up, csv[i].Q6_Healthy_Fruit, csv[i].Q6_Heath_Bar,	csv[i].Q6_Hershey_s_Dark_Chocolate,csv[i].Q6_Hershey_s_Milk_Chocolate, csv[i].Q6_Hershey_s_Kisses, csv[i].Q6_Jolly_Rancher_bad_flavor, csv[i].Q6_Jolly_Ranchers_good_flavor, csv[i].Q6_Junior_Mints, csv[i].Q6_Kit_Kat, csv[i].Q6_LaffyTaffy, csv[i].Q6_LemonHeads, csv[i].Q6_Licorice_not_black, csv[i].Q6_Licorice_yes_black, csv[i].Q6_Lollipops, csv[i].Q6_Milk_Duds, csv[i].Q6_Milky_Way, csv[i].Q6_Regular_M_Ms, csv[i].Q6_Peanut_M_M_s, csv[i].Q6_Mint_Kisses, csv[i].Q6_Mr_Goodbar, csv[i].Q6_Nerds, csv[i].Q6_Nestle_Crunch, csv[i].Q6_Peeps, csv[i].Q6_Pixy_Stix, csv[i].Q6_Reese_s_Peanut_Butter_Cups, csv[i].Q6_Reese_s_Pieces, csv[i].Q6_Rolos, csv[i].Q6_Skittles, csv[i].Q6_Snickers, csv[i].Q6_Sourpatch_Kids_i_e_abominations_of_nature, csv[i].Q6_Starburst, csv[i].Q6_Swedish_Fish, csv[i].Q6_Tic_Tacs, csv[i].Q6_Three_Musketeers, csv[i].Q6_Tolberone_something_or_other, csv[i].Q6_Trail_Mix, csv[i].Q6_Twix, csv[i].Q6_Whatchamacallit_Bars, csv[i].Q6_York_Peppermint_Patties];
			for (var j = 0.0; j < candies.length; j++) {
				compData[j][2] = candyNames[j];
				if (String(candies[j]) == "JOY") {
					compData[j][0] += 1.0;
					if ((csv[i].Q3_AGE) != "") {
						compData[j][1] += parseFloat(csv[i].Q3_AGE);		
					}
				}
			}
		}
	}
	
	// console.log(totalPeople);

	xScale = d3.scaleLinear().domain([35,45]).range([50,450]);
	yScale = d3.scaleLinear().domain([0.0,totalPeople]).range([450,50]);
	
	var xAxis = d3.axisBottom().scale(xScale);
	var yAxis = d3.axisLeft().scale(yScale);
	
		//   //Create SVGs for charts
	var chart = d3.select("#scatter")
        .append("svg:svg")
        .attr("width",width)
		.attr("height",height);

	//  //add scatterplot points
	// console.log(typeof compData[0][1]);
	// console.log(typeof 1.0);

	var candyName = null;

	//create the points in the scatterplot
 	var temp1= chart.selectAll("circle")
   		.data(compData)
   		.enter()
   		.append("circle")
   		.attr("id",function(d,i) {return i;} )
   		.attr("cx", function(d,i) { 
			 return xScale(compData[i][1]/compData[i][0]); 
		})
   		.attr("cy", function(d,i) { return yScale(compData[i][0]); })
   		.attr("r", 5)
   		.on("mouseover", function(d,i){ 
			(document.getElementById("candy").innerHTML = compData[i][2]);

			candyName = compData[i][2];
			(document.getElementById("rating").innerHTML = compData[i][0]);
			(document.getElementById("age").innerHTML = compData[i][1]/compData[i][0]);
			// selected = d;
			chart.selectAll("circle").attr("fill", function(thisGuy) {
				if (thisGuy == selected) {
					return "green";
				}
				if (thisGuy == d) {
					return "red"
				}
				return "black";
			});
   		})
   		.on("click", function(d,i){
   			candyName = compData[i][2];
   			(document.getElementById("pCandy").innerHTML = "What States love " + candyName + " the most?"); 
   			if (candyName != null) {
   				createMap(candyName);
			   }
			selected = d;
			chart.selectAll("circle").attr("fill", function(thisGuy) {
				if (thisGuy == selected) {
					return "green";
				}
				return "black";
			});
   		});

   	

	


	chart.append("g")
		.attr("transform", "translate(0,"+ (width -50)+ ")")
		.call(xAxis) 
		.append("text");

	chart.append("g")
		.attr("transform", "translate(50, 0)")
		.call(yAxis)
		.append("text");

	chart.append("g")
		.attr("transform", "translate(0,"+ (width -50)+ ")")
		.append("text")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Age");

	chart.append("g")
		.attr("transform", "translate(50, 0)")
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Total Joys");

	function createEmptyMap() {
		var data = google.visualization.arrayToDataTable([
		      ['State', 'Popularity']
		    ]);

		var options = {
		      region: 'US',
		      displayMode: 'regions',
		      resolution: 'provinces',
		    };

	    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

	    chart.draw(data, options);
	}

//cases of all the candys
		


	function getAverageScore(candyName, abbreviation) {
		
		var totalScore = 0;
		var totalReviews = 0;
		var findRightReviews = csv.filter(function(d) {
			if (candyName == 'York Peppermint Patties') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_York_Peppermint_Patties;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Twix') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Twix;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Any full sized candy bar") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Any_full_sized_candy_bar;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Butterfinger') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Butterfinger;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Candy Corn') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Candy_Corn;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Chiclets') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Chiclets;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Dots') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Dots;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Fuzzy Peaches') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Fuzzy_Peaches;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Good N Plenty') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Good_N_Plenty;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Gummy Bears straight up') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Gummy_Bears_straight_up;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Healthy Fruit') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Healthy_Fruit;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Heath Bar') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Heath_Bar;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Hershey's Dark Chocolate") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Hershey_s_Dark_Chocolate;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Hershey's Milk Chocolate") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Hershey_s_Milk_Chocolate;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Hershey's Kisses") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Hershey_s_Kisses;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Jolly Rancher Bad Flavor") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Jolly_Rancher_bad_flavor;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Jolly Ranchers Good Flavor') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Jolly_Ranchers_good_flavor;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Junior Mints') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Junior_Mints;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Kit Kat') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Kit_Kat;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'LaffyTaffy') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_LaffyTaffy;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'LemonHeads') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_LemonHeads;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'Licorice Yes Black') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Licorice_yes_black;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'Licorice Not Black') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Licorice_not_black;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Lollipops') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Lollipops;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Milk Duds') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Milk_Duds;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Milky Way') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Milky_Way;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Regular M Ms') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Regular_M_Ms;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Peanut M M s') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Peanut_M_M_s;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Mint Kisses') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Mint_Kisses;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Mr Goodbar') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Mr_Goodbar;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Nerds') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Nerds;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Nestle Crunch') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Nestle_Crunch;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Peeps') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Peeps;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Pixy_Stix') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Pixy_Stix;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Reese's Peanut Butter Cups") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Reese_s_Peanut_Butter_Cups;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Reese's Pieces") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Reese_s_Pieces;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Rolos') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Rolos;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Skittles') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Skittles;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Snickers') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Snickers;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Sourpatch Kids') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Sourpatch_Kids_i_e_abominations_of_nature;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Starburst') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Starburst;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Swedish Fish') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Swedish_Fish;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Tic Tacs') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Tic_Tacs;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Three_Musketeers') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Three_Musketeers;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Tolberone') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Tolberone_something_or_other;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Trail Mix') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Trail_Mix;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Whatchamacallit Bars') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Whatchamacallit_Bars;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}

		});
		console.log("Score: " + totalScore + " Reviews: " + totalReviews);
		return totalScore/totalReviews;
	}

	function getReviewCount(candyName, abbreviation) {
		var totalScore = 0;
		var totalReviews = 0;
		var findRightReviews = csv.filter(function(d) {
			if (candyName == 'York Peppermint Patties') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_York_Peppermint_Patties;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Twix') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Twix;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Any full sized candy bar") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Any_full_sized_candy_bar;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Butterfinger') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Butterfinger;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Candy Corn') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Candy_Corn;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Chiclets') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Chiclets;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Dots') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Dots;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Fuzzy Peaches') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Fuzzy_Peaches;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Good N Plenty') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Good_N_Plenty;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Gummy Bears straight up') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Gummy_Bears_straight_up;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Healthy Fruit') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Healthy_Fruit;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Heath Bar') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Heath_Bar;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Hershey's Dark Chocolate") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Hershey_s_Dark_Chocolate;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Hershey's Milk Chocolate") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Hershey_s_Milk_Chocolate;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Hershey's Kisses") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Hershey_s_Kisses;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Jolly Rancher Bad Flavor") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Jolly_Rancher_bad_flavor;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Jolly Ranchers Good Flavor') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Jolly_Ranchers_good_flavor;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Junior Mints') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Junior_Mints;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Kit Kat') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Kit_Kat;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'LaffyTaffy') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_LaffyTaffy;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'LemonHeads') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_LemonHeads;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'Licorice Yes Black') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Licorice_yes_black;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}else if (candyName == 'Licorice Not Black') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Licorice_not_black;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Lollipops') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Lollipops;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Milk Duds') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Milk_Duds;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Milky Way') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Milky_Way;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Regular M Ms') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Regular_M_Ms;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Peanut M M s') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Peanut_M_M_s;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Mint Kisses') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Mint_Kisses;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Mr Goodbar') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Mr_Goodbar;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Nerds') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Nerds;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Nestle Crunch') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Nestle_Crunch;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Peeps') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Peeps;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Pixy_Stix') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Pixy_Stix;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Reese's Peanut Butter Cups") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Reese_s_Peanut_Butter_Cups;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == "Reese's Pieces") {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Reese_s_Pieces;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Rolos') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Rolos;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Skittles') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Skittles;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Snickers') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Snickers;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Sourpatch Kids') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Sourpatch_Kids_i_e_abominations_of_nature;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Starburst') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Starburst;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Swedish Fish') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Swedish_Fish;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Tic Tacs') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Tic_Tacs;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Three_Musketeers') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Three_Musketeers;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Tolberone') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Tolberone_something_or_other;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Trail Mix') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Trail_Mix;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			} else if (candyName == 'Whatchamacallit Bars') {
				if (d.Q5_STATE.toUpperCase() == abbreviation) {	
					var reviewValue = d.Q6_Whatchamacallit_Bars;
					if (reviewValue == 'DESPAIR') {
						totalReviews++;
					} else if (reviewValue == 'MEH') {
						totalReviews++;
						totalScore += 0.5;
					} else {
						totalReviews++;
						totalScore++;
					}

				}
			}

		});
		return totalReviews;
	}



	function createMap(candyName) {

		if (candyName == null) {
			createEmptyMap();
		} else {
			console.log("candy name: " + candyName);
			var data = google.visualization.arrayToDataTable([
		      ['State', 'Popularity', 'Number of Reviews'],
		      ['Alabama', getAverageScore(candyName, 'AL'), getReviewCount(candyName, 'AL')],
		      ['Alaska', getAverageScore(candyName, 'AK'), getReviewCount(candyName, 'AK')],
		      ['Arizona', getAverageScore(candyName, 'AZ'), getReviewCount(candyName, 'AZ')],
		      ['Arkansas', getAverageScore(candyName, 'AR'), getReviewCount(candyName, 'AR')],
		      ['California', getAverageScore(candyName, 'CA'), getReviewCount(candyName, 'CA')],
		      ['Colorado', getAverageScore(candyName, 'CO'), getReviewCount(candyName, 'CO')],
		      ['Connecticut', getAverageScore(candyName, 'CT'), getReviewCount(candyName, 'CT')],
		      ['Delaware', getAverageScore(candyName, 'DE'), getReviewCount(candyName, 'DE')],
		      ['Florida', getAverageScore(candyName, 'FL'), getReviewCount(candyName, 'FL')],
		      ['Georgia', getAverageScore(candyName, 'GA'), getReviewCount(candyName, 'GA')],
		      ['Hawaii', getAverageScore(candyName, 'HI'), getReviewCount(candyName, 'HI')],
		      ['Idaho', getAverageScore(candyName, 'ID'), getReviewCount(candyName, 'ID')],
		      ['Illinois', getAverageScore(candyName, 'IL'), getReviewCount(candyName, 'IL')],
		      ['Indiana', getAverageScore(candyName, 'IN'), getReviewCount(candyName, 'IN')],
		      ['Iowa', getAverageScore(candyName, 'IA'), getReviewCount(candyName, 'IA')],
		      ['Kansas', getAverageScore(candyName, 'KS'), getReviewCount(candyName, 'KS')],
			  ['Kentucky', getAverageScore(candyName, 'KY'), getReviewCount(candyName, 'KY')],
			  ['Louisiana', getAverageScore(candyName, 'LA'), getReviewCount(candyName, 'LA')],
			  ['Maine', getAverageScore(candyName, 'ME'), getReviewCount(candyName, 'ME')],
			  ['Maryland', getAverageScore(candyName, 'MD'), getReviewCount(candyName, 'MD')],
			  ['Massachusetts', getAverageScore(candyName, 'MA'), getReviewCount(candyName, 'MA')],
			  ['Michigan', getAverageScore(candyName, 'MI'), getReviewCount(candyName, 'MI')],
			  ['Minnesota', getAverageScore(candyName, 'MN'), getReviewCount(candyName, 'MN')],
			  ['Mississippi', getAverageScore(candyName, 'MS'), getReviewCount(candyName, 'MS')],
			  ['Missouri', getAverageScore(candyName, 'MO'), getReviewCount(candyName, 'MO')],
			  ['Montana', getAverageScore(candyName, 'MT'), getReviewCount(candyName, 'MT')],
			  ['Nebraska', getAverageScore(candyName, 'NE'), getReviewCount(candyName, 'NE')],
			  ['Nevada', getAverageScore(candyName, 'NV'), getReviewCount(candyName, 'NV')],
			  ['New Hampshire', getAverageScore(candyName, 'NH'), getReviewCount(candyName, 'NH')],
			  ['New Jersey', getAverageScore(candyName, 'NJ'), getReviewCount(candyName, 'NJ')],
			  ['New Mexico', getAverageScore(candyName, 'NM'), getReviewCount(candyName, 'NM')],
			  ['New York', getAverageScore(candyName, 'NY'), getReviewCount(candyName, 'NY')],
			  ['North Carolina', getAverageScore(candyName, 'NC'), getReviewCount(candyName, 'NC')],
			  ['North Dakota', getAverageScore(candyName, 'ND'), getReviewCount(candyName, 'ND')],
			  ['Ohio', getAverageScore(candyName, 'OH'), getReviewCount(candyName, 'OH')],
			  ['Oklahoma', getAverageScore(candyName, 'OK'), getReviewCount(candyName, 'OK')],
			  ['Oregon', getAverageScore(candyName, 'OR'), getReviewCount(candyName, 'OR')],
			  ['Pennsylvania', getAverageScore(candyName, 'PA'), getReviewCount(candyName, 'PA')],
			  ['Rhode Island', getAverageScore(candyName, 'RI'), getReviewCount(candyName, 'RI')],
			  ['South Carolina', getAverageScore(candyName, 'SC'), getReviewCount(candyName, 'SC')],
			  ['South Dakota', getAverageScore(candyName, 'SD'), getReviewCount(candyName, 'SD')],
			  ['Tennessee', getAverageScore(candyName, 'TN'), getReviewCount(candyName, 'TN')],
			  ['Texas', getAverageScore(candyName, 'TX'), getReviewCount(candyName, 'TX')],
			  ['Utah', getAverageScore(candyName, 'UT'), getReviewCount(candyName, 'UT')],
			  ['Vermont', getAverageScore(candyName, 'VT'), getReviewCount(candyName, 'VT')],
			  ['Virginia', getAverageScore(candyName, 'VA'), getReviewCount(candyName, 'VA')],
			  ['Washington', getAverageScore(candyName, 'WA'), getReviewCount(candyName, 'WA')],
			  ['West Virginia', getAverageScore(candyName, 'WV'), getReviewCount(candyName, 'WV')],
			  ['Wisconsin', getAverageScore(candyName, 'WI'), getReviewCount(candyName, 'WI')],
			  ['Wyoming', getAverageScore(candyName, 'WY'), getReviewCount(candyName, 'WY')]
		    ]);

		    var options = {
		      region: 'US',
		      displayMode: 'regions',
		      resolution: 'provinces',
		    };

		    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

		    chart.draw(data, options);
		}
	    
	}

});
   
