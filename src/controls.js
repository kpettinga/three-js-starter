import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import camera from "./camera"
import canvas from "./canvas"

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// frame tick
function tick() {
    controls.update()
    requestAnimationFrame(tick)
}

tick()

export default controls