/*			**************** NOTES *************************
		
			drop marker function.


			queryYelp


*/

/*==============================================================================
================================ Variables ====================================
===============================================================================*/




//latitude initally set to middle of US
var latitude;// = 39.8282;
var longitude;// = -98.5795;
var radius;
var postalCode;

//This is the map on the page.
var map; //TEST CODE marker1


/*==============================================================================
================================ Functions ====================================
===============================================================================*/

$(document).ready(function()
{

	// I'm not sure if this needs to be in document.ready?
	$("#submitTopic").on('click', function(event){
		
		event.preventDefault();


		//NEED TO CHECK INPUTS FOR VALIDITY
		var searchTerm = $("#searchInput").val().trim();
		var locationInput = $("#locationInput").val().trim();        
		//var radius ="&radius=" + radius from pull down menu


		//hard coded for testing
		 searchTerm = "pizza"; //TEST CODE
		 //place = "&location=08833";	//TEST CODE
		 var radius = 8064; //TEST CODE

		
		//if locationInput is blank, use zip from geolocation in search.
		if(locationInput === "")
		{
			place = postalCode;
		}
		else
		{
			place = loactionInput;
		}
			
	
		
		queryYelp(searchTerm, place, radius);

		
		//addMarker(latitude, longitude);//TEST For Marker
		


	});//END #submitTopic.on("click")

});//END document.ready


//========================================= runGoogle Query ===============================
	function queryYelp(searchTerm, place, radius) 
	{	


		const YELP_HEROKU_ENDPOINT = "https://floating-fortress-53764.herokuapp.com/"

		var queryURL = YELP_HEROKU_ENDPOINT + "?term=" + searchTerm + "&location="+ place + "&radius="+ radius;
	
	console.log("queryURL: " + queryURL);

		$.ajax({
		      url: queryURL,
		      method: "GET"
		    }).done(function(response) {

		    	var yelpBusinessesArray = JSON.parse(response).businesses;
		    	
		    	console.log("yelpBusinessesArray");
		    	console.log(yelpBusinessesArray);

		    	test(yelpBusinessesArray);

		    });



//============================ old code below here ==============
//=================================================================================		
		// .done (function(response)
		// {

		// 	latitude = response.results[0].geometry.location.lat;
		// 	longitude = response.results[0].geometry.location.lng;

		// 	var coordinates = latitude + "," + longitude;
			
		// 	var zoom = 15; //this will change depending on radius


		// 	drawMap(latitude, longitude, radius);
			
		// 	addMarker(latitude, longitude, locationInfo);

		// });//END ajax geocodeUrl	
		
	}//END runGoogleQuery 


//============================= drawMap =============================================


// Use Google Maps API to display a map of given parameters.
function drawMap(latitude, longitude, radius) 
{	
	var uluru = {lat: latitude, lng: longitude};
	
	var zoom = radiusToZoom(radius);

	//var
	map = new google.maps.Map(document.getElementById('map'),       //TEST CODE marker1 add var back
	{
		zoom: zoom,
		center: uluru
	});

}//END drawMap()

//============================= drawMap =============================================

//When page first loads this is called via <script> tag in html.
//Initally generic map is displayed of center USA showing whole country.
//If geolocation is detected map is displayed based on that location
//with a radius of about 5 miles.
function initMap() 
{

	//Inital map displayed coordinates of center of US.
	latitude = 39.8282;
	longitude = -98.5795;
	radius = 1000;
	drawMap(latitude, longitude, radius);

	//If goeloaction is detected display map of users locaction.
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(function(position)
		{
			latitude = position.coords.latitude;
          	longitude = position.coords.longitude;
          	radius = 5;
          	revGeoCode();
          	drawMap(latitude, longitude, radius);          
        });  
    }    

}//END initMap()

//=============================================================

//Converts radius in miles to approx zoom #
function radiusToZoom(radius)
{
    return Math.round(14-Math.log(radius)/Math.LN2);
}

//=============================================================

//Converts miles to meters for radius
function radiusToMeters(radius)
{
	return parseInt((radius * 1000)/.62);
}

//====================================================================

//DONT THINK I NEED ANYMORE
// function getGeoLocation()
// {
// 	if(navigator.geolocation)
// 	{
		
// 		navigator.geolocation.getCurrentPosition(function(position)
// 		{
// 			latitude = position.coords.latitude;
//           	longitude = position.coords.longitude;
        
//           	console.log("geo lat: " + latitude);
//           	console.log("geo long: " + longitude);
//         });
//     }    
      
// }//END getGeoLocation

//====================================================================

//Used Google API geocode to return a zip code from latitue and longitude.
function revGeoCode()
{

	const GOOGLE_GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
	const GOOGLE_API_KEY = "&key=AIzaSyCisdCKvECDpmY8Cm1_GK6W2-8PhCDUobg";
	
	//corrdinates string used in endpoint from latitude and longitude
	var coordinates = latitude + "," + longitude;

	//REVERSE GEOCODE LOOK UP 
	var geocodeUrl = GOOGLE_GEOCODE_ENDPOINT + coordinates + "&result_type=postal_code" + GOOGLE_API_KEY;

	$.ajax(
	{
		url: geocodeUrl,
		method: "GET"

	})
	.done (function(response)
	{			
		postalCode = response.results[0].address_components[0].long_name;					
	});//END ajax geocodeUrl
		
}// END revGeoCode()

//=============================================================================


function addMarker(	businessInfo)//locationInfo object containing 
{
	var uluru = {lat: latitude, lng: longitude};

	var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    
    //different icon TEST CODE
    //icon:'ribbon-sm.png',
    //animation:google.maps.Animation.BOUNCE
	
	});//END marker

 
  	var infoWindowData = 
    	'<div class="infoWindow">'+
   		'<div id="siteNotice">'+
   		
   		'</div>'+
   		
   		'<h1 id="firstHeading" class="firstHeading">' + infowindowName + '</h1>'+ "<br>" +
   
   		'<div id="bodyContent">'+ '<p>Address here' + '</p>' + '<br>' +
   		'<p>' + '<a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
   		'https://en.wikipedia.org/w/index.php?title=link to address here</a>' + ' </p>';

     
        
        var infowindow = new google.maps.InfoWindow({
         content: infoWindowData
       	});

   	marker.addListener('click', function() {      

          infowindow.open(map, marker);
        });

}//END addMarker()




		/*=======================================================================
		==========================================================================
		========================= TEST FUNCTIONS BELOW THIS LINE =================
		=========================================================================
		========================================================================*/



				function test(yelpBusArray)
				{


					console.log("===== yelpBusArray results =========");
					console.log("number of businesses: " + yelpBusArray.length);

					// yelpBusArray.forEach(function(element)
					// {
					// 	console.log("rating: " + element.rating);
					// 	console.log("review count: " + element.review_count);
					// 	console.log("distance: " + element.distance);		
					// 	console.log("-------------------------------");
					// });
					console.log("========= THE BEST ==========");
					console.log(yelpBusArray[0]);


				}//END TEST()