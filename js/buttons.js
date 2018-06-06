export default canvas => {
  const clearButton = $("#clear");
  const drawButton = $("#a-draw");
  const saveButton = $("#a-save");
  const openButton = $("#a-open");
  const textButton = $("#a-text");
  const shapeButton = $("#a-shape");
  const textAddButton = $("#a-text-add");
  const selectButton = $("#a-select");
  const openFile = $("#open");
  const drawColorInput = $("#a-draw-color");
  const drawWidthInput = $("#a-draw-width");
  const shapeFillInput = $("#a-shape-fill");
  const shapeStrokeInput = $("#a-shape-stroke");
  const shapeStrokeWidthInput = $("#a-shape-stroke-width");

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

  function inputToNumber(value, minValue) {
    return parseInt(value, 10) || (minValue || 0);
  }

  drawButton.on("click", function(event) {
    canvas.isDrawingMode = true;
  });

  drawColorInput.on("input", function(event) {
    canvas.freeDrawingBrush.color = drawColorInput.val();
  });
  drawWidthInput.on("input", function(event) {
    canvas.freeDrawingBrush.width = inputToNumber(drawWidthInput.val(), 1);
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

  shapeFillInput.on("input", function(event) {
    canvas.getActiveObject().set({ fill: shapeFillInput.val() });
    canvas.renderAll();
  });

  shapeStrokeInput.on("input", function(event) {
    canvas.getActiveObject().set({ stroke: shapeStrokeInput.val() });
    canvas.renderAll();
  });

  shapeStrokeWidthInput.on("input", function(event) {
    canvas
      .getActiveObject()
      .set({ strokeWidth: inputToNumber(shapeStrokeWidthInput.val(), 0) });
    canvas.renderAll();
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
};
