import 'whatwg-fetch'

export default class PrintAPI {
    static serverHost = 'https://www.jzmsoft.com:8082/yunzhubao'

    static version = 'v1'

    static namespace = 'print'

    static getTemplateList() {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/getTemplateList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unit: {
                    companyId: "396c6aeee0f34523a9454cec7bcebfff",
                    channel: 3,
                    os: "",
                    ip: "",
                    userId: "e2a11336cc81471883ef2d652829c729",
                    tokenId: "e2a11336cc81471883ef2d652829c729"
                }
            })
        }).then(res => res.json());
    }

    static getPrintShopData(type) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintShopData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        }).then(res => res.json());
    }

    static createTemplate(templateData) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/createTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unit: {
                    companyId: "396c6aeee0f34523a9454cec7bcebfff",
                    channel: 3,
                    os: "",
                    ip: "",
                    userId: "e2a11336cc81471883ef2d652829c729",
                    tokenId: "e2a11336cc81471883ef2d652829c729"
                },
                data: templateData
            })
        }).then(res => res.json());
    }

    static updateTemplate(templateData) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/updateTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unit: {
                    companyId: "396c6aeee0f34523a9454cec7bcebfff",
                    channel: 3,
                    os: "",
                    ip: "",
                    userId: "e2a11336cc81471883ef2d652829c729",
                    tokenId: "e2a11336cc81471883ef2d652829c729"
                },
                data: templateData
            })
        }).then(res => res.json());
    }

    static setDefaultTemplate(templateId) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/setDefaultTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        }).then(res => res.json());
    }

    static previewTemplate(templateId) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/previewTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        }).then(res => res.json());
    }

    static deleteTemplate(templateId) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/delTemplate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        }).then(res => res.json());
    }

    static getPrintMenuData(type) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintMenuData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
            })
        }).then(res => res.json());
    }

    static getPrintQualityData(filter) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintQualityData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unit: {
                    companyId: "396c6aeee0f34523a9454cec7bcebfff",
                    channel: 3,
                    os: "",
                    ip: "",
                    userId: "e2a11336cc81471883ef2d652829c729",
                    tokenId: "e2a11336cc81471883ef2d652829c729"
                },
                data: filter
            })
        }).then(res => res.json());
    }

    static getPrintLabelData(filter) {
        return fetch(this.serverHost + '/' + this.version + '/' + this.namespace + '/getPrintLabelData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                unit: {
                    companyId: "396c6aeee0f34523a9454cec7bcebfff",
                    channel: 3,
                    os: "",
                    ip: "",
                    userId: "e2a11336cc81471883ef2d652829c729",
                    tokenId: "e2a11336cc81471883ef2d652829c729"
                },
                data: filter
            })
        }).then(res => res.json());
    }
}