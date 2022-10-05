const HSVToHSL = require("./hsv-to-hsl.js")

test("tests that HSVToHSL works as expected", () => {
  const pred = HSVToHSL(50, 1, 1)
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})
