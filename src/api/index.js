const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    if (value.default) {
        for (let key in value.default) {
            modules[key] = value.default[key]
        }
    }
    // modules[moduleName] = value.default;
    return modules
}, {});

export default modules
