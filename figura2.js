const crossSize = 0.5; // Rozmiar krzyża
const armThickness = 0.1; // Grubość ramion krzyża
const color = 0x3c232c;

const cross = new THREE.Group();

const verticalArmGeometry = new THREE.BoxGeometry(armThickness, crossSize, armThickness);
const horizontalArmGeometry = new THREE.BoxGeometry(crossSize, armThickness, armThickness);
const crossArmMaterial = new THREE.MeshPhongMaterial({ color });

const verticalArm = new THREE.Mesh(verticalArmGeometry, crossArmMaterial);
cross.add(verticalArm);

const horizontalArm = new THREE.Mesh(horizontalArmGeometry, crossArmMaterial);
cross.add(horizontalArm);

const scene = new THREE.Scene({ color: 0xfff });

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var light;
light = new THREE.DirectionalLight();
light.position.set(-9, 7, 5);
camera.add(light);

scene.add(camera);

const pinkMaterial = new THREE.MeshPhongMaterial({ color });

// Pink
const base1 = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 0.15, 100),
  pinkMaterial
);
const base2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.9, 0.9, 0.25, 100),
  pinkMaterial
);
base2.position.y = 0.1;

let AllBase = new THREE.Group();
AllBase.add(base1);
AllBase.add(base2);

const part1 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.4, 0.9, 2, 10),
  pinkMaterial
);

part1.position.set(0, 1, 0);
AllBase.add(part1);

const part2 = new THREE.Mesh(
  new THREE.CylinderGeometry(0.7, 0.8, 0.15, 100),
  pinkMaterial
);

part2.position.y = 1.9;

const ball = new THREE.SphereGeometry(
  Math.PI / 5.5,
  100,
  100,
  Math.PI,
  2 * Math.PI,
  0,
  Math.PI
);

pinkMaterial.side = THREE.DoubleSide;
const part3 = new THREE.Mesh(ball, pinkMaterial);

part3.position.set(0, 2.5, 0);

AllBase.add(part3);
AllBase.add(part2);
AllBase.position.set(0, -4, 0);
AllBase.scale.set(3, 4, 1);
scene.add(AllBase);

// King
const kingBase = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.5, 0.15, 100),
  pinkMaterial
);
const kingBody = new THREE.Mesh(
  new THREE.CylinderGeometry(0.5, 0.6, 1.5, 100),
  pinkMaterial
);
kingBody.position.set(0, 1.2, 0);

const kingHead = new THREE.Mesh(
  new THREE.ConeGeometry(0.2, 0.4, 3),
  pinkMaterial
);


const crownTop = new THREE.Mesh(
  new THREE.ConeGeometry(0.4, 0.6, 100),
  pinkMaterial
);
crownTop.position.set(0, 3.1, 0);

const crownCross = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.2),  // Zwiększono rozmiar krzyża
  pinkMaterial
);
crownCross.position.set(0, 3.35, 0.2); 
crownCross.rotation.x = Math.PI / 2; 

const crownGroup = new THREE.Group();
crownGroup.add(crownTop);
crownGroup.add(crownCross);

kingHead.add(crownGroup); 

const kingGroup = new THREE.Group();
kingGroup.add(kingBase);
kingGroup.add(kingBody);


kingGroup.position.set(0, -4, 0);
kingGroup.scale.set(3, 4, 1);
scene.add(kingGroup);


cross.position.set(0, 9.2, 0); 
cross.scale.set(4, 5, 2);





const chessPieceGroup = new THREE.Group();
chessPieceGroup.add(kingGroup);
chessPieceGroup.add(cross);

scene.add(chessPieceGroup);


camera.position.z = 10;
renderer.render(scene, camera);
