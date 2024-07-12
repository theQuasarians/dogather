/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.js ***!
  \********************************************/
console.log("Loaded new content")
const capture = async () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ captureScreen: true }, function (response) {
            resolve()
        })
    })
}

var HEX, RGB;

(async function () {
    function findPos(obj) {
        var curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft
                curtop += obj.offsetTop
            } while (obj = obj.offsetParent)
            return { x: curleft, y: curtop }
        }
        return undefined;
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component"
        return ((r << 16) | (g << 8) | b).toString(16)
    }

    function handleMouseMove(event) {
        var eventDoc, doc, body

        event = event || window.event

        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document
            doc = eventDoc.documentElement
            body = eventDoc.body

            event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0)
            event.pageY = event.clientY +
                (doc && doc.scrollTop || body && body.scrollTop || 0) -
                (doc && doc.clientTop || body && body.clientTop || 0)
        }

        $("#mydiv").css({ left: event.pageX, top: event.pageY })
    }

    function removeDivIfAny() {
        let mc = document.getElementById("mycanvas")
        mc && mc.parentNode.removeChild(mc)

        let md = document.getElementById("mydiv")
        md && md.parentNode.removeChild(md)
    }

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            document.body.style.cursor = "auto"

            let mc = document.getElementById("mycanvas")
            mc && mc.parentNode.removeChild(mc)

            let md = document.getElementById("mydiv")
            md && md.parentNode.removeChild(md)
        }
    })

    chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
        if (request.message == "remove") {
            console.log("Yes removed")
            removeDivIfAny()
        } else if (request.message == "init") {
            function crosshairCss() {
                return 'url(' + chrome.runtime.getURL('plus.png') + ') 16 16,crosshair';
            }

            document.body.style.cursor = crosshairCss()

            // CREATE DIV
            let mydiv = document.createElement("div")
            mydiv.setAttribute("id", "mydiv")

            // CREATE DIV HEAD WITH CLOSE BUTTON
            let divHead = document.createElement("div")
            divHead.setAttribute("id", "divhead")

            let close = document.createElement("button")
            close.setAttribute("id", "mybtn")
            close.innerText = "X"

            close.onclick = function () {
                let md = document.getElementById("mydiv")
                md && md.parentNode.removeChild(md)
            }

            divHead.appendChild(close)
            mydiv.appendChild(divHead)


            // CREATE DIV FOOTER 
            let divfoot = document.createElement("div")
            divfoot.setAttribute("id", "divfoot")
            mydiv.appendChild(divfoot)

            /* CREATE INPUT WRAPPERS */
            let hexWrapper = document.createElement("div")
            hexWrapper.setAttribute("id", "hexWrapper")

            let hexinput = document.createElement("input")
            hexinput.setAttribute("id", "hexinput")

            let hexCopyWrapper = document.createElement("div")
            hexCopyWrapper.setAttribute("id", "hexCopyWrapper")
            hexCopyWrapper.onclick = () => {
                var copyText = document.getElementById("hexinput");

                copyText.select();
                copyText.setSelectionRange(0, 99999);

                navigator.clipboard.writeText(copyText.value);


            }

            let hexCopyImage = document.createElement("img")
            hexCopyImage.setAttribute("id", "hexCopyImage")
            hexCopyImage.src = chrome.runtime.getURL('copy.png')

            hexCopyWrapper.appendChild(hexCopyImage)

            hexWrapper.appendChild(hexinput)
            hexWrapper.appendChild(hexCopyWrapper)

            // RGB
            let rgbWrapper = document.createElement("div")
            rgbWrapper.setAttribute("id", "rgbWrapper")

            let rgbinput = document.createElement("input")
            rgbinput.setAttribute("id", "rgbinput")

            let rgbCopyWrapper = document.createElement("div")
            rgbCopyWrapper.setAttribute("id", "rgbCopyWrapper")
            rgbCopyWrapper.onclick = () => {
                var copyText = document.getElementById("rgbinput");

                copyText.select();
                copyText.setSelectionRange(0, 99999);

                navigator.clipboard.writeText(copyText.value);
            }

            let rgbCopyImage = document.createElement("img")
            rgbCopyImage.setAttribute("id", "rgbCopyImage")
            rgbCopyImage.src = chrome.runtime.getURL('copy.png')

            rgbCopyWrapper.appendChild(rgbCopyImage)

            rgbWrapper.appendChild(rgbinput)
            rgbWrapper.appendChild(rgbCopyWrapper)

            divfoot.appendChild(hexWrapper)
            divfoot.appendChild(rgbWrapper)

            // INNER CANVAS
            const options = {
                cols: 40,
                rows: 40,
                width: 200,
                height: 200
            }

            window.addEventListener("scroll", function () {
                document.body.style.cursor = "auto"

                let mc = document.getElementById("mycanvas")
                mc && mc.parentNode.removeChild(mc)

                let md = document.getElementById("mydiv")
                md && md.parentNode.removeChild(md)
            })

            let innerCanvas = createCanvasGrid(options)
            innerCanvas.setAttribute("id", "innerCanvas")

            innerCanvas.width = 200
            innerCanvas.height = 200


            let iCtx = innerCanvas.getContext("2d")

            mydiv.appendChild(innerCanvas)

            document.body.addEventListener("click", function () {
                let mc = document.getElementById("mycanvas")
                mc && mc.parentNode.removeChild(mc)

                mydiv && mydiv.childElementCount > 2 && mydiv.removeChild(innerCanvas)
                mydiv.style.height = "100px"
                divHead.style.display = "flex"
                divfoot.style.display = "flex"

                hexinput.value = HEX
                rgbinput.value = RGB

                document.body.style.cursor = "auto"

                chrome.storage.sync.get("colors", ({ colors }) => {
                    //changeColor.style.backgroundColor = color; 

                    let newcolor = colors ? colors : []


                    if (newcolor && newcolor.length > 7) {
                        newcolor.splice(0, 1);
                    }

                    if (!newcolor.includes(HEX)) {
                        newcolor.push(HEX)
                    }

                    chrome.storage.sync.set({ colors: newcolor });

                });
                // document.body.removeEventListener("mousemove", handleMouseMove)
                $(document).unbind('mousemove');
            })

            let mycanvas = document.createElement("canvas")
            mycanvas.setAttribute("id", "mycanvas")

            mycanvas.width = window.innerWidth
            mycanvas.height = window.innerHeight

            let ctx = mycanvas.getContext("2d")
            let image = new Image()

            image.onload = function () {
                ctx.drawImage(image, 0, 0, mycanvas.width, mycanvas.height);

                // ctx.drawImage(image, 0, 0)
            }

            image.src = request.screenshot

            // let fromTop = document.documentElement.scrollTop
            // mycanvas.style.top = `${fromTop}px`

            document.body.appendChild(mycanvas)
            document.body.appendChild(mydiv)

            let wInWidth = window.innerWidth
            let wInHeight = window.innerHeight

            $(document).on('mousemove', function (e) {
                let mouseX = e.clientX
                let mouseY = e.clientY

                if (mouseX > (wInWidth - 220)) {
                } else if (mouseY > (wInHeight - 220)) {
                } else {
                    $('#mydiv').css({
                        left: e.clientX,
                        top: e.clientY
                    })
                }
            });
            // $('body').mousemove(function(e) {
            //     var pos = findPos(this)

            //     var x = e.pageX - pos.x
            //     var y = e.pageY - pos.y

            //     $('#mydiv').css({ left: e.pageX, top: e.pageY })
            // })

            function getXY(evt, element) {
                var rect = element.getBoundingClientRect();
                var scrollTop = document.documentElement.scrollTop ?
                    document.documentElement.scrollTop : document.body.scrollTop;
                var scrollLeft = document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft : document.body.scrollLeft;
                var elementLeft = rect.left + scrollLeft;
                var elementTop = rect.top + scrollTop;

                x = evt.pageX - elementLeft;
                y = evt.pageY - elementTop;


                return { x: x, y: y }
            }


            $('#mycanvas').mousemove(async function (e) {
                var pos = findPos(this)


                // var x = e.pageX - pos.x
                // var y = e.pageY - pos.y
                // var x = e.pageX 
                // var y = e.pageY 

                var { x, y } = getXY(e, this);

                // var parentOffset = $(this).parent().offset();
                // var x = (e.pageX - parentOffset.left); 
                // var y = (e.pageY - parentOffset.top);

                var c = this.getContext('2d');
                var p = c.getImageData(x, y, 1, 1).data;

                RGB = `rgb(${p[0]},${p[1]},${p[2]})`
                HEX = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

                mydiv.style.backgroundColor = HEX

                zoomIn(iCtx, x, y, c)
                // console.log(innerCanvas.toDataURL())





            })
        }
    })

    const zoomIn = (iCtx, x, y, c) => {
        let innerImageData = c.getImageData(x - 20, y - 20, 40, 40);
        var c = document.createElement("canvas");
        c.width = 40
        c.height = 40
        var newctx = c.getContext("2d");
        newctx.putImageData(innerImageData, 0, 0, 0, 0, 40, 40)
        let newImage = new Image()


        newImage.onload = function () {
            iCtx.drawImage(newImage, 0, 0, 200, 200)
            iCtx.fillRect(innerCanvas.width / 2, innerCanvas.height / 2, 5, 5);

        }

        newImage.src = c.toDataURL()
        // return new Promise((resolve, reject) => {
        //     let canvasWidth = 200, canvasHeight = 200
        //     let imageCropWidth = 40, imageCropHeight = 40


        //     newImage.onload = function () {
        //         iCtx.drawImage(newImage, x + (imageCropWidth/2) , y + (imageCropHeight/2) , imageCropWidth, imageCropHeight, 0, 0, canvasWidth, canvasHeight)
        //         resolve()
        //     }

        //     newImage.src = imageSrc
        // })
    }

    function createCanvasGrid(options) {
        let canvas = document.createElement("CANVAS")
        let ctx = canvas.getContext("2d")

        canvas.width = options.width
        canvas.height = options.height
        canvas.style.border = "1px solid white"

        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        ctx.globalCompositeOperation = 'source-over'

        return canvas


        ctx.translate(0.5, 0.5) // https://stackoverflow.com/a/13294650/1762224

        ctx.beginPath()
        ctx.lineWidth = 1
        ctx.strokeStyle = "black"

        let offsetX = Math.floor(options.width / options.cols);
        let offsetY = Math.floor(options.height / options.rows);

        let centerX = options.width / 2

        for (let x = offsetX; x < options.width; x += offsetX) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, options.height)

            if (x == centerX) {
                ctx.strokeStyle = "black"
            }
        }

        let centerY = options.height / 2

        for (let y = offsetY; y < options.height; y += offsetY) {
            ctx.moveTo(0, y);
            ctx.lineTo(options.width, y)

            if (y == centerY) {
                ctx.strokeStyle = "black"
            }
        }

        ctx.stroke()

        return canvas
    }

    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    }
})()

