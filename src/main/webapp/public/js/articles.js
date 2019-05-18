function init() {
    getBlogInfo();
    //取消评论
    $('.cancelComment').click(function () {
        $('.texta').val("");
        $('.commentarea').hide();
    });




    var pagenum = getpageList(getAlllCommnets(),5);
//默认显示第一个
    pages( $(".pagination .active"),pagenum);
    //首次添加点击事件
    $(".pagination li").click(function(){
        pages($(this),pagenum);

    });



}

function getBlogInfo() {
    $.ajax({
        url:basepath+"/blogs/"+articleid,
        tyoe:"GET",
        success:function (data) {
            var value = data["data"];
            console.log(value)
            $('.blogtitle').append(value["btitle"]);
            $('title').html(value["btitle"]);
            $(".blogtime").append(value["createtime"]);
            // $(".blogreadtimes").append("点击量："+value["clicknum"]);
            $(".blogcategory").append(value["categoryname"]);
            $(".blogcontent").append(value["bcontext"]);
            $(".username").append(value["uname"]);
            $(".userimg").attr("src",urlpath+value["img"]);
            $(".commentcount").html(value["userinfo"]["commentcount"]);
            $(".collectioncount").html(value["userinfo"]["collectioncount"]);
            $(".blogcount").html(value["userinfo"]["blogcount"]);
            window.createuid = value["createuid"];
            if(data["collection"] == true){
                $('.collectionblog').text("取消收藏");
            }else {
                $('.collectionblog').text("收藏")

            }

        },
        error:function () {
            
        }
        
    })
}

function showcommentsfn() {
    var token = $.cookie('token');
    if(token == null || token == ''){
        alert("对不起，您尚未登陆");
        return false;
    }
    $('.commentarea').show();
}
//提交评论
function submitCommentfn() {
    var commentval = $('.texta').val();
    //判断用户是否登陆
    var jwt = $.cookie("token");
    if(jwt == null || jwt == ""){
        alert("对不起，您尚未登陆");
    }else {
        var bid = currentUrl.substr(currentUrl.lastIndexOf("/")+1,currentUrl.length);
        $.ajax({
            url:basepath+"/comments",
            type:"POST",
            data:{
                "cvalue":commentval,
                "toblogid":bid,
                "createuid":window.createuid
            },
            success:function () {
                alert("success");
                $('.texta').val("");
                $('.commentarea').hide();

            },
            error:function () {
                alert("fail")
            }
        });
    }
}

//获取总评数量
function getAlllCommnets() {
    var commentNum = -1;
    $.ajax({
        url:basepath+"/comments/"+articleid+"/count",
        async:false,
        type:"GET",
        success:function (data) {
            commentNum = data["count"];
            console.log("评论总量"+commentNum)
        },
        error:function () {
            
        }
    });
    return commentNum;
}

//获取评论（分页）
function getcomments(offset,size){
    $('.commentslist').empty();
    $.ajax({
        url:basepath+"/comments/"+articleid,
        data:{
            "offset":offset,
            "size":size
        },
        type:"GET",
        success:function (data) {
            var list = data["data"];
            $.each(list,function (k,v) {
                var html = "<div class='commentslist-item'><div class='item-left'>";
                html += "<img class='img-circle' src='"+urlpath+v["img"]+"'>";
                html += "<div class='item-left-username'>"+v["uname"]+"</div>";
                html += "</div><div class='item-right'>";
                html += "<div class='item-right-content'>"+v["cvalue"]+"</div>";
                html += "<div class='item-right-time'>"+v["createtime"]+"</div>";
                html += "</div><div class='clearfloat'></div></div>";
                $('.commentslist').append(html);
            });
console.log(list)

        },
        error:function () {

        }
    });

}
//生成总的页码   数据总量  每页显示的数量
 function getpageList(total,size){
    var pagenum = Math.ceil(total/size);
    var html = "";
    for(var i=1;i<=pagenum;i++){
        if(i ==1){
            html += "<li class='active' ><a href='javascript:;'>"+i+"</a></li>"
        }else{
            html += "<li><a href='javascript:;'>"+i+"</a></li>"
        }
    }
    $(".pagination").append(html);
    window.pagetotalnum = pagenum;
    //返回总页码总量
    return pagenum;
}


//分页
pages = function(_this,lastLi){
    var firstLi = 1;
    lastLi = window.pagetotalnum;
    //$(this).addClass("active").siblings().removeClass("active");
    if(_this == null || _this == ""){
        //_this =
    }
    _this.addClass("active").siblings().removeClass("active");
    //获取当前页的值
    var currentPage = parseInt(_this.text());
    if(isNaN(currentPage)){
        currentPage = 0;
        return ;
    }
    var count = 0;
    $(".pagination li").each(function(k,v){
        //三种情况  开头两个  最后两个  中间的
        if(currentPage <= 2){
            if(count < 5){
                $(this).show();
                count++;
            }else {
                $(this).hide();
            }
        }else if(currentPage == lastLi || currentPage == lastLi-1){
            if(k >= lastLi-5){
                $(this).show();
            }else {
                $(this).hide();
            }
        }else{
            if(Math.abs(currentPage-1-k)<=2){
                $(this).show();
            }else {
                $(this).hide();
            }
        }

    });
    getcommentslist(currentPage,5);
}

//获取数据并且展示  currentPage当前页面  size每页数量
function getcommentslist(currentPage,size) {
    var offset = (currentPage-1)*size;
    getcomments(offset,size);
}


//收藏
function collectblogfn() {
    var token = $.cookie('token');
    if(token == null || token == ''){
        alert("对不起，您尚未登陆");
        return false;
    }

    var delflg = "01";
    if( $('.collectionblog').text() == "收藏"){
        delflg = "00";
    }
    $.ajax({
        url:basepath+"/collections/blogs/"+articleid,
        type:"POST",
        data:{
            "delflg":delflg
        },
        success:function () {
            alert("success");
            if( $('.collectionblog').text() == "收藏"){
                $('.collectionblog').text("取消收藏")
            }else {
                $('.collectionblog').text("收藏")
            }
        },
        error:function () {
            alert("fail");
        }
    })
}
