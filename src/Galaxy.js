import * as THREE from "three"

export default class Galaxy {
    static geometry = null
    static material = null
    static points = null
    static star = null

    static parameters = {
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

    static generator() {
        // destroy particles

        if (this.points !== null) {
            this.geometry.dispose()
            this.material.dispose()
            this.star.dispose()
            this.scene.remove(points)
        }

        this.geometry = new THREE.BufferGeometry()
        let positions = new Float32Array(this.parameters.count * 3)
        let colors = new Float32Array(this.parameters.count * 3)
        let elementPerLine = this.parameters.count / parameters.branches
        let insideColor = new THREE.Color(this.parameters.insideColor)
        let outsideColor = new THREE.Color(this.parameters.outsideColor)

        for (let i = 0; i < this.parameters.count; i++) {

            let i3 = i * 3
            let radius = Math.random() * this.parameters.radius
            let branchesAngle = Math.round(i / elementPerLine) * Math.PI * 2 / this.parameters.branches
            let spinAngle = this.parameters.spin * radius

            positions[i3] = Math.cos(branchesAngle + spinAngle) * radius - (Math.pow((Math.random()), this.parameters.pow) * (radius + 0.3) * parameters.spread) * (Math.random() - 0.5)
            positions[i3 + 1] = Math.pow(Math.random(), this.parameters.pow) * (Math.random() - 0.5) * 0.1
            positions[i3 + 2] = Math.sin(branchesAngle + spinAngle) * radius - (Math.pow(Math.random(), this.parameters.pow) * (radius + 0.3) * parameters.spread) * (Math.random() - 0.5)

            // color

            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor, radius / this.parameters.radius)

            colors[i3] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        this.star = textLoader.load(`/textures/particles/${this.parameters.textures}.png`)

        this.material = new THREE.PointsMaterial({
            size: this.parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            alphaMap: star,
            transparent: true
        })
        this.points = new THREE.Points(geometry, material)
        return this.points;
    }
}