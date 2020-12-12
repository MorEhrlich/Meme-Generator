'use strict'

var gCanvas;
var gCtx;
var gSelected = true;
var gImg;

function onInit() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    //     addTouchDrag();
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
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    console.log(data)
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

function onGetImg(imgId) {
    onEditorClick();
    setImgData(imgId);
    drawImg(imgId);
}

function drawImg(imgId) {
    gImg = new Image();
    var currImg = getImgById(imgId);
    gImg.src = currImg.url;
    gImg.onload = function () {
        gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    };
}

function colorFillChanged(el) {
    if (!gSelected) {
        return;
    }
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].fill = el.value;
    renderCanvas();
}

function colorStrokeChanged(el) {
    if (!gSelected) {
        return;
    }
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].stroke = el.value;
    renderCanvas();
}

function drawText(text, x, y, fontType, fontSize, strokeColor, fillColor, align) {
    var alignCanvas = align;
    if (align === 'left') {
        alignCanvas = 'right';
    }
    if (align === 'right') {
        alignCanvas = 'left';
    }
    gCtx.lineWidth = '2'
    gCtx.strokeStyle = strokeColor;
    gCtx.fillStyle = fillColor;
    gCtx.font = fontSize + 'px ' + fontType;
    gCtx.textAlign = alignCanvas;
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawTextLines() {
    for (var i = 0; i < gMeme.lines.length; i++) {
        var line = gMeme.lines[i];
        drawText(line.txt, line.x, line.y, line.font, line.size, line.stroke, line.fill, line.align);
    }
}

function onLineType(value, event, txt) {
    if (event.key === 'Enter') {
        if (gSelected) {
            txt.blur();
            return;
        }
        txt.blur();
        clearTextInputLine()
        return;
    }
    if (gSelected) {
        gMeme.lines[gMeme.selectedLineIdx].txt = value;
    } else {
        gMeme.lines[gMeme.lines.length - 1].txt = value;
    }
    renderCanvas();
}

function renderCanvas() {
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);
    drawTextLines();
    if (gSelected) {
        var selectX = gMeme.lines[gMeme.selectedLineIdx].x;
        var selectY = gMeme.lines[gMeme.selectedLineIdx].y;
        var size = gMeme.lines[gMeme.selectedLineIdx].size;
        var textLength = gMeme.lines[gMeme.selectedLineIdx].txt.length;
        var startX;
        if (gMeme.lines[gMeme.selectedLineIdx].align == "center") {
            startX = selectX - textLength * size / 4;
        }
        if (gMeme.lines[gMeme.selectedLineIdx].align == "left") {
            startX = selectX - textLength / 2 * size;
        }
        if (gMeme.lines[gMeme.selectedLineIdx].align == "right") {
            startX = selectX + textLength / 2;
        }

        gCtx.beginPath()
        gCtx.strokeStyle = 'black'
        gCtx.rect(startX, selectY - size, textLength * size / 2 + 10, size + 10) // x,y,widht,height
        gCtx.stroke()
        gCtx.fillStyle = "#00000040";
    }
    uploadImg();
}


function onChangeSelectedLine() {
    if (gMeme.selectedLineIdx != null) {
        if (gMeme.lines.length - 1 === gMeme.selectedLineIdx) {
            gMeme.selectedLineIdx = 0;
        } else {
            gMeme.selectedLineIdx++
        }
        var elTxtInput = document.querySelector('input[name="txt-line"]');
        elTxtInput.value = gMeme.lines[gMeme.selectedLineIdx].txt;
        gSelected = true;
        renderCanvas();
    } else {
        if (gMeme.lines.length != 0) {
            gMeme.selectedLineIdx = 0;
            var elTxtInput = document.querySelector('input[name="txt-line"]');
            elTxtInput.value = gMeme.lines[gMeme.selectedLineIdx].txt;
            gSelected = true;
            renderCanvas();
        }
    }

}


function onAddLine() {
    var stroke = document.querySelector('input[name="color-text"]').value;
    var fill = document.querySelector('input[name="color-stroke"]').value;
    var fontEl = document.querySelector('select[name="font-change"]');
    var font = fontEl.options[fontEl.selectedIndex].text;

    var x = gCanvas.width / 2
    var y;
    if (gMeme.lines.length === 0) {
        y = 100;
    }
    if (gMeme.lines.length === 1) {
        y = 450;
    }
    if (gMeme.lines.length >= 2) {
        y = 280;
    }

    addLineToMeme('', font, fill, stroke, x, y);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gSelected = true;
    document.querySelector('input[name="txt-line"]').value = '';
    document.querySelector('input[name="txt-line"]').focus()
    renderCanvas()
}

function clearTextInputLine() {
    document.querySelector('.txt-inp').value = '';
    document.querySelector('.txt-inp').placeholder = 'Please Write Here';
}

function onDeleteLine() {
    if (!gSelected) {
        return;
    }
    if (gSelected) {
        deleteLine();
        gSelected = false;
        clearTextInputLine();
    }
    renderCanvas();
}

function onChangeFontSize(elSelect) {
    if (!gSelected) {
        return;
    }
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
    if (!gSelected) {
        return;
    }
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].align = align;
    renderCanvas();
}

function onSetFont(fontOption) {
    if (!gSelected) {
        return;
    }
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].font = fontOption;
    renderCanvas();
}

function onColorChange(color) {
    if (!gSelected) {
        return;
    }
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].color = color;
    renderCanvas();
}


function onChangeStrokeStyle(color) {
    if (!gSelected) {
        return;
    }
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx].stroke = color;
    renderCanvas();
}

function onChangeClass(elbutton) {
    var elColor = document.querySelector('.fill-color');
    elColor.classList.toggle('hidden');
}
function onChangeClassStroke(elbutton) {
    var elColor = document.querySelector('.stroke-color');
    elColor.classList.toggle('hidden');
}

function onShare() {
    gSelected = false;
    renderCanvas();
    shareOnFB();
}

function shareOnFB(){

}

function onMove(type){
    var currMeme = getCurrMeme();
    switch (type) {
        case 'up':
            if (gSelected) {
                currMeme.lines[currMeme.selectedLineIdx].y -= 10;
                renderCanvas();
            }
            break;
        case 'down':
            if (gSelected) {
                currMeme.lines[currMeme.selectedLineIdx].y += 10;
                renderCanvas();
            }
        
            break;    
    }
}

function onCanvasClicked(ev) {
    var { offsetX, offsetY } = ev;
    var elLine = gMeme.lines.findIndex((line) => {
        return offsetX >= line.x && offsetX <= line.x
            && offsetY <= line.y && offsetY >= line.y - line.size
    });
    var currMeme = getCurrMeme();
    currMeme.lines[currMeme.selectedLineIdx] = elLine;
}


/* facebook upload*/


function uploadImg() {
    document.getElementById('img-canvas').value = gCanvas.toDataURL();

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-btn').href = `https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`;
        document.querySelector('.share-btn').onclick = function() {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);
             return false;
        }
    }

    doUploadImg( document.getElementById('canvas-form'), onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
        console.error(err)
    })
}

