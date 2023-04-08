const body = document.getElementById('body');
const btn = document.getElementById('btn');
const prompt = document.getElementById('prompt');
const header = document.getElementById('header');
const imgCont = document.getElementById('imgCont');
const imgParent1 = document.getElementById('imgParent1');
const imgParent2 = document.getElementById('imgParent2');
const btnParent = document.getElementById('btnParent');

imgArray = [];
artistArray = [];
currentPg = [];

const getImgInfoFunc = async (dataUrl) => {
  //fetch request function 
  const response = await fetch(dataUrl);
  //converting into json
  const data = await response.json();
  //separating each imgs info
  return data;
}

const extractData = async (data) => {
  data.forEach(artwork => {
    const {imgData, iiif_url} = artwork;
    // console.log(imgData);
    prepImgData(imgData, iiif_url);
    // extractArtistFunc(imgData);
  })
};

const prepImgData = (imgData, iiif_url) => {
  imgData.forEach(_imgData => {
      if(_imgData.image_id) {
        qInfoFunc(_imgData.image_id, iiif_url, _imgData.artist_title, _imgData.title);
        // console.log(_imgData);
    }
  })
}

const qInfoFunc = async (imgURL, iiif, artistData) => {
    //using temporal literate syntax to build url from necessary components.
    if (imgURL != '342b2214-04d5-de63-b577-55a08a618960' && artistData != 'null'){
      // console.log(imgURL);
      const img = document.createElement('img');
      img.src = `${iiif}/${imgURL}/full/843,/0/default.jpg`;
      img.setAttribute('data-artist', `${artistData}`);
      imgArray.push(img);
      // console.log(title);
    }
}

const handleClick = async () => {
  const apiUrls = [];
  if(apiUrls.length != 60){
    for (let i = 1; i < 40; i++) {
      let dataUrl = `https://api.artic.edu/api/v1/artworks?is_public_domain=true&page=${i}&limit=11&fields=image_id,artist_title,id,iiif_url`;
      const url = await getImgInfoFunc(dataUrl);
      const imgData = {
        iiif_url: url.config.iiif_url,
        imgData: url.data
      };
      apiUrls.push(imgData);
    }
  }
  console.log(apiUrls.length);
  // console.log(imgArray);
  extractData(apiUrls);
  shuffleArray(imgArray);
  qAggInfo(imgArray);
  // setBtnLink();
  btn.className = 'hidden';
}


currentPg = [];

const qAggInfo = (imgArray) => {
  for (let i = 1; i < 5; i++){
    // imgArray[Math.floor(Math.random() * imgArray.length)];
    // console.log(imgArray);
    const imgPick = imgArray.pop();
    console.log(imgPick);
    if (i < 3){
      imgParent1.append(imgPick);
    } else {
      imgParent2.append(imgPick);
    }
    currentPg.push(imgPick);
  }
  console.log(currentPg);
  setBtnLink(currentPg);
  qBuildFunc();
}

const setBtnLink = (array) => {
  // const currentPg = qAggInfo();
  const elements = btnParent.querySelectorAll('button');
  for (let i = 0; i < 4; i++){
    const artistGrab = array.shift();
    const artist = artistGrab.getAttribute('data-artist');
    elements[i].setAttribute('data-artist', `${artist}`);
  }
}

function shuffleArray(currentPg) {
  for (let i = currentPg.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentPg[i], currentPg[j]] = [currentPg[j], currentPg[i]];
  }
qBuildFunc(currentPg);
}

const qBuildFunc = () => {
  const artArray = []
  const img = imgCont.querySelectorAll('image');
  artArray.push(img);
  // const artist = img.getAttribute();
  console.log(artArray);
  const question = `Which artwork was created by ${scrapeArtist}`;
  prompt.innerText = question;
  return scrapeArtist;
}


const onClick = (scrapeArtist) => {
  const btnArray = btnCollector();
  console.log(btnArray);
  for (let i = 0; i <= 3; i++){
    button = btnArray.pop();
    buttonId = button.getAttribute('data-artist');
    if (buttonId === scrapeArtist) {
      console.log(correct);
    }
  }
}

const btnCollector = () => {
  btnArray = [];
  const buttons = btnParent.querySelectorAll('button');
  btnArray.push(buttons);
  return btnArray;
}

//to total the number of points create a final string interp saying take sum of total points and add a zero to it (e.g. `your score is ${sum}0`)

btn.addEventListener('click', handleClick);
btnParent.addEventListener('click', onClick);
// const iiif = data.config.iiif_url

// "https://api.artic.edu/api/v1/artworks?page=1&page=100"