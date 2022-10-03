function RGBAToHSLA(r, g, b, a) {
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
  return { h: hue, s: saturation, l: lightness, a: a || 1 }
}

function RGBAToHSVA(r, g, b, a) {}

function RGBAToHex(r, g, b, a) {}

function HSLAToRGBA(h, s, l, a) {}

function HSLAToHSVA(h, s, l, a) {}

function HSLAToHex(h, s, l, a) {}

function HSVAToRGBA(h, s, v, a) {}

function HSVAToHSLA(h, s, v, a) {
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

  return { h, s: saturation, l: lightness, a: a || 1 }
}

function HSVAToHex(h, s, v, a) {}

function hexToRGBA(hex) {}

function hexToHSLA(hex) {
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
  const a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) : 1
  return RGBAToHSLA(r, g, b, a)
}

function hexToHSVA(hex) {}

class Color {
  constructor() {
    const self = this

    let _hue = 0
    let _saturation = 1
    let _lightness = 0.5
    let _alpha = 1

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

    Object.defineProperty(self, "_alpha", {
      configurable: false,
      enumerable: false,

      get() {
        return _alpha
      },

      set(v) {
        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error(
            "The new `_saturation` value must be a number in the range [0, 1]!"
          )
        }
      },
    })
  }

  get rgba() {
    const self = this

    const out = HSLAToRGBA(
      self._hue,
      self._saturation,
      self._lightness,
      self._alpha
    )

    out.toCSSString = function () {
      return `rgba(${out.r}, ${out.g}, ${out.b}, ${out.a})`
    }

    return out
  }

  set rgba(data) {
    if (typeof data === "object" && data !== null) {
      data = [data.r, data.g, data.b, data.a]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `rgba` property must be assigned with an array in the form [r, g, b, a] or with an object in the form {r: 0, g: 0, b: 0, a: 0}!"
      )
    }

    const [r, g, b, a] = data
    const self = this
    const temp = RGBAToHSLA(r, g, b, a)
    self._hue = temp.h
    self._saturation = temp.s
    self._lightness = temp.l
    self._alpha = temp.a
  }

  get hsla() {
    const self = this

    const out = {
      h: self._hue,
      s: self._saturation,
      l: self._lightness,
      a: self._alpha,
    }

    out.toCSSString = function () {
      return `hsla(${out.h}, ${out.s}, ${out.l}, ${out.a})`
    }

    return out
  }

  set hsla(data) {
    const self = this

    if (typeof data === "object" && data !== null) {
      data = [data.h, data.s, data.l, data.a]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsla` property must be assigned with an array in the form [h, s, l, a] or with an object in the form {h: 0, s: 0, l: 0, a: 0}!"
      )
    }

    const [h, s, l, a] = data
    self._hue = h
    self._saturation = s
    self._lightness = l
    self._alpha = a
  }

  get hsva() {
    const self = this

    const out = HSLAToHSVA(
      self._hue,
      self._saturation,
      self._lightness,
      self._alpha
    )

    out.toCSSString = function () {
      return `hsva(${out.h}, ${out.s}, ${out.v}, ${out.a})`
    }

    return out
  }

  set hsva(data) {
    const self = this

    if (typeof data === "object" && data !== null) {
      data = [data.h, data.s, data.v, data.a]
    }

    if (!(data instanceof Array)) {
      throw new Error(
        "The `hsva` property must be assigned with an array in the form [h, s, v, a] or with an object in the form {h: 0, s: 0, v: 0, a: 0}!"
      )
    }

    const [h, s, v, a] = data
    const temp = HSVAToHSLA(h, s, v, a)
    self._hue = temp.h
    self._saturation = temp.s
    self._lightness = temp.l
    self._alpha = temp.a
  }

  get hex() {
    const self = this

    const out = {
      value: HSLAToHex(
        self._hue,
        self._saturation,
        self._lightness,
        self._alpha
      ),
    }

    out.toCSSString = function () {
      return `#${out.value}`
    }

    return out
  }

  set hex(hex) {
    const self = this
    const temp = hexToHSLA(hex)
    self._hue = temp.h
    self._saturation = temp.s
    self._lightness = temp.l
    self._alpha = temp.a
  }
}

if (typeof module !== "undefined") {
  module.exports = Color
}

if (typeof window !== "undefined") {
  window.Color = Color
}
