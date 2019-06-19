<!-- 
    文件导出文档 https://www.jianshu.com/p/7adf3f24e08e
 -->
<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i>文件导出</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 添加导出按钮 -->
            <div class="handle-box" style="text-align: right;">
                <el-button type="primary" @click="exportExcel" :loading="downloadLoading">导出excel</el-button>
            </div>
            <el-table :data="data" border>
                <el-table-column prop="id" label="ID" min-width="8%" sortable align="center"></el-table-column>
                <el-table-column prop="name" label="名称" min-width="14%" align="center"></el-table-column>
                <el-table-column prop="age" label="年龄" min-width="14%" align="center"></el-table-column>
                <el-table-column prop="title" label="称号" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="create_time" label="开始时间" min-width="14%" align="center" :formatter="setStartTime"></el-table-column>
                <!-- <el-table-column label="操作" min-width="10%"  align="center">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">
                            详情
                        </el-button>
                    </template>
                </el-table-column> -->
             </el-table>
             <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total" :page-size="page_size" background>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
           return{
                downloadLoading : false,
                cur_page: 1,
                page_size : 20,
                total : 0,
                tableData: []
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter(( d ) => {
                    return d;
                })
            }
        },
        methods:{
            getData(){
                this.tableData = [
                    {
                        id : 1,
                        name : 'xiaoming1',
                        age : 28,
                        title : '屌丝1'
                    },
                    {
                        id : 2,
                        name : 'xiaoming2',
                        age : 27,
                        title : '屌丝2'
                    },
                    {
                        id : 3,
                        name : 'xiaoming3',
                        age : 26,
                        title : '屌丝'
                    },
                    {
                        id : 4,
                        name : 'xiaoming4',
                        age : 25,
                        title : '屌丝'
                    }
                ]
            },
            // 设置开始时间
            setStartTime( row, type ) {
                return '2019-6-19 13:43:47';
                return this.$lele.toTimeTZ( row.create_time );
            },
            // 查看详情
            handleEdit( index, row ) {
                this.editVisible = true;
                this.form = row.pkDetails;
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            exportExcel() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['id', '名字', '年龄', '称号'];
                    const filterVal = ['id', 'name', 'age', 'title'];
                    const data = this.formatJson( filterVal, this.tableData );
                    var myDate = new Date();
                    var filename = this.$lele.formatTime() + 'record';
                    excel.export_json_to_excel({
                        header: tHeader,
                        data : data,
                        filename: filename,
                        autoWidth: true,
                        bookType: 'xlsx'
                    })
                    this.downloadLoading = false
                })
            },
            // 将data数组转为每个值
            formatJson( filterVal, jsonData ) {
                return jsonData.map( v =>
                    filterVal.map( j => {
                        if( j === 'type' ) {
                            return v[j] == 1 ? '实时pk':'多人邀请赛';
                        }
                        else {
                            return v[j]
                        }
                    })
                )
            }
        },
    }

</script>

<style scoped>
    .crumbs{
        margin-bottom: 10px;
    }
    .handle-box {
        margin-bottom: 10px;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
