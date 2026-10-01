import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────
   ShaderField — light refracting through glass.
   A tiny raw-WebGL fragment shader: domain-warped noise gives
   soft caustic bands in the brand blue over the paper tone.
   The pointer bends the light like a lens passing over it.
   Renders only while on-screen.
───────────────────────────────────────────────────────────── */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;
uniform vec3 uPaper;
uniform vec3 uInk;

vec2 hash(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.+2.*fract(sin(p)*43758.5453123);}
float noise(vec2 p){
  const float K1=.366025404;const float K2=.211324865;
  vec2 i=floor(p+(p.x+p.y)*K1);vec2 a=p-i+(i.x+i.y)*K2;
  float m=step(a.y,a.x);vec2 o=vec2(m,1.-m);vec2 b=a-o+K2;vec2 c=a-1.+2.*K2;
  vec3 h=max(.5-vec3(dot(a,a),dot(b,b),dot(c,c)),0.);
  vec3 n=h*h*h*h*vec3(dot(a,hash(i)),dot(b,hash(i+o)),dot(c,hash(i+1.)));
  return dot(n,vec3(70.));
}
float fbm(vec2 p){float f=0.;float a=.5;for(int i=0;i<4;i++){f+=a*noise(p);p*=2.02;a*=.5;}return f;}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes.xy;
  vec2 p=uv*vec2(uRes.x/uRes.y,1.);
  vec2 m=uMouse*vec2(uRes.x/uRes.y,1.);
  float t=uTime*.06;

  // lens: pull coordinates toward the pointer
  vec2 d=p-m;float r=length(d);
  p-=d*.35*exp(-r*r*6.);

  vec2 q=vec2(fbm(p*1.3+t),fbm(p*1.3-t+4.1));
  vec2 w=vec2(fbm(p*1.6+q*1.8+vec2(1.7,9.2)+t*1.3),fbm(p*1.6+q*1.8+vec2(8.3,2.8)-t));
  float f=fbm(p*1.4+w*1.6);

  // thin caustic filaments from the gradient of the warp
  float caus=pow(1.-abs(sin((f+w.x)*9.)),10.);
  float band=smoothstep(-.1,.7,f);

  vec3 col=uPaper;
  col=mix(col,uInk,band*.55*uIntensity);
  col=mix(col,vec3(1.),caus*.35*uIntensity);
  col+=uInk*exp(-r*r*14.)*.10*uIntensity;

  // gentle vignette toward paper at the edges
  float v=smoothstep(1.25,.25,length(uv-.5)*1.4);
  col=mix(uPaper,col,v);
  gl_FragColor=vec4(col,1.);
}`

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export default function ShaderField({ className = '', paper = '#F4F5F2', ink = '#1E4FD8', intensity = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (n) => gl.getUniformLocation(prog, n)
    const uRes = u('uRes'), uTime = u('uTime'), uMouse = u('uMouse')
    gl.uniform1f(u('uIntensity'), intensity)
    gl.uniform3fv(u('uPaper'), hexToRgb(paper))
    gl.uniform3fv(u('uInk'), hexToRgb(ink))

    // Render at reduced resolution — the field is soft anyway
    const scale = Math.min(window.devicePixelRatio, 1.5) * 0.6
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, r.width * scale)
      canvas.height = Math.max(1, r.height * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let visible = false
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    const start = performance.now()
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [paper, ink, intensity])

  return <canvas ref={canvasRef} className={`shader-field ${className}`} aria-hidden="true" />
}
