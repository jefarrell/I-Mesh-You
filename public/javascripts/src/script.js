
$(window).bind("load", function(){

	$('body').on('click','a[href^="#"]',function(event){
	    var target_offset = $(this.hash).offset() ? $(this.hash).offset().top : 0;     
	    var customoffset = 45;
	    $('html, body').animate({scrollTop:target_offset - customoffset}, 500);
	});
	
    // Handy SVG conversion from stackoverflow
    // Lets us do some hover events on svg image paths
	$('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    $('#searchInput').keydown(function(event) {
        if (event.keyCode == 13) {
            $('#searchBtn').click();
            return false;
         }
    });

    $('#ksButton').on('click', function(e){
        e.preventDefault();
        window.open("http://www.kickstarter.com");
    });

    $('#emailSign').on('click', function() {
        var addr = $('#emailVal').val();
        $.get('/klaviyo', function(data) {
            data = JSON.parse(data);
            $.ajax({
              type: "POST",
              url: 'https://a.klaviyo.com/api/v1/list/rZtrXH/members',
              data: {
                email: addr,
                "\x61\x70\x69\x5F\x6B\x65\x79": data.key,
                confirm_optin: true
              }
            });

        });
    });

});