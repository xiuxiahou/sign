/**
 * Created by 0FAshion on 2016/7/1.
 */
$(function () {
    //修改个人信息
    $(".personal_info").click(function () {
        $(".only_info").animate({left: '0'})
    });
    /* 修改MAC 地址页面*/
    $("#mac,#change_mac").click(function () {
        $(".MAC_info").animate({left: '0'})
    });

    //修改密码页面
    $("#password,#change_psd").click(function () {
        $(".password_info").animate({ left: '0' });
    });

    /*隐藏弹出层*/
    $(".back_tx").click(function () {
        $(".only_info,.MAC_info,.password_info").animate({left: '150%'})
    });

    /*三级页面 个人信息*/
    /*修改头像*/
    $("#img").click(function(){
        var imgs = $(this).attr('src');
        console.log("imgs",imgs);
        var file = $("#file_img").val();
    });

    /*真实姓名*/
    $("#true_name").click(function () {
        $(".true_name").animate({left: '0'})
    });

    /*电话号码*/
    $("#number_phone").click(function () {
        $(".number_phone").animate({left: '0'})
    });
    $(".three_bck").click(function () {
        $(".true_name,.number_phone,.email,.data_of_birth").animate({left: '150%'})
    });

    /*性别*/
    $("#sex_div").click(function () {
        $("#sex_bg,#sex").show();
    });
    /*性别单选框*/
    $(":radio").click(function(){
        var valu = $(this).val();
        $("#sex_div").html(valu);
        $("#sex_bg,#sex").hide();
    });

    /*邮箱地址*/
    $("#email_id").click(function(){
        $(".email").animate({left:'0'});
    });
    //生日
    $('#birth_data').click(function(){
        $(".data_of_birth").animate({left:'0'})
    });

    //初始化员工信息
    //initData();
});

