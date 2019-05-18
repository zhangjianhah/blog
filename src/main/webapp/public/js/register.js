function init() {

    window.onload = function (ev) {


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
    //判断该用户名已经被注册
    $(".uname").blur(function () {
        checkSameUname();
    });



}
function registeruser() {
    var uname = $(".uname").val();
    var pwd = $(".pwd").val();
    var phone = $(".phone").val();
    var email = $(".email").val();
    var birthday = $('.birthday').val();

    if(!(/^1[34578]\d{9}$/.test(phone))){
        alert("手机号码有误，请重填");
        return false;
    }
    var reg1 = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
    var t = reg1.test(email);
    if(!(reg1.test(email))) {
        alert('邮箱格式不正确', {icon: 2,time: 1000});
        return false;
    }


    $.ajax({
        type:"POST",
        url:basepath+"users",
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
                window.location.replace(basepath+"login.html")
            }else {
                alert("失败")
            }
        },
        error:function () {

        }
    });
}



function checkSameUname() {
    var uname = $(".uname").val();
    $.ajax({
        url:basepath+"users/name/"+uname,
        type:"GET",
        success:function (data) {
            if(data["data"] != null){
                $(".submit").attr("disabled",true);
                alert("该用户名已经被注册");

            }else {
                $(".submit").attr("disabled",false);
            }
        },
        error:function () {
            
        }
    })
}