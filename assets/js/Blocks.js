export const blocks = {
  shapes: [
      { shape: [[1, 1, 1, 1]], color: "red" },            // I
      { shape: [[1, 0, 0], [1, 1, 1]], color: "yellow" }, // J
      { shape: [[0, 0, 1], [1, 1, 1]], color: "green" },  // L
      { shape: [[0, 1, 1], [1, 1, 0]], color: "pink" },   // S
      { shape: [[1, 1, 0], [0, 1, 1]], color: "blue" },   // Z
      { shape: [[1, 1], [1, 1]], color: "brown" },        // O
      { shape: [[0, 1, 0], [1, 1, 1]], color: "violet" }, // I
  ],
  getBlock() {
      return this.shapes[Math.round(Math.random() * (this.shapes.length - 1))]
  }
}