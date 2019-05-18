function backsatgeinit(resourcespath) {
    //获取url
    var array = new Array();
    var currentUrl = window.location.href;
    var s = currentUrl.lastIndexOf('/');
    var basepath = currentUrl.substr(0,s+1);

    array = currentUrl.split("/");
    var uid = array[array.length - 1];
    //存储我的博客
    window.uid = uid;

    //获取当前登陆的对象信息
    $.ajax({
        type:"GET",
        url:basepath+"users/"+uid,
        dataType:"json",
    });

    //鼠标移入移出
    $("#main-menu li").mouseout(function () {
        $("#main-menu li").each(function(){
            $(this).removeClass("active-menu")
        })
    }).mouseover(function(){
        $(this).addClass("active-menu")
    });


    //点击事件
    $("#main-menu li a").click(function () {
        $("#main-menu li a").each(function(k,v){
            $(this).removeClass("active-menu")
        });
        $(this).addClass("active-menu");
        //标题栏修改
        $(".page-header").html($(this).text());

        //右侧内容某块修改
        $(".page-inner row").each(function(){
            $(this).hide();
        });
        var value = $(this).parent().data("value");
        $(".row").each(function () {
            $(this).hide()
        })
        $("."+value).show();
    })

    //默认打开的是个人资料界面
    $.ajax({
        type:"GET",
        url:basepath+"users/"+uid,
        dataType:"json",
        success:function (data) {
            var user = data["data"];
            var usersex = user["sex"];
            if(usersex != null){
                if(usersex == '00'){
                    user["sex"] = "男";
                    $('.newsexmale').addClass("active");
                }else {
                    $('.newsexfemale').addClass("active");
                    user["sex"] = "女";
                }
            }
            $.each(user,function (k,v) {
                if(v != null){
                    $("."+k).html(v);
                    $(".new"+k).val(v);

                }
                if(k == "img"){
                    if(v == null){
                        $(".headprotrait").attr("src",resourcespath+"headportrait/111.jpg")
                    }else{
                        $(".headprotrait").attr("src",resourcespath+v);
                    }
                }
            })

        },
        error:function (data) {
            console.log(data);
        }
    });

    //点击事件，上传头相
    $(".uploadimg").click(function () {
        var formData = new FormData();
        var fileObj = $(".headp")[0].files[0];
        formData.append("img",fileObj);
        $.ajax({
            url:"<%= basePath%>users/"+uid,
            type:"POST",
            processData:false,
            contentType:false,
            dataType:"json",
            data:formData,
            success:function () {
                alert("成功");
            },
            error:function () {
                alert("失败");
            }
        })
    });
    //点击出现弹窗
    $('.changprofilepop').click(function () {

    })

    //创建富文本编辑器
    var E = window.wangEditor;
    var editor = new E('#div1', '#div2');
    editor.customConfig.uploadImgServer = '/blog/blogs/images';
    editor.customConfig.uploadFileName = 'img';
    editor.create();
    window.myeditor = editor;

    //提交博客
    $('.blogsubmit').click(function () {
        var cont = editor.txt.html()
        console.log(cont)
    });
    //用户修改个人信息
    $('.changuserinfo').click(function(){
        var newuname = $('.newuname').val();
        var newphone = $('.newphone').val();
        var newemail = $('.newemail').val();
        var newsex = "";
        if($('.newsexmale').hasClass("active")){
            newsex = "00";
        }else {
            newsex = "01";
        }
        console.log($('.newsexmale').hasClass("active"))
        var newaddress = $('.newaddress').val();
        $.ajax({
            url:basepath+"users/"+uid,
            type:"PUT",
            data:{
                "uname":newuname,
                "phone":newphone,
                "email":newemail,
                "sex":newsex,
                "address":newaddress
            },
            dataType:"json",
            success:function () {
                alert("修改成功");
                window.location.reload();
            },
            error:function(){
                alert("修改失败");
                $('#myModal').modal('hide');
            }

        });
    });

    //获取所有种类
    $.ajax({
        url:basepath+"categorys",
        type:"GET",
        dataType:"json",
        success:function(data){
            var html = "<table class='table'>";
            var category = data["category"];
            $.each(category,function(k,v){
                html += "<tr>";
                html += "<td>"+v["cname"]+"</td>";
                html += "<td><input type='button' value='删除' name='"+v["cid"]+"' class='deletecategorybtn'  /> </td>";
                html += "<td><input type='button' value='修改' name='"+v["cid"]+"' class='updatecategorybtn'  data-toggle=\"modal\" data-target=\"#addnewcategory\" /> </td>";
                html += "</tr>";
            });
            html += "</table>";
            $('.categorymanager .col-md-12').append(html);
            $('.updatecategorybtn').click(function () {
                var oldid = $(this).attr("name");
                $('.hiddencategory').val(oldid);

            });
            //添加种类到写博客的种类表
            var htmlc = "<option>请选择类型</option>";
            $.each(category,function(k,v){
                console.log(v["cid"])
                htmlc += "<option value ='"+v["cid"]+"'>"+v["cname"]+"</option>";
            });
            $('.writeblogselect').append(htmlc);

            //删除种类
            $('.deletecategorybtn').click(function () {
                var id = $(this).attr("name");
                $.ajax({
                    url:basepath+"categorys/"+id,
                    type:"DELETE",
                    success:function () {
                        alert("成功");
                        window.location.reload();
                    },error:function () {

                    }
                });
            });


        },
        error:function(){

        }
    });

    //修改种类
    $('.submitcategory').click(function () {
        var getHiddenCategoryValue = $('.hiddencategory').val();
        var newCategoryName = $('.newcategory').val();
        //如果为空则是创建新的种类
        if(getHiddenCategoryValue == ""){
            $.ajax({
                url:basepath+"categorys",
                type:"POST",
                data:{
                    "cname":newCategoryName
                },
                success:function(){
                    alert("成功");
                    $('.hiddencategory').val("");

                },
                error:function () {

                }
            });
        }else {
            var oldcid = $('.hiddencategory').val();
            $.ajax({
                url:"<%=basePath%>categorys/"+oldcid,
                type:"PUT",
                data:{
                    "cname":newCategoryName
                },
                success:function(){
                    alert("成功");
                    $('.hiddencategory').val("");
                    //把模态窗关闭
                    $('.modal-backdrop').hide();
                    $('#addnewcategory').hide();

                },
                error:function () {

                }
            });
        }
    });

    //提交博客
    $('.blogsubmit').click(function () {
        var blogtitle = $('.blogtitle').val();
        var blogcategory = $('.writeblogselect option:selected').val();
        var blogcontent = editor.txt.html()
        var blogtitleid = $('.blogtitleid').val();
        if(blogtitleid != null || blogtitleid != ''){
            updateblog(blogtitle,blogcategory,blogcontent,uid,blogtitleid,editor);
        }else{
            newblog(blogtitle,blogcategory,blogcontent,uid,editor);
        }

    });

    var pagenum = getpageList(getblogCountByUid(uid),5);
    $(".pagination li").click(function(){
        pages($(this),pagenum,'',uid,'');

    });


    //默认打开第一页
    getmyblog(0,5,uid);






















    //在各项都初始化完成再隐藏
    $(".row").each(function () {
        $(this).hide()
    });
    $(".myprofile").show();

}


