$(document).ready(function () {

    $(window).scroll(function () {
        tbScroll();
    });

      $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').addClass('xoay');
            } else {
                $('.scrollToTop').removeClass('xoay');
            }
        });
        //Click event to scroll to top
        $('.scrollToTop').click(function(){
            $('html, body').animate({scrollTop : 0},800);
            return false;
        });
        
    function tbScroll() {

        $("#fixedBottom").removeClass("hiding");
        var scTop = $(window).scrollTop();
        if (scTop === 0) {
            $("#fixedTop").addClass("hiding");
        } else {
            $("#fixedTop").removeClass("hiding");
        }
        
        //스크롤 끝 이벤트
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            $("#fixedBottom").addClass("hiding");
        } else{
            $("#fixedBottom").removeClass("hiding");
        }



    }

    $("#fixedTop").on("click", function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            $("#fixedTop").addClass("hiding");
        });
        return false;

    })
    $("#fixedBottom").on("click", function () {
        var scrollBottom = $(document).height() + $(window).height();
        $('html, body').animate({
            scrollTop: scrollBottom
        }, 500, function () {
            $("#fixedBottom").addClass("hiding");
        });
        return false;

    })


	//footer
	$(".footer-title").on("click", function(){
		if($(window).width() < 992){
			
			var $this = $(this).parent().find(".footer-menu");
			$.each($(".footer-menu").not($this), function () {
					var $_this = $(this);
					$_this.slideUp(250);
			});
			

			$(this).parent().find(".footer-menu").slideDown();
		}
		
		

	})

})

$(window).resize(function () {

    if (this.resizeTO) clearTimeout(this.resizeTO);

    this.resizeTO = setTimeout(function () {
        $(this).trigger('resizeEnd');
    }, 500);

});

$(".vote input[type='radio']").on("click", function () {
    if ($(this).parent().hasClass("on")) {
        $(this).parent().removeClass("on");
    } else {
        $(".check").removeClass("on");
        $(this).parent().addClass("on");
    }
})
