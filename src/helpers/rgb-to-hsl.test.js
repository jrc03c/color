const RGBToHSL = require("./rgb-to-hsl.js")

test("tests that RGBToHSL works as expected", () => {
  const pred = RGBToHSL(255, 213, 0)
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})