//获取博客（分页）
function getmyblog(offset,size,uid){
    $('.myblogstable').empty();
    $.ajax({
        url:basepath+"blogs",
        data:{
            "uid":uid,
            "offset":offset,
            "size":size
        },
        type:"GET",
        success:function (data) {

            console.log(data["data"]);
            var list = data["data"];
            window.mybloglist = list;
            $.each(list,function (k,v) {
                var vis = "隐藏";
                if(v['visible'] == '01'){
                    vis = "显示";
                }
                var html = "<tr>";
                html += "<td>"+v['btitle']+"</td>";
                html += "<td>"+v['cname']+"</td>";
                html += "<td>"+v['createtime']+"</td>";
                html += "<td><input type='button'  value='修改' onclick='updatethisblog(\""+v['bid']+"\")'>";
                html += "<input type='button'  value='删除'  onclick='deletethisblog(\""+v['bid']+"\")'>";
                html += "<input type='button'  value='"+vis+"' onclick='changthisblogForVisibility(\""+v['bid']+"\",\""+v['visible']+"\",this)' ></td>";
                html += "</tr>";
                $('.myblogstable').append(html);
            })

        },
        error:function () {

        }
    });

}
//获取该用户博客数量
getblogCountByUid = function(uid){
    var count = null;
    $.ajax({
        url:basepath+"blogs/count",
        type:"GET",
        dataType:"json",
        data:{
            "uid":uid
        },
        async:false,
        success:function(data){
            count = data["count"];

        },
        error:function(){
            alert("shibai")
        }
    });
    return count;
}



