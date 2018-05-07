function $(id) {
  return document.getElementById(id);
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const canvas = new fabric.Canvas("c", { isDrawingMode: true });
fabric.Object.prototype.transparentCorners = false;

const clearButton = $("clear");
const drawButton = $("draw");
const downloadButton = $("download");
const openButton = $("open");

clearButton.onclick = () => canvas.clear();
drawButton.onclick = function() {
  canvas.isDrawingMode = !canvas.isDrawingMode;
  drawButton.innerHTML = canvas.isDrawingMode
    ? "Cancel drawing mode"
    : "Enter drawing mode";
};
downloadButton.onclick = () =>
  download(JSON.stringify(canvas), "project.json", "text/plain");
openButton.onchange = e => {
  // under maintainance
  const files = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () =>
    canvas.loadFromJSON(JSON.parse(reader.result), () => canvas.renderAll());

  reader.readAsText(files);
};
