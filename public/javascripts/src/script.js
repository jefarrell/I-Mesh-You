
$(document).ready(function(){
	$('body').on('click','a[href^="#"]',function(event){
	    var target_offset = $(this.hash).offset() ? $(this.hash).offset().top : 0;     
	    var customoffset = 45;
	    $('html, body').animate({scrollTop:target_offset - customoffset}, 500);
	});
});