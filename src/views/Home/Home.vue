<template>
    <div>
        <div class="app">
            <div class="hole top-left"></div>
            <div class="hole top-right"></div>
            <div class="hole bottom-left"></div>
            <div class="hole bottom-right"></div>
            <div class="hole middle-top"></div>
            <div class="hole middle-bottom"></div>
            <!--第一帧-->
            <div class="billiards"
                 v-for="(value, key) in billiards_list" :key="key"
                 :style="{
                    position: 'absolute',
                    top: value.xyxy?.[0]?.[1] + 'px',
                    left: value.xyxy?.[0]?.[0] + 'px',
                    // backgroundColor: 'blue',
                    backgroundImage: `url(${value?.imageUrl})`,// 添加背景图片
                    backgroundSize: '31px 31px',
                    opacity:0.1,
            }">
            </div>
            <!--第二帧-->
            <div class="billiards"
                 v-for="(value, key) in billiards_list" :key="key"
                 :style="{
                    position: 'absolute',
                    top: value.xyxy?.[1]?.[1] + 'px',
                    left: value.xyxy?.[1]?.[0] + 'px',
                    // backgroundColor: 'blue',
                    backgroundImage: `url(${value?.imageUrl})`,// 添加背景图片
                    backgroundSize: '31px 31px',
                    opacity:0.3,
            }">
            </div>
            <!--第3帧-->
            <div class="billiards"
                 v-for="(value, key) in billiards_list" :key="key"
                 :style="{
                    position: 'absolute',
                    top: value.xyxy?.[2]?.[1] + 'px',
                    left: value.xyxy?.[2]?.[0] + 'px',
                    // backgroundColor: 'blue',
                    backgroundImage: `url(${value?.imageUrl})`,// 添加背景图片
                    backgroundSize: '31px 31px',
                    opacity:0.5,
            }">
            </div>
            <!--第4帧-->
            <div class="billiards"
                 v-for="(value, key) in billiards_list" :key="key"
                 :style="{
                    position: 'absolute',
                    top: value.xyxy?.[3]?.[1] + 'px',
                    left: value.xyxy?.[3]?.[0] + 'px',
                    // backgroundColor: 'blue',
                    backgroundImage: `url(${value?.imageUrl})`,// 添加背景图片
                    backgroundSize: '31px 31px',
                    opacity:0.7,
            }">
            </div>
            <!--第5帧-->
            <div class="billiards"
                 v-for="(value, key) in billiards_list" :key="key"
                 :style="{
                    position: 'absolute',
                    top: value.xyxy?.[4]?.[1] + 'px',
                    left: value.xyxy?.[4]?.[0] + 'px',
                    // backgroundColor: 'blue',
                    backgroundImage: `url(${value?.imageUrl})`,// 添加背景图片
                    backgroundSize: '31px 31px',
                    opacity:1,
            }">
            </div>
        </div>
        <el-button style="position: fixed;top: 10%;right: 10%;" type="primary" @click="changeBilliardsData">
            输入坐标信息
        </el-button>

        <el-dialog title="输入数据流" :visible.sync="dialogFormVisible">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 15, maxRows: 20}"
                    placeholder="请输入数据流"
                    v-model="transfer">
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="onChage">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: "HomeHome",
    data() {
        return {
            billiards_list: [],
            dialogFormVisible: false,
            transfer: null,
            orgin: []
        }
    },
    methods: {
        changeBilliardsData() {
            this.dialogFormVisible = true
        },
        onChage() {

            // 将单引号替换为双引号
            this.transfer = this.transfer.replace(/'/g, '"');

            try {
                //转为对象
                this.transfer = JSON.parse(this.transfer);
                // console.log('将字符串转为对象', this.transfer);
                //寻找原点位置
                this.orgin = this.transfer.balls.bag1.xyxy[1]
                console.log('原点位置', this.orgin)
                // 计算坐标
                Object.keys(this.transfer.balls).forEach(key => {
                    //每一个的对象位置
                    // console.log(key, this.transfer.balls[key], '---')
                    //根据球的位置减去原点的坐标计算真实的位置
                    this.transfer.balls[key].xyxy = this.transfer.balls[key].xyxy.map((item) => {
                        const data = item.map((el) => {
                            return el
                            // - this.orgin[index], index
                        })
                        data[0] = Math.round((data[0] + data[2]) / 2)
                        data[1] = Math.round((data[1] + data[3]) / 2)
                        let newData = [data[0], data[1]]
                        // console.log(newData, 'newData -----')
                        return newData
                    })
                    console.log(' this.transfer.balls[key].xyxy', this.transfer.balls[key].xyxy)
                });
                this.billiards_list = this.transfer.balls
                console.log('this.billiards_list', this.billiards_list)
                this.transfer = null


            } catch (e) {
                console.error("Parsing error:", e);
                this.$alert('输入内容有误', '输入错误', {
                    confirmButtonText: '确定',
                    callback: () => {
                        this.$message({
                            type: 'info',
                            message: `已清空输入`
                        });
                    }
                });
                this.transfer = null
            }
            console.log('billiards_list', this.billiards_list)
            this.pushImagesUrl(this.billiards_list)
            this.dialogFormVisible = false
        },
        pushImagesUrl(obj) {
            console.log('obj', obj);
            Object.keys(obj).forEach((key) => {
                switch (key) {
                    case 'ball1':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-1.png'));
                        break;
                    case 'ball2':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-2.png'));
                        break;
                    case 'ball3':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-3.png'));
                        break;
                    case 'ball4':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-4.png'));
                        break;
                    case 'ball5':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-5.png'));
                        break;
                    case 'ball6':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-6.png'));
                        break;
                    case 'ball7':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-7.png'));
                        break;
                    case 'ball8':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-8.png'));
                        break;
                    case 'ball9':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-9.png'));
                        break;
                    case 'ball10':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-10.png'));
                        break;
                    case 'ball11':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-11.png'));
                        break;
                    case 'ball12':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-12.png'));
                        break;
                    case 'ball13':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-13.png'));
                        break;
                    case 'ball14':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-14.png'));
                        break;
                    case 'ball15':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-15.png'));
                        break;
                    case 'ball0':
                        this.$set(obj[key], 'imageUrl', require('@/assets/imgs/ball-0.png'));
                        break;
                    default:
                        break;
                }

            });
            console.log('obj foreach', obj);
            console.log('billiards_list', this.billiards_list);
        }

    },


}
</script>

