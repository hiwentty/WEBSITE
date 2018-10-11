$(document).ready(function(){
  var showSkill = false;
  

  //製作點擊連結讓視窗滑動到指定位置的動畫
  $('.scrollTop').click(function(e){
    e.preventDefault();
    var target = $(this).attr('href');  //選定目標
    var targetPos = $(target).offset().top; //擷取位置
    $('html, body').animate({scrollTop: targetPos}, 1000);  //讓網頁移動到指定位置
  });
  

  //製作滾輪在滑動到特定位置 內容浮現的動畫
  $(window).scroll(function(){ //視窗滾動的時候
    var scrollPos = $(window).scrollTop(); //擷取視窗頂部位置
    var windowHeight = $(window).height(); //擷取視窗畫面高度
    console.log(scrollPos, windowHeight);
    
    $('.scrollTop').each(function(){
      var target = $(this).attr('href'); //擷取座標
      var targetPos = $(target).offset().top; //擷取距離
      var targetHeight = $(target).outerHeight(); //擷取元件高度
      if (scrollPos >= targetPos - 1   && scrollPos < (targetPos + targetHeight)  ){
        $('.scrollTop').removeClass('active')
        $(this).addClass('active');
      } else {
        $(this).removeClass('active')
      }
    });
    
    // progress bar
    var skillTop = $('#skills').offset().top;
    // console.log('skillTop', skillTop);
    if (skillTop <= (scrollPos + windowHeight / 2) && !showSkill) { //當滾輪位置超過元件位置一半時 //此功能關閉時才會執行
      showSkill = true; //功能開啟後不會再重複執行
      $('#skills .progress-bar').each(function(){ //指定元件
        var thisValue = $(this).data('progress'); //擷取進度條數值
        $(this).css('width', thisValue + '%');   //展開進度條
      });
    }
    
    // animated 滾輪滾至特定位置 元件浮現
    $('.animated').each(function(){
      var thisPos = $(this).offset().top;
      if((windowHeight + scrollPos) >= thisPos) {
         $(this).addClass('fadeIn');
      }
    });
    
    // bg scroll 
    $('#profiles').css('background-position-y', -(scrollPos / 2) + 'px')
  });
  
});