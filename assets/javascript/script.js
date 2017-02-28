const KEY = "48a3eb24334045c18a56943879cb540e";
const APIURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

$(document).ready(function()
{
	//Clears form when 'clear' button clicked
	$("#clear").on("click",function()
	{
		//code to clear form here
		
		//maybe this 
		//resets [] element of form.
		//$("form")[0].reset();
	});


	$("#search").on("click",function(){

		//UNCOMMENT and remove test code below	
		//var searchTerm = $("#searchTerm").val();
		//var number = $("#number").val();
		
		// //Years format need to be  YYYYMMDD
		// var startYear = $("#startYear").val(); 
		// var endYear = $("#endYear").val(); 

		var searchTerm = "France";  //test code
		var number = 10; 			//test code
		var startYear = 20100101;	//test code
		var endYear = 20170101;		//test code
			
		var url = APIURL;	
		
		url += '?' + $.param({
	  	'api-key': KEY,
	  	'q': searchTerm	,
	  	'begin_date' : startYear,		
	  	'end_date' : endYear				
		});

	 $.ajax({       
	    url: url,
	    method: "GET"
	  }).done(function(data) 
	  {			  
	      	//limits article returns to number
	      	for(var i = 0; i < number; i++)
	  		{
	  			//creates new elements
	  			var newDiv = $("<div>");
	  			var headline = $("<h1>");
	  			var authorP = $("<p>");
	  			var sectionP = $("<p>");
	  			var dateP= $("<p>");
	  			var link = $("<a>");

	  			//sets attr or html to those elements
	  			headline.html(data.response.docs[i].headline.main);
	  			authorP.html(data.response.docs[i].byline.original );
	  			sectionP.html(data.response.docs[i].section_name);
	  			dateP.html(data.response.docs[i].pub_date);
	  			link.attr('href', data.response.docs[i].web_url);
	  			link.html(data.response.docs[i].web_url);

	  			//appends element to newDiv
	  			newDiv.append(headline);
	 			newDiv.append(authorP);
	  			newDiv.append(sectionP);
	  			newDiv.append(dateP);
	  			newDiv.append(link);

	  			//appends newDiv to #results div
	  			$("#results").append(newDiv);

	  			//TEST CODE Displays data in console
	  			console.log("=========" + i + "==========");
	  			console.log(data.response);
	      		console.log("headline: " + data.response.docs[i].headline.main);
				console.log("section: " + data.response.docs[i].section_name);
				console.log("date: " + data.response.docs[i].pub_date);
				console.log("url: " + data.response.docs[i].web_url);
				console.log("author: "+	data.response.docs[i].byline.original ); 

			}//END for	      	
	     	
	    });//END $.ajax

	});//END on.click

});//END document.ready