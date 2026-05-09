export function initPlayer(scene){

const car = new THREE.Group();

const body = new THREE.Mesh(
 new THREE.BoxGeometry(5,2,10),
 new THREE.MeshLambertMaterial({color:0x2b6dff})
);

body.position.y = 2;
car.add(body);

scene.add(car);

return car;
}
