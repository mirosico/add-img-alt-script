(function main() {
    const API_URL = "https://random-word-api.herokuapp.com/word?number=";
    const IMG_CSS = ".highlighted-alt {border: 3px dashed #ff0000b0!important;-webkit-animation: animate-img 2s linear infinite;animation: animate-img 2s linear infinite;}@-webkit-keyframes animate-img {0% { transform: scale(1); }50% { transform: scale(1.05); }80% { transform: scale(1);}}@keyframes animate-img {0% { transform: scale(1); }50% { transform: scale(1.05); }80% { transform: scale(1); }}"
    document.querySelector("head").innerHTML += "<style>" + IMG_CSS + "</style>"

    let state = {
        imgArray: document.querySelectorAll("img")
    }

    function generateAlt(images) {
        fetch(`${API_URL}${images.length}`)
        .then(data => data.json())
        .then(json => {
            json.forEach((alt, index) => initImgAlt(images[index], alt))
        })
    }

    function initImgAlt(image , alt) {
        image.alt = alt;
        image.classList.add("highlighted-alt");
        image.addEventListener("click", setNewAltOnClick);
    }

    function setNewAltOnClick(event) {
        let newAlt = prompt("\nEnter new ALT for these image:\n");
        event.target.alt = newAlt;
    }

    function checkForUpdate() {
        let newImg = Array.from(document.querySelectorAll('img')).filter(img => !img.classList.contains("highlighted-alt"));
        if(newImg.length) {
            generateAlt(newImg)
            state.imgArray = document.querySelectorAll("img.highlighted-alt");
        }
    }

    generateAlt(state.imgArray)
    setInterval(checkForUpdate, 5000)
})()








