'use strict'

const KEY = 'images';
var gImgId = 1;
var gImgs = [];

// var gKeywords = { 'happy': 12, 'funny puk': 1 };

var gMeme =
{
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines:
        [{
            txt: 'Write Here',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black',
            pos: { x: 100, y: 100 }
        }]
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
    // var images = loadFromStorage(KEY)
    // if (!images || !images.length) {
    //     images = []
    for (let i = 1; i < 19; i++) {
        gImgs.push( _createImg());
    }
    // gImgs = images;
    // _saveImagesToStorage();
    // }
    // gImgs = images;
}


// function _saveImagesToStorage() {
//     saveToStorage(KEY, gImgs)
// }


// function getImages() {
//     loadFromStorage(KEY)
//     return gImgs;
// }


function getImgById(imgId) {
    return gImgs.find(function (img) {
        return imgId === img.id
    })
}

function setImgData(imgId) {
    gMeme.selectedImgId = imgId;
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

function getCurrMeme() {
    return gMeme;
}

function getCurrLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}


function addLineToMeme(line){
    var newLine = { txt: line, size:40, align: 'center', color:'white', pos: { x: 100, y: 100 }};
    gMeme.lines.push(newLine);
}

function deleteLine() {
    gMeme.lines = [];
}

