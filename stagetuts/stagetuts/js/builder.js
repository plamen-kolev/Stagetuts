
$(document).ready(function() {  // Executes below if jquery is ready
  $.support.cors = true;
  var compatable = true;

  if($(".image-gal-container").is(":empty")){
    $(".gallery_text h1 a").html("<span class='warning'>Browser security prevents the content to be read, please view the chached version <a href='cache/html.html'>here.</a> View the documentation for more information...</span>");
  }

  $('form').submit(false);  // Disable the submit functionality, because the search box does not work
  
  var urlPath = window.location.search; // The following code changes the color on the selected item, also makes the portable menu hide itself

  if(!urlPath){
    $(".homepage-link").css("color","#ff7800");
  } else if(urlPath=="?html"){
  $(".html-link").css("color","#ff7800");
  } else if(urlPath=="?jquery"){
  $(".jquery-link").css("color","#ff7800");
  } else if(urlPath=="?regexp"){
    $(".regexp-link").css("color","#ff7800");
  }

  $(".toggle-small").click(function(){  // Makes the menu collapse when clicked
    $("#menu-click").slideToggle("slow");
  });


//  ========================= Carousel script framework from http://unslider.com/ =========================== 
  $(function() {
      $('.carousel').unslider({
          speed: 1000,               //  The speed to animate each slide (in milliseconds)
          delay: 3000,              //  The delay between slide animations (in milliseconds)
          complete: function() {},  //  A function that gets called after every slide animation
          keys: true,               //  Enable keyboard (left, right) arrow shortcuts               //  Display dot navigation
      });
  });

//  ============ This dynamically generates the gallery thumbnail and content-summary =========

  var contentArray = [];
  // Contains the structured info from the xml
  $.get("datasheet.xml", function(data) { // Read from the datafile

    var urlPath = window.location.search;
    if(urlPath=="?html"){                       // This chunk of if/else dynamically selects the type of tutorial you are searching for
      var results = $(data).find("html-content html-tut");  // Result is useful for checking the length of 
      //the content to be generated and also for extracting data from it

    } else if(urlPath=="?jquery"){
      var results = $(data).find("html-content jquery-tut");

    } else if(urlPath=="?regexp"){
      var results = $(data).find("html-content regexp-tut");
    } else{

    }

    // Create containers for the content from the xml dynamicaly
    for(var i=1;i<results.length;i++){  // off by one because the first container is already there
      $("#gallery-content > div:first").clone().addClass("tutorial"+(i+1)+"").appendTo("#gallery-content"); // dynamically renames the container class to tut1,2,3 etc...
    }
    $("#gallery-content > div:first").addClass("tutorial1");  


    results.each(function(){

     // Extract every single article's content 
      var content = {
        "image" :   $(this).find("thumbnail-image").text(),
        "title" :   $(this).find("header").text(),
        "content" : $(this).find("content-summary").text(),
        "author"  : $(this).find("content-meta author").text(),
        "date"  :   $(this).find("content-meta date").text(),
        "difficulty" : $(this).find("content-meta difficulty").text(),
        "rating"  : $(this).find("content-meta rating").text(),
        "link-id" : "fullview.html?" + $(this).find("id").text()
      }

    contentArray.push(content); // Fills the array with an associative data that is stripped and filled later
    });


// Fill the generated boxes with the article data extracted from the xml
    for(var i=0;i<contentArray.length;i++){
      $(".tutorial"+(i+1)+" .image-gal-container").append("<img src="+contentArray[i]['image']+"/>");
      $(".tutorial"+(i+1)+" .col-md-7 h1 a").html(contentArray[i]['title']);
      $(".tutorial"+(i+1)+" .col-md-7 h1 a").attr("href",contentArray[i]['link-id']);
      $(".tutorial"+(i+1)+" .col-md-7 p").append(contentArray[i]['content']);
      $(".tutorial"+(i+1)+" .col-md-2 .posted").append(contentArray[i]['author']);
      $(".tutorial"+(i+1)+" .col-md-2 .date").append(contentArray[i]['date']);
      $(".tutorial"+(i+1)+" .col-md-2 .dificulty").append(contentArray[i]['difficulty']);
      $(".tutorial"+(i+1)+" .col-md-2 a").attr("href", contentArray[i]["link-id"]);
     
      var res = parseInt(contentArray[i]['rating']);  // Takes the rating from the xml file

      for(var n=0;n<res;n++){ // Generates the star rating
        $(".tutorial"+(i+1)+" .col-md-2 .stars p").append("<span class='glyphicon glyphicon-star'></span>");  // Generates the glyph sumbol as much times as the xml result
      }
    }
  });
  

  // ================ Generates the tutorial page itself

  $.get( "datasheet.xml", function( data ) {
    var id = window.location.search.split("?"); // Get the id of the tutorial that has to be displayed
    var result = id[1];

    var content = $(data).find("id").filter(function(){ return $(this).text() == result;}).parent();	// Find everything that has this id
    $("#fullview-heading").html($(content).find("header").text());
    $("#fullview-paragraph").html($(content).find("content").text());
    // this will dynamically change the title to the name of the tutorial
  });

  // ============ Detecting the scrollbar and changing the menu ==============

  $(window).scroll(function () {
    var width = $('body').width();
  	if($(window).scrollTop()>800 && width>500){
      if ($(window).scrollTop() + $(window).height() > 400) {
        $(".navbar").attr("id","smaller-navbar");
      }
      
    } else {
    	if($(window).scrollTop() < 2){ // If the scrollbar is at the top, remove the small menu
        $(".navbar").removeAttr("id","smaller-navbar");
      }
    }
  });

  // Dropdown small functionality below


  // ================= Javascript for the box generator


  // Listen for a keystroke in the 3 input fields
  $('#shadow-input1, #shadow-input2, #shadow-input3 ').bind("keyup", function() {    
    
    // then reasign the box shadow properties
    var shadowVal1 = $('#shadow-input1').val();
    var shadowVal2 = $('#shadow-input2').val();
    var shadowVal3 = $('#shadow-input3').val();
    $("#shadow-tutorial").css('box-shadow', shadowVal1 + 'px '+ shadowVal2 +'px '+ shadowVal3 +'px #888');
    $("#boxshadow-result").val("box-shadow:"+ shadowVal1 + 'px '+ shadowVal2 +'px '+ shadowVal3 +'px #888');
  });
  // same but for radius
  $('#radius-input1, #radius-input2, #radius-input3, #radius-input4').bind("keyup", function() {    
    // then reasign the radius properties
    var radiusVal1 = $('#radius-input1').val(); //Bottom left
    var radiusVal2 = $('#radius-input2').val(); //Top Left
    var radiusVal3 = $('#radius-input3').val(); //Bottom Right
    var radiusVal4 = $('#radius-input4').val(); //Top Right:
    $("#radius-tutorial").css
    ({
      "-webkit-border-top-left-radius":     + radiusVal2 + "px",
      "-webkit-border-top-right-radius":    + radiusVal4 + "px",
      "-webkit-border-bottom-right-radius": + radiusVal3 + "px",
      "-webkit-border-bottom-left-radius":  + radiusVal1 + "px",
      "-moz-border-radius-topleft":         + radiusVal2 + "px",
      "-moz-border-radius-topright":        + radiusVal4 + "px",
      "-moz-border-radius-bottomright":     + radiusVal3 + "px",
      "-moz-border-radius-bottomleft":      + radiusVal1 + "px",
      "border-top-left-radius":             + radiusVal2 + "px",
      "border-top-right-radius":            + radiusVal4 + "px",
      "border-bottom-right-radius":         + radiusVal3 + "px",
      "border-bottom-left-radius":          + radiusVal1 + "px",
    });
    $("#boxradius-result").val("-webkit-border-top-left-radius:" +radiusVal2+"px;-webkit-border-top-right-radius:" + radiusVal4 + "px;-webkit-border-bottom-right-radius:" + radiusVal3 + "px;-webkit-border-bottom-left-radius:" + radiusVal1 + "px;-moz-border-radius-topleft:" + radiusVal2 + "px;-moz-border-radius-topright:" + radiusVal4 + "px;-moz-border-radius-bottomright:" + radiusVal3 +"px;-moz-border-radius-bottomleft:" + radiusVal1 + "px;border-top-left-radius:" + radiusVal2 +"px;border-top-right-radius:" + radiusVal4 + "px;border-bottom-right-radius:" + radiusVal3 + " 4px;border-bottom-left-radius:" + radiusVal1 + "px");
  });

  $('#height, #width, #bg-color, #color, #text-button').bind("keyup", function() {    
    console.log("not");
    var val1 = $('#height').val(); 
    var val2 = $('#width').val(); 
    var val3 = $('#bg-color').val(); 
    var val4 = $('#color').val();
    var val5 = $('#text-button').val();
    $("#button-tutorial").css
    ({
     "height" : + val1 +  "px" ,
     "width":val2,
     "background":val3,
     "color":val4
    });
    $("#button-tutorial").html(val5);
   $("#button-result").val("height:" + val1 + "; width:" + val2 + "; background:" + val3 + "; color:" + val4 + ";");
  });


});