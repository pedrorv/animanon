import shapesPath from "./shapes.js";
import setupButtons from "./buttons.js";

const Animanon = (function() {
  const canvas = new fabric.Canvas("c", {
    isDrawingMode: false,
    backgroundColor: "#fff"
  });
  canvas.renderAll();
  fabric.Object.prototype.transparentCorners = false;

  setupButtons(canvas);

  $("img.shape").each(function() {
    const img = $(this).on("click", function() {
      const shape = $(this)
        .attr("id")
        .split("a-shape-")[1];

      const path = new fabric.Path(shapesPath[shape], {
        fill: "#000",
        originX: "left",
        originY: "top"
      });

      canvas.add(path);
    });
  });
})();
