$(document).ready(function(){
  var speed = 750 // Durée de l'animation scrol(en ms)
    , ripple_wrap = $('.ripple-wrap')
    , rippler = $('.ripple')
    , finish_ripple = false
    , scroll_pos = 0
    , positionElementInPage1 = $('#pannel-one').offset().top-80
    , positionElementInPage2 = $('#pannel-two').offset().top-150
    , positionElementInPage3 = $('#pannel-three').offset().top-60
    , positionElementInPage4 = $('#pannel-four').offset().top-160
    , $beta_testeur = $('.pure-menu-link[href=#beta-testeur]')
    , $press = $('.press')
    , $logo = $('#jaab-logo')
    , ANIMATION_END = 'webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationend'
    ;


  /* SUBSCRIBE */
  $('.subscribe-form').on('submit', function(e){
    e.preventDefault();
    $form = $(this);
    $subscriber = $form.find('[name=subscriber]'); 
    subscriber = $subscriber.val();
    token = $form.find('[name=token]').val();

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: {
        'subscriber': subscriber,
        'token': token
      },  
      context: document.body,
    })
    .success(function(data){
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
  /* END SUBSCRIBE */



  /* AUTO SCROLL */
  $('.scrollAction').on('click', function() { // Au clic sur un élément
    var page = $(this).attr('href'); // Page cible
     
    $('html, body').animate({ 
        scrollTop: $(page).offset().top+55
      }, speed
    );

    return false;
   });
  /* END AUTO SCROLL */



  /* UPDATE STYLE MENU */ 
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
    if(scroll_pos > positionElementInPage4) {
      updateStyleMenu({
        bg_color: '#ffffff', 
        color_beta:'#86c56c',
        color_press:'#ffffff',
        src_logo: 'ui/images/logo-green.svg',
        new_hash: 'decouvrez-comment-jaab-fonctionne'
      });
    }
    else if(scroll_pos > positionElementInPage3) {
      updateStyleMenu({
        bg_color: '#3381f6', 
        color_beta:'#ffffff',
        color_press:'#3381f6',
        src_logo: 'ui/images/logo-blue.svg',
        new_hash: 'rejoignez-les-evenements-de-vos-amis'
      });
    }
    else if(scroll_pos > positionElementInPage2) {
      updateStyleMenu({
        bg_color: '#FFFFFF', 
        color_beta:'#86c56c',
        color_press:'#86c56c',
        src_logo: 'ui/images/logo-green.svg',
        new_hash: 'retrouvez-tous-vos-amis-simplement'
      });
    }
    else if(scroll_pos > positionElementInPage1) {
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
  /* END UPDATE STYLE MENU */



  monitor = function(el) {
    var computed = window.getComputedStyle(el, null)
      , borderwidth = parseFloat(computed.getPropertyValue('border-left-width'))
      ;

    if (!finish_ripple && borderwidth >= 1500) {
      el.style.WebkitAnimationPlayState = 'paused';
      el.style.animationPlayState = 'paused';
    }
    if (finish_ripple) {
      el.style.WebkitAnimationPlayState = 'running';
      el.style.animationPlayState = 'running';
      return;
    } else {
      window.requestAnimationFrame(function() {
        monitor(el);
      });
    }
  };
  

  rippler.bind(ANIMATION_END, function(e){
    ripple_wrap.removeClass('goripple');
  });


  $('body').on('click', '.openVid', function(e) {
    e.preventDefault();
    rippler.css('left', e.clientX + 'px');
    rippler.css('top', e.clientY + 'px');
    finish_ripple = false;
    ripple_wrap.addClass('goripple');
    $('#popPlayer').delay('slow').fadeIn('slow');

    window.requestAnimationFrame(function() {
      monitor(rippler[0]);
    });
  });


  $('body').on('click', '.closeVid', function(e) {
    $('#popPlayer').delay('fast').fadeOut('fast');
    e.preventDefault();
    finish_ripple = true;
  });
});
