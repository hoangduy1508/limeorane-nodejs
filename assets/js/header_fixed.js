$(document).ready(function () {
	$(".top-menu-cart").on("mouseover" ,function(){
		//console.log("Mouse over");
		var mem_id = $("#hd_user_id").val();
		if(mem_id == ""){
			return false;
		}else{
			cartProc(mem_id);
			return false;
		}
	});
	$(".top-menu-cart").on("click" ,function(){
		//console.log("Mouse Click");
		var mem_id = $("#hd_user_id").val();
		cartProc(mem_id);
		return false;
	});
	
	$(".span-x").on("click", function(){
		if($(window).width() > 992){			
			$(".cpop-wrap").hide();
		}
	})
	
    $(".top-menu-link").on("mouseover", function(){
		var topIdx = $(this).parent().index();
		if(topIdx === 0){
			$(this).find("img").attr("src", "/assets/images/top-icon01-hover.png");
		} else if(topIdx === 1){
			if($(this).hasClass("login-link")){
				$(this).find("img").attr("src", "/assets/images/login-hover.png");
			} else if($(this).hasClass("logout-link")){
				$(this).find("img").attr("src", "/assets/images/logout-hover.png");
			}			
		} else if(topIdx === 2){
			$(this).find("img").attr("src", "/assets/images/top-icon03-hover.png");
		} else if(topIdx === 3){
			$(this).find("img").attr("src", "/assets/images/top-icon04-hover.png");
		} else if(topIdx === 4){
			$(this).find("img").attr("src", "/assets/images/top-icon05-hover.png");
		} else if(topIdx === 5){
			$(this).find("img").attr("src", "/assets/images/top-icon06-hover.png");
		}
	}).on("mouseout", function(){
		var topIdx = $(this).parent().index();
		if(topIdx === 0){
			$(this).find("img").attr("src", "/assets/images/top-icon01.png");
		} else if(topIdx === 1){
			if($(this).hasClass("login-link")){
				$(this).find("img").attr("src", "/assets/images/login.png");
			} else if($(this).hasClass("logout-link")){
				$(this).find("img").attr("src", "/assets/images/logout.png");
			}			
		} else if(topIdx === 2){
			$(this).find("img").attr("src", "/assets/images/top-icon03.png");
		} else if(topIdx === 3){
			$(this).find("img").attr("src", "/assets/images/top-icon04.png");
		} else if(topIdx === 4){
			$(this).find("img").attr("src", "/assets/images/top-icon05.png");
		} else if(topIdx === 5){
			$(this).find("img").attr("src", "/assets/images/top-icon06.png");
		}
	})
    $("#fixedTop").on("click", function(){
        $( 'html, body' ).stop().animate( { scrollTop : '700' } )
        
    })
    // GNB
    $("#header").addClass("on-fixed");
    $("#header").find(".top").hide();
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

    $(".menu.left .menu-item-link").on("click", function (e) {		
        if ($(window).width() < 1200) {
            if ($(this).parent().index() == 0 || $(this).parent().index() == 1 || $(this).parent().index() == 2 ) {
				
            } else {
                e.preventDefault();
                $(this).parent().addClass("on");
                $(".menu-item-depth2").slideUp();
                $(this).parent().find(".menu-item-depth2").slideDown(200);
            }
        }
    })
	$(".menu.right .menu-item-link").on("click", function (e) {		
        if ($(window).width() < 1200) {
            if ($(this).parent().index() == 0 || $(this).parent().index() == 2 || $(this).parent().index() == 3) {

            } else {
                e.preventDefault();
                $(this).parent().addClass("on");
                $(".menu-item-depth2").slideUp();
                $(this).parent().find(".menu-item-depth2").slideDown(200);
            }
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
				left: "-255px"
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
