/**
 * Created by xia on 2016/5/18.
 */
var macAdd = "";
//初始化页面的高度
var bdw = $(window).width();
var wh = $(window).height();

$('body').width(bdw).height(wh);

$('.big_all_div').height(wh);
var tp1 = $('.til_dk').outerHeight(true);
var bt = $("#da_footer").outerHeight(true);
var dk_time = $(".dk_time").outerHeight(true);

var tit_ul = $(".tit_ul").outerHeight(true);
var count_til = $(".count_til").outerHeight(true);
var rili = $('.rili').outerHeight(true);
var inp_hg = $("#sogo_inp").outerHeight(true);

var cont = wh - tp1 - bt - dk_time - tit_ul - count_til;
var ll = wh - tp1 - bt - rili;
var cont2 = wh - tp1 - bt - 2;
$(".all_div,.change_date").css("margin-top", tp1);
$("#wraperlist").outerHeight(cont);
$('.module_box').outerHeight(ll);
$(".dialog_ul_bg").outerHeight(cont2);
$(".content_0,.content_1").outerHeight(cont2);
$("#content_system").height(cont2 - $(".system").height()-2);
$(".content_list").outerHeight(cont2 - inp_hg);
$("#wrapperUl").outerHeight(wh - tp1 - $(".change_date").height() - $(".stat_til").height());
$("#send,#history").height($(window).height() - $(".person_infi").height() - $(".send_history").height() - $(".foot_apply").height()-2);
$("#info_msg").height($(window).height() - $(".person_infi").height());

//初始化数据
initAttendance();
//初始化日历
wol();
//初始化消息(通知)
getInfos(); 
$(".dk_time .da_btn").click(function () {
    $(".header_img_box").addClass("testScal");
    setTimeout(function () {
        $(".header_img_box").removeClass("testScal");
    }, 1600);
    initLogin();
});

//刷新时间
function getTime() {
    var startTime = $(".dk_time .go_off_work").attr("data-startTime");
    var endTime = $(".dk_time .go_off_work").attr("data-endTime");
    var restMinute = $(".dk_time .go_off_work").attr("data-restMinute");
    var sTime = new Date(startTime);
    var eTime = new Date(endTime);
    var now = new Date();
    var tem = now - sTime;
    tem = eTime - now;
    if (now - sTime >= 0 && eTime - now >= 0) {
        var span = eTime - now;
        //span = span - restMinute * 60*1000;
        var h = Math.floor(span / 1000 / 60 / 60 % 24);
        var m = Math.floor(span / 1000 / 60 % 60);
        var s = Math.floor(span / 1000 % 60);
        $(".dk_time .go_off_work").empty();
        $(".dk_time .go_off_work").html("距离下班还有" + h + "小时" + m + "分钟" + s + "秒");
    } else if (eTime - now < 0) {
        $(".dk_time .go_off_work").html("再见");
    } else {
        $(".dk_time .go_off_work").html("新的一天，你好");
    }
}

//初始化日历时间
function wol() {
    var mydateInput = document.getElementById("USER_AGE");
    var date = new Date();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    //var tody = date.getDate();
    //if (tody < 10) {
    //    tody = "0" + tody;
    //}
    var dateString = date.getFullYear() + "-" + month;
    mydateInput.value = dateString;

    $("#USER_AGE").click(function () {  //调用日历
        $("#calender").show();

        var yer = $("#USER_AGE").val(),
            pas = yer.split("-");
        $("#year").val(pas[0]);  //年
        var yy = $("#year").val(),  //获取年
            mm = pas[1]; //获取月
        if (mm[0] == 0) {
            mm = mm[1];
        }

        $("#year_box li").each(function () {  //选中年
            if ($(this).html() == yy) {
                $(this).addClass("bgColor");
                $(this).siblings().removeClass("bgColor");
            }
        });
        $("#month_box li").each(function () {  //选中月
            if ($(this).html() == mm) {
                $(this).addClass("bgColor");
                $(this).siblings().removeClass("bgColor");
            }
        });
    });
    $(".next").click(function () {  //年后推
        var yr = $("#year").val();
        var num = parseInt(yr) + 1;
        $("#year").val(num);
    });
    $(".last").click(function () { //年前推
        var yr = $("#year").val();
        var num = parseInt(yr) - 1;
        $("#year").val(num);
    });
    //    年月动画切换  年
    var $year, $month;
    $("#year").click(function () {
        $("#year_month").animate({ "marginLeft": '0%' });
        $("#year_box li").click(function () {
            $year = $(this).html(); //年
            $(this).addClass("bgColor");
            $(this).siblings().removeClass("bgColor");
            $("#year").val($year);
            $("#year_month").animate({ "marginLeft": '-100%' });
        });
    });
    //    年月动画切换  月
    $("#month_box #month li").click(function () {
        $year = $("#year").val();
        var $mh = $(this).html();  //月
        if ($mh < 10) {
            $month = '0' + $mh;
        } else {
            $month = $mh;
        }
        $("#USER_AGE").val($year + '-' + $month);
        $(this).addClass("bgColor");
        $(this).siblings().removeClass("bgColor");
        $("#calender").hide();
        initAttenByDate();
    });
}

