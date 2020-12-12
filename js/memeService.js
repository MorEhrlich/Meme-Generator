'use strict'

var gImgId = 1;
var gImgs = [];

var gKeywords =
{
    'happy': 1,
    'funny': 1,
    'men': 1,
    'woman': 1,
    'babies': 1,
    'animals': 1,
    'cute': 1,
};

var gMeme =
{
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines:
        [
            {
                txt: 'Write Text here',
                size: 60,
                font: 'impact',
                align: 'center',
                fill: 'white',
                stroke: 'black',
                x: 250,
                y: 100
            }

        ]
};

_createImages()

function _createImg() {
    var returnImg = {
        id: gImgId,
        url: `img/meme/${gImgId}.jpg`,
        keywords: [],
    }
    gImgId++;
    return returnImg;
}

function _createImages() {
    for (let i = 1; i < 19; i++) {
        gImgs.push(_createImg());
    }
}


function getImgById(imgId) {
    return gImgs.find(function (img) {
        return imgId === img.id
    })
}

function setImgData(imgId) {
    gMeme.selectedImgId = imgId;
}

function getImgs() {
    return gImgs;
}

function getCurrMeme() {
    return gMeme;
}

function getCurrImgId() {
    return gMeme.selectedImgId;
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getCurrLineIdx() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setCurrLineIdx(idx) {
    return gMeme.lines[gMeme.selectedLineIdx]= idx;
}

function getMemeTextData() {
    return gMeme.lines;
}


function addLineToMeme(line, font, fill, stroke, x, y) {
    var newLine =
    {
        txt: line,
        font: font,
        size: 60,
        align: 'center',
        fill: fill,
        stroke: stroke,
        x: x,
        y: y
    }
    gMeme.lines.push(newLine);
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
    gMeme.selectedLineIdx = null;
}


// function addTouchDrag() {
//     var touchMove = new Hammer(gCanvas);
//     touchMove.on('pan', function (ev) {
//         if (ev.pointerType === 'mouse') return;
//         onDrag(ev.srcEvent);
//     });
//     var touchDown = new Hammer(gCanvas);
//     touchDown.on('press', function (ev) {
//         if (ev.pointerType === 'mouse') return;
//         onCanvasClicked(ev.srcEvent);
//     });
// }