// Component that places trees at cursor location when screen is tapped
const tapPlaceCursorComponent = {
  init() {
    const place = document.getElementById('btn3')
    const nextbutton = document.getElementById('nextbutton')
    const viewbtn = document.getElementById('view-btn')
    const startScreen = document.querySelector('.start-screen')
    const arScreen = document.querySelector('.ar-screen')
    const instructioninfo = document.querySelector('.instruction-info')

    const carouselcontainer = document.querySelector('.carousel-container')
    // const reduceBending = document.querySelector('#reduceBending')
    const bendmodel = document.getElementById('bend-model')
    const model = document.getElementById('model')
    const bendui = document.getElementById('bendui_1_model')

    const scene = this.el.sceneEl
    this.raycaster = new THREE.Raycaster()
    this.camera = document.getElementById('camera')
    this.threeCamera = this.camera.getObject3D('camera')
    this.ground = document.getElementById('ground')
    this.model = document.getElementById('model')

    let hasPlacedModel = false

    // 2D coordinates of the raycast origin, in normalized device coordinates (NDC)---X and Y
    // components should be between -1 and 1.  Here we want the cursor in the center of the screen.
    this.rayOrigin = new THREE.Vector2(0, 0)

    this.cursorLocation = new THREE.Vector3(0, 0, 0)
    viewbtn.addEventListener('click', () => {
      startScreen.style.display = 'none'
      arScreen.style.display = 'block'
    })
    function handleArScreenClick() {
      scene.emit('recenter')
      console.log('cursor clicked')
    }
    place.addEventListener('click', () => {
      if (hasPlacedModel !== true) {
        hasPlacedModel = true
        instructioninfo.style.display = 'flex'

        this.model.setAttribute('position', this.el.object3D.position)
        this.model.setAttribute('visible', 'true')
        this.model.setAttribute('rotation', '0 0 0')
        // scene.emit('recenter')



        // Add raycaster to camera
        this.camera.setAttribute('raycaster', 'objects: .cantap')
        place.style.display = 'none'
        arScreen.style.pointerEvents = 'none'
        arScreen.removeEventListener('click', handleArScreenClick)

        nextbutton.style.display = 'block'
        setTimeout(() => {
          carouselcontainer.style.visibility = 'visible'
          carouselcontainer.style.opacity = '1'
          carouselcontainer.style.pointerEvents = 'auto'
          // reduceBending.style.display = 'block'
          instructioninfo.style.display = 'none'
          model.setAttribute('animation-mixer', {
            clip: 'bend',
            loop: 'once',
            crossFadeDuration: 0.4,
          })
          bendmodel.setAttribute('animation-mixer', {
            clip: 'bend',
            loop: 'once',
            crossFadeDuration: 0.4,
          })
          bendui.setAttribute('animation-mixer', {
            clip: 'bend',
            loop: 'once',
            crossFadeDuration: 0.4,
          })
        }, 4000)

        console.log('Play Animation 0')
        // scene.emit('recenter')
      }
    })
    arScreen.addEventListener('click', handleArScreenClick)
  },
  tick() {
    // Raycast from camera to 'ground'
    this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera)
    const intersects = this.raycaster.intersectObject(this.ground.object3D, true)

    if (intersects.length > 0) {
      const [intersect] = intersects
      this.cursorLocation = intersect.point
    }
    this.el.object3D.position.y = 0.1
    this.el.object3D.position.lerp(this.cursorLocation, 0.4)
    this.el.object3D.rotation.y = this.threeCamera.rotation.y
  },
}

export {tapPlaceCursorComponent}
