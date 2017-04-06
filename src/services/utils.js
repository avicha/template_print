import 'whatwg-fetch'
export const getWidth = (dom) => {
    return window.parseInt(getComputedStyle(dom).width)
}

export const getInnerWidth = (dom) => {
    return window.parseInt(getComputedStyle(dom).width) + window.parseInt(getComputedStyle(dom).paddingLeft) + window.parseInt(getComputedStyle(dom).paddingRight)
}

export const getOuterWidth = (dom) => {
    return window.parseInt(getComputedStyle(dom).width) + window.parseInt(getComputedStyle(dom).paddingLeft) + window.parseInt(getComputedStyle(dom).paddingRight) + window.parseInt(getComputedStyle(dom).borderLeftWidth) + window.parseInt(getComputedStyle(dom).borderRightWidth)
}

export const getHeight = (dom) => {
    return window.parseInt(getComputedStyle(dom).height)
}

export const getInnerHeight = (dom) => {
    return window.parseInt(getComputedStyle(dom).height) + window.parseInt(getComputedStyle(dom).paddingTop) + window.parseInt(getComputedStyle(dom).paddingBottom)
}

export const getOuterHeight = (dom) => {
    return window.parseInt(getComputedStyle(dom).height) + window.parseInt(getComputedStyle(dom).paddingTop) + window.parseInt(getComputedStyle(dom).paddingBottom) + window.parseInt(getComputedStyle(dom).borderTopWidth) + window.parseInt(getComputedStyle(dom).borderBottomWidth)
}
export const getComponentBound = (component, container) => {
    let left = component.left,
        top = component.top,
        right = 0,
        bottom = 0,
        width = component.width,
        height = component.height,
        rotateDeg = (container ? container.rotateDeg : 0) + component.rotateDeg
    if (rotateDeg == 90 || rotateDeg == 270) {
        width = component.height
        height = component.width
    }
    right = left + width
    bottom = top + height
    return {
        left,
        top,
        right,
        bottom,
        width,
        height,
    }
}
export const getComponentTranslate = (component) => {
    let translate = ''
    switch (component.rotateDeg) {
        case 90:
            translate = 'translateY(-' + component.height + 'mm)'
            break;
        case 180:
            translate = 'translate(-' + component.width + 'mm, -' + component.height + 'mm)'
            break;
        case 270:
            translate = 'translateX(-' + component.width + 'mm)'
            break;
    }
    return translate
}
export const isInteractWithComponent = (componentA, componentB) => {
    let a = getComponentBound(componentA)
    let b = getComponentBound(componentB)
    return (a.left < b.right) && (a.right > b.left) && (a.top < b.bottom) && (a.bottom > b.top)
}
let ppi = 0
export const getPPI = () => {
    if (!ppi) {
        let dom = document.createElement('div')
        dom.style.width = '1in'
        dom.style.height = '1in'
        dom.style.display = 'none'
        document.body.appendChild(dom)
        ppi = getWidth(dom)
        return ppi
    }
    return ppi
}
export const getAppSign = (callback) => {
    let serverHost = process.env.NODE_ENV == 'development' ? '/yunzhubao' : 'https://www.jzmsoft.com:8082/yunzhubao'
    let version = 'v1'
    let namespace = 'apply'
    return fetch(serverHost + '/' + version + '/' + namespace + '/getCOSSign', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
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
    }).then(res => res.json()).then(res => {
        if (res.state != 200) {
            callback(res.msg)
        } else {
            callback(null, res.data.signStr)
        }
    });
}
export const uploadFile = (file, sign, insertOnly = 0) => {
    let region = 'gz'
    let appid = '1252389350'
    let bucket_name = 'jzm'
    let dir_name = '%2FprintTemplate'
    let url = '//' + region + '.file.myqcloud.com/files/v2/' + appid + '/' + bucket_name + '/' + dir_name + '?sign=' + sign
    let formData = new FormData()
    formData.append('op', 'upload')
    formData.append('fileContent', file)
    formData.append('insertOnly', insertOnly)
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(res => res.json()).then(json => {
        console.log(json)
    })
}
export const readImageAsDataURL = (file, callback) => {
    if (!window.FileReader && !(window.URL && window.URL.createObjectURL)) {
        callback("抱歉，你的浏览器不支持FileReader和URL.createObjectURL");
    } else {
        if (window.FileReader) {
            let reader = new window.FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                let src = reader.result
                let img = new Image()
                img.onload = () => {
                    callback(null, src, {
                        width: img.width,
                        height: img.height
                    })
                }
                img.src = src
            }
        } else {
            let url = URL.createObjectURL(file)
            let image = new Image()
            image.onload = () => {
                let canvas = document.createElement('canvas')
                canvas.width = image.width
                canvas.height = image.height
                let ctx = canvas.getContext('2d')
                ctx.drawImage(image, 0, 0, image.width, image.height)
                let ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase()
                let dataURL = canvas.toDataURL('image/' + ext)
                callback(null, dataURL, {
                    width: image.width,
                    height: image.height
                })
            }
            image.src = url
        }
    }
}
export const createImageByTemplateCanvas = (canvas) => {
    let ppi = 96
    let canvasDom = document.createElement('canvas')
    let canvasW = canvas.width / 25.4 * ppi
    let canvasH = canvas.height / 25.4 * ppi
    canvasDom.width = canvasW
    canvasDom.height = canvasH
    let ctx = canvasDom.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvasW, canvasH)
    if (canvas.backgroundImage) {
        let image = new Image()
        image.src = canvas.backgroundImage
        ctx.drawImage(image, 0, 0, canvasW, canvasH)
    }
    let items = []
    canvas.components.forEach(component => {
        if (component.type == 'ContainerComponent') {
            items = items.concat(component.data.children)
        } else {
            items.push(component)
        }
    })
    items.forEach(component => {
        let left = component.data.left / 25.4 * ppi
        let top = component.data.top / 25.4 * ppi
        let width = component.data.width / 25.4 * ppi
        let height = component.data.height / 25.4 * ppi
        let rotateDeg = (component.data.rotateDeg + 360) % 360
        let offsetLeft = 0,
            offsetTop = 0
        switch (rotateDeg) {
            case 90:
                offsetLeft = left + height
                offsetTop = top
                break;
            case 180:
                offsetLeft = left + width
                offsetTop = top + height
                break;
            case 270:
                offsetLeft = left
                offsetTop = top + width
                break;
            default:
                offsetLeft = left
                offsetTop = top
        }
        ctx.save()
        ctx.translate(offsetLeft, offsetTop)
        ctx.rotate(Math.PI * rotateDeg / 180)
        let fontStyle, fontWeight, fontSize, fontFamily, image
        switch (component.type) {
            case 'TextComponent':
                fontStyle = component.data.isItalic ? 'italic' : 'normal'
                fontWeight = component.data.isBold ? 'bold' : 'normal'
                fontSize = component.data.fontSize + 'px'
                fontFamily = component.data.fontFamily
                ctx.textAlign = 'left'
                ctx.font = [fontStyle, fontWeight, fontSize, fontFamily].join(' ')
                ctx.fillStyle = component.data.color
                ctx.fillText(component.data.content, 5, height - 5)
                break
            case 'ImageComponent':
                image = new Image()
                image.src = component.data.src || '/static/images/image-sample.png'
                ctx.drawImage(image, 0, 0, width, height)
                break
            case 'PropertyComponent':
                if (component.data.propertyType == 4) {
                    image = new Image()
                    image.src = '/static/images/barcode-sample.png'
                    ctx.drawImage(image, 0, 0, width, height)
                } else {
                    fontStyle = component.data.valueStyle.isItalic ? 'italic' : 'normal'
                    fontWeight = component.data.valueStyle.isBold ? 'bold' : 'normal'
                    fontSize = component.data.valueStyle.fontSize + 'px'
                    fontFamily = component.data.valueStyle.fontFamily
                    ctx.textAlign = 'left'
                    ctx.font = [fontStyle, fontWeight, fontSize, fontFamily].join(' ')
                    ctx.fillStyle = component.data.valueStyle.color
                    ctx.fillText(component.data.prefix + (component.data.sample || '#{' + component.data.propertyCode + '}') + component.data.suffix, 5, height - 5)
                }
                break
        }
        ctx.translate(-offsetLeft, -offsetTop)
        ctx.restore()
    })
    let dataURL = canvasDom.toDataURL('image/png')
    return dataURL
}