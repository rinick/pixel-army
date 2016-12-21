const vertexShader = `
void main() {
 gl_Position = vec4( position, 1.0 );
}`;

const fragmentDefinition = `#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iGlobalTime;`;

class Stage {

    static targetOptions = {
        wrapS: THREE.RepeatWrapping,
        wrapT: THREE.RepeatWrapping,
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType
    };

    static initUniforms(uniforms: any, current: any): void {
        for (let key in uniforms) {
            current[key] = uniforms[key];
        }
    }

    static updateUniforms(uniforms: any, current: any): void {
        for (let key in uniforms) {
            if (current.hasOwnProperty(key)) {
                current[key].value = uniforms[key];
            }
        }
    }

    newTarget(): THREE.WebGLRenderTarget {
        return new THREE.WebGLRenderTarget(this.w, this.h, Stage.targetOptions);
    }

    canvasW: number;
    canvasH: number;
    w: number;
    h: number;
    renderer: THREE.WebGLRenderer;
    camera: THREE.Camera;
    scene: THREE.Scene;

    uniforms: any = {
        iGlobalTime: {type: "f", value: 1.0},
        iResolution: {type: "v3", value: new THREE.Vector3()}
    };

    constructor(canvasW: number, canvasH: number, w: number, h: number, shader: string, uniforms: any) {
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.w = w;
        this.h = h;

        this.uniforms.iResolution.value.x = canvasW;
        this.uniforms.iResolution.value.y = canvasH;
        Stage.initUniforms(uniforms, this.uniforms);

        this.renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
        this.renderer.setSize(canvasW, canvasH);

        this.camera = new THREE.Camera();
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        let geometry = new THREE.PlaneBufferGeometry(2, 2);

        let material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentDefinition + shader
        });

        let mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }


}

class Shader {
    uniforms: any = {
        iGlobalTime: {type: "f", value: 1.0},
        iResolution: {type: "v3", value: new THREE.Vector3()}
    };
    stage: Stage;
    scene: THREE.Scene;

    constructor(stage: Stage, shader: string, uniforms: any) {
        this.stage = stage;

        this.uniforms.iResolution.value.x = stage.w;
        this.uniforms.iResolution.value.y = stage.h;
        Stage.initUniforms(uniforms, this.uniforms);

        this.scene = new THREE.Scene();
        let material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentDefinition + shader
        });
        let geometry = new THREE.PlaneBufferGeometry(2, 2);
        let mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }


    render(target: THREE.RenderTarget) {
        this.stage.renderer.render(this.scene, this.stage.camera, target, true);
    }
}

class Battle {
    stage: Stage;
    board: THREE.WebGLRenderTarget;
    buff0: THREE.WebGLRenderTarget;
    buff1: THREE.WebGLRenderTarget;
    temp: THREE.WebGLRenderTarget;

    constructor(canvasW: number, canvasH: number, w: number, h: number) {
        this.stage = new Stage(canvasW, canvasH, w, h, `
uniform sampler2D iChannel0;
void main(){
    vec2 st = gl_FragCoord.xy/iResolution;
    float t = floor(texture2D( iChannel0, st ).x);
    if (t == 1.0) {
        gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    } else if (t == 2.0) {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    } else if (t == 3.0) {
        gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    } else {
        gl_FragColor = vec4(0.0,0.0,0.0,1.0);
    }  
}`, {iChannel0: {type: "t", value: null, minFilter: THREE.NearestFilter}});

        this.board = this.stage.newTarget();
        this.buff0 = this.stage.newTarget();
        this.buff1 = this.stage.newTarget();
        this.temp = this.stage.newTarget();
    }
}