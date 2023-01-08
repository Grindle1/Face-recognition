const video = document.getElementById("video");
let labels = [];

const startVideo = async () => {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
    await axios("/match/labels", {
        method: "get"
    }).then((res) => {
        labels = res.data;
    })
};

Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
]).then(startVideo);

const loadLabeledImage = async () => {
    return Promise.all(
        labels.map(async (label) => {
            const descriptors = [];
            const img = await faceapi.fetchImage(label.imageURL);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            descriptors.push(detections.descriptor);
            return new faceapi.LabeledFaceDescriptors(label.name, descriptors);
        })
    )
};

const nameDiv = (name) => {
    console.log(name);
    $("#nameDiv").empty();
    $("#nameDiv").append(`<h1>You are ${name}</h1>`)
};

const onPlay = async () => {
    const labeledFaceDescriptors = await loadLabeledImage();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.475);
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      results.forEach((result, i) => {
        nameDiv(result.label);
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        drawBox.draw(canvas)
      })
    }, 500)
};

