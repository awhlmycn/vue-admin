<template>
    <div class="table">
        <!-- 页面头 -->
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 广告列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary" icon="search" @click="addTitle">新增</el-button>
            </div>

        	<el-table :data="data" border >
			    <el-table-column prop="id" label="ID" min-width="5%" sortable align="center"></el-table-column>
			    <el-table-column prop="title" label="标题" min-width="10%" align="center"></el-table-column>
                <el-table-column prop="icon" label="图标" min-width="10%" align="center"></el-table-column>
			    <el-table-column label="操作" min-width="15%"  align="center">
                    <template slot-scope="scope">
                    	<el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
                    		编辑
                    	</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
			 </el-table>
			 <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" 
                    layout="prev, pager, next" :total="total" :page-size="page_size" background>
                </el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%" :close-on-click-modal="false" center>
			<el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="标题：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
            </el-form>
			<span slot="footer" class="dialog-footer">
			   	<el-button type="primary" @click="saveEdit">确 定</el-button>
                <el-button @click="cancelEdit">取 消</el-button>
            </span>
		</el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">是否删除此题？</div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteRow()">确 定</el-button>
                <el-button @click="cancelDel()">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
           return{
           		editVisible: false,
                delVisible: false,
                select_word: '',
                cur_page: 1,
                page_size : 20,
                total : 0,
                form: {},
                selectId: -1,
	           	tableData: [{
                    id : 1,
                    icon : 'mingyue',
                    title : '1111'
                },
                {
                    id : 2,
                    icon : 'mingyue',
                    title : 'sdkjsak'
                }]
           	}
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter(( d ) => {
                    if( d.title.indexOf( this.select_word ) > -1 ) {
                        return d;
                    }
                })
            }
        },
        methods:{
            search(){

            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取每页的数据
            async getData() {
                // var backData = await this.$axios.get( '/user/purviews', page : this.cur_page, pageSize : this.page_size } );
                // if( backData.code == 200 ) {
                //     this.tableData = backData.result;
                //     this.total = backData.total;
                // }
            },
        	//修改、弹出编辑框
        	handleEdit( index, row ) {
        		this.editVisible = true;
        		this.selectId = index;
                this.form = Object.assign( {}, row );
                if( this.form.hasOwnProperty( 'is_del' ) ) {
                    this.form.is_del = this.form.is_del.toString();
                }
        	},
            // 新增加题目
            addTitle() {
                this.editVisible = true;
            },
            // 取消修改
            cancelEdit() {
                this.editVisible = false;
                this.selectId = -1;
                this.form = {};
            },
        	// 保存数据，并且发送给服务器
        	async saveEdit() {
        		if( this.$lele.empty( this.form ) ) {
                    this.$message.error({ message : '没有要修改的数据'});
                    return;
                }
                var alertData = {
                    title : this.form.title,
                    icon : this.form.icon
                };
                console.log( alertData );
                var backData = null;
                // 修改信息
                if( this.selectId >= 0 ) {
                    alertData.id = this.selectId;
                    // backData = await this.$axios.get( '/gm/modifyAd', alertData );
                    // if( backData.code == 200 ) {
                    //     this.tableData[ this.selectId ] = Object.assign( this.tableData[ this.selectId ], this.form );
                    // }
                }
                // 新增信息
                else{
                    // backData = await this.$axios.get( '/gm/addAd', alertData );
                    // if( backData.code == 200 && this.tableData.length < this.page_size ) {
                    //     this.tableData.push( backData.result );
                    // }
                }
                this.$lele.toast( '成功', 'success' );
                this.cancelEdit();
        	},
        	// 是否删除
        	async handleDelete( index, row ) {
        		this.delVisible = true;
        		this.selectId = index;
        	},
        	// 确认禁用
        	async deleteRow() {
        		this.delVisible = false;
                // 发送给服务器去处理
        	},
            //取消删除
            cancelDel(){
                this.delVisible = false;
                this.selectId = -1;
            },
        },
        filters : {}
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
	.forbid {
		font-weight: bold;
		color: red;
	}
</style>
