import { useLoader } from "@react-three/fiber"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"

// This is a hook that will return the system font for 3D text
export function useSystemFont() {
  // You can use a basic system font that's included with Three.js
  const font = useLoader(FontLoader, "/fonts/helvetiker_regular.typeface.json")
  return font
}

