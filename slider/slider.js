$(document).ready(function() {
  
  var change_img_time   = 4000;
  var transition_speed  = 400;

  var listItems         = $("#slider").children('li'),
      listLen           = listItems.length,
      i                 = 0,
      dotItems          = $('#dots').children('li');

  listItems.not(':first').hide();

  var changeList        = function(action) {
      dotItems.removeClass('active');
      listItems.eq(i).fadeOut(transition_speed);
      i = i < listLen - 1 ? i + 1 : 0;
      dotItems.eq(i).addClass('active');
      listItems.eq(i).fadeIn(transition_speed); 
  };

  setInterval(changeList, change_img_time);
  //setInterval(function() { changeList('next') }, change_img_time);


  // TODO: refactor fading out and fading in images.  The select and previous event handlers use similar code,
  //      but change index differently. 

  // Event handlers
  $("#dots li").click(function() {
    var select = $("#dots li").index(this);
    dotItems.removeClass('active');
    listItems.eq(i).fadeOut(transition_speed);
    i = select;
    dotItems.eq(i).addClass('active');
    listItems.eq(i).fadeIn(transition_speed);
  });

  $("#prev").click(function() {
    dotItems.removeClass('active');
    listItems.eq(i).fadeOut(transition_speed);
    i = i >= 0 ? i - 1 : listLen - 1;
    dotItems.eq(i).addClass('active');
    listItems.eq(i).fadeIn(transition_speed);
  });

  $("#next").click(function() {
    changeList();
  });

});



