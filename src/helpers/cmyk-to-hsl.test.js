const CMYKToHSL = require("./cmyk-to-hsl.js")

test("tests that CMYKToHSL works as expected", () => {
  const pred = CMYKToHSL(0.5, 0, 1, 0.5)
  const truth = { h: 90, s: 1, l: 0.25 }
  expect(Math.abs(pred.h - truth.h)).toBeLessThan(0.01)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})