/*修改头像代码*/
$(function () {
    function toFixed2(num) {
        return parseFloat(+num.toFixed(2));
    }

    $('#cancleBtn').on('click', function () {
        $("#showEdit").fadeOut();
        $('#showResult').fadeIn();
    });

    $('#confirmBtn').on('click', function () {
        //debugger
        $("#showEdit").fadeOut();

        var $image = $('#report > img');
        var dataURL = $image.cropper("getCroppedCanvas");
        var imgurl = dataURL.toDataURL("image/jpeg", 0.5);
        $("#changeAvatar > img").attr("src", imgurl);
        $("#basetxt").val(imgurl);
        $('#showResult').fadeIn();
        var adminId = localStorage.AdminId;
        $.ajax({
            url: "/admin/Upload",
            type: "post",
            data: { file: imgurl, AdminId: adminId },
            success: function (data) {
            }
        });
    });

    function cutImg() {
        $('#showResult').fadeOut();
        $("#showEdit").fadeIn();
        var $image = $('#report > img');
        $image.cropper({
            aspectRatio: 1 / 1,
            autoCropArea: 0.7,
            strict: true,
            guides: false,
            center: true,
            highlight: false,
            dragCrop: false,
            cropBoxMovable: false,
            cropBoxResizable: false,
            zoom: -0.2,
            checkImageOrigin: true,
            background: false,
            minContainerHeight: 400,
            minContainerWidth: 300
        });
    }

    function doFinish(startTimestamp, sSize, rst) {
        var finishTimestamp = (new Date()).valueOf();
        var elapsedTime = (finishTimestamp - startTimestamp);
        //$('#elapsedTime').text('压缩耗时： ' + elapsedTime + 'ms');

        var sourceSize = toFixed2(sSize / 1024),
            resultSize = toFixed2(rst.base64Len / 1024),
            scale = parseInt(100 - (resultSize / sourceSize * 100));
        $("#report").html('<img src="' + rst.base64 + '" style="width: 100%;height:100%">');
        cutImg();
    }

    $('#image').on('change', function () {
        var startTimestamp = (new Date()).valueOf();
        var that = this;
        lrz(this.files[0], {
            width: 800,
            height: 800,
            quality: 0.7
        })
            .then(function (rst) {
                //console.log(rst);
                doFinish(startTimestamp, that.files[0].size, rst);
                return rst;
            })
            .then(function (rst) {
                // 这里该上传给后端啦
                // 伪代码：ajax(rst.base64)..

                return rst;
            })
            .then(function (rst) {
                // 如果您需要，一直then下去都行
                // 因为是Promise对象，可以很方便组织代码 \(^o^)/~
            })
            .catch(function (err) {
                // 万一出错了，这里可以捕捉到错误信息
                // 而且以上的then都不会执行

                alert(err);
            })
            .always(function () {
                // 不管是成功失败，这里都会执行
            });
    });
    initData();

    //修改真实姓名
    $("#saveRealName").on("click", function () {
        var realName = $("#name_tue").val();
        var flag = 0;//真实姓名
        if (realName == null || realName == "" || realName == undefined) {
            showDialog("请填写名称");
            return false;
        } else {
            if (realName.length > 20 || realName.length < 1) {
                showDialog("字符串长度1~20");
                return false
            } else {
                UpdateData(realName, flag);
            }
        }
    });
    //修改性别
    $("#woman").on("click", function () {
        var flag = 2;//性别
        var gender = 0;//女
        $("#woman").attr("checked", true);
        $("#man").removeAttr("checked");
        UpdateData(gender, flag);
    });
    $("#man").on("click", function () {
        var flag = 2;//性别
        var gender = 1;//男
        $("#man").attr("checked", true);
        $("#woman").removeAttr("checked");
        UpdateData(gender, flag);
    });
    //修改邮箱
    $("#saveEmail").on("click", function () {
        var email = $("#id_email").val();
        var flag = 3;
        if (email == null || email == "" || email == undefined) {
            showDialog("请填写邮箱");
            return false;
        } else {
            if (email.length > 32) {
                showDialog("字符串最大长度32");
                return false;
            } else {
                var patt = "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$";
                var regex = new RegExp(patt);
                if (regex.test(email)) {
                    UpdateData(email, flag);
                } else {
                    showDialog("邮箱格式错误");
                    return false;
                }               
            }
        }
    });
    //修改生日
    $("#birthday").on("change", function () {
        var date = $("#birthday").val();
        var flag = 4;
        UpdateData(date, flag);
    });
    //修改Mac
    $("#saveMac").on("click", function () {
        var flag = 5;
        var mac = $("#mac_id").val();
        if (mac == null || mac == "" || mac == undefined) {
            showDialog("请填写mac地址");
            return false;
        } else {
            if (mac.length > 12) {
                showDialog("字符串最大长度12");
                return false
            } else {
                UpdateData(mac, flag);
            }
        }
    })
    //修改密码
    $("#savePass").on("click", function () {
        var oldPass = $("#psd").val();
        var first = $("#newpsd").val();
        var second = $("#newpsd_agin").val();
        if (oldPass == null || oldPass == "" || oldPass == undefined) {
            showDialog("请填写原始密码");
            return false;
        } else {
            if (first != second) {
                showDialog("两次密码不一致");
                return false
            } else {
                if (first.length > 16 || first.length<6) {
                    showDialog("密码长度6~16位");
                    return false
                } else {
                    resetPass(oldPass, first);
                }
            }
        }
    });
    //修改手机号码
    $("#savePhone").on("click", function () {
        var flag = 1;
        var phone = $("#phone_number").val();
        if (phone == null || phone == "" || phone == undefined) {
            showDialog("请填手机号码");
            return false;
        } else {
            var patt = "(1(([3587][0-9])|(47)|[8][0126789]))\\d{8}$";
            var regex = new RegExp(patt);            
            if (!regex.test(phone)) {
                showDialog("请填写正确的手机号码");
                return false
            } else {
                UpdateData(phone, flag);
            }
        }
    });
});

//修改密码
function resetPass(oldPass, first) {
    var adminId = localStorage.AdminId;
    $.ajax({
        url: "/admin/UpdatePass",
        type: "post",
        data: { PassWord: first, AdminId: adminId, OldPass: oldPass },
        success: function (data) {
            if (data.ResultType==3) {
                $(".only_sub").click(function () {
                    $(this).parent().parent().animate({ left: '150%' });
                })
            } else {
                showDialog(data.Message);
                return false;
            }
        }
    });
}

