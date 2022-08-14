import { AmbientLight, Color, DirectionalLight, Vector3 } from "three"
import gui from "../gui"

// ambient light
const ambientLight = new AmbientLight(0xffffff, 0.3)

// ambient light GUI controls
const ambientGui = gui.addFolder('Ambient Light')
ambientGui.add(ambientLight, 'visible')
ambientGui.addColor({ color: ambientLight.color.getHex() }, 'color').onChange(value => ambientLight.color = new Color(value))
ambientGui.add(ambientLight, 'intensity', 0, 1, 0.01)

// Directional light
const directionalLight = new DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(2,2,2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.bottom = - 10
directionalLight.shadow.camera.left = - 10

// Directional light GUI controls
const dirGui = gui.addFolder('Directional Light')
dirGui.add(directionalLight, 'visible')
dirGui.addColor({ color: directionalLight.color.getHex() }, 'color').onChange(value => directionalLight.color = new Color(value))
dirGui.add(directionalLight, 'intensity').min(0).max(5).step(0.01)

export { ambientLight, directionalLight }