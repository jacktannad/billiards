<template>
  <div class="avatar">
    <el-dropdown trigger="click" @command="handleAvatarCommand"
                 @visible-change="changeAvatarCommandVisibleChange">
      <div class="avatar-con">
        <el-avatar :src="avatar || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"></el-avatar>
        <div class="nick-name">{{ nickName || '未登录' }}</div>
        <i :class="avatar_command_visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
      </div>
      <el-dropdown-menu>
        <el-dropdown-item :command="item.command" :icon="item.icon" :divided="item.divided"
                          v-for="(item,index) in user_avatar_dropdown" :key="index">{{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {defineComponent} from "vue"
import {avatarDropdown} from "@/config/layout.config";
import {loginPath} from "@/config/router.config";
import {mapGetters} from "vuex";

export default defineComponent({
  name: "LibAvatar",
  data() {
    return {
      avatar_command_visible: false,
    }
  },
  computed: {
    ...mapGetters(["nickName", "avatar",'token']),
    user_avatar_dropdown: function () {
      const login = !!this.token
      return avatarDropdown.items.filter(item => item.login === login)
    }
  },
  methods: {
    handleAvatarCommand(command) {
      if (!avatarDropdown.commandFullPaths[command]) return this.$message.info(`${command}没有配置commandFullPaths`);
      if (avatarDropdown.commandFullPaths[command] === loginPath) this.$store.dispatch("loginOut")
      this.$router.push(avatarDropdown.commandFullPaths[command])
    },
    changeAvatarCommandVisibleChange(visible) {
      this.avatar_command_visible = visible
    },
  }
})
</script>

<style scoped lang="scss">
.avatar {
  height: calc($headerHeight - $headerBorderBottomHeight);
  padding-right: 15px;
  user-select: none;

  .avatar-con {
    height: calc($headerHeight - $headerBorderBottomHeight);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .nick-name{

      color: #FFFFFF;
      margin-left: 4px;
      margin-right: 4px;
    }
    i:before{
      color: #FFFFFF;
      font-size: 18px;
    }
  }
}
</style>