//初始化个人信息
function initData() {
    //debugger
    var adminId = localStorage.AdminId;
    if (adminId ==null || adminId=="" || adminId==undefined) {
        return false;
    } else {
        $.ajax({
            url: "/Admin/GetAdminInfo",
            type:'POST',
            data: { AdminId: adminId },
            success: function (data) {
                if (data.ResultType == 3) {

                    var adminInfo = data.Data;
                    var UserPhoto = adminInfo.UserPhoto;
                    var AdminName = adminInfo.AdminName;
                    var RealName = adminInfo.RealName;
                    var MobilePhone = adminInfo.MobilePhone;
                    var Email = adminInfo.Email;
                    var DateofBirth = adminInfo.DateofBirth;
                    var DepartmentName = adminInfo.DepartmentName;
                    var JobPositionName = adminInfo.JobPositionName;
                    var Leader= adminInfo.Leader;
                    var EntryTime = adminInfo.EntryTime;
                    var MacAddress = adminInfo.MacAddress;
                    var Gender = adminInfo.Gender;//0表示女，1表示男
                    $("#changeAvatar img").attr("src", UserPhoto);
                    $("#adminName").html(AdminName);
                    $("#post").html(DepartmentName);
                    $("#lead").html(Leader);
                    $("#entry_time").html(EntryTime);
                    $("#mac").html(MacAddress);
                    $("#true_name").html(RealName);
                    $("#name_tue").attr("value", RealName);
                    $("#number_phone").html(MobilePhone);
                    $("#phone_number").attr("value", MobilePhone);
                    if (MobilePhone != null && MobilePhone != "" && MobilePhone!=undefined) {
                        enablePhone();
                    }
                    if (Gender == 0) {
                        $("#sex_div").html("女");
                        $("#woman").attr("checked", true);
                    } else {
                        $("#man").attr("checked", true);
                        $("#sex_div").html("男");
                    }
                    $("#email_id").html(Email); 
                    $("#id_email").attr("value",Email);
                    $("#birthday").attr("value", DateofBirth);
                    $("#mac_id").attr("value", MacAddress);
                } else {
                    return false;
                }
            }
        });
    }

}

//修改个人信息
function UpdateData(keyWord, flag) {
    var adminId = localStorage.AdminId;
    $.ajax({
        url: "/Admin/Update",
        type:"post",
        data: { AdminId: adminId, KeyWord: keyWord, UpdateFlag: flag },
        success: function (data) {
            if (data.ResultType == 3) {
                //成功后，添加返回上一层代码
                $(".only_sub").click(function () {
                    $(this).parent().parent().animate({ left: '150%' });
                });
                setValue(keyWord, flag);
            } else {
                showDialog(data.Message);
            }
        }
    });
}

function setValue(keyWord, flag) {
    if (flag==0) {
        $("#true_name").html(keyWord);
        $("#name_tue").attr("value", keyWord);
    } else if (flag==3) {
        $("#email_id").html(keyWord);
        $("#id_email").attr("value", keyWord);
    } else if (flag == 1) {
        enablePhone();
        $("#number_phone").html(keyWord);
        $("#phone_number").attr("value", keyWord);
    }
}

/*出生年月*/
$(function () {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = { preset: 'date' };
    opt.datetime = { preset: 'datetime' };
    opt.time = { preset: 'time' };
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 80, //开始年份
        endYear: currYear //结束年份
    };
    $("#birthday").mobiscroll($.extend(opt['date'], opt['default']));
});

//展示对话框
function showDialog(msg) {
    $(".dialog_p").html(msg);
    $(".mask_bg,.dialog_info").show();
}

//隐藏对话框
function hideDialog() {
    $(".mask_bg,.dialog_info").hide();
}

//提示信息
//$(".only_sub").click(function () {
//    $(".mask_bg,.dialog_info").show();
//})
$("#confirm").click(function () {
    $(".mask_bg,.dialog_info").hide();
});

//设置可以访问通讯录
function enablePhone() {
    localStorage.EnablePhone = "true";
}