<style scoped>
.app {
    margin-top: 50px;
    background-image: url('@/assets/imgs/ball.jpg');
    /*background-size: 100% 100%; !* 通过百分比设置 *!*/
    width: 1920px; /* 台球桌的宽度 */
    height: 1080px; /* 台球桌的高度 */
    position: relative;
}

/*.hole {*/
/*    background-color: white;*/
/*    border-radius: 50%; !* 圆形球洞 *!*/
/*    width: 50px; !* 球洞的直径 *!*/
/*    height: 50px; !* 球洞的直径 *!*/
/*    position: absolute;*/
/*}*/
/*.top-left {*/
/*    top: 0;*/
/*    left: 0;*/
/*    !*background-color: pink;*!*/
/*    transform: translate(-50%, -50%);*/
/*}*/

/*.top-right {*/
/*    top: 0;*/
/*    right: 0;*/
/*    transform: translate(50%, -50%);*/
/*}*/

/*.bottom-left {*/
/*    bottom: 0;*/
/*    left: 0;*/
/*    transform: translate(-50%, 50%);*/
/*}*/

/*.bottom-right {*/
/*    bottom: 0;*/
/*    right: 0;*/
/*    transform: translate(50%, 50%);*/
/*}*/

/*.middle-top {*/
/*    top: 0%;*/
/*    left: 50%;*/
/*    transform: translate(-50%, -50%);*/
/*}*/

/*.middle-bottom {*/
/*    bottom: 0%;*/
/*    right: 50%;*/
/*    transform: translate(50%, 50%);*/
/*}*/

.app .billiards {
    width: 31px;
    height: 31px;
}
</style>
