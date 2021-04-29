import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load ('/textures/normal.png')
const heightTexture = textureLoader.load ('/textures/height.png')
const albedoTexture = textureLoader.load ('/textures/albedo.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry( .6, .7, 1, 10 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.matalness = 1
material.roughness = 0.5
material.normalMap = normalTexture;
material.heightMap = heightTexture;
material.albedoMap = albedoTexture;

material.color = new THREE.Color(0xffffff)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.09)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x592908, 8.88)
pointLight2.position.x = -0.54
pointLight2.position.y = 0.58
pointLight2.position.z = -4.22
pointLight2.intesity = 8.88

scene.add(pointLight2)

const light2 = gui.addFolder('Light Control')

light2.add(pointLight2.position, 'x').min(-2).max(3).step(0.02)
light2.add(pointLight2.position, 'y').min(-7).max(4).step(0.02)
light2.add(pointLight2.position, 'z').min(-5).max(8).step(0.02)
light2.add(pointLight2, 'intensity').min(0).max(15).step(0.02)

const light2Color = {
    color: 0x592908
}

light2.addColor(light2Color, 'color')
    .onChange(() => {
        pointLight2.color.set(light2Color.color)
    })

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.5)
// scene.add(pointLightHelper)

const pointLight3 = new THREE.PointLight(0x2626c0, 4.11)
pointLight3.position.x = 0.06
pointLight3.position.y = -1.5
pointLight3.position.z = -1.36
pointLight3.intesity = 4.11

scene.add(pointLight3)

const light3 = gui.addFolder('Light Control B')

light3.add(pointLight3.position, 'x').min(-2).max(3).step(0.02)
light3.add(pointLight3.position, 'y').min(-7).max(4).step(0.02)
light3.add(pointLight3.position, 'z').min(-5).max(8).step(0.02)
light3.add(pointLight3, 'intensity').min(0).max(15).step(0.02)

const light3Color = {
    color: 0x2626c0
}

light3.addColor(light3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light3Color.color)
    })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .005
}

window.addEventListener('scroll', updateSphere);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .3 * elapsedTime

    sphere.rotation.x += .2 * (targetX - sphere.rotation.x)
    sphere.rotation.y += .04 * (targetX- sphere.rotation.y)
    sphere.position.z += -.5 * (targetY - sphere.rotation.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()