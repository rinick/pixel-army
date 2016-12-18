/// <reference path="shader.ts" />
/// <reference path="algorithm.ts" />

let battle = new Battle(512,512,512,512);


let container: HTMLElement = document.getElementById('container');

container.appendChild(battle.stage.renderer.domElement);



function animate() {
    //requestAnimationFrame(animate);
    render();
}


var shader = new Shader(battle.stage, Algorithm.init_fill, {});

shader.render(battle.board);


Stage.updateUniforms({'data':battle.board.texture}, battle.stage.uniforms);


function render() {

    battle.stage.render();
}
render();

