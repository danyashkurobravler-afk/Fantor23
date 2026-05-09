// Storm Probe Minimal Demo — Game core
// (c) 2026 danyashkurobravler-afk
// Mini Three.js runner with tornado and probe mechanics

let Game = {
  state: 'menu', cars: 1, balance: 1000, probes: [], tornado:null, car:null,

  start: function() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    Game.state = 'game';
    initGame();
    animate();
    showHUD(true);
  },
  menu: function(type) {
    // Show corresponding menu panel
    ['garage','map','adminPanel'].forEach(id => {
      document.getElementById(id) ? document.getElementById(id).style.display = (type==id.replace('Panel','')) ? 'flex':'none' : 0;
    });
  }
};

function showHUD(show) {
  let el = document.getElementById('gameHUD');
  if(el) el.style.display = show?'block':'none';
}

// --- Three.js SCENE ---
let scene, camera, renderer;
function initGame() {
  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x232946);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({canvas:document.getElementById('game')});
  renderer.setSize(window.innerWidth, window.innerHeight);
  // ground
  let ground = new THREE.Mesh(new THREE.PlaneGeometry(300,300), new THREE.MeshPhongMaterial({color:0x8B9D88}));
  ground.rotation.x = -Math.PI/2; scene.add(ground);
  // lighting
  let hemi = new THREE.HemisphereLight(0xffffbb, 0x222233, 1.23);
  scene.add(hemi);
  // tornado
  let tornadoGeom = new THREE.CylinderGeometry(0.5,2.5,10,32,1,true);
  let tornadoMat = new THREE.MeshStandardMaterial({color:0xbbc4de, opacity:0.52, transparent:true});
  Game.tornado = new THREE.Mesh(tornadoGeom, tornadoMat);
  Game.tornado.position.set(6,5,0);
  scene.add(Game.tornado);
  // car
  let car = new THREE.Group();
  let body = new THREE.Mesh(new THREE.BoxGeometry(2.6,0.9,1.2), new THREE.MeshPhongMaterial({color:0x4f5d75}));
  car.add(body);
  let wheelMat = new THREE.MeshPhongMaterial({color:0x222220});
  for(let dx of [-1.1,1.1]) for(let dz of [-0.55,0.55]){
    let wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.22,0.22,0.4,16), wheelMat);
    wheel.rotation.z=Math.PI/2; wheel.position.set(dx,-0.5,dz); car.add(wheel);
  }
  car.position.set(0,0.48,0);
  scene.add(car); Game.car = car;
  camera.position.set(-6,4,10);
  camera.lookAt(car.position);
  // HUD
  if(!document.getElementById('gameHUD')){
    let hud = document.createElement('div');
    hud.setAttribute('id','gameHUD');
    hud.innerHTML = '<div style="background:#252a;padding:1em 2em;border-radius:1em;min-width:13em;">💨 Торнадо близко!<br/>$ <span id="money">'+Game.balance+'</span></div>';
    document.body.appendChild(hud);
  }
}
function animate(){
  if(Game.state!=="game")return;
  requestAnimationFrame(animate);
  Game.tornado.rotation.y+=0.017;
  Game.tornado.position.x -= 0.01; // двигается медленно
  Game.car.position.x += 0.017; // машина катится
  camera.position.x = Game.car.position.x-4.7;
  renderer.render(scene, camera);
}

window.Game = Game;
window.addEventListener('resize',()=>{
  if(camera&&renderer){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  }
});
