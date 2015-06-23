window.sr = new scrollReveal();

$(document).ready(function(){
  var speed = 750
    , $menu = $($('.menu')[0])
    , $logo = $('#jaab-logo')
    , scroll_pos = 0
    , scroll_distances_padding = computeScrollDistancePadding($('.plain'))
    , found = false
    , i = scroll_distances_padding.length
    , page
    , dynamic_padding
    ;


  /* AUTO SCROLL */
  $('a.scroll-action').on('click', function(e) {
    e.preventDefault();
    page = $(this).attr('href');
    dynamic_padding = parseInt($(page).css('padding-top').replace("px", ""));
     
    $('html, body').animate({ 
        scrollTop: $(page).offset().top + dynamic_padding
      }, speed
    );

    return false;
   });

  /* END AUTO SCROLL */



  /* UPDATE STYLE MENU */ 
  function computeScrollDistancePadding($elems){
    scroll_to_top = [];

    $elems.each(function(i, e){
      scroll_to_top.push(
        parseInt($(e).offset().top - parseInt($(e).css('padding-top').replace('px', '')))
      );
    });

    return scroll_to_top;
  }


  $(document).scroll(function() { 
    scroll_pos = $(this).scrollTop();

    // Menu color loop
    found = false;
    i = scroll_distances_padding.length;
    while(!found && i >= 0){
      if(scroll_pos > scroll_distances_padding[i]){
        state = $($('.plain').get(i)).attr('data-scroll');
        $menu.attr('data-scroll', state);
        $logo.attr('src', 'ui/images/logo-' + state + '.svg');
        found = true;
      }
      i--;
    }
  });


  $(window).on('resize', function(){
    scroll_distances_padding = computeScrollDistancePadding($('.plain'));
  })
  /* END UPDATE STYLE MENU */

});