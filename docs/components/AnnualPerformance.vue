<template>
  <div class="perf-wrap">
    <!-- Header -->
    <div class="perf-head">
      <div>
        <h3 class="perf-title">🚀 10억 달러를 향한 스윙바이 궤적</h3>
        <p class="perf-sub">
          연 7% 복리 예상 궤도(점선)를 넘어, 시장의 중력을 이용해 가속하며 목적지를 향하고 있습니다.
        </p>
      </div>
      <span class="dest-pill">최종 목적지 · One Billion 🕊️</span>
    </div>

    <!-- Canvas Space Scene -->
    <div class="space-bg" ref="containerRef">
      <canvas ref="canvasRef" class="space-canvas" width="1000" height="360"></canvas>

      <!-- HTML text labels overlay — guaranteed Korean rendering -->
      <div class="labels" v-if="ready">
        <span class="lbl lbl-baseline">연 7% 예상 궤도 (기준선)</span>
        <span class="lbl lbl-2023">2023 출발</span>
        <span class="lbl lbl-2024">2024<br><b>+5.8%</b></span>
        <span class="lbl lbl-planet">중력 가속 구간<br>(2025) 🪐</span>
        <span class="lbl lbl-2025">스윙바이 · <b>+28.9%</b></span>
        <span class="lbl lbl-2026">현재 위치 (2026)<br><small>예상 궤도 대비 가속 중 →</small></span>
        <span class="lbl lbl-journey">— 여정은 계속됩니다 —</span>
        <span class="lbl lbl-dest">One Billion $<br><small>사회 환원 · 이웃 기여</small></span>
      </div>
    </div>

    <!-- Status Cards -->
    <div class="cards">
      <div class="card">
        <span class="c-lbl">현재 가속도 (2026)</span>
        <span class="c-val gold">+84.9%</span>
        <span class="c-dsc">예상 궤도 이탈 · 초고속 비행 중</span>
      </div>
      <div class="card">
        <span class="c-lbl">비행 원동력</span>
        <span class="c-val blue">Core · Satellite</span>
        <span class="c-dsc">인덱스 질량 + 위성의 스윙바이</span>
      </div>
      <div class="card hl">
        <span class="c-lbl">목적지 도달 상태</span>
        <span class="c-val green">순항 중 🕊️</span>
        <span class="c-dsc">복리의 눈덩이가 굴러갑니다</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const canvasRef    = ref(null)
const containerRef = ref(null)
const ready        = ref(false)
let   animFrameId  = null

// ─── Canvas coordinate helpers ────────────────────────────────────────────
// Logical coordinate space: 1000 × 360
// All geometry defined in logical units; scaled to actual canvas pixels.

const LW = 1000  // logical width
const LH = 360   // logical height

// Scale logical → pixel
function px(canvas, lx, ly) {
  const sx = canvas.width  / LW
  const sy = canvas.height / LH
  return [lx * sx, ly * sy]
}

// ─── Key geometry (all in logical units) ──────────────────────────────────
// Baseline: (50, 300) → (950, 82)
// slope = (82-300)/900 = -0.242 per x-unit

const BASELINE = { x1: 50, y1: 300, x2: 950, y2: 82 }

// Flight path Bézier control points (verified above baseline at all t)
// M 50 300  C 172 254  288 200  380 166  C 456 144  508 118  560 98
const PATH_PTS = {
  start : [50,  300],
  cp1a  : [172, 254],
  cp1b  : [288, 200],
  mid   : [380, 166],
  cp2a  : [456, 144],
  cp2b  : [508, 118],
  end   : [560, 98],
}

// Future path: from end → destination
const FUTURE_CP  = [752, 58]
const DEST       = [950, 38]

// Swing-by planet
const PLANET     = [345, 238]
const PLANET_R   = 28

// Node positions
const NODES = [
  { x: 50,  y: 300 },   // 2023
  { x: 200, y: 248 },   // 2024
  { x: 380, y: 166 },   // 2025 contact
  { x: 560, y: 98  },   // 2026 current
]

// ─── Bezier helper ─────────────────────────────────────────────────────────
function cubicBezier(t, p0, p1, p2, p3) {
  const u = 1 - t
  return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3
}
function quadBezier(t, p0, p1, p2) {
  const u = 1 - t
  return u*u*p0 + 2*u*t*p1 + t*t*p2
}

