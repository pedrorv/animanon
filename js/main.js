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
  const selectButton = $("#a-select");
  const openFile = $("#open");

  const toolButtons = [drawButton, selectButton].forEach(function(button) {
    button.on("click", function() {
      changeTool($(this).attr("id"));
    });
  });

  function changeTool(id) {
    $(".btn-tool").each(function() {
      const tool = $(this);

      if (id === tool.attr("id")) {
        tool.addClass("active");
        return;
      }

      tool.removeClass("active");
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
    console.log("clear");
    canvas.clear();
  };

  drawButton.on("click", function(event) {
    canvas.isDrawingMode = true;
  });

  selectButton.on("click", function(event) {
    canvas.isDrawingMode = false;
  });

  saveButton.on("click", function(event) {
    download(JSON.stringify(canvas), "project.json", "text/plain");
  });

  openFile.on("change", function(e) {
    const files = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () =>
      canvas.loadFromJSON(JSON.parse(reader.result), () => canvas.renderAll());

    reader.readAsText(files);
  });
})();
