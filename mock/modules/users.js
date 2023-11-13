import Mock from "mockjs"

const users = [];
const usersConfig = {
    admin: "123456",
    user: "123456",
}

function ColorReverse(OldColorValue) {
    const old_color_value = "0x" + OldColorValue.replace(/#/g, "");
    const str = "000000" + (0xFFFFFF - old_color_value).toString(16);
    return "#" + str.substring(str.length - 6, str.length);
}

function getQueryString(str) {
    if ("string" != typeof str) return str
    if (str.indexOf("&") < 0 && str.indexOf("=") < 0) return {}
    let newStr = str.split("&"), newOjb = {}
    newStr.forEach(value => {
        if (value.indexOf("=") > -1) {
            let newStr1 = value.split("=")
            newOjb[newStr1[0]] = newStr1[1]
        }
    })
    return newOjb;
}

function initUsers(num = 2) {

    const usersDataConfig = {
        1: {
            id: 1,
            username: "admin",
            password: "123456",
            nickName: "admin",
            isSuper: true,
            permission: ["home", "homeIndex", "personal", "personalIndex", "about", "aboutIndex", "home-active-1", "home-active-2"]
        },
        2: {
            id: 2,
            username: "user",
            password: "123456",
            nickName: "user",
            isSuper: false,
            permission: ["personal", "personalIndex", "about", "aboutIndex"]
        },
    }


    for (let i = 1; i <= num; i++) {

        const color = Mock.Random.color();

        const user = Mock.mock({
            id: usersDataConfig[i].id,//随机id

            username: usersDataConfig[i].username,
            password: usersDataConfig[i].password,

            nickName: usersDataConfig[i].nickName,
            isSuper: usersDataConfig[i].isSuper,
            phone: /^1[34578]\d{9}$/,//随机电话号码
            'age|11-99': 1,//年龄
            address: '@county(true)',//随机地址
            email: '@email',//随机邮箱
            isMale: '@boolean',//随机性别
            createTime: '@datetime',//创建时间
            avatar() {
                //用户头像
                return Mock.Random.image('100', color, ColorReverse(color), 'png', usersDataConfig[i].nickName)
            },
            roles: {
                permission: usersDataConfig[i].permission
            }
        })

        users.push(user)
    }
}

function request(code = 0, msg = "请求成功", data = {}) {
    return {
        code,
        msg: code === 0 && !msg ? '请求成功' : msg || '请求失败',
        data
    }
}

const filterLoginUser = (username = "", password = "") => {
    const filter = users.filter(user => user.username === username && user.password === password);
    if (!filter.length) return false;
    return filter[0];
}

const getUserById = (config) => {

    if (config.url.indexOf("?") < 0) return request(400010, "缺失id参数");

    const id = getQueryString(config.url.split('?')[1]).id;

    if (!id) return request(400010, "缺失id参数");

    const filter = users.filter(value => Number(id) === value.id);
    if (!filter.length) return request(400011, `未找到id：${id}用户`);

    return request(0, "", filter[0])
}

const usersLogin = (config = {}) => {

    if (!config.body) return request(0, "没有输入账号");

    const form = JSON.parse(config.body);

    if (!form.username && !form.password) return request(40001, "username,password不能为空");
    if (!form.username) return request(40002, "username不能为空");
    if (!form.password) return request(40003, "password不能为空");


    if (!usersConfig[form.username]) return request(40004, `${form.username}用户未注册`);
    if (usersConfig[form.username] !== form.password) return request(40004, `${form.username}密码错误`);

    const login_data = Mock.mock({
        token: Mock.Random.word(20),
        user: filterLoginUser(form.username, form.password)
    })

    return request(0, "", login_data);
}


export default () => {

    initUsers();

    Mock.mock('/users/login/', "post", usersLogin);
    Mock.mock(/\/users\/getUserById/, "get", getUserById);
}
