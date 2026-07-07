/* ============================================================
   PROXY — 3D Cube Engine
   Handles premium mouse-hover interactive transformations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  setupCubeEngine();
});

function setupCubeEngine() {
  const wrappers = document.querySelectorAll('.cube-wrapper');

  wrappers.forEach(wrapper => {
    const cube = wrapper.querySelector('.cube-scene');
    if (!cube) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate angles based on mouse offset relative to wrapper center
      const rotX = -y / 3.5 - 12; // Base rotation: -12deg
      const rotY = x / 3.5 + 22;  // Base rotation: 22deg
      
      // Volumetric tilt transformation
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.08)`;
      
      // Dynamically shift volumetric shadow offset based on mouse position
      const shadow = wrapper.querySelector('.cube-shadow');
      if (shadow) {
        const shadowX = (x / rect.width) * 15;
        const shadowY = (y / rect.height) * 5;
        shadow.style.transform = `translate(${shadowX}px, ${shadowY}px) scale(0.95)`;
        shadow.style.opacity = '0.6';
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      // Revert smoothly to static perspective
      cube.style.transform = 'rotateX(-12deg) rotateY(22deg) scale(1)';
      const shadow = wrapper.querySelector('.cube-shadow');
      if (shadow) {
        shadow.style.transform = 'translate(0px, 0px) scale(1)';
        shadow.style.opacity = '0.4';
      }
    });
  });
}