//获取mac
function getMac() {
    var index = 0;
    while (true) {
        if ((macAdd == null || macAdd == "" || macAdd == undefined) && index <= 10) {
            $.ajax({
                async: false,
                type: "GET",
                url: "http://geeqee.com/axapp/m/wx_local_connect.do?callback=_jqjsp&_1462946419979=",
                timeout: 2000,
                beforeSend: function (XMLHttpRequest) {
                    //ShowLoading();
                },
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (data, textStatus) {
                    //alert(textStatus);
                    if (data != null && data != "" && data != undefined) {
                        macAdd = data.miniMac;
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    //HideLoading();
                },
                error: function () {
                    //macAdd = "";
                    //请求出错处理
                    //$(".bg_dialog,.dk_dialog").show();
                    //$(".dk_dialog .dk_inf_p").html("请在打卡环境内打卡");
                    //return false;
                }
            });

            $.ajax({
                async: false,
                type: "GET",
                url: "http://11.1.1.1/axapp/m/wx_local_connect.do?callback=_jqjsp&_1462946419979=",
                timeout: 2000,
                beforeSend: function (XMLHttpRequest) {
                    //ShowLoading();
                },
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (data, textStatus) {
                    alert(data);
                    debugger
                    //alert(textStatus);
                    if (data!=null && data!="" && data!=undefined) {
                        macAdd = data.miniMac;
                    }
                    
                },
                complete: function (XMLHttpRequest, textStatus) {
                    //HideLoading();
                },
                error: function () {
                    //macAdd = "";
                    //请求出错处理
                    //$(".bg_dialog,.dk_dialog").show();
                    //$(".dk_dialog .dk_inf_p").html("请在打卡环境内打卡");
                    //return false;
                }
            });

            $.ajax({
                async: false,
                type: "GET",
                url: "http://hiwifi.com:7369/axapp/m/wx_local_connect.do?callback=_jqjsp&_1462946419979=",
                timeout: 2000,
                beforeSend: function (XMLHttpRequest) {
                    //ShowLoading();
                },
                dataType: "jsonp",
                jsonp: 'callback',
                success: function (data, textStatus) {
                    //alert(textStatus);
                    if (data != null && data != "" && data != undefined) {
                        macAdd = data.miniMac;
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    //HideLoading();
                },
                error: function () {
                    //macAdd = "";
                    //请求出错处理
                    //$(".bg_dialog,.dk_dialog").show();
                    //$(".dk_dialog .dk_inf_p").html("请在打卡环境内打卡");
                    //return false;
                }
            });
            index++;
        } else {
            break;
        }
    }

}

//初始化签到界面
function initAttendance() {
    //获取mac
    getMac()
    var AdminId = localStorage.AdminId;
    if (AdminId == undefined) {
        AdminId = "";
    }
    $.ajax({
        url: "/admin/SignInfo",
        type: "post",
        data: { AdminId: AdminId, MacAdd: macAdd },
        success: function (data) {
            if (data.ResultType == 3) {
                var adminInfo = data.Data;
                var userPhoto = adminInfo.UserPhoto;
                var sequence = adminInfo.Sequence;
                var depName = adminInfo.DepartmentName;
                var attenInfo = adminInfo.AttenInfo;
                var startTime = adminInfo.StartTime;
                var endTime = adminInfo.EndTime;
                var restMinute = adminInfo.RestMinutes;
                var isLogin = adminInfo.IsLogin;
                var realName = adminInfo.RealName;
                if (isLogin == true) {
                    //开始计时
                    setInterval(getTime, 1000);
                    $(".dk_time .da_btn").attr("data-count", 1);
                    $(".dk_time .da_btn").html("签退");
                } else {
                    $(".dk_time .go_off_work").html(realName + "，你好");

                }
                var depHtml = '<span>打卡环境：</span>';
                var attenHead = '<li><ul class="sj_ul">';
                var attenFoot = '</ul></li>';
                var attenHtml = "";
                var strDate = adminInfo.CurrentDate;
                $(".til_dk .kq_tx").attr("src", userPhoto);
                $(".dk_time .dp").html(depHtml + depName);
                $(".dk_time .header_img").attr("src", userPhoto);
                $(".dk_time .da_btn").attr("data-realName", realName);
                $(".dk_time .num").html('<span>签到排名：</span>' + sequence);
                $(".dk_time .go_off_work").attr("data-startTime", startTime);
                $(".dk_time .go_off_work").attr("data-endTime", endTime);
                $(".dk_time .go_off_work").attr("data-restMinute", restMinute);
                if (attenInfo != null && attenInfo != "") {
                    for (var i = 0; i < attenInfo.length; i++) {
                        var atten = attenInfo[i];
                        attenHtml += attenHead;
                        //attenHtml += '<li class="max_wd">' + atten.RealName + '</li>';
                        attenHtml += '<li class="max_wd">' + atten.DepartmentName + '</li>';
                        if (atten.IsLate == true) {
                            attenHtml += '<li class="max_wd"><img src="img/solid.png" alt="png"/></li>';
                        } else {
                            attenHtml += '<li class="max_wd"><img src="img/hollow.png" alt="png"/></li>';
                        }
                        if (atten.IsLeaveEarly == true) {
                            attenHtml += '<li class="max_wd"><img src="img/solid.png" alt="png"/></li>';
                        } else {
                            attenHtml += '<li class="max_wd"><img src="img/hollow.png" alt="png"/></li>';
                        }
                        if (atten.IsSign == true) {
                            attenHtml += '<li class="max_wd"><img src="img/solid.png" alt="png"/></li>';
                        } else {
                            attenHtml += '<li class="max_wd"><img src="img/hollow.png" alt="png"/></li>';
                        }
                        if (atten.IsSignOut == true) {
                            attenHtml += '<li class="max_wd"><img src="img/solid.png" alt="png"/></li>';
                        } else {
                            attenHtml += '<li class="max_wd"><img src="img/hollow.png" alt="png"/></li>';
                        }
                        //if (atten.Date == strDate) {
                        //    if (atten.IsSign == true) {
                        //        $(".dk_time .da_btn").attr("data-count", 1);
                        //        $(".dk_time .da_btn").html("签退");
                        //    }
                        //}
                        attenHtml += '<li class="riqi">' + atten.Date + '</li>';
                        attenHtml += attenFoot;
                    }
                }
                $("#attenList").empty();
                $("#attenList").html(attenHtml);
                if (window.localStorage) {
                    localStorage.login = "YES";
                } else {
                    $(".bg_dialog,.dk_dialog").show();
                    $(".dk_dialog .dk_inf_p").html("不支持本地存储");
                    $(".prompt").click(function () {
                        $(".bg_dialog,.dk_dialog").hide();
                    });
                }
            }
            else {
                $(".bg_dialog,.dk_dialog").show();
                $(".dk_dialog .dk_inf_p").html("登陆异常，请重新登陆");
                $(".prompt").click(function () {
                    $(".bg_dialog,.dk_dialog").hide();
                });
                localStorage.AdminId = "";
                location.href = "/sign/index.html";
            }
        }
    });
}

//初始化打卡数据
function initLogin() {
    getMac()
    if (macAdd == null || macAdd == "" || macAdd == undefined) {
        $(".bg_dialog,.dk_dialog").show();
        $(".dk_dialog .dk_inf_p").html("请在打卡环境内打卡");
        $(".prompt").click(function () {
            $(".bg_dialog,.dk_dialog").hide();
            //$(".dk_dialog").hide();
        })
    } else {
        login(macAdd);
    }
}

//打卡
function login(macAdd) {
    var url = "";
    var count = $(".dk_time .da_btn").attr("data-count");
    if (count == 0) {

        url = "/Admin/LoginIn";
    } else {
        url = "/Admin/LoginOut";
    }
    var adminId = localStorage.AdminId;
    $.ajax({
        url: url,
        type: "post",
        data: { MacAddress: macAdd, AdminId: adminId },
        success: function (data) {
            if (data.ResultType == 3) {
                $(".dk_time .da_btn").attr("data-count", 1);
                $(".dk_time .da_btn").html("签退");
                initAttendance();
                $(".bg_dialog,.dk_dialog").show();
                var realName = $(".dk_time .da_btn").attr("data-realName");
                $(".dk_dialog .dk_inf_p").html(realName + "," + data.Message);
                $(".prompt").click(function () {
                    $(".bg_dialog,.dk_dialog").hide();
                });
            } else {
                $(".bg_dialog,.dk_dialog").show();
                $(".dk_dialog .dk_inf_p").html(data.Message);
                $(".prompt").click(function () {
                    $(".bg_dialog,.dk_dialog").hide();
                });
            }
        }
    })
}
//签退
function loginOut() {
    localStorage.AdminId = "";
    $.ajax({
        url: "/admin/Logout",
        type: 'post',
        success: function (data) {
            location.href = "/sign/index.html";
        }
    })
};

//根据时期获取考勤信息
function initAttenByDate() {
    var date = $("#USER_AGE").val();
    var adminId = localStorage.AdminId;
    $.ajax({
        url: "/Atten/GetAttenByDate",
        type: "POST",
        data: { Date: date, AdminId: adminId },
        success: function (data) {
            if (data.ResultType == "3") {
                var attenInfo = data.Data;
                var LeaveCount = attenInfo.LeaveCount;
                var OvertimeCount = attenInfo.OvertimeCount;
                var FieldCount = attenInfo.FieldCount;
                var RepairCount = attenInfo.RepairCount;
                var AbsenceCount = attenInfo.AbsenceCount;
                var NoSignOutCount = attenInfo.NoSignOutCount;
                var LateCount = attenInfo.LateCount;
                var ArrivalEarlyCount = attenInfo.ArrivalEarlyCount;
                var LeaveLateCount = attenInfo.LeaveLateCount;
                var LeaveEarlyCount = attenInfo.LeaveEarlyCount;
                var WorkDays = attenInfo.WorkDays;
                var RestDays = attenInfo.RestDays;
                $("#qjNum i").html(LeaveCount);
                $("#jbNum i").html(OvertimeCount);
                $("#wqNum i").html(FieldCount);
                $("#bkNum i").html(RepairCount);
                $("#absence i").html(AbsenceCount);
                $("#noSignOut i").html(NoSignOutCount);
                $("#lateCount i").html(LateCount);
                $("#leaveEarlyCount i").html(LeaveEarlyCount);
                $("#arrEarlyCount i").html(ArrivalEarlyCount);
                $("#leaveLateCount i").html(LeaveLateCount);
                $("#have_holiday i").html(RestDays);
                $("#add_class i").html(WorkDays);

            } else {
                $(".bg_dialog,.dk_dialog").show();
                $(".dk_dialog .dk_inf_p").html(data.Message);
                $(".prompt").click(function () {
                    $(".bg_dialog,.dk_dialog").hide();
                });
            }
        }
    })
};

//显示联系人详情
function contractDetail(option) {
    $(".dig_inf").animate({ left: '0' }).css("display", "block");
    var $t = $(option),
        $c = $t.children();
    var htd = $t.children(".tx_hd").attr("src"),
        name = $c.children(".tx_name").html(),
        post = $c.children(".tx_post").html(),
        num_phn = $c.children(".num_phon").html();
    $(".person_hed").attr("src", htd);
    $('.mz').html(name);
    $('.post').html(post);
    $(".nm_pn").html(num_phn);


    $('.back_tx').click(function () {
        $('.dig_inf').animate({ left: "150%" });
    })
}

//初始化联系人列表
function initContracts() {
    var keyWord = $("#select_inp").val();
    $.ajax({
        url: "/admin/GetContacts",
        type: "POST",
        data: { KeyWord: keyWord },
        success: function (data) {
            if (data.ResultType == "3") {
                var contacts = data.Data;
                var $contact = $("#contact");
                var liHead = '<li class="out_li" onclick="contractDetail(this)">';
                var liFoot = '</li>';
                var ulHead = '<ul class="tx_ul">';
                var ulFoot = '</ul>';
                $contact.empty();
                for (var i = 0; i < contacts.length; i++) {
                    var con = contacts[i];
                    var img = '<img class="tx_hd" src="' + con.UserPhoto + '" alt="头像" />';
                    var name = '<li class="tx_name">' + con.RealName + '</li>'
                    var jobPosition = '<li class="tx_post">' + con.JobPositionName + '</li>';
                    var phone = '<li class="num_phon">' + con.MobilePhone + '</li><li class="tx_dj"><img src="img/nav_fh@2x2.png" alt="png" /></li>';
                    var html = liHead + img + ulHead + name + jobPosition + phone + ulFoot + liFoot;
                    $contact.append(html);
                }
                $("#lateMinute i").html(attenInfo.LateMinutes);
                $("#arrEarlyMin i").html(attenInfo.ArrivalEarlyMinutes);
                $("#leaveEarlyMin i").html(attenInfo.LeaveEarlyMinutes);
                $("#leaveLateMin i").html(attenInfo.LeaveLateMinutes);
                $("#absence i").html(attenInfo.AbsenceCount);
                $("#noSignOut i").html(attenInfo.NoSignOutCount);
            } else {
                $(".bg_dialog,.dk_dialog").show();
                $(".dk_dialog .dk_inf_p").html(data.Message);
                $(".prompt").click(function () {
                    $(".bg_dialog,.dk_dialog").hide();
                });
            }
        }
    })
}

//初始化部门列表
function initDeparts() {
    $.ajax({
        url: "/admin/GetDepartmentList",
        type: "post",
        success: function (data) {
            var divHeadBrance = '<div class="brance_parent">';
            var divFootBrance = '</div>';
            var pHead = '<p class="brance" onclick="showDepartAdmin(this)">';
            var pFoot = '<img class="del" src="img/down1.png" alt="下拉列表" /></p>';
            var divHeadPeople = '<div class="people_list"><ul>';
            var divFootPeople = '</div>';
            var ulHead = '<ul>';
            var ulFoot = '</ul>';
            var liHead = '<li class="out_li" onclick="contractDetail(this)">';
            var liFoot = '</li>'
            $("#dep_list_box").empty();
            for (var i = 0; i < data.length; i++) {
                var pepoleList = "";
                var depart = data[i];
                var admins = data[i].Admins
                var spand = '<span>' + depart.DepartName + '</span>';
                var pData = pHead + spand + pFoot;
                for (var j = 0; j < admins.length; j++) {
                    var admin = admins[j];
                    var img = '<img class="tx_hd" src="' + admin.UserPhoto + '" alt="头像" />';
                    var ulData = '<ul class="tx_ul"><li class="tx_name">' + admin.AdminName + '</li><li class="tx_post">' + admin.JobPositonName + '</li><li class="num_phon">' + admin.PhoneNum + '</li><li class="tx_dj"><img src="img/nav_fh@2x2.png" alt="png" /></li></ul>'
                    pepoleList = pepoleList + liHead + img + ulData + liFoot;
                }
                var pepole = divHeadPeople + pepoleList + divFootPeople;
                var divData = divHeadBrance + pData + pepole + divFootBrance;
                $("#dep_list_box").append(divData);
                
            }
        }
    })
}

//显示部门人员
function showDepartAdmin(option) {
    if ($(option).siblings(".people_list").css("display") == "none") {
        $(option).siblings(".people_list").css("display", "block");
        $(option).parents(".brance_parent").siblings().children(".people_list").css("display", "none");
        $(option).parents(".brance_parent").siblings().children(".brance").children(".del").attr("src", "img/down1.png");
        $(option).children(".del").attr("src", "img/down2.png");
    } else {
        $(option).siblings(".people_list").css("display", "none");
        $(option).children(".del").attr("src", "img/down1.png");
    }
}

//点击头像左右侧滑
$(function () {
    $(".kq_tx").click(function (e) {
        $('.content_0,.content_1,.content_2,.content_3').css("z-index", "-1");
        if (e.stopPropagation) { //如果提供了事件对象，则这是一个非IE浏览器
            e.stopPropagation();
        } else {
            //兼容IE的方式来取消事件冒泡
            window.event.cancelBubble = true;
        }
        $("#left_box").animate({ left: '5%' }).css("display", "block");
        $("#right_box,#right_box_shade").css("transform", "translateZ(-100px)translateX(55%)rotateY(-45deg)")
            .css("-webkit-transform", "translateZ(-100px)translateX(55%)rotateY(-45deg)")
            .css("-moz-transform", "translateZ(-100px)translateX(55%)rotateY(-45deg)")
            .css("-o-transform", "translateZ(-100px)translateX(55%)rotateY(-45deg)");
        $(".content_1").css("z-index", "-1");
        $(".lf_rg").css("background-color", "rgba(134,119,91,1)");
        $("#right_box_shade").css("display", "block")
    });
    $("#right_box_shade").click(function () {
        animatend();
    });
    function animatend() {
        $('.content_0,.content_1,.content_2,.content_3').css("z-index", "8899");
        $("#left_box").animate({ left: '-70%' });
        $("#right_box").css("transform", "translateZ(0)translateX(0)rotateY(0)")
            .css("-webkit-transform", "translateZ(0)translateX(0)rotateY(0)")
            .css("-moz-transform", "translateZ(0)translateX(0)rotateY(0)")
            .css("-o-transform", "translateZ(0)translateX(0)rotateY(0)")
            .css("background-color", "rgba(134,119,91,0)");
        $(".content_1").css("z-index", "8899");
        $("#right_box_shade").css("display", "none");
    }



    //底部导航栏
    $(".da_footer>div").click(function () {
        var n = $(this).index();
        $(this).css("opacity", "1");
        $(this).siblings().css("opacity", "0.55");
        //当n=2时，表示点击了通讯按钮
        if (n == 1) {
            //获取当前时期并加载考勤数据
            initAttenByDate();
        }
        if (n == 2) {
            var EnablePhone = localStorage.EnablePhone;
            console.log(EnablePhone);
            if (EnablePhone == "true") {
                initContracts();
                initDeparts();
            } else {
                showMsg("添加手机号才能访问");
                $(".prompt").click(function () {
                    $(".xx_ft").css("opacity", "1");
                    $("#content_3").css("display", "block");
                    $("#content_3").siblings().css("display", "none");
                });                
                $(this).css("opacity", "0.55");
                return false;
            }
        }
        $(".all_div>div").each(function () {
            if ($(this).index() === n) {
                $(this).show();
                $(this).siblings().hide();
                $(".dialog_ul").hide();
                $(".dialog_ul_bg").css("display", "none");
                $(".triangle").css("display", "none");
            }
        });
        //if ($(".content_1").css("display") == "block") {
        //    $(".dialog").css("display", "block");
        //} else {
        //    $(".dialog").css("display", "none");
        //}
    });
    //考勤页面遮罩层，弹出层
    $(".dialog").click(
        function () {
            if ($(".dialog_ul").css("display") == "none") {
                $(".dialog_ul").show(200);
                $(".triangle").show(200);
                $(".dialog_ul_bg").css("display", "block");
                $('.dialog_ul').css("z-index", '8888');
                $('.dialog_ul li').css("z-index", '8899');
                $('.all_div').css("z-index", '-1');
                $(".dialog_ul li").click(function () {
                    $(".dialog_ul").hide(200);
                    $(".triangle").hide(200);
                    $(".dialog_ul_bg").css("display", "none");
                    $('.all_div').css("z-index", '1');
                });
            } else {
                $(".dialog_ul").hide(200);
                $(".triangle").hide(200);
                $(".dialog_ul_bg").css("display", "none");
                $('.all_div').css("z-index", '1');
            }

        }
    );
    //关闭考勤页面遮罩层
    $(".dialog_ul_bg").click(function () {
        $(".dialog_ul").css("display", "none");
        $(".dialog_ul_bg").css("display", "none");
        $(".triangle").css("display", "none");
    });

    //考勤记录弹出层
    $('.lsjl,.bk_date').height($(window).height() - $('.person_infi').height() - $('.shzt').height());
    //补卡详情
    $('#bkNum.i_module i,#bkNum.i_module .eye_img').click(function () {
        var adminId = localStorage.AdminId;
        var date = $("#USER_AGE").val();
        var attenFlag = 3;
        $.ajax({
            url: "/Atten/GetAttenList",
            type: "Post",
            data: { AdminId: adminId, Date: date, AttenFlag: attenFlag },
            success: function (data) {
                if (data.ResultType == 3) {
                    $(".end_card .info").empty();
                    var entities = data.Data;
                    for (var i = 0; i < entities.length; i++) {
                        var AttendanceTime = entities[i].AttendanceTime;
                        var IsPardon = entities[i].IsPardon;
                        var Id = entities[i].Id;
                        var option = '<li><label>2014-10-14</label> <span>已补卡</span></li>';
                        if (IsPardon == true) {
                            option = '<li><label>' + AttendanceTime + '</label> <span>已补卡</span></li>';
                        } else {
                            option = '<li><label>' + AttendanceTime + '</label> <span data-id="' + Id + '">补卡</span></li>';
                        }
                        $(".end_card .info").append(option);
                    }
                } else {
                    showMsg(data.Message);
                }
            }
        });

        var hml = $(this).prev().html();
        $(".person_infi b").html(hml + '详情');
        $("#bk_info").animate({ left: '0' }).css("display", "block");
        $('#bk_info .person_infi .back_tx').click(function () {
            $('#bk_info').animate({ left: "150%" });
        })
    });
    //请假，加班，外勤详情单
    //$('#qjNum.i_module i,#qjNum.i_module .eye_img,#jbNum.i_module i,#jbNum.i_module .eye_img,#wqNum.i_module i,#wqNum.i_module .eye_img').click(function () {
    //    var hml = $(this).prev().html();
    //    $(".person_infi b").html(hml + '详情');
    //    $("#qj_diag").animate({left: '0'}).css("display", "block");
    //    $('#qj_diag .person_infi .back_tx').click(function () {
    //        $('#qj_diag').animate({left: "150%"});
    //    })
    //});

    //获取请假数据
    $('#qjNum.i_module i,#qjNum.i_module .eye_img').click(function () {
        var attenFlag = 0;//表示请假
        getAttens(attenFlag);
    })

    //获取加班数据
    $('#jbNum.i_module i,#jbNum.i_module .eye_img').click(function () {
        var attenFlag = 1;//表示加班
        getAttens(attenFlag);
    })

    //获取外勤数据
    $('#wqNum.i_module i,#wqNum.i_module .eye_img').click(function () {
        var attenFlag = 2;//表示外勤
        getAttens(attenFlag);
    });
    //获取未签到数据
    $('#absence.i_module i,#absence.i_module .eye_img').click(function () {
        var attenFlag = 4;
        getWorkAttens(attenFlag);
    });
    //获取未签退数据
    $('#noSignOut.i_module i,#noSignOut.i_module .eye_img').click(function () {
        var attenFlag = 5;
        getWorkAttens(attenFlag);
    });
    //获取迟到数据
    $('#lateCount.i_module i,#lateCount.i_module .eye_img').click(function () {
        var attenFlag = 6;
        getMinAttens(attenFlag);
    });
    //获取早退数据
    $('#leaveEarlyCount.i_module i,#leaveEarlyCount.i_module .eye_img').click(function () {
        var attenFlag = 7;
        getMinAttens(attenFlag);
    });

    //早到，晚退
    $('#arrEarlyMin.i_module i,#leaveLateMin.i_module i').click(function () {
        var hml = $(this).prev().html();
        $(".person_infi b").html(hml + '详情');
        $("#jf_diag").animate({ left: '0' }).css("display", "block");
        $('#jf_diag .person_infi .back_tx').click(function () {
            $('#jf_diag').animate({ left: "150%" });
        })
    });


    //联系方式弹出层
    $("#wrapper .out_li").click(function () {
        $(".dig_inf").animate({ left: '0' }).css("display", "block");
        var $t = $(this),
            $c = $t.children();
        var htd = $t.children(".tx_hd").attr("src"),
            name = $c.children(".tx_name").html(),
            post = $c.children(".tx_post").html(),
            num_phn = $c.children(".num_phon").html();
        $(".person_hed").attr("src", htd);
        $('.mz').html(name);
        $('.post').html(post);
        $(".nm_pn").html(num_phn);
        $('.back_tx').click(function () {
            $('.dig_inf').animate({ left: "150%" });
        })
    });

    
    //通讯弹出层拨打电话
    $(".telephone").click(function () {
        var tele = $(".nm_pn").html();
        //console.log(tele);
        $(".telephone").attr("href", 'tel:' + tele);
    });
    $(".information").click(function () {
        var tele = $(".nm_pn").html();
        //console.log(tele);
        $(".information").attr("href", 'sms:' + tele);
    });
    //通讯列表页(总部门)
    $("#department_box").click(function () {
        if ($("#dep_list_box").css("display") == "none") {
            $("#dep_list_box").css("display", "block");
            $(this).children(".del").attr("src", "img/down2.png");
        } else {
            $("#dep_list_box").css("display", "none");
            $(this).children(".del").attr("src", "img/down1.png")
        }
    });
    //通讯列表页(所有部门)
    $(".brance").click(function () {
        if ($(this).siblings(".people_list").css("display") == "none") {
            $(this).siblings(".people_list").css("display", "block");
            $(this).parents(".brance_parent").siblings().children(".people_list").css("display", "none");
            $(this).parents(".brance_parent").siblings().children(".brance").children(".del").attr("src", "img/down1.png");
            $(this).children(".del").attr("src", "img/down2.png");
        } else {
            $(this).siblings(".people_list").css("display", "none");
            $(this).children(".del").attr("src", "img/down1.png");
        }
    });

    //    申请表(请假，加班，外勤)
    //计算主体的高度
    $(".main_work").height($(window).height() - $(".til_bak").height() - $(".btn_li").height());
    //详情列表的高度
    var ap_ul = $(".apply_inf ul").height();

    //    点击底部导航控制主题模块的显示和隐藏
    $(".btn_li li").click(function () {
        $(".apply_inf").hide();
        $(".inp_apply").show();
        $('.change>.leave_record').removeClass('col_bot');
        $(this).addClass('font_col');
        $(this).siblings().removeClass("font_col");
        var num = $(this).index();
        $(".mian_apply>div").each(function () {
            if ($(this).index() === num) {
                $(this).show();
                $(this).siblings().hide();
            }
        });
    });
    //   日期选择
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
        startYear: currYear - 20, //开始年份
        endYear: currYear + 5 //结束年份
    };

    var opDate = $.extend(opt['date'], opt['default']);
    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);

    //$("#inpstart").mobiscroll($.extend(opt['date'], opt['default'])); //日期
    $("#inpstart").mobiscroll(optDateTime).datetime(optDateTime);  //请假开始日期
    $("#inpend").mobiscroll(optDateTime).datetime(optDateTime);  //请假结束日期
    $("#jbstart").mobiscroll(optDateTime).datetime(optDateTime);  //加班开始日期
    $("#jbend").mobiscroll(optDateTime).datetime(optDateTime);  //加班截止日期
    $("#wqstart").mobiscroll(optDateTime).datetime(optDateTime);  //外勤开始日期
    $("#wqend").mobiscroll(optDateTime).datetime(optDateTime);  //外勤截止日期
    $("#leaveOffice").mobiscroll(opDate).date(opDate);  //离职日期
    $("#bktime").mobiscroll(opDate).date(opDate); //补卡日期


    $(".dialog_ul li").click(function () {        
        var ind = $(this).index();
        //if (ind < 3) {
            $(".apply_form,.foot_apply").animate({ left: '0' }).css("display", "block");
            $(".back_befo").click(function () {
                $(".apply_form,.foot_apply").animate({ left: '150%' });
            })
            $(".foot_apply .btn_li>li").each(function () {
                if ($(this).index() === ind) {
                    $(this).addClass('font_col');
                    $(this).siblings().removeClass("font_col");
                }
            });
            $(".apply_form .mian_apply>div").each(function () {
                if ($(this).index() === ind) {
                    $(this).show();
                    $(this).siblings().hide();
                }
            });
        //}
    });

    $(".bk_ul input,.sign_ul input").click(function () {
        popupShow("确定要补卡吗");
    });
    $('.cancel,.determine').click(function () {
        popupHide();
    })


    //计算请假日期
    $(".leaveTime").change(function () {
        var adminId = localStorage.AdminId;
        var startTime = $("#inpstart").val();
        var endTime = $("#inpend").val();
        if (adminId == null || adminId == "" || adminId == undefined) {
            showMsg("请重新登录");
            return false;
        }
        if (startTime == null || startTime == "" || startTime == undefined) {
            return false;
        }
        if (endTime == null || endTime == "" || endTime == undefined) {
            return false;
        }

        $.ajax({
            url: "/Atten/ComputeWorkDay",
            type: "post",
            data: { AdminId: adminId, StartDate: startTime, EndDate: endTime },
            success: function (data) {
                if (data.ResultType == 3) {
                    $("#LeaveDays").attr("value", data.Data);
                } else {
                    showMsg(data.Message);
                }
            }
        });
    })

    //计算加班日期
    $(".overtime").change(function () {
        var adminId = localStorage.AdminId;
        var startTime = $("#jbstart").val();
        var endTime = $("#jbend").val();
        if (adminId == null || adminId == "" || adminId == undefined) {
            showMsg("请重新登录");
            return false;
        }
        if (startTime == null || startTime == "" || startTime == undefined) {
            return false;
        }
        if (endTime == null || endTime == "" || endTime == undefined) {
            return false;
        }
        var startDate = new Date(startTime);
        var endDate = new Date(endTime);
        var num = endDate - startDate;
        if (num > 0) {
            $.ajax({
                url: "/Atten/GetOvertimeDays",
                type: "post",
                data: { AdminId: adminId, StartDate: startTime, EndDate: endTime },
                success: function (data) {
                    if (data.ResultType == 3) {
                        $("#OvertimeDays").attr("value", data.Data);
                    } else {
                        showMsg(data.Message);
                    }
                }
            });
        } else {
            $("#OvertimeDays").attr("value", "");
            showMsg("请选择正确的加班时间");
            return false
        }
    })

    //计算外勤日期
    $(".fieldTime").change(function () {
        var adminId = localStorage.AdminId;
        var startTime = $("#wqstart").val();
        var endTime = $("#wqend").val();
        if (adminId == null || adminId == "" || adminId == undefined) {
            showMsg("请重新登录");
            return false;
        }
        if (startTime == null || startTime == "" || startTime == undefined) {
            return false;
        }
        if (endTime == null || endTime == "" || endTime == undefined) {
            return false;
        }
        var startDate = new Date(startTime);
        var endDate = new Date(endTime);
        var num = endDate - startDate;
        if (num > 0) {
            $.ajax({
                url: "/Atten/GetFieldDays",
                type: "post",
                data: { AdminId: adminId, StartDate: startTime, EndDate: endTime },
                success: function (data) {
                    if (data.ResultType == 3) {
                        var FieldDays = data.Data.FieldDays;
                        var FieldWorkDays = data.Data.WorkDays;
                        $("#FieldDays").attr("value", FieldDays);
                        $("#FieldWorkDays").attr("value", FieldWorkDays);
                    } else {
                        showMsg(data.Message);
                    }
                }
            });
        } else {
            $("#FieldWorkDays").attr("value", "");
            $("#FieldDays").attr("value", "");
            showMsg("请选择正确的加班时间");
            return false
        }
    })

    //申请请假
    $("#applyLeave").click(function () {
        var adminId = localStorage.AdminId;
        $("#leaveAdminId").attr("value", adminId);
        var entity = $("#formLeave").serializeObject();
        var result = checkLeaveInfo();
        if (result == false) {
            return false;
        }
        $.ajax({
            url: "/atten/AddLeaveInfo",
            type: "post",
            data: entity,
            success: function (data) {
                if (data.ResultType == 3) {
                    getBackAtten();
                } else {
                    showMsg(data.Message);
                }
            }
        });
    })

    //申请加班
    $("#applyOvertime").click(function () {
        var adminId = localStorage.AdminId;
        $("#overtimeAdminId").attr("value", adminId);
        var entity = $("#formOvertime").serializeObject();
        var result = checkOvertime();
        if (result == false) {
            return false;
        }
        $.ajax({
            url: "/atten/AddOvertime",
            type: "post",
            data: entity,
            success: function (data) {
                if (data.ResultType == 3) {
                    getBackAtten();
                } else {
                    showMsg(data.Message);
                }
            }
        });
    })

    //申请外勤
    $("#applyField").click(function () {
        var adminId = localStorage.AdminId;
        $("#fieldAdminId").attr("value", adminId);
        var entity = $("#formField").serializeObject();
        var result = checkField();
        if (result == false) {
            return false;
        }
        $.ajax({
            url: "/atten/AddField",
            type: "post",
            data: entity,
            success: function (data) {
                if (data.ResultType == 3) {
                    getBackAtten();
                } else {
                    showMsg(data.Message);
                }
            }
        });
    });

    //获取休假天数
    //getVacation();

    //申请离职
    $(".sqlz").click(function () {
        $(".lizhi").animate({ left: 0 }).css("display", "block");
        animatend();
        getResignation();
        $("#leave").click(function () {
            $(".lizhi").animate({ left: '150%' });
        })
    });
    //提交离职申请
    $("#leave_btn").click(function () {
        var adminId = localStorage.AdminId;
        $("#ResignationId").attr("value", adminId);
        var entity = $("#leave_form").serializeObject();
        var result = checkResignation();
        if (result == false) {
            return false;
        }
        $.ajax({
            url: "/admin/ApplyResignation",
            type: "post",
            data: entity,
            success: function (data) {
                if (data.ResultType == 3) {
                    $("#leave_form").hide();
                    $(".leave_info").show();
                    getResignation();
                } else {
                    showMsg(data.Message);
                }
            }
        });
    });
    //离职状态返回 0表示审核中，1表示审核通过，2表示审核不通过
    function getResignation() {
        var adminId = localStorage.AdminId;
        $.ajax({
            url: "/admin/GetResignation",
            type: "post",
            data: { AdminId: adminId },
            success: function (data) {
                if (data.ResultType == 3) {
                    var adminDate = data.Data;
                    var dateTime = adminDate.ResignationDate;
                    var beLeave = adminDate.ResignationReason;
                    var PersonnelVt = adminDate.PersonnelVerifyType; //人事                    
                    var TechniqueVt = adminDate.TechniqueVerifyType;  //技术
                    var ManagerVt = adminDate.ManagerVerifyType;  //经理
                    if (dateTime == '' || dateTime == null || dateTime == undefined) {
                        $("#leave_form").show();
                        $(".leave_info").hide();
                    } else {
                        $("#leave_form").hide();
                        $(".leave_info").show();
                        $(".leave_info .dateTm").val(dateTime);
                        $(".leave_info .leaveBf").html(beLeave);
                      
                        //离职申请
                        var pass = ".pass", audit = ".audit", notPass = ".notPass";
                        getstate(PersonnelVt, pass);
                        getstate(TechniqueVt, audit);
                        getstate(ManagerVt, notPass);
                    }
                } else {
                    showMsg(data.Message);
                }
            }
        })
    }

    $(".system").click(function () {
        $("#message").animate({ "left": 0 });
    });

    
   
    $("#message .back_ig").click(function () {
        $("#message").animate({ "left": "150%" });
    });
});
var imgSrc = 'http://www.0-fashion.com/';
function getInfos() {
    adminId = localStorage.AdminId;
    var numInfo = 0,//未读通知状态个数
        numNews = 0; //记录未读消息个数

    //获取通知  
    $.ajax({
        url: "/Msg/GetNotice",
        type: "post",
        data: { adminId: adminId },
        success: function (data) {
            var dataNum = data.Data;
            $(".system .num_email").html(dataNum.length);
            $("#message ul").empty();
            for (var i = 0; i < dataNum.length; i++) {
                if (dataNum[i].Status == 0) {
                    var optionLi = '<li onclick="getInform(this)" data-init=' + dataNum[i].Id + '><p><span>' + dataNum[i].Title + '</span><b></b></p><i>' + tim(dataNum[i].SendTime) + '</i><h6>' + dataNum[i].Content + '</h6></li>'
                    numInfo++;
                } else {
                    var optionLi = '<li onclick="getInform(this)"  data-init=' + dataNum[i].Id + '><p><span>' + dataNum[i].Title + '</span></p><i>' + tim(dataNum[i].SendTime) + '</i><h6>' + dataNum[i].Content + '</h6></li>'
                }
                $("#message ul").append(optionLi);
            }
            if (numInfo != 0) {
                $(".system").append('<i class="pointInf"></i>')
            } else {
                $(".system .pointInf").remove();
            }
        }
    });
    //获取消息
    $.ajax({
        url: "/Msg/GetMsg",
        type: "post",
        data: { adminId: adminId },
        success: function (data) {
            $(".system_ul").empty();
            var infoNum = data.Data;
            for (var i = 0; i < infoNum.length; i++) {
                var liHead = '<li class="out_li3" onclick="article(this)" data-init=' + infoNum[i].Id + '>',
                    liEnd = '</li>',
                    ulHead = '<ul class="tx3_ul">',
                    ulEnd = '</ul>';

                var imgSend = '<img class="tx3_hd" src='+imgSrc + infoNum[i].SenderPhoto + ' alt="头像" />';
                if (infoNum[i].Status == 0) {
                    var liTille = '<li class="cot3_til"><i>' + infoNum[i].Title + '</i><b></b></li>';
                    numNews++;
                } else {
                    var liTille = '<li class="cot3_til"><i>' + infoNum[i].Title + '</i></li>';
                }
                var liSender = '<li class="cot_poster">' + infoNum[i].Sender + '</li>',
                   liContent = '<li class="content_info">' + infoNum[i].Content + '</li>',
                   liTime = ' <li class="tx3_dj">' + tim(infoNum[i].SendTime) + '</li>';
                $(".system_ul").append(liHead + imgSend + ulHead + liTille + liSender + liContent + liTime + ulEnd + liEnd);
            }
            var infI = $(".system .pointInf");
            if (numNews != 0 || infI.length != 0) {
                $(".xx_ft").append('<span class="newEml"></span>');
            } else {
                $(".xx_ft span").remove();
            }
        }
    });

}
//发送邮件
//这里是获取焦点时的事件
$(".address").focus(function () {
    $(".address").val('');
    $("#linkManBg,#linkMan").show();
    var adminId = localStorage.AdminId,
        htl = $(".address").val();
        getList(adminId, htl);
});
//点击搜索框
$(".chax").click(function () {
    var adminId = localStorage.AdminId,
        htl = $(".address").val();
    $("#linkManBg,#linkMan").show();
    getList(adminId, htl)
});

