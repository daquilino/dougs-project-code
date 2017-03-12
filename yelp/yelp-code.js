

var yelpObject;
var yelpBusArray;


//=============================================================================================
const YELP_HEROKU_ENDPOINT = "https://floating-fortress-53764.herokuapp.com/"

$("#submit").on("click", function(event){

 	event.preventDefault();
	
	var searchTerm = "?term=" + $("#search").val().trim();
	var place = "&location=" + $("#location").val().trim();        
	var radius ="&radius=" + $("#radius").val();

	//hard coded for testing
	 searchTerm = "?term=pizza";
	 place = "&location=08833";



	var queryURL = YELP_HEROKU_ENDPOINT + searchTerm + place + radius;
	console.clear();
	console.log("queryURL: " + queryURL);

	$.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {

	    	yelpObject = JSON.parse(response);
	    	yelpBusArray = yelpObject.businesses;

	    	// console.log("response");
	    	 //console.log(response);

	    	// console.log("yelpBusArray");
	    	// console.log(yelpBusArray);

	    	test();

	    });

});//END #submit on."click"


function test()
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





/*								------------	NOTES	 ------------

	to index.php
		add 
			radius
			&sort_by="rating"
	

	sort_by	string	Optional. Sort the results by one of the these modes: best_match, rating, review_count or distance. By default it's best_match. The rating sort is not strictly sorted by the rating value, but by an adjusted rating value that takes into account the number of ratings, similar to a bayesian average. This is so a business with 1 rating of 5 stars doesn’t immediately jump to the top.

	
	"region": {
        "center": {
            "longitude": -74.839449791569,
            "latitude": 40.632169836397
        }
    },
    "businesses": [
        {
            "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/Cm0Ehf29BbWIvBMoyT1dvw/o.jpg",
            "name": "Dominick's Pizza Shoppes",
            "display_phone": "(908) 735-4412",
            "transactions": [],
            "coordinates": {
                "longitude": -74.905768856406,
                "latitude": 40.637681409717
            },
            "price": "$",
            "categories": [
                {
                    "title": "Pizza",
                    "alias": "pizza"
                },
                {
                    "title": "Italian",
                    "alias": "italian"
                }
            ],
            "rating": 4,
            "phone": "+19087354412",
            "id": "dominicks-pizza-shoppes-clinton",
            "location": {
                "zip_code": "08809",
                "state": "NJ",
                "city": "Clinton",
                "address3": "",
                "display_address": [
                    "44 Old Hwy 22",
                    "Clinton, NJ 08809"
                ],
                "address1": "44 Old Hwy 22",
                "address2": "",
                "country": "US"
            },
            "review_count": 31,
            "distance": 5301.38724425,
            "url": "https://www.yelp.com/biz/dominicks-pizza-shoppes-clinton?adjust_creative=YJbntjTRUBbO4jBqZxzFFQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=YJbntjTRUBbO4jBqZxzFFQ",
            "is_closed": false
        },


*/