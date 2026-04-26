const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const SPECIAL_DURATION = 940;
const SPECIAL_STARTUP = 300;
const SPECIAL_FLASH_DURATION = 270;
const SPECIAL_RAYS_DURATION = 650;
const DASH_TAP_WINDOW = 330;
const DASH_DURATION = 340;
const DASH_HOLD_REFRESH = 190;

function loadSpriteImage(src) {
  const image = new Image();
  image.src = src;
  return image;
}

function createSpriteSheet(config) {
  return {
    image: loadSpriteImage(config.src),
    frameW: config.frameW,
    frameH: config.frameH,
    frameDuration: config.frameDuration || 100,
    anchorX: config.anchorX,
    anchorY: config.anchorY,
    scale: config.scale,
    tags: config.tags,
  };
}

function createSpriteStrip(config) {
  return {
    image: loadSpriteImage(config.src),
    frameW: config.frameW,
    frameH: config.frameH,
    frames: config.frames || 1,
    frameDuration: config.frameDuration || 100,
    anchorX: config.anchorX,
    anchorY: config.anchorY,
    scale: config.scale,
    vertical: Boolean(config.vertical),
    columns: config.columns || 0,
    smoothing: Boolean(config.smoothing),
  };
}

const playerSpriteBase = {
  idle: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/IdleCombat1.png",
    frameW: 256,
    frameH: 256,
    frames: 14,
    frameDuration: 146,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  walk: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Walk_Fwd.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 156,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  run: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Sprint.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 94,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  hit: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/LightHit.png",
    frameW: 256,
    frameH: 256,
    frames: 15,
    frameDuration: 92,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  jab: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Jab.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 80,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  hook: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Punch.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 86,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  uppercut: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/HeavySmash.png",
    frameW: 256,
    frameH: 256,
    frames: 15,
    frameDuration: 92,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  jump: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/JumpStart.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 90,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  jumpAttack: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Kick.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 82,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  throw: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/ForwardSmash.png",
    frameW: 256,
    frameH: 256,
    frames: 15,
    frameDuration: 90,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  death: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Knockdown.png",
    frameW: 256,
    frameH: 256,
    frames: 15,
    frameDuration: 110,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  charge: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/IdleCombat2.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 118,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  powerPunch: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/SpecialAttack2.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 84,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  walkBoost: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Run.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 108,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  win: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Victory.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 112,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
  winJump: createSpriteStrip({
    src: "./assets/player_kalponic_structured/FighterHD/Victory.png",
    frameW: 256,
    frameH: 256,
    frames: 16,
    frameDuration: 96,
    anchorX: 128,
    anchorY: 228,
    scale: 0.96,
    columns: 4,
    smoothing: true,
  }),
};

const playerSpriteSet = {
  ...playerSpriteBase,
  hitBoost: playerSpriteBase.hit,
  jabBoost: playerSpriteBase.jab,
  hookBoost: playerSpriteBase.hook,
  uppercutBoost: playerSpriteBase.uppercut,
  jumpBoost: playerSpriteBase.jump,
  jumpAttackBoost: playerSpriteBase.jumpAttack,
};

const civicGuardEnemySet = {
  idle: createSpriteStrip({
    src: "./assets/enemies/civic_guard_craftpix/idle.png",
    frameW: 192,
    frameH: 192,
    frames: 8,
    anchorX: 96,
    anchorY: 178,
    scale: 0.76,
    frameDuration: 128,
    smoothing: true,
  }),
  walk: createSpriteStrip({
    src: "./assets/enemies/civic_guard_craftpix/walk.png",
    frameW: 192,
    frameH: 192,
    frames: 8,
    anchorX: 96,
    anchorY: 178,
    scale: 0.76,
    frameDuration: 96,
    smoothing: true,
  }),
  hit: createSpriteStrip({
    src: "./assets/enemies/civic_guard_craftpix/hurt.png",
    frameW: 192,
    frameH: 192,
    frames: 7,
    anchorX: 96,
    anchorY: 178,
    scale: 0.76,
    frameDuration: 112,
    smoothing: true,
  }),
  jab: createSpriteStrip({
    src: "./assets/enemies/civic_guard_craftpix/punch.png",
    frameW: 192,
    frameH: 192,
    frames: 10,
    anchorX: 96,
    anchorY: 178,
    scale: 0.76,
    frameDuration: 72,
    smoothing: true,
  }),
  death: createSpriteStrip({
    src: "./assets/enemies/civic_guard_craftpix/knockout.png",
    frameW: 192,
    frameH: 192,
    frames: 5,
    anchorX: 96,
    anchorY: 178,
    scale: 0.76,
    frameDuration: 160,
    smoothing: true,
  }),
};

const ppeWorkerEnemySet = {
  idle: createSpriteStrip({
    src: "./assets/enemies/ppe_worker_kruk_hazmat/idle.png",
    frameW: 192,
    frameH: 192,
    frames: 8,
    anchorX: 96,
    anchorY: 178,
    scale: 0.8,
    frameDuration: 132,
    smoothing: true,
  }),
  walk: createSpriteStrip({
    src: "./assets/enemies/ppe_worker_kruk_hazmat/walk.png",
    frameW: 192,
    frameH: 192,
    frames: 13,
    anchorX: 96,
    anchorY: 178,
    scale: 0.8,
    frameDuration: 118,
    smoothing: true,
  }),
  hit: createSpriteStrip({
    src: "./assets/enemies/ppe_worker_kruk_hazmat/hurt.png",
    frameW: 192,
    frameH: 192,
    frames: 7,
    anchorX: 96,
    anchorY: 178,
    scale: 0.8,
    frameDuration: 110,
    smoothing: true,
  }),
  jab: createSpriteStrip({
    src: "./assets/enemies/ppe_worker_kruk_hazmat/punch.png",
    frameW: 192,
    frameH: 192,
    frames: 10,
    anchorX: 96,
    anchorY: 178,
    scale: 0.8,
    frameDuration: 78,
    smoothing: true,
  }),
  death: createSpriteStrip({
    src: "./assets/enemies/ppe_worker_kruk_hazmat/knockout.png",
    frameW: 192,
    frameH: 192,
    frames: 5,
    anchorX: 96,
    anchorY: 178,
    scale: 0.8,
    frameDuration: 150,
    smoothing: true,
  }),
};

const finalBossEnemySet = {
  idle: createSpriteStrip({
    src: "./assets/enemies/final_overlord/idle.png",
    frameW: 192,
    frameH: 192,
    frames: 8,
    anchorX: 96,
    anchorY: 178,
    scale: 0.92,
    frameDuration: 128,
    smoothing: true,
  }),
  walk: createSpriteStrip({
    src: "./assets/enemies/final_overlord/walk.png",
    frameW: 192,
    frameH: 192,
    frames: 8,
    anchorX: 96,
    anchorY: 178,
    scale: 0.92,
    frameDuration: 112,
    smoothing: true,
  }),
  hit: createSpriteStrip({
    src: "./assets/enemies/final_overlord/hurt.png",
    frameW: 192,
    frameH: 192,
    frames: 7,
    anchorX: 96,
    anchorY: 178,
    scale: 0.92,
    frameDuration: 110,
    smoothing: true,
  }),
  jab: createSpriteStrip({
    src: "./assets/enemies/final_overlord/punch.png",
    frameW: 192,
    frameH: 192,
    frames: 10,
    anchorX: 96,
    anchorY: 178,
    scale: 0.92,
    frameDuration: 78,
    smoothing: true,
  }),
  death: createSpriteStrip({
    src: "./assets/enemies/final_overlord/knockout.png",
    frameW: 192,
    frameH: 192,
    frames: 5,
    anchorX: 96,
    anchorY: 178,
    scale: 0.92,
    frameDuration: 150,
    smoothing: true,
  }),
};

const enemySpriteSets = {
  thug: civicGuardEnemySet,
  brute: ppeWorkerEnemySet,
  boss: finalBossEnemySet,
};

const vfxSheets = {
  specialCharge: createSpriteStrip({
    src: "./assets/vfx/special_charge.png",
    frameW: 256,
    frameH: 256,
    frames: 7,
    anchorX: 128,
    anchorY: 128,
    scale: 1,
    frameDuration: 52,
    vertical: true,
  }),
  specialRing: createSpriteStrip({
    src: "./assets/vfx/special_ring.png",
    frameW: 128,
    frameH: 128,
    frames: 1,
    anchorX: 64,
    anchorY: 64,
    scale: 1,
    frameDuration: 100,
  }),
};

const world = {
  width: 2680,
  top: 205,
  bottom: 425,
};

const keys = new Set();
const justPressed = new Set();

const attacks = {
  light1: {
    name: "轻拳",
    duration: 230,
    hitStart: 60,
    hitEnd: 125,
    hitStop: 22,
    damage: 12,
    meter: 6,
    reach: 56,
    depth: 28,
    push: 120,
    launch: -18,
    move: 18,
    hitstun: 220,
    shake: 7,
    chain: "light2",
  },
  light2: {
    name: "直摆",
    duration: 245,
    hitStart: 70,
    hitEnd: 140,
    hitStop: 24,
    damage: 14,
    meter: 6,
    reach: 62,
    depth: 30,
    push: 150,
    launch: -28,
    move: 20,
    hitstun: 240,
    shake: 8,
    chain: "light3",
  },
  light3: {
    name: "压肩锤",
    duration: 320,
    hitStart: 92,
    hitEnd: 190,
    hitStop: 32,
    damage: 20,
    meter: 9,
    reach: 74,
    depth: 34,
    push: 250,
    launch: -64,
    move: 26,
    hitstun: 320,
    shake: 10,
    chain: null,
  },
  heavy: {
    name: "重拳",
    duration: 360,
    hitStart: 110,
    hitEnd: 215,
    hitStop: 40,
    damage: 24,
    meter: 12,
    reach: 82,
    depth: 38,
    push: 280,
    launch: -58,
    move: 24,
    hitstun: 300,
    shake: 10,
    chain: null,
  },
  uppercut: {
    name: "升龙",
    duration: 420,
    hitStart: 105,
    hitEnd: 210,
    hitStop: 46,
    damage: 30,
    meter: 15,
    reach: 68,
    depth: 32,
    push: 190,
    launch: -210,
    move: 16,
    hitstun: 480,
    shake: 13,
    chain: null,
  },
  dashHeavy: {
    name: "冲刺肘击",
    duration: 340,
    hitStart: 72,
    hitEnd: 178,
    hitStop: 42,
    damage: 26,
    meter: 12,
    reach: 92,
    depth: 34,
    push: 320,
    launch: -54,
    move: 40,
    hitstun: 320,
    shake: 12,
    chain: null,
  },
  sweep: {
    name: "扫腿",
    duration: 330,
    hitStart: 104,
    hitEnd: 192,
    hitStop: 34,
    damage: 18,
    meter: 10,
    reach: 78,
    depth: 28,
    minDx: 0,
    groundedOnly: true,
    push: 210,
    launch: -42,
    move: 10,
    hitstun: 320,
    shake: 10,
    chain: null,
  },
  wavePunch: {
    name: "波动冲拳",
    duration: 410,
    hitStart: 118,
    hitEnd: 222,
    hitStop: 44,
    damage: 28,
    meter: 14,
    reach: 138,
    depth: 38,
    minDx: -8,
    push: 290,
    launch: -98,
    move: 22,
    hitstun: 360,
    shake: 12,
    chain: null,
  },
  dashKnee: {
    name: "冲膝",
    duration: 295,
    hitStart: 56,
    hitEnd: 146,
    hitStop: 38,
    damage: 22,
    meter: 10,
    reach: 84,
    depth: 32,
    push: 250,
    launch: -115,
    move: 48,
    hitstun: 340,
    shake: 10,
    chain: null,
  },
};

const zoneTemplates = [
  {
    id: 0,
    name: "小巷口",
    triggerX: 360,
    left: 300,
    right: 790,
    enemies: [
      { kind: "thug", x: 580, y: 252 },
      { kind: "thug", x: 690, y: 316 },
      { kind: "thug", x: 620, y: 385 },
    ],
    props: [
      { type: "can", x: 500, y: 382 },
      { type: "crate", x: 736, y: 268 },
    ],
  },
  {
    id: 1,
    name: "烧烤摊",
    triggerX: 980,
    left: 930,
    right: 1430,
    enemies: [
      { kind: "thug", x: 1100, y: 238 },
      { kind: "thug", x: 1290, y: 294 },
      { kind: "brute", x: 1160, y: 355 },
      { kind: "thug", x: 1340, y: 398 },
    ],
    props: [
      { type: "barrel", x: 1210, y: 372 },
      { type: "can", x: 1030, y: 394 },
    ],
  },
  {
    id: 2,
    name: "天桥下",
    triggerX: 1630,
    left: 1560,
    right: 2040,
    enemies: [
      { kind: "thug", x: 1710, y: 228 },
      { kind: "brute", x: 1875, y: 272 },
      { kind: "thug", x: 1765, y: 323 },
      { kind: "thug", x: 1940, y: 376 },
      { kind: "brute", x: 1670, y: 405 },
    ],
    props: [
      { type: "crate", x: 1812, y: 255 },
      { type: "barrel", x: 1980, y: 366 },
    ],
  },
  {
    id: 3,
    name: "独裁者据点",
    triggerX: 2180,
    left: 2120,
    right: 2540,
    enemies: [{ kind: "boss", x: 2380, y: 322 }],
    props: [
      { type: "barrel", x: 2230, y: 385 },
      { type: "can", x: 2475, y: 250 },
    ],
    boss: true,
  },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp01(a, b, t) {
  return a + (b - a) * t;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function easeOutCubic(t) {
  return 1 - (1 - clamp(t, 0, 1)) ** 3;
}

function easeInCubic(t) {
  return clamp(t, 0, 1) ** 3;
}

function easeInOutQuad(t) {
  const p = clamp(t, 0, 1);
  return p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
}

function attackBeat(attack, timer) {
  const elapsed = attack.duration - timer;
  if (elapsed < attack.hitStart) {
    return {
      phase: "startup",
      t: attack.hitStart <= 0 ? 1 : clamp(elapsed / attack.hitStart, 0, 1),
    };
  }
  if (elapsed <= attack.hitEnd) {
    return {
      phase: "active",
      t: clamp((elapsed - attack.hitStart) / Math.max(1, attack.hitEnd - attack.hitStart), 0, 1),
    };
  }
  return {
    phase: "recovery",
    t: clamp((elapsed - attack.hitEnd) / Math.max(1, attack.duration - attack.hitEnd), 0, 1),
  };
}

function triggerHitStop(ms) {
  game.hitStop = Math.max(game.hitStop, ms);
}

function setImpact(actor, stretchX, stretchY, duration = 110) {
  actor.impactTimer = duration;
  actor.impactDuration = duration;
  actor.impactStretchX = stretchX;
  actor.impactStretchY = stretchY;
}

function screenX(x) {
  return x - game.cameraX;
}

function hitFlashColor(alpha) {
  return `rgba(255, 244, 179, ${alpha})`;
}

class Fighter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.z = 0;
    this.vz = 0;
    this.facing = 1;
    this.hitstun = 0;
    this.invuln = 0;
    this.attackTimer = 0;
    this.currentAttack = null;
    this.attackVictims = new Set();
    this.hp = 100;
    this.maxHp = 100;
    this.hitFlash = 0;
    this.impactTimer = 0;
    this.impactDuration = 0;
    this.impactStretchX = 0;
    this.impactStretchY = 0;
  }

  get screenY() {
    return this.y + this.z;
  }
}

class Player extends Fighter {
  constructor() {
    super(160, 318);
    this.maxHp = 220;
    this.hp = this.maxHp;
    this.speed = 240;
    this.dashTimer = 0;
    this.tapTimers = { ArrowLeft: -1000, ArrowRight: -1000 };
    this.comboTimer = 0;
    this.comboCount = 0;
    this.comboLabelTimer = 0;
    this.score = 0;
    this.meter = 0;
    this.specialTimer = 0;
    this.specialVictims = new Set();
    this.carrying = null;
  }
}

class Enemy extends Fighter {
  constructor(kind, x, y, zoneId) {
    super(x, y);
    this.kind = kind;
    this.zoneId = zoneId;
    this.dead = false;
    this.removed = false;
    this.grabbed = false;
    this.attackWindup = 0;
    this.attackCooldown = rand(350, 750);
    this.aiOffset = rand(-34, 34);
    this.koTimer = 1200;
    this.thrownTimer = 0;
    this.throwVictims = new Set();
    this.attackType = "jab";
    this.attackFacing = 1;
    this.attackWindupTotal = 0;
    this.phase = 1;
    this.phaseTransition = 0;
    this.phaseTransitionTotal = 0;

    if (kind === "boss") {
      this.maxHp = 360;
      this.hp = this.maxHp;
      this.speed = 130;
      this.damage = 22;
      this.size = 1.48;
      this.bodyColor = "#ee4f39";
      this.accentColor = "#ffce57";
      this.name = "独裁者暴君XI";
    } else if (kind === "brute") {
      this.maxHp = 96;
      this.hp = this.maxHp;
      this.speed = 112;
      this.damage = 16;
      this.size = 1.18;
      this.bodyColor = "#7e4eff";
      this.accentColor = "#ffd470";
      this.name = "白衣防护员";
    } else {
      this.maxHp = 58;
      this.hp = this.maxHp;
      this.speed = 146;
      this.damage = 10;
      this.size = 1;
      this.bodyColor = "#00a8b7";
      this.accentColor = "#ffdf6f";
      this.name = "蓝制服队员";
    }
  }
}

class Prop {
  constructor(type, x, y, zoneId) {
    this.type = type;
    this.zoneId = zoneId;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.z = 0;
    this.vz = 0;
    this.carried = false;
    this.broken = false;
    this.removed = false;
    this.thrownTimer = 0;
    this.throwVictims = new Set();
    this.breakTimer = 220;

    if (type === "barrel") {
      this.damage = 28;
      this.explosive = true;
      this.color = "#dc8a2b";
      this.label = "爆桶";
    } else if (type === "crate") {
      this.damage = 24;
      this.explosive = false;
      this.color = "#9f6b42";
      this.label = "木箱";
    } else {
      this.damage = 18;
      this.explosive = false;
      this.color = "#9bd0c3";
      this.label = "垃圾桶";
    }
  }
}

const game = {
  player: new Player(),
  enemies: [],
  props: [],
  particles: [],
  zones: [],
  activeZone: null,
  cameraX: 0,
  state: "intro",
  introTimer: 1200,
  waveBanner: "",
  waveBannerTimer: 0,
  message: "滚屏关卡已上线",
  messageTimer: 1800,
  lastTime: 0,
  time: 0,
  hitStop: 0,
  cameraShake: 0,
  specialFlashTimer: 0,
  specialFlashDuration: 0,
  specialRaysTimer: 0,
  specialRaysDuration: 0,
};

function buildZones() {
  return zoneTemplates.map((zone) => ({
    ...zone,
    started: false,
    cleared: false,
  }));
}

function resetGame() {
  game.player = new Player();
  game.enemies = [];
  game.props = [];
  game.particles = [];
  game.zones = buildZones();
  game.activeZone = null;
  game.cameraX = 0;
  game.state = "intro";
  game.introTimer = 1200;
  game.waveBanner = "第一关：旧城街区";
  game.waveBannerTimer = 1800;
  game.message = "方向键移动，F 抓取 / 拾物，D 爆气";
  game.messageTimer = 2200;
  game.time = 0;
  game.hitStop = 0;
  game.cameraShake = 0;
  game.specialFlashTimer = 0;
  game.specialFlashDuration = 0;
  game.specialRaysTimer = 0;
  game.specialRaysDuration = 0;
}

function queueBanner(text, ms = 1800) {
  game.waveBanner = text;
  game.waveBannerTimer = ms;
}

function queueMessage(text, ms = 1400) {
  game.message = text;
  game.messageTimer = ms;
}

function spawnBurst(x, y, color, amount = 10) {
  for (let i = 0; i < amount; i += 1) {
    game.particles.push({
      x,
      y,
      vx: rand(-180, 180),
      vy: rand(-140, 140),
      life: rand(180, 360),
      radius: rand(2, 6),
      color,
    });
  }
}

function spawnSpecialBurst(player) {
  spawnBurst(player.x, player.y - 42, "rgba(255, 246, 146, 0.98)", 48);
  spawnBurst(player.x, player.y - 58, "rgba(255, 171, 76, 0.9)", 34);
  spawnBurst(player.x, player.y - 92, "rgba(126, 229, 255, 0.72)", 16);
  for (let i = 0; i < 34; i += 1) {
    const angle = (Math.PI * 2 * i) / 34 + rand(-0.1, 0.1);
    const speed = rand(170, 430);
    game.particles.push({
      x: player.x,
      y: player.y - rand(32, 104),
      vx: Math.cos(angle) * speed * rand(0.75, 1.15),
      vy: Math.sin(angle) * speed * 0.42 - rand(120, 260),
      life: rand(360, 760),
      radius: rand(3, 9),
      color: Math.random() > 0.62
        ? "rgba(129, 229, 255, 0.82)"
        : Math.random() > 0.38
          ? "rgba(255, 250, 182, 0.96)"
          : "rgba(255, 151, 73, 0.9)",
    });
  }
}

function spawnZone(zone) {
  zone.started = true;
  game.activeZone = zone;
  for (const enemy of zone.enemies) {
    game.enemies.push(new Enemy(enemy.kind, enemy.x, enemy.y, zone.id));
  }
  for (const prop of zone.props) {
    game.props.push(new Prop(prop.type, prop.x, prop.y, zone.id));
  }
  queueBanner(zone.boss ? `Boss：${zone.name}` : zone.name, 1800);
  queueMessage(zone.boss ? "把他打趴下，这关就结束" : "锁区清场，别让他们站着", 1300);
}

function zoneEnemiesAlive(zone) {
  return game.enemies.some((enemy) => enemy.zoneId === zone.id && enemy.hp > 0 && !enemy.removed);
}

function findNextZoneToStart() {
  for (let i = 0; i < game.zones.length; i += 1) {
    const zone = game.zones[i];
    if (zone.started) {
      continue;
    }
    if (i > 0 && !game.zones[i - 1].cleared) {
      return null;
    }
    return zone;
  }
  return null;
}

function updateZones() {
  const player = game.player;
  const nextZone = findNextZoneToStart();
  if (nextZone && player.x >= nextZone.triggerX) {
    spawnZone(nextZone);
  }

  if (game.activeZone && !zoneEnemiesAlive(game.activeZone)) {
    game.activeZone.cleared = true;
    queueMessage(game.activeZone.boss ? "第一关已打通" : "路障解除，继续往前", 1300);
    if (game.activeZone.boss) {
      game.state = "won";
      queueBanner("旧城街区清空", 2400);
    }
    game.activeZone = null;
  }
}

function attackPressed(name) {
  return justPressed.has(name);
}

function isDown(name) {
  return keys.has(name);
}

function canAct(player) {
  return player.hitstun === 0 && player.specialTimer === 0;
}

function nearestGrabbableEnemy(player) {
  let best = null;
  let bestDist = 9999;
  for (const enemy of game.enemies) {
    if (enemy.hp <= 0 || enemy.dead || enemy.grabbed || enemy.kind === "boss") {
      continue;
    }
    if (enemy.hitstun <= 110 || enemy.z !== 0) {
      continue;
    }
    const dx = Math.abs(enemy.x - player.x);
    const dy = Math.abs(enemy.y - player.y);
    const dist = dx + dy;
    if (dx <= 42 && dy <= 30 && dist < bestDist) {
      best = enemy;
      bestDist = dist;
    }
  }
  return best;
}

function nearestPickupProp(player) {
  let best = null;
  let bestDist = 9999;
  for (const prop of game.props) {
    if (prop.removed || prop.broken || prop.carried || prop.z !== 0) {
      continue;
    }
    const dx = Math.abs(prop.x - player.x);
    const dy = Math.abs(prop.y - player.y);
    const dist = dx + dy;
    if (dx <= 40 && dy <= 28 && dist < bestDist) {
      best = prop;
      bestDist = dist;
    }
  }
  return best;
}

function beginCarryEnemy(player, enemy) {
  player.carrying = { kind: "enemy", entity: enemy };
  enemy.grabbed = true;
  enemy.hitstun = 500;
  enemy.vx = 0;
  enemy.vy = 0;
  enemy.vz = 0;
  queueMessage("抓住敌人，A 膝击，S/F 投出去", 1000);
}

function beginCarryProp(player, prop) {
  player.carrying = { kind: "prop", entity: prop };
  prop.carried = true;
  prop.vx = 0;
  prop.vy = 0;
  prop.vz = 0;
  queueMessage(`${prop.label} 到手，S/F 投掷`, 900);
}

function dropCarry(player) {
  if (!player.carrying) {
    return;
  }

  if (player.carrying.kind === "enemy") {
    const enemy = player.carrying.entity;
    enemy.grabbed = false;
    enemy.x = clamp(player.x + player.facing * 22, 0, world.width);
    enemy.y = clamp(player.y, world.top, world.bottom);
    enemy.z = 0;
    enemy.vx = player.facing * 80;
    enemy.hitstun = 260;
  } else {
    const prop = player.carrying.entity;
    prop.carried = false;
    prop.x = clamp(player.x + player.facing * 24, 0, world.width);
    prop.y = clamp(player.y, world.top, world.bottom);
    prop.z = 0;
    prop.vx = player.facing * 60;
  }
  player.carrying = null;
}

function countCombo(damage, meterGain = 0) {
  const player = game.player;
  player.comboTimer = 1100;
  player.comboCount += 1;
  player.comboLabelTimer = 450;
  player.score += damage * 10;
  player.meter = clamp(player.meter + meterGain, 0, 100);
}

function hurtEnemy(enemy, options) {
  if (enemy.removed || enemy.grabbed || enemy.hp <= 0 || enemy.invuln > 0) {
    return;
  }

  const {
    damage,
    direction,
    push,
    launch = 0,
    hitstun = 240,
    meter = 0,
    shake = 7,
    hitStop = shake >= 12 ? 42 : shake >= 10 ? 34 : 22,
    thrown = false,
  } = options;

  enemy.hp -= damage;
  enemy.hitstun = Math.max(enemy.hitstun, hitstun);
  enemy.vx = push * direction;
  enemy.vz = launch;
  enemy.facing = direction === 1 ? -1 : 1;
  enemy.hitFlash = 130;
  if (thrown) {
    enemy.thrownTimer = 260;
    enemy.throwVictims.clear();
  }
  countCombo(damage, meter);
  triggerHitStop(hitStop);
  setImpact(enemy, 0.18, -0.16, 140);
  setImpact(game.player, -0.08, 0.06, 90);
  game.cameraShake = Math.max(game.cameraShake, shake);
  spawnBurst(enemy.x + direction * 18, enemy.y - 26, "rgba(255, 248, 180, 0.92)", 10);

  if (enemy.hp <= 0) {
    enemy.dead = true;
    enemy.hitstun = 520;
    enemy.koTimer = enemy.kind === "boss" ? 1800 : 1200;
    enemy.vx = push * 1.12 * direction;
    enemy.vz = Math.min(enemy.vz, -220);
    game.player.score += enemy.kind === "boss" ? 1600 : 250;
    spawnBurst(enemy.x, enemy.y - 20, "rgba(255, 117, 117, 0.85)", 18);
  }
}

function getBossAttackSpec(enemy) {
  const phaseTwo = enemy.phase === 2;
  const specs = {
    rush: {
      label: phaseTwo ? "裂地冲撞" : "冲撞",
      shape: "frontal",
      windup: phaseTwo ? 260 : 340,
      reachX: phaseTwo ? 218 : 164,
      depth: phaseTwo ? 48 : 40,
      damage: phaseTwo ? 24 : 20,
      push: phaseTwo ? 290 : 240,
      launch: phaseTwo ? -128 : -110,
      dashVel: phaseTwo ? 460 : 340,
      shake: phaseTwo ? 16 : 13,
      cooldownMin: phaseTwo ? 720 : 980,
      cooldownMax: phaseTwo ? 1080 : 1400,
      telegraphColor: phaseTwo ? "255, 122, 92" : "255, 180, 120",
    },
    slam: {
      label: phaseTwo ? "铁腕重砸" : "重砸",
      shape: "frontal",
      windup: phaseTwo ? 360 : 480,
      reachX: phaseTwo ? 196 : 150,
      depth: phaseTwo ? 72 : 58,
      damage: phaseTwo ? 30 : 26,
      push: phaseTwo ? 300 : 260,
      launch: phaseTwo ? -165 : -140,
      dashVel: 0,
      shake: phaseTwo ? 18 : 16,
      cooldownMin: phaseTwo ? 820 : 980,
      cooldownMax: phaseTwo ? 1140 : 1400,
      telegraphColor: phaseTwo ? "255, 94, 94" : "255, 143, 110",
    },
    burst: {
      label: "震地爆圈",
      shape: "radial",
      windup: 420,
      reachX: 138,
      depth: 84,
      damage: 24,
      push: 250,
      launch: -155,
      dashVel: 0,
      shake: 18,
      cooldownMin: 860,
      cooldownMax: 1220,
      telegraphColor: "255, 230, 110",
    },
  };
  return specs[enemy.attackType] || specs.rush;
}

function triggerBossPhaseTwo(enemy) {
  enemy.phase = 2;
  enemy.phaseTransition = 980;
  enemy.phaseTransitionTotal = 980;
  enemy.invuln = 980;
  enemy.attackWindup = 0;
  enemy.attackWindupTotal = 0;
  enemy.attackCooldown = 720;
  enemy.speed = 160;
  enemy.damage = 26;
  enemy.bodyColor = "#d6342c";
  enemy.accentColor = "#ffe16c";
  enemy.vx = 0;
  enemy.vy = 0;
  enemy.vz = 0;
  enemy.hitFlash = 280;
  game.cameraShake = Math.max(game.cameraShake, 18);
  spawnBurst(enemy.x, enemy.y - 26, "rgba(255, 153, 92, 0.94)", 28);
  queueBanner("Boss 二阶段", 2100);
  queueMessage("他提速了，重砸和爆圈的范围都会变大", 1700);
}

function chooseBossAttack(enemy, distX) {
  if (enemy.phase === 1) {
    return distX > 120 ? (Math.random() > 0.45 ? "rush" : "slam") : "slam";
  }
  if (distX < 92 && Math.random() > 0.42) {
    return "burst";
  }
  if (distX > 150) {
    return Math.random() > 0.38 ? "rush" : "slam";
  }
  return Math.random() > 0.5 ? "slam" : "burst";
}

function hurtPlayer(enemy, damage, push, launch) {
  const player = game.player;
  if (player.invuln > 0 || player.specialTimer > 0 || game.state === "won") {
    return;
  }

  player.hp -= damage;
  player.hitstun = 280;
  player.invuln = 620;
  player.vx = push;
  player.vz = launch;
  player.hitFlash = 140;
  triggerHitStop(30);
  setImpact(player, 0.22, -0.2, 150);
  player.comboTimer = 0;
  player.comboCount = 0;
  player.comboLabelTimer = 0;
  game.cameraShake = 12;
  dropCarry(player);
  spawnBurst(player.x, player.y - 35, "rgba(255, 165, 114, 0.88)", 14);

  if (player.hp <= 0) {
    player.hp = 0;
    game.state = "lost";
    queueBanner("你被放倒了", 2400);
  }
}

function startAttack(player, attackName) {
  player.currentAttack = attackName;
  player.attackTimer = attacks[attackName].duration;
  player.attackVictims.clear();
}

function tryStartAttack(player, type) {
  if (!canAct(player) || player.carrying) {
    return false;
  }

  if (player.attackTimer > 0) {
    const attack = attacks[player.currentAttack];
    const chainReady = player.attackTimer <= attack.duration * 0.45;
    if (!chainReady) {
      return false;
    }

    if (type === "light" && attack.chain) {
      startAttack(player, attack.chain);
      return true;
    }

    if (type === "heavy" && player.dashTimer > 0) {
      startAttack(player, "dashHeavy");
      return true;
    }

    return false;
  }

  if (type === "uppercut") {
    startAttack(player, "uppercut");
    return true;
  }

  if (type === "sweep") {
    startAttack(player, "sweep");
    return true;
  }

  if (type === "wavePunch") {
    startAttack(player, "wavePunch");
    return true;
  }

  if (type === "dashKnee") {
    startAttack(player, "dashKnee");
    return true;
  }

  if (type === "light") {
    startAttack(player, "light1");
    return true;
  }

  if (type === "heavy") {
    startAttack(player, player.dashTimer > 0 ? "dashHeavy" : "heavy");
    return true;
  }

  return false;
}

function tryInteract(player) {
  if (!canAct(player) || player.attackTimer > 0) {
    return false;
  }

  if (player.carrying) {
    throwCarry(player, 1.05);
    return true;
  }

  const enemy = nearestGrabbableEnemy(player);
  if (enemy) {
    beginCarryEnemy(player, enemy);
    return true;
  }

  const prop = nearestPickupProp(player);
  if (prop) {
    beginCarryProp(player, prop);
    return true;
  }

  return false;
}

function pummelCarry(player) {
  if (!player.carrying || player.carrying.kind !== "enemy") {
    return;
  }
  const enemy = player.carrying.entity;
  enemy.hp -= 10;
  enemy.hitFlash = 120;
  triggerHitStop(18);
  setImpact(enemy, 0.14, -0.1, 90);
  setImpact(player, -0.05, 0.04, 60);
  countCombo(10, 4);
  game.cameraShake = Math.max(game.cameraShake, 7);
  spawnBurst(player.x + player.facing * 10, player.y - 70, "rgba(255, 249, 174, 0.9)", 8);
  if (enemy.hp <= 0) {
    enemy.dead = true;
    enemy.hp = 0;
    enemy.grabbed = false;
    enemy.koTimer = 1000;
    enemy.x = player.x + player.facing * 26;
    enemy.y = player.y;
    enemy.z = -30;
    enemy.vx = player.facing * 220;
    enemy.vz = -170;
    player.carrying = null;
  }
}

function throwCarry(player, forceMultiplier = 1) {
  if (!player.carrying) {
    return;
  }

  if (player.carrying.kind === "enemy") {
    const enemy = player.carrying.entity;
    enemy.grabbed = false;
    enemy.x = player.x + player.facing * 16;
    enemy.y = player.y;
    enemy.z = -72;
    enemy.vx = 380 * player.facing * forceMultiplier;
    enemy.vz = -155;
    enemy.hitstun = 460;
    enemy.hp -= 16;
    enemy.throwVictims.clear();
    enemy.thrownTimer = 360;
    enemy.hitFlash = 130;
    triggerHitStop(26);
    setImpact(enemy, 0.18, -0.14, 120);
    setImpact(player, -0.07, 0.05, 80);
    if (enemy.hp <= 0) {
      enemy.dead = true;
      enemy.hp = 0;
      enemy.koTimer = 1000;
    }
    countCombo(16, 6);
    spawnBurst(enemy.x, enemy.y - 50, "rgba(255, 236, 136, 0.9)", 12);
  } else {
    const prop = player.carrying.entity;
    prop.carried = false;
    prop.x = player.x + player.facing * 20;
    prop.y = player.y;
    prop.z = -62;
    prop.vx = 410 * player.facing * forceMultiplier;
    prop.vz = -145;
    prop.thrownTimer = 420;
    prop.throwVictims.clear();
    spawnBurst(prop.x, prop.y - 40, "rgba(212, 255, 211, 0.72)", 10);
  }

  player.carrying = null;
  game.cameraShake = Math.max(game.cameraShake, 10);
}

function triggerSpecial(player) {
  if (!canAct(player) || player.attackTimer > 0 || player.meter < 100) {
    return;
  }
  dropCarry(player);
  player.specialTimer = SPECIAL_DURATION;
  player.specialVictims.clear();
  player.meter = 0;
  setImpact(player, 0.18, -0.14, 160);
  game.cameraShake = 24;
  game.specialFlashTimer = SPECIAL_FLASH_DURATION;
  game.specialFlashDuration = SPECIAL_FLASH_DURATION;
  game.specialRaysTimer = SPECIAL_RAYS_DURATION;
  game.specialRaysDuration = SPECIAL_RAYS_DURATION;
  triggerHitStop(64);
  spawnSpecialBurst(player);
  queueMessage("金焰爆气", 1100);
}

function impactThrownEnemy(enemy) {
  const direction = Math.sign(enemy.vx) || game.player.facing;
  for (const other of game.enemies) {
    if (other === enemy || other.hp <= 0 || other.grabbed || other.removed) {
      continue;
    }
    if (enemy.throwVictims.has(other)) {
      continue;
    }
    const dx = Math.abs(other.x - enemy.x);
    const dy = Math.abs(other.y - enemy.y);
    if (dx <= 46 && dy <= 28) {
      enemy.throwVictims.add(other);
      hurtEnemy(other, {
        damage: 22,
        direction,
        push: 260,
        launch: -90,
        hitstun: 420,
        meter: 8,
        shake: 11,
      });
      enemy.thrownTimer = 0;
      enemy.vx *= -0.35;
      break;
    }
  }
}

function explodeProp(prop) {
  prop.broken = true;
  prop.breakTimer = 200;
  prop.thrownTimer = 0;
  spawnBurst(prop.x, prop.y - 24, "rgba(255, 157, 110, 0.88)", 20);
  for (const enemy of game.enemies) {
    if (enemy.hp <= 0 || enemy.grabbed || enemy.removed) {
      continue;
    }
    const dx = Math.abs(enemy.x - prop.x);
    const dy = Math.abs(enemy.y - prop.y);
    if (dx <= 120 && dy <= 60) {
      hurtEnemy(enemy, {
        damage: 26,
        direction: enemy.x >= prop.x ? 1 : -1,
        push: 280,
        launch: -130,
        hitstun: 420,
        meter: 8,
        shake: 12,
      });
    }
  }
}

function impactThrownProp(prop) {
  const direction = Math.sign(prop.vx) || game.player.facing;
  for (const enemy of game.enemies) {
    if (enemy.hp <= 0 || enemy.grabbed || enemy.removed) {
      continue;
    }
    if (prop.throwVictims.has(enemy)) {
      continue;
    }
    const dx = Math.abs(enemy.x - prop.x);
    const dy = Math.abs(enemy.y - prop.y);
    if (dx <= 42 && dy <= 32) {
      prop.throwVictims.add(enemy);
      hurtEnemy(enemy, {
        damage: prop.damage,
        direction,
        push: 270,
        launch: -120,
        hitstun: 360,
        meter: 7,
        shake: 10,
      });
      if (prop.explosive) {
        explodeProp(prop);
      } else {
        prop.broken = true;
        prop.breakTimer = 180;
        prop.thrownTimer = 0;
        spawnBurst(prop.x, prop.y - 24, "rgba(255, 232, 177, 0.82)", 16);
      }
      break;
    }
  }
}

function updatePlayer(dt, now) {
  const player = game.player;
  const dtSeconds = dt / 1000;

  player.hitFlash = Math.max(0, player.hitFlash - dt);
  player.impactTimer = Math.max(0, player.impactTimer - dt);
  player.comboTimer = Math.max(0, player.comboTimer - dt);
  player.comboLabelTimer = Math.max(0, player.comboLabelTimer - dt);
  player.invuln = Math.max(0, player.invuln - dt);
  player.specialTimer = Math.max(0, player.specialTimer - dt);
  if (player.comboTimer === 0) {
    player.comboCount = 0;
  }

  if (attackPressed("r")) {
    resetGame();
    return;
  }

  if (attackPressed("d")) {
    triggerSpecial(player);
  }

  if (attackPressed("f")) {
    tryInteract(player);
  }

  if (attackPressed("ArrowLeft")) {
    if (now - player.tapTimers.ArrowLeft < DASH_TAP_WINDOW) {
      player.dashTimer = DASH_DURATION;
      player.facing = -1;
    }
    player.tapTimers.ArrowLeft = now;
  }

  if (attackPressed("ArrowRight")) {
    if (now - player.tapTimers.ArrowRight < DASH_TAP_WINDOW) {
      player.dashTimer = DASH_DURATION;
      player.facing = 1;
    }
    player.tapTimers.ArrowRight = now;
  }

  if (player.hitstun > 0) {
    player.hitstun = Math.max(0, player.hitstun - dt);
  }

  let moveX = 0;
  let moveY = 0;
  if (canAct(player)) {
    if (isDown("ArrowLeft")) {
      moveX -= 1;
    }
    if (isDown("ArrowRight")) {
      moveX += 1;
    }
    if (isDown("ArrowUp")) {
      moveY -= 1;
    }
    if (isDown("ArrowDown")) {
      moveY += 1;
    }
  }

  const length = Math.hypot(moveX, moveY) || 1;
  moveX /= length;
  moveY /= length;

  if (canAct(player) && player.attackTimer === 0 && isDown("shift") && moveX !== 0) {
    player.dashTimer = Math.max(player.dashTimer, DASH_HOLD_REFRESH);
  }

  player.dashTimer = Math.max(0, player.dashTimer - dt);

  const carrySlowdown = player.carrying ? 0.78 : 1;
  if (canAct(player) && player.attackTimer === 0) {
    const dashSpeed = player.dashTimer > 0 ? 1.46 : 1;
    player.vx = moveX * player.speed * dashSpeed * carrySlowdown;
    player.vy = moveY * player.speed * 0.74 * carrySlowdown;
    if (moveX !== 0) {
      player.facing = Math.sign(moveX);
    }
  }

  if (player.carrying) {
    player.vx *= 0.92;
    player.vy *= 0.92;
    if (attackPressed("a")) {
      if (player.carrying.kind === "enemy") {
        pummelCarry(player);
      } else {
        throwCarry(player, 0.88);
      }
    } else if (attackPressed("s")) {
      throwCarry(player, 1.1);
    }
  } else if (player.attackTimer > 0) {
    player.attackTimer = Math.max(0, player.attackTimer - dt);
    const attack = attacks[player.currentAttack];
    player.vx *= 0.82;
    player.vy *= 0.78;
    player.x += player.facing * attack.move * dtSeconds;

    const elapsed = attack.duration - player.attackTimer;
    const active = elapsed >= attack.hitStart && elapsed <= attack.hitEnd;
    if (active) {
      for (const enemy of game.enemies) {
        if (enemy.hp <= 0 || enemy.grabbed || enemy.removed) {
          continue;
        }
        if (player.attackVictims.has(enemy)) {
          continue;
        }
        const dx = (enemy.x - player.x) * player.facing;
        const dy = Math.abs(enemy.y - player.y);
        if (
          dx > (attack.minDx || 5) &&
          dx <= attack.reach &&
          dy <= attack.depth &&
          (!attack.groundedOnly || enemy.z === 0)
        ) {
          player.attackVictims.add(enemy);
          hurtEnemy(enemy, {
            damage: attack.damage,
            direction: player.facing,
            push: attack.push,
            launch: attack.launch,
            hitstun: attack.hitstun || 240,
            hitStop: attack.hitStop,
            meter: attack.meter,
            shake: attack.shake || 7,
          });
        }
      }
    }

    if (player.attackTimer === 0) {
      player.currentAttack = null;
      player.attackVictims.clear();
    }
  } else if (canAct(player)) {
    const uppercutPressed =
      (attackPressed("a") && isDown("s")) || (attackPressed("s") && isDown("a"));
    const downHeld = isDown("ArrowDown");
    if (attackPressed("q")) {
      tryStartAttack(player, "sweep");
    } else if (uppercutPressed) {
      tryStartAttack(player, "uppercut");
    } else if (attackPressed("s") && downHeld) {
      tryStartAttack(player, "wavePunch");
    } else if (attackPressed("a") && player.dashTimer > 0) {
      tryStartAttack(player, "dashKnee");
    } else if (attackPressed("a")) {
      tryStartAttack(player, "light");
    } else if (attackPressed("s")) {
      tryStartAttack(player, "heavy");
    }
  }

  if (player.specialTimer > 0) {
    player.vx *= 0.86;
    player.vy *= 0.86;
    const pulse = player.specialTimer > SPECIAL_DURATION - SPECIAL_STARTUP ? 0 : 1;
    if (pulse && player.specialTimer % 82 < 42) {
      for (const enemy of game.enemies) {
        if (enemy.hp <= 0 || enemy.grabbed || enemy.removed) {
          continue;
        }
        if (player.specialVictims.has(enemy)) {
          continue;
        }
        const dx = Math.abs(enemy.x - player.x);
        const dy = Math.abs(enemy.y - player.y);
        if (dx <= 155 && dy <= 74) {
          player.specialVictims.add(enemy);
          hurtEnemy(enemy, {
            damage: 28,
            direction: enemy.x >= player.x ? 1 : -1,
            push: 320,
            launch: -160,
            hitstun: 360,
            meter: 0,
            shake: 12,
          });
        }
      }
    }
  }

  player.vz += 640 * dtSeconds;
  player.z += player.vz * dtSeconds;
  if (player.z > 0) {
    player.z = 0;
    player.vz = 0;
  }

  player.x += player.vx * dtSeconds;
  player.y += player.vy * dtSeconds;

  let minX = 40;
  let maxX = world.width - 40;
  if (game.activeZone) {
    minX = game.activeZone.left + 20;
    maxX = game.activeZone.right - 20;
  }
  player.x = clamp(player.x, minX, maxX);
  player.y = clamp(player.y, world.top, world.bottom);
}

function resolveEnemyAttack(enemy, player) {
  const dx = player.x - enemy.x;
  const dy = Math.abs(player.y - enemy.y);
  const distanceX = Math.abs(dx);
  const direction = enemy.kind === "boss" ? enemy.attackFacing : dx >= 0 ? 1 : -1;

  if (enemy.kind === "boss") {
    const spec = getBossAttackSpec(enemy);
    const frontDistance = (player.x - enemy.x) * direction;

    if (enemy.attackType === "rush") {
      enemy.vx = direction * spec.dashVel;
      if (frontDistance >= 0 && frontDistance <= spec.reachX && dy <= spec.depth) {
        hurtPlayer(enemy, spec.damage, direction * spec.push, spec.launch);
      }
    } else if (spec.shape === "radial") {
      if (distanceX <= spec.reachX && dy <= spec.depth) {
        hurtPlayer(enemy, spec.damage, (player.x >= enemy.x ? 1 : -1) * spec.push, spec.launch);
      }
      spawnBurst(enemy.x, enemy.y - 16, "rgba(255, 219, 103, 0.82)", 22);
      game.cameraShake = Math.max(game.cameraShake, spec.shake);
    } else {
      if (frontDistance >= 0 && frontDistance <= spec.reachX && dy <= spec.depth) {
        hurtPlayer(enemy, spec.damage, direction * spec.push, spec.launch);
      }
      spawnBurst(enemy.x, enemy.y - 16, "rgba(255, 198, 115, 0.75)", 18);
      game.cameraShake = Math.max(game.cameraShake, spec.shake);
    }
    enemy.attackCooldown = rand(spec.cooldownMin, spec.cooldownMax);
  } else {
    const frontDistance = (player.x - enemy.x) * enemy.facing;
    if (frontDistance >= 0 && frontDistance <= 74 && dy <= 34) {
      hurtPlayer(enemy, enemy.damage, direction * 180, -90);
    }
    enemy.attackCooldown = rand(700, 1200);
  }
}

function updateEnemies(dt) {
  const dtSeconds = dt / 1000;
  const player = game.player;

  for (const enemy of game.enemies) {
    enemy.hitFlash = Math.max(0, enemy.hitFlash - dt);
    enemy.impactTimer = Math.max(0, enemy.impactTimer - dt);
    enemy.invuln = Math.max(0, enemy.invuln - dt);
    enemy.attackCooldown = Math.max(0, enemy.attackCooldown - dt);
    enemy.hitstun = Math.max(0, enemy.hitstun - dt);
    enemy.thrownTimer = Math.max(0, enemy.thrownTimer - dt);

    if (enemy.removed) {
      continue;
    }

    if (enemy.grabbed) {
      enemy.x = player.x + player.facing * 12;
      enemy.y = player.y;
      enemy.z = -72;
      enemy.vx = 0;
      enemy.vy = 0;
      enemy.vz = 0;
      continue;
    }

    if (enemy.kind === "boss" && !enemy.dead && enemy.phase === 1 && enemy.hp <= enemy.maxHp * 0.48) {
      triggerBossPhaseTwo(enemy);
    }

    if (enemy.dead) {
      enemy.koTimer -= dt;
      enemy.vx *= 0.92;
      enemy.vy *= 0.92;
      if (enemy.koTimer <= 0 && enemy.z === 0) {
        enemy.removed = true;
        continue;
      }
    } else if (enemy.phaseTransition > 0) {
      enemy.phaseTransition = Math.max(0, enemy.phaseTransition - dt);
      enemy.vx *= 0.82;
      enemy.vy *= 0.82;
      if (enemy.phaseTransition === 0) {
        queueMessage("注意地面预警，侧移再打反手", 1300);
      }
    } else if (enemy.attackWindup > 0) {
      enemy.attackWindup = Math.max(0, enemy.attackWindup - dt);
      enemy.vx *= 0.85;
      enemy.vy *= 0.85;
      if (enemy.attackWindup === 0) {
        resolveEnemyAttack(enemy, player);
      }
    } else if (enemy.hitstun === 0 && game.state !== "won") {
      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y + enemy.aiOffset;
      const distX = Math.abs(dx);
      const distY = Math.abs(dy);
      enemy.facing = dx >= 0 ? 1 : -1;

      if (enemy.kind === "boss") {
        if (distX < 160 && distY < 60 && enemy.attackCooldown === 0) {
          enemy.attackType = chooseBossAttack(enemy, distX);
          enemy.attackFacing = dx >= 0 ? 1 : -1;
          enemy.attackWindup = getBossAttackSpec(enemy).windup;
          enemy.attackWindupTotal = enemy.attackWindup;
        } else {
          const desiredX = distX > (enemy.phase === 2 ? 58 : 72) ? Math.sign(dx) : 0;
          const desiredY = distY > 14 ? Math.sign(dy) : 0;
          enemy.vx = desiredX * enemy.speed;
          enemy.vy = desiredY * enemy.speed * 0.56;
        }
      } else if (distX < 66 && distY < 30 && enemy.attackCooldown === 0) {
        enemy.attackWindup = enemy.kind === "brute" ? 340 : 260;
        enemy.attackWindupTotal = enemy.attackWindup;
      } else {
        const speedFactor = enemy.kind === "brute" ? 0.84 : 1;
        const desiredX = distX > 42 ? Math.sign(dx) : 0;
        const desiredY = distY > 12 ? Math.sign(dy) : 0;
        enemy.vx = desiredX * enemy.speed * speedFactor;
        enemy.vy = desiredY * enemy.speed * 0.58 * speedFactor;
      }
    } else {
      enemy.vx *= 0.9;
      enemy.vy *= 0.9;
    }

    if (enemy.thrownTimer > 0 && !enemy.dead) {
      impactThrownEnemy(enemy);
    }

    enemy.vz += 640 * dtSeconds;
    enemy.z += enemy.vz * dtSeconds;
    if (enemy.z > 0) {
      enemy.z = 0;
      enemy.vz = 0;
    }

    enemy.x += enemy.vx * dtSeconds;
    enemy.y += enemy.vy * dtSeconds;
    enemy.x = clamp(enemy.x, 20, world.width - 20);
    enemy.y = clamp(enemy.y, world.top, world.bottom);
  }
}

function updateProps(dt) {
  const dtSeconds = dt / 1000;
  for (const prop of game.props) {
    if (prop.removed) {
      continue;
    }

    if (prop.carried) {
      continue;
    }

    if (prop.broken) {
      prop.breakTimer -= dt;
      if (prop.breakTimer <= 0) {
        prop.removed = true;
      }
      continue;
    }

    prop.thrownTimer = Math.max(0, prop.thrownTimer - dt);
    if (prop.thrownTimer > 0) {
      impactThrownProp(prop);
    }

    prop.vz += 640 * dtSeconds;
    prop.z += prop.vz * dtSeconds;
    if (prop.z > 0) {
      prop.z = 0;
      if (prop.thrownTimer > 0) {
        if (prop.explosive) {
          explodeProp(prop);
        } else if (Math.abs(prop.vx) > 100 || Math.abs(prop.vz) > 60) {
          prop.broken = true;
          prop.breakTimer = 180;
          spawnBurst(prop.x, prop.y - 20, "rgba(255, 235, 177, 0.82)", 16);
        }
      }
      prop.vz = 0;
    }

    prop.x += prop.vx * dtSeconds;
    prop.y += prop.vy * dtSeconds;
    prop.vx *= 0.93;
    prop.vy *= 0.93;
    prop.x = clamp(prop.x, 30, world.width - 30);
    prop.y = clamp(prop.y, world.top, world.bottom);
  }
}

function updateParticles(dt) {
  const dtSeconds = dt / 1000;
  for (const particle of game.particles) {
    particle.life -= dt;
    particle.x += particle.vx * dtSeconds;
    particle.y += particle.vy * dtSeconds;
    particle.vx *= 0.92;
    particle.vy *= 0.92;
  }
  game.particles = game.particles.filter((particle) => particle.life > 0);
}

function updateCamera() {
  const target = clamp(game.player.x - WIDTH * 0.42, 0, world.width - WIDTH);
  game.cameraX = lerp(game.cameraX, target, 0.12);
}

function cleanupRemovedActors() {
  game.enemies = game.enemies.filter((enemy) => !enemy.removed);
  game.props = game.props.filter((prop) => !prop.removed);
}

function update(dt, now) {
  if (game.waveBannerTimer > 0) {
    game.waveBannerTimer = Math.max(0, game.waveBannerTimer - dt);
  }
  if (game.messageTimer > 0) {
    game.messageTimer = Math.max(0, game.messageTimer - dt);
  }
  if (game.specialFlashTimer > 0) {
    game.specialFlashTimer = Math.max(0, game.specialFlashTimer - dt);
  }
  if (game.specialRaysTimer > 0) {
    game.specialRaysTimer = Math.max(0, game.specialRaysTimer - dt);
  }
  if (game.hitStop > 0) {
    game.hitStop = Math.max(0, game.hitStop - dt);
    return;
  }

  game.time += dt;
  game.cameraShake = Math.max(0, game.cameraShake - dt * 0.05);

  if (game.state === "intro") {
    game.introTimer -= dt;
    updatePlayer(dt, now);
    updateEnemies(dt);
    updateProps(dt);
    updateParticles(dt);
    updateZones();
    updateCamera();
    cleanupRemovedActors();
    if (game.introTimer <= 0) {
      game.state = "fight";
    }
    return;
  }

  if (game.state === "won" || game.state === "lost") {
    updatePlayer(dt, now);
    updateEnemies(dt);
    updateProps(dt);
    updateParticles(dt);
    updateCamera();
    cleanupRemovedActors();
    return;
  }

  updatePlayer(dt, now);
  updateEnemies(dt);
  updateProps(dt);
  updateParticles(dt);
  updateZones();
  updateCamera();
  cleanupRemovedActors();
}

function drawBackground() {
  const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  sky.addColorStop(0, "#ffe78a");
  sky.addColorStop(0.56, "#ff9b62");
  sky.addColorStop(0.561, "#674538");
  sky.addColorStop(1, "#40231d");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = "rgba(255, 247, 196, 0.82)";
  ctx.beginPath();
  ctx.arc(780, 92, 46, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.arc(120 + i * 190 - (game.cameraX * 0.15) % 210, 92 + (i % 2) * 18, 40 + i * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  const farOffset = -(game.cameraX * 0.28) % 220;
  for (let i = -1; i < 8; i += 1) {
    const x = farOffset + i * 220;
    const h = 110 + (i % 4) * 26;
    ctx.fillStyle = i % 2 === 0 ? "#9b4b3c" : "#74352e";
    ctx.fillRect(x, 148 - h, 120, h);
    ctx.fillStyle = "rgba(255, 238, 194, 0.18)";
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        ctx.fillRect(x + 14 + col * 24, 148 - h + 14 + row * 24, 10, 10);
      }
    }
  }

  const nearOffset = -(game.cameraX * 0.55) % 320;
  for (let i = -1; i < 6; i += 1) {
    const x = nearOffset + i * 320;
    ctx.fillStyle = "#d2ba92";
    ctx.fillRect(x, 168, 210, 26);
    ctx.fillStyle = "#6d4a39";
    ctx.fillRect(x, 194, 210, 22);
    ctx.fillStyle = "#54403a";
    ctx.fillRect(x + 26, 126, 18, 68);
    ctx.fillRect(x + 165, 126, 18, 68);
  }

  ctx.fillStyle = "#7f5548";
  ctx.fillRect(0, 194, WIDTH, HEIGHT - 194);
  ctx.fillStyle = "#5d382d";
  ctx.fillRect(0, 214, WIDTH, HEIGHT - 214);
  ctx.fillStyle = "#af7c53";
  ctx.fillRect(0, world.top, WIDTH, world.bottom - world.top);
  ctx.fillStyle = "#5e352a";
  ctx.fillRect(0, world.top - 10, WIDTH, 14);

  ctx.strokeStyle = "rgba(86, 57, 39, 0.16)";
  for (let i = 0; i < 17; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, world.top + i * 14);
    ctx.lineTo(WIDTH, world.top + i * 14);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 231, 182, 0.2)";
  const roadOffset = -(game.cameraX * 0.8) % 190;
  for (let i = -1; i < 7; i += 1) {
    ctx.fillRect(roadOffset + i * 190, 438, 112, 8);
  }
}

function drawShadow(x, y, scale) {
  ctx.fillStyle = "rgba(42, 17, 10, 0.25)";
  ctx.beginPath();
  ctx.ellipse(screenX(x), y + 10, 18 * scale, 8 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
}

function rotatePoint(x, y, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c };
}

function limbChain(start, upper, fore, angleA, angleB) {
  const elbow = {
    x: start.x + Math.cos(angleA) * upper,
    y: start.y + Math.sin(angleA) * upper,
  };
  const hand = {
    x: elbow.x + Math.cos(angleA + angleB) * fore,
    y: elbow.y + Math.sin(angleA + angleB) * fore,
  };
  return [start, elbow, hand];
}

function solveTwoBoneIK(start, target, upper, lower, bendDir) {
  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const rawDist = Math.hypot(dx, dy) || 0.001;
  const minReach = Math.max(Math.abs(upper - lower) + 0.5, 0.001);
  const maxReach = Math.max(upper + lower - 0.5, minReach);
  const dist = clamp(rawDist, minReach, maxReach);
  const aim = Math.atan2(dy, dx);
  const clampedTarget = {
    x: start.x + Math.cos(aim) * dist,
    y: start.y + Math.sin(aim) * dist,
  };
  const jointOffset = Math.acos(
    clamp((upper * upper + dist * dist - lower * lower) / (2 * upper * dist), -1, 1)
  );
  const kneeAngle = aim + jointOffset * bendDir;
  const knee = {
    x: start.x + Math.cos(kneeAngle) * upper,
    y: start.y + Math.sin(kneeAngle) * upper,
  };

  return [start, knee, clampedTarget];
}

function resolveLegPose(hip, hintChain, side, pose) {
  const maxReach = pose.legUpper + pose.legLower - 1;
  const minX = hip.x - maxReach * 0.74;
  const maxX = hip.x + maxReach * 0.74;
  const footTarget = {
    x: clamp(hintChain[2].x + side * pose.footSpread, minX, maxX),
    y: clamp(hintChain[2].y, pose.groundY - pose.footLift, pose.groundY + pose.footSink),
  };

  if (side > 0) {
    footTarget.x = Math.max(hip.x + pose.stanceInset, footTarget.x);
  } else {
    footTarget.x = Math.min(hip.x - pose.stanceInset, footTarget.x);
  }

  const chain = solveTwoBoneIK(hip, footTarget, pose.legUpper, pose.legLower, side > 0 ? -1 : 1);
  const lift = pose.groundY - chain[2].y;
  const footAngleBase = clamp((chain[2].x - hip.x) * 0.026, -0.34, 0.34);
  const footAngle = footAngleBase - lift * 0.045 + side * 0.04;
  const toe = {
    x: chain[2].x + Math.cos(footAngle) * pose.bootLen * 0.54,
    y: chain[2].y + Math.sin(footAngle) * pose.bootLen * 0.54,
  };

  return {
    chain,
    foot: chain[2],
    toe,
    footAngle,
  };
}

function drawChain(points, width, color, outline) {
  const radius = width * 0.52;
  for (let i = 0; i < points.length - 1; i += 1) {
    drawCapsule(points[i], points[i + 1], radius, color, outline);
  }
  for (let i = 1; i < points.length - 1; i += 1) {
    drawDisk(points[i].x, points[i].y, radius * 0.84, color, outline);
  }
}

function drawDisk(x, y, radius, color, outline) {
  ctx.fillStyle = outline;
  ctx.beginPath();
  ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function roundedRectPath(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawBoot(x, y, w, h, color, outline) {
  ctx.fillStyle = outline;
  roundedRectPath(x - 1, y - 1, w + 2, h + 2, 4);
  ctx.fill();
  ctx.fillStyle = color;
  roundedRectPath(x, y, w, h, 4);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  roundedRectPath(x + 2, y + 1, w * 0.34, h * 0.46, 3);
  ctx.fill();
  ctx.fillStyle = "rgba(15, 9, 20, 0.28)";
  roundedRectPath(x, y + h * 0.62, w, h * 0.38, 3);
  ctx.fill();
}

function bootPath(w, h) {
  const heel = -w * 0.24;
  const toe = w * 0.68;
  const cuffTop = -h * 0.82;
  const cuffBottom = -h * 0.14;
  const soleTop = h * 0.02;
  const soleBottom = h * 0.38;

  ctx.beginPath();
  ctx.moveTo(heel, cuffTop);
  ctx.quadraticCurveTo(w * 0.02, -h * 0.9, w * 0.2, cuffTop);
  ctx.lineTo(w * 0.28, cuffBottom);
  ctx.quadraticCurveTo(w * 0.58, cuffBottom + h * 0.05, toe, soleTop);
  ctx.quadraticCurveTo(w * 0.8, soleBottom, w * 0.16, soleBottom);
  ctx.lineTo(-w * 0.28, soleBottom);
  ctx.quadraticCurveTo(-w * 0.46, soleBottom - h * 0.02, -w * 0.44, soleTop);
  ctx.lineTo(heel, cuffTop);
  ctx.closePath();
}

function drawBootAt(ankle, angle, w, h, color, outline) {
  ctx.save();
  ctx.translate(ankle.x - w * 0.18, ankle.y);
  ctx.rotate(angle);

  ctx.fillStyle = outline;
  ctx.save();
  ctx.scale((w + 2) / w, (h + 2) / h);
  bootPath(w, h);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = color;
  bootPath(w, h);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.13)";
  roundedRectPath(-w * 0.02, -h * 0.56, w * 0.24, h * 0.16, 3);
  ctx.fill();

  ctx.fillStyle = "rgba(15, 9, 20, 0.32)";
  roundedRectPath(-w * 0.08, h * 0.12, w * 0.78, h * 0.18, 3);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  roundedRectPath(-w * 0.16, -h * 0.76, w * 0.4, h * 0.12, 3);
  ctx.fill();
  ctx.restore();
}

function capsulePath(a, b, r) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const mag = Math.hypot(dx, dy);
  if (mag < 0.001) {
    ctx.beginPath();
    ctx.arc(a.x, a.y, r, 0, Math.PI * 2);
    return;
  }
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.arc(a.x, a.y, r, angle + Math.PI / 2, angle - Math.PI / 2, true);
  ctx.arc(b.x, b.y, r, angle - Math.PI / 2, angle + Math.PI / 2, true);
  ctx.closePath();
}

function drawCapsule(a, b, r, color, outline) {
  ctx.fillStyle = outline;
  capsulePath(a, b, r + 2);
  ctx.fill();
  ctx.fillStyle = color;
  capsulePath(a, b, r);
  ctx.fill();

  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const mag = Math.hypot(dx, dy) || 1;
  const nx = -dy / mag;
  const ny = dx / mag;
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = Math.max(2, r * 0.35);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(a.x + nx * r * 0.24, a.y + ny * r * 0.24);
  ctx.lineTo(b.x + nx * r * 0.24, b.y + ny * r * 0.24);
  ctx.stroke();
}

function drawGlove(x, y, size, color, outline) {
  ctx.fillStyle = outline;
  ctx.beginPath();
  ctx.ellipse(x, y, size + 2, size * 0.82 + 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, size, size * 0.82, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.ellipse(x - size * 0.2, y - size * 0.12, size * 0.34, size * 0.18, -0.2, 0, Math.PI * 2);
  ctx.fill();
}

function headPath(headR) {
  ctx.beginPath();
  ctx.moveTo(-headR * 0.88, -headR * 0.24);
  ctx.quadraticCurveTo(-headR * 1.06, headR * 0.34, -headR * 0.42, headR * 0.98);
  ctx.quadraticCurveTo(0, headR * 1.14, headR * 0.42, headR * 0.98);
  ctx.quadraticCurveTo(headR * 1.06, headR * 0.34, headR * 0.88, -headR * 0.24);
  ctx.quadraticCurveTo(0, -headR * 1.08, -headR * 0.88, -headR * 0.24);
  ctx.closePath();
}

function drawHeadShape(headR, palette, flash) {
  ctx.fillStyle = palette.outline;
  ctx.save();
  ctx.scale((headR + 2) / headR, (headR + 2) / headR);
  headPath(headR);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = flash || palette.head;
  headPath(headR);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.ellipse(-headR * 0.22, -headR * 0.42, headR * 0.34, headR * 0.18, -0.25, 0, Math.PI * 2);
  ctx.fill();
}

function drawFace(headR, palette, role) {
  ctx.fillStyle = palette.face;
  roundedRectPath(-headR * 0.72, -headR * 0.16, headR * 1.44, headR * 0.88, 7);
  ctx.fill();

  ctx.fillStyle = palette.hair;
  ctx.beginPath();
  ctx.moveTo(-headR * 0.92, -headR * 0.22);
  ctx.quadraticCurveTo(-headR * 0.36, -headR * 1.08, 0, -headR * 0.72);
  ctx.quadraticCurveTo(headR * 0.42, -headR * 1.12, headR * 0.94, -headR * 0.26);
  ctx.lineTo(headR * 0.72, headR * 0.02);
  ctx.quadraticCurveTo(0, -headR * 0.24, -headR * 0.72, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = palette.eye;
  ctx.fillRect(-headR * 0.42, 0, 4, 4);
  ctx.fillRect(headR * 0.16, 0, 4, 4);
  ctx.strokeStyle = "rgba(20, 18, 19, 0.45)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-headR * 0.5, -headR * 0.08);
  ctx.lineTo(-headR * 0.24, -headR * 0.14);
  ctx.moveTo(headR * 0.08, -headR * 0.14);
  ctx.lineTo(headR * 0.34, -headR * 0.08);
  ctx.stroke();

  ctx.strokeStyle = palette.mouth;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  if (role === "player") {
    ctx.arc(0, headR * 0.16, headR * 0.22, 0.15, Math.PI - 0.15, false);
  } else {
    ctx.arc(0, headR * 0.18, headR * 0.2, 0.2, Math.PI - 0.2, false);
  }
  ctx.stroke();
}

function torsoPath(w, h) {
  const shoulder = w * 0.62;
  const waist = w * 0.42;
  const hem = w * 0.48;
  const top = -57;
  const bottom = top + h;
  ctx.beginPath();
  ctx.moveTo(-shoulder, top + 6);
  ctx.quadraticCurveTo(0, top - 5, shoulder, top + 6);
  ctx.lineTo(waist, bottom - 8);
  ctx.quadraticCurveTo(hem * 0.82, bottom + 2, 0, bottom + 4);
  ctx.quadraticCurveTo(-hem * 0.82, bottom + 2, -waist, bottom - 8);
  ctx.closePath();
}

function drawTorsoShape(pose, palette, role, flash) {
  ctx.fillStyle = palette.outline;
  ctx.save();
  ctx.scale((pose.bodyScaleX * 1.03), (pose.bodyScaleY * 1.04));
  torsoPath(pose.torsoW + 3, pose.torsoH + 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = flash || palette.body;
  torsoPath(pose.torsoW, pose.torsoH);
  ctx.fill();

  ctx.fillStyle = palette.trim;
  roundedRectPath(-pose.torsoW * 0.11, -54, pose.torsoW * 0.22, pose.torsoH * 0.78, 5);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.16)";
  roundedRectPath(-pose.torsoW * 0.34, -50, pose.torsoW * 0.18, pose.torsoH * 0.34, 4);
  ctx.fill();

  ctx.fillStyle = "rgba(18, 10, 22, 0.22)";
  roundedRectPath(-pose.torsoW * 0.5, -24, pose.torsoW, 12, 5);
  ctx.fill();

  ctx.fillStyle = palette.outline;
  ctx.beginPath();
  ctx.moveTo(-pose.torsoW * 0.2, -58);
  ctx.lineTo(-pose.torsoW * 0.02, -42);
  ctx.lineTo(-pose.torsoW * 0.15, -28);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(pose.torsoW * 0.2, -58);
  ctx.lineTo(pose.torsoW * 0.02, -42);
  ctx.lineTo(pose.torsoW * 0.15, -28);
  ctx.closePath();
  ctx.fill();

  if (role === "player") {
    ctx.fillStyle = "rgba(255,255,255,0.14)";
    roundedRectPath(-pose.torsoW * 0.46, -58, pose.torsoW * 0.16, 12, 5);
    ctx.fill();
    roundedRectPath(pose.torsoW * 0.3, -58, pose.torsoW * 0.16, 12, 5);
    ctx.fill();
  }
}

function drawPelvisShape(pose, palette, flash) {
  const w = pose.pelvisW;
  const h = pose.pelvisH;

  ctx.fillStyle = palette.outline;
  ctx.beginPath();
  ctx.moveTo(-w * 0.56, pose.hipsY - 2);
  ctx.quadraticCurveTo(0, pose.hipsY - h * 0.44, w * 0.56, pose.hipsY - 2);
  ctx.lineTo(w * 0.42, pose.hipsY + h);
  ctx.quadraticCurveTo(0, pose.hipsY + h + 4, -w * 0.42, pose.hipsY + h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = flash || palette.pants;
  ctx.beginPath();
  ctx.moveTo(-w * 0.48, pose.hipsY);
  ctx.quadraticCurveTo(0, pose.hipsY - h * 0.28, w * 0.48, pose.hipsY);
  ctx.lineTo(w * 0.34, pose.hipsY + h - 2);
  ctx.quadraticCurveTo(0, pose.hipsY + h + 1, -w * 0.34, pose.hipsY + h - 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  roundedRectPath(-w * 0.18, pose.hipsY + 1, w * 0.22, 5, 2);
  ctx.fill();

  ctx.strokeStyle = palette.outline;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, pose.hipsY + 2);
  ctx.lineTo(0, pose.hipsY + h - 2);
  ctx.stroke();
}

function getBrawlerPalette(actor, role) {
  if (role === "player") {
    return {
      body: "#6c39ff",
      sleeve: "#9d82ff",
      head: "#f3c296",
      face: "#ffe7d0",
      eye: "#141414",
      pants: "#2b1857",
      boots: "#180d31",
      outline: "#1b1029",
      glove: "#ffcf5f",
      trim: "#dac5ff",
      hair: "#4b22b2",
      mouth: "#7c4d26",
      trail: "255, 237, 149",
    };
  }

  return {
    body: actor.bodyColor,
    sleeve: actor.kind === "boss" ? "#f8977f" : actor.kind === "brute" ? "#aa93ff" : "#88dde5",
    head: actor.kind === "boss" ? "#efb48d" : actor.kind === "brute" ? "#e7c29f" : "#e2bf98",
    face: actor.kind === "boss" ? "#ffe5d7" : "#e8f2ff",
    eye: "#101010",
    pants: actor.kind === "boss" ? "#432924" : "#263043",
    boots: "#17161a",
    outline: actor.kind === "boss" ? "#381815" : "#201723",
    glove: actor.kind === "boss" ? "#ff9d74" : actor.kind === "brute" ? "#d9cbff" : "#ffe28b",
    trim: actor.kind === "boss" ? "#ffc6af" : actor.kind === "brute" ? "#cec0ff" : "#c0f0f5",
    hair: actor.kind === "boss" ? "#5b1f17" : actor.kind === "brute" ? "#463574" : "#1b5960",
    mouth: actor.kind === "boss" ? "#7d3128" : "#5f3f2c",
    trail: actor.kind === "boss" ? "255, 187, 110" : "255, 163, 143",
  };
}

function getBasePose(actor, role) {
  const moveMag = Math.hypot(actor.vx || 0, actor.vy || 0);
  const ref = role === "player" ? 200 : actor.kind === "boss" ? 150 : 130;
  const moveNorm = clamp(moveMag / ref, 0, 1.6);
  const cycle = game.time / 120 + actor.x * 0.012;
  const walk = Math.sin(cycle) * moveNorm;
  const idle = Math.sin(game.time / 260 + actor.x * 0.009);
  const bounce = moveNorm > 0.08 ? Math.cos(cycle * 2) * 2.6 * moveNorm : idle * 0.9;
  const pose = {
    bounce,
    torsoTilt: clamp((actor.vx || 0) / 640, -0.22, 0.22),
    bodyScaleX: 1 + Math.abs(walk) * 0.04,
    bodyScaleY: 1 - Math.abs(walk) * 0.04,
    headTilt: walk * 0.08,
    yShift: 0,
    shouldersY: -50,
    hipsY: -18,
    shoulderSpan: role === "player" ? 17 : actor.kind === "boss" ? 20 : 16,
    hipSpan: role === "player" ? 12 : actor.kind === "boss" ? 14 : 11,
    torsoW: role === "player" ? 36 : actor.kind === "boss" ? 41 : 33,
    torsoH: role === "player" ? 40 : actor.kind === "boss" ? 43 : 38,
    headR: role === "player" ? 15 : actor.kind === "boss" ? 15 : 13,
    limbUpper: actor.kind === "boss" ? 20 : 17,
    limbFore: actor.kind === "boss" ? 18 : 15,
    legUpper: actor.kind === "boss" ? 22 : 18,
    legLower: actor.kind === "boss" ? 20 : 18,
    armWidth: actor.kind === "boss" ? 12 : 10,
    legWidth: actor.kind === "boss" ? 13 : 11,
    pelvisW: role === "player" ? 30 : actor.kind === "boss" ? 34 : 28,
    pelvisH: role === "player" ? 13 : actor.kind === "boss" ? 15 : 12,
    bootLen: actor.kind === "boss" ? 24 : 21,
    bootHeight: actor.kind === "boss" ? 14 : 12,
    groundY: actor.kind === "boss" ? 18 : 16,
    footSpread: role === "player" ? 4.8 : actor.kind === "boss" ? 5.6 : 4.2,
    footLift: role === "player" ? 6 : actor.kind === "boss" ? 5 : 4.5,
    footSink: actor.kind === "boss" ? 2 : 1.2,
    stanceInset: role === "player" ? 2.8 : 2.3,
    frontArmA1: 1.15 - walk * 0.48,
    frontArmA2: 0.28 + walk * 0.12,
    rearArmA1: 1.72 + walk * 0.34,
    rearArmA2: 0.12,
    frontLegA1: 1.28 + walk * 0.75,
    frontLegA2: -0.38 - walk * 0.52,
    rearLegA1: 1.28 - walk * 0.75,
    rearLegA2: -0.38 + walk * 0.52,
    attackTrail: null,
    torsoAccent: 0,
  };

  if (actor.hitstun > 0) {
    pose.torsoTilt = -0.24;
    pose.headTilt = -0.12;
    pose.frontArmA1 = 2.08;
    pose.rearArmA1 = 1.98;
    pose.frontLegA1 = 1.1;
    pose.rearLegA1 = 1.52;
    pose.yShift = 2;
  }

  return pose;
}

function applyPlayerPose(player, pose) {
  if (player.dashTimer > 0 && player.attackTimer === 0 && !player.carrying) {
    const stride = Math.sin(game.time / 58 + player.x * 0.025);
    pose.torsoTilt += 0.24;
    pose.frontArmA1 = 0.92 - stride * 0.46;
    pose.frontArmA2 = 0.12 + stride * 0.16;
    pose.rearArmA1 = 2.08 + stride * 0.42;
    pose.rearArmA2 = -0.08 - stride * 0.12;
    pose.frontLegA1 = 0.84 + stride * 0.92;
    pose.frontLegA2 = -0.46 - stride * 0.62;
    pose.rearLegA1 = 1.86 - stride * 0.92;
    pose.rearLegA2 = -0.18 + stride * 0.54;
    pose.bounce += Math.abs(stride) * 2.4;
    pose.yShift += Math.sin(game.time / 29) * 1.6;
    pose.bodyScaleX += 0.06;
    pose.bodyScaleY -= 0.06;
  }

  if (player.carrying) {
    pose.torsoTilt = 0.08;
    pose.frontArmA1 = -0.62;
    pose.frontArmA2 = 0.55;
    pose.rearArmA1 = -0.52;
    pose.rearArmA2 = 0.48;
    pose.frontLegA1 = 1.18;
    pose.rearLegA1 = 1.42;
  }

  if (player.specialTimer > 0) {
    pose.torsoTilt = Math.sin(game.time / 80) * 0.06;
    pose.frontArmA1 = -0.28;
    pose.rearArmA1 = 3.35;
    pose.frontArmA2 = 0.28;
    pose.rearArmA2 = -0.22;
    pose.bodyScaleX += 0.06;
    pose.bodyScaleY += 0.04;
  }

  if (player.attackTimer > 0 && player.currentAttack) {
    const attack = attacks[player.currentAttack];
    const beat = attackBeat(attack, player.attackTimer);

    if (player.currentAttack === "light1") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = -0.08 + t * -0.1;
        pose.frontArmA1 = lerp01(1.18, 2.28, t);
        pose.frontArmA2 = lerp01(0.28, 0.64, t);
        pose.rearArmA1 = lerp01(1.72, 1.46, t);
        pose.bodyScaleX = 0.98;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = 0.08 + t * 0.18;
        pose.frontArmA1 = lerp01(2.28, 0.08, t);
        pose.frontArmA2 = lerp01(0.64, 0.04, t);
        pose.rearArmA1 = 1.52;
        pose.bodyScaleX += 0.04;
        pose.attackTrail = { width: 8, length: 26, lift: -4, alpha: 0.3 + (1 - beat.t) * 0.18 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.2, 0.02, t);
        pose.frontArmA1 = lerp01(0.08, 1.18, t);
        pose.frontArmA2 = lerp01(0.04, 0.26, t);
        pose.rearArmA1 = lerp01(1.52, 1.78, t);
        pose.attackTrail = { width: 6, length: 18, lift: -2, alpha: 0.14 * (1 - t) };
      }
    } else if (player.currentAttack === "light2") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.12, -0.22, t);
        pose.frontArmA1 = lerp01(1.3, 2.74, t);
        pose.frontArmA2 = lerp01(0.24, 0.44, t);
        pose.rearArmA1 = lerp01(1.7, 1.16, t);
        pose.headTilt = -0.08;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.02, 0.28, t);
        pose.frontArmA1 = lerp01(2.74, -0.12, t);
        pose.frontArmA2 = lerp01(0.44, -0.02, t);
        pose.rearArmA1 = 1.48;
        pose.attackTrail = { width: 10, length: 34, lift: -12, alpha: 0.36 + (1 - beat.t) * 0.2 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.22, 0.02, t);
        pose.frontArmA1 = lerp01(-0.12, 1.28, t);
        pose.frontArmA2 = lerp01(-0.02, 0.22, t);
        pose.attackTrail = { width: 7, length: 20, lift: -7, alpha: 0.16 * (1 - t) };
      }
    } else if (player.currentAttack === "light3") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.04, -0.18, t);
        pose.frontArmA1 = lerp01(0.96, -1.62, t);
        pose.frontArmA2 = 0.58;
        pose.rearArmA1 = lerp01(1.56, -1.72, t);
        pose.rearArmA2 = 0.44;
        pose.bodyScaleY = 0.88;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.04, 0.36, t);
        pose.frontArmA1 = lerp01(-1.62, 0.82, t);
        pose.frontArmA2 = lerp01(0.58, 0.1, t);
        pose.rearArmA1 = lerp01(-1.72, 0.24, t);
        pose.rearArmA2 = lerp01(0.44, 0.08, t);
        pose.bodyScaleY = lerp01(0.9, 1.06, t);
        pose.attackTrail = { width: 12, length: 40, lift: -22 + t * 16, alpha: 0.38 + (1 - beat.t) * 0.18 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.3, 0.02, t);
        pose.frontArmA1 = lerp01(0.82, 1.18, t);
        pose.frontArmA2 = lerp01(0.1, 0.22, t);
        pose.rearArmA1 = lerp01(0.24, 1.68, t);
      }
    } else if (player.currentAttack === "heavy") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.08, -0.24, t);
        pose.frontArmA1 = lerp01(1.32, 2.92, t);
        pose.frontArmA2 = lerp01(0.22, 0.52, t);
        pose.rearArmA1 = lerp01(1.72, 1.08, t);
        pose.bodyScaleX += 0.04;
        pose.bodyScaleY = 0.94;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(0.04, 0.38, t);
        pose.frontArmA1 = lerp01(2.92, -0.22, t);
        pose.frontArmA2 = lerp01(0.52, -0.08, t);
        pose.rearArmA1 = 1.32;
        pose.bodyScaleX += 0.12;
        pose.attackTrail = { width: 14, length: 48, lift: -18, alpha: 0.42 + (1 - beat.t) * 0.18 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.34, 0.02, t);
        pose.frontArmA1 = lerp01(-0.22, 1.22, t);
        pose.frontArmA2 = lerp01(-0.08, 0.14, t);
        pose.rearArmA1 = lerp01(1.32, 1.72, t);
        pose.bodyScaleX += 0.03 * (1 - t);
      }
    } else if (player.currentAttack === "uppercut") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.yShift = lerp01(6, 14, t);
        pose.torsoTilt = lerp01(-0.02, -0.12, t);
        pose.frontArmA1 = lerp01(1.48, 2.38, t);
        pose.frontArmA2 = lerp01(0.42, 0.62, t);
        pose.frontLegA1 = lerp01(1.28, 1.52, t);
        pose.rearLegA1 = lerp01(1.24, 1.02, t);
        pose.bodyScaleY = 0.9;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.yShift = lerp01(10, -18, t);
        pose.torsoTilt = lerp01(0.02, 0.22, t);
        pose.frontArmA1 = lerp01(2.38, -0.92, t);
        pose.frontArmA2 = lerp01(0.62, 0.02, t);
        pose.rearArmA1 = 1.88;
        pose.frontLegA1 = lerp01(1.46, 1.1, t);
        pose.rearLegA1 = lerp01(1.04, 1.42, t);
        pose.attackTrail = { width: 13, length: 38, lift: -30 + t * 20, alpha: 0.44 + (1 - beat.t) * 0.18 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.yShift = lerp01(-8, 0, t);
        pose.torsoTilt = lerp01(0.18, 0.04, t);
        pose.frontArmA1 = lerp01(-0.92, 1.24, t);
        pose.frontArmA2 = lerp01(0.02, 0.22, t);
      }
    } else if (player.currentAttack === "dashHeavy") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(0.18, 0.34, t);
        pose.frontArmA1 = 0.82;
        pose.rearArmA1 = lerp01(2.02, 2.48, t);
        pose.frontLegA1 = lerp01(0.98, 0.84, t);
        pose.rearLegA1 = lerp01(1.74, 1.96, t);
        pose.bodyScaleX += 0.08;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(0.3, 0.44, t);
        pose.frontArmA1 = lerp01(0.82, 0.16, t);
        pose.frontArmA2 = lerp01(0.16, -0.08, t);
        pose.rearArmA1 = 2.4;
        pose.frontLegA1 = 0.82;
        pose.rearLegA1 = 1.94;
        pose.bodyScaleX += 0.12;
        pose.attackTrail = { width: 15, length: 52, lift: -8, alpha: 0.46 + (1 - beat.t) * 0.16 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.38, 0.08, t);
        pose.frontArmA1 = lerp01(0.16, 1.04, t);
        pose.frontArmA2 = lerp01(-0.08, 0.12, t);
        pose.bodyScaleX += 0.05 * (1 - t);
      }
    } else if (player.currentAttack === "sweep") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.yShift = lerp01(2, 12, t);
        pose.torsoTilt = lerp01(0.02, -0.22, t);
        pose.frontLegA1 = lerp01(1.08, 0.36, t);
        pose.frontLegA2 = lerp01(1.18, 0.92, t);
        pose.rearLegA1 = lerp01(1.48, 1.84, t);
        pose.frontArmA1 = lerp01(1.32, 0.58, t);
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.12, 0.18, t);
        pose.frontLegA1 = lerp01(0.36, -0.28, t);
        pose.frontLegA2 = lerp01(0.92, 0.34, t);
        pose.rearLegA1 = lerp01(1.84, 1.3, t);
        pose.attackTrail = { width: 11, length: 46, lift: 4, alpha: 0.4 + (1 - beat.t) * 0.14 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.yShift = lerp01(10, 0, t);
        pose.torsoTilt = lerp01(0.18, 0.02, t);
        pose.frontLegA1 = lerp01(-0.28, 1.06, t);
        pose.frontLegA2 = lerp01(0.34, 1.16, t);
      }
    } else if (player.currentAttack === "wavePunch") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(-0.08, -0.26, t);
        pose.frontArmA1 = lerp01(1.36, 2.84, t);
        pose.frontArmA2 = lerp01(0.18, 0.5, t);
        pose.rearArmA1 = lerp01(1.82, 1.18, t);
        pose.bodyScaleX += 0.04;
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(0.02, 0.22, t);
        pose.frontArmA1 = lerp01(2.84, 0.26, t);
        pose.frontArmA2 = lerp01(0.5, 0.02, t);
        pose.rearArmA1 = 1.44;
        pose.attackTrail = { width: 13, length: 58, lift: -12, alpha: 0.46 + (1 - beat.t) * 0.16 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.18, 0.02, t);
        pose.frontArmA1 = lerp01(0.26, 1.24, t);
        pose.frontArmA2 = lerp01(0.02, 0.16, t);
      }
    } else if (player.currentAttack === "dashKnee") {
      if (beat.phase === "startup") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(0.14, 0.28, t);
        pose.frontLegA1 = lerp01(1.02, 0.28, t);
        pose.frontLegA2 = lerp01(1.26, 0.82, t);
        pose.rearLegA1 = lerp01(1.62, 1.88, t);
        pose.frontArmA1 = lerp01(1.08, 0.42, t);
      } else if (beat.phase === "active") {
        const t = easeOutCubic(beat.t);
        pose.torsoTilt = lerp01(0.24, 0.4, t);
        pose.frontLegA1 = lerp01(0.28, -0.42, t);
        pose.frontLegA2 = lerp01(0.82, 0.32, t);
        pose.rearLegA1 = 1.94;
        pose.attackTrail = { width: 12, length: 44, lift: -2, alpha: 0.42 + (1 - beat.t) * 0.15 };
      } else {
        const t = easeInOutQuad(beat.t);
        pose.torsoTilt = lerp01(0.24, 0.06, t);
        pose.frontLegA1 = lerp01(-0.42, 1.08, t);
        pose.frontLegA2 = lerp01(0.32, 1.18, t);
      }
    }
  }

  return pose;
}

function applyEnemyPose(enemy, pose) {
  if (enemy.kind === "boss") {
    pose.torsoW += 4;
    pose.shoulderSpan += 2;
    pose.bodyScaleX += enemy.phase === 2 ? 0.03 : 0;
  }

  if (enemy.attackWindup > 0) {
    const progress = clamp(
      1 - enemy.attackWindup / Math.max(enemy.attackWindupTotal || enemy.attackWindup, 1),
      0,
      1
    );

    if (enemy.kind === "boss") {
      if (enemy.attackType === "rush") {
        pose.torsoTilt = 0.24 + progress * 0.12;
        pose.frontArmA1 = 0.92;
        pose.rearArmA1 = 2.22;
        pose.frontLegA1 = 0.96;
        pose.rearLegA1 = 1.88;
        pose.bodyScaleX += 0.08;
      } else if (enemy.attackType === "slam") {
        pose.torsoTilt = -0.08 + progress * 0.18;
        pose.frontArmA1 = -1.4 + progress * 0.86;
        pose.rearArmA1 = -1.56 + progress * 0.72;
        pose.frontArmA2 = 0.42;
        pose.rearArmA2 = 0.38;
        pose.bodyScaleY = 0.9;
      } else {
        pose.torsoTilt = 0.04;
        pose.frontArmA1 = -0.32;
        pose.rearArmA1 = 3.48;
        pose.frontArmA2 = 0.22;
        pose.rearArmA2 = -0.18;
        pose.bodyScaleX += 0.05;
      }
    } else {
      pose.torsoTilt = 0.12;
      pose.frontArmA1 = 1.18 - progress * 0.82;
      pose.rearArmA1 = 1.92;
      pose.frontLegA1 = 1.12;
      pose.rearLegA1 = 1.62;
    }
  }

  return pose;
}

function drawAttackTrailLocal(hand, elbow, pose, palette) {
  if (!pose.attackTrail) {
    return;
  }

  const dirX = hand.x - elbow.x;
  const dirY = hand.y - elbow.y;
  const mag = Math.hypot(dirX, dirY) || 1;
  const nx = dirX / mag;
  const ny = dirY / mag;
  const px = -ny;
  const py = nx;
  const len = pose.attackTrail.length;
  const width = pose.attackTrail.width;
  const lift = pose.attackTrail.lift;

  ctx.strokeStyle = `rgba(${palette.trail}, ${pose.attackTrail.alpha})`;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hand.x - nx * len - px * width * 0.18, hand.y - ny * len - py * width * 0.18 + lift);
  ctx.quadraticCurveTo(
    hand.x - px * width * 0.5,
    hand.y - py * width * 0.5 + lift * 0.55,
    hand.x + px * width * 0.42,
    hand.y + py * width * 0.42
  );
  ctx.stroke();
}

function drawTelegraph(enemy, x, y) {
  if (enemy.phaseTransition > 0) {
    const progress = 1 - enemy.phaseTransition / enemy.phaseTransitionTotal;
    ctx.strokeStyle = `rgba(255, 185, 92, ${0.25 + progress * 0.45})`;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(x, enemy.y + 10, 38 + progress * 78, 18 + progress * 36, 0, 0, Math.PI * 2);
    ctx.stroke();
    return;
  }

  if (enemy.attackWindup <= 0) {
    return;
  }

  const progress = clamp(
    1 - enemy.attackWindup / Math.max(enemy.attackWindupTotal || enemy.attackWindup, 1),
    0.05,
    1
  );

  if (enemy.kind === "boss") {
    const spec = getBossAttackSpec(enemy);
    ctx.fillStyle = `rgba(${spec.telegraphColor}, ${0.12 + progress * 0.2})`;
    ctx.strokeStyle = `rgba(${spec.telegraphColor}, ${0.3 + progress * 0.35})`;
    ctx.lineWidth = 2 + progress * 4;

    if (spec.shape === "radial") {
      ctx.beginPath();
      ctx.ellipse(x, enemy.y + 10, spec.reachX, spec.depth, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      const startX = enemy.attackFacing === 1 ? x + 8 : x - spec.reachX - 8;
      ctx.fillRect(startX, enemy.y - spec.depth + 10, spec.reachX, spec.depth * 2);
      ctx.strokeRect(startX, enemy.y - spec.depth + 10, spec.reachX, spec.depth * 2);
    }

    ctx.fillStyle = "#fff1cf";
    ctx.font = "12px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(spec.label, x, y - 112);
    ctx.textAlign = "left";
  } else {
    const reach = enemy.kind === "brute" ? 78 : 68;
    const depth = enemy.kind === "brute" ? 38 : 32;
    const startX = enemy.facing === 1 ? x + 8 : x - reach - 8;
    ctx.fillStyle = `rgba(255, 112, 112, ${0.1 + progress * 0.18})`;
    ctx.strokeStyle = `rgba(255, 163, 143, ${0.25 + progress * 0.4})`;
    ctx.lineWidth = 2 + progress * 2;
    ctx.fillRect(startX, enemy.y - depth + 12, reach, depth * 2);
    ctx.strokeRect(startX, enemy.y - depth + 12, reach, depth * 2);
  }
}

function drawBrawler(actor, role) {
  if (role === "enemy" && (actor.removed || actor.grabbed)) {
    return;
  }

  const x = screenX(actor.x);
  if (x < -90 || x > WIDTH + 90) {
    return;
  }

  const y = actor.screenY;
  const palette = getBrawlerPalette(actor, role);
  const flash = actor.hitFlash > 0 ? hitFlashColor(actor.hitFlash / 220) : null;
  const scale = role === "player" ? 1.05 : actor.size;
  let pose = getBasePose(actor, role);
  pose = role === "player" ? applyPlayerPose(actor, pose) : applyEnemyPose(actor, pose);

  if (actor.impactTimer > 0 && actor.impactDuration > 0) {
    const t = actor.impactTimer / actor.impactDuration;
    pose.bodyScaleX += actor.impactStretchX * t;
    pose.bodyScaleY += actor.impactStretchY * t;
    pose.yShift += actor.impactStretchY * 20 * t;
    pose.torsoTilt += actor.impactStretchX * 0.18 * t;
  }

  if (role === "enemy") {
    drawTelegraph(actor, x, y);
  }

  drawShadow(actor.x, actor.y, role === "player" ? 1.12 : 0.96 * scale);
  ctx.save();
  ctx.translate(x, y + pose.bounce + pose.yShift);
  ctx.scale(actor.facing, 1);
  ctx.scale(scale, scale);

  if (role === "player" && actor.specialTimer > 0) {
    drawPlayerSpecialFx(actor, -22, 0.92);
  }
  if (role === "player") {
    drawPlayerMoveFx(actor, 0.92);
  }

  const torsoTilt = pose.torsoTilt;
  const leftShoulder = rotatePoint(-pose.shoulderSpan, pose.shouldersY, torsoTilt);
  const rightShoulder = rotatePoint(pose.shoulderSpan, pose.shouldersY, torsoTilt);
  const leftHip = rotatePoint(-pose.hipSpan, pose.hipsY, torsoTilt * 0.45);
  const rightHip = rotatePoint(pose.hipSpan, pose.hipsY, torsoTilt * 0.45);

  const rearArm = limbChain(leftShoulder, pose.limbUpper, pose.limbFore, pose.rearArmA1 + torsoTilt * 0.62, pose.rearArmA2);
  const frontArm = limbChain(rightShoulder, pose.limbUpper, pose.limbFore, pose.frontArmA1 + torsoTilt * 0.62, pose.frontArmA2);
  const rearLegHint = limbChain(leftHip, pose.legUpper, pose.legLower, pose.rearLegA1 + torsoTilt * 0.16, pose.rearLegA2);
  const frontLegHint = limbChain(rightHip, pose.legUpper, pose.legLower, pose.frontLegA1 + torsoTilt * 0.16, pose.frontLegA2);
  const rearLegRig = resolveLegPose(leftHip, rearLegHint, -1, pose);
  const frontLegRig = resolveLegPose(rightHip, frontLegHint, 1, pose);
  const rearLeg = rearLegRig.chain;
  const frontLeg = frontLegRig.chain;

  drawChain(rearLeg, pose.legWidth, flash || palette.pants, palette.outline);
  drawChain(rearArm, pose.armWidth, flash || palette.sleeve, palette.outline);

  ctx.save();
  ctx.rotate(torsoTilt * 0.18);
  drawPelvisShape(pose, palette, flash);
  ctx.restore();

  ctx.save();
  ctx.rotate(torsoTilt);
  drawTorsoShape(pose, palette, role, flash);
  ctx.restore();

  drawChain(frontLeg, pose.legWidth, flash || palette.pants, palette.outline);

  const neck = rotatePoint(0, -64, torsoTilt * 0.5);
  const headCenter = {
    x: neck.x,
    y: neck.y - pose.headR + Math.sin(game.time / 220 + actor.x * 0.01) * 0.6,
  };
  ctx.save();
  ctx.translate(headCenter.x, headCenter.y);
  ctx.rotate(pose.headTilt * 0.18);
  drawHeadShape(pose.headR, palette, flash);
  ctx.restore();

  ctx.save();
  ctx.translate(headCenter.x, headCenter.y);
  ctx.rotate(pose.headTilt + torsoTilt * 0.35);
  drawFace(pose.headR, palette, role);
  ctx.restore();

  drawAttackTrailLocal(frontArm[2], frontArm[1], pose, palette);
  drawChain(frontArm, pose.armWidth, flash || palette.sleeve, palette.outline);

  drawGlove(rearArm[2].x, rearArm[2].y, role === "player" ? 6.2 : 5.6, flash || palette.glove, palette.outline);
  drawGlove(frontArm[2].x, frontArm[2].y, role === "player" ? 6.8 : 6.1, flash || palette.glove, palette.outline);

  drawBootAt(rearLegRig.foot, rearLegRig.footAngle, pose.bootLen, pose.bootHeight, palette.boots, palette.outline);
  drawBootAt(frontLegRig.foot, frontLegRig.footAngle, pose.bootLen, pose.bootHeight, palette.boots, palette.outline);
  ctx.restore();

  if (role === "enemy") {
    const hpRatio = clamp(actor.hp / actor.maxHp, 0, 1);
    ctx.fillStyle = "rgba(25, 14, 20, 0.55)";
    ctx.fillRect(x - 26, y - 100, 52, 6);
    ctx.fillStyle = actor.kind === "boss" ? "#ff8b73" : actor.kind === "brute" ? "#ffd166" : "#7df79f";
    ctx.fillRect(x - 26, y - 100, 52 * hpRatio, 6);

    if (actor.kind === "boss") {
      ctx.fillStyle = "#fff1cf";
      ctx.font = "12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`P${actor.phase}`, x, y - 108);
      ctx.textAlign = "left";
    }
  }
}

function drawCarried(player) {
  if (!player.carrying) {
    return;
  }

  const x = screenX(player.x + player.facing * 8);
  const y = player.y - 74;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(player.facing, 1);

  if (player.carrying.kind === "enemy") {
    const enemy = player.carrying.entity;
    const palette = getBrawlerPalette(enemy, "enemy");
    ctx.fillStyle = palette.outline;
    roundedRectPath(-20, -26, 40, 18, 8);
    ctx.fill();
    ctx.fillStyle = palette.body;
    roundedRectPath(-18, -24, 36, 16, 7);
    ctx.fill();
    drawDisk(-10, -34, 8, palette.head, palette.outline);
    drawDisk(9, -34, 8, palette.head, palette.outline);
  } else {
    const prop = player.carrying.entity;
    ctx.fillStyle = prop.color;
    if (prop.type === "crate") {
      ctx.fillRect(-16, -30, 32, 26);
      ctx.strokeStyle = "rgba(56, 28, 12, 0.38)";
      ctx.strokeRect(-16, -30, 32, 26);
    } else {
      ctx.fillRect(-14, -34, 28, 28);
      ctx.fillStyle = prop.type === "barrel" ? "#74461f" : "#dffcf6";
      ctx.fillRect(-10, -30, 20, 20);
    }
  }
  ctx.restore();
}

function spriteReady(sheet) {
  return sheet.image.complete && sheet.image.naturalWidth > 0;
}

function getSpriteFrameIndex(sheet, tagName, elapsed, speed = 1) {
  const tag = sheet.tags[tagName] || sheet.tags.idle || sheet.tags.walk;
  const stepMs = Math.max(50, sheet.frameDuration / Math.max(speed, 0.35));

  if (Array.isArray(tag) === false || tag.length === 0) {
    return 0;
  }
  if (tag.length === 1) {
    return tag[0];
  }
  if (tag.length > 2) {
    return tag[Math.floor(elapsed / stepMs) % tag.length];
  }

  const [from, to] = tag;
  const count = to - from + 1;
  if (count <= 1) {
    return from;
  }
  return from + Math.floor(elapsed / stepMs) % count;
}

function getStripFrameIndex(strip, elapsed, speed = 1) {
  const count = strip.frames || 1;
  if (count <= 1) {
    return 0;
  }
  const stepMs = Math.max(50, strip.frameDuration / Math.max(speed, 0.35));
  return Math.floor(elapsed / stepMs) % count;
}

function drawSpriteFrame(sheet, frameIndex, scale, flashAlpha = 0) {
  let sx;
  let sy;
  if (sheet.columns && sheet.columns > 1) {
    sx = (frameIndex % sheet.columns) * sheet.frameW;
    sy = Math.floor(frameIndex / sheet.columns) * sheet.frameH;
  } else {
    sx = sheet.vertical ? 0 : frameIndex * sheet.frameW;
    sy = sheet.vertical ? frameIndex * sheet.frameH : 0;
  }
  const dx = -sheet.anchorX * scale;
  const dy = -sheet.anchorY * scale;
  const dw = sheet.frameW * scale;
  const dh = sheet.frameH * scale;
  const previousSmoothing = ctx.imageSmoothingEnabled;
  ctx.imageSmoothingEnabled = Boolean(sheet.smoothing);

  ctx.drawImage(sheet.image, sx, sy, sheet.frameW, sheet.frameH, dx, dy, dw, dh);

  if (flashAlpha > 0) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = flashAlpha;
    ctx.drawImage(sheet.image, sx, sy, sheet.frameW, sheet.frameH, dx, dy, dw, dh);
    ctx.restore();
  }

  ctx.imageSmoothingEnabled = previousSmoothing;
}

function choosePlayerSpriteTag(player) {
  const boosted = player.specialTimer > 0;
  const moving = Math.hypot(player.vx || 0, player.vy || 0) > 30;
  const airborne = player.z < -6;
  const dashing = player.dashTimer > 0 && moving && player.attackTimer === 0 && !player.carrying;

  if (game.state === "won") {
    return Math.sin(game.time / 180) > 0.2 ? "win" : "winJump";
  }
  if (game.state === "lost" && player.hp === 0) {
    return "death";
  }
  if (player.hitstun > 0) {
    return boosted ? "hitBoost" : "hit";
  }
  if (player.carrying) {
    return "throw";
  }
  if (player.attackTimer > 0 && player.currentAttack) {
    if (player.currentAttack === "light1") {
      return boosted ? "jabBoost" : "jab";
    }
    if (player.currentAttack === "light2" || player.currentAttack === "heavy") {
      return boosted ? "hookBoost" : "hook";
    }
    if (player.currentAttack === "wavePunch") {
      return "powerPunch";
    }
    if (player.currentAttack === "dashHeavy" || player.currentAttack === "dashKnee" || player.currentAttack === "sweep") {
      return boosted ? "powerPunch" : "jumpAttack";
    }
    return boosted ? "uppercutBoost" : "uppercut";
  }
  if (airborne) {
    return boosted ? "jumpBoost" : "jump";
  }
  if (boosted) {
    return moving ? "walkBoost" : "charge";
  }
  if (dashing) {
    return "run";
  }
  return moving ? "walk" : "idle";
}

function chooseEnemySpriteTag(enemy) {
  if (enemy.dead) {
    return "death";
  }
  if (enemy.hitstun > 0 || enemy.thrownTimer > 0) {
    return "hit";
  }
  if (enemy.attackWindup > 0) {
    return "jab";
  }
  return Math.hypot(enemy.vx || 0, enemy.vy || 0) > 20 ? "walk" : "idle";
}

function getEnemySpriteStrip(enemy, tagName) {
  const set = enemySpriteSets[enemy.kind] || enemySpriteSets.thug;
  return set[tagName] || set.walk || set.idle;
}

function getPlayerSpriteStrip(tagName) {
  return playerSpriteSet[tagName] || playerSpriteSet.walk || playerSpriteSet.idle;
}

function drawEnergyBolt(x1, y1, x2, y2, segments, width, alpha, phase = 0) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let pass = 0; pass < 2; pass += 1) {
    ctx.strokeStyle = pass === 0
      ? `rgba(255, 248, 166, ${alpha})`
      : `rgba(112, 226, 255, ${alpha * 0.72})`;
    ctx.lineWidth = width * (pass === 0 ? 1 : 0.42);
    ctx.beginPath();

    for (let i = 0; i <= segments; i += 1) {
      const p = i / segments;
      const x = lerp(x1, x2, p);
      const y = lerp(y1, y2, p);
      const jitter = Math.sin(p * 18.7 + phase) * 9 + Math.sin(p * 41.3 + phase * 0.7) * 4;
      const nx = x + jitter * (1 - Math.abs(0.5 - p) * 1.3);
      const ny = y + Math.cos(p * 15.9 + phase) * 5;
      if (i === 0) {
        ctx.moveTo(nx, ny);
      } else {
        ctx.lineTo(nx, ny);
      }
    }

    ctx.stroke();
  }

  ctx.restore();
}

function drawGoldenSurgeAura(player, startup, sustain, effectScale = 1) {
  const time = game.time;
  const power = clamp(0.35 + startup * 0.72 + sustain * 0.1, 0, 1.12);
  const flicker = 0.92 + Math.sin(time / 38 + player.x * 0.01) * 0.08;

  ctx.save();
  ctx.scale(effectScale, effectScale);
  ctx.globalCompositeOperation = "screen";

  const halo = ctx.createRadialGradient(0, -62, 6, 0, -62, 118 + startup * 34);
  halo.addColorStop(0, `rgba(255, 255, 225, ${0.2 + power * 0.22})`);
  halo.addColorStop(0.35, `rgba(255, 218, 76, ${0.22 + power * 0.2})`);
  halo.addColorStop(0.75, `rgba(255, 128, 32, ${0.1 + power * 0.08})`);
  halo.addColorStop(1, "rgba(255, 92, 26, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(-150, -220, 300, 300);

  for (let layer = 0; layer < 3; layer += 1) {
    const height = 128 + layer * 30 + startup * 54;
    const base = 32 + layer * 12 + startup * 12;
    const phase = time / (70 + layer * 18) + layer * 2.4;
    const alpha = (0.28 - layer * 0.055 + startup * 0.1) * flicker;
    const grad = ctx.createLinearGradient(0, 54, 0, -height);
    grad.addColorStop(0, `rgba(255, 117, 28, ${alpha * 0.55})`);
    grad.addColorStop(0.42, `rgba(255, 214, 54, ${alpha})`);
    grad.addColorStop(0.72, `rgba(255, 252, 176, ${alpha * 0.8})`);
    grad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.beginPath();
    ctx.moveTo(-base * 0.75, 52);
    for (let i = 0; i <= 15; i += 1) {
      const p = i / 15;
      const taper = 1 - p * 0.78;
      const y = 52 - p * height;
      const x = -base * taper - Math.sin(p * 17 + phase) * (5 + layer * 2) - Math.sin(p * 31 + phase) * 3;
      ctx.lineTo(x, y);
    }
    for (let i = 15; i >= 0; i -= 1) {
      const p = i / 15;
      const taper = 1 - p * 0.78;
      const y = 52 - p * height;
      const x = base * taper + Math.cos(p * 16 + phase) * (5 + layer * 2) + Math.sin(p * 27 + phase) * 3;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 250, 166, ${alpha * 0.58})`;
    ctx.lineWidth = 2.2 + layer * 0.8;
    ctx.stroke();
  }

  for (let i = 0; i < 7; i += 1) {
    const lane = i - 3;
    const phase = (time / (180 + i * 19) + i * 0.21) % 1;
    const x = lane * 15 + Math.sin(time / 95 + i) * 5;
    const top = -168 - Math.sin(time / 120 + i) * 18;
    const bottom = 54 - phase * 24;
    ctx.strokeStyle = `rgba(255, 244, 152, ${(1 - phase * 0.45) * 0.22 * power})`;
    ctx.lineWidth = 3.5 + Math.sin(time / 85 + i) * 1.2;
    ctx.beginPath();
    ctx.moveTo(x, bottom);
    ctx.lineTo(x + Math.sin(time / 65 + i) * 7, top);
    ctx.stroke();
  }

  for (let i = 0; i < 5; i += 1) {
    const side = i % 2 === 0 ? -1 : 1;
    const phase = time / 58 + i * 1.7;
    const alpha = (0.18 + startup * 0.28) * (0.55 + Math.sin(phase) * 0.45);
    if (alpha <= 0.08) {
      continue;
    }
    drawEnergyBolt(
      side * (18 + i * 4),
      -128 + Math.sin(phase) * 16,
      side * (58 + Math.sin(phase * 0.8) * 12),
      22 + Math.cos(phase) * 10,
      6,
      4.2,
      alpha,
      phase
    );
  }

  for (let i = 0; i < 22; i += 1) {
    const p = (time / (520 + i * 17) + i * 0.073) % 1;
    const drift = Math.sin(i * 2.3 + p * 5.8) * (20 + p * 38);
    const y = 58 - p * (156 + Math.sin(i) * 20);
    const radius = 1.2 + (1 - p) * 2.6;
    ctx.fillStyle = `rgba(255, 244, 144, ${(1 - p) * 0.5 * power})`;
    ctx.beginPath();
    ctx.arc(drift, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = `rgba(255, 235, 108, ${0.36 + startup * 0.24})`;
  ctx.lineWidth = 4 + startup * 2;
  ctx.beginPath();
  ctx.ellipse(0, 52, 44 + startup * 18 + Math.sin(time / 70) * 3, 12 + startup * 5, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawPlayerSpecialFx(player, yOffset, effectScale = 1) {
  if (player.specialTimer <= 0) {
    return;
  }

  const charge = vfxSheets.specialCharge;
  const ring = vfxSheets.specialRing;
  const elapsed = SPECIAL_DURATION - player.specialTimer;
  const startup = clamp(elapsed / SPECIAL_STARTUP, 0, 1);
  const sustain = clamp(player.specialTimer / SPECIAL_DURATION, 0, 1);
  const pulse = 1 + Math.sin(game.time / 55 + player.x * 0.02) * 0.08;

  ctx.save();
  ctx.translate(0, yOffset);

  drawGoldenSurgeAura(player, startup, sustain, effectScale);

  ctx.fillStyle = `rgba(255, 181, 71, ${0.12 + sustain * 0.14})`;
  ctx.beginPath();
  ctx.ellipse(0, 58, 36 + startup * 14, 10 + startup * 4, 0, 0, Math.PI * 2);
  ctx.fill();

  if (spriteReady(charge)) {
    const chargeFrame = elapsed < 210
      ? Math.min(charge.frames - 1, Math.floor(elapsed / 30))
      : 4 + (Math.floor(game.time / 70) % 2);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.32 + startup * 0.28;
    ctx.rotate(Math.sin(game.time / 180) * 0.1);
    drawSpriteFrame(charge, chargeFrame, effectScale * (0.52 + startup * 0.3) * pulse);
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.18 + sustain * 0.2;
    ctx.rotate(-0.16 - Math.sin(game.time / 150) * 0.08);
    drawSpriteFrame(charge, Math.max(2, chargeFrame - 1), effectScale * (0.66 + startup * 0.24) * pulse);
    ctx.restore();
  }

  if (spriteReady(ring) && elapsed < 170) {
    const boomT = clamp(elapsed / 170, 0, 1);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = (1 - boomT) * 0.92;
    ctx.rotate(boomT * 0.3);
    drawSpriteFrame(ring, 0, effectScale * (0.55 + easeOutCubic(boomT) * 2.3));
    ctx.restore();
  }

  if (spriteReady(ring) && player.specialTimer > 180) {
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.18 + sustain * 0.1;
    drawSpriteFrame(ring, 0, effectScale * 0.72 * (1 + Math.sin(game.time / 90) * 0.06));
    ctx.restore();
  }

  ctx.restore();
}

function drawPlayerMoveFx(player, effectScale = 1) {
  if (player.attackTimer <= 0 || !player.currentAttack) {
    return;
  }

  const attack = attacks[player.currentAttack];
  const beat = attackBeat(attack, player.attackTimer);
  const alpha = beat.phase === "startup"
    ? 0.08 + beat.t * 0.16
    : beat.phase === "active"
      ? 0.28 + (1 - beat.t) * 0.28
      : 0.14 * (1 - beat.t);

  if (alpha <= 0.02) {
    return;
  }

  const t = beat.phase === "recovery" ? 1 - beat.t * 0.5 : easeOutCubic(beat.t);
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  if (player.currentAttack === "sweep") {
    ctx.strokeStyle = `rgba(255, 194, 94, ${alpha})`;
    ctx.lineWidth = 9 * effectScale;
    ctx.beginPath();
    ctx.ellipse(34 + t * 16, -4, 34 + t * 12, 10, 0.08, -0.35, 0.95);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 125, 72, ${alpha * 0.66})`;
    ctx.lineWidth = 4 * effectScale;
    ctx.beginPath();
    ctx.ellipse(30 + t * 12, -2, 22 + t * 10, 6, 0.04, -0.2, 1.1);
    ctx.stroke();
  } else if (player.currentAttack === "wavePunch") {
    const drift = 18 + t * 72;
    ctx.strokeStyle = `rgba(255, 229, 141, ${alpha})`;
    ctx.lineWidth = 10 * effectScale;
    ctx.beginPath();
    ctx.ellipse(26 + drift, -34, 20 + t * 22, 10 + t * 8, 0.16, -0.85, 0.85);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 119, 73, ${alpha * 0.72})`;
    ctx.lineWidth = 5 * effectScale;
    ctx.beginPath();
    ctx.ellipse(34 + drift, -34, 12 + t * 16, 8 + t * 5, 0.16, -0.85, 0.85);
    ctx.stroke();
  } else if (player.currentAttack === "dashKnee") {
    ctx.strokeStyle = `rgba(255, 223, 126, ${alpha})`;
    ctx.lineWidth = 11 * effectScale;
    ctx.beginPath();
    ctx.moveTo(-8, -44);
    ctx.lineTo(56 + t * 24, -4);
    ctx.stroke();
    ctx.strokeStyle = `rgba(255, 148, 81, ${alpha * 0.68})`;
    ctx.lineWidth = 5 * effectScale;
    ctx.beginPath();
    ctx.moveTo(6, -36);
    ctx.lineTo(48 + t * 20, 2);
    ctx.stroke();
  } else if (player.currentAttack === "uppercut") {
    ctx.strokeStyle = `rgba(255, 232, 154, ${alpha})`;
    ctx.lineWidth = 10 * effectScale;
    ctx.beginPath();
    ctx.arc(6, -18, 32 + t * 12, -1.45, -0.1);
    ctx.stroke();
  } else if (player.currentAttack === "dashHeavy") {
    ctx.strokeStyle = `rgba(255, 214, 122, ${alpha})`;
    ctx.lineWidth = 12 * effectScale;
    ctx.beginPath();
    ctx.moveTo(-6, -30);
    ctx.lineTo(68 + t * 28, -14);
    ctx.stroke();
  } else if (player.currentAttack === "heavy") {
    ctx.strokeStyle = `rgba(255, 219, 137, ${alpha})`;
    ctx.lineWidth = 11 * effectScale;
    ctx.beginPath();
    ctx.arc(18, -38, 28 + t * 10, -1.2, 0.5);
    ctx.stroke();
  } else {
    ctx.strokeStyle = `rgba(255, 225, 154, ${alpha})`;
    ctx.lineWidth = 8 * effectScale;
    ctx.beginPath();
    ctx.arc(18, -36, 22 + t * 8, -1.05, 0.42);
    ctx.stroke();
  }

  ctx.restore();
}

function drawSpriteFighter(actor, role) {
  if (role === "enemy" && (actor.removed || actor.grabbed)) {
    return true;
  }

  const x = screenX(actor.x);
  if (x < -120 || x > WIDTH + 120) {
    return true;
  }

  const y = actor.screenY;
  const tag = role === "player" ? choosePlayerSpriteTag(actor) : chooseEnemySpriteTag(actor);
  const strip = role === "player" ? getPlayerSpriteStrip(tag) : getEnemySpriteStrip(actor, tag);
  if (!spriteReady(strip)) {
    return false;
  }

  if (role === "enemy") {
    drawTelegraph(actor, x, y);
  }

  drawShadow(actor.x, actor.y, role === "player" ? 1.12 : 0.9 * actor.size);

  ctx.save();
  ctx.translate(x, y);
  if (role === "player" && tag === "run") {
    const runBob = Math.sin(game.time / 36 + actor.x * 0.04) * 3.2;
    ctx.translate(0, runBob);
  }
  ctx.scale(actor.facing, 1);

  if (role === "player" && actor.specialTimer > 0) {
    drawPlayerSpecialFx(actor, -34, 0.94);
  }
  if (role === "player") {
    drawPlayerMoveFx(actor, 0.94);
  }

  const moveMag = Math.hypot(actor.vx || 0, actor.vy || 0);
  const scale = role === "player"
    ? strip.scale
    : strip.scale * actor.size;
  const speed = role === "player"
    ? (tag === "run" ? clamp(moveMag / 112, 0.95, 1.78) : clamp(moveMag / 175, 0.48, 1.08))
    : clamp(moveMag / 90, 0.7, 1.5);
  const frameIndex = getStripFrameIndex(strip, game.time + actor.x * 0.2, speed);
  const flashAlpha = actor.hitFlash > 0 ? clamp(actor.hitFlash / 190, 0, 0.72) : 0;

  let rotation = 0;
  if (role === "enemy" && actor.dead) {
    rotation = actor.facing * -1.15;
  } else if (actor.hitstun > 0) {
    rotation = -0.1 * actor.facing;
  } else if (role === "player" && actor.dashTimer > 0 && actor.attackTimer === 0) {
    rotation = 0.08 * actor.facing;
  }

  ctx.rotate(rotation);
  if (role === "player" && actor.specialTimer > 0) {
    for (let ghost = 3; ghost >= 1; ghost -= 1) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = 0.06 + ghost * 0.035;
      ctx.translate(-actor.facing * ghost * 10, Math.sin(game.time / 70 + ghost) * 3);
      drawSpriteFrame(strip, frameIndex, scale * (1 + ghost * 0.015), 0);
      ctx.restore();
    }
  }
  drawSpriteFrame(strip, frameIndex, scale, flashAlpha);

  if (role === "enemy" && actor.kind !== "thug") {
    ctx.save();
    ctx.globalCompositeOperation = "source-atop";
    ctx.globalAlpha = actor.kind === "boss" ? 0.12 : 0.08;
    ctx.fillStyle = actor.kind === "boss" ? "#ffd166" : "#88ddff";
    ctx.fillRect(-strip.anchorX * scale, -strip.anchorY * scale, strip.frameW * scale, strip.frameH * scale);
    ctx.restore();
  }

  ctx.restore();

  if (role === "enemy") {
    const hpRatio = clamp(actor.hp / actor.maxHp, 0, 1);
    ctx.fillStyle = "rgba(25, 14, 20, 0.55)";
    ctx.fillRect(x - 26, y - 100, 52, 6);
    ctx.fillStyle = actor.kind === "boss" ? "#ff8b73" : actor.kind === "brute" ? "#ffd166" : "#7df79f";
    ctx.fillRect(x - 26, y - 100, 52 * hpRatio, 6);

    if (actor.kind === "boss") {
      ctx.fillStyle = "#fff1cf";
      ctx.font = "12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`P${actor.phase}`, x, y - 108);
      ctx.textAlign = "left";
    }
  }

  return true;
}

function drawPlayer(player) {
  if (!drawSpriteFighter(player, "player")) {
    drawBrawler(player, "player");
  }
  drawCarried(player);
}

function drawEnemy(enemy) {
  if (!drawSpriteFighter(enemy, "enemy")) {
    drawBrawler(enemy, "enemy");
  }
}

function drawProp(prop) {
  if (prop.removed || prop.carried) {
    return;
  }

  const x = screenX(prop.x);
  if (x < -60 || x > WIDTH + 60) {
    return;
  }

  const y = prop.y + prop.z;
  drawShadow(prop.x, prop.y, 0.82);
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = prop.color;

  if (prop.type === "crate") {
    ctx.fillRect(-16, -28, 32, 24);
    ctx.strokeStyle = "rgba(56, 28, 12, 0.38)";
    ctx.strokeRect(-16, -28, 32, 24);
  } else {
    ctx.fillRect(-14, -32, 28, 28);
    ctx.fillStyle = prop.type === "barrel" ? "#70431e" : "#ddfff4";
    ctx.fillRect(-10, -28, 20, 20);
  }

  if (prop.type === "barrel") {
    ctx.fillStyle = "#ffe065";
    ctx.fillRect(-4, -25, 8, 8);
  }
  ctx.restore();
}

function drawParticles() {
  for (const particle of game.particles) {
    const x = screenX(particle.x);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(x, particle.y, particle.radius * (particle.life / 360), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawZoneGate(xWorld, label) {
  const x = screenX(xWorld);
  if (x < -40 || x > WIDTH + 40) {
    return;
  }
  ctx.fillStyle = "rgba(39, 18, 15, 0.62)";
  ctx.fillRect(x - 8, world.top - 22, 16, world.bottom - world.top + 44);
  ctx.fillStyle = "#ffcf5e";
  for (let i = 0; i < 8; i += 1) {
    ctx.fillRect(x - 8, world.top - 14 + i * 34, 16, 8);
  }
  ctx.fillStyle = "rgba(24, 9, 12, 0.82)";
  ctx.fillRect(x - 42, world.top - 46, 84, 20);
  ctx.fillStyle = "#fff2cc";
  ctx.font = "12px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText(label, x, world.top - 32);
  ctx.textAlign = "left";
}

function drawActiveZone() {
  if (!game.activeZone) {
    return;
  }
  drawZoneGate(game.activeZone.left, "封锁");
  drawZoneGate(game.activeZone.right, "封锁");
}

function drawSpecialScreenFx() {
  const player = game.player;
  if (player.specialTimer <= 0 && game.specialFlashTimer <= 0 && game.specialRaysTimer <= 0) {
    return;
  }

  const px = screenX(player.x);
  const py = player.screenY - 42;

  if (player.specialTimer > 0) {
    const elapsed = SPECIAL_DURATION - player.specialTimer;
    const startup = clamp(elapsed / SPECIAL_STARTUP, 0, 1);
    const aura = ctx.createRadialGradient(px, py, 10, px, py, 320 + startup * 90);
    aura.addColorStop(0, `rgba(255, 255, 229, ${0.25 + startup * 0.16})`);
    aura.addColorStop(0.18, `rgba(255, 218, 72, ${0.18 + startup * 0.16})`);
    aura.addColorStop(0.48, `rgba(255, 137, 34, ${0.09 + startup * 0.06})`);
    aura.addColorStop(1, "rgba(255, 136, 52, 0)");
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 9; i += 1) {
      const phase = (game.time / (420 + i * 21) + i * 0.13) % 1;
      const x = px + Math.sin(i * 2.1 + game.time / 180) * (48 + i * 13);
      const grad = ctx.createLinearGradient(x, HEIGHT, x + Math.sin(i) * 24, 0);
      grad.addColorStop(0, "rgba(255, 144, 30, 0)");
      grad.addColorStop(0.42, `rgba(255, 211, 60, ${(1 - phase) * 0.09})`);
      grad.addColorStop(0.78, `rgba(255, 255, 196, ${(1 - phase) * 0.16})`);
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 10 + startup * 8;
      ctx.beginPath();
      ctx.moveTo(x - phase * 42, HEIGHT);
      ctx.lineTo(x + Math.sin(game.time / 90 + i) * 38, 0);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (game.specialRaysTimer > 0 && game.specialRaysDuration > 0) {
    const t = game.specialRaysTimer / game.specialRaysDuration;
    ctx.save();
    ctx.translate(px, py);
    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 24; i += 1) {
      const angle = (Math.PI * 2 * i) / 24 + game.time / 620;
      const len = 190 + (1 - t) * 220 + Math.sin(game.time / 64 + i) * 26;
      ctx.strokeStyle = `rgba(255, 229, 112, ${(0.08 + t * 0.24) * (1 - i / 32)})`;
      ctx.lineWidth = 4 + (1 - t) * 9;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 32, Math.sin(angle) * 18);
      ctx.lineTo(Math.cos(angle) * len, Math.sin(angle) * len * 0.58);
      ctx.stroke();
    }

    for (let i = 0; i < 6; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const phase = game.time / 50 + i * 1.4;
      drawEnergyBolt(
        side * (42 + i * 11),
        -125 + Math.sin(phase) * 25,
        side * (180 + Math.cos(phase) * 34),
        70 + Math.sin(phase * 0.9) * 40,
        7,
        5 + (1 - t) * 2,
        (0.16 + t * 0.28) * (0.7 + Math.sin(phase) * 0.3),
        phase
      );
    }
    ctx.restore();
  }

  if (game.specialFlashTimer > 0 && game.specialFlashDuration > 0) {
    const flash = game.specialFlashTimer / game.specialFlashDuration;
    ctx.fillStyle = `rgba(255, 248, 223, ${flash * 0.32})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}

function drawHUD() {
  const player = game.player;
  const boss = game.enemies.find((enemy) => enemy.kind === "boss" && enemy.hp > 0 && !enemy.removed);
  ctx.fillStyle = "rgba(21, 14, 18, 0.72)";
  ctx.fillRect(20, 18, 334, 88);
  ctx.fillRect(580, 18, 360, 88);

  ctx.fillStyle = "#fff2cc";
  ctx.font = "700 18px Trebuchet MS";
  ctx.fillText("你", 34, 44);
  ctx.fillText(game.activeZone ? `当前区域：${game.activeZone.name}` : "区域：街区推进中", 594, 44);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(34, 56, 250, 14);
  ctx.fillRect(594, 56, 250, 14);
  ctx.fillRect(594, 80, 250, 10);

  ctx.fillStyle = "#ff7a66";
  ctx.fillRect(34, 56, 250 * (player.hp / player.maxHp), 14);
  ctx.fillStyle = "#ffe16c";
  ctx.fillRect(594, 56, 250 * (player.meter / 100), 14);

  ctx.fillStyle = "#8ce99a";
  const progress = game.zones.filter((zone) => zone.cleared).length / game.zones.length;
  ctx.fillRect(594, 80, 250 * progress, 10);

  ctx.fillStyle = "#ffe9c0";
  ctx.font = "14px Trebuchet MS";
  ctx.fillText(`生命 ${Math.ceil(player.hp)} / ${player.maxHp}`, 34, 88);
  ctx.fillText(`爆气 ${Math.round(player.meter)} / 100`, 594, 74);
  ctx.fillText(`关卡进度 ${Math.round(progress * 100)}%`, 594, 100);

  ctx.fillStyle = "rgba(21, 14, 18, 0.68)";
  ctx.fillRect(20, 458, 360, 62);
  ctx.fillStyle = "#fff2cc";
  ctx.font = "700 16px Trebuchet MS";
  ctx.fillText(`连击 ${player.comboCount}`, 34, 484);
  ctx.fillText(`分数 ${player.score}`, 162, 484);

  let stateText = "待机";
  if (player.specialTimer > 0) {
    stateText = "爆气中";
  } else if (player.carrying) {
    stateText = player.carrying.kind === "enemy" ? "抓敌中" : "持物中";
  } else if (player.currentAttack) {
    stateText = attacks[player.currentAttack].name;
  } else if (player.dashTimer > 0) {
    stateText = "冲刺";
  }

  ctx.fillStyle = "#ffe9c0";
  ctx.font = "14px Trebuchet MS";
  ctx.fillText(`状态 ${stateText}`, 34, 508);

  if (boss) {
    ctx.fillStyle = "rgba(21, 14, 18, 0.76)";
    ctx.fillRect(WIDTH / 2 - 170, 78, 340, 36);
    ctx.fillStyle = "#fff2cc";
    ctx.font = "700 15px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`${boss.name}  P${boss.phase}`, WIDTH / 2, 93);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.fillRect(WIDTH / 2 - 128, 98, 256, 10);
    ctx.fillStyle = boss.phase === 2 ? "#ff6d57" : "#ffb07f";
    ctx.fillRect(WIDTH / 2 - 128, 98, 256 * (boss.hp / boss.maxHp), 10);
    ctx.textAlign = "left";
  }

  if (game.waveBannerTimer > 0) {
    const alpha = Math.min(1, game.waveBannerTimer / 320);
    ctx.fillStyle = `rgba(24, 9, 12, ${0.72 * alpha})`;
    ctx.fillRect(WIDTH / 2 - 160, 24, 320, 48);
    ctx.fillStyle = `rgba(255, 233, 192, ${alpha})`;
    ctx.font = "700 26px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(game.waveBanner, WIDTH / 2, 56);
    ctx.textAlign = "left";
  }

  if (game.messageTimer > 0) {
    ctx.fillStyle = "rgba(24, 9, 12, 0.68)";
    ctx.fillRect(WIDTH / 2 - 220, 462, 440, 44);
    ctx.fillStyle = "#fff3d2";
    ctx.font = "16px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(game.message, WIDTH / 2, 490);
    ctx.textAlign = "left";
  }

  if (game.state === "lost" || game.state === "won") {
    ctx.fillStyle = "rgba(10, 5, 8, 0.56)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = "#fff2cc";
    ctx.textAlign = "center";
    ctx.font = "700 48px Trebuchet MS";
    ctx.fillText(game.state === "won" ? "第一关打通" : "你被放倒了", WIDTH / 2, HEIGHT / 2 - 10);
    ctx.font = "22px Trebuchet MS";
    ctx.fillText("按 R 重新开始", WIDTH / 2, HEIGHT / 2 + 36);
    ctx.textAlign = "left";
  }
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  const shakeX = rand(-game.cameraShake, game.cameraShake);
  const shakeY = rand(-game.cameraShake, game.cameraShake);

  ctx.save();
  ctx.translate(shakeX, shakeY);
  drawBackground();
  drawActiveZone();

  const renderables = [];
  renderables.push({ type: "player", ref: game.player, y: game.player.y });
  for (const enemy of game.enemies) {
    renderables.push({ type: "enemy", ref: enemy, y: enemy.y });
  }
  for (const prop of game.props) {
    renderables.push({ type: "prop", ref: prop, y: prop.y });
  }
  renderables.sort((a, b) => a.y - b.y);

  for (const item of renderables) {
    if (item.type === "player") {
      drawPlayer(item.ref);
    } else if (item.type === "enemy") {
      drawEnemy(item.ref);
    } else {
      drawProp(item.ref);
    }
  }

  drawParticles();
  ctx.restore();
  drawSpecialScreenFx();
  drawHUD();
}

function frame(now) {
  if (!game.lastTime) {
    game.lastTime = now;
  }
  const dt = Math.min(34, now - game.lastTime);
  game.lastTime = now;

  update(dt, now);
  draw();
  justPressed.clear();
  requestAnimationFrame(frame);
}

function normalizeKey(key) {
  if (key === "a" || key === "A") return "a";
  if (key === "s" || key === "S") return "s";
  if (key === "d" || key === "D") return "d";
  if (key === "f" || key === "F") return "f";
  if (key === "q" || key === "Q") return "q";
  if (key === "r" || key === "R") return "r";
  if (key === "Shift" || key === "ShiftLeft" || key === "ShiftRight") return "shift";
  return key;
}

window.addEventListener("keydown", (event) => {
  const key = normalizeKey(event.key);
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "a", "s", "d", "f", "q", "r", "shift"].includes(key)) {
    event.preventDefault();
  }
  if (!keys.has(key)) {
    justPressed.add(key);
  }
  keys.add(key);
});

window.addEventListener("keyup", (event) => {
  keys.delete(normalizeKey(event.key));
});

resetGame();
requestAnimationFrame(frame);
