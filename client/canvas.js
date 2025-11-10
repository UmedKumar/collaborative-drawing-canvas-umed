class CanvasHandler {
  constructor(canvas, colorPicker, sizePicker) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.colorPicker = colorPicker;
    this.sizePicker = sizePicker;
    this.isDrawing = false;
    this.paths = [];
    this.undonePaths = [];

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.attachListeners();
  }

  resize() {
    this.canvas.width = window.innerWidth - 40;
    this.canvas.height = window.innerHeight - 100;
  }

  attachListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrawing());
    this.canvas.addEventListener('mouseout', () => this.stopDrawing());
  }

  startDrawing(e) {
    this.isDrawing = true;
    const path = {
      color: this.colorPicker.value,
      size: this.sizePicker.value,
      points: [{ x: e.offsetX, y: e.offsetY }],
    };
    this.paths.push(path);
  }

  draw(e) {
    if (!this.isDrawing) return;
    const currentPath = this.paths[this.paths.length - 1];
    const point = { x: e.offsetX, y: e.offsetY };
    currentPath.points.push(point);
    this.redraw();
  }

  stopDrawing() {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    if (this.paths.length > 0) {
      sendDrawing(this.paths[this.paths.length - 1]);
    }
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (const path of this.paths) {
      this.ctx.strokeStyle = path.color;
      this.ctx.lineWidth = path.size;
      this.ctx.lineJoin = 'round';
      this.ctx.beginPath();
      const [first, ...rest] = path.points;
      this.ctx.moveTo(first.x, first.y);
      for (const p of rest) this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
    }
  }

  undo() {
    if (this.paths.length === 0) return;
    const last = this.paths.pop();
    this.undonePaths.push(last);
    this.redraw();
    sendUndo();
  }

  redo() {
    if (this.undonePaths.length === 0) return;
    const restored = this.undonePaths.pop();
    this.paths.push(restored);
    this.redraw();
    sendRedo();
  }

  applyRemotePath(path) {
    this.paths.push(path);
    this.redraw();
  }

  applyUndo() {
    if (this.paths.length > 0) this.paths.pop();
    this.redraw();
  }

  applyRedo() {
    // handled by server synchronization
    this.redraw();
  }
}
