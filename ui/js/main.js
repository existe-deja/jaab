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
  var scroll_pos = 0
    , positionElementInPage1 = $('#pannel-one').offset().top
    , positionElementInPage2 = $('#pannel-two').offset().top
    , positionElementInPage3 = $('#pannel-three').offset().top
    , positionElementInPage4 = $('#pannel-four').offset().top
    , $beta_testeur = $(".pure-menu-link[href='#beta-testeur']")
    , $press = $(".press")
    , $logo = $("#jaab-logo")
    ;
  
  $beta_testeur.css('transition', 'all 0.5s ease');
  $press.css('transition', 'all 0.5s ease');

  function updateStyleMenu(opt){
    $beta_testeur.css('background-color', opt.bg_color);
    $beta_testeur.css('color', opt.color_beta);
    $logo.attr('src', opt.src_logo);
    $press.css('color', opt.color_press);
    window.location.hash = opt.new_hash;
  }

  $(document).scroll(function() { 
  scroll_pos = $(this).scrollTop();
  if(scroll_pos > positionElementInPage4-160) {
    updateStyleMenu({
      bg_color: '#ffffff', 
      color_beta:'#86c56c',
      color_press:'#ffffff',
      src_logo: 'ui/images/logo-green.svg',
      new_hash: 'decouvrez-comment-jaab-fonctionne'
    });
  }
  else if(scroll_pos > positionElementInPage3-60) {
    updateStyleMenu({
      bg_color: '#3381f6', 
      color_beta:'#ffffff',
      color_press:'#3381f6',
      src_logo: 'ui/images/logo-blue.svg',
      new_hash: 'rejoignez-les-evenements-de-vos-amis'
    });
  }
  else if(scroll_pos > positionElementInPage2-150) {
    updateStyleMenu({
      bg_color: '#FFFFFF', 
      color_beta:'#86c56c',
      color_press:'#86c56c',
      src_logo: 'ui/images/logo-green.svg',
      new_hash: 'retrouvez-tous-vos-amis-simplement'
    });
  }
  else if(scroll_pos > positionElementInPage1-80) {
    updateStyleMenu({
      bg_color: '#3381f6', 
      color_beta:'#FFFFFF',
      color_press:'#3381f6',
      src_logo: 'ui/images/logo-blue.svg',
      new_hash: 'tous-vos-evenements-au-meme-endroit'
    });
  }
  else {
    updateStyleMenu({
      bg_color: '#ffcb64', 
      color_beta:'#FFFFFF',
      color_press:'#FFFFFF',
      src_logo: 'ui/images/logo-white.svg',
      new_hash: 'intro'
    });
  }
  });

var ripple_wrap = $('.ripple-wrap'),
    rippler = $('.ripple'),
    finish = false,
     
      monitor = function(el) {
        var computed = window.getComputedStyle(el, null),
            borderwidth = parseFloat(computed.getPropertyValue('border-left-width'));


        if (!finish && borderwidth >= 1500) {
          el.style.WebkitAnimationPlayState = "paused";
          el.style.animationPlayState = "paused";
        }
        if (finish) {
          el.style.WebkitAnimationPlayState = "running";
          el.style.animationPlayState = "running";
          return;
        } else {
            window.requestAnimationFrame(function() {monitor(el)});
        }
      };
  
 storedcontent = $('#content-2').html();
  $('#content-2').remove();*/
  
  rippler.bind("webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationend", 
    function(e){
     ripple_wrap.removeClass('goripple');
    });

  $('body').on('click', ".openVid", function(e) {
    rippler.css('left', e.clientX + 'px');
    rippler.css('top', e.clientY + 'px');
    e.preventDefault();
    finish = false;
    ripple_wrap.addClass('goripple');
    $("#popPlayer").delay("slow").fadeIn("slow");
    window.requestAnimationFrame(function() {monitor(rippler[0])});  
  });
  
  $('body').on('click', ".closeVid", 
    function(e) {
      $("#popPlayer").delay("fast").fadeOut("fast");
      finish = true;
       if(scroll_pos < 400) {
        }
       else {
     });
  });
