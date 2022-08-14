import 'normalize.css'
import './style.css'
import {WebGLRenderer} from 'three'
import {debounce} from "lodash"
import scene from './scene' 
import camera from './camera'
import canvas from './canvas'
import './controls'

// render
const renderer = new WebGLRenderer({ canvas })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// event handlers
window.addEventListener('resize', debounce( event => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}, 100 ) )

// frame tick
function tick() {
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
}

tick()