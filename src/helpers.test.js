const {
  hexToHSL,
  HSLToHex,
  HSLToHSV,
  HSLToRGB,
  HSVToHSL,
  RGBToHSL,
} = require("./helpers.js")

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

test("tests that HSLToHex works as expected", () => {
  const pred = HSLToHex(50, 1, 0.5)
  const truth = { value: "ffd400" }
  expect(pred.value).toBe(truth.value)
})

test("tests that HSLToHSV works as expected", () => {
  const pred = HSLToHSV(50, 1, 0.5)
  const truth = { h: 50, s: 1, v: 1 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.v - truth.v)).toBeLessThan(0.01)
})

test("tests that HSLToRGB works as expected", () => {
  const pred = HSLToRGB(50, 1, 0.5)
  const truth = { r: 255, g: 213, b: 0 }

  expect(Math.abs(pred.r - truth.r)).toBeLessThan(1)
  expect(Math.abs(pred.g - truth.g)).toBeLessThan(1)
  expect(Math.abs(pred.b - truth.b)).toBeLessThan(1)
})

test("tests that HSVToHSL works as expected", () => {
  const pred = HSVToHSL(50, 1, 1)
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})

test("tests that RGBToHSL works as expected", () => {
  const pred = RGBToHSL(255, 213, 0)
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})
