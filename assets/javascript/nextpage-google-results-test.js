/*
	Problem: When text search is calles only 20 results (per page) are returned.

	Solution:
		Try to use next_page_token and page_token to get all pages of results.
		and push to googleResults array.





	Steps:

		Make sure functions work correctly since change.

		get next_page_token form response.

		call getData using page token
		
		define end condition ie if page_token = null/undefined?


*/


const GOOGLE_GEOCODE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json?address=";

const GOOGLE_TEXT_SEARCH_ENDPOINT = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";

//const GOOGLE_API_KEY = "&key=AIzaSyCisdCKvECDpmY8Cm1_GK6W2-8PhCDUobg";

//const GOOGLE_API_KEY = "&key=AIzaSyB4cUV0TF4Hq3ymlHra7bBS-lemrd3XDk8";

//const GOOGLE_API_KEY = "&key=AIzaSyBMtpw9J24QyKFeZvwT0eOUOjrJOdMwqsg";

//const GOOGLE_API_KEY = "&key=AIzaSyDkzu9akOOSM5reut2bCo00mvJIGsxLpeM";

const GOOGLE_API_KEY = "&key=AIzaSyDr-DLJtSliHGOsZhoI76ETn6jsk8kVYGo";
						
//Array of results objects
var googleResults=[];
var x;
var next_page_token_global;

 var topic = "pizza";
 var radius = 8064;
 var coordinates;

$("#submitTopic").on("click", function(event){

	event.preventDefault();
	
	//var topic = "pizza";
	//var location = "new york, ny";

	topic = $("#searchInput").val().trim();
	var location = $("#locationInput").val().trim();	
	//var radius = 8064;

	googleResults = [];//clears out google results.
	
	x = 1;
	
	runGoogleQuery(topic, location, radius)

});


$("#nextpage").on("click", function(event){

	event.preventDefault();
	
	getData (topic, coordinates, radius, next_page_token_global);

});

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

			coordinates = "&location=" + latitude + "," + longitude;

				next_page_token = "";
				//var next_page_token = "";
		
				getData(topic, coordinates, radius, next_page_token);
			

		});//END ajax textSearchUrl					


		// test();//TEST CODE
	
		
	}//END runGoogleQuery 


//========================================================================

	function getData (topic, coordinates, radius, next_page_token)
	{
console.log("=================== getData run " + x + " ================");
			
			var page_token = "&page_token=" + next_page_token;
			
console.log("page_token: " + page_token);	

			var textSearchUrl = GOOGLE_TEXT_SEARCH_ENDPOINT + topic + coordinates + "&radius=" + radius+ page_token + GOOGLE_API_KEY;		

			$.ajax({
			url: textSearchUrl,
			method: "GET"

			})
			.done (function(finalResponse)
			{
			
console.log("finalResponse");
console.log(finalResponse);

				//get next_page_token for next results page
				next_page_token_global = finalResponse.next_page_token;		

//console.log("next_page_token: " + next_page_token_global);

				finalResponse.results.forEach(function(element)
				{

					googleResults.push(element);

				});


  console.log("=== googleResults =====");
 console.log(googleResults);
				
			x++;
				
			if(next_page_token !== undefined)	
			{

				console.log("NEXT PAGE TOKEN EXISTS");

			}
			else
			{
				console.log("NEXT PAGE TOKEN UNDEFINED");

			}



				// while(next_page_token !== undefined)
				// {
				//  	getData (topic, coordinates, radius, next_page_token);
					
				// }//END while		


	});//END ajax 			

		

	}//END getData


