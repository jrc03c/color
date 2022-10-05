const HSLToHSV = require("./hsl-to-hsv.js")

test("tests that HSLToHSV works as expected", () => {
  const pred = HSLToHSV(50, 1, 0.5)
  const truth = { h: 50, s: 1, v: 1 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.v - truth.v)).toBeLessThan(0.01)
})