//加载联系人列表
function getList(adminId, htl) {
    $.ajax({
        url: '/Msg/GetStaffList',
        type: 'POST',
        success: function (data) {
            var entOplg = data.Data;
            if (data.ResultType == 3) {
                $("#linkMan ul").empty();
                for (var i = 0; i < entOplg.length; i++) {
                    console.log(htl);
                    var name = entOplg[i].AdminName
                    if (htl == '' || htl == null || htl == undefined) {
                        var uLi = '<li onclick="getId(this)" data-int=' + entOplg[i].Id + '>' + name + '</li>';
                        $("#linkMan ul").append(uLi);
                    } else if(name.indexOf(htl) != -1) {
                        var uLi = '<li onclick="getId(this)" data-int=' + entOplg[i].Id + '>' + name + '</li>';
                        $("#linkMan ul").append(uLi);
                    }
                }
            } else {
                alert(data.Message);
            }
        }
    });
}

//这里是失去焦点时的事件
$(".address").blur(function () {
    $("#linkManBg,#linkMan").hide(0);              
});

function getId(gt) {
    var idInt = $(gt).attr("data-int"),
        htl = $(gt).html();
    $(".address").attr("data-int", idInt);
    $("#linkManBg,#linkMan").hide();
    $(".address").val(htl);
    $(".address").blur(); //选择收件人后input失去焦点
}
$("#linkManBg").click(function () {
    $("#linkManBg,#linkMan").hide(0);
})
//发送消息和发送记录
$(".send_history>div").click(function () {
    var ind = $(this).index();
    $(this).addClass("bgWh");
    $(this).siblings().removeClass("bgWh");
    $("#sendChange>div").eq(ind).css("display", "block");
    $("#sendChange>div").eq(ind).siblings().css("display", "none");
})

