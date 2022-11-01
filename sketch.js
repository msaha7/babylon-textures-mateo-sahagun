var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    //color background black
    scene.clearColor = new BABYLON.Color3.FromHexString('#000');


    //create sphere w params (x, y, z, diameter)
    var s1 = createSphere(-1, 1, -1, 2);

    //wrap sphere in material from URL file
    s1.material = fileMat('https://www.bing.com/images/search?view=detailV2&ccid=CkCfn4Cn&id=2684F2AB788A8107841EAA4BB3AC2269644B2A27&thid=OIP.CkCfn4Cn6brJhehPtwR4NAHaE7&mediaurl=https%3a%2f%2fmedia.istockphoto.com%2fphotos%2fcontrolling-picture-id476008196%3fk%3d6%26m%3d476008196%26s%3d170667a%26w%3d0%26h%3dBmqFY8vsp6liYkJswxfrArJmIeKmWM_b2oQWvGYFR8I%3d&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.0a409f9f80a7e9bac985e84fb7047834%3frik%3dJypLZGkirLNLqg%26pid%3dImgRaw%26r%3d0%26sres%3d1%26sresct%3d1%26srh%3d800%26srw%3d1201&exph=339&expw=509&q=controlling+pictures&simid=607997276047028538&FORM=IRPRST&ck=D1A4CC7C5515776547351EABF0A591F4&selectedIndex=1&ajaxhist=0&ajaxserp=0', scene);
    
    //create sphere
    var s2 = createSphere(2, 2, 0.5, 2);

    //wrap sphere in material from local file
    s2.material = fileMat('moon.jpg', scene);
    
    //create box with params x, y, z, width, height, ddepth
    var b1 = createBox(2, -2, 2, 1, 1, 1);

    //wrap box in material colored with hex code
    b1.material = hexMat('#ff0000');
    b1.rotation.z += Math.PI/4;

    var b2 = createBox(0, -2, -1.5, 2, 2, 2);

    //wrap box in material from local file
    b2.material = fileMat('moon.jpg');

    return scene;
};
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
