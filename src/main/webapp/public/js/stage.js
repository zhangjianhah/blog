function init(basepath,resourcepath) {
    getCategoryList(basepath);

    getmyblog(0,10);

    var blogcount = getBlogsCount();
    window.totalblogs = blogcount;
    window.currentblogs = 10;
    //默认搜索所有，如果有点击搜索按钮，则变为01
    window.keyword = "00";

    $('.searchbtn').click(function(){
        var val = $('.keyword').val();
        if(val == null || val ==''){
            alert("搜索为空")
        }else {
            window.keyword = "01";
            $('.conlist').empty();
            window.totalblogs = getBlogsCount();
            getmyblog(0,10);
        }
    });

    checkuserstatus();


}

//获取所有种类
function getCategoryList(basepath) {
    $.ajax({
        url:basepath+"categorys",
        type:"get",
        dataType:"json",
        async:false,
        success:function(data){
            $('.categorylist').empty();
            console.log(data);
            var list = data["category"];
            var html ="";
            $.each(list,function (k,v) {
                html += "<li class='list-group-item categorylist' onclick='selectcategory(this)' data-value='"+v["cid"]+"'>"+v["cname"]+"</li>";
            });
            $('.categorylist').append(html);
        },
        error:function(){

        }
    });
}


//获取博客（分页）
function getmyblog(offset,size){
    $('.myblogstable').empty();
    //获取搜索框内容
    var keyword = $('.keyword').val();
    // if(window.keyword = "00"){
    //     keyword = "";
    // }
    //获取种类id
    var categoryid = $('.categorylist .active').attr("data-value");
    $.ajax({
        url:basepath+"blogs/total",
        data:{
            "offset":offset,
            "size":size,
            "keyword":keyword,
            "categoryid":categoryid
        },
        type:"GET",
        success:function (data) {
            console.log(data["data"]);
            var list = data["data"];
            $.each(list,function (k,v) {
                var html = "<li class='list-group-item conlist-item'>";
                html += "<div class='blogitemleft'>";
                html += "<div class='conlist-item-title'><a onclick='addclicknum(\""+v["bid"]+"\")' href='/blog/articles/"+v["bid"]+"'>"+v["btitle"]+"</a></div>";
                //html += "<div class='conlist-item-title' onclick='addclicknum(\""+v["bid"]+"\")'>"+v["btitle"]+"</div>";
                html += "<div class='conlist-item-con'>"+v["bcontext"]+"</div>";
                html += "<div class='conlist-item-info'>";
                html += "<span>"+v["uname"]+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>"+v["createtime"]+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>阅读量</span><span>"+v["clicknum"]+"</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>收藏量</span><span>"+v["collectionnum"]+"</span>";
                html += "</div></div>";
                html += "<div class='blogitemright'>";
                if(v["bcontext"] != null){
                    html += " <img src=\""+resourcespath+v["img"]+"\">";
                }else {
                    html += " <img src='"+resourcespath+"headportrait/111.jpg'>";
                }

                html += "</div></li>";
                $(".conlist").append(html)

            })

        },
        error:function () {

        }
    });

}

// 获取游客可看的所有博客数量
function getBlogsCount() {
    var count = null;
    //获取搜索框内容
    var keyword = $('.keyword').val();
    //获取种类id
    var categoryid = $('.categorylist .active').attr("data-value");
    $.ajax({
        url:basepath+"blogs/total/count",
        type:"GET",
        async:false,
        data:{
            "keyword":keyword,
            "categoryid":categoryid
        },
        success:function (data) {
            count = data["count"];
            console.log("总量为"+count);
        },
        error:function () {
            count = 0;
        }
    });
    return count;
}

//种类点击事件
function selectcategory(_this) {
    $(_this).siblings().each(function () {
        $(this).removeClass("active")
    });
    $(_this).addClass("active");
    $('.conlist').empty();
    window.totalblogs = getBlogsCount();
    window.currentblogs = 10;
    getmyblog(0,10);
}

function addclicknum(bid) {
    // var newWeb=window.open('_blank');
    // newWeb.location=basepath+"articles/"+v["bid"];
    $.ajax({
        url:basepath+"blogs/"+bid+"/clicknum",
        data:{
            "clicknum":"1"
        },
        type:"PUT",
        success:function () {
            
        },
        error:function () {
            
        }
    })
}






//文档高度
function getDocumentTop() {
    var scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}
//可视窗口高度
function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode == "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//滚动条滚动高度
function getScrollHeight() {
    var scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

//下面我们需要一个监听滚动条的事件
window.onscroll = function () {
//当滚动条移动马上就出发我们上面定义的事件触发函数,但是我们要求的是滚动条到底后才触发,所以自然这个触发事件里面需要逻辑控制一下.
    if(getScrollHeight() == getWindowHeight() + getDocumentTop()){

        if(window.totalblogs > window.currentblogs){
            getmyblog(window.currentblogs,5);
            window.currentblogs += 5;
        }
    }
}
//判断用户是否登陆
function checkuserstatus() {
    var username = $.cookie('username');
    //未登录
    if(username == null || username == "null" || username == ""){
        $(".logout").hide();
        $(".login").show();
    }else {
        $(".login").hide();
        $(".logout").show();
    }
}



function registerfunc() {
    window.location.href = basepath+"register.html";
}

function loginfunc() {
    window.location.href = basepath+"login.html";
}
function logoutfunc() {
    $.cookie("token", null,{path:"/"});
    $.cookie("username", null,{path:"/"});
    alert("已退出");
    checkuserstatus();
}
function tomanagermentfunc() {
    window.location.href = basepath+"managerment.html";
}


