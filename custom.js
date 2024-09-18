$(document).ready(function(){  
    let cardContainer = $(".card-sections"); 
    
    cardContainer.hide();   

    $(".audio-btn").click(function(){
      console.log("CLICEKD");
      var audio = $('.song')[0];
      audio.play();
    })  ;

    $(".cake-init").click(function(){
        // cardContainer.show();
        $(this).fadeOut('slow').delay(5000);
        $('.cake-wrapper .cake').fadeIn('slow');
        $('.cake-wrapper .fuego').fadeIn('slow');
        $('.cake-text').fadeIn('slow');
        $('.balloon-border').animate({top:-500},10000);
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".cake-wrapper").offset().top
        }, 2000);
        ribbonCelebration();
        cakeText();

        setTimeout(()=>{
            $(".loading-more__wrapper").fadeIn('slow');
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".loading-more__wrapper").offset().top
            }, 2000);
        }, 6500);
        
        setTimeout(()=>{
            $(".loading-more__wrapper").fadeOut('slow').delay(5000);
            $(".step-2").fadeIn('slow');
            $([document.documentElement, document.body]).animate({
                scrollTop: $(".step-2").offset().top
            }, 2000);
        }, 10000);
    });

    $(".cards-enable-btn").click(function(){
        $(".step-2").fadeOut('slow').delay(5000);
        cardContainer.fadeIn('slow');
    });

    $(".card-btn").click(function(){
        let nextCard = $(this).attr("next-data-card");
        $(`[data-card-number="${nextCard}"]`).fadeIn('slow');
        $(this).fadeOut('slow').delay(5000);
    });

    $('.final-msg').click(function(){
		$(this).fadeOut('slow');
		// $('.cake').fadeOut('fast').promise().done(function(){
		// 	$('.message').fadeIn('slow');
		// });
		
		var i;

		function msgLoop (i) {
			$("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
                i=i+1;
                $("p:nth-child("+i+")").fadeIn('slow').delay(1000);
                if(i==50){
                    $("p:nth-child(49)").fadeOut('slow').promise().done(function () {
                        $('.cake').fadeIn('fast');
                    });
                    
                }
                else{
                    msgLoop(i);
                }			
		    });
		}
		
		msgLoop(0);
	});
});

// Ribbon celebration
function ribbonCelebration(){
    const end = Date.now() + 30 * 1000;

    // go Buckeyes!
    const colors = ["#bb0000", "#ffffff", "#FFFF00"];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function cakeText(){
    firstText = "meri jaan😘";
    secondText = "dear Muskan😘";
    thirdText = "to Youuuuuuuuu😘";
    intervalTime = 600;
    window.load = displayText();
    function displayText() {
        // display first text
        document.querySelector('#dynamicContent').innerText = firstText;
        // display second text
        setTimeout(() => {
            document.querySelector('#dynamicContent').innerText = secondText;
        }, intervalTime * 5);
        // display third text
        setTimeout(() => {
            document.querySelector('#dynamicContent').innerText = thirdText;
        }, intervalTime * 7);
    }

    setInterval(() => {
        displayText();
    }, intervalTime * 7);
}