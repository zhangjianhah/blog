<%--
  Created by IntelliJ IDEA.
  User: zhangjian
  Date: 2019/1/9
  Time: 10:57
  To change this template use File | Settings | File Templates.
--%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
    String resourcespath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + "/resources/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>博客</title>
    <%--<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">--%>
    <link rel="stylesheet" href="./public/assets/materialize/css/materialize.min.css" media="screen,projection" />
    <!-- Bootstrap Styles-->
    <link href="./public/assets/css/bootstrap.css" rel="stylesheet" />
    <!-- FontAwesome Styles-->
    <link href="./public/assets/css/font-awesome.css" rel="stylesheet" />
    <!-- Morris Chart Styles-->
    <link href="./public/assets/js/morris/morris-0.4.3.min.css" rel="stylesheet" />
    <!-- Custom Styles-->
    <link href="./public/assets/css/custom-styles.css" rel="stylesheet" />
    <!-- Google Fonts-->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <link rel="stylesheet" href="./public/assets/js/Lightweight-Chart/cssCharts.css">
    <style type="text/css">
        .editortoolbar {
            border: 1px solid #ccc;
            background: aliceblue;
        }
        .editortext {
            border: 1px solid #ccc;
            height: 400px;
            background: aliceblue;
        }
    </style>
</head>

<body>
<!-- 模态框（Modal） -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" backdrop="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">个人资料修改</h4>
            </div>
            <div class="modal-body">
                用户名：<input type="text" class="newuname">
                手机号<input type="text" class="newphone">
                邮箱：<input type="text" class="newemail">
                性别：<div class="btn-group" data-toggle="buttons">
                        <label  class="btn btn-info newsexmale"><input  type="radio" name="options" > 男</label>
                        <label  class="btn btn-info newsexfemale"><input  type="radio" name="options" > 女</label>
                    </div>
                <br>住址：<input type="text" class="newaddress">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary changuserinfo">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<!-- 模态框（Modal） -->
<div class="modal fade" id="addnewcategory" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" backdrop="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">个人资料修改</h4>
            </div>
            <div class="modal-body">
                新名称：<input type="text" class="newcategory">
                <input type="hidden" class="hiddencategory" value="">

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary submitcategory">提交更改</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div id="wrapper" style="margin-top: -8px;">
    <nav class="navbar navbar-default top-navbar" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle waves-effect waves-dark" data-toggle="collapse" data-target=".sidebar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand waves-effect waves-dark" href="index.html"><i class="large material-icons">track_changes</i> <strong>target</strong></a>

            <div id="sideNav" href=""><i class="material-icons dp48">toc</i></div>
        </div>

        <ul class="nav navbar-top-links navbar-right">
            <li><a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown4"><i class="fa fa-envelope fa-fw"></i> <i class="material-icons right">arrow_drop_down</i></a></li>
            <li><a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown3"><i class="fa fa-tasks fa-fw"></i> <i class="material-icons right">arrow_drop_down</i></a></li>
            <li><a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown2"><i class="fa fa-bell fa-fw"></i> <i class="material-icons right">arrow_drop_down</i></a></li>
            <li><a class="dropdown-button waves-effect waves-dark" href="#!" data-activates="dropdown1"><i class="fa fa-user fa-fw"></i> <b>John Doe</b> <i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
    </nav>
    <!-- Dropdown Structure -->
    <ul id="dropdown1" class="dropdown-content">
        <li><a href="#"><i class="fa fa-user fa-fw"></i> My Profile</a>
        </li>
        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
        </li>
        <li><a href="#"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
        </li>
    </ul>
    <ul id="dropdown2" class="dropdown-content w250">
        <li>
            <div>
                <i class="fa fa-comment fa-fw"></i> New Comment
                <span class="pull-right text-muted small">4 min</span>
            </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <div>
                <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                <span class="pull-right text-muted small">12 min</span>
            </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <div>
                <i class="fa fa-envelope fa-fw"></i> Message Sent
                <span class="pull-right text-muted small">4 min</span>
            </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <div>
                <i class="fa fa-tasks fa-fw"></i> New Task
                <span class="pull-right text-muted small">4 min</span>
            </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <div>
                <i class="fa fa-upload fa-fw"></i> Server Rebooted
                <span class="pull-right text-muted small">4 min</span>
            </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a class="text-center" href="#">
                <strong>See All Alerts</strong>
                <i class="fa fa-angle-right"></i>
            </a>
        </li>
    </ul>
    <ul id="dropdown3" class="dropdown-content dropdown-tasks w250">
        <li>
            <a href="#">
                <div>
                    <p>
                        <strong>Task 1</strong>
                        <span class="pull-right text-muted">60% Complete</span>
                    </p>
                    <div class="progress progress-striped active">
                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                            <span class="sr-only">60% Complete (success)</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a href="#">
                <div>
                    <p>
                        <strong>Task 2</strong>
                        <span class="pull-right text-muted">28% Complete</span>
                    </p>
                    <div class="progress progress-striped active">
                        <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="28" aria-valuemin="0" aria-valuemax="100" style="width: 28%">
                            <span class="sr-only">28% Complete</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a href="#">
                <div>
                    <p>
                        <strong>Task 3</strong>
                        <span class="pull-right text-muted">60% Complete</span>
                    </p>
                    <div class="progress progress-striped active">
                        <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
                            <span class="sr-only">60% Complete (warning)</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a href="#">
                <div>
                    <p>
                        <strong>Task 4</strong>
                        <span class="pull-right text-muted">85% Complete</span>
                    </p>
                    <div class="progress progress-striped active">
                        <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style="width: 85%">
                            <span class="sr-only">85% Complete (danger)</span>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>
    </ul>
    <ul id="dropdown4" class="dropdown-content dropdown-tasks w250 taskList">
        <li>
            <div>
                <strong>John Doe</strong>
                <span class="pull-right text-muted">
                                        <em>Today</em>
                                    </span>
            </div>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <div>
                <strong>John Smith</strong>
                <span class="pull-right text-muted">
                                        <em>Yesterday</em>
                                    </span>
            </div>
            <p>Lorem Ipsum has been the industry's standard dummy text ever since an kwilnw...</p>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a href="#">
                <div>
                    <strong>John Smith</strong>
                    <span class="pull-right text-muted">
                                        <em>Yesterday</em>
                                    </span>
                </div>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the...</p>
            </a>
        </li>
        <li class="divider"></li>
        <li>
            <a class="text-center" href="#">
                <strong>Read All Messages</strong>
                <i class="fa fa-angle-right"></i>
            </a>
        </li>
    </ul>
    <!--/. NAV TOP  -->
    <nav class="navbar-default navbar-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav" id="main-menu">

                <li class="active-menu waves-effect waves-dark" data-value="myprofile">
                    <a><i class="fa fa-dashboard"></i>我的资料</a>
                </li>
                <li class="waves-effect waves-dark" data-value="myblog">
                    <a><i class="fa fa-desktop"></i>我的博客</a>
                </li>
                <li class="waves-effect waves-dark" data-value="mycollection">
                    <a><i class="fa fa-bar-chart-o"></i>我的收藏</a>
                </li>
                <li class="waves-effect waves-dark"  data-value="writeblog">
                    <a><i class="fa fa-qrcode"></i>创作博客</a>
                </li>

                <li class="waves-effect waves-dark" data-value="categorymanager">
                    <a><i class="fa fa-table"></i>种类管理</a>
                </li>
                <li class="waves-effect waves-dark">
                    <a><i class="fa fa-edit"></i> Forms </a>
                </li>



                <li class="waves-effect waves-dark">
                    <a><i class="fa fa-fw fa-file"></i> Empty Page</a>
                </li>
            </ul>

        </div>

    </nav>
    <!-- /. NAV SIDE  -->

    <div id="page-wrapper">
        <h1 class="page-header">
            我的资料
        </h1>
        <div id="page-inner" class="page-inner">

