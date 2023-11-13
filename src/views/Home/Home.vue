<template>
    <div class="app">
        <div class="hole top-left"></div>
        <div class="hole top-right"></div>
        <div class="hole bottom-left"></div>
        <div class="hole bottom-right"></div>
        <div class="hole middle-top"></div>
        <div class="hole middle-bottom"></div>
        <div class="billiards"
             v-for="item in billiards_list" :key="item.x"
             :style="`position: absolute; bottom:${item.y}px;left: ${item.x}px;background-color: ${item.color}; `"
        >
            <div class="billiards_children" style="background-color: white;">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeHome",
    data() {
        return {
            billiards_list:
                [
                    {"x": 200.5, "y": 300.7, "color": "Yellow"},
                    {"x": 1200.3, "y": 450.1, "color": "Blue"},
                    {"x": 800.8, "y": 600.5, "color": "Red"},
                    {"x": 500.9, "y": 250.4, "color": "Purple"},
                    {"x": 1100.2, "y": 150.6, "color": "Orange"},
                    {"x": 300.7, "y": 500.2, "color": "Green"},
                    {"x": 700.3, "y": 350.8, "color": "Maroon"},
                    {"x": 1300.4, "y": 650.9, "color": "Black"},
                ]

        }
    }
}
</script>

<style scoped>
.app {
    margin: auto;
    margin-top: 60px;
    background-color: pink;
    width: 1500px; /* 台球桌的宽度 */
    height: 750px; /* 台球桌的高度 */
    position: relative;
}

.hole {
    background-color: white;
    border-radius: 50%; /* 圆形球洞 */
    width: 50px; /* 球洞的直径 */
    height: 50px; /* 球洞的直径 */
    position: absolute;
}

.top-left {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
}

.top-right {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
}

.bottom-left {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
}

.bottom-right {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
}

.middle-top {
    top: 0%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.middle-bottom {
    bottom: 0%;
    right: 50%;
    transform: translate(50%, 50%);
}

.app .billiards {
    width: 31px;
    height: 31px;

    .billiards_children {
        width: 21px;
        height: 21px;
        margin: auto;
        margin-top: 5px;

    }
}
</style>
