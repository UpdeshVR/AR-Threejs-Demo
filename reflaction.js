const responsiveImmersiveComponent = {
    init() {
      const onAttach = ({sessionAttributes}) => {
        const realtimeBall = document.getElementById('model')
  
        const s = sessionAttributes
  
        const isDesktop = !s.cameraLinkedToViewer && !s.controlsCamera && !s.fillsCameraTexture && !s.supportsHtmlEmbedded && s.supportsHtmlOverlay && !s.usesMediaDevices && !s.usesWebXr
        const isHMD = s.cameraLinkedToViewer && s.controlsCamera && !s.fillsCameraTexture && s.supportsHtmlEmbedded && !s.supportsHtmlOverlay && !s.usesMediaDevices && s.usesWebXr
        const isMobile = !s.cameraLinkedToViewer && !s.controlsCamera && s.fillsCameraTexture && !s.supportsHtmlEmbedded && s.supportsHtmlOverlay && s.usesMediaDevices && !s.usesWebXr
  
        if (isDesktop) {
          // Desktop specific behavior goes here
          realtimeBall.setAttribute('reflections', 'type: static')
        } else if (isHMD) {
          // Head mounted display specific behavior goes here
          const isVRHMD = this.el.sceneEl.xrSession.environmentBlendMode === 'opaque'
          const isARHMD = this.el.sceneEl.xrSession.environmentBlendMode === 'additive' || 'alpha-blend'
          realtimeBall.setAttribute('reflections', 'type: static')
        } else if (isMobile) {
          // Mobile-specific behavior goes here
          realtimeBall.setAttribute('reflections', 'type: realtime')
        }
      }
      const onxrloaded = () => {
        XR8.addCameraPipelineModules([{'name': 'responsiveImmersive', onAttach}])
      }
      window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)
    },
  }
  export {responsiveImmersiveComponent}
  