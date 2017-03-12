

/*==============================================================================
================================ Variables ====================================
===============================================================================*/

const GOOGLE_GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json?location=";

const GOOGLE_TEXT_SEARCH_ENDPOINT = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";

const GOOGLE_API_KEY = "&key=AIzaSyCisdCKvECDpmY8Cm1_GK6W2-8PhCDUobg";


//Array of results objects
var googleResults;

//latitude initally set to middle of US
var latitude;// = 39.8282;
var longitude;// = -98.5795;

/* changeed to declared locally 
var zoom = 4;
var radius = 8064;//in meters 5 miles 
var topic = "";
var coordinates = "";
/*


/*==============================================================================
================================ Functions ====================================
===============================================================================*/



$(document).ready(function(){

	// I'm not sure if this needs to be in document.ready?
	$("#submitTopic").on('click', function(event){
		
		event.preventDefault();

		var topic = $("#searchInput").val().trim();
		var location = $("#locationInput").val().trim();
		var radius = 8064;

		//====================== TEST CODE ==============================
			//harded code in so I don't have to keep typing in when testing.
			//topic = "pizza";
			//location = "new york, ny";	
		//=================================================================
		console.log("topic: " + topic + " location: " + location);
		runGoogleQuery(topic, location, radius);


	});//END #submitTopic.on("click")

});//END document.ready


//========================================= runGoogle Query ===============================
	function runGoogleQuery(topic, location, radius) 
	{	
	
		var geocodeUrl = GOOGLE_GEOCODE_ENDPOINT + location + "&radius=" + radius + GOOGLE_API_KEY;

		$.ajax(
		{
			url: geocodeUrl,
			method: "GET"

		})
		.done (function(response)
		{

			latitude = response.results[0].geometry.location.lat;
			longitude = response.results[0].geometry.location.lng;

			var coordinates = "&location=" + latitude + "," + longitude;

			var textSearchUrl = GOOGLE_TEXT_SEARCH_ENDPOINT + topic + coordinates + "&radius=" + radius  + GOOGLE_API_KEY;		
console.log("textSearchUrl: " + textSearchUrl);
			
			$.ajax({
			url: textSearchUrl,
			method: "GET"

			})
			.done (function(finalResponse)
			{
console.log("=== finalResponse === ");
console.log(finalResponse);
				googleResults = finalResponse.results;


console.log("=== googleResults results ====");
console.log(googleResults);
	
				//sorts results by rating highest to lowest
				googleResults.sortByRatingDescending();


				//gets lat and lng of highest rated element
				latitude = googleResults[0].geometry.location.lat;
				longitude = googleResults[0].geometry.location.lng;

				// // see radiusToZoom function below
				// // zoom = radiusToZoom(radius);
				var zoom = 15; //this will change depending on radius

				//displays location on map of highest rated
				

				drawMap(latitude, longitude, zoom);


			});//END ajax textSearchUrl					

		});//END ajax geocodeUrl	



		// test();//TEST CODE
	
		
	}//END runGoogleQuery 


//============================= drawMap =============================================


function drawMap(latitude, longitude, zoom) 
{

	// If we show map when page firsts loads. this will give values default values.
	// Change this to current location.  
	if(latitude === undefined || longitude === undefined|| zoom === undefined)
	{
		latitude = 39.8282;
	 	longitude = -98.5795;
	 	zoom = 12;
	
		if(navigator.geolocation){

			navigator.geolocation.getCurrentPosition(function(position)
			{

				latitude = position.coords.latitude,
              	longitude = position.coords.longitude

				var uluru = {lat: latitude, lng: longitude};
  

	  			var map = new google.maps.Map(document.getElementById('map'), 
	  			{
	    			zoom: zoom,
	    			center: uluru
	  			});

	  			var marker = new google.maps.Marker({
				    position: uluru,
				    map: map,
				    
				    //different icon TEST CODE
				    icon:'ribbon-sm.png',
				    animation:google.maps.Animation.BOUNCE
  				});

	 
			});//END navigatior.geoloctaion.getCu...

		}//END if(navigator.geolocation)	

	}//END if


  // var uluru = new google.maps.LatLng(latitude, longitude);
  var uluru = {lat: latitude, lng: longitude};
  

  // var map = new google.maps.Map(document.getElementById('map'), 
  // {
  //   zoom: zoom,
  //   center: uluru
  // });
  
  // //Adds the Marker
  // var marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
    
  //   //different icon TEST CODE
  //   //icon:'ribbon-sm.png',
  //   //animation:google.maps.Animation.BOUNCE
  // });

  // 	marker.addListener('click', function() {
  //         map.setZoom(8);
  //         map.setCenter(marker.getPosition());
  //       });

}//END initMap


//=============================================================


// Converts radius in miles to approx zoom #
function radiusToZoom(radius)
{
    return Math.round(14-Math.log(radius)/Math.LN2);
}


//=============================================================

//converts miles to meters for radius
function radiusToMeters(radius)
{
	return parseInt((radius * 1000)/.62);
}


//====================================================================

//Creates new method for Array object.
//Uses JS built in array sorting method .sort()
//This is to sort ascending by ratting (greatest to least).	
Array.prototype.sortByRatingDescending = function()
{

	return this.sort(function(a, b){ return parseFloat(b.rating) - parseFloat(a.rating);} );	
}

//==========================================================================

//Creates new method for Array object.
//Uses JS built in array sorting method .sort()
//This is to sort descending by rating (least to greatest).	
Array.prototype.sortByRatingAscending = function()
{
	return this.sort(function(a, b){ return parseFloat(a.rating) - parseFloat(b.rating);} );
}


/*=======================================================================
==========================================================================
========================= TEST FUNCTIONS BELOW THIS LINE =================
=========================================================================
========================================================================*/


//=======================================================================

// JUST A TEST FUNCTION TO TEST SORTING BY RATING ASCENDING AND descending
function testSorts()
{

	console.log("============= original googleResults =============");
	console.log(googleResults);
	
	console.log("==== before sort array element index name rating ====");
	
	googleResults.forEach(function(element,index)
	{
		 console.log(index + ": name: " + element.name + " rating: " + element.rating);

	});

		// commented for testing
		//googleResults.sortByRatingAscending();
		
		// commented for testing
		googleResults.sortByRatingDescending();
		
	//===============================================================	

	console.log("============= after sort =============");

	googleResults.forEach(function(element,index)
	{
		 console.log(index + ": name: " + element.name + " rating: " + element.rating);

	});
	
}//END test

