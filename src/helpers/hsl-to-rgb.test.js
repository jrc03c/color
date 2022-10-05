const HSLToRGB = require("./hsl-to-rgb.js")

test("tests that HSLToRGB works as expected", () => {
  const pred = HSLToRGB(50, 1, 0.5)
  const truth = { r: 255, g: 213, b: 0 }

  expect(Math.abs(pred.r - truth.r)).toBeLessThan(1)
  expect(Math.abs(pred.g - truth.g)).toBeLessThan(1)
  expect(Math.abs(pred.b - truth.b)).toBeLessThan(1)
})
