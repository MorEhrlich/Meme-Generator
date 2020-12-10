'use strict'

var gCanvas;
var gCtx;

function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    renderGallery()
}


function onGalleryClick() {
    document.querySelector('.gallery-container').classList.remove('hidden');
    document.querySelector('.editor-container').classList.add('hidden');
}

function onEditorClick() {
    document.querySelector('.gallery-container').classList.add('hidden');
    document.querySelector('.editor-container').classList.remove('hidden');
}

function renderGallery() {
    var strHTML = '';
    for (var i = 1; i < 19; i++) {
        strHTML += `<div class="img-container"><img class="gallery-img" src="img/meme/${i}.jpg" 
        onClick="onGetImg(${i})"></div>`;
    }
    document.querySelector('.gallery-container').innerHTML = strHTML;
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    console.log(data)
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function onGetImg(imgId) {
    onEditorClick()
    setImgData(imgId)
    renderCanvas()
}


function drawImg(imgId) {
    var img = new Image();
    var currImg = getImgById(imgId);
    img.src = currImg.url;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    };

}

// function drawText(text ='Write Here', x = 100, y = 100) {
//     text = document.querySelector('input[name=txt-line]').value;
//     gCtx.lineWidth = '2'
//     gCtx.strokeStyle = 'black'
//     gCtx.fillStyle = 'white'
//     gCtx.font = '60px Impact'
//     gCtx.textAlign = 'center'
//     gCtx.fillText(text, x, y)
//     gCtx.strokeText(text, x, y)
// }


function onLineType(txt) {
    setLineTxt(txt);
    renderCanvas();
    var currLine = getCurrLine();
    drawText(currLine.txt, currLine.x, currLine.y);
}

function drawText(text, x, y) {
    gCtx.lineWidth = '2';
    gCtx.strokeStyle = gMeme.stroke;
    gCtx.font = `${gMeme.size}px impact`;
    gCtx.textAlign = gMeme.align;
    gCtx.fillStyle = gMeme.color;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function onAddLine() {
    var elLine = document.querySelector('input[name=txt-line]').value;
    addLineToMeme(elLine);
    renderCanvas()
}

function renderCanvas() {
    var currImg = getCurrImgId();
    drawImg(currImg);
    drawText(text, x, y);
}

function onChangeFontSize(elSelect) {
    switch (elSelect) {
        case 'increase-font': {
            setFontSize(1);
        }
            break
        case 'decrease-font': {
            setFontSize(-1);
        }
            break
    }
    renderCanvas();
}

function onSetTextAlign(align) {
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].align = align;
    renderCanvas();
}

function onSetFont(fontOption) {
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].font = fontOption;
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();
}

function onChangeClass(){
   var elColor = document.querySelector('.hidden');
   elColor.classList.toggle('.shown');
}

// function onChangeStrokeStyle(color){
//     var currMeme = getCurrMeme();
//     currMeme.lines[currMeme.selectedLineIdx].stroke = color;
// }

// function onChangeSelectedLine() {

// }

// function onColorChange(Color) {
//     var currMeme = getCurrMeme();
//     currMeme.lines[currMeme.selectedLineIdx].color = Color;
//     renderCanvas();
// }




/* facebook upload*/

//  on submit call to this function
// function uploadImg(elForm, ev) {
//     ev.preventDefault();
//     document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

//     // A function to be called if request succeeds
//     function onSuccess(uploadedImgUrl) {
//         uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
//         document.querySelector('.my-canvas').innerHTML = `
//         <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
//            Share   
//         </a>`
//     }

//     doUploadImg(elForm, onSuccess);
// }

// function doUploadImg(elForm, onSuccess) {
//     var formData = new FormData(elForm);
//     fetch('http://ca-upload.com/here/upload.php', {
//         method: 'POST',
//         body: formData
//     })
//     .then(function (res) {
//         return res.text()
//     })
//     .then(onSuccess)
//     .catch(function (err) {
//         console.error(err)
//     })
// }





/*another way- didn't work- find out later why */
// function renderGallery() {
//     var images = getImages();
//     var strHTML = images.map(function (image) {
//         return `<div class="img-container"><img class="gallery-img" src=${image.url} ></div>`
//     })
//     document.querySelector('.gallary-container').innerHTML = strHTML;
// }
