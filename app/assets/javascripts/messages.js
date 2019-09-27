$(function() {

  function buildHTML(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `${message.image}` : "";
    var html = `<div class="main__content__message" data-message-id="${message.id}">
                  <div class="main__content__message__user-name">
                    ${message.name}
                  </div>
                  <div class="main__content__message__post-day">
                    ${message.date}
                  </div>
                  <p class="main__content__message__text">
                    ${content}
                  </p>
                  <img src="${image}">
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.main__content').append(html);
      $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight });
      $('form')[0].reset();
      $('.main__form__create--submit').attr('disabled', false);
    })
    .fail(function(){
      alert('エラー');
      $('.main__form__create--submit').attr('disabled', false);
    })
  })
    
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.main__content__message:last').data('message-id');
      $.ajax({
        url: './api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.main__content').append(insertHTML);
        })
        $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight });
      })
      .fail(function() {
        alert("自動更新ができませんでした");
      });
    };
  }
  setInterval(reloadMessages, 5000)
});