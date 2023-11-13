
export function requestInterceptors(config) {

    const method = config.method
    const params = config.params
    const data = config.data;
    let url = config.url

    switch (method) {
        case "get-id":
            config.method = "get";
            url = `${url}/${params.id}/`;
            config.params = {};
            break
        case "get-read":
            config.method = "get";
            url = url.replace(/\/$/, "_readonly/");
            break
        case "get-read-id":
            config.method = "get";
            url = url.replace(/\/$/, "_readonly/");
            url = `${url}/${params.id}/`;
            config.params = {};
            break
        case "patch":
            url = `${url}/${data.id}/`;
            delete data["id"];
            break
        case "put":
            url = `${url}/${data.id}/`;
            delete data["id"];
            break
        case "delete":
            config.method = "delete";
            url = `${url}/${data.id}/`;
            config.data = {};
            break;
    }

    url = url.replaceAll("//", "/");

    if ( url === '/account/login_user/' ) delete config.headers["Authorization"]

    config.url = url
}

