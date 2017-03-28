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
                image.src = component.data.src || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABECAYAAADwf3lkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjczOENDQTVGNUM3MTFFNjhCNzY4NTAxQTY2MzYwOTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjczOENDQTZGNUM3MTFFNjhCNzY4NTAxQTY2MzYwOTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NzM4Q0NBM0Y1QzcxMUU2OEI3Njg1MDFBNjYzNjA5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NzM4Q0NBNEY1QzcxMUU2OEI3Njg1MDFBNjYzNjA5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsCeEN8AAAOtSURBVHja7NxLSBVRGAfwuSfRLIuIzOJGSEpR1+i1yHYRVK6sRVNCbXosok0hFEaLIggLgmyd0KJNMUX0gCApWkgQ7krTMsGSnps2UhiV/b+cK9P1zHUeZ87M3L4P/p3bnbkc/Dlz5swZNWM4yjTNRWiOIjuQOqTc4HKrMeQVchu5bFnW1/yGjAO0Bc0VpIq9fBeBtgD24SQqQPeguc42oeoXsh2wjzL2KT/IR6iS+ozUC3sMZVA1VYMcKsM/O1126EE+sJNrrUOWSt5vJtRlkg29SCPGh99sJy8Mm3R2DyELCzYtFy7TpiEGLV7wGUXTL9lUJZhHfTEqo6ajyhQM2PPpiodsQrLIN2QE6UIeY+z5wajeMWeiOYW0IrMku9D7w9ivDbA3GHV60Go0D5AN0+xaS7e/2H8z2iPAHecxVQ5KU7B7HkCddRg5xxcq9zqGbAzwuTZ8Q9Yw6tSjtBLNyYB90YrYGUadWluReSH6a8I3Zjaj/luNIfujGcNqTffm1cjBNKAuVtBnjQ5QmiMjnTSlSzqqion8mCbQBvutdt2wflFHFPT5ViOoEQesX9SukP29ww1Av2ZQ7bB+UelpQF+I/jpjAtUK6wvVXrg+HrCv98ilGEG1wfq+owIs3fNf9Pmx78hue7U8TlAtsEHXU08gpxEvj1w+IdsA+jQhoJHDBkKl1SbkLF6uRW65TJM+2osoK7Bvd8JAI4UNtUgNrBdodtlPFgk4a5/qw0hvFA8PFYI6YelrOZ8IVAcujZXdRsQVAWgksKl5RoUveklEoMqHApEi0CcRgiqFFSkCrdPUZWhYoQmmPCWgSmCFBlBaPx1EuyUloKFhhQZQurjQT8fd9wqbANBQsEID6AL7rUovsAkCdcK2xo4qATW8wCYQNF/NsaIWAS0Km2DQeMdUD6BS2FICVYrqA7QQdl8pgSq79w8A6oS9ZpRYiRhBS7ZESNCVDKoQFaD1xsTTVQZVgWqD0sUly4QKUBlUMSqDRnOkXmBQ9agzmCyGe38uRmVURmVULkZNePld+nv2nzr1R4ZqWVY7H4d8+jMqo3JRZWSmhCr7hbMG0zQr2My94DMHzSrJpgq6UNGfpMsVbKAnmwP44HO040woPcPXG/KnHm8I9a4ElarWDpe/ukPiHcgoWygpcuwQmHt+wYsD7KGk9pPn30Xnl6hcLjeAl00G/3XfoEfoXoDepP9MruTDtQ+wV/Hypz0AzzV4pb9Y0azptTHx+7YE2pPf8EeAAQBWxi4IRgzQgQAAAABJRU5ErkJggg=='
                ctx.drawImage(image, 0, 0, width, height)
                break
            case 'PropertyComponent':
                if (component.data.propertyType == 4) {
                    image = new Image()
                    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAYAAAB5LPGYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUE0NTUzRkFGNUM1MTFFNjhCNzY4NTAxQTY2MzYwOTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjczOENDQTJGNUM3MTFFNjhCNzY4NTAxQTY2MzYwOTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QTQ1NTNGOEY1QzUxMUU2OEI3Njg1MDFBNjYzNjA5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QTQ1NTNGOUY1QzUxMUU2OEI3Njg1MDFBNjYzNjA5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmO+g8MAAAMxSURBVHja7JxPSBRRHMffqlvpodaD3QIjrGNJIFRQW3QoAluxKeiU0EFIqlNeg6CSOhRBkBejTvHEzISgS0ZR0cHqbmTnCg0rwoPT99kbevsY3dldZ+3NfL/w5ff+zc57M59582+ZjOd5vvinD1LKHUEGdTcQzoli3USb80abCYR9KMsgnUN6Bn6EfAH5U0gPWcsvrgN1eaSfGeXtKH+vf7MV4ZNR14W60WBdIlyb0WbaLsQybQgD8GF4nXBDv+DHcD/G9DlkTPb2MfUcy+TRpoD0w7Dtgzq1j98ZdftRN4Fytf23W7/Xg7q7qBtF+ijcjPys5mZxXWXyUrSOOpFgYbBbEd4qgB2CT6kJPqH6jjFsSvI+SjSA0HU453D/N8KXk7yDGhI8+6mD65BRNA5LRw66HnivTh8hgG5qPZw18kO4Fhlx5ODJGAA28xScDC041Fc/LTulQaRcmG3qEXbD6s5yFn6h7vIERQBrAN9BhEH1iMIo/o3yq4iXAOICESGAccGXR3gSsg3U45qLcAvcR0R4DRjXHfJgiQPwDNrtJCIEMA61w20R2h2vEvQcESOAYdoSsV1rFfAdQJhG7CRmBNDWTMR236qATz343gAPE0ICaOs1/DNCu6dVwNeoi7KEkAAWSUr5Q5R+x/oKHisTvk4LPkEICeBSugLfWqLuDVwo5zmghms4BD5CSABDZ0EfPouketRyTcNzB+6G96DuSwXwZUs0JYSWUv8qDqBNIkxWcbcbFT4bwmNY91jat38dj8HKVQF8nAkJYCSwMvptSRzwEUICuDx8CLfh+/qfMnHARwgJ4LLw9cIn4Xs2hCsInw3hLgJI+AL4AhVBGAN8JoTbCCDh6w2pDiDsigm+KP1bSwDTCZ8J4chqwKfVSADTCx9FAAkfASR8FAFcOQYJHwFcTTVx1xNAiiKAFAGkUqy0/h/wpfj7Bar/rU8EMA2SUk4hTHH+4Sm4lqrnfuEMWEt9h+fhNTrf53me+mag7wB8p438vB4LAXTsNOsDOPWh725dlNd2TeNqLDwFu6l++KvD/Vd9v8BrQHdnwY8IHfADeM6hrs/pPnfoMSRWfwQYAN1ZBaIXgkXPAAAAAElFTkSuQmCC'
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