import shapesPath from "./shapes.js";

const Animanon = (function() {
  const canvas = new fabric.Canvas("c", {
    isDrawingMode: false,
    backgroundColor: "#fff"
  });
  canvas.renderAll();
  fabric.Object.prototype.transparentCorners = false;

  const clearButton = $("#clear");
  const drawButton = $("#a-draw");
  const saveButton = $("#a-save");
  const openButton = $("#a-open");
  const textButton = $("#a-text");
  const shapeButton = $("#a-shape");
  const textAddButton = $("#a-text-add");
  const selectButton = $("#a-select");
  const openFile = $("#open");

  const toolButtons = [
    drawButton,
    selectButton,
    textButton,
    shapeButton
  ].forEach(function(button) {
    button.on("click", function() {
      changeTool($(this).attr("id"));
    });
  });

  function changeTool(id) {
    $(".btn-tool").each(function() {
      const tool = $(this);

      if (id === tool.attr("id")) {
        tool.addClass("active");
        $("#" + id + "-props").addClass("active");
        return;
      }

      tool.removeClass("active");
      $("#" + tool.attr("id") + "-props").removeClass("active");
    });
  }

  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  clearButton.onclick = () => {
    canvas.clear();
  };

  drawButton.on("click", function(event) {
    canvas.isDrawingMode = true;
  });

  selectButton.on("click", function(event) {
    canvas.isDrawingMode = false;
  });

  textButton.on("click", function(event) {
    canvas.isDrawingMode = false;
  });

  shapeButton.on("click", function(event) {
    canvas.isDrawingMode = false;
  });

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

  textAddButton.on("click", function(event) {
    const input = $("#a-text-value");
    if (!input.val()) return;

    const textbox = new fabric.Textbox(input.val(), {
      left: 50,
      top: 50,
      fontSize: 20
    });
    canvas.add(textbox).setActiveObject(textbox);
  });

  saveButton.on("click", function(event) {
    download(JSON.stringify(canvas), "project.json", "text/plain");
  });

  openButton.on("click", function(event) {
    openFile.click();
  });

  openFile.on("change", function(e) {
    const files = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () =>
      canvas.loadFromJSON(JSON.parse(reader.result), () => canvas.renderAll());

    reader.readAsText(files);
  });
})();
