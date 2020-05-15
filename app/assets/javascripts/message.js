$(function() {
  function buildHTML(message){
    if (message.image) {
      // data-idが反映されるようにしている
      var html = 
        `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>
        </div>`
      return html;
    } else {
      // 同様にdata-idが反映されるようにしている
      var html =
        `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>
        </div>`
      return html;
    };
  }
  $(function(){
    var reloadMessages = function() {
      // カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",    // ルーティングで設定した通り/groups/id番号/api/messagesとなるように文字列を書く
        type: "GET",          // ルーティングで設定した通りhttpメソッドをgetに指定
        dataType: 'json',
        data: {id: last_message_id}   // dataオプションでリクエストに値を含める
      })
      .done(function(messages){
        if (messages.length !== 0) {
          var insertHTML = '';    // 追加するHTMLの入れ物を作る
          $.each(messages, function(i, message) {   // 配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);    // メッセージの入ったHTMLに、入れ物ごと追加
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
  });
  $('#new_message').on('submit', function(e) {
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
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.chat-form__btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert("error");
    })
  })
});