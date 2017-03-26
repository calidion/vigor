$(document).ready(function() {
  $('a.post-item').click(function() {
    var data = $(this).attr('data');
    console.log(data);
    $('input[name=parent]').val(data);
  });
});