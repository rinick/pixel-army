class Algorithm {
    static init_partial: string = `
float random (vec2 st) {
return fract(sin(dot(st.xy,
        vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    
    if (gl_FragCoord.x > iResolution.x - 1.0 || gl_FragCoord.y > iResolution.y - 1.0) {
        gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    } else {
        gl_FragColor = vec4(1.0,0.0,0.0,0.0);
        vec2 st = gl_FragCoord.xy/ (iResolution.xy - vec2(1.0, 1.0));
        float rnd = random( st ) * 4.0;
        if (rnd < 1.0)  {
            if (st.x < 0.4) {
                gl_FragColor = vec4(2.0,64.0,rnd,0.0);
            } else if (st.x > 0.6) {
                gl_FragColor = vec4(3.0,1.0,rnd,0.0);
            }
        }
    }
   
}`;
    static init_fill: string = `
float random (vec2 st) {
return fract(sin(dot(st.xy,
        vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    
    if (gl_FragCoord.x > iResolution.x - 1.0 || gl_FragCoord.y > iResolution.y - 1.0) {
        gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    } else {
        
        vec2 st = gl_FragCoord.xy/ (iResolution.xy - vec2(1.0, 1.0));
        float rnd = random( st );
        if (st.x < 0.5) {
            gl_FragColor = vec4(2.0,64.0,rnd,0.0);
        } else if (st.x > 0.5) {
            gl_FragColor = vec4(3.0,64.0,rnd,0.0);
        } else if (st.y < 0.5) {
            gl_FragColor = vec4(2.0,64.0,rnd,0.0);
        } else if (st.y > 0.5) {
            gl_FragColor = vec4(3.0,64.0,rnd,0.0);
        } else {
            gl_FragColor = vec4(0.0,0.0,0.0,0.0);
        }
     
     
    }
   
}`;

    static move: string = `
const vec2 DR[9] = vec2[]( vec2( 0.0, 0.0), vec2( 1.0, 0.0), vec2( 1.0, 1.0 ), vec2( 0.0, 1.0 ), vec2( -1.0, 1.0 ),
                           vec2( -1.0, 0.0), vec2( -1.0, -1.0 ), vec2( 0.0, -1.0 ), vec2( 1.0, -1.0 ));
uniform sampler2D board;
uniform sampler2D buff2;
uniform sampler2D buff3;
int findDirection(vec2 coord){
    for(int i=1; i<9; i++){
        
    }
}
void main(){
    vec2 st = gl_FragCoord.xy/iResolution;
    vec4 pt = texture2D( data, st);
    flost side = floor(pt.x);
    if (side == 0.0) {
        gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    } else if (side == 1.0){
    
    } else if (side == 2.0 || siode == 3.0) {
    
    }
}
    
`;
    static usr_random: string = `
`;
}
