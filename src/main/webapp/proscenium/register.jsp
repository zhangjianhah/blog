<%--
  Created by IntelliJ IDEA.
  User: zhangjian
  Date: 2019/1/10
  Time: 12:13
  To change this template use File | Settings | File Templates.
--%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
            + path + "/";
%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>注册</title>
    <link href="./public/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="./public/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">


</head>
<body>
用户名：<input type="text" class="uname"><br>
密码：<input type="password" class="pwd"><br>
手机：<input type="text" class="phone"><br>
邮箱：<input type="text" class="email"><br>

<div class="input-group date form_date col-md-3"  data-date-format="yyyy-mm-dd" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
    <span class="input-group-addon">出生日期：</span>
    <input class="form-control" size="16" type="text" value="" readonly>
    <span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>
    <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
</div>
<input type="hidden" id="dtp_input2" value="" class="birthday"/><br/>

<br>
<input type="button" value="提交" class="submit">


</body>
<script type="text/javascript" src="./public/js/jquery-3.3.1.min.js"></script>
<script src="./public/js/bootstrap.min.js" type="text/javascript"></script>
<script src="./public/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
<script src="./public/js/bootstrap-datetimepicker.fr.js" type="text/javascript" charset="UTF-8"></script>
<script>
    window.onload = function (ev) {
       $(".submit").click(function(){
           var uname = $(".uname").val();
           var pwd = $(".pwd").val();
           var phone = $(".phone").val();
           var email = $(".email").val();
           var birthday = $('.birthday').val();
           $.ajax({
               type:"POST",
               url:"<%=basePath%>users",
               data:{
                   uname:uname,
                   pwd:pwd,
                   phone:phone,
                   email:email,
                   birthdday:birthday
               },
               dataType:"json",
               success:function (data) {
                    if(data["result"] == 1){
                        alert("成功")
                        window.location.replace("<%=basePath%>login")
                    }else {
                        alert("失败")
                    }
               },
               error:function () {

               }
           });

       });

        //date插件
        $('.form_date').datetimepicker({
            language:  'fr',
            weekStart: 1,
            todayBtn:  1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
    }
</script>
</html>
