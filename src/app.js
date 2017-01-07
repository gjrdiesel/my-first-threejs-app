const THREE = require('three')
const key = require('key')
const $ = require('jquery')

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 1 );
var loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/cube/pisa/' );

var textureCube = loader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 15;

var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += .001;
	cube.rotation.y += .001;

	if( wantsToMoveX > 0 ){
		cube.position.x += .01;
	} else {
		cube.position.x -= .01;
	}


	if( wantsToMoveY > 0 ){
		cube.position.y += .01;
	} else {
		cube.position.y -= .01;
	}

	renderer.render(scene, camera);
};

let wantsToMoveX = 0;
let wantsToMoveY = 0;

window.onclick = function(event) {

	let clickX = ((event.x) - (window.innerHeight/2)+60)*2
	let clickY = (((event.y) - (window.innerWidth/2)-60)*-1)*2

	wantsToMoveX = clickX*.01
	wantsToMoveY = clickY*.01
	
	$('body').append('<img class="clickMarker" src="click.gif" style="position:absolute;top:'+(event.y-30)+'px;left:'+(event.x-30)+'px;">')

	setTimeout(()=>{
		$('.clickMarker').remove();
	}, 1000 )
}

window.onkeydown = function(event) {
	// event.preventDefault()
}

render();