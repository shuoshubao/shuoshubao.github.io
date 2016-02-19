define(function(require, exports, module) {
  require('zepto');
  $('#script-data').remove();
  var arrNav = ['html', 'css', 'js', 'jq', 'tool'];
  // 渲染列表
  function renderList(dataList) {
    var strTemp = '<ul>';
    $.each(dataList, function(i, v) {
      strTemp += '<li data-href="'+v.url.slice(0,-1)+'">'+
        '<span class="title">'+v.title+'</span>'+
        '<span class="time">'+v.date+'</span>'+
      '</li>';
    });
    strTemp += '</ul>';
    $('#g-list').html(strTemp);
    $('#g-article').html('');
  }
  // 渲染文章
  function renderArticle(sHref) {
    $('#g-list').html('');
    $('#g-article').load(sHref + ' .markdown');
  }
  // 初始化页面
  var strTempNav = '';
  var strTempAbout = '';
  function initPage() {
    var pathname = window.location.pathname;
    var arrPath = pathname.split('/');
    var iLengthPath = arrPath.length;
    // 收起导航
    $('.g-nav').removeClass('active');
    $('.mask-nav').removeClass('active');
    $('body').removeClass('move-right');
    $('.g-xs-header .icon-menu').removeClass('active');
    // 导航高亮
    $('.g-nav li[data-href="/'+(arrPath[1]==''?'':arrPath[1]+'/')+'"]').addClass('active').siblings().removeClass('active');

    if(arrPath[1].length==0) {
      // 首页
      renderList(DATA.posts);
    }
    if(arrPath[1].length>0 && arrPath[2].length==0) {
      // 列表
      var strTemp = arrPath[1];
      var postsTemp = [];
      if(arrNav.indexOf(strTemp) != -1) {
        $.each(DATA.posts, function(i, v) {
          v.categories === strTemp && postsTemp.push(v);
        });
        renderList(postsTemp);
      }
      switch(strTemp) {
        case 'nav':
          if(strTempNav==='') {
            $('#g-list').load('/nav/ .p-nav', function() {
              strTempNav = $('#g-list').html();
            });
          }else {
            $('#g-list').html(strTempNav);
          }
          $('#g-article').html('');
        break;
        case 'about':
          if(strTempAbout==='') {
            $('#g-list').load('/about/ .p-about', function() {
              strTempAbout = $('#g-list').html();
            });
          }else {
            $('#g-list').html(strTempAbout);
          }
          $('#g-article').html('');
        break;
      }
    }
    if(iLengthPath>=3 && arrPath[2].length>0) {
      // 文章
      renderArticle(pathname);
    }
  }
  var arrPath = window.location.pathname.split('/');
  // 首页 + 列表 - nav - about
  if(arrPath.length===3 && arrPath[2].length===0 && $.inArray(arrPath[1], ['about', 'nav'])===-1 || arrPath.length===2) {
    initPage();
  }
  // nav + about 文章
  if($.inArray(arrPath[1], ['about', 'nav'])!==-1 || arrPath.length === 4) {
    $('.g-nav li[data-href="/'+arrPath[1]+'/"]').addClass('active').siblings().removeClass('active');
    if(arrPath[1] == 'nav') {
      strTempNav = $('#g-list').html();
    }
    if(arrPath[1] == 'about') {
      strTempAbout = $('#g-list').html();
    }
  }
  // 点击文章链接
  $('body').on('click', '#g-list li', function() {
    window.history.pushState({}, '', $(this).data('href'));
    renderArticle($(this).data('href'));
    arrPath = window.location.pathname.split('/');
    $('.g-nav li[data-href="/'+arrPath[1]+'/"]').addClass('active').siblings().removeClass('active');
  });
  // popstate
  $(window).on('popstate', function() {
    initPage();
  });
  // 导航
  $('.g-nav li').click(function() {
    $('body').removeClass('move-right');
    $('.g-xs-header .icon-menu').removeClass('active');
    window.history.pushState({}, '', $(this).data('href'));
    initPage();
  });
  // 打开导航
  $('.g-xs-header .icon-menu').click(function() {
    $('.g-nav').toggleClass('active');
    $('.g-xs-header .icon-menu').addClass('active');
    $('.mask-nav').addClass('active');
    $('body').addClass('move-right');
  });
  // 关闭导航
  $('.mask-nav').click(function() {
    $('.mask-nav, .g-nav').removeClass('active');
    $('.g-xs-header .icon-menu').removeClass('active');
    $('body').removeClass('move-right');
  });
  // 点击LOGO
  $('.g-header .brand, .g-xs-header .title').click(function() {
    window.history.pushState({}, '', '/');
    initPage();
  });
});
