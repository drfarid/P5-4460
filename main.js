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
    createMap(clickedCandy);
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
    var chart1 = d3.select("#scatter")
	                .append("svg:svg")
	                .attr("width",width)
									.attr("height",height);

	//  //add scatterplot points
		console.log(typeof compData[0][1]);
		console.log(typeof 1.0);

     var temp1= chart1.selectAll("circle")
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
				(document.getElementById("rating").innerHTML = compData[i][0]);
				(document.getElementById("age").innerHTML = compData[i][1]/compData[i][0]);
				selected = d;
				chart1.selectAll("circle").attr("fill", function(thisGuy) {
					if (thisGuy == selected) {
						return "red";
					}
					return "black";
				});
       });
    


    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -50)+ ")")
		.call(xAxis) // call the axis generator
		.append("text");

    chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.call(yAxis)
		.append("text");

		chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(0,"+ (width -50)+ ")")
		.append("text")
		.attr("x", width-16)
		.attr("y", -6)
		.style("text-anchor", "end")
		.text("Age");

		chart1 // or something else that selects the SVG element in your visualizations
		.append("g") // create a group node
		.attr("transform", "translate(50, 0)")
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("People who like it");

	});
    var actualReviews = csv.filter(function(d){

    });





function createMap(candyName) {

    var data = google.visualization.arrayToDataTable([
      ['State', 'Popularity'],
      ['AL', getAverageScore(candyName, 'AL')],
      ['AK', getAverageScore(candyName, 'AK')],
      ['AZ', getAverageScore(candyName, 'AZ')],
      ['AR', getAverageScore(candyName, 'AR')],
      ['CA', getAverageScore(candyName, 'CA')],
      ['CO', getAverageScore(candyName, 'CO')],
      ['CT', getAverageScore(candyName, 'CT')],
      ['DE', getAverageScore(candyName, 'DE')],
      ['FL', getAverageScore(candyName, 'FL')],
      ['GA', getAverageScore(candyName, 'GA')],
      ['HI', getAverageScore(candyName, 'HI')],
      ['ID', getAverageScore(candyName, 'ID')],
      ['IL', getAverageScore(candyName, 'IL')],
      ['IN', getAverageScore(candyName, 'IN')],
      ['IA', getAverageScore(candyName, 'IA')],
      ['KS', getAverageScore(candyName, 'KS')],
	  ['KY', getAverageScore(candyName, 'KY')],
	  ['LA', getAverageScore(candyName, 'LA')],
	  ['ME', getAverageScore(candyName, 'ME')],
	  ['MD', getAverageScore(candyName, 'MD')],
	  ['MA', getAverageScore(candyName, 'MA')],
	  ['MI', getAverageScore(candyName, 'MI')],
	  ['MN', getAverageScore(candyName, 'MN')],
	  ['MS', getAverageScore(candyName, 'MS')],
	  ['MO', getAverageScore(candyName, 'MO')],
	  ['MT', getAverageScore(candyName, 'MT')],
	  ['NE', getAverageScore(candyName, 'NE')],
	  ['NV', getAverageScore(candyName, 'NV')],
	  ['NH', getAverageScore(candyName, 'NH')],
	  ['NJ', getAverageScore(candyName, 'NJ')],
	  ['NM', getAverageScore(candyName, 'NM')],
	  ['NY', getAverageScore(candyName, 'NY')],
	  ['NC', getAverageScore(candyName, 'NC')],
	  ['ND', getAverageScore(candyName, 'ND')],
	  ['OH', getAverageScore(candyName, 'OH')],
	  ['OK', getAverageScore(candyName, 'OK')],
	  ['OR', getAverageScore(candyName, 'OR')],
	  ['PA', getAverageScore(candyName, 'PA')],
	  ['RI', getAverageScore(candyName, 'RI')],
	  ['SC', getAverageScore(candyName, 'SC')],
	  ['SD', getAverageScore(candyName, 'SD')],
	  ['TN', getAverageScore(candyName, 'TN')],
	  ['TX', getAverageScore(candyName, 'TX')],
	  ['UT', getAverageScore(candyName, 'UT')],
	  ['VT', getAverageScore(candyName, 'VT')],
	  ['VA', getAverageScore(candyName, 'VA')],
	  ['WA', getAverageScore(candyName, 'WA')],
	  ['WV', getAverageScore(candyName, 'WV')],
	  ['WI', getAverageScore(candyName, 'WI')],
	  ['WY', getAverageScore(candyName, 'WY')]
    ]);

    var options = {
      region: 'US',
      displayMode: 'regions',
      resolution: 'provinces',
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}

function getAverageScore(candyName, abbreviation) {
	var avgScore = d3;
	
}
