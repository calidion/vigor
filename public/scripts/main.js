$(document).ready(function () {

  // enabled markdown editor 

  if ($("[data-provide=markdown]")[0]) {
    var simplemde = new SimpleMDE({ element: $("[data-provide=markdown]")[0] });
  }

  // enabled tooltips

  $('[data-toggle="tooltip"]').tooltip()
  $('a.post-item').click(function () {
    var data = $(this).attr('data');
    console.log(data);
    $('input[name=parent]').val(data);
  });

  // 邀请大牛
  var emails = [];

  function addEmail(email) {
    emails.push(email);
    emails = $.unique(emails);
    emails = emails.filter(function (value, idx, self) {
      return self.indexOf(value) === idx;
    });
    $('.gurus').html('');
    emails.forEach(function (item) {
      var clone = prototype.clone();
      $('strong', clone).html(item);
      $('.gurus').append(clone);
      $(clone).click(function () {
        emails = emails.filter(function (value, idx) {
          console.log(item);
          return value !== item;
        });
        console.log(emails);
      });
    });
  }

  var prototype = $('.gurus-prototype > .alert');
  $('.add-email').click(function () {
    var email = $('.email-guru').val();
    if (email) {
      addEmail(email);
    }
  });
  $('.btn-invite').click(function () {
    var formData = new FormData($('.invite-form')[0]);
    emails.forEach(function (item) {
      formData.append("emails", item);
    });
    $.ajax({
      method: 'POST',
      url: '',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data && !data.code) {
          alert('邀请成功!');
        } else {
          alert('邀请失败!');
        }
      }
    });
    return false;
  });

  // github 
  //   https://api.github.com/search/users?q=followers:%3E=100%20location:china&page=1&client_id=29f4e928b4d220d773d8&client_secret=8694a890987ad26729edece51344ea3c1bf4ab8c

  var query = {
    followers: '>=100',
    location: 'china'
  };


  // 获取用户详细信息

  function fetchItem(name) {
    var url = 'https://api.github.com/users/' + name;
    $.ajax({
      method: 'get',
      url: url,
      data: {
        client_id: '29f4e928b4d220d773d8',
        client_secret: '8694a890987ad26729edece51344ea3c1bf4ab8c'
      },
      success: function (data) {
        console.log(data);
        if (data && data.email) {
          addEmail(data.email);
        } else {
          $('.error-get-email').removeClass('hidden');
          $('strong', $('.error-get-email')).html(name);
          setTimeout(function () {
            $('.error-get-email').addClass('hidden');
          }, 5000);
        }
      }
    });
  };

  function fetchGuru(page) {
    var url = 'https://api.github.com/search/users';
    var options = {
      q: 'followers:>=10 location:china',
      location: 'china',
      client_id: '29f4e928b4d220d773d8',
      client_secret: '8694a890987ad26729edece51344ea3c1bf4ab8c',
      page: page
    };

    $.ajax({
      method: 'get',
      url: url,
      data: options,
      success: function (data) {
        console.log(data);
        if (data && data.items) {
          $('.github-guru-selector').html('');
          var items = data.items;
          for (var i = 0; i < items.length; i++) {
            var option = $('<option>', {
              value: items[i].login,
              text: items[i].login
            });
            $(options).click((function (item) {
              return function () {
                fetchItem(item);
              };
            })(items[i]));
            $('.github-guru-selector').append(option);
          }
          $('.github-guru-selector').click(function (evt) {
            console.log(evt);
            var name = $('.github-guru-selector').val()[0];
            console.log(name)
            if (name) {
              fetchItem(name);
            }
          });
        }
      }
    });
  }
  function randomGuru() {
    var page = (Math.random() * 30).toFixed(0);
    fetchGuru(page);
  }
  $('.guru-refresh').click(randomGuru);
  randomGuru();
});