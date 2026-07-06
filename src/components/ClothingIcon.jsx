"use client"

import {
  PiTShirtFill,
  PiPantsFill,
  PiHoodieFill,
  PiSneakerFill,
  PiBootFill,
  PiBackpackFill,
  PiBeanieFill,
  PiBaseballCapFill,
} from "react-icons/pi"

const icons = {
  tshirt: PiTShirtFill,
  pants: PiPantsFill,
  hoodie: PiHoodieFill,
  sneaker: PiSneakerFill,
  boot: PiBootFill,
  backpack: PiBackpackFill,
  beanie: PiBeanieFill,
  cap: PiBaseballCapFill,
}

export default function ClothingIcon({ name, className, color }) {
  const Icon = icons[name] || PiTShirtFill
  return <Icon className={className} style={color ? { color } : undefined} />
}
