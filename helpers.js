function leftPad(s, n) {
  let out = s.slice()
  while (out.length < n) out = "0" + out
  return out
}

function RGBToHSL(r, g, b) {
  if (isNaN(r) || r < 0 || r > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  if (isNaN(g) || g < 0 || g > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  if (isNaN(b) || b < 0 || b > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const range = max - min
  const midrange = (max + min) / 2

  const hue =
    range === 0
      ? 0
      : max === r
      ? 60 * (0 + (g - b) / range)
      : max === g
      ? 60 * (2 + (b - r) / range)
      : max === b
      ? 60 * (4 + (r - g) / range)
      : NaN

  const saturation =
    midrange === 0 || midrange === 1
      ? 0
      : (max - midrange) / Math.min(midrange, 1 - midrange)

  const lightness = midrange
  return { h: hue, s: saturation, l: lightness }
}

function RGBToHSV(r, g, b) {
  const hsl = RGBToHSL(r, g, b)
  const h = hsl.h
  const v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l)
  const s = v === 0 ? 0 : 2 * (1 - hsl.l / v)
  return { h, s, v }
}

function RGBToHex(r, g, b) {
  if (isNaN(r) || r < 0 || r > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  if (isNaN(g) || g < 0 || g > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  if (isNaN(b) || b < 0 || b > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  r = leftPad(parseInt(r).toString(16), 2)
  g = leftPad(parseInt(g).toString(16), 2)
  b = leftPad(parseInt(b).toString(16), 2)
  return { value: `${r}${g}${b}` }
}

function HSLToRGB(h, s, l) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(l) || l < 0 || l > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  const c = (1 - Math.abs(2 * l - 1)) * s
  const hPrime = h / 60
  const x = c * (1 - Math.abs((hPrime % 2) - 1))
  let temp

  if (hPrime >= 0 && hPrime < 1) {
    temp = [c, x, 0]
  } else if (hPrime >= 1 && hPrime < 2) {
    temp = [x, c, 0]
  } else if (hPrime >= 2 && hPrime < 3) {
    temp = [0, c, x]
  } else if (hPrime >= 3 && hPrime < 4) {
    temp = [0, x, c]
  } else if (hPrime >= 4 && hPrime < 5) {
    temp = [x, 0, c]
  } else {
    temp = [c, 0, x]
  }

  const m = l - c / 2
  const r = (temp[0] + m) * 255
  const g = (temp[1] + m) * 255
  const b = (temp[2] + m) * 255
  return { r, g, b }
}

function HSLToHSV(h, s, l) {
  const { r, g, b } = HSLToRGB(h, s, l)
  return RGBToHSV(r, g, b)
}

function HSLToHex(h, s, l) {
  const { r, g, b } = HSLToRGB(h, s, l)
  return RGBToHex(r, g, b)
}

function HSVToRGB(h, s, v) {
  const hsl = HSVToHSL(h, s, v)
  return HSLToRGB(hsl.h, hsl.s, hsl.l)
}

function HSVToHSL(h, s, v) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(v) || v < 0 || v > 0) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  const lightness = v * (1 - s / 2)

  const saturation =
    lightness === 0 || lightness === 1
      ? 0
      : (v - lightness) / Math.min(lightness, 1 - lightness)

  return { h, s: saturation, l: lightness }
}

function HSVToHex(h, s, v) {
  const { r, g, b } = HSVToRGB(h, s, v)
  return RGBToHex(r, g, b)
}

function hexToRGB(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex values must be strings of length 6 or 8!")
  }

  if (hex.length !== 6 && hex.length !== 8) {
    throw new Error("Hex values must be strings of length 6 or 8!")
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return { r, g, b }
}

function hexToHSL(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex values must be strings!")
  }

  hex = hex.replaceAll("#", "").trim()

  if (hex.length !== 6 || hex.length !== 8) {
    throw new Error("Hex values must be 6 or 8 characters in length!")
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return RGBToHSL(r, g, b)
}

function hexToHSV(hex) {
  const { r, g, b } = hexToRGB(hex)
  return RGBToHSV(r, g, b)
}

module.exports = {
  hexToHSL,
  hexToHSV,
  hexToRGB,
  HSLToHex,
  HSLToHSV,
  HSLToRGB,
  HSVToHex,
  HSVToHSL,
  HSVToRGB,
  RGBToHex,
  RGBToHSL,
  RGBToHSV,
}
