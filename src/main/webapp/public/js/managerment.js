function backsatgeinit(basepath,resourcespath) {
    //获取url
    var array = new Array();
    array = currentUrl.split("/");
    var uid = array[array.length - 1];
    //存储我的博客
    window.uid = uid;

    initModule();


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

        switchfunc(value)
    })
//获取用户资料
    getUserInfo();
    initCategoryList();


    //点击事件，上传头相
    $(".uploadimg").click(function () {
        var formData = new FormData();
        var fileObj = $(".headp")[0].files[0];
        formData.append("img",fileObj);
        $.ajax({
            url:basepath+"users/"+username,
            type:"POST",
            processData:false,
            contentType:false,
            dataType:"json",
            data:formData,
            success:function () {
                alert("成功");
                window.location.reload();
            },
            error:function () {
                alert("失败");
            }
        })
    });


    //创建富文本编辑器
    var E = window.wangEditor;
    var editor = new E('#div1', '#div2');
    editor.customConfig.uploadImgServer = '/blog/blogs/images';
    editor.customConfig.uploadFileName = 'img';
    editor.create();
    window.myeditor = editor;

    //用户修改个人信息
    $('.changuserinfo').click(function(){
        var newphone = $('.newphone').val();
        var newemail = $('.newemail').val();
        var newsex = "";
        if($('.newsexmale').hasClass("active")){
            newsex = "00";
        }else {
            newsex = "01";
        }
        var newaddress = $('.newaddress').val();
        $.ajax({
            url:basepath+"users/"+username,
            type:"PUT",
            data:{
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
                    $('.newcategory').val("");
                    //把模态窗关闭
                    $('.modal-backdrop').hide();
                    $('#addnewcategory').hide();
                    //closeModal(addnewcategory);
                    getAllCategorys();

                },
                error:function () {

                }
            });
        }else {
            var oldcid = $('.hiddencategory').val();
            $.ajax({
                url:basepath+"categorys/"+oldcid,
                type:"PUT",
                data:{
                    "cname":newCategoryName
                },
                success:function(){
                    alert("成功");
                    $('.hiddencategory').val("");
                    $('.newcategory').val("");
                    //把模态窗关闭
                    $('.modal-backdrop').hide();
                    $('#addnewcategory').hide();
                    //closeModal(addnewcategory);
                    getAllCategorys();

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
        if(blogtitleid != null && blogtitleid != ''){
            updateblog(blogtitle,blogcategory,blogcontent,username,blogtitleid,editor);
        }else{
            newblog(blogtitle,blogcategory,blogcontent,username,editor);
        }

    });






    //getResourcestable();





    //添加新资源添加点击事件
    $('.submitresources').click(function () {
        var flg = $('.hiddenresources').val();
        if(flg == ""){
            addnewresources();
        }else {
            updateresourceToserver();
        }

    });




















    //在各项都初始化完成再隐藏
    $(".row").each(function () {
        $(this).hide()
    });
    $(".myprofile").show();

}


//获取博客（分页）
function getmyblog(offset,size,username){
    $('.myblogstable').empty();
    $.ajax({
        url:basepath+"blogs/users/"+username,
        data:{
            "offset":offset,
            "size":size
        },
        type:"GET",
        success:function (data) {

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
getblogCountByUid = function(username){
    var count = null;
    $.ajax({
        url:basepath+"blogs/count",
        type:"GET",
        dataType:"json",
        data:{
            "username":username
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
            html += "<li class='active' onclick='pages(this,\""+pagenum+"\")' ><a href='javascript:;'>"+i+"</a></li>"
        }else{
            html += "<li onclick='pages(this,\""+pagenum+"\")'><a href='javascript:;'>"+i+"</a></li>"
        }
    }
    $(".pagination").append(html);
    //返回总页码总量
    return pagenum;
}


//分页
pages = function(_this,lastLi){
    var firstLi = 1;
    //var lastLi = 15;
    //$(this).addClass("active").siblings().removeClass("active");
    $(_this).addClass("active").siblings().removeClass("active");
    //获取当前页的值
    var currentPage = parseInt($(_this).text());
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
    getmybloglist(currentPage,5,username);
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
        if($(this).val() == data['cid']){
            $(this).attr("selected",true);
        }
    })
}

//新建博客
function newblog(blogtitle,blogcategory,blogcontent,username,editor){
    $.ajax({
        url:basepath+"blogs",
        type:"POST",
        data:{
            "blogtitle":blogtitle,
            "blogcategory":blogcategory,
            "blogcontent":blogcontent,
            "username":username
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
function updateblog(blogtitle,blogcategory,blogcontent,username,bid,editor) {
    $.ajax({
        url: basepath + "blogs/"+bid,
        type: "PUT",
        data: {
            "blogtitle": blogtitle,
            "blogcategory": blogcategory,
            "blogcontent": blogcontent,
            "username": username
        },
        success: function () {
            alert("提交完成")
            $('.blogtitle').html("");
            $('.blogtitleid').val("");
            editor.txt.html("")
            $(".writeblogselect option:first").prop('selected', 'selected');
            editor.txt.clear();

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
            var uid = $.cookie("username");
            var pagenum = getpageList(getblogCountByUid(uid),5);
            // $(".pagination li").click(function(){
            //     pages($(this),pagenum,'',uid,'');
            //
            // });

            //默认打开第一页
            getmyblog(0,5,uid);
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

function addnewresources() {
    var sname = $('.newurlresources').val();
    if(sname == ""){
        alert("资源不可为空");
        return null;
    }
    $.ajax({
        url:basepath+"urlresources",
        data:{
            "sname":sname
        },
        type:"POST",
        success:function () {
            alert("成功");

            $('.hiddenresources').val("");
            $('.newurlresources').val("");

            closeModal("addurlResources");
            getResourcestable();
        },
        error:function () {
            
        }
    })
}

function getResourcestable() {
    $('.resourcestable').empty();
    $.ajax({
        url:basepath+"urlresources",
        type:"GET",
        success:function (data) {
            var resources = data["data"];
            $.each(resources,function (k,v) {
                var html = "<tr>";
                html += "<td>"+v["sname"]+"</td>";
                html += "<td><input type='button' onclick='deleteresources(\""+v["sid"]+"\")' value='删除'><input type='button' onclick='updateresources(\""+v["sid"]+"\")' value='修改' data-toggle=\"modal\" data-target=\"#addurlResources\"></td>";
                html += "</td>";
                $('.resourcestable').append(html);
            })
        },
        error:function () {
            
        }
    })
}

function deleteresources(sid) {
    $.ajax({
        url:basepath+"urlresources/"+sid,
        type:"DELETE",
        success:function () {
            alert("成功");
            getResourcestable();
        },
        error:function () {

        }
    });
}
//显示modal，为修改资源做准备
function updateresources(sid) {
    $('.hiddenresources').val(sid);
}
//将新的信息转入
function updateresourceToserver() {
    var reid = $('.hiddenresources').val();
    var sname = $('.newurlresources').val();
    $.ajax({
        url:basepath+"urlresources/"+reid,
        data:{
            "sname":sname
        },
        type:"PUT",
        success:function () {

            alert("success");
            closeModal("addurlResources");
            $('.hiddenresources').val("");
            getResourcestable();
            $(".urlresources-modal-title").html("添加新资源");
        },
        error:function () {
            
        }
    });
}
//根据点击项选择将要执行的函数
function switchfunc(value) {
    switch(value){
        case "touristpowers":showtouristpowers();break;
        case "normaluserpowers":shownormaluserpowers();break;
        case "adminpowers":showadminpowers();break;
        case "superadminpowers":showsuperadminpowers();break;
        case "myprofile":getUserInfo();break;
        case "categorymanager":getAllCategorys();break;
        case "mycollection":showmycollection();break;
        case "myblog":showmyblogs();break;
        case "usermanager":showNormalUser();break;
        case "urlresources":getResourcestable();break;
    }
}
function showtouristpowers() {
    $('.touristpowertable').empty();
    $.ajax({
        url:basepath+"power/role/"+"游客",
        type:"GET",
        success:function (value) {
            var data = value["data"];
            var html = "";
            $.each(data,function (k,v) {
                html += "<tr>"
                html+="<td>"+v["sname"]+"</td>"
                html += "<td>"
                if(v["gets"] == 0){
                    html+="<input type='button' value='GET' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }else {
                    html+="<input type='button' value='GET' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }
                if(v["posts"] == 0){
                    html+="<input type='button' value='POST' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }else {
                    html+="<input type='button' value='POST' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }
                if(v["puts"] == 0){
                    html+="<input type='button' value='PUT' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }else {
                    html+="<input type='button' value='PUT' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }
                if(v["deletes"] == 0){
                    html+="<input type='button' value='DELETE' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }else {
                    html+="<input type='button' value='DELETE' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"游客\")'/>"
                }



                html += "</td>"

            })
            $('.touristpowertable').append(html);
            
        },
        error:function () {
            
        }
    })
}

function shownormaluserpowers() {
    $('.normaluserpowertable').empty();
    $.ajax({
        url:basepath+"power/role/"+"普通用户",
        type:"GET",
        success:function (value) {
            var data = value["data"];
            console.log(data)
            var html = "";
            $.each(data,function (k,v) {
                html += "<tr>"
                html+="<td>"+v["sname"]+"</td>"
                html += "<td>"
                if(v["gets"] == 0){
                    html+="<input type='button' value='GET' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }else {
                    html+="<input type='button' value='GET' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }
                if(v["posts"] == 0){
                    html+="<input type='button' value='POST' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }else {
                    html+="<input type='button' value='POST' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }
                if(v["puts"] == 0){
                    html+="<input type='button' value='PUT' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }else {
                    html+="<input type='button' value='PUT' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }
                if(v["deletes"] == 0){
                    html+="<input type='button' value='DELETE' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }else {
                    html+="<input type='button' value='DELETE' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"普通用户\")'/>"
                }



                html += "</td>"

            })
            $('.normaluserpowertable').append(html);

        },
        error:function () {

        }
    })
}

function showadminpowers() {
    $('.adminpowertable').empty();
    $.ajax({
        url:basepath+"power/role/"+"管理员",
        type:"GET",
        success:function (value) {
            var data = value["data"];
            console.log(data)
            var html = "";
            $.each(data,function (k,v) {
                html += "<tr>"
                html+="<td>"+v["sname"]+"</td>"
                html += "<td>"
                if(v["gets"] == 0){
                    html+="<input type='button' value='GET' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }else {
                    html+="<input type='button' value='GET' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }
                if(v["posts"] == 0){
                    html+="<input type='button' value='POST' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }else {
                    html+="<input type='button' value='POST' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }
                if(v["puts"] == 0){
                    html+="<input type='button' value='PUT' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }else {
                    html+="<input type='button' value='PUT' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }
                if(v["deletes"] == 0){
                    html+="<input type='button' value='DELETE' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }else {
                    html+="<input type='button' value='DELETE' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"管理员\")'/>"
                }



                html += "</td>"

            })
            $('.adminpowertable').append(html);

        },
        error:function () {

        }
    })
}
function showsuperadminpowers() {
    $('.superadminpowertable').empty();
    $.ajax({
        url:basepath+"power/role/"+"超管",
        type:"GET",
        success:function (value) {
            var data = value["data"];
            console.log(data)
            var html = "";
            $.each(data,function (k,v) {
                html += "<tr>"
                html+="<td>"+v["sname"]+"</td>"
                html += "<td>"
                if(v["gets"] == 0){
                    html+="<input type='button' value='GET' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }else {
                    html+="<input type='button' value='GET' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }
                if(v["posts"] == 0){
                    html+="<input type='button' value='POST' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }else {
                    html+="<input type='button' value='POST' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }
                if(v["puts"] == 0){
                    html+="<input type='button' value='PUT' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }else {
                    html+="<input type='button' value='PUT' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }
                if(v["deletes"] == 0){
                    html+="<input type='button' value='DELETE' class='btn btn-default' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }else {
                    html+="<input type='button' value='DELETE' class='btn btn-primary' onclick='updatepower(this,\""+v["sname"]+"\",\"超管\")'/>"
                }



                html += "</td>"

            })
            $('.superadminpowertable').append(html);

        },
        error:function () {

        }
    })
}

function updatepower(_this,sname,rname) {
    var mname = $(_this).val();
    var delflg = null;
    if($(_this).hasClass('btn-default')){
        delflg = "00";
    }else if($(_this).hasClass('btn-primary')){
        delflg = "01";
    }
    $.ajax({
        url:basepath+"power/role/"+rname,
        data:{
           "mname":mname,
            "sname":sname,
           "delflg":delflg 
        },
        type:"PUT",
        success:function (data) {
            var result = data["data"];
            if(result == "00"){
                $(_this).removeClass('btn-default');
                $(_this).addClass('btn-primary');
            }else{
                $(_this).removeClass('btn-primary');
                $(_this).addClass('btn-default');
            }

        },
        error:function () {
            
        }
    })

}

function getUserInfo() {
    //默认打开的是个人资料界面
    $.ajax({
        type:"GET",
        url:basepath+"users/"+username,
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
                if(k == "role"){
                    $('.identity').html(v["rname"]);
                    $('.newidentity').val(v["rname"]);
                }
            });
            console.log(user["uname"])
            //$(".username").html(user["uname"]);
            $(".username").html(username);

        },
        error:function (data) {
            console.log(data);
        }
    });

}
function getAllCategorys() {
    $('.categorymanager .col-md-12').empty();
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


            //删除种类
            $('.deletecategorybtn').click(function () {
                var id = $(this).attr("name");
                $.ajax({
                    url:basepath+"categorys/"+id,
                    type:"DELETE",
                    success:function () {
                        alert("成功");
                       // window.location.reload();
                        getAllCategorys();
                    },error:function () {

                    }
                });
            });


        },
        error:function(){

        }
    });

}
//初始化用户创建博客时候展示种类列表
function initCategoryList() {
    $.ajax({
        url:basepath+"categorys",
        type:"GET",
        dataType:"json",
        success:function(data){
            var category = data["category"];
            //添加种类到写博客的种类表
            var htmlc = "<option>请选择类型</option>";
            $.each(category,function(k,v){
                htmlc += "<option value ='"+v["cid"]+"'>"+v["cname"]+"</option>";
            });
            $('.writeblogselect').empty();
            $('.writeblogselect').append(htmlc);

        },
        error:function(){

        }
    });
}

function closeModal(idname) {
    //关闭模态窗
    $('.modal-backdrop').remove();
    $('#'+idname).removeClass('in');
    $('#'+idname).css("display","none");
    $('.modal-open').css("padding-right","0px");
    $('body').removeClass("modal-open");
}

//展示我的收藏
function showmycollection() {
    getcollectionpageList(showmycollectionnum(),5);
    getmycollection(0,5);

    //首次显示将多出来的部分隐藏
    $(".collectionspagination li").each(function (k,v) {
        if(k >4){
            $(this).hide();
        }
    });

}
function getmycollection(offset,size) {
    $.ajax({
        url:basepath+"collections/users/name/"+username,
        type:"GET",
        data:{
            "offset":offset,
            "size":size
        },
        success:function (data) {
            //mycollectiontable
            var list = data["data"];
            var html = "";
            $.each(list,function (k,v) {
                html += "<tr><td>"+v["btitle"]+"</td><td>"+v["createtime"]+"</td><td>"+v["uname"]+"</td><td><input type='button' value='取消收藏' onclick='cancelcollect(\""+v["cid"]+"\")'></td></tr>"
            });
            $('.mycollectiontable').empty().append(html);
            console.log(data)
        },
        error:function () {

        }
    })
}

//展示我的收藏
function showmycollectionnum() {
    var collectioncount = -1;
    $.ajax({
        url:basepath+"collections/users/name/"+username+"/count",
        type:"GET",
        async:false,
        success:function (data) {
            collectioncount = data["data"];
        },
        error:function () {

        }
    });
    return collectioncount;
}

//生成总的页码   数据总量  每页显示的数量
function getcollectionpageList(total,size){
    $(".collectionspagination").empty();
    var pagenum = Math.ceil(total/size);
    var html = "";
    for(var i=1;i<=pagenum;i++){
        if(i ==1){
            html += "<li class='active' onclick='collectionpage(this,"+pagenum+")'><a href='javascript:;'>"+i+"</a></li>"
        }else{
            html += "<li onclick='collectionpage(this,"+pagenum+")'><a href='javascript:;'>"+i+"</a></li>"
        }
    }
    $(".collectionspagination").append(html);
    window.collectionpagecount = pagenum;
    //返回总页码总量
    return pagenum;
}

//分页
function collectionpage(_this,lastLi){
    var firstLi = 1;
    //$(this).addClass("active").siblings().removeClass("active");
    $(_this).addClass("active").siblings().removeClass("active");
    //获取当前页的值
    var currentPage = parseInt($(_this).text());
    if(isNaN(currentPage)){
        currentPage = 0;
        return ;
    }
    var count = 0;
    $(".collectionspagination li").each(function(k,v){
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
    getmycollectionlist(currentPage,5);
}

//获取数据并且展示  currentPage当前页面  size每页数量
function getmycollectionlist(currentPage,size) {
    var offset = (currentPage-1)*size;
    getmycollection(offset,size);
}
//取消收藏
function cancelcollect(cid) {
    $.ajax({
        url:basepath+"collections/"+cid,
        type:"PUT",
        success:function () {
            alert("成功");
            showmycollection();
        },
        error:function () {
            
        }
    })
}

function logoutfn() {
    $.cookie("token", null,{path:"/"});
    $.cookie("username", null,{path:"/"});
}

function showmyblogs() {
    $(".pagination").empty();
    var pagenum = getpageList(getblogCountByUid(username),5);

    //默认打开第一页
    getmyblog(0,5,username);
//首次显示将多出来的部分隐藏
    $(".myblogpagination li").each(function (k,v) {
        if(k >4){
            $(this).hide();
        }
    });
}

//显示普通用户与普通管理员

function showNormalUser() {

    getNormaluserList(getNormalUsersCount(),5);
    getNormalUser(0,5);

    //首次显示将多出来的部分隐藏
    $(".usermanagerpagination li").each(function (k,v) {
        if(k >4){
            $(this).hide();
        }
    });
}

//获取非超管用户人数
function getNormalUsersCount() {
    var count = -1;
    $.ajax({
        url:basepath+"users/normalusers/count",
        type:"GET",
        async:false,
        success:function (data) {
            window.normalusercount = data["count"];
            count = data["count"];
            console.log("总量"+count);
        },
        error:function () {
            alert("fail");
        }
    });
    return count;
}


//分页  获取用户
function getNormalUser(offset,size) {
    $('.usermanagertable').empty();
    $.ajax({
        url:basepath+"users/normalusers",
        data:{
            "offset":offset,
            "size":size
        },
        type:"GET",
        success:function (data) {

            var list = data["data"];
            console.log(list);
            $.each(list,function (k,v) {
                var vis = "隐藏";
                if(v['visible'] == '01'){
                    vis = "显示";
                }
                var html = "<tr>";
                html += "<td>"+v['uname']+"</td>";
                html += "<td>"+v['rname']+"</td><td>";
                if(v['rname'] == "管理员"){
                    html += "<input type='button'  value='移除管理员身份' onclick='changeUserIdentity(\""+v["uname"]+"\",this)'>";
                }else{
                    html += "<input type='button'  value='添加管理员身份'  onclick='changeUserIdentity(\""+v["uname"]+"\",this)'>";
                }

                html += "</td>";
                html += "</tr>";
                $('.usermanagertable').append(html);
            });

        },
        error:function () {

        }
    });
}

//分页
function getnormaluserpage(_this,lastLi){
    var firstLi = 1;
    //$(this).addClass("active").siblings().removeClass("active");
    $(_this).addClass("active").siblings().removeClass("active");
    //获取当前页的值
    var currentPage = parseInt($(_this).text());
    if(isNaN(currentPage)){
        currentPage = 0;
        return ;
    }
    var count = 0;
    $(".usermanagerpagination li").each(function(k,v){
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
    getNormalUser((currentPage-1)*5,5);
}

//生成总的页码   数据总量  每页显示的数量
function getNormaluserList(total,size){
    $(".usermanagerpagination").empty();
    var pagenum = Math.ceil(total/size);
    var html = "";
    for(var i=1;i<=pagenum;i++){
        if(i ==1){
            html += "<li class='active' onclick='getnormaluserpage(this,"+pagenum+")'><a href='javascript:;'>"+i+"</a></li>"
        }else{
            html += "<li onclick='getnormaluserpage(this,"+pagenum+")'><a href='javascript:;'>"+i+"</a></li>"
        }
    }
    $(".usermanagerpagination").append(html);
    window.normaluserpagecount = pagenum;
    //返回总页码总量
    return pagenum;
}

//修改用户身份
function changeUserIdentity(uname,_this,rname) {
    $.ajax({
        url:basepath+"users/normalusers/"+uname,
        type:"PUT",
        success:function () {
            var offset = parseInt($(".usermanagerpagination  .active").text());
            getNormalUser(offset,5);
        },
        error:function () {
            
        }
    });
}

//初始化模块界面
function initModule() {
    $.ajax({
        url:basepath+"power/module",
        type:"GET",
        async:false,
        success:function (data) {
            //console.log(data["data"]);
            //左侧栏目删除
            $("#main-menu li").each(function(){
                //console.log($(this).attr("data-value"));
                var value = $(this).attr("data-value");
                if($.inArray(value,data["data"]) != -1){
                    $(this).remove();
                }
            });
            //右侧内容删除
            $.each(data["data"],function (k,v) {
                $(".row ."+v).remove();
            })
        },
        error:function () {
            $(location).attr('href', basepath+"login.html");
        }
    });
}

function tostagefunc() {
    window.location.href = basepath+"stage.html";
}
