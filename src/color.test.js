const Color = require("./color.js")

test("tests that the Color class works as expected", () => {
  const c = new Color()
  c.rgb = [47, 188, 174]

  expect(Math.abs(c.hsl.h - 174)).toBeLessThan(1)
  expect(Math.abs(c.hsl.s - 0.6)).toBeLessThan(0.01)
  expect(Math.abs(c.hsl.l - 0.4625)).toBeLessThan(0.01)

  expect(Math.abs(c.hsv.h - 174)).toBeLessThan(1)
  expect(Math.abs(c.hsv.s - 0.75)).toBeLessThan(0.01)
  expect(Math.abs(c.hsv.v - 0.74)).toBeLessThan(0.01)

  expect(Math.abs(c.rgb.r - 47)).toBeLessThan(1)
  expect(Math.abs(c.rgb.g - 188)).toBeLessThan(1)
  expect(Math.abs(c.rgb.b - 174)).toBeLessThan(1)

  expect(c.hex.value).toBe("2fbcae")
})