//发送邮件
$(".btnSend").click(function () {
    //校验收件人标题和内容
    var result = checkOut();
    if (result == false) {
        return false;
    }
    var adminId = localStorage.AdminId,
        reCe = $('#send .address').attr("data-int"),
        til = $("#send .til").val(),
        cont = $("#send .contMes").val();
    $.ajax({
        url: "/Msg/SendMsg",
        type: "post",
        data: { senderId: adminId, receiverId: reCe, title: til, content: cont },
        success: function (data) {
            if (data.ResultType == 3) {
                $('#send .address,#send .til,#send .contMes').val('');
                showMsg("发送成功");
            }
            else {
                showMsg("发送失败");
            }
        },
        error: function (data) {
            showMsg("没有该员工");
        }
    })
})
//校验收件人标题和内容
function checkOut() {
    var addVal = $('.address').val(),
        bt = $(".til").val(),
        cont = $(".contMes").val();
    if (addVal == '' || addVal == null || addVal == undefined) {
        showMsg("请选择收件人");
        return false;
    }
    if (bt == '' || bt == null || bt == undefined) {
        showMsg("请输入标题");
        return false;
    }
    if (cont == '' || cont == null || cont == undefined) {
        showMsg("请输入内容");
        return false;
    }
}
//发送记录
$(".send_history>div").eq(1).click(function () {
    var adminId = localStorage.AdminId;
    var hliHed = '<li class="out_li3" onclick="article(this)">',
        hliEnd = '</li>',
        liulHed = '<ul class="tx3_ul">',
        liulEnd = '</ul>';
    $.ajax({
        url: '/Msg/GetHistorySend',
        type: "POST",
        data: { adminId: adminId },
        success: function (data) {
            var daleg = data.Data;
            $(".hisUl").empty();
            for (var i = 0; i < daleg.length; i++) {
                //console.log(daleg.length);
                var img = '<img class="tx3_hd" src='+imgSrc + daleg[i].ReceiverPhoto + ' alt="头像">',
                    lit = '<li class="cot3_til">' + daleg[i].Title + '</li>',
                    liRece = '<li class="cot_poster">' + daleg[i].Receiver + '</li>',
                    licont = '<li class="content_info">' + daleg[i].Content + '</li>',
                    liTim = '<li class="tx3_dj">' + tim(daleg[i].SendTime) + '</li>';
                console.log(daleg[i].ReceiverPhoto);
                $(".hisUl").append(hliHed + img + liulHed + lit + liRece+ licont + liTim + liulEnd + hliEnd);
            }
        }
    })
})
//时间戳转换
function tim(t) {
    var date = new Date(t*1000),
    Y = date.getFullYear() + '/',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/',
    D = date.getDate() + ' ',
    h = date.getHours() + ':',
    m = date.getMinutes(),
    s = date.getSeconds(),
    ss =  ':'+ date.getMilliseconds();
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }
    var tim = Y + M + D + h + m;
    return tim;
}

