$(document).ready(function() {

  hljs.configure({
    tabReplace: '  ' // 2 spaces
    })

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

 // $('.primary-left').stop(true, true).fadeIn({ duration: 800, queue: false }).css('display', 'none').slideDown(800);
 // $('.primary-right').fadeIn(1600);

});