$(document).ready(function () {
  var simplemde = new SimpleMDE({ element: $("[data-provide=markdown]")[0] });

  $('a.post-item').click(function () {
    var data = $(this).attr('data');
    console.log(data);
    $('input[name=parent]').val(data);
  });
});