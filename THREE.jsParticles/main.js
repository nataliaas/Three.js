import './style.css'
import * as THREE from 'three'
import { Mesh, MathUtils } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
// Debug
//const gui = new dat.GUI()

// Scene
const scene = new THREE.Scene()

//Texture Loader

const loader = new THREE.TextureLoader()
const cross = loader.load('./baranek.png')
//const bgTexture = loader.load('./backroundimage.png');
//scene.background = bgTexture;

// Objects

const geometry = new THREE.CylinderGeometry(.6, .3, .2, 25, 25);


//Particle 

const particlesGeometry = new THREE.BufferGeometry;
const particlesCNT = 1255;

const posArray = new Float32Array(particlesCNT * 8);

for (let i = 0; i < particlesCNT * 3; i++) {
  posArray[i] = Math.random()
  posArray[i] = Math.random() - 0.5
  posArray[i] = (Math.random() - 0.5) - 0.9 * 8
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 18)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))


//Mesh Circle

const circle = new THREE.CircleGeometry(0.2, 64);
const circleMaterial = new THREE.MeshStandardMaterial()

circleMaterial.metalness = 0.8
circleMaterial.roughness = 0.2
circleMaterial.refractionRatio = 1.045
circleMaterial.color = new THREE.Color(0xffff00)

const sun = new THREE.Mesh(circle, circleMaterial)

scene.add(sun);
sun.rotation.set(-0.103, 0.100, .1)
sun.position.set(0.9, 0.4, .9);

// Materials

const material = new THREE.PointsMaterial({
  size: 0.16,
  map: cross,
  transparent: true,
  blending: THREE.AdditiveBlending
})

const materialCylinder = new THREE.PointsMaterial({
  size: 0.009,
  transparent: true
})

// Materials Particle

const particleMaterial = new THREE.PointsMaterial({
  size: 0.009,
  transparent: true

})

// Mesh
const mesh = new THREE.Points(geometry, materialCylinder)
const particlesMesh = new THREE.Points(particlesGeometry, material)
scene.add(mesh, particlesMesh)
mesh.rotation.x = MathUtils.degToRad(85);
mesh.rotation.y = MathUtils.degToRad(85);
mesh.rotation.z = MathUtils.degToRad(358);
mesh.position.set(1, 0.45, 0.9);
materialCylinder.color = new THREE.Color(0xfeff90)


// Lights

const pointLight = new THREE.SpotLight(0xffffff, 101)
pointLight.position.x = 6
pointLight.position.y = 5
pointLight.position.z = 5
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
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
const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({


})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'), 1)


// Mousemove

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event) {
  mouseY = event.clientX
  mouseX = event.clientY
}

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // Update objects

  // mesh.rotation.x = .1 * elapsedTime
     mesh.rotation.y = .1 * elapsedTime
  
  // mesh.rotation.z = .1 * elapsedTime

  particlesMesh.rotation.y = -.2 * elapsedTime

  if (mouseX > 0) {
    particlesMesh.rotation.z = mouseY * (elapsedTime * 0.00008)
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00008)
  }

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)

}

tick()

document.body.appendChild(renderer.domElement)

// Console

console.log(scene)
console.log(camera)
console.log(renderer)
console.log(mesh)
console.log(material)
console.log(Mesh)
console.log(dat)
console.log(OrbitControls)

