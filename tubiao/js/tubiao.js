/**
 * Created by 华 on 2016/9/7.
 */
$(function () {
    $(".shopAccount .til_dk .head_til").click(function () {
        window.location.href = "dk.html";
    })

    $(".dateTim>div").click(function () {
        $(this).addClass("whiteBg");
        $(this).siblings().removeClass("whiteBg");
    });


    $('.swiper-container').height($(window).height() - $("#til_dk").height() - $(".shopDate").height());

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical',
        onSlideChangeEnd: function (swiper) {
            hasClass();
        }
    });

    //金额K
    var wh = $(".jinErK").width();
    $(".jinErK").height(wh);
    $(".dateQiu li,.pingPang li").width(wh / 7);
    var qoiQh = $(".qiuQ").width();
    $(".qiuQ").height(qoiQh);
    //金额K end

    //会员个
    var hy = $(".huiyuan").width();
    $(".huiyuan").height(hy);
    $(".huiy_month li,.huiy_peo>li").height(hy / 7).css("line-height", hy / 7 + "px");

    //充值K
    var whCZ = $(".chongZhi").width();
    $(".chongZhi,.montUl,.chongZhi .peopleUl,.moneyUl").height(whCZ);
    $(".montUl li,.chongZhi .peopleUl li,.peopleUl li b,.moneyUl li").height(whCZ / 7).css("line-height", whCZ / 7 + "px");
    //充值end

    //   退货件
    var th = $(".tH_box").width();
    $(".tH_box").height(th);
    $(".month,.pillar").width(th);
    $(".month li,.pillar li i").width(th / 7);
    $(".pillar li").width(th / 14);
    $(".pillar li i").css("margin-left", -th / 14);
    $(".pillar li span").css("border-width", th / 28).css("margin-left", -th / 28);
    $(".pillar li").css("margin-left", th / 28).css("margin-right", th / 28);
    //退货件

    //   销售件
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
        tooltip: {
            trigger: 'axis',
            showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        },

        xAxis: [
            {
                type: 'category', /*
             name: '月/2016',  //坐标轴名字
             nameLocation: 'end', //名字位置*/
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,0.6)"
                    }
                },
                data: ["2", "3", "4", "5", "6", "7", "8"],
                axisLabel: {
                    textStyle: {
                        fontSize: '16px'  //刻度大小
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {//终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,0.1)"
                    }
                }
            }

        ],
        grid: { // 控制图的大小，调整下面这些值就可以，
            x: 50,
            x2: 65
        },

        yAxis: [
            {
                type: 'value',
                name: '件',  //坐标轴名字
                nameLocation: 'end', //位置
                splitNumber: 10,
                axisLabel: {
                    textStyle: {
                        fontSize: 15  //刻度大小
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,0.6)"
                    }

                },
                splitLine: {//终于找到了，背景图的内置表格中“边框”的颜色线条  这个是y轴的竖线
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,0.1)"
                    }
                },
                axisTick: {
                    show: false
                }

            }

        ],
        series: [
            {
                "name": "销量",
                "type": "bar",
                "data": [82, 52, 62, 72, 100, 82, 113],
                'barWidth': 20//柱图宽度
            }
        ],
        itemStyle: {
            normal: {
                // 设置柱形的颜色
                color: function (params) {
                    // build a color map as your need.
                    var colorList = [
                        'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.6)',
                        'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)'
                    ];
                    return colorList[params.dataIndex]
                }
            }
        },
        textStyle: {
            color: 'rgba(255, 255, 255, 1)'
        }
    });
    var slidLg = $(".swiper-slide").length;

    function hasClass() {
        for (var i = 0; i < slidLg; i++) {
            if ($(".swiper-slide").eq(i).hasClass('swiper-slide-active')) {
                if (i == 0) {
                    //   销售件
                    var myChart = echarts.init(document.getElementById('main'));
                    myChart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },

                        xAxis: [
                            {
                                type: 'category', /*
                             name: '月/2016',  //坐标轴名字
                             nameLocation: 'end', //名字位置*/
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.6)"
                                    }
                                },
                                data: ["2", "3", "4", "5", "6", "7", "8"],
                                axisLabel: {
                                    textStyle: {
                                        fontSize: '16px'  //刻度大小
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {//终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.1)"
                                    }
                                }
                            }

                        ],
                        grid: { // 控制图的大小，调整下面这些值就可以，
                            x: 50,
                            x2: 65
                        },

                        yAxis: [
                            {
                                type: 'value',
                                name: '件',  //坐标轴名字
                                nameLocation: 'end', //位置
                                splitNumber: 10,
                                axisLabel: {
                                    textStyle: {
                                        fontSize: 15  //刻度大小
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.6)"
                                    }

                                },
                                splitLine: {//终于找到了，背景图的内置表格中“边框”的颜色线条  这个是y轴的竖线
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.1)"
                                    }
                                },
                                axisTick: {
                                    show: false
                                }

                            }

                        ],
                        series: [
                            {
                                "name": "销量",
                                "type": "bar",
                                "data": [82, 52, 62, 72, 100, 82, 113],
                                'barWidth': 20//柱图宽度
                            }
                        ],
                        itemStyle: {
                            normal: {
                                // 设置柱形的颜色
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.6)',
                                        'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0.2)'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    });
                }//   销售件
                else if (i == 1) {
                    //   金额 K
                    var myChart2 = echarts.init(document.getElementById('main2'));
                    myChart2.setOption({
                        tooltip: {
                            trigger: 'axis',
                            showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                        },
                        grid: {
                            x: 50,
                            y: 50,
                            x2: 70,
                            y2: 100
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: ["2", "3", "4", "5", "6", "7", "8"],
                                axisLine: {//x轴的横坐标边框线
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.6)"
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                boundaryGap: false,  //从0开始  true不从0开始
                                splitLine: {//终于找到了，背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.1)"
                                    }
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                splitNumber: 10,
                                axisLine: {//x轴的横坐标边框线
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.6)"
                                    }
                                },

                                splitLine: {//终于找到了，背景图的内置表格中“边框”的颜色线条   这个是y轴的横线
                                    show: true,
                                    lineStyle: {
                                        color: "rgba(255,255,255,0.1)"
                                    }
                                }
                            }
                        ],
                        series: [
                            {
                                name: '金额',
                                type: 'line',
                                /*  smooth:true,//表示折线图的气泡smooth:true,不显示，false显示 symbol: 'none'
                                 symbol: 'none',*/
                                show: true,
                                lineStyle: {//折线的颜色
                                    normal: {
                                        color: "#fff",
                                        width: 0  //不显示折线
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: 'rgba(255, 255, 255, 0.9)'  //渐变色填充 开始值
                                        }, {
                                            offset: 1,
                                            color: 'rgba(255, 255, 255, 0.1)' //渐变色填充  结束值
                                        }])
                                    }
                                },