<%--内容块--%>
    <div class="row myprofile">

        <div class="col-md-3">
            <img src="" class="headprotrait img-rounded" style="height: 150px;width: 150px;">
            <form enctype="multipart/form-data">
                <input type="file" value="请选择图片" class="headp" id="headportrait">

            </form>
            <input type="button" value="提交" class="uploadimg">
        </div>
        <div class="col-md-9">
            <p>用户名：<span class="uname"></span></p>
            <p>手机号：<span class="phone"></span></p>
            <p>邮箱：<span class="email"></span></p>
            <p>性别：<span class="sex"></span></p>
            <p>真实姓名：<span class="realname"></span></p>
            <p>住址：<span class="address"></span></p>
            <p>身份：<span class="identity"></span></p>
            <!-- 按钮触发模态框 -->
            <button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">修改个人资料</button>



        </div>
    </div>
    <div class="row myblog">
        <div class="col-md-12" >
            <table class="myblogstable">
            </table>
            <ul class="pagination" ></ul>
        </div>

    </div>
    <div class="row mycollection">
        <div class="col-md-12" style="background: #0f9d58">

        </div>

    </div>
    <!--  写博客 -->
    <div class="row writeblog">
        标题：<input type="text" class="blogtitle">
        <input type="hidden" class="blogtitleid">

    </div>
    <select class="row writeblog writeblogselect"></select>
    <div class="row writeblog editortoolbar" id="div1"></div>
    <div class="row writeblog editortext" id="div2"></div>
    <div class="row writeblog">
        <input type="button" class="blogsubmit" value="提交">
    </div>
    <div class="row categorymanager table-responsive">
        <input type="button" value="增加新类型" class="addcategory" data-toggle="modal" data-target="#addnewcategory">
        <div class="col-md-12" style="height: 100px;">

        </div>

    </div>


        </div>
        <!-- /. PAGE INNER  -->
    </div>
    <!-- /. PAGE WRAPPER  -->
</div>
<!-- /. WRAPPER  -->
<!-- JS Scripts-->
<!-- jQuery Js -->
<script src="./public/assets/js/jquery-1.10.2.js"></script>

<!-- Bootstrap Js -->
<script src="./public/assets/js/bootstrap.min.js"></script>

<script src="./public/assets/materialize/js/materialize.min.js"></script>

<!-- Metis Menu Js -->
<script src="./public/assets/js/jquery.metisMenu.js"></script>
<!-- Morris Chart Js -->
<script src="./public/assets/js/morris/raphael-2.1.0.min.js"></script>
<script src="./public/assets/js/morris/morris.js"></script>


<script src="./public/assets/js/easypiechart.js"></script>
<script src="./public/assets/js/easypiechart-data.js"></script>

<script src="./public/assets/js/Lightweight-Chart/jquery.chart.js"></script>

<!-- Custom Js -->
<script src="./public/assets/js/custom-scripts.js"></script>
<!-- wangEditor编辑器 -->
<script src="./public/js/wangEditor.js"></script>
<script src="./public/js/backstage.js"></script>
<script src="./public/js/paginator.js"></script>

<script>
    var currentUrl = window.location.href;
    var s = currentUrl.lastIndexOf('/');
    var basepath = currentUrl.substr(0,s+1);
    console.log(basepath);
    backsatgeinit("<%=resourcespath%>");




</script>


</body>

</html>
