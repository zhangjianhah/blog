<%--
  Created by IntelliJ IDEA.
  User: zhangjian
  Date: 2019/1/25
  Time: 12:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">

    <link rel="stylesheet" href=".././public/css/articles.css">
</head>
<body>
<div class="container" style="width: 100%;">
    <div class="top">
        <div class="userinfo"style="float: left;width: 30%; text-align: center;margin-top: 20px;">
            <img class="img-rounded userimg" style="width: 100px;height: 100px;" src="http://localhost:8080/resources//headportrait/admin/2019-02-05-14-06-15.jpg">
            <h1 class="username"></h1>
            <div class="userinfo">
                <div class="userinfo-blogcount">
                    <p>总发表数</p>
                    <p class="blogcount">0</p>
                </div>
                <div class="userinfo-blogcollectioncount">
                    <p>总被收藏次数</p>
                    <p class="collectioncount">0</p>
                </div>
                <div class="userinfo-commentnumcount">
                    <p>总评论数</p>
                    <p class="commentcount">0</p>
                </div>
            </div>
        </div>
        <div class="bloginfo" style="float: left;width: 70%;">
            <h2 class="blogtitle"></h2>
            <h5>创建时间：<span class="blogtime"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种类：<span class="blogcategory"></span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="blogreadtimes"></span></h5>
            <div class="blogcontent"></div>
            <div>
                <button onclick="showcommentsfn()">我来说一句</button>
                <button onclick="collectblogfn()" class="collectionblog">收藏</button>
            </div>

            <div class="showcomments">
                <div class="commentslist"></div>
            </div>
            <div style="clear: both;">

            </div>
            <ul class="pagination" ></ul>

        </div>
    </div>
    <div class="bottom" style="width: 100%;">

        <div class='commentarea' style="position:fixed; bottom:0;width:100%;z-index:999;display: none;">
            <div style="text-align:center">
                <textarea name='文本域名称' value='文本域默认值'  rows='5'cols='150' class="texta"></textarea>
                <br>
                <input type='button' value='确认' class='submitComment' onclick="submitCommentfn()">
                <input type='button' value='取消' class='cancelComment'>
            </div>
        </div>

    </div>
</div>


</body>
<!-- jQuery (Bootstrap 的所有 JavaScript 插件都依赖 jQuery，所以必须放在前边) -->
<script src=".././public/js/jquery-3.3.1.min.js"></script>
<!-- 加载 Bootstrap 的所有 JavaScript 插件。你也可以根据需要只加载单个插件。 -->
<script src=".././public/js/bootstrap.min.js"></script>
<script src=".././public/js/jquery.cookie.js"></script>
<!-- 加载自定义的js -->
<script src=".././public/js/articles.js"></script>

<script>
    var currentUrl = window.location.href;
    var lastbias = currentUrl.lastIndexOf('/');
    var urlpath = currentUrl.substr(0,lastbias);
    var basepath = urlpath.substr(0,urlpath.lastIndexOf('/'));
    var resourcepath = basepath.substr(0,basepath.lastIndexOf('/')+1);
    var articleid = currentUrl.substr(lastbias+1,currentUrl.length);
    urlpath = currentUrl.replace(location.pathname,"");
    urlpath = urlpath+"/resources"
    init();




</script>
</html>
