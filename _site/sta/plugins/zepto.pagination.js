define(function(require, exports, module) {
  require('zepto');
  $.fn.pagination = function(options) {
    var defaults = {
        iCur: 1,
        iTotal: 1,
        iSize: 10,
        iCurpos: 5,
        prevText: '上一页',
        nextText: '下一页'
      },
      settings = $.extend(defaults, options),
      i,
      str = '',
      iStart,
      iEnd;
    if (settings.iTotal <= settings.iSize) {
      iStart = 1;
      iEnd = settings.iTotal;
    } else {
      iStart = Math.min(settings.iCur - settings.iCurpos + 1, settings.iTotal - settings.iSize + 1);
      iStart = Math.max(1, iStart);
      iEnd = iStart + settings.iSize - 1;
    }
    for (i = iStart; i <= iEnd; i++) {
      str += '<span class="' + (i == settings.iCur ? 'active' : '') + '" data-id="'+i+'">' + i + '</span>';
    }
    str = '<span data-id="'+(Math.max((settings.iCur-1), 1))+'">' + settings.prevText + '</span>' + str + '<span data-id="'+Math.min(settings.iTotal, +settings.iCur + 1)+'">' + settings.nextText + '</span>';
    str = '<div class="ui-pagination">'+str+'</div>';
    this.html(str);
    return this;
  };
});
