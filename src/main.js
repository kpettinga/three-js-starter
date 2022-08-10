import 'normalize.css'
import './style.css'
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, AmbientLight, Color, MeshStandardMaterial, DirectionalLight, CameraHelper, DirectionalLightHelper} from 'three'
import { GUI } from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {debounce} from "lodash"

const gui = new GUI()

// scene
const scene = new Scene()

// canvas
const canvas = document.getElementById('canvas')

// render
const renderer = new WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// camera
const camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100)
scene.add(camera)

// event handlers
window.addEventListener('resize', debounce( event => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}, 100 ) )

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Cube
const geometry = new BoxGeometry(1,1,1)
const material = new MeshStandardMaterial({ color: 0x049ef4 })
const mesh = new Mesh(geometry, material)
scene.add(mesh)

// Cube GUI controls
const materialGui = gui.addFolder('Cube Material')
materialGui.addColor({ color: material.color.getHex() }, 'color').onChange( color => material.color = new Color(color) )
materialGui.add( material, 'metalness', 0, 1, 0.1 )
materialGui.add( material, 'roughness', 0, 1, 0.1 )

// update camera
camera.position.set(7,5,3)
camera.lookAt(mesh.position)

// ambient light
const ambientLight = new AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

// ambient light GUI controls
const ambientGui = gui.addFolder('Ambient Light')
ambientGui.add(ambientLight, 'visible')
ambientGui.addColor({ color: ambientLight.color.getHex() }, 'color').onChange(value => ambientLight.color = new Color(value))
ambientGui.add(ambientLight, 'intensity', 0, 1, 0.01)

// Directional light
const dirLight = new DirectionalLight(0xffffff, 0.8)
dirLight.castShadow = true
dirLight.shadow.mapSize.width = 1024
dirLight.shadow.mapSize.height = 1024
dirLight.shadow.camera.near = 1
dirLight.shadow.camera.far = 6
dirLight.shadow.camera.top = 2
dirLight.shadow.camera.right = 2
dirLight.shadow.camera.bottom = - 2
dirLight.shadow.camera.left = - 2
dirLight.position.set(2, 2, - 1)
const dirLightHelper = new DirectionalLightHelper(dirLight)
scene.add(dirLight, dirLightHelper)

// Directional light GUI controls
const dirGui = gui.addFolder('Directional Light')
dirGui.add(dirLight, 'visible')
dirGui.addColor({ color: dirLight.color.getHex() }, 'color').onChange(value => dirLight.color = new Color(value))
dirGui.add(dirLight, 'intensity').min(0).max(1).step(0.01)


// frame tick
function tick() {
    controls.update
    renderer.render(scene, camera)
    mesh.rotation.y += 0.01
    requestAnimationFrame(tick)
}

tick()