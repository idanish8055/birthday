$(document).ready(function(){  
    let cardContainer = $(".card-sections"); 
    
    cardContainer.hide();   

    $(".audio-btn").click(function(){
      var audio = $('.song')[0];
      audio.play();
    })  ;

    $(".cake-init").click(function(){
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

        var audio = $('.song')[0];
        audio.play();

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
            console.log(i, "I", $("p:nth-child("+i+")"));
			$(".message p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
                i=i+1;
                $(".message p:nth-child("+i+")").fadeIn('slow').delay(1000);
                if(i==49){
                    $(".message p:nth-child(49)").fadeOut('slow').promise().done(function () {
                        $('.cake').fadeIn('fast');
                    });
                    $(".blessings").fadeIn('slow');
                }
                else{
                    msgLoop(i);
                }			
		    });
		}
		
		msgLoop(0);
	});

    $(".scratch-btn").click(function(){
        $(this).fadeOut("slow");
        $("[scratch-card]").show();
        initScratch();
        $([document.documentElement, document.body]).animate({
            scrollTop: $("[scratch-card]").offset().top
        }, 2000);
    })
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
    firstText = "Yashi😘";
    secondText = "Muskan😘";
    thirdText = "to Youuuu😘";
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

// Scratch card JS

function initScratch(){
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const scratchCardCover = document.querySelector('.scratch-card-cover');
    const scratchCardCanvasRender = document.querySelector('.scratch-card-canvas-render');
    const scratchCardCoverContainer = document.querySelector('.scratch-card-cover-container');
    const scratchCardText = document.querySelector('.scratch-card-text');
    const scratchCardImage = document.querySelector('.scratch-card-image');
    
    var canvas = document.querySelector('canvas#scratchCard');
    const context = canvas.getContext('2d');
    let isPointerDown = false;
    let positionX;
    let positionY;
    let clearDetectionTimeout = null;
    
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    const canvasWidth = canvas.offsetWidth * devicePixelRatio;
    const canvasHeight = canvas.offsetHeight * devicePixelRatio;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    context.scale(devicePixelRatio, devicePixelRatio);
    
    if (isSafari) {
      canvas.classList.add('hidden');
    }
    
    canvas.addEventListener('pointerdown', (e) => {
      scratchCardCover.classList.remove('shine');
      ({ x: positionX, y: positionY } = getPosition(e));
      clearTimeout(clearDetectionTimeout);
      
      canvas.addEventListener('pointermove', plot);
      
      window.addEventListener('pointerup', (e) => {
        canvas.removeEventListener('pointermove', plot);
        clearDetectionTimeout = setTimeout(() => {
          checkBlackFillPercentage();
        }, 500);
      }, { once: true });
    });
    
    const checkBlackFillPercentage = () => {
      const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixelData = imageData.data;
    
      let blackPixelCount = 0;
    
      for (let i = 0; i < pixelData.length; i += 4) {
        const red = pixelData[i];
        const green = pixelData[i + 1];
        const blue = pixelData[i + 2];
        const alpha = pixelData[i + 3];
    
        if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
          blackPixelCount++;
        }
      }
    
      const blackFillPercentage = blackPixelCount * 100 / (canvasWidth * canvasHeight);
     
      if (blackFillPercentage >= 45) {
        scratchCardCoverContainer.classList.add('clear');
        confetti({
          particleCount: 100,
          spread: 90,
          origin: {
             y: (scratchCardText.getBoundingClientRect().bottom + 60) / window.innerHeight,
          },
        });
        scratchCardText.textContent = "So that's it, thank you for your patience. I hope you like it.😅 ILYSM ❤️";
        scratchCardImage.classList.add('animate');
        scratchCardCoverContainer.addEventListener('transitionend', () => {
          scratchCardCoverContainer.classList.add('hidden');
        }, { once: true });
      }
    }
    
    const getPosition = ({ clientX, clientY }) => {
      const { left, top } = canvas.getBoundingClientRect();
      return {
        x: clientX - left,
        y: clientY - top,
      };
    }
    
    const plotLine = (context, x1, y1, x2, y2) => {
      var diffX = Math.abs(x2 - x1);
      var diffY = Math.abs(y2 - y1);
      var dist = Math.sqrt(diffX * diffX + diffY * diffY);
      var step = dist / 50;
      var i = 0;
      var t;
      var x;
      var y;
    
      while (i < dist) {
        t = Math.min(1, i / dist);
    
        x = x1 + (x2 - x1) * t;
        y = y1 + (y2 - y1) * t;
    
        context.beginPath();
        context.arc(x, y, 16, 0, Math.PI * 2);
        context.fill();
    
        i += step;
      }
    }
    
    const setImageFromCanvas = () => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        previousUrl = scratchCardCanvasRender.src;
        scratchCardCanvasRender.src = url;
        if (!previousUrl) {
          scratchCardCanvasRender.classList.remove('hidden');
        } else {
          URL.revokeObjectURL(previousUrl);
        }
        previousUrl = url;
      });
    }
    
    let setImageTimeout = null;
    
    const plot = (e) => {
      const { x, y } = getPosition(e);
      plotLine(context, positionX, positionY, x, y);
      positionX = x;
      positionY = y;
      if (isSafari) {
        clearTimeout(setImageTimeout);
    
        setImageTimeout = setTimeout(() => {
          setImageFromCanvas();
        }, 5);
      }
    };
}
