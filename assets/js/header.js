$(document).ready(function () {
   
    // định dạng number
    function addCommas(number) {
        number += '';
        x = number.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    number = $(".number");
    for (i = 0; i < number.length; i++) {
    
       
       var value= addCommas(number[i].innerHTML.trim())
        number[i].innerHTML = value+" VNĐ";
    }
    // định dạng number
    $(".top-menu-link").on("mouseover", function(){
		var topIdx = $(this).parent().index();
		if(topIdx === 0){
			
			
			
		} else if(topIdx === 1){
			if($(this).hasClass("login-link")){
				
			} else if($(this).hasClass("logout-link")){
			
			}			
		} else if(topIdx === 2){
			
		
		} else if(topIdx === 3){
		
		} else if(topIdx === 4){
			
		} else if(topIdx === 5){
			
		}
	}).on("mouseout", function(){
		var topIdx = $(this).parent().index();
		if(topIdx === 0){
			
			
		} else if(topIdx === 1){
			if($(this).hasClass("login-link")){
				
			} else if($(this).hasClass("logout-link")){
			
			}			
		} else if(topIdx === 2){
			
		} else if(topIdx === 3){
			
		} else if(topIdx === 4){
			
		} else if(topIdx === 5){
			
		}
	})
    $("#fixedTop").on("click", function(){
        $( 'html, body' ).stop().animate( { scrollTop : '700' } )
        
    })



    // GNB
    headerInit();
    $(window).scroll(function () {
        headerInit();
    });

    function headerInit() {
        var scTop = $(window).scrollTop();
        var hh = $('#header').height();
        if ($(window).width() > 997) {
            if (scTop >= hh) {
				//스크롤이 맨위가 아닐 경우
                $('.wrapper').addClass('onScroll');
                $('#header').addClass('on-fixed');
				
				
				if($(".apop-wrap").css("display") !== "none"){
					$(".apop-wrap").hide();
				}
				if($(".cpop-wrap").css("display") !== "none"){
					$(".cpop-wrap").hide();
				}
            } else {
                //스크롤이 맨위일 경우
				$('.wrapper').removeClass('onScroll');
                $('#header').removeClass('on-fixed');
				
				$("#header").find(".top").show();
            }

        }

    }
    $(".menu-item-link").on("mouseenter", function () {
        if ($(window).width() > 1200) {
            $(".menu-item-depth2").hide();
            $(this).parent().find(".menu-item-depth2").show();
        }

    })
	$(".header-logo").on("mouseenter", function(){
		if ($(window).width() > 1200) {
            $(".menu-item-depth2").hide();
        }
	})
    $(".header").on("mouseleave", function () {

        if ($(window).width() > 1200) {
            $(".menu-item-depth2").hide();
        }

    });

    $(".menu-item-link").on("click", function (e) {		
        if ($(window).width() < 1200) {
             $("menu-item").removeClass("on");
                $(this).parent().addClass("on");
                $(this).parent().find(".menu-item-depth2").toggle(200);
        }
    })


    $(".header-toggle").on("click", function () {
        if ($(window).width() < 1200) {
			$("#header").addClass("on");
            $(".header-menu-wrap").animate({
                left: "0"
            }, 300, function(){
				$(".mobile-close-btn").show();				
			});
            
        }

    })

    $(".mobile-close-btn").on("click", function () {
		if ($(window).width() < 1200) {
			$(".header-menu-wrap").animate({
				left: "-245px"
			}, 300, function(){
				$(".mobile-close-btn").hide();
				$("#header").removeClass("on");
			});
			
		}
    })


	
    $(window).scroll(function () {

        if ($(window).width() < 1200) {
            if ($(window).scrollTop() > $("#header").height()) {
                $("#header").addClass("fixed-header");
                $("#header").removeClass("header");
            } else {
                $("#header").removeClass("fixed-header");
                $("#header").addClass("header");
            }
        }

    })

    $("#search_btn").on("click", function (e) {
        e.preventDefault();		
        if ($(".search-wrap").css("display") == "none") {
			
            $(this).find("i").removeClass("fa-search");
            $(this).find("i").addClass("fa-times");
            $(".search-wrap").show();
            $(".search-wrap").addClass("fadeInDown")
        } else {
            $(this).find("i").addClass("fa-search");
            $(this).find("i").removeClass("fa-times");
            $(".search-wrap").hide();

        }


		

    })
	
    $(window).resize(function () {

        //desktop
        if ($(window).width() < 1200) {

            //mobile
            if ($("#header").hasClass("on")) {
                $(".mobile-close-btn").show();
            }
        }
    });




})
