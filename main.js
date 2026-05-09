import { initWorld } from './world.js';
import { initPlayer } from './player.js';
import { initTornado } from './tornado.js';
import { saveGame, loadGame } from './save.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111f);

const camera = new THREE.PerspectiveCamera(70, innerWidth/innerHeight, 0.1, 5000);
camera.position.set(0,15,30);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
document.body.appendChild(renderer.domElement);

const hemi = new THREE.HemisphereLight(0xffffff,0x223344,1.4);
scene.add(hemi);

initWorld(scene);
const player = initPlayer(scene);
const tornado = initTornado(scene);

document.getElementById('fullscreen').onclick = ()=>{
 document.documentElement.requestFullscreen();
};

document.getElementById('play').onclick = ()=>{
 alert('Storm chase started!');
};

loadGame();

function animate(){
 requestAnimationFrame(animate);

 tornado.rotation.y += 0.03;
 tornado.position.x = Math.sin(performance.now()*0.0002)*120;

 camera.lookAt(player.position);

 renderer.render(scene,camera);
}

animate();

window.addEventListener('beforeunload', saveGame);
