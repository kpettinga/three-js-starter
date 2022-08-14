import { BoxGeometry, Color, Mesh, MeshStandardMaterial } from "three"
import gui from "../gui"

// Cube
const geometry = new BoxGeometry(1,1,1)
const material = new MeshStandardMaterial({ color: 0x049ef4 })
const cube = new Mesh(geometry, material)

// Cube GUI controls
const materialGui = gui.addFolder('Cube Material')
materialGui.addColor({ color: material.color.getHex() }, 'color').onChange( color => material.color = new Color(color) )
materialGui.add( material, 'metalness', 0, 1, 0.1 )
materialGui.add( material, 'roughness', 0, 1, 0.1 )

export default cube