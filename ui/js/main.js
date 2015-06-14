$(document).ready(function(){
	$('.subscribe-form').on('submit', function(e){
    e.preventDefault();
    $form = $(this);
    $subscriber = $form.find("[name=subscriber]"); 
    subscriber = $subscriber.val();
    token = $form.find("[name=token]").val();

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: {
        'subscriber': subscriber,
        'token': token
      },  
      context: document.body,
    }).success(function(data){
      data = JSON.parse(data);
      console.log(data);
      if(data.status){
        $form.attr('class', 'good');
      }else{
        $form.attr('class', 'bad');
      }
      $subscriber.val(data.msg);
      setTimeout(function(){
        $form.attr('class', '');
        $subscriber.val('');
      }, 3500);
    });

    return false;
  });
});

$(document).ready(function() {
        $('.scrollTo').click( function() { // Au clic sur un élément
          var page = $(this).attr('href'); // Page cible
          var speed = 750; // Durée de l'animation (en ms)
          $('html, body').animate( { scrollTop: $(page).offset().top+55 }, speed ); // Go
          return false;
        });
      });

$(document).ready(function(){      
            $(window).resize(function() {
               setTimeout( function(){
                   window.location.href = window.location.href;
               },1000); 
            });
            var scroll_pos = 0;
            var positionElementInPage1 = $('#scroll1').offset().top;
            var positionElementInPage2 = $('#scroll2').offset().top;
            var positionElementInPage3 = $('#scroll3').offset().top;
            var positionElementInPage4 = $('#scroll4').offset().top;
            $(document).scroll(function() { 
                scroll_pos = $(this).scrollTop();
                if(scroll_pos > positionElementInPage4-60) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#FFFFFF');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#86c56c');
                    document.getElementById("jaab-logo").src = "ui/images/logo.png";
                    $("#press").css('color', '#FFFFFF');
                }
                else if(scroll_pos > positionElementInPage3-60) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#3381f6');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#FFFFFF');
                    document.getElementById("jaab-logo").src = "ui/images/logo2.png";
                    $("#press").css('color', '#3381f6');
                }
                else if(scroll_pos > positionElementInPage2-60) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#FFFFFF');
                    document.getElementById("jaab-logo").src = "ui/images/logo3.png";
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#86c56c');
                    $("#press").css('color', '#FFFFFF');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#86c56c');
                }
                 else if(scroll_pos > positionElementInPage1-80) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#3381f6');
                    document.getElementById("jaab-logo").src = "ui/images/logo2.png";
                    $("#press").css('color', '#3381f6');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#FFFFFF');
                }
                 else {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#ffcb64');
                    document.getElementById("jaab-logo").src = "ui/images/logo.png";
                    $("#press").css('color', '#FFFFFF');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#FFFFFF');
                }
            });
        });



