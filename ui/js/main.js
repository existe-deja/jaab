$(document).ready(function(){
  var speed = 750 // Durée de l'animation scrol(en ms)
    , ripple_wrap = $('.ripple-wrap')
    , rippler = $('.ripple')
    , finish_ripple = false
    , $scroll_action = $('.scroller .scroll-action')
    , scroll_distances = computeScrollDistanceFixed($('.plain'), $('.scroller'))
    , scroll_pos = 0
    , ANIMATION_END = 'webkitAnimationEnd oAnimationEnd msAnimationEnd mozAnimationEnd animationend'
    , TRANSITION_END = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'
    ;


  /* SIDE BULLET*/
  function toggleScrollAction(elem){
    $('.active').removeClass('active');
    $(elem).addClass('active');
  }


  $('.scroller .scroll-action').on('click', function(e){
    e.preventDefault();
    toggleScrollAction(e.currentTarget);

    return false;
  });


  function computeScrollDistanceFixed($elems, $fixed_elem){
    scroll_to_top = [];

    $elems.each(function(i, e){
      scroll_to_top.push(
        parseInt($(e).offset().top - $fixed_elem.position().top - $fixed_elem.height())
      );
    });

    return scroll_to_top;
  }
    
    
  $(document).scroll(function() {
    scroll_pos = $(this).scrollTop();

    // Bullet color loop
    found = false;
    i = scroll_distances.length;
    while(!found && i >=0 ){
      if(scroll_pos > scroll_distances[i]){
        state = $($('.plain').get(i)).attr('data-scroll');
        $scroll_action.attr('data-scroll', state);
        toggleScrollAction($scroll_action.get(i));
        found = true;
      }
      i--;
    }
  });

  $(window).on('resize', function(){
    scroll_distances = computeScrollDistanceFixed($('.plain'), $('.scroller'));
  });
  /* END SIDE BULLET */



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


  // Glow effect
  $('.subscribe-form').one(TRANSITION_END, function(e){
    $(e.currentTarget).find('.email-wrapper').addClass('entered');
  });


  /* POP-IN ANIMATION */
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
    ripple_wrap.addClass('goripple');
    rippler.css('left', e.clientX + 'px');
    rippler.css('top', e.clientY + 'px');
    finish_ripple = false;
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
  /* END POP-IN ANIMATION */

});
