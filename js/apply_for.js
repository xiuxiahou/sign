/**
 * Created by houxiuxia on 2016/7/14.
 */
$(function () {
    //计算主体的高度
    $(".main_work").height($(window).height() - $(".til_bak").height() - $(".btn_li").height());
    //详情列表的高度
    var ap_ul = $(".apply_inf ul").height();


    //点击返回到上一个界面
    $(".back_befo").click(function(){
    })

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
    opt.date = {preset: 'date'};
    opt.datetime = {preset: 'datetime'};
    opt.time = {preset: 'time'};
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
    $("#bktime").mobiscroll(opDate).date(opDate); //补卡日期

})