<template>
    <div class="feedback-list">

        <div class="header-filter">
            <div class="filter">
                <el-input v-model="list.filter.search" placeholder="姓名/单位/职务" class="search_input" size="samll"
                          prefix-icon="el-icon-search"></el-input>
                <el-select v-model="list.filter.exhibition" placeholder="感兴趣的展区/活动" class="search_input"
                           size="samll" clearable>
                    <el-option v-for="item in this.config.exhibitions" :key="item" :label="item"
                               :value="item">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="search" size="samll">查询</el-button>
                <el-button icon="el-icon-refresh-right" size="samll" @click="reset">重置</el-button>
            </div>
            <div>
<!--                <el-button type="primary" icon="el-icon-plus" class="add_btn" @click="addItem" size="samll">新增-->
<!--                </el-button>-->
                <el-button type="primary" icon="el-icon-plus" class="add_btn" @click="exportExcel" size="samll">导出
                </el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :height="table_height" :data="list.results" stripe style="width: 100%; height: 100%;"
                  @row-click="handleRowClick">
            <el-table-column property="name" label="姓名" min-width="10%" align="center">
            </el-table-column>
            <el-table-column property="company" label="单位" min-width="15%" align="center">
            </el-table-column>
            <el-table-column property="position" label="职务" min-width="15%" align="center">
            </el-table-column>
            <el-table-column property="scheme" label="感兴趣的场景/解决方案" min-width="15%" align="center">
                <template slot-scope="{row}">
                    <div v-for="item in row.scheme" :key="item.lable">
                        <el-tag v-for="i in item.children" :key="i">{{i}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="phone" label="联系方式" min-width="15%" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
                <template slot-scope="{row}">
                    <el-button type="primary" @click="editItem(row)" size="mini">查看</el-button>
                    <el-button type="danger" @click="handleDelete(row)" size="mini" plain>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="no-data" v-show="!list.results">暂无数据</div>
        <!-- 分页 -->
        <pagination
                :total="list.total"
                :current="list.current"
                :limit="list.filter.limit"
                @change="handlePagination"
        />
        <HomeDialong ref="dialong" @updata="handleUpdata"/>
    </div>
</template>

<script>
import HomeDialong from "@/views/Home/components/HomeDialong.vue";
import * as XLSX from 'xlsx'

export default {
    name: "indexHome",
    components: {
        HomeDialong
    },
    data() {
        return {
            data: {
                value: ''
            },
            // 页面高度 - 顶部导航栏高度 - 页面上下内边距 - 筛选部分高度 - 分页部分高度
            table_height: window.innerHeight - 66 - 60 - 92,
            // 页面列表配置
            list: {
                // 列表筛选条件
                filter: {
                    search: null,
                    exhibition: null
                },
                // 列表总数
                total: 0,
                // 列表当前页
                current: 1,
                // 列表结果
                results: [],
            },
            config: {
            }
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        //新增
        addItem() {
            this.$refs.dialong.getConfig(null)
        },
        //编辑
        editItem(row) {
            const data = JSON.parse(JSON.stringify(row))
            this.$refs.dialong.getConfig(data)
        },
        //更新
        handleUpdata(){
            this.getList()
        },
        exportExcel() {
            console.log('this.list.results',this.list.results)
            const results = this.list.results.map(item => {
                // const exhibition = item.exhibition[0].children.join(',')
                const scheme = item.scheme[0]?.children.join(',')
                return [item.name, item.company, item.position,scheme,item.phone]
            })
            console.log('results',results)

            const data = [
                ['姓名', '单位', '职务','感兴趣的场景/解决方案','联系方式'],
                // 将表格数据转换为二维数组
                ...results,
            ];

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

            // 获取当前日期
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            // 生成文件名
            const fileName = `信息收集表_${year}${month}${day}.xlsx`;

            this.saveExcelFile(excelBuffer, fileName);
        },

        saveExcelFile(buffer, fileName) {
            const data = new Blob([buffer], {type: 'application/octet-stream'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(data);
            link.download = fileName;
            link.click();
        },


        getConfig() {
            //获取配置信息

        },
        //删除功能
        handleDelete(row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    HTTP.delete("visitor", row.id).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        //获取数据并渲染
                        this.getList()
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });

                });
        },
        //获取数据 渲染列表
        getList() {
            HTTP.getRead("visitor", {
                ...this.list.filter,
            }).then((res) => {
                console.log('res',res)
                this.list.total = res.data.count
                 res.data.results.forEach((item)=>{
                    if(item.exhibition) {
                        item.exhibition = JSON.parse(item.exhibition.replace('\\',''))
                    }
                    item.scheme = JSON.parse(item.scheme.replace('\\',''))
                })
                this.list.results = res.data.results
            })
        },
        //查询按钮
        search() {
            this.getList()
        },
        //重置按钮
        reset() {
            this.list.filter.search = null;
            this.list.filter.exhibition = null;
            this.getList()
        },
        /**
         * @description 分页状态变化
         * @param limit
         * @param current
         */
        handlePagination(limit, current) {
            this.list.filter.offset = (current - 1) * limit;
            this.list.filter.limit = limit;
            this.list.current = current;
            this.getList()
        },
        //表格的点击事件
        handleRowClick(row) {
            console.log(row)
        },
    },
};
</script>
<style lang="scss" scoped>
.search_input {
  width: 200px;
}

.no-data {
  padding-top: 80px;
  text-align: center;
  color: #999;
}

.feedback-list {
  height: 100%;
  border-radius: 10px;
  position: relative;
  padding: 15px;

  .header-filter {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;

    .filter {
      width: 75%;

      .input-file {
        width: 0;
        height: 0;
        overflow: hidden;
      }

      .el-input,
      .el-select {
        width: 15%;
      }

      & > div:nth-child(n + 2),
      & > .el-button:nth-child(n) {
        margin-left: 15px;
      }
    }
  }
}

.two-line {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
