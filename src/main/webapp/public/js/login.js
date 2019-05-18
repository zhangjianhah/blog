function init() {

    loginfunc();
    getIdentifyingcode();

}


function loginfunc() {
    $(".login").click(function () {

        var account = $(".account").val();
        var pwd = $(".pwd").val();
        var identifyingcode = $(".identifyingcode").val();
        $.ajax({
            type:"POST",
            url:basepath+"users/login",
            data:{
                "account":account,
                "pwd":pwd,
                "identifyingcode":identifyingcode
            },
            dataType: "json",
            success:function(data){
                console.log(data)
                console.log(data["userid"]);
                if(data["error"] != null){
                    alert(data["error"]);
                }
                if(data["userid"] != ""){
                    window.location.replace(basepath+"managerment.html")
                }else {
                    alert("对不起，账号或密码输入错误")
                }

            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                var data = XMLHttpRequest.responseJSON;
                alert(data["error"]);
                $(".identifyingcode").val("")
            }

        });
    })
}

function toregisterfunc() {
    window.location.replace(basepath+"register.html");
}

//获取验证码
function getIdentifyingcode() {
    $(".identifyingcodeimg").attr("src",basepath+"identifyingcode");
    $(".identifyingcodeimg").click(function () {
        $(".identifyingcodeimg").attr("src",basepath+"identifyingcode?r="+Math.random(10));
    });
}