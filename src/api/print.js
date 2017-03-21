let Vue = require('vue')
let VueResource = require('vue-resource')
Vue.use(VueResource)

export default class PrintAPI {
    static serverHost = 'https://www.jzmsoft.com:8082/yunzhubao'

    static version = 'v1'

    static namespace = 'print'

    static getTemplateList() {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/getTemplateList', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            }
        }).then(res => res.json());
    }

    static getPrintShopData(type) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintShopData', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: {
                type
            }
        }).then(res => res.json());
    }

    static createTemplate(templateData) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/createTemplate', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: templateData
        }).then(res => res.json());
    }

    static updateTemplate(templateData) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/updateTemplate', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: templateData
        }).then(res => res.json());
    }

    static setDefaultTemplate(templateId) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/setDefaultTemplate', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: {
                templateId
            }
        }).then(res => res.json());
    }

    static previewTemplate(templateId) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/previewTemplate', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: {
                templateId
            }
        }).then(res => res.json());
    }

    static deleteTemplate(templateId) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/delTemplate', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: {
                templateId
            }
        }).then(res => res.json());
    }

    static getPrintMenuData(type) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintMenuData', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: {
                type
            }
        }).then(res => res.json());
    }

    static getPrintQualityData(filter) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintQualityData', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: filter
        }).then(res => res.json());
    }

    static getPrintLabelData(filter) {
        return Vue.http.post(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintLabelData', {
            unit: {
                companyId: "396c6aeee0f34523a9454cec7bcebfff",
                channel: 3,
                os: "",
                ip: "",
                userId: "e2a11336cc81471883ef2d652829c729",
                tokenId: "e2a11336cc81471883ef2d652829c729"
            },
            data: filter
        }).then(res => res.json());
    }
}