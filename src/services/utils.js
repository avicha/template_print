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