//获取消息界面
function article(p) {
    var adminId = localStorage.AdminId;
    $(".article_inf").animate({ "left": 0 });
    var $t = $(p),
        $d = $t.attr("data-init"),
        $c = $t.children();
    var bT = $c.children(".cot3_til").html(),
        mC = $c.children(".content_info").html();
    getAjax(adminId, $d, 2);

   
    $("#article_inf b").html(bT);
    $("#article_inf .mes_cont").html(mC);

    $("#article_inf .back_ig").click(function () {
        $("#article_inf").animate({ "left": "150%" });
        
    }); 
}
//通知弹出层详情
function getInform(op) {
    var adminId = localStorage.AdminId;
    $(".article_inf").animate({ "left": 0 });
    var $t = $(op),
        $d = $t.attr("data-init"),
        $c = $t.children();
    var til = $c.children("p span").html(),
        cot = $t.children("h6").html();
    getAjax(adminId, $d, 1);

    $("#article_inf b").html(til);
    $("#article_inf .mes_cont").html(cot);

    $("#article_inf .back_ig").click(function () {
        $("#article_inf").animate({ "left": "150%" });
        
    });
}
//修改消息(通知)读取状态
function getAjax(adminId,id,tp) {
    $.ajax({
        url: '/Msg/TagRead',
        type: 'post',
        data: { adminId: adminId, msgId: id, msgType: tp },
        success: function (data) {
            if (data.ResultType == 3) {
                //alert("chenggong ");
            } else {
                alert(data.Message);
            }
            getInfos();
        }
    });
    
}
//离职审核状态
function getstate(state, cls) {
    $(cls + " a").remove();
    if (state == 0) {
        $(cls).append('<a href="#" class="tooltip-test" data-toggle="tooltip" title="审核中"><img src="img/audit.png" alt="审核中"/></a>');
    } else if (state == 1) {
        $(cls).append('<a href="#" class="tooltip-test" data-toggle="tooltip" title="通过"><img src="img/pass.png" alt="审核中"/></a>');
    } else {
        $(cls).append('<a href="#" class="tooltip-test" data-toggle="tooltip" title="不通过"><img src="img/not_pass.png" alt="审核中"/></a>');
    }

}

