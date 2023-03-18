// fetch (`https://api.artic.edu/api/v1/artworks`)
// // .then(response => console.log(response))
//     .then(response => response.json())
//     .then(data => console.log(data))
const body = document.getElementsByTagName('body')[0]
// const body = document.getElementsByClassName(' Answer1')[0]

    const fetchArtworks = async () => {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks`);
        const data = await response.json();
        const artworks = data.data
        return artworks
    }

    const prepArtworkData = async () => {
        const artworks = await fetchArtworks();
        artworks.forEach(artwork => {
            const imgUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
            addImg(imgUrl, artwork.artist_title, artwork.title)
            // addTitle(imgUrl, artwork.title)
        }) 
    }



    const addImg = (imgUrl,artist, title) => {
        const img = document.createElement('img');
        img.src = imgUrl;
        img.setAttribute('data-artist', artist )
        img.setAttribute('data-title', title)
        body.append(img)
    }

    // const addTitle = (imgUrl, title) => {
    //     img.setAttribute('data-title', title)
    // }
    

    prepArtworkData()