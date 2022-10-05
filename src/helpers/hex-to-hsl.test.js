const hexToHSL = require("./hex-to-hsl.js")

test("tests that hexToHSL works as expected", () => {
  const pred1 = hexToHSL("#ffd400")
  const pred2 = hexToHSL("ffd400")
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred1.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred1.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred1.l - truth.l)).toBeLessThan(0.01)

  expect(Math.abs(pred2.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred2.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred2.l - truth.l)).toBeLessThan(0.01)
})
