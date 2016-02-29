$(function() {

var $view = $('#g-content');
init();
$('#g-content').on('click', '.m-list li', function() {
  var sHref = $(this).data('href');
  render(sHref);
  showHideMiniNav();
});
$('.g-nav').on('click', 'li', function() {
  var sHref = $(this).data('href');
  if(sHref === window.location.pathname) {
    return false;
  }
  render(sHref);
  showHideMiniNav();
});
$('.g-header .brand, .g-xs-header .title').click(function() {
  if(window.location.pathname === '/') {
    return false;
  }
  window.history.pushState({}, '', '/');
  render('/');
  showHideMiniNav();
});
$(window).on('popstate', function() {
  init();
  var arrPath = window.location.pathname.split('/');
  // 文章
  if(arrPath[2]) {
    $view.load(window.location.href + ' #g-content');
  }
  showHideMiniNav();
});
$('.g-xs-header .icon-menu').click(function() {
  showHideMiniNav(true);
});
$('.mask-nav').click(function() {
  showHideMiniNav();
});
function showHideMiniNav(bHide) {
  if(bHide) {
    $('.g-nav, .g-xs-header .icon-menu, .mask-nav').addClass('active');
    $('body').addClass('move-right');
  }else {
    $('.g-nav, .g-xs-header .icon-menu, .mask-nav').removeClass('active');
    $('body').removeClass('move-right');
  }
}
function init() {
  var arrPath = window.location.pathname.split('/');
  // 首页
  if(arrPath.length === 2) {
    renderList(DATA);
  }
  // 列表
  if(arrPath[2] === '' && ['nav', 'about'].indexOf(arrPath[1]) === -1) {
    renderList(getListInfo(arrPath[1]));
  }
  renderNav();
}
function render(sHref) {
  window.history.pushState({}, '', sHref);
  var arrPath = window.location.pathname.split('/');
  // 首页
  if(arrPath[1] === '') {
    renderList(DATA);
  }
  // 列表(nav about 除外)
  if(arrPath[2] === '' && ['nav', 'about'].indexOf(arrPath[1]) === -1) {
    renderList(getListInfo(arrPath[1]));
  }
  // nav about 文章
  if(arrPath[2] || arrPath[2] === '' && ['nav', 'about'].indexOf(arrPath[1]) !== -1) {
    $view.load(sHref + ' #g-content');
  }
  renderNav();
}
function renderList(arr) {
  var s = '<ul class="m-list">';
  $.each(arr, function(i, v) {
    s += '<li data-href="'+v.url+'">'+
      '<span class="title">'+v.title+'</span>'+
      '<span class="time">'+v.date+'</span>'+
    '</li>';
  });
  s += '</ul>';
  $view.html(s);
}
function getListInfo(categories) {
  var res = [];
  $.each(DATA, function(k, v) {
    if(v.categories === categories) {
      res.push(v);
    }
  });
  return res;
}
function renderNav() {
  var arrPath = window.location.pathname.split('/');
  $('.g-nav li').removeClass('active');
  $('.g-nav li[data-href="/'+(arrPath[1]==''?'':arrPath[1]+'/')+'"]').addClass('active').siblings().removeClass('active');
}

});