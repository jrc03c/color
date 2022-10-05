const HSLToCMYK = require("./hsl-to-cmyk.js")

test("tests that HSLToCMYK works as expected", () => {
  const pred = HSLToCMYK(90, 1, 0.25)
  const truth = { c: 0.5, m: 0, y: 1, k: 0.5 }
  expect(Math.abs(pred.c - truth.c)).toBeLessThan(0.01)
  expect(Math.abs(pred.m - truth.m)).toBeLessThan(0.01)
  expect(Math.abs(pred.y - truth.y)).toBeLessThan(0.01)
  expect(Math.abs(pred.k - truth.k)).toBeLessThan(0.01)
})
