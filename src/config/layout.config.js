module.exports = {

    layout: "verticalTags",
    layouts: [
        {
            value: "general",
            label: "常规",
        },
        {
            value: "comprehensive",
            label: "综合",
        },
        {
            value: "vertical",
            label: "纵向",
        },
        {
            value: "verticalTags",
            label: "纵向 tags",
        },
        {
            value: "horizontal",
            label: "横向",
        }
    ],
    isCollapse: false, // 	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    setupIcon: false,
    avatarDropdown: {
        commandFullPaths: {
            personal: "/personal",
            changePassword: "/personal/changePassword",
            login: "/login",
            loginOut: "/login",
        },
        items: [
            // {login: true, command: "personal", icon: "el-icon-s-custom", label: "个人信息", divided: false},
            {login: true, command: "changePassword", icon: "el-icon-s-custom", label: "修改密码", divided: true},
            {login: false, command: "login", icon: "el-icon-user", label: "账号登录", divided: true},
            {login: true, command: "loginOut", icon: "el-icon-switch-button", label: "退出账号", divided: true},
        ]
    }
}
