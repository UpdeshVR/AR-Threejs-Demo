const nextButtonComponent = () => ({
    init() {
      const animationList = ['bend', 'led', '2x', 'ice', 'dualfan', 'modes', 'toughglass', 'shine']
  
      let idx = 0  // Start with the 2nd animation because the model starts with idle animation
  
      const model = document.getElementById('model')
      const ledmodel = document.getElementById('led-model')
      const bendmodel = document.getElementById('bend-model')
      const icemodel = document.getElementById('ice-model')
      const fanmodel = document.getElementById('fan-model')
      const modesmodel = document.getElementById('modes-model')
      const toughglassmodel = document.getElementById('toughglass-model')
      const shinemodel = document.getElementById('shine-model')
    const place = document.getElementById('btn3')
    const carouselcontainer = document.querySelector('.carousel-container')

    const instructioninfo = document.querySelector('.instruction-info')
    const arScreen = document.querySelector('.ar-screen')
    let hasPlacedModel = false

  
      // ui modelsglb
      const uimodel = document.getElementById('2xui_1_model')
      const bendui = document.getElementById('bendui_1_model')
      const dualfanui = document.getElementById('dualfanui_model')
      const iceui = document.getElementById('iceui_model')
      const ledui = document.getElementById('ledui_1_model')
      const modeui = document.getElementById('modeui_model')
      const shineui = document.getElementById('shineui_model')
      const toughglassui = document.getElementById('toughglassui_model')
      const viewbtn = document.getElementById('view-btn')
      const startScreen = document.querySelector('.start-screen')
  
      const nextButton = document.getElementById('nextbutton')
  
      // video texture
      const vid = document.querySelector('#video')
  
      const videoTexture = new THREE.VideoTexture(vid)
      // UI
  
      const track = document.querySelector('.carousel-track')
      const slides = Array.from(track.children)
      function handleArScreenClick() {
        // scene.emit('recenter')
        console.log('cursor clicked')
      }
      viewbtn.addEventListener('click', () => {
        startScreen.style.display = 'none'
        arScreen.style.display = 'block'
        if (hasPlacedModel !== true) {
          hasPlacedModel = true
          instructioninfo.style.display = 'flex'
          // scene.emit('recenter')
          // Add raycaster to camera
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
      let currentIndex = 0
      place.addEventListener('click', () => {
        
      })
      console.log('track.offsetWidth', track.offsetWidth)
  
      const updateSlideDimensions = () => {
        const slideWidth = slides[0].getBoundingClientRect().width
        const centerOffset = (track.offsetWidth - slideWidth) / 2
        return {slideWidth, centerOffset}
      }
  
      const updateSlidePosition = () => {
        const {slideWidth, centerOffset} = updateSlideDimensions()
  
        const currentSlide = track.querySelector('.current-slide')
        if (currentSlide) {
          currentSlide.classList.remove('current-slide')
        }
        slides[currentIndex].classList.add('current-slide')
  
        const trackPosition = (-currentIndex * slideWidth) + centerOffset
  
        console.log('centerOffset', centerOffset)
        console.log('track.offsetWidth', track.offsetWidth)
        console.log(`Track Position: ${trackPosition}`)
        track.style.transform = `translateX(${trackPosition}px)`
      }
  
      const handleFilterClick = (index) => {
        currentIndex = index
        updateSlidePosition()
      }
  
      track.addEventListener('click', (event) => {
        const clickedSlide = event.target.closest('.carousel-slide')
        if (!clickedSlide) return
  
        const index = slides.indexOf(clickedSlide)
  
        // idx = index
        nextAnimation(index)
        if (index !== -1) {
          handleFilterClick(index)
        }
      })
  
      let startX = 0
      let endX = 0
  
      const handleTouchStart = (e) => {
        startX = e.touches[0].clientX
      }
  
      const handleTouchMove = (e) => {
        endX = e.touches[0].clientX
      }
  
      const handleTouchEnd = () => {
        const {slideWidth} = updateSlideDimensions()
        const swipeThreshold = slideWidth / 2
  
        if (startX - endX > swipeThreshold) {
          if (currentIndex < slides.length - 1) {
            currentIndex++
            nextAnimation(currentIndex)
          }
        } else if (endX - startX > swipeThreshold) {
          if (currentIndex > 0) {
            currentIndex--
            nextAnimation(currentIndex)
          }
        }
  
        updateSlidePosition()
      }
  
      track.addEventListener('touchstart', handleTouchStart)
      track.addEventListener('touchmove', handleTouchMove)
      track.addEventListener('touchend', handleTouchEnd)
  
      // updateSlidePosition()
  
      window.addEventListener('resize', () => {
        updateSlidePosition()
      })
  
      // document.addEventListener('DOMContentLoaded', () => {
      //   updateSlidePosition()
      // })
  
      // window.addEventListener('load', () => {
      //   setTimeout(updateSlidePosition, 100)  // Ensure everything is loaded, add slight delay if necessary
      // })
  
      function showInfo(index) {
        // const topInfoImg = document.querySelectorAll('.top-info img')
  
        // topInfoImg.forEach((img, i) => {
        //   if (i == index) {
        //     img.style.display = 'block'
        //   } else {
        //     img.style.display = 'none'
        //   }
        // })
      }
  
      // nextButton.style.display = 'block'
  
      const nextAnimation = (index) => {
        model.removeAttribute('animation-mixer')
        ledmodel.removeAttribute('animation-mixer')
        bendmodel.removeAttribute('animation-mixer')
        fanmodel.removeAttribute('animation-mixer')
        icemodel.removeAttribute('animation-mixer')
        modesmodel.removeAttribute('animation-mixer')
        toughglassmodel.removeAttribute('animation-mixer')
        // ui anim remove
        uimodel.removeAttribute('animation-mixer')
        bendui.removeAttribute('animation-mixer')
        dualfanui.removeAttribute('animation-mixer')
        iceui.removeAttribute('animation-mixer')
        ledui.removeAttribute('animation-mixer')
        modeui.removeAttribute('animation-mixer')
        shineui.removeAttribute('animation-mixer')
        toughglassui.removeAttribute('animation-mixer')
  
        const obj = fanmodel.getObject3D('mesh')
        idx = index
  
        showInfo(idx)
  
        console.log(currentIndex)
  
        const mesh = obj.getObjectByName('two_fan')
        switch (idx) {
          case 0:
          // bend animation
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            bendmodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            bendui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            console.log(`Play Animation${idx}`)
            break
          case 1:
          // LED animation
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            ledmodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            ledui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
  
            console.log(`Play Animation${idx}`)
            break
          case 2:
          // 2X animation
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            uimodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
  
            console.log(`Play Animation${idx}`)
            break
          case 3:
          // ice Animation
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            icemodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            iceui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            console.log(`Play Animation${idx}`)
            break
          case 4:
          // fan animation
  
            mesh.material.map = videoTexture
            vid.play()
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            fanmodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            dualfanui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
  
            console.log(`Play Animation${idx}`)
            break
          case 5:
          // modes
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            modesmodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            modeui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
  
            console.log(`Play Animation${idx}`)
            break
          case 6:
          // tough Glass animation
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            toughglassmodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            toughglassui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            console.log(`Play Animation${idx}`)
            break
  
          case 7:
          // tough Glass animation
            model.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            shinemodel.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            shineui.setAttribute('animation-mixer', {
              clip: animationList[idx],
              loop: 'once',
              crossFadeDuration: 0.4,
            })
            console.log(`Play Animation${idx}`)
            break
          default:
            console.log(`Sorry, we are out of ${idx}.`)
        }
      }
      // nextButton.onclick = nextAnimation  // Switch to the next animation when the button is pressed.
    },
    
  })
  
  export {nextButtonComponent}
  