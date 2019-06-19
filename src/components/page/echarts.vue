<!-- echarts :  官方文档：https://echarts.baidu.com/examples/#chart-type-pie
    使用文档https://www.jianshu.com/p/cf0a54374419 
    或者用 vue-echarts : https://github.com/ecomfe/vue-echarts
-->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="bottom" id="myChart" :style="{width: '100%', height: '300px'}"></div>
            <div id="myCircleChart" :style="{width: '100%', height: '300px'}"></div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: 'basetable',
        data() {
            return {
                
            }
        },
        mounted(){
            this.drawLine();
            this.drawCircle();
        },
        methods: {
            // 树形图
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '在Vue中使用echarts' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            },
            // 圆图
            drawCircle(){
                // 基于准备好的dom，初始化echarts实例
                let myCircleChart = echarts.init(document.getElementById('myCircleChart'));
                myCircleChart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:[
                                {value:335, name:'直接访问'},
                                {value:310, name:'邮件营销'},
                                {value:234, name:'联盟广告'},
                                {value:135, name:'视频广告'},
                                {value:1548, name:'搜索引擎'}
                            ]
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>
    .bottom{
        border-bottom: 1px solid #E5E2E2;
    }
</style>