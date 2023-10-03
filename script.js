async function getPost (url, label){
  // working with reddit you can add new.json or .json to have the data of the site
  let tagCategorie = label
  const response = await fetch(url)
  const posts =  await response.json()
  const dataPosts =  posts.data.children.map(post => post.data.url)
//add a option so i can catch if the url is a MP4 file so i can save that and display that in a bigger size
//Check for user scroll with ObjecteSERVER
  console.log(dataPosts)
  return [dataPosts ,tagCategorie]
  
}

async function randomHexColor(){
  
   let randomColor =  Math.floor(Math.random()*16777215).toString(16)
   console.log(randomColor)
   return randomColor;
}

async function downloadImage(imageSrc) {
  try {
    const image = await fetch(imageSrc,{cors:"no-cors"});
    const imageBlob = await image.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'meme.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}



async function getImages (url, label){
  let [imagesLinks, tagCategorie] = await getPost(url, label)
  let imageContainer = document.querySelector("#imageContainer")  
  let randomColor = await randomHexColor()
  

  for (let link in imagesLinks){ 
    imageContainer.innerHTML += `<div class="container-img"> <img src="${imagesLinks[link]} " loading ="lazy"/> <a href="${imagesLinks[link]}" > Source Link</a> <button onclick="downloadImage('${imagesLinks[link]}')"> Download </button>  <span class="humor">${tagCategorie}</span></div>`

  }
  document.getElementsByClassName("humor").style.backgroundColor =`#${randomColor}` 
}

// async function storedMemes (){
  
//   let imagesLinks = await getPost()
//   let linksArray = []
//   for (let link in imagesLinks){ 
//     linksArray.push(imagesLinks[link])
    
//   }
//   localStorage.setItem("imagesLinks", JSON.stringify(linksArray))
// }


getImages("https://www.reddit.com/r/memes/new.json", "Humor")
getImages("https://www.reddit.com/r/ProgrammerHumor/new.json", "Programmer Humor")
// storedMemes()