//                markLine: {
//                    data: [
//                        {type: 'average', name: '平均值'}
//                    ],
//                    itemStyle: {
//                        normal: {
//                            lineStyle: {
//                                color: 'rgba(255,255,255,0.5)'
//                            }
//                        }
//                    }
//                },
                                itemStyle: {
                                    normal: {
                                        borderWidth: '12',
                                        color: "rgba(255,255,255,0.5)"
                                    }
                                },
                                data: ["20", "23", "43", "25", "16", "27", "81"]
                            }
                        ],
                        textStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        }
                    });
                }//  金额 K
                else if (i == 2) {
                    //   退货件
                    $(".pillar li,.pillar li span,.pillar li b,.pillar li i").hide();
                    $(".pillar li span,.pillar li b").animate({"margin-top":0});
                    $(".pillar li i").css("margin-top", 0);
                    $(".pillar li").height(0);

                    var arry = [13, 16, 14, 18, 39, 11, 15];

                    var maxArr = Math.max.apply(null, arry);
                    for (var i = 0; i < arry.length; i++) {
                        if (maxArr > 0 && maxArr <= 20) {
                            heg(i, 10);
                        } else if (maxArr > 20 && maxArr <= 40) {
                            heg(i, 4);
                        } else if (maxArr > 40 && maxArr <= 60) {
                            heg(i, 3);
                        } else if (maxArr > 60 && maxArr <= 80) {
                            heg(i, 2);
                        } else if (maxArr > 80 && maxArr <= 100) {
                            heg(i, 1);
                        }
                    }
                    function heg(id, hg) {
                        $(".pillar li").eq(id).animate({"height": arry[i] * hg},500).show();
                        $(".pillar li span").eq(id).animate({"margin-top": arry[i] * hg + 2}).show();
                        $(".pillar li b").eq(id).animate({"margin-top": arry[i] * hg + th / 28 + 6}).show();
                        $(".pillar li i").eq(id).html(arry[id]).css("margin-top", arry[i] * hg + th / 28 + 10).show(1500);
                    }

                    var sortMax = arry.sort(function (a, b) {
                        return b - a;
                    });
                    for (var q = 0; q < arry.length; q++) {
                        var liNum = $(".pillar li i").eq(q).html();
                        if (arry[0] == liNum) {
                            $(".pillar li i").eq(q).parent().css("opacity", 1);
                        } else if (arry[1] == liNum || arry[2] == liNum) {
                            $(".pillar li i").eq(q).parent().css("opacity", 0.75);
                        } else if (arry[3] == liNum || arry[4] == liNum) {
                            $(".pillar li i").eq(q).parent().css("opacity", 0.5);
                        } else if (arry[5] == liNum || arry[6] == liNum) {
                            $(".pillar li i").eq(q).parent().css("opacity", 0.3);
                        }
                    }
                } // 退货件
                else if (i == 3) {
                    //金额K
                    var qiu = [6, 4, 2, 6, 3, 5, 3];
                    $(".point").empty();
                    for (var i = 0; i < qiu.length; i++) {
                        $(".vertical .inner").eq(i).html(qiu[i] + 'K');
                        addPoint(i, qiu[i]);
                    }
                    function addPoint(indx, num) {
                        var h = 0;
                        while (h < num * 2) {
                            $(".point").eq(indx).append("<b>.</b>");
                            h++;
                        }
                    }

                    var qiuNum = qiu.sort(function (a, b) {
                        return a - b;
                    });
                    for (var t = 0; t < qiu.length; t++) {
                        var nn = $(".vertical .inner").eq(t).html(),
                            nn = nn[0];
                        if (qiu[0] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 1);
                            aa(t, 74);
                        } else if (qiu[1] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 0.8);
                            aa(t, 80);
                        } else if (qiu[2] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 0.8);
                            aa(t, 84);
                        } else if (qiu[3] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 0.55);
                            aa(t, 88);
                        } else if (qiu[4] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 0.55);
                            aa(t, 92);
                        } else if (qiu[5] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 0.35);
                            aa(t, 96);
                        } else if (qiu[6] == nn) {
                            $('.qiuQ').eq(t).css("opacity", 0.35);
                            aa(t, 100);
                        }
                    }
                    function aa(ind, num) {
                        $(".pingPang li").show();
                        $('.qiuQ .out_iner').eq(ind).width(num + '%').height($('.qiuQ .out_iner').eq(ind).width());
                        $('.outer').eq(ind).height($(".outer").eq(ind).width());
                        $('.inner').eq(ind).height($(".inner").eq(ind).width()).css("line-height", $(".inner").eq(ind).width() + 'px');

                    }

                    pointOpact();
                    function pointOpact() {
                        var pont = $(".pingPang b").length, del = 10, lay = 15;
                        for (var g = 0; g < pont; g++) {
                            $(".point b").eq(g).delay(del).animate({"opacity": 0.2});
                            $(".point b").eq(g).delay(lay).animate({"opacity": 1});
                            del += 30;
                            lay += 10;
                        }
                        var out_in = $(".qiuQ .out_iner").length, oi = 320;
                        for (var w = 0; w < out_in; w++) {
                            $(".qiuQ .out_iner").eq(w).delay(oi).animate({"opacity": 0.3});
                            $(".qiuQ .out_iner").eq(w).delay(oi).animate({"opacity": 1});
                            oi += 100;
                        }
                    }
                }  //金额K
                else if (i == 4) {

                    var huiy = [20, 20, 30, 60, 60, 100, 15], maxMin = [];//定义一个空数组进行存放排序后的数组;
                    var maxhuiy = Math.max.apply(null, huiy);  //求得数组中最大的数字
                    $(".huiy_peo").empty();
                    var pli, pimg, linum, pilend;

                    if (maxhuiy <= 10) {
                        addPeo(1);
                    } else if (maxhuiy <= 20) {
                        addPeo(2);
                    } else if (maxhuiy <= 30) {
                        addPeo(3);
                    } else if (maxhuiy <= 40) {
                        addPeo(4);
                    } else if (maxhuiy <= 50) {
                        addPeo(5);
                    } else if (maxhuiy <= 60) {
                        addPeo(6);
                    } else if (maxhuiy <= 70) {
                        addPeo(7);
                    } else if (maxhuiy <= 80) {
                        addPeo(8);
                    } else if (maxhuiy <= 90) {
                        addPeo(9);
                    } else if (maxhuiy <= 100) {
                        addPeo(10);
                    } else if (maxhuiy <= 200) {
                        addPeo(20);
                    } else if (maxhuiy <= 300) {
                        addPeo(30);
                    } else {
                        addPeo(50);
                    }

                    function addPeo(ratio) {
                        for (var k = 0; k < huiy.length; k++) {
                            var peo = huiy[k];
                            pli = '<li><ul class="liImg"><li>';
                            pilend = '</li></ul></li>';
                            linum = '<li class="numNum">' + peo + '</li>';
                            for (var t = 0; t < peo / ratio; t++) {
                                pimg = '<img src="img/r.png" alt="png"/>';
                                pli += pimg;
                            }
                            $(".huiy_peo").append(pli + linum + pilend);
                        }
                    }

                    var sliTim = 50;
                    for (var i = 0; i < $(".huiy_peo li img").length; i++) {
                        $(".huiy_peo .liImg li").eq(i).delay(sliTim).animate({"opacity": 1});
                        sliTim += 100;
                    }
                    var nums = huiy.sort(function (a, b) {
                        return b - a;
                    });
                    for (var o = 0; o < huiy.length; o++) {
                        var liNum = $(".huiy_peo .numNum").eq(o).html();
                        //console.log(liNum, huiy[o]);
                        if (huiy[0] == liNum) {
                            $(".huiy_peo .numNum").eq(o).parent().parent().css("opacity", 1);
                        } else if (huiy[1] == liNum || huiy[2] == liNum) {
                            $(".huiy_peo .numNum").eq(o).parent().parent().css("opacity", 0.75);
                        } else if (huiy[3] == liNum || huiy[4] == liNum) {
                            $(".huiy_peo .numNum").eq(o).parent().parent().css("opacity", 0.5);
                        } else if (huiy[5] == liNum || huiy[6] == liNum) {
                            $(".huiy_peo .numNum").eq(o).parent().parent().css("opacity", 0.3);
                        }
                    }
                    $(".huiyuan").height(hy);
                    $(".huiy_month li,.huiy_peo>li").height(hy / 7).css("line-height", hy / 7 + "px");
                }  //会员个
                else if (i == 5) {
                    //充值K
                    var wgbl, peoLiwh, maxMoney, monyWh, hhh;
                    //    var peoArry = [320000, 220000, 620000, 999000, 205000, 562000, 250000];
                    var peoArry = [32000, 22000, 62000, 99900, 20000, 56200, 25000];
                    //    var peoArry = [3200, 2200, 6200, 9900, 2250, 5620, 2500];
                    maxMoney = Math.max.apply(null, peoArry);
                    wgbl = whCZ / 14; //每个小网格所占比例  16
                    peoLiwh = 11 * wgbl; //UL的宽度
                    monyWh = 3 * wgbl; //金额ul 宽度
                    $(".chongZhi .peopleUl,.chongZhi .peopleUl li").width(peoLiwh);
                    $('.moneyUl').width(monyWh);
                    var dela = 100, spade = 600;
                    for (var i = 0; i < peoArry.length; i++) {
                        var liHg = peoArry[i];
                        if (maxMoney > 100000 && maxMoney < 1000000) {  //当天的充值金额
                            heg(7000);
                        }
                        if (maxMoney > 10000 && maxMoney < 100000) {  //当天的充值金额
                            heg(700);
                        }
                        if (maxMoney > 1000 && maxMoney < 10000) {  //当天的充值金额
                            heg(70);
                        }
                        var nmu = (Number(liHg / 1000)).toFixed(1);
                        $('.moneyUl li').eq(i).html(nmu + 'K');
                        dela += 100;
                        continue;
                    }
                    function heg(ht) {
                        $(".peopleUl li span").empty();
                        $(".peopleUl li b").width(0);
                        $(".chongZhi .moneyUl li").css("opacity", 0);
                        $(".chongZhi .peopleUl").find('li b').eq(i).delay(dela).animate({"width": liHg / ht});
                        $(".chongZhi .peopleUl").find('li span').eq(i).delay(dela + 50).animate({"width": peoLiwh - liHg / ht}, 200);
                        $(".chongZhi .moneyUl li").eq(i).delay(dela + 1000).animate({"opacity": 0.9});
                        hhh = (peoLiwh - liHg / ht) / wgbl * 2;
                    }

                    var delStart = 500;
                    for (var j = 0; j < hhh; j++) {
                        $(".chongZhi .peopleUl").find('li span').append('<i>.</i>');
                        $(".chongZhi .peopleUl").find('li span i').delay(delStart).animate({"opacity": 1});
                        delStart += 50;
                    }

                    $(".chongZhi .peopleUl li span,.chongZhi .peopleUl li span i").height(whCZ / 7).css("line-height", whCZ / 12 + "px");
                    $(".chongZhi .peopleUl li span i").width(wgbl / 2);
                }  //充值K
                else if (i == 6) {
                    //热销品类
                    var rxpBox = $(".rxpBox").width();
                    var rxpp = $(".rxpdouble").width();
                    $(".rxpBox").height(rxpBox);
                    $(".rxpdouble").height(rxpp);

                    var len = $(".rxpdouble>img").length;

                    var leg = len - 1, delay = 500, k = 0.4;
                    while (leg >= 0) {
                        if (leg % 2 == 0) {
                            $(".rxpdouble img").eq(leg).css("left", '-100%');
                            $(".rxpBox span").eq(leg).css("margin-left", '100%').css("opacity", k);
                        } else {
                            $(".rxpdouble img").eq(leg).css("left", '100%');
                            $(".rxpBox span").eq(leg).css("margin-left", '-100%').css("opacity", k);
                        }
                        $(".rxpdouble img").eq(leg).delay(delay).animate({'left': 0}).show();
                        $(".rxpBox span").eq(leg).delay(delay).animate({'margin-left': 0}).show();
                        leg--;
                        delay += 100;
                        k = k + 0.15;
                    }
                }   //热销品类
                else if (i == 7) {
                    $(".img_cil canvas").remove();
                    $(".img_cil>span").hide();
                    $(".img_cil>img").hide();
                    //热销品牌
                    var wh = $("#cil_box").width();
                    $("#cil_box").height(wh);
                    $('#one').circliful();
                    $('#two').circliful();
                    $('#three').circliful();
                    $('#four').circliful();
                    $('#five').circliful();
                    $(".img_cil>span").show(1000);
                    $(".img_cil>img").show(2000);
                }  //热销品牌
            }
        }
    }
});
