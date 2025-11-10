const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const sizePicker = document.getElementById('sizePicker');
const eraserBtn = document.getElementById('eraser');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');

const canvasHandler = new CanvasHandler(canvas, colorPicker, sizePicker);
setupWebSocket(canvasHandler);

eraserBtn.onclick = () => colorPicker.value = '#ffffff';
undoBtn.onclick = () => canvasHandler.undo();
redoBtn.onclick = () => canvasHandler.redo();
