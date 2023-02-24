import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import * as dat from 'dat.gui'

import "./style.scss"


const canvas = document.querySelector("canvas.webgl")
const clock = new THREE.Clock()

const gui = new dat.GUI()


const textLoader = new THREE.TextureLoader()


const parameters = {
    size: 0.01,
    count: 450100,
    radius: 1,
    branches: 12,
    spin: -2.8,
    spread: 0.467,
    textures: 1,
    pow: 2,
    insideColor: '#ff6030',
    outsideColor: '#1b3984'
}

let geometry = null
let material = null
let points = null
let star = null

const generateGalaxy = () => {
    // destroy particles

    if(points !== null){
        geometry.dispose()
        material.dispose()
        star.dispose()
        scene.remove(points)
    }

    geometry = new THREE.BufferGeometry()
    let positions = new Float32Array(parameters.count * 3)
    let colors = new Float32Array(parameters.count * 3)
    let elementPerLine = parameters.count / parameters.branches
    let insideColor = new THREE.Color(parameters.insideColor)
    let outsideColor = new THREE.Color(parameters.outsideColor)

    for(let i = 0; i < parameters.count; i++){

        let i3 = i * 3
        let radius = Math.random() * parameters.radius
        let branchesAngle = Math.round(i / elementPerLine) * Math.PI * 2 / parameters.branches
        let spinAngle = parameters.spin * radius

        positions[i3  ] = Math.cos(branchesAngle + spinAngle) * radius - (Math.pow((Math.random()), parameters.pow) * (radius + 0.3) * parameters.spread) * (Math.random() - 0.5)
        positions[i3+1] = Math.pow(Math.random(), parameters.pow) * (Math.random() - 0.5) * 0.1
        positions[i3+2] = Math.sin(branchesAngle + spinAngle) * radius - (Math.pow(Math.random(), parameters.pow) * (radius + 0.3) * parameters.spread) * (Math.random() - 0.5)

        // color

        const mixedColor = insideColor.clone()
        mixedColor.lerp(outsideColor, radius / parameters.radius)

        colors[i3  ] = mixedColor.r
        colors[i3+1] = mixedColor.g
        colors[i3+2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    star = textLoader.load(`/GalaxyGenerator/textures/particles/${parameters.textures}.png`)

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        alphaMap: star,
        transparent: true
    })
    points = new THREE.Points(geometry, material)
    scene.add(points); 
}


const scene = new THREE.Scene()

generateGalaxy()


gui.add(parameters, 'size').min(0.001).max(5).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'count').min(1).max(10000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(5).step(0.1).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'spread').min(0).max(1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'textures').min(1).max(13).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'pow').min(2).max(10).step(1).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)




const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 200)
camera.position.z = 2
const control = new OrbitControls(camera, canvas)

renderer.setPixelRatio((Math.min(window.devicePixelRatio, 2)))
renderer.setSize(window.innerWidth, window.innerHeight)


const mainLoop = () => {
    const elapsedTime = clock.getElapsedTime()
    
    points.rotation.y = elapsedTime * 0.1

    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(mainLoop)
}

mainLoop()
