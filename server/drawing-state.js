class DrawingState {
  constructor() {
    this.paths = [];
    this.undone = [];
  }

  addPath(path) {
    this.paths.push(path);
    this.undone = [];
  }

  undo() {
    if (this.paths.length > 0) {
      const undonePath = this.paths.pop();
      this.undone.push(undonePath);
    }
  }

  redo() {
    if (this.undone.length > 0) {
      const restored = this.undone.pop();
      this.paths.push(restored);
    }
  }

  getAll() {
    return this.paths;
  }
}

module.exports = DrawingState;
