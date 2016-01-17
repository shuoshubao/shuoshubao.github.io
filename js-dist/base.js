define("../../js-dist/base", [ "zepto" ], function(require, exports, module) {
    require("zepto");
    $("#script-data").remove();
    var arrNav = [ "html", "css", "js", "jq", "tool" ];
    function renderList(dataList) {
        var strTemp = "<ul>";
        $.each(dataList, function(i, v) {
            strTemp += '<li data-href="' + v.url + '">' + '<span class="title">' + v.title + "</span>" + '<span class="time">' + v.date + "</span>" + "</li>";
        });
        strTemp += "</ul>";
        $("#g-list").html(strTemp);
        $("#g-article").html("");
    }
    function renderArticle(sHref) {
        $("#g-list").html("");
        $("#g-article").load(sHref + " .markdown");
    }
    var strTempNav = "";
    var strTempAbout = "";
    $(".g-footer .wrapper").click(function() {
        console.log(strTempNav);
    });
    function initPage() {
        var pathname = window.location.pathname;
        var arrPath = pathname.split("/");
        var iLengthPath = arrPath.length;
        $(".g-nav").removeClass("active");
        $('.g-nav li[data-href="/' + (arrPath[1] == "" ? "" : arrPath[1] + "/") + '"]').addClass("active").siblings().removeClass("active");
        if (arrPath[1].length == 0) {
            renderList(DATA.posts);
        }
        if (arrPath[1].length > 0 && arrPath[2].length == 0) {
            var strTemp = arrPath[1];
            var postsTemp = [];
            if (arrNav.indexOf(strTemp) != -1) {
                $.each(DATA.posts, function(i, v) {
                    v.categories === strTemp && postsTemp.push(v);
                });
                renderList(postsTemp);
            }
            switch (strTemp) {
              case "nav":
                if (strTempNav === "") {
                    $("#g-list").load("/nav/ .p-nav", function() {
                        strTempNav = $("#g-list").html();
                    });
                } else {
                    $("#g-list").html(strTempNav);
                }
                $("#g-article").html("");
                break;

              case "about":
                if (strTempAbout === "") {
                    $("#g-list").load("/about/ .p-about", function() {
                        strTempAbout = $("#g-list").html();
                    });
                } else {
                    $("#g-list").html(strTempAbout);
                }
                $("#g-article").html("");
                break;
            }
        }
        if (iLengthPath >= 3 && arrPath[2].length > 0) {
            renderArticle(pathname);
        }
    }
    var arrPath = window.location.pathname.split("/");
    (arrPath.length === 3 && arrPath[2].length === 0 && $.inArray(arrPath[1], [ "about", "nav" ]) === -1 || arrPath.length === 2) && initPage();
    $("body").on("click", "#g-list li", function() {
        window.history.pushState({}, "", $(this).data("href"));
        renderArticle($(this).data("href"));
    });
    $(window).on("popstate", function() {
        initPage();
    });
    $(".g-nav li").click(function() {
        window.history.pushState({}, "", $(this).data("href"));
        initPage();
    });
    $(".g-xs-header .icon-menu").click(function() {
        $(".g-nav").toggleClass("active");
    });
    $(".g-header .brand, .g-xs-header .title").click(function() {
        window.history.pushState({}, "", "/");
        initPage();
    });
});