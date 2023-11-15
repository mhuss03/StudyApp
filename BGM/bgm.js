const vidUrl = document.getElementById("url");
const vidcontainer = document.getElementById("vid-container");
const button = document.getElementById("input");

button.addEventListener("click", () => {
  const videoId = getYouTubeVideoId(vidUrl.value);

  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    vidcontainer.innerHTML = `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    console.error("Invalid YouTube URL");
  }
});

function getYouTubeVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match && match[1];
}
