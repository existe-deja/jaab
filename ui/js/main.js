$(document).ready(function(){
	$('.subscribe-form').on('submit', function(e){
    e.preventDefault();
    $form = $(this);
    $email = $form.children(":first");

    $.ajax({
      type: 'POST',
      url: $form.attr('action'),
      data: {'email': $email.val()},  
      context: document.body,
    }).success(function(status){
      console.log('status', status);
    });

    return false;
  });
});