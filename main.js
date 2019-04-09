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


d3.csv("candy.csv", function(csv) {
    // for (var i=0; i<csv.length; ++i) {
		// 	csv[i].Q1_GOING_OUT = String(csv[i].Q1_GOING_OUT);
		// 	csv[i].Q2_GENDER = String(csv[i].Q2_GENDER);
		// 	csv[i].Q3_AGE = String(csv[i].Q3_AGE);
		// 	csv[i].Q4_COUNTRY = String(csv[i].Q4_COUNTRY);
		// 	csv[i].Q5_STATE_PROVINCE_COUNTRY_ETC = String(csv[i].Q5_STATE_PROVINCE_COUNTRY_ETC);
		// 	csv[i].Q6_Any_full_sized_candy_bar = String(csv[i].Q6_Any_full_sized_candy_bar);
		// 	csv[i].Q6_Butterfinger = String(csv[i].Q6_Butterfinger);
		// 	csv[i].Q6_Candy_Corn = String(csv[i].Q6_Candy_Corn);
		// 	csv[i].Q6_Chiclets = String(csv[i].Q6_Chiclets);
		// 	csv[i].Q6_Dots = String(csv[i].Q6_Dots);
		// 	csv[i].Q6_Fuzzy_Peaches = String(csv[i].Q6_Fuzzy_Peaches);
		// 	csv[i].Q6_Good_N_Plenty = String(csv[i].Q6_Good_N_Plenty);
		// 	csv[i].Q6_Gummy_Bears_straight_up = String(csv[i].Q6_Gummy_Bears_straight_up);
		// 	csv[i].Q6_Healthy_Fruit = String(csv[i].Q6_Healthy_Fruit);
		// 	csv[i].Q6_Heath_Bar = String(csv[i].Q6_Heath_Bar);
		// 	csv[i].Q6_Hershey_s_Dark_Chocolate = String(csv[i].Q6_Hershey_s_Dark_Chocolate);
		// 	csv[i].Q6_Hershey_s_Milk_Chocolate = String(csv[i].Q6_Hershey_s_Milk_Chocolate);
		// 	csv[i].Q6_Hershey_s_Kisses = String(csv[i].Q6_Hershey_s_Kisses);
		// 	csv[i].Q6_Jolly_Rancher_bad_flavor = String(csv[i].Q6_Jolly_Rancher_bad_flavor);
		// 	csv[i].Q6_Jolly_Ranchers_good_flavor = String(csv[i].Q6_Jolly_Ranchers_good_flavor);
		// 	csv[i].Q6_Junior_Mints = String(csv[i].Q6_Junior_Mints);
		// 	csv[i].Q6_Kit_Kat = String(csv[i].Q6_Kit_Kat);
		// 	csv[i].Q6_LaffyTaffy = String(csv[i].Q6_LaffyTaffy);
		// 	csv[i].Q6_LemonHeads = String(csv[i].Q6_LemonHeads);
		// 	csv[i].Q6_Licorice_not_black = String(csv[i].Q6_Licorice_not_black);
		// 	csv[i].Q6_Licorice_yes_black = String(csv[i].Q6_Licorice_yes_black);
		// 	csv[i].Q6_Lollipops = String(csv[i].Q6_Lollipops);
		// 	csv[i].Q6_Mike_and_Ike = String(csv[i].Q6_Mike_and_Ike);
		// 	csv[i].Q6_Milk_Duds = String(csv[i].Q6_Milk_Duds);
		// 	csv[i].Q6_Milky_Way = String(csv[i].Q6_Milky_Way);
		// 	csv[i].Q6_Regular_M_Ms = String(csv[i].Q6_Regular_M_Ms);
		// 	csv[i].Q6_Peanut_M_M_s = String(csv[i].Q6_Peanut_M_M_s);
		// 	csv[i].Q6_Mint_Kisses = String(csv[i].Q6_Mint_Kisses);
		// 	csv[i].Q6_Mr_Goodbar = String(csv[i].Q6_Mr_Goodbar);
		// 	csv[i].Q6_Nerds = String(csv[i].Q6_Nerds);
		// 	csv[i].Q6_Nestle_Crunch = String(csv[i].Q6_Nestle_Crunch);
		// 	csv[i].Q6_Peeps = String(csv[i].Q6_Peeps);
		// 	csv[i].Q6_Pixy_Stix = String(csv[i].Q6_Pixy_Stix);
		// 	csv[i].Q6_Reese_s_Peanut_Butter_Cups = String(csv[i].Q6_Reese_s_Peanut_Butter_Cups);
		// 	csv[i].Q6_Reese_s_Pieces = String(csv[i].Q6_Reese_s_Pieces);
		// 	csv[i].Q6_Rolos = String(csv[i].Q6_Rolos);
		// 	csv[i].Q6_Skittles = String(csv[i].Q6_Skittles);
		// 	csv[i].Q6_Snickers = String(csv[i].Q6_Snickers);
		// 	csv[i].Q6_Sourpatch_Kids_i_e_abominations_of_nature = String(csv[i].Q6_Sourpatch_Kids_i_e_abominations_of_nature);
		// 	csv[i].Q6_Starburst = String(csv[i].Q6_Starburst);
		// 	csv[i].Q6_Swedish_Fish = String(csv[i].Q6_Swedish_Fish);
		// 	csv[i].Q6_Tic_Tacs = String(csv[i].Q6_Tic_Tacs);
		// 	csv[i].Q6_Three_Musketeers = String(csv[i].Q6_Three_Musketeers);
		// 	csv[i].Q6_Tolberone_something_or_other = String(csv[i].Q6_Tolberone_something_or_other);
		// 	csv[i].Q6_Trail_Mix = String(csv[i].Q6_Trail_Mix);
		// 	csv[i].Q6_Twix = String(csv[i].Q6_Twix);
		// 	csv[i].Q6_Whatchamacallit_Bars = String(csv[i].Q6_Whatchamacallit_Bars);
		// 	csv[i].Q6_York_Peppermint_Patties = String(csv[i].Q6_York_Peppermint_Patties);
		// 	csv[i].Q7_JOY_OTHER = String(csv[i].Q7_JOY_OTHER);
		// 	csv[i].Q8_DESPAIR_OTHER = String(csv[i].Q8_DESPAIR_OTHER);
		// 	csv[i].Q9_OTHER_COMMENTS = String(csv[i].Q9_OTHER_COMMENTS);
		// }
		console.log(csv[0]);
  //   var satmExtent = d3.extent(csv, function(row) { return row.SATM; });
  //   var satvExtent = d3.extent(csv, function(row) { return row.SATV; });
  //   var actExtent = d3.extent(csv,  function(row) { return row.ACT;  });
  //   var gpaExtent = d3.extent(csv,  function(row) {return row.GPA;   });    

    
  //   var satExtents = {
	// "SATM": satmExtent,
	// "SATV": satvExtent
  //   }; 
	// });


  //   // Axis setup
  //   xScale = d3.scaleLinear().domain(satmExtent).range([50, 470]);
  //   yScale = d3.scaleLinear().domain(satvExtent).range([470, 30]);
 
  //   xScale2 = d3.scaleLinear().domain(actExtent).range([50, 470]);
  //   yScale2 = d3.scaleLinear().domain(gpaExtent).range([470, 30]);
     
  //   var xAxis = d3.axisBottom().scale(xScale);
  //   var yAxis = d3.axisLeft().scale(yScale);
  
  //   var xAxis2 = d3.axisBottom().scale(xScale2);
  //   var yAxis2 = d3.axisLeft().scale(yScale2);

  //   //Create SVGs for charts
  //   var chart1 = d3.select("#chart1")
	//                 .append("svg:svg")
	//                 .attr("width",width)
	// 								.attr("height",height);


  //   var chart2 = d3.select("#chart2")
	//                 .append("svg:svg")
	//                 .attr("width",width)
	//                 .attr("height",height);

	//  //add scatterplot points
  //    var temp1= chart1.selectAll("circle")
	//    .data(csv)
	//    .enter()
	//    .append("circle")
	//    .attr("id",function(d,i) {return i;} )
	//    .attr("stroke", "black")
	//    .attr("cx", function(d) { return xScale(d.SATM); })
	//    .attr("cy", function(d) { return yScale(d.SATV); })
	//    .attr("r", 5)
	//    .on("click", function(d,i){ 
	// 			console.log(document.getElementById("satm").innerHTML = d.SATM);
	// 			console.log(document.getElementById("satv").innerHTML = d.SATV);
	// 			console.log(document.getElementById("gpa").innerHTML = d.GPA);
	// 			console.log(document.getElementById("act").innerHTML = d.ACT);
	// 			selected = d;
	// 			chart1.selectAll("circle").attr("fill", function(thisGuy) {
	// 				return "black";
	// 			});
	// 			chart1.selectAll("circle").attr("stroke", function(thisGuy) {
	// 				return "black";
	// 			});
	// 			chart2.selectAll("circle").attr("fill", function(thisGuy) {
	// 				if (thisGuy == selected) {
	// 					return "red";
	// 				}
	// 				return "black";
	// 			});
	// 			chart2.selectAll("circle").attr("stroke", function(thisGuy) {
	// 				if (thisGuy == selected) {
	// 					return "red";
	// 				}
	// 				return "black";
	// 			});
  //      });
    


  //   chart1 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(0,"+ (width -30)+ ")")
	// 	.call(xAxis) // call the axis generator
	// 	.append("text");

  //   chart1 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(50, 0)")
	// 	.call(yAxis)
	// 	.append("text");

	// 	chart1 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(0,"+ (width -30)+ ")")
	// 	.append("text")
	// 	.attr("x", width-16)
	// 	.attr("y", -6)
	// 	.style("text-anchor", "end")
	// 	.text("SATM");

	// 	chart1 // or something else that selects the SVG element in your visualizations
	// 	.append("g") // create a group node
	// 	.attr("transform", "translate(50, 0)")
	// 	.append("text")
	// 	.attr("transform", "rotate(-90)")
	// 	.attr("y", 6)
	// 	.attr("dy", ".71em")
	// 	.style("text-anchor", "end")
	// 	.text("SATV");

	});