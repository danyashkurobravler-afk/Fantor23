export function initWorld(scene){

const ground = new THREE.Mesh(
 new THREE.PlaneGeometry(4000,4000),
 new THREE.MeshLambertMaterial({color:0x1d4720})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);

for(let i=0;i<100;i++){

 const tree = new THREE.Group();

 const trunk = new THREE.Mesh(
  new THREE.CylinderGeometry(.5,.7,4,6),
  new THREE.MeshLambertMaterial({color:0x5b3b1e})
 );

 trunk.position.y = 2;

 const top = new THREE.Mesh(
  new THREE.ConeGeometry(3,7,8),
  new THREE.MeshLambertMaterial({color:0x2f7a35})
 );

 top.position.y = 7;

 tree.add(trunk);
 tree.add(top);

 tree.position.set(
  (Math.random()-.5)*3000,
  0,
  (Math.random()-.5)*3000
 );

 scene.add(tree);
}
}
