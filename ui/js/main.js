$(document).ready(function(){
  var speed = 750 // Durée de l'animation scrol(en ms)
    , ripple_wrap = $('.ripple-wrap')
    , $rippler = $('#ripple')
    , finish_ripple = false
    , $scroll_action = $('.scroller .scroll-action')
    , scroll_distances = computeScrollDistanceFixed($('.plain'), $('.scroller'))
    , scroll_pos = 0
    , ANIMATION_END = 'webkitAnimationEnd mozAnimationEnd msAnimationEnd oAnimationEnd animationend'
    , TRANSITION_END = 'webkitTransitionEnd mozTransitionend MSTransitionEnd oTransitionEnd transitionend '
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
  $('body').on('click', '.open-vid', function(e) {
    e.preventDefault();
    ripple_wrap.addClass('goripple');
    $rippler.addClass('born');
    $rippler.css('left', e.clientX + 'px');
    $rippler.css('top', e.clientY + 'px');
    $rippler.css('border-color', $(e.currentTarget).attr('data-ripple'));
    $('#popPlayer').delay('slow').fadeIn('slow');
  });

  $('body').on('click', '.closeVid', function(e) {
    e.preventDefault();
    $rippler.removeClass('born');
    $rippler.css('border-color', '#fff');
    $rippler.one(TRANSITION_END, function(){
      ripple_wrap.removeClass('goripple');
    })

    $('#popPlayer').delay('fast').fadeOut('fast', function(){
    });
  });
  /* END POP-IN ANIMATION */

});
