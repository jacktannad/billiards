import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import CN_locale from "element-ui/lib/locale/lang/zh-CN"

export default {
    install(app){
        app.use(ElementUI, {locale: CN_locale});
    }
}