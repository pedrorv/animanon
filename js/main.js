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
        stroke: "#000",
        originX: "left",
        originY: "top"
      });

      path.set("data-custom-type", "shape");

      canvas.add(path);
    });
  });

  canvas.on("object:selected", function() {
    const currentObject = canvas.getActiveObject();
    const type = currentObject.get("type");
    const customType = currentObject.get("data-custom-type");

    $(".select-prop").each(function() {
      $(this).removeClass("active");
    });

    $("#a-select").click();

    if (type === "path") {
      if (customType === "shape") {
        $(".select-prop.shape").addClass("active");
      } else {
        $(".select-prop.draw").addClass("active");
      }
    }
  });
})();
