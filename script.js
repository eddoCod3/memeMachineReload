async function getPost (){
  // working with reddit you can add new.json or .json to have the data of the site
  const response = await fetch("https://www.reddit.com/r/meme/new.json")
  const posts =  await response.json()
  const dataPosts =  posts.data.children.map(post => post.data.url)

  console.log(dataPosts)
  return dataPosts
  
}
async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc)
  const imageBlog = await image.blob()
  const imageURL = URL.createObjectURL(imageBlog)

  const link = document.createElement('a')
  link.href = imageURL
  link.download = 'meme.jpg'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
async function getImages (){
  let imagesLinks = await getPost()
  let imageContainer = document.querySelector("#imageContainer")  

  for (let i = 0; i < imagesLinks.length; i++) {
    imageContainer.innerHTML += `<div class="container-img"> <img src="${imagesLinks[i]} "/> <a href="${imagesLinks[i]}" > Source Link</a> <span class="humor">Humor</span></div>`

  }
}



getImages()
