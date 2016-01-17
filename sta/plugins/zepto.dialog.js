define(function(require, exports, module) {
  require('zepto');
  $.dialog = function(options) {
    var defaults = {
      tit: '提示', // 标题
      txt: '', // 内容
      className: '', // class
      btns: ['关闭'], // 按钮
      backdrop: true, // 点击背景是否关闭
      callback: function() {} // 按钮回调:参数为按钮的index
    },
    settings = $.extend(defaults, options),
    str;
    str = '<div class="ui-dialog'+(settings.className ? ' ' + settings.className : '') +'">'+
      '<div class="box">'+
        '<div class="hd">'+
          '<div class="tit">'+settings.tit+'</div>'+
          '<div class="btn-close">'+
            '<span class="icon"></span>'+
          '</div>'+
        '</div>'+
        '<div class="bd">'+settings.txt+'</div>'+
        '<div class="ft">';
        $.each(settings.btns, function(i, v) {
          str += '<span class="handle">'+v+'</span>';
        });
    str +=  '</div>'+
      '</div>'+
    '</div>';
    $('.ui-dialog').remove();
    $(str).appendTo('body').show();
    // 关闭
    $('.ui-dialog .btn-close').click(function() {
      $('.ui-dialog').remove();
    });
    // 点击背景
    $('.ui-dialog').click(function(e) {
      if(e.target === this && settings.backdrop) {
        $('.ui-dialog').remove();
      }
    });
    $('.ui-dialog .handle').click(function() {
      var index = $(this).index();
      settings.callback(index);
    });
  }
});