function popupShow(mg) {
    $(".apply_dialog .card_sure").html(mg);
    $(".bg_dialog,.apply_dialog").show();
}

function popupHide() {
    $(".bg_dialog,.apply_dialog").hide();
}

//校验请假参数
function checkLeaveInfo() {
    var startTime = $("#inpstart").val();
    var endTime = $("#inpend").val();
    var leaveDays = $("#LeaveDays").val();
    var reason = $("#leaveReason").val();
    if (startTime == null || startTime == "" || startTime == undefined) {
        showMsg("请选择开始时间");
        return false;
    }
    if (endTime == null || endTime == "" || endTime == undefined) {
        showMsg("请选择结束时间");
        return false;
    }
    if (leaveDays == null || leaveDays == "" || leaveDays == undefined) {
        showMsg("请假天数有误，请重新填写");
        return false;
    }
    if (reason != null && leaveDays != "" && leaveDays != undefined) {
        if (reason.length > 25) {
            showMsg("请假原因不能超过25个字符");
            return false;
        }
    }
}

//获取请假时的休假
function getVacation() {
    var adminId = localStorage.AdminId;
    if (adminId == null || adminId == "" || adminId == undefined) {
        showMsg("请重新登录");
        return false;
    }
    $.ajax({
        url: "/atten/GetVacation",
        type: "post",
        data: { AdminId: adminId },
        success: function (data) {
            var AnnualLeaveDays = data.AnnualLeaveDays;
            var PaidLeaveDays = data.PaidLeaveDays;
            var baseOption = '<option value="0">请选择</option>';
            $("#PaidLeaveDays").empty();
            $("#nianj").empty();
            $("#PaidLeaveDays").append(baseOption);
            $("#nianj").append(baseOption);
            for (var i = 1; i <= PaidLeaveDays; i++) {
                var tempOption = '<option value="' + i + '">' + i + '</option>';
                $("#PaidLeaveDays").append(tempOption);
            }
            for (var i = 1; i <= AnnualLeaveDays; i++) {
                var tempOption = '<option value="' + i + '">' + i + '</option>';
                $("#nianj").append(tempOption);
            }
        }
    });
}