// ─── Draw frame ────────────────────────────────────────────────────────────
function draw(canvas, progress, tick) {
  const ctx = canvas.getContext('2d')
  const W   = canvas.width
  const H   = canvas.height
  const sx  = W / LW
  const sy  = H / LH

  function p(lx, ly) { return [lx * sx, ly * sy] }

  ctx.clearRect(0, 0, W, H)

  // ── 1. Stars (drawn from seeded positions, twinkle with tick) ────────────
  const STAR_DATA = [
    [80,30],[180,55],[350,20],[520,45],[670,15],[820,35],
    [130,120],[430,100],[720,130],[880,80],[50,200],[300,220],
    [600,180],[750,240],[920,160],[200,280],[450,260],[820,290],
  ]
  STAR_DATA.forEach(([lx, ly], i) => {
    const alpha = 0.3 + 0.5 * Math.abs(Math.sin(tick * 0.025 + i * 0.8))
    const [cx, cy] = p(lx, ly)
    ctx.beginPath()
    ctx.arc(cx, cy, (i % 3 === 0 ? 1.8 : 1.2) * sx, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    ctx.fill()
  })

  // ── 2. Baseline (dashed) ─────────────────────────────────────────────────
  const [bx1, by1] = p(BASELINE.x1, BASELINE.y1)
  const [bx2, by2] = p(BASELINE.x2, BASELINE.y2)
  ctx.save()
  ctx.setLineDash([12 * sx, 8 * sx])
  ctx.strokeStyle = 'rgba(148,163,184,0.45)'
  ctx.lineWidth   = 2.5 * sx
  ctx.beginPath()
  ctx.moveTo(bx1, by1)
  ctx.lineTo(bx2, by2)
  ctx.stroke()
  ctx.restore()

  // ── 3. Swing-by Planet (floating with tick) ──────────────────────────────
  const planetFloat = Math.sin(tick * 0.018) * 6 * sy
  const [plx, ply]  = p(PLANET[0], PLANET[1])
  const pr = PLANET_R * sx

  // Aura
  const aura = ctx.createRadialGradient(plx, ply + planetFloat, 0, plx, ply + planetFloat, pr * 2.5)
  aura.addColorStop(0, 'rgba(79,70,229,0.15)')
  aura.addColorStop(1, 'transparent')
  ctx.fillStyle = aura
  ctx.beginPath()
  ctx.arc(plx, ply + planetFloat, pr * 2.5, 0, Math.PI * 2)
  ctx.fill()

  // Body
  const bodyGrad = ctx.createRadialGradient(
    plx - pr * 0.3, ply + planetFloat - pr * 0.3, pr * 0.1,
    plx, ply + planetFloat, pr
  )
  bodyGrad.addColorStop(0, '#a78bfa')
  bodyGrad.addColorStop(1, '#1e1b4b')
  ctx.fillStyle = bodyGrad
  ctx.beginPath()
  ctx.arc(plx, ply + planetFloat, pr, 0, Math.PI * 2)
  ctx.fill()

  // Ring (ellipse)
  ctx.save()
  ctx.translate(plx, ply + planetFloat)
  ctx.rotate(-0.35)
  ctx.strokeStyle = 'rgba(167,139,250,0.5)'
  ctx.lineWidth   = 2.5 * sx
  ctx.beginPath()
  ctx.ellipse(0, 0, pr * 1.6, pr * 0.38, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()

  // ── 4. Glow shadow of flight path (static, full) ─────────────────────────
  const [s0x, s0y] = p(...PATH_PTS.start)
  const [c1ax, c1ay] = p(...PATH_PTS.cp1a)
  const [c1bx, c1by] = p(...PATH_PTS.cp1b)
  const [midx, midy] = p(...PATH_PTS.mid)
  const [c2ax, c2ay] = p(...PATH_PTS.cp2a)
  const [c2bx, c2by] = p(...PATH_PTS.cp2b)
  const [endx, endy] = p(...PATH_PTS.end)

  ctx.save()
  ctx.shadowColor = '#60a5fa'
  ctx.shadowBlur  = 18 * sx
  const grad = ctx.createLinearGradient(s0x, 0, endx, 0)
  grad.addColorStop(0,    '#60a5fa')
  grad.addColorStop(0.55, '#34d399')
  grad.addColorStop(1,    '#facc15')
  ctx.strokeStyle = grad
  ctx.lineWidth   = 20 * sx
  ctx.lineCap     = 'round'
  ctx.globalAlpha = 0.12
  ctx.beginPath()
  ctx.moveTo(s0x, s0y)
  ctx.bezierCurveTo(c1ax, c1ay, c1bx, c1by, midx, midy)
  ctx.bezierCurveTo(c2ax, c2ay, c2bx, c2by, endx, endy)
  ctx.stroke()
  ctx.restore()

  // ── 5. Animated flight path (progress 0→1) ───────────────────────────────
  // Sample points along the path, draw up to current progress
  if (progress > 0) {
    ctx.save()
    ctx.shadowColor = '#34d399'
    ctx.shadowBlur  = 10 * sx
    ctx.strokeStyle = grad
    ctx.lineWidth   = 5 * sx
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
    ctx.beginPath()

    const STEPS = 120
    let started = false

    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * progress  // 0 → progress (0→1)

      // The path has two cubic segments; split at t=0.5 logical
      let lx, ly
      if (t <= 0.5) {
        const tt = t * 2 // 0→1 for first segment
        lx = cubicBezier(tt, PATH_PTS.start[0], PATH_PTS.cp1a[0], PATH_PTS.cp1b[0], PATH_PTS.mid[0])
        ly = cubicBezier(tt, PATH_PTS.start[1], PATH_PTS.cp1a[1], PATH_PTS.cp1b[1], PATH_PTS.mid[1])
      } else {
        const tt = (t - 0.5) * 2 // 0→1 for second segment
        lx = cubicBezier(tt, PATH_PTS.mid[0], PATH_PTS.cp2a[0], PATH_PTS.cp2b[0], PATH_PTS.end[0])
        ly = cubicBezier(tt, PATH_PTS.mid[1], PATH_PTS.cp2a[1], PATH_PTS.cp2b[1], PATH_PTS.end[1])
      }

      const [cx, cy] = p(lx, ly)
      if (!started) { ctx.moveTo(cx, cy); started = true }
      else ctx.lineTo(cx, cy)
    }
    ctx.stroke()
    ctx.restore()
  }

  // ── 6. Future path (always visible after first draw cycle) ──────────────
  const [futEndX, futEndY] = p(...PATH_PTS.end)
  const [futCpX, futCpY]   = p(...FUTURE_CP)
  const [futDestX, futDestY] = p(...DEST)
  // Fade in on first cycle then stay visible
  const futureAlpha = Math.min(0.38, tick / 250 * 0.38)

  ctx.save()
  ctx.setLineDash([10 * sx, 8 * sx])
  ctx.strokeStyle = `rgba(250,204,21,${futureAlpha})`
  ctx.lineWidth   = 2.5 * sx
  ctx.beginPath()
  ctx.moveTo(futEndX, futEndY)
  ctx.quadraticCurveTo(futCpX, futCpY, futDestX, futDestY)
  ctx.stroke()
  ctx.restore()

  // ── 7. Data nodes (appear sequentially) ──────────────────────────────────
  const nodeThresholds = [0.02, 0.25, 0.55, 0.95]
  const nodeColors     = ['rgba(148,163,184,0.9)', '#34d399', '#f59e0b', '#facc15']
  const nodeRadii      = [7, 9, 10, 0]  // 2026 is a spacecraft, drawn separately

  NODES.forEach(({ x, y }, i) => {
    if (progress < nodeThresholds[i]) return
    if (i === 3) return  // spacecraft drawn below

    const [nx, ny] = p(x, y)
    const r = nodeRadii[i] * sx

    // Glow
    ctx.save()
    ctx.shadowColor = nodeColors[i]
    ctx.shadowBlur  = 12 * sx
    ctx.fillStyle   = nodeColors[i]
    ctx.beginPath()
    ctx.arc(nx, ny, r, 0, Math.PI * 2)
    ctx.fill()
    // White stroke
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'
    ctx.lineWidth   = 2 * sx
    ctx.stroke()
    ctx.restore()
  })

  // ── 8. Spacecraft (2026 current position) with ripple ────────────────────
  if (progress >= 0.95) {
    const [spx, spy] = p(NODES[3].x, NODES[3].y)
    // cyclePos is tick % 480 (where DRAW_FRAMES is 160). 
    // We want the ripple to fade in smoothly at the end of the drawing phase.
    const cyclePos = tick % 480 // hardcoding 480 since CYCLE is in startAnimation
    const rippleAlpha = Math.max(0, Math.min(1, (cyclePos - 152) / 28))

    // Ripple rings
    for (let r = 0; r < 2; r++) {
      const rippleT = ((tick * 0.025) + r * Math.PI) % (Math.PI * 2)
      // Math.sin goes from -1 to 1. Ensure rScale never goes negative to prevent ctx.arc crash.
      const rScale  = Math.max(0.1, 1 + Math.sin(rippleT) * 1.8)
      ctx.save()
      ctx.globalAlpha = Math.max(0, 0.8 - Math.sin(rippleT) * 0.8) * rippleAlpha
      ctx.strokeStyle = '#facc15'
      ctx.lineWidth   = 2 * sx
      ctx.shadowColor = '#facc15'
      ctx.shadowBlur  = 8 * sx
      ctx.beginPath()
      ctx.arc(spx, spy, 16 * sx * rScale, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    // Spacecraft triangle (pointing right)
    ctx.save()
    ctx.fillStyle = '#ffffff'
    ctx.shadowColor = '#ffffff'
    ctx.shadowBlur  = 10 * sx
    ctx.globalAlpha = rippleAlpha
    ctx.beginPath()
    ctx.moveTo(spx + 18 * sx, spy)
    ctx.lineTo(spx - 8 * sx,  spy - 12 * sy)
    ctx.lineTo(spx - 8 * sx,  spy + 12 * sy)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  // ── 9. Destination planet ─────────────────────────────────────────────────
  const [planetDX, planetDY] = p(...DEST)
  const destR = 24 * sx

  // Rotating rings (always visible)
  const ringAngle = tick * 0.012
  for (let ri = 0; ri < 2; ri++) {
    const rr = (ri === 0 ? 40 : 55) * sx
    ctx.save()
    ctx.translate(planetDX, planetDY)
    ctx.rotate(ringAngle * (ri === 0 ? 1 : -0.7))
    ctx.setLineDash([6 * sx, 5 * sx])
    ctx.strokeStyle = ri === 0
      ? 'rgba(16,185,129,0.35)'
      : 'rgba(16,185,129,0.18)'
    ctx.lineWidth = 1.5 * sx
    ctx.beginPath()
    ctx.arc(0, 0, rr, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }

  // Planet glow
  const destGlow = ctx.createRadialGradient(planetDX, planetDY, 0, planetDX, planetDY, destR * 2.5)
  destGlow.addColorStop(0, 'rgba(16,185,129,0.35)')
  destGlow.addColorStop(1, 'transparent')
  ctx.fillStyle = destGlow
  ctx.beginPath()
  ctx.arc(planetDX, planetDY, destR * 2.5, 0, Math.PI * 2)
  ctx.fill()

  // Body
  const destBody = ctx.createRadialGradient(
    planetDX - destR * 0.3, planetDY - destR * 0.3, destR * 0.1,
    planetDX, planetDY, destR
  )
  destBody.addColorStop(0, '#6ee7b7')
  destBody.addColorStop(1, '#065f46')
  ctx.fillStyle = destBody
  ctx.beginPath()
  ctx.arc(planetDX, planetDY, destR, 0, Math.PI * 2)
  ctx.fill()

  // Core shine
  ctx.fillStyle = 'rgba(209,250,229,0.9)'
  ctx.beginPath()
  ctx.arc(planetDX, planetDY, 8 * sx, 0, Math.PI * 2)
  ctx.fill()
}

// ─── Animation loop (identical pattern to MarketPulseDashboard) ─────────────
function startAnimation(canvas) {
  if (!canvas) return
  // Exact same pattern as MarketPulseDashboard.vue
  canvas.width  = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
  // Defensive fallback if layout hasn't happened
  if (canvas.width  < 10) canvas.width  = 900
  if (canvas.height < 10) canvas.height = Math.round(canvas.width * 360 / 1000)

  const DRAW_FRAMES  = 160  // frames to draw flight path (≈2.7s at 60fps)
  const HOLD_FRAMES  = 320  // frames to hold the completed state (≈5.3s)
  const CYCLE        = DRAW_FRAMES + HOLD_FRAMES  // total cycle ≈ 8s
  let tick = 0

  function frame() {
    tick++
    const cyclePos = tick % CYCLE           // position within current cycle
    // progress: 0→1 during draw phase, stays 1 during hold phase
    const progress = Math.min(1, cyclePos / DRAW_FRAMES)
    draw(canvas, progress, tick)
    animFrameId = requestAnimationFrame(frame)
  }
  frame()
}

onMounted(() => {
  // Use setTimeout to guarantee DOM layout is complete before reading dimensions.
  // This is the same reliable pattern used in MarketPulseDashboard.vue.
  setTimeout(() => {
    ready.value = true
    nextTick(() => {
      startAnimation(canvasRef.value)
    })
  }, 50)

  // Re-init on resize
  window.addEventListener('resize', () => {
    if (animFrameId) cancelAnimationFrame(animFrameId)
    startAnimation(canvasRef.value)
  })
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>

<style scoped>
/* ── Layout ──────────────────────────────── */
.perf-wrap {
  margin: 3rem 0;
  padding: 2.2rem 2.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
  font-family: var(--vp-font-family-base);
}

.perf-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.8rem;
}

.perf-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  letter-spacing: -0.02em;
}

.perf-sub {
  margin: 0.45rem 0 0;
  font-size: 0.97rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 560px;
}

.dest-pill {
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: #10b981;
  background: rgba(16,185,129,0.1);
  border: 1px solid rgba(16,185,129,0.28);
  padding: 0.5rem 1.1rem;
  border-radius: 30px;
}

/* ── Space Canvas ────────────────────────── */
.space-bg {
  position: relative;
  background: radial-gradient(ellipse at 28% 78%, #0d1a36 0%, #040810 100%);
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 2rem;
  border: 1px solid rgba(255,255,255,0.06);
  /* Let the canvas's native width/height attributes define the container height */
  line-height: 0;
}

.space-canvas {
  display: block;
  width: 100%;
  height: auto;  /* preserves native aspect ratio from width/height attrs */
}

/* ── HTML label overlays (percentage-based) ── */
/* All percentages are: (logical_x / 1000) and (logical_y / 360) */
.labels { position: absolute; inset: 0; pointer-events: none; }

.lbl {
  position: absolute;
  font-family: var(--vp-font-family-base), system-ui, sans-serif;
  line-height: 1.35;
  text-align: center;
  white-space: nowrap;
}

/* "연 7% 예상 궤도 (기준선)" — upper-center above baseline */
.lbl-baseline {
  font-size: clamp(10px, 1.4vw, 14px);
  color: rgba(148,163,184,0.7);
  top: 22%; left: 45%;
  transform: translateX(-50%);
}

/* 2023 start — bottom-left */
.lbl-2023 {
  font-size: clamp(11px, 1.5vw, 15px);
  color: rgba(148,163,184,0.85);
  font-weight: 600;
  bottom: 6%;
  left: 3%;
}

/* 2024 node — above node at (200, 248) → 20%, 69% */
.lbl-2024 {
  font-size: clamp(11px, 1.5vw, 15px);
  color: #34d399;
  top: 55%; left: 17%;
  transform: translateX(-50%);
}

/* Planet label — below planet at (345, 238+30) → 34.5%, 88% */
.lbl-planet {
  font-size: clamp(10px, 1.3vw, 13px);
  color: rgba(167,139,250,0.85);
  font-weight: 600;
  top: 82%; left: 34%;
  transform: translateX(-50%);
}

/* 2025 swing-by — right-above 2025 node (380, 166) → 44%, 38% */
.lbl-2025 {
  font-size: clamp(11px, 1.5vw, 15px);
  color: #f59e0b;
  top: 30%; left: 40%;
  transform: translateX(-50%);
}

/* 2026 current — above spacecraft (560, 98) → 56%, 27% */
.lbl-2026 {
  font-size: clamp(11px, 1.5vw, 15px);
  color: #facc15;
  font-weight: 700;
  top: 8%; left: 56%;
  transform: translateX(-50%);
  text-align: center;
}
.lbl-2026 small {
  font-size: 0.78em;
  opacity: 0.75;
  display: block;
}

/* Journey text — between spacecraft and destination */
.lbl-journey {
  font-size: clamp(10px, 1.2vw, 12px);
  color: rgba(148,163,184,0.42);
  font-style: italic;
  top: 38%; left: 75%;
  transform: translateX(-50%);
}

/* Destination — left of planet at (950, 38) → 95%, 11% */
.lbl-dest {
  font-size: clamp(11px, 1.5vw, 15px);
  color: #34d399;
  font-weight: 700;
  top: 2%; right: 7%;
  text-align: right;
}
.lbl-dest small {
  font-size: 0.78em;
  color: rgba(255,255,255,0.55);
  display: block;
  font-weight: 400;
}

/* ── Status Cards ──────────────────────── */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.2rem;
}

.card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-gutter);
  border-radius: 14px;
  padding: 1.4rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  transition: transform 0.25s, box-shadow 0.25s;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0,0,0,0.07);
}
.hl {
  border-color: rgba(16,185,129,0.3);
  background: linear-gradient(145deg, rgba(16,185,129,0.07), transparent);
}

.c-lbl {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.c-val {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.1;
}
.c-dsc {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.gold  { color: #f59e0b; }
.blue  { color: #60a5fa; }
.green { color: #10b981; }
</style>
