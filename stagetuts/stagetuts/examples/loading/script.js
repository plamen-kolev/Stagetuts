$(document).ready(function(){
	var loading = 0;
	$("#button").click(function(){
		$(".container button").remove();
		$("#anim").show();
		$(".loading").show();
		animate();
		

	});
    //do some validation stuff

function animate(){
	if(loading/681*100<100){
		$("#anim p").html(parseInt(loading/681*100 )+ "%");
  } else {
  	$("#anim p").html("Loading done");
  	$("#anim").css({"background-color":"white","background-image":"none"});
  	$("#anim p").css({"color":"#535353"});
  }
	$("#anim").animate({
		backgroundPositionX: -loading/10+'%',
		"width" : loading/681*50+"%",
  },80, function(){});

	loading+=5;
	if (loading>688) {
		return true
	};
	setTimeout(animate, 80);
}




});