//校验加班参数
function checkOvertime() {
    var startTime = $("#jbstart").val();
    var endTime = $("#jbend").val();
    var days = $("#OvertimeDays").val();
    var reason = $("#OvertimeReason").val();
    if (startTime == null || startTime == "" || startTime == undefined) {
        showMsg("请选择开始时间");
        return false;
    }
    if (endTime == null || endTime == "" || endTime == undefined) {
        showMsg("请选择结束时间");
        return false;
    }
    if (days == null || days == "" || days == undefined) {
        showMsg("加班天数有误，请重新填写");
        return false;
    }
    if (reason != null && reason != "" && reason != undefined) {
        if (reason.length > 25) {
            showMsg("加班原因不能超过25个字符");
            return false;
        }
    }
}

//校验外勤参数
function checkField() {
    var startTime = $("#wqstart").val();
    var endTime = $("#wqend").val();
    var days = $("#FieldDays").val();
    var reason = $("#FieldReason").val();
    if (startTime == null || startTime == "" || startTime == undefined) {
        showMsg("请选择开始时间");
        return false;
    }
    if (endTime == null || endTime == "" || endTime == undefined) {
        showMsg("请选择结束时间");
        return false;
    }
    if (days == null || days == "" || days == undefined) {
        showMsg("外勤数有误，请重新填写");
        return false;
    }
    if (reason != null && reason != "" && reason != undefined) {
        if (reason.length > 25) {
            showMsg("外勤原因不能超过25个字符");
            return false;
        }
    }
}

//返回考勤界面
function getBackAtten() {
    $(".apply_form,.foot_apply").animate({ left: '150%' });
}

//将表单数据序列化成Json数据
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$(".apply_form").click(function () {
    //$("#linkMan").hide();
})

//展示提示信息
function showMsg(msg) {
    $(".bg_dialog,.dk_dialog").show();
    $(".dk_dialog .dk_inf_p").html(msg);

    $(".prompt").click(function () {
        $(".bg_dialog,.dk_dialog").hide();
    });
}

//获取请假，加班，外勤数据
function getAttens(attenFlag) {
    var adminId = localStorage.AdminId;
    var date = $("#USER_AGE").val();
    $.ajax({
        url: "/Atten/GetAttenList",
        type: "Post",
        data: { AdminId: adminId, Date: date, AttenFlag: attenFlag },
        success: function (data) {
            var ulHead = '<ul class="lsjl_l">';
            var ulFoot = '</ul>'
            if (data.ResultType == 3) {
                $("#scroll_lsjl").empty();
                var entities = data.Data;
                for (var i = 0; i < entities.length; i++) {
                    var StartTime = entities[i].StartTime;
                    var EndTime = entities[i].EndTime;
                    var VerifyType = entities[i].VerifyType;
                    var Days = entities[i].Days;
                    var liStartTime = '<li><label>开始日期</label> <span >' + StartTime + '</span></li>';
                    var liEndTime = '<li><label>结束日期</label> <span >' + EndTime + '</span></li>';
                    var liDays = '<li><label>天数</label> <span >' + Days + '</span></li>';
                    var liVerifyType = '';
                    if (VerifyType == 1) {
                        liVerifyType = '<li><label>审核状态</label> <i class="green"></i></li>';
                    } else if (VerifyType == 2) {
                        liVerifyType = '<li><label>审核状态</label> <i class="red"></i></li>';
                    } else {
                        liVerifyType = '<li><label>审核状态</label> <i class="yellow"></i></li>';
                    }
                    var option = ulHead + liStartTime + liEndTime + liDays + liVerifyType + ulFoot;
                    $("#scroll_lsjl").append(option);
                }
            } else {
                showMsg(data.Message);
            }
        }
    });
    if (attenFlag == 0) {
        $(".person_infi b").html('请假详情');
    }
    if (attenFlag == 1) {
        $(".person_infi b").html('加班详情');
    }
    if (attenFlag == 2) {
        $(".person_infi b").html('外勤详情');
    }
    $("#qj_diag").animate({ left: '0' }).css("display", "block");
    $('#qj_diag .person_infi .back_tx').click(function () {
        $('#qj_diag').animate({ left: "150%" });
    })
}

//未签到，未签退，，详情单
function getWorkAttens(attenFlag) {
    var adminId = localStorage.AdminId;
    var date = $("#USER_AGE").val();
    $.ajax({
        url: "/Atten/GetAttenList",
        type: "Post",
        data: { AdminId: adminId, Date: date, AttenFlag: attenFlag },
        success: function (data) {
            if (data.ResultType == 3) {
                $(".sign_ul").empty();
                var entities = data.Data;
                for (var i = 0; i < entities.length; i++) {
                    var AttendanceTime = entities[i].AttendanceTime;
                    var IsPardon = entities[i].IsPardon;
                    var Id = entities[i].Id;
                    var option = '<li><label>2014-10-14</label> <span>已补卡</span></li>';
                    if (IsPardon == true) {
                        option = '<li><label>' + AttendanceTime + '</label> <span>已补卡</span></li>';
                    } else {
                        option = '<li><label>' + AttendanceTime + '</label> <input type="button" data-id="' + Id + '" value="补卡"  onclick="repair(this)"></li>';
                    }
                    $(".sign_ul").append(option);
                }
            } else {
                showMsg(data.Message);
            }
        }
    });
    if (attenFlag == 4 || attenFlag == 5) {
        if (attenFlag == 4) {
            $(".person_infi b").html('未签到详情');

        }
        if (attenFlag == 5) {
            $(".person_infi b").html('未签退详情');
        }
        $("#no_sign").animate({ left: '0' }).css("display", "block");
        $('#no_sign .person_infi .back_tx').click(function () {
            $('#no_sign').animate({ left: "150%" });
        })
    }

}

//迟到，早退
function getMinAttens(attenFlag) {
    var adminId = localStorage.AdminId;
    var date = $("#USER_AGE").val();
    $.ajax({
        url: "/Atten/GetAttenList",
        type: "Post",
        data: { AdminId: adminId, Date: date, AttenFlag: attenFlag },
        success: function (data) {
            if (data.ResultType == 3) {
                $(".bk_ul").empty();
                var entities = data.Data;
                for (var i = 0; i < entities.length; i++) {
                    var AttendanceTime = entities[i].AttendanceTime;
                    var IsPardon = entities[i].IsPardon;
                    var Minutes = entities[i].Minutes;
                    var Id = entities[i].Id;
                    var option = '<li><label>2014-10-14</label> <span>已补卡</span></li>';
                    if (IsPardon == true) {
                        option = '<li><label>' + AttendanceTime + '</label><b>0</b> <span>已补卡</span></li>';
                    } else {
                        option = '<li><label>' + AttendanceTime + '</label><b>' + Minutes + '</b> <input type="button" data-id="' + Id + '" value="补卡"  onclick="repair(this)"></li>';
                    }
                    $(".bk_ul").append(option);
                }
            } else {
                showMsg(data.Message);
            }
        }
    });
    if (attenFlag == 6 || attenFlag == 7) {
        if (attenFlag == 6) {
            $(".person_infi b").html('迟到详情');
        }
        if (attenFlag == 7) {
            $(".person_infi b").html('早退详情');
        }
        $("#bk_diag").animate({ left: '0' }).css("display", "block");
        $('#bk_diag .person_infi .back_tx').click(function () {
            $('#bk_diag').animate({ left: "150%" });
        })
    }
}

//早到，晚退
function getNomalAttens(attenFlag) {
    var adminId = localStorage.AdminId;
    var date = $("#USER_AGE").val();
    $.ajax({
        url: "/Atten/GetAttenList",
        type: "Post",
        data: { AdminId: adminId, Date: date, AttenFlag: attenFlag },
        success: function (data) {
            if (data.ResultType == 3) {
                $(".end_card .info").empty();
                var entities = data.Data;
                for (var i = 0; i < entities.length; i++) {
                    var AttendanceTime = entities[i].AttendanceTime;
                    var IsPardon = entities[i].IsPardon;
                    var Id = entities[i].Id;
                    var option = '<li><label>2014-10-14</label> <span>已补卡</span></li>';
                    if (IsPardon == true) {
                        option = '<li><label>' + AttendanceTime + '</label> <span>已补卡</span></li>';
                    } else {
                        option = '<li><label>' + AttendanceTime + '</label> <span data-id="' + Id + '">补卡</span></li>';
                    }
                    $(".end_card .info").append(option);
                }
            } else {
                showMsg(data.Message);
            }
        }
    });
}

//补卡
function repair(option) {
    var id = $(option).attr("data-id");
    var adminId = localStorage.AdminId;
    var date = $("#USER_AGE").val();
    $.ajax({
        url: "/Atten/Repair",
        type: "POST",
        data: { Id: id, AdminId: adminId, Date: date },
        success: function (data) {
            if (data.ResultType == 3) {
                $(option).attr("value", "已补卡");
                $(option).attr("disabled", "disabled");
            } else {
                showMsg(data.Message);
            }
        }
    });
}


//校验离职申请
function checkResignation() {
    var dateTime = $("#leaveOffice").val(),
        because = $("#leave_because").val();
    if (dateTime == null || dateTime == '' || dateTime == undefined) {
        showMsg("离职日期有误");
        return false;
    }
    if (because == null || because == '' || because == undefined) {
        showMsg("请填写离职原因");
        return false;
    } else {
        if (because.length>50) {
            showMsg("离职原因不能超过50个字符");
            return false;
        } else {
            return true;
    }
}

}

