/*
    Defining our variables
    world and viewport are DOM elements,
    worldXAngle and worldYAngle are floats that hold the world rotations,
    d is an int that defines the distance of the world from the camera 
*/
var world = document.getElementById( 'world' ),
    viewport = document.getElementById( 'viewport' ),
    worldXAngle = 0,
    worldYAngle = 0,
    d = 0;

/*
	Event listener to transform mouse position into angles 
    from -180 to 180 degress, both vertically and horizontally
*/
window.addEventListener( 'mousemove', function( e ) {
    worldYAngle = -( 0.5 - ( e.clientX / window.innerWidth ) ) * 360;
    worldXAngle = ( 0.5 - ( e.clientY / window.innerHeight ) ) * 360;
    updateView();
} );
window.addEventListener('mousewheel', onContainerMouseWheel);
window.addEventListener('DOMMouseScroll', onContainerMouseWheel);

/*
    Changes the transform property of world to be
    translated in the Z axis by d pixels,
    rotated in the X axis by worldXAngle degrees and
    rotated in the Y axis by worldYAngle degrees.
*/

function updateView() {
    var t = 'translateZ( ' + d + 'px ) rotateX( ' + worldXAngle + 'deg) rotateY( ' + worldYAngle + 'deg)';
    world.style.webkitTransform = t;
}



///////////////
/*
    objects is an array of cloud bases
    layers is an array of cloud layers
*/
var objects = [],
    layers = [];

/*
    Clears the DOM of previous clouds bases 
    and generates a new set of cloud bases
*/
function generate() {
    objects = [];
    layers = [];
    if ( world.hasChildNodes() ) {
        while ( world.childNodes.length >= 1 ) {
            world.removeChild( world.firstChild );       
        } 
    }
    //Create j amount of clouds
    for( var j = 0; j < 10; j++ ) {
    	//Push cloud created from createCloud() function to objects array
        objects.push( createCloud() );
    }
}
generate();
function makeMoon(){
    var moon = document.createElement( 'div' );
    moon.className = 'moon';
    world.appendChild( moon);
    var random_x = 256 - ( Math.random() * 512 );
    var random_y = 256 - ( Math.random() * 512 );
    var random_z = 256 - ( Math.random() * 512 );
    moon.data = {
        x: random_x,
        y: random_y,
        z: random_z
    };

    var t = 'translateX( ' + random_x + 'px ) translateY( ' + random_y + 'px ) translateZ( ' + random_z + 'px )';
    moon.style.webkitTransform = t;
    objects.push(moon);
};
makeMoon();

/*
    Creates a single cloud base: a div in world
    that is translated randomly into world space.
    Each axis goes from -256 to 256 pixels.
*/
function createCloud() {
    var div = document.createElement( 'div'  );
    div.className = 'cloudBase';
	var random_x = 256 - ( Math.random() * 512 );
	var random_y = 256 - ( Math.random() * 512 );
	var random_z = 256 - ( Math.random() * 512 );


    var t = 'translateX( ' + random_x + 'px ) translateY( ' + random_y + 'px ) translateZ( ' + random_z + 'px )';
    div.style.webkitTransform = t;
    var colorR = Math.floor(Math.random()*255);
    var colorG = Math.floor(Math.random()*255);
    var colorB = Math.floor(Math.random()*255);
    // div.style.backgroundColor = "rgb(" + colorR+"," + colorG+ ","+ colorB + ")";
    world.appendChild( div );

//add layers to cloud
    for( var j = 0; j < 10 + Math.round( Math.random() * 10 ); j++ ) {
        var cloud = document.createElement( 'img' );
        cloud.setAttribute('src', "cloud.png");
        cloud.className = 'cloudLayer';
        
       	// var random_x = 256 - ( Math.random() * 512 );
		// var random_y = 256 - ( Math.random() * 512 );
        var random_z = 100 - ( Math.random() * 200 ); 
		var random_d = Math.random() * 360;
		var random_s = .25 + Math.random();
		// add an object for data to allow for the 3D effect
		cloud.data = { 
			x: random_x,
			y: random_y,
			z: random_z,
			a: random_d,
			s: random_s,
			speed: .1 * Math.random()
		};		     
		// var random_y = 256 - ( Math.random() * 512 );
        var t = 'translateX( ' + random_x + 'px ) translateY( ' + random_y + 'px ) translateZ( ' + random_z + 'px ) rotateZ( ' + random_d + 'deg ) scale( ' + random_s + ' )';
        cloud.style.webkitTransform = t;
        
        div.appendChild( cloud );
        layers.push( cloud );
    }
 

    return div;
}

//function to determine z translation viewpoint
function onContainerMouseWheel( event ) {
		
	event = event ? event : window.event;
	d = d - ( event.detail ? event.detail * -5 : event.wheelDelta / 8 );
	updateView();
	
}


/*
    Iterate layers[], update the rotation and apply the
    inverse transformation currently applied to the world.
    Notice the order in which rotations are applied.
*/
function update (){
        
    for( var j = 0; j < layers.length; j++ ) {
        var layer = layers[ j ];
        layer.data.a += layer.data.speed;
        var t = 'translateX( ' + layer.data.x + 'px ) \
            translateY( ' + layer.data.y + 'px ) \
            translateZ( ' + layer.data.z + 'px ) \
            rotateY( ' + ( - worldYAngle ) + 'deg ) \
            rotateX( ' + ( - worldXAngle ) + 'deg ) \
            rotateZ( ' + (layer.data.a) + 'deg ) \
            scale( ' + layer.data.s + ')';
        layer.style.webkitTransform = t;
    }
    var moon = objects[objects.length-1];
    var m = 'translateX( ' + moon.data.x + 'px ) \
             translateY( ' + moon.data.y + 'px ) \
             translateZ( ' + moon.data.z + 'px ) \
             rotateY( ' + ( - worldYAngle ) + 'deg ) \
             rotateX( ' + ( - worldXAngle ) + 'deg ) \
             rotateZ( ' + 10 + 'deg)'
    moon.style.webkitTransform = m;
    requestAnimationFrame( update );
    
}
update();
window.addEventListener('click', function(){
    world.style.webkitAnimationName = 'myfirst';
    world.style.webkitAnimationDuration = "2s";
    setTimeout(function(){
        viewport.remove();
        var body = document.getElementsByTagName('body')[0];
        var space = document.createElement('div');
        space.className = 'space';
        body.appendChild(space);
    }, 1500);
});


function makeGalaxy(){
    var galaxy = document.createElement( 'div' );
    galaxy.className = 'galaxy';
    world.appendChild( moon);
    var random_x = 256 - ( Math.random() * 512 );
    var random_y = 256 - ( Math.random() * 512 );
    var random_z = 256 - ( Math.random() * 512 );
    galaxy.data = {
        x: random_x,
        y: random_y,
        z: random_z
    };

    var t = 'translateX( ' + random_x + 'px ) translateY( ' + random_y + 'px ) translateZ( ' + random_z + 'px )';
    galaxy.style.webkitTransform = t;
    objects.push(galaxy);
}
