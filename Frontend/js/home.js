let sentiment = document.querySelector('#sentiment')
let loading = document.querySelector('.generate')
let done = loading.innerHTML;

function generateImage() {
  loading.innerHTML = "<i class=\"fa fa-circle-o-notch fa-spin\"></i> Generating";

  const text = document.getElementById("text-input").value;
  let result = getImage(text);
  setTimeout(function () {
    loading.innerHTML = done;
  }, 3000);
}



function getImage(text){
  let query = text;
  let status = "";
  let imagesrc = "";

  const data = {
    query
  };

  fetch('http://127.0.0.1:5001/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      status = data.status;
      imagesrc = data.image;
      if(status === "1"){
        sentiment.innerHTML = "Query is <strong>Positive</strong>";
      }
      else{
        sentiment.innerHTML = "Query is <strong style=\"color: red;\">Negative</strong>";
      }
      const generatedImage = document.getElementById("generated-image");
      generatedImage.setAttribute("src", imagesrc);
      generatedImage.style.display = "block";
    })
    .catch(error => {
      console.error(error);
    });
}
