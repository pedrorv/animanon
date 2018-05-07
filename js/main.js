function $(id) {
  return document.getElementById(id);
}

const canvas = new fabric.Canvas("c", { isDrawingMode: true });
fabric.Object.prototype.transparentCorners = false;

const clearButton = $("clear");
const drawButton = $("draw");

clearButton.onclick = () => canvas.clear();
drawButton.onclick = function() {
  canvas.isDrawingMode = !canvas.isDrawingMode;
  drawButton.innerHTML = canvas.isDrawingMode
    ? "Cancel drawing mode"
    : "Enter drawing mode";
};
