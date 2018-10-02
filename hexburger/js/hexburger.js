$(document).ready(function() {
	$('.burger-listbutton').click(function(event) {
        $('body').toggleClass ('list-open');
    });

	$('.shopcar-menu > ul > li > a').click(function(event) {
		event.preventDefault();
        $(this).parent().addClass('click-color');
        $(this).parent().siblings().removeClass('click-color');
    });

    	$('.heart-empty').click(function(event) {
		event.preventDefault();
        $(this).siblings('.heart-full').toggleClass('heart-show');
    });
});	