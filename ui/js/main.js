 /* TRACKING ANALYTICS */
 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-64085792-1', 'auto');
      ga('send', 'pageview');
  /* FIN TRACKING ANALYTICS */

$(document).ready(function(){

  /* SUBSCRIBE */
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
  /* FIN SUBSCRIBE */


  /* SCROLL AUTO */
  $('.scrollAction').click( function() { // Au clic sur un élément
      var page = $(this).attr('href'); // Page cible
      var speed = 750; // Durée de l'animation (en ms)
      $('html, body').animate( { 
        scrollTop: $(page).offset().top+55 }, 
        speed ); // Go
      return false;
     });
  /* FIN SCROLL AUTO */

  /* CHANGEMENT STYLE MENU */
  var scroll_pos = 0;
  var positionElementInPage1 = $('#pannel-one').offset().top;
  var positionElementInPage2 = $('#pannel-two').offset().top;
  var positionElementInPage3 = $('#pannel-three').offset().top;
  var positionElementInPage4 = $('#pannel-four').offset().top;

            $(document).scroll(function() { 
                scroll_pos = $(this).scrollTop();
                if(scroll_pos > positionElementInPage4-60) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#FFFFFF');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#86c56c');
                    $(".pure-menu-link[href='#beta-testeur']").css('transition', 'all 0.5s ease');
                    $("#jaab-logo").attr('src','ui/images/logo-green.svg');
                    $(".press").css('color', '#FFFFFF');
                    $(".press").css('transition', 'all 0.5s ease');
                    window.location.hash = 'decouvrez-comment-jaab-fonctionne';
                }
                else if(scroll_pos > positionElementInPage3-60) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#3381f6');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#FFFFFF');
                    $("#jaab-logo").attr('src','ui/images/logo-blue.svg');
                    $(".press").css('color', '#3381f6');
                    window.location.hash = 'rejoignez-les-evenements-de-vos-amis';                  
                }
                else if(scroll_pos > positionElementInPage2-60) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#FFFFFF');
                    $("#jaab-logo").attr('src','ui/images/logo-green.svg');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#86c56c');
                    $(".press").css('color', '#FFFFFF');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#86c56c');
                    window.location.hash = 'retrouvez-tous-vos-amis-simplement';
                }
                 else if(scroll_pos > positionElementInPage1-80) {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#3381f6');
                    $("#jaab-logo").attr('src','ui/images/logo-blue.svg');
                    $(".press").css('color', '#3381f6');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#FFFFFF');
                    window.location.hash = 'tous-vos-evenements-au-meme-endroit';
                }
                 else {
                    $(".pure-menu-link[href='#beta-testeur']").css('background-color', '#ffcb64');
                    $(".pure-menu-link[href='#beta-testeur']").css('transition', 'all 0.5s ease');
                    $("#jaab-logo").attr('src','ui/images/logo-white.svg');
                    $(".press").css('color', '#FFFFFF');
                    $(".press").css('transition', 'all 0.5s ease');
                    $(".pure-menu-link[href='#beta-testeur']").css('color', '#FFFFFF');
                    window.location.hash = 'intro';
                }
            });
  /* CHANGEMENT STYLE MENU */

  /* ANIMATION POPIN VIDEO */
   $( ".openVid" ).click(function() {
       $("#popPlayer").css('display', 'inline');
    });

   $( ".closeVid" ).click(function() {
       $("#popPlayer").css('display', 'none');
    });
/* FIN ANIMATION POPIN VIDEO */

});



/* FUNCTION REFRESH */
/*$(document).ready(function(){      
     $(window).resize(function() {
       setTimeout( function(){
       window.location.href = window.location.href;
     },1000); 
});*/
/* END FUNCTION REFRESH */
            
            



