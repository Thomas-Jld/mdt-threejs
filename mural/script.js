
const muralDiv = document.getElementById("mural");
let currentMural = 0;

function changeMural(title, author, source) {
    let titleElement = document.getElementById("title");
    titleElement.className = "muralTitle";
    titleElement.innerHTML = title;

    let authorElement = document.getElementById("author");
    authorElement.className = "muralAuthor";
    authorElement.innerHTML = `by ${author}.`;

    let iframeElement = document.getElementById("muralIframe");
    iframeElement.src = source;

    window.history.pushState("", "", `#${currentMural}`);
    window.location.hash = currentMural;
}

let muralList = [
    {
        title: "Arctic Freezer",
        author: "Gauthier G",
        source: "https://jeeezzus.github.io/MDT_Three.JS/"
    },
    {
        title: "Solar Oven",
        author: "Yohann C",
        source: "https://yocoss.github.io/SolarOven/"
    },
    {
        title: "OUI",
        author: "Claudio O",
        source: "https://claudio9701.github.io/ift-mdt-three/"
    },
    {
        title: "3D Speech-Driven Animation",
        author: "Hugo Da",
        source: "https://hugodmn.github.io/ThreeJsProject/"
    },
    {
        title: "BIOS",
        author: "Thaïs G",
        source: "https://thaisgauthier.github.io/3D-projet/"
    },
    {
        title: "GCode Viewer",
        author: "Marc-Adrien M",
        source: "https://ram6ces.github.io/gcode-viewer/"
    },
    {
        title: "Whistle Babe",
        author: "Mathis T",
        source: "https://matlamenasse.github.io/whistle_babe/"
    },
    {
        title: "Tiny Marsh",
        author: "Noé G",
        source: "https://antoinoe.github.io/threejs/"
    },
    {
        title: "Relaxing Waves",
        author: "Diane B",
        source: "https://dianubv.github.io/RelaxingWaves/"
    },
    {
        title: "Voice Interaction",
        author: "Nathan V",
        source: "https://arcadia24.github.io/voice-interaction-three/"
    },
    {
        title: "HeartBit",
        author: "Marine B",
        source: "https://marinereynaud25.github.io/HeartBit-ThreeJS/"
    },
    {
        title: "Point Cloud Visualisation",
        author: "Etienne P",
        source: "https://etienne248.github.io/TreeJs_Point_Cloud_visualisation/"
    },
    {
        title: "3D Music Visualizer",
        author: "Hugo J",
        source: "https://hugo-jrlnd.github.io/MDT_project/"
    }
]


let viewCode = document.getElementById("muralVisitButton");
viewCode.onclick = () => {
    let link = document.getElementById('muralIframe').src;
    let username = link.split('.')[0].split('//')[1];
    let repo = link.split('/').slice(-2, -1)[0]
    let url = `https://github.com/${username}/${repo}`;
    window.open(url)
}

let iframeDiv = document.getElementById("iframeDiv");
function triggerAnimation() {
    // remove iframeAnim class
    iframeDiv.classList.remove("iframeAnim");
    // trigger reflow
    void iframeDiv.offsetWidth;
    // add iframeAnim class
    iframeDiv.classList.add("iframeAnim");
}

let nextButton = document.getElementById("muralNextButton");
nextButton.onclick = () => {
    currentMural = (currentMural + 1) % muralList.length;
    changeMural(muralList[currentMural].title, muralList[currentMural].author, muralList[currentMural].source);
    triggerAnimation();
}

let previousButton = document.getElementById("muralPreviousButton");
previousButton.onclick = () => {
    currentMural = (currentMural - 1 + muralList.length) % muralList.length;
    changeMural(muralList[currentMural].title, muralList[currentMural].author, muralList[currentMural].source);
    triggerAnimation();
}


if (window.location.hash) {
    let hash = window.location.hash.substring(1);
    currentMural = parseInt(hash);
}

changeMural(muralList[currentMural].title, muralList[currentMural].author, muralList[currentMural].source);