//生成总的页码   数据总量  每页显示的数量
getpageList = function(total,size){
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
    //返回总页码总量
    return pagenum;
}


//分页
pages = function(_this,lastLi,basepath,uid,size){
    var firstLi = 1;
    //var lastLi = 15;
    //$(this).addClass("active").siblings().removeClass("active");
    _this.addClass("active").siblings().removeClass("active");
    //获取当前页的值
    var currentPage = parseInt(_this.text());
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
    getmybloglist(currentPage,5,uid);
    //清除之前的数据
    //$('.commentslist').children().filter('li').remove();
    //获取数据
    //getComments(basepath,blogid,(currentPage-1)*size,size);
}

//获取数据并且展示  currentPage当前页面  size每页数量
function getmybloglist(currentPage,size,uid) {
    var offset = (currentPage-1)*size;
    getmyblog(offset,size,uid);
}

//清除之前的数据并且添加新数据

//修改我的博客，把博客放入状态栏
updatethisblog = function (bid) {
    $('.writeblog').show();
    $('.myblog').hide();
    var list = window.mybloglist;
    var data = null;
    $.each(list,function (k,v) {
        if(v["bid"] == bid){
            data = v;
        }
    });

    $('.blogtitle').val(data["btitle"]);
    window.myeditor.txt.html(data["bcontext"]);
    $('.blogtitleid').val(data["bid"]);
    //种类选中
    $(".writeblogselect option").each(function (k,v) {
        if($(this).val() == data['category']){
            $(this).attr("selected",true);
        }
    })
}

//新建博客
function newblog(blogtitle,blogcategory,blogcontent,uid,editor){
    $.ajax({
        url:basepath+"blogs",
        type:"POST",
        data:{
            "blogtitle":blogtitle,
            "blogcategory":blogcategory,
            "blogcontent":blogcontent,
            "uid":uid
        },
        success:function () {
            alert("提交完成")
            $('.blogtitle').val("");
            editor.txt.html("");
            $(".writeblogselect option:first").prop('selected', 'selected');
        },
        error:function () {

        }
    });
}
//修改博客
function updateblog(blogtitle,blogcategory,blogcontent,uid,bid,editor) {
    $.ajax({
        url: basepath + "blogs/"+bid,
        type: "PUT",
        data: {
            "blogtitle": blogtitle,
            "blogcategory": blogcategory,
            "blogcontent": blogcontent,
            "uid": uid
        },
        success: function () {
            alert("提交完成")
            $('.blogtitle').val("");
            editor.txt.html("")
            $(".writeblogselect option:first").prop('selected', 'selected');
        },
        error: function () {

        }
    });
}


//删除我的博客
function deletethisblog(bid) {
    $.ajax({
        url: basepath + "blogs/"+bid,
        type: "DELETE",
        success: function () {
            alert("完成");
            $('.pagination').empty();
            var pagenum = getpageList(getblogCountByUid(uid),5);
            $(".pagination li").click(function(){
                pages($(this),pagenum,'',uid,'');

            });

            //默认打开第一页
            getmyblog(0,5,window.uid);
        },
        error: function () {
            alert("失败")
        }
    });
}

function changthisblogForVisibility(bid,visibility,_this) {

    $.ajax({
        url: basepath + "blogs/"+bid,
        data:{
            "visibility":visibility
        },
        type:"PUT",
        success:function () {
            alert("成功");
            if(visibility == "00"){
                _this.value = "显示"
            }else {
                _this.value = "隐藏"
            }


        },
        error:function(){
            alert("失败");
        }
    });
}
