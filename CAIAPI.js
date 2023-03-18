const body = document.getElementById('body');
const btn = document.getElementById('btn');
const prompt = document.getElementById('prompt');

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
    prepImgData(imgData, iiif_url);
    // extractArtistFunc(imgData);
  })
};

const prepImgData = (imgData, iiif_url) => {
  imgData.forEach(_imgData => {
      if(_imgData.image_id) {
        qInfoFunc(_imgData.image_id, iiif_url, _imgData.artist_title);
    }
  })
}

const qInfoFunc = async (imgURL, iiif, artistData) => {
    //using temporal literate syntax to build url from necessary components.
    const img = document.createElement('img');
    img.src = `${iiif}/${imgURL}/full/843,/0/default.jpg`;
    img.setAttribute('data-artist', `${artistData}`);
    imgArray.push(img);
    shuffleArray(imgArray);
    // console.log(imgArray);
}

const handleClick = async () => {
  const apiUrls = [];
  for (let i = 1; i < 5; i++) {
    let dataUrl = `https://api.artic.edu/api/v1/artworks?is_public_domain=true&page=${i}&limit=11&fields=image_id,artist_title,id,iiif_url`;
    const url = await getImgInfoFunc(dataUrl);
    const imgData = {
      iiif_url: url.config.iiif_url,
      imgData: url.data
    };
    apiUrls.push(imgData);
  }
  // console.log(apiUrls);
  extractData(apiUrls);
  qAggInfo(imgArray);
  qBuildFunc(currentPg);
}

const qAggInfo = (imgArray) => {
  for (let i = 0; i < 4; i++){
    // imgArray[Math.floor(Math.random() * imgArray.length)];
    // console.log(imgArray);
    const imgPick = imgArray.pop();
    body.append(imgPick);
    currentPg.push(imgPick);
  }
  shuffleArray(currentPg);
  console.log(currentPg);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

const qBuildFunc = (currentPg) => {
  const randomPick = currentPg.pop();
  const scrapeArtist = randomPick.getAttribute("data-artist");
  const question = `Which artwork was created by ${scrapeArtist}`;
  prompt.innerText = question;
}

//to total the number of points create a final string interp saying take sum of total points and add a zero to it (e.g. `your score is ${sum}0`)

btn.addEventListener('click', handleClick);
// const iiif = data.config.iiif_url

// "https://api.artic.edu/api/v1/artworks?page=1&page=100"