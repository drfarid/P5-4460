var counterUS = 0;
var clickedCandy = null;


google.charts.load('current', {
	    'packages':['geochart'],
	    'mapsApiKey': 'AIzaSyAgyOWtjPkSfyInVxvcdUY6wVGXIM7evDU'
});

google.setOnLoadCallback(function () {
    createMap(clickedCandy);
});



//main csv function that creates scatterplot and heatmap
d3.csv("candy.csv", function(csv) {
    var actualReviews = csv.filter(function(d){

    });


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
	var avgScore = d3.
	
}
