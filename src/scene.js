import { DirectionalLightHelper, Scene } from "three";
import camera from "./camera";
import cube from "./scene/cube";
import { ambientLight, directionalLight } from "./scene/lights";

const scene = new Scene()

// Camera
camera.position.set(5, 5, -5)
scene.add(camera)

// Objects
scene.add(cube)

// Lights
scene.add(ambientLight, directionalLight)

// Helpers
const directionalLightHelper = new DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)

export default scene