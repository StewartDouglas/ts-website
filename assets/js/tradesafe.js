$(document).ready(function() {

  hljs.configure({
    tabReplace: '  ' // 2 spaces
    })

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});