$(function(){

  function buildMessage(message){
    var content = message.content ? `${message.content}` : "";
    var image = message.image ? `${message.image}` : "";
    var html = `<div class="main__content__message">
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
      var html = buildMessage(message);
      $('.main__content').append(html);
      $('.main__content').animate({ scrollTop: $('.main__content')[0].scrollHeight });
      $('#form')[0].reset();
      $('.main__form__create--submit').attr('disabled', false);
    })
    .fail(function(){
      alert('エラー');
      $('.main__form__create--submit').attr('disabled', false);
    })
  })
});