const removePopup = async () => {



    return new Promise((resolve, reject) => {
        if (document.querySelector(".cp-wrapper")) {
            $(".cp-wrapper").remove();
        }
        resolve()
    })
}

const createModal = () => {
    let modalHtml = `<div class="cp-container">
        <div class="cp-header">
            <img class="cp-image"/>
            <button class="cp-pickup"><img class="cp-pickimage"/> Pick</button>
        </div>
        <div class="cp-body">
        <div id="fixed"></div>
        </div>
    </div>`

    let container = document.createElement("div");
    container.setAttribute("class", "cp-wrapper");

    //close modal on click outside modal
    container.addEventListener("click", () => {
        // removePopup()

    })

    container.innerHTML = modalHtml;

    document.querySelector("body").appendChild(container)

    document.querySelector(".cp-container .cp-image").src = chrome.runtime.getURL('logo.svg');
    document.querySelector(".cp-container .cp-pickimage").src = chrome.runtime.getURL('pickicon.svg');


    // const pickr = Pickr.create({
    //     el: '#fixed',

    //     container: '.cp-body',
    //     theme: 'nano', // or 'monolith', or 'nano'

    //     swatches: [
    //         'rgba(244, 67, 54, 1)',
    //         'rgba(233, 30, 99, 0.95)',
    //         'rgba(156, 39, 176, 0.9)',
    //         'rgba(103, 58, 183, 0.85)',
    //         'rgba(63, 81, 181, 0.8)',
    //         'rgba(33, 150, 243, 0.75)',
    //         'rgba(3, 169, 244, 0.7)',
    //         'rgba(0, 188, 212, 0.7)',
    //         'rgba(0, 150, 136, 0.75)',
    //         'rgba(76, 175, 80, 0.8)',
    //         'rgba(139, 195, 74, 0.85)',
    //         'rgba(205, 220, 57, 0.9)',
    //         'rgba(255, 235, 59, 0.95)',
    //         'rgba(255, 193, 7, 1)'
    //     ],

    //     components: {

    //         // Main components
    //         preview: true,
    //         opacity: true,
    //         hue: true,

    //         // Input / output Options
    //         interaction: {
    //             hex: true,
    //             rgba: true,
    //             hsla: true,
    //             hsva: true,
    //             cmyk: true,
    //             input: true,
    //             clear: true,
    //             save: true
    //         }
    //     }
    // });


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }





    document.querySelector(".cp-header button").addEventListener("click", async () => {
        await removePopup()
        await sleep(100)
        chrome.runtime.sendMessage({ captureScreen: true }, function (response) {
            // resolve()
        })
    });
}



chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.message == "openPopup") {
        removePopup()
        createModal()

    }
})
/******/ })()
;
//# sourceMappingURL=contentScript.js.map