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
    drawImg(imgId);
}


function drawImg(imgId) {
    var img = new Image();
    var currImg = getImgById(imgId);
    img.src = currImg.url;
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    };

}

function drawText(text, x , y) {
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '60px Impact'
    gCtx.textAlign = 'center'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}


function onLineType(txt) {
    // setLineTxt(txt);
    renderCanvas(txt, 250, 100);
    // var currLine = getCurrLine();
    //drawText(currLine.txt, currLine.x, currLine.y);
}



function renderCanvas(text, x ,y) {
    // var currImg = getCurrImgId();
    //drawImg(currImg, text);
    drawText(text, x, y);
}

function onChangeSelectedLine() {

}

function onAddLine() {
    var elLine = document.querySelector('input[name=txt-line]').value;
    addLineToMeme(elLine);
    renderCanvas()
}

function onDeleteLine() {
    deleteLine();
    renderCanvas();
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

function onColorChange(Color) {
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].color = Color;
    renderCanvas();
}


function onChangeStrokeStyle(color){
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].stroke = color;
}



function onChangeClass(elbutton){
    var elColor = document.querySelector('.fill-color');
    elColor.classList.toggle('hidden');
 }


// function canvasClicked(ev){
//     var { offsetX, offsetY } = ev;
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
