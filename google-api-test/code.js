

//======================= Yelp! endpoint search constants ====================== 

//Key for API
const API_KEY = "&key=AIzaSyB4cUV0TF4Hq3ymlHra7bBS-lemrd3XDk8";

//Yelp endpoint containing search 
const GOOGLE_ENDPOINT = "https://maps.googleapis.com/maps/api/place/details/json";



//======================= variables =================================

var searchTerm;
var location;


$("#submit").on("click", function(event){

 	event.preventDefault();

 	PlaceDetailsByPlaceId();
	

	// var searchTerm = "& =" + $("#search").val().trim();
	// var location = "& =" + $("#location").val().trim();        
	// var name= "";
	// var lat = "";
	// var long = "";
	// var rating = "";
	// var resultsArray= [];

//   placeid or reference (you must supply one of these, but not both):
// placeid — A textual identifier that uniquely identifies a place, returned from
// a Place Search. For more information about place IDs, see the place ID
// overview.

	
	
	 //var queryURL = GOOGLE_ENDPOINT + 

	// $.ajax({
	//       url: queryURL,
	//       method: "GET"
	//     }).done(function(response) {

	//     	console.log(response);


	//     });

});//END #submit on."click"


function PlaceDetailsByPlaceId()
{




//google places endpoint containing search 
const PLACE_DETAILS_ENDPOINT = "https://maps.googleapis.com/maps/api/place/details/json";

//tried changing https to http ->  same error.

//some "place id" for testing
var placeId = "?placeid=" + encodeURI("ChIJN1t_tDeuEmsRUsoyG83frY4");//some "place id" for testing

var queryURL = PLACE_DETAILS_ENDPOINT + placeId + API_KEY;

console.log("queryURL: '" + queryURL+"'");//TEST CODE

	$.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {

	    	console.log(response);

	});//END $.ajax

}


// error: No 'Access-Control-Allow-Origin' header is present on the requested resource

// when I click on URL JSON object shows up in browser



function testGeo()
{

	var location = "new york, ny";

	var addressRequest = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + API_KEY;
		
	$.ajax({
		url: addressRequest,
		method: "GET"

	}).done (function(response){
		console.log(response);
	});

}//END testGeo