function RGBToHSL(r, g, b) {
  if (
    isNaN(r) ||
    isNaN(g) ||
    isNaN(b) ||
    r < 0 ||
    r > 255 ||
    g < 0 ||
    g > 255 ||
    b < 0 ||
    b > 255
  ) {
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

function RGBToHSV(r, g, b) {}

function RGBToHex(r, g, b) {}

function HSLToRGB(h, s, l) {}

function HSLToHSV(h, s, l) {}

function HSLToHex(h, s, l) {}

function HSVToRGB(h, s, v) {}

function HSVToHSL(h, s, v) {
  if (
    isNaN(h) ||
    isNaN(s) ||
    isNaN(v) ||
    h < 0 ||
    h >= 360 ||
    s < 0 ||
    s > 1 ||
    v < 0 ||
    v > 1
  ) {
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

function HSVToHex(h, s, v) {}

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

function hexToHSV(hex) {}

class Color {
  constructor() {
    const self = this

    let _hue = 0
    let _saturation = 1
    let _lightness = 0.5

    Object.defineProperty(self, "_hue", {
      configurable: false,
      enumerable: false,

      get() {
        return _hue
      },

      set(v) {
        if (isNaN(v) || v < 0 || v >= 360) {
          throw new Error(
            "The new `_hue` value must be a number in the range [0, 360)!"
          )
        }

        _hue = v - Math.floor(v / 360) * 360
      },
    })

    Object.defineProperty(self, "_saturation", {
      configurable: false,
      enumerable: false,

      get() {
        return _saturation
      },

      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_saturation` value must be a number in the range [0, 1]!"
          )
        }

        _saturation = v
      },
    })

    Object.defineProperty(self, "_lightness", {
      configurable: false,
      enumerable: false,

      get() {
        return _lightness
      },

      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_lightness` value must be a number in the range [0, 1]!"
          )
        }

        _lightness = v
      },
    })
  }

  get rgb() {
    const self = this

    const out = HSLToRGB(self._hue, self._saturation, self._lightness)

    out.toCSSString = function () {
      return `rgb(${out.r}, ${out.g}, ${out.b})`
    }

    return out
  }

  set rgb(data) {
    if (typeof data === "object" && data !== null) {
      data = [data.r, data.g, data.b]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `rgb` property must be assigned with an array in the form [r, g, b] or with an object in the form {r: 0, g: 0, b: 0}!"
      )
    }

    const [r, g, b] = data
    const self = this
    const temp = RGBToHSL(r, g, b)
    self._hue = temp.h
    self._saturation = temp.s
    self._lightness = temp.l
  }

  get hsl() {
    const self = this

    const out = {
      h: self._hue,
      s: self._saturation,
      l: self._lightness,
    }

    out.toCSSString = function () {
      return `hsl(${out.h}, ${out.s}, ${out.l})`
    }

    return out
  }

  set hsl(data) {
    const self = this

    if (typeof data === "object" && data !== null) {
      data = [data.h, data.s, data.l]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsl` property must be assigned with an array in the form [h, s, l] or with an object in the form {h: 0, s: 0, l: 0}!"
      )
    }

    const [h, s, l] = data
    self._hue = h
    self._saturation = s
    self._lightness = l
  }

  get hsv() {
    const self = this

    const out = HSLToHSV(self._hue, self._saturation, self._lightness)

    out.toCSSString = function () {
      return `hsv(${out.h}, ${out.s}, ${out.v})`
    }

    return out
  }

  set hsv(data) {
    const self = this

    if (typeof data === "object" && data !== null) {
      data = [data.h, data.s, data.v]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsv` property must be assigned with an array in the form [h, s, v] or with an object in the form {h: 0, s: 0, v: 0}!"
      )
    }

    const [h, s, v] = data
    const temp = HSVToHSL(h, s, v)
    self._hue = temp.h
    self._saturation = temp.s
    self._lightness = temp.l
  }

  get hex() {
    const self = this

    const out = {
      value: HSLToHex(self._hue, self._saturation, self._lightness),
    }

    out.toCSSString = function () {
      return `#${out.value}`
    }

    return out
  }

  set hex(hex) {
    const self = this
    const temp = hexToHSL(hex)
    self._hue = temp.h
    self._saturation = temp.s
    self._lightness = temp.l
  }
}

if (typeof module !== "undefined") {
  module.exports = Color
}

if (typeof window !== "undefined") {
  window.Color = Color
}
