<%--
  Created by IntelliJ IDEA.
  User: zhangjian
  Date: 2019/1/9
  Time: 11:36
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
    <title>登陆</title>
    <script type="text/javascript" src="./public/js/jquery-3.3.1.min.js"></script>
</head>
<body>
账号：<input type="text" class="account"><br>
密码：<input type="password" class="pwd">
<input type="button" value="确定" class="login">
<input type="button" value="注册" class="register"><br>
</body>
<script>
    window.onload = function (ev) {
        console.log("<%= basePath%>")
        $(".login").click(function () {

            var account = $(".account").val();
            var pwd = $(".pwd").val();
            $.ajax({
                type:"POST",
                url:"<%= basePath%>users/login",
                data:{
                    account:account,
                    pwd:pwd
                },
                dataType: "json",
                success:function(data){
                    console.log(data)
                    console.log(data["userid"])
                    if(data["userid"] != ""){
                        window.location.replace("<%=basePath%>"+data["userid"])
                    }else {
                        alert("对不起，账号或密码输入错误")
                    }

                }

            });
        })
    }
</script>
</html>
