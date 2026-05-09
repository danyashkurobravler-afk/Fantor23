export function initTornado(scene){

const tornado = new THREE.Group();

for(let i=0;i<18;i++){

 const part = new THREE.Mesh(
  new THREE.CylinderGeometry(2+i*1.5,1+i*1.2,8,10,1,true),
  new THREE.MeshBasicMaterial({
   color:0xaab8c7,
   transparent:true,
   opacity:0.18,
   side:THREE.DoubleSide
  })
 );

 part.position.y = i*6;
 tornado.add(part);
}

tornado.position.set(0,0,-200);

scene.add(tornado);

return tornado;
}
