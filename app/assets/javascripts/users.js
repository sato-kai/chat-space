$(function() {

  var search_list = $("#user-search-result");
  var addMember = $('#chat-group-member');

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div id="user-search-result">
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${msg}</p>
                  </div>
                </div>`
    search_list.append(html);
  }

  function addUserToGroup(name, id) {
      var html = `<div class='chat-group-user'>
                    <input name='group[user_ids][]' type='hidden' value='${id}'>
                    <p class='chat-group-user__name'>${name}</p>
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      addMember.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input == "") {
      $("#user-search-result").empty();
      return false
    }
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  $('#user-search-result').on('click', '.user-search-add', function(){
    $(this).parent().remove();
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    addUserToGroup(name, id);
  });

  $('#chat-group-member').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});