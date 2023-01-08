let imageURL = "";

const startVideo = () => {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
};

Promise.all([
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.nets.ssdMobilenetv1.loadFromUri("../models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
]).then(startVideo);

const clickPic = async () => {
    let imageDiv = document.getElementById("uploadDiv");
    $(imageDiv).empty();
    const canvas = faceapi.createCanvasFromMedia(video);
    const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors();
    const displaySize = { width: canvas.width, height: canvas.height };
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    resizedDetections.forEach(detection => {
        const box = detection.detection.box
        const drawBox = new faceapi.draw.DrawBox(box, { label: "Face"})
        drawBox.draw(canvas)
    })
    console.log(detections)
    imageURL = canvas.toDataURL("image/jpeg", 0.125);
    imageDiv.append(canvas);
};

const sendPic = async () => {
    let username = document.getElementById("username").value;
    const canvas = document.getElementsByTagName("canvas")
    // await axios("/clickPic", {
    //     method: "post",
    //     data: {
    //         name: username,
    //         imageURL: imageURL
    //     }
    // }).then((res) => {
    //     alert(res.data);
    // })
}