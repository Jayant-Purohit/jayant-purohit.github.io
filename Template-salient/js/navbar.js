$(document).ready(function() {
  $(window).scroll(function () { 
      // console.log($(window).scrollTop());
    if ($(window).scrollTop() > 40) {
      console.log('in loop')
      $('.new-nav').addClass('addpadding');
      $('.cover').addClass('ops-cover');
      $('.logo-class').addClass('img-logo-scroll');
      $('.navbar-brand').removeClass('navbar-brand-new');
      $('.navbar-brand').addClass('navbar-brand-after');

      
    }else{
      $('.cover').removeClass('ops-cover');
    }
  });
});