const C = 2 * Math.PI * 80;
document.getElementById('arcFg').style.strokeDasharray = C;
document.getElementById('arcFg').style.strokeDashoffset = 0;

/* ── THEMES ── */
const themes = [
  {
    name: 'Pearl',
    dot: '#e8e8e8',
    app: '#f5f4f0', appBorder: '#e0deda',
    logo: '#1a1a1a', logoIcon: '#f5f4f0', title: '#1a1a1a',
    nav: '#555', navActive: 'rgba(0,0,0,0.07)',
    clockCard: '#ffffff', clockBorder: '#e8e6e1',
    dial: '#f0ede8', dialBorder: '#d6d2cc',
    ring: 'rgba(0,0,0,0.08)',
    tickMaj: '#333', tickMin: '#ccc',
    nums: '#444',
    hh: '#1a1a1a', hm: '#555', hs: '#b07d4a',
    cdot: '#1a1a1a', cdot2: '#b07d4a',
    div: '#e8e6e1', dtime: '#1a1a1a', ddate: '#888',
    alarmBg: '#ffffff', alarmBorder: '#e8e6e1',
    alarmTime: '#1a1a1a', alarmLabel: '#888',
    toggleOn: '#1a1a1a', toggleOff: '#d0cdc8',
    addBorder: '#ccc', addColor: '#888',
    swTxt: '#1a1a1a', swMsTxt: '#888',
    btnPri: '#1a1a1a', btnPriTxt: '#f5f4f0',
    btnSec: '#e8e6e1', btnSecTxt: '#1a1a1a',
    lapBg: '#f5f4f0', lapTxt: '#555',
    presetBg: '#e8e6e1', presetTxt: '#333',
    arcBg: '#e0deda', arcFg: '#b07d4a',
    timerTxt: '#1a1a1a', timerSub: '#b07d4a'
  },
  {
    name: 'Obsidian',
    dot: '#2a2a2a',
    app: '#111111', appBorder: '#2a2a2a',
    logo: '#f0f0f0', logoIcon: '#111', title: '#f0f0f0',
    nav: '#888', navActive: 'rgba(255,255,255,0.07)',
    clockCard: '#1a1a1a', clockBorder: '#2a2a2a',
    dial: '#0d0d0d', dialBorder: '#2a2a2a',
    ring: 'rgba(255,255,255,0.06)',
    tickMaj: '#e0e0e0', tickMin: '#333',
    nums: '#aaa',
    hh: '#f0f0f0', hm: '#888', hs: '#c0a060',
    cdot: '#f0f0f0', cdot2: '#c0a060',
    div: '#222', dtime: '#f0f0f0', ddate: '#666',
    alarmBg: '#1a1a1a', alarmBorder: '#2a2a2a',
    alarmTime: '#f0f0f0', alarmLabel: '#666',
    toggleOn: '#f0f0f0', toggleOff: '#2a2a2a',
    addBorder: '#333', addColor: '#555',
    swTxt: '#f0f0f0', swMsTxt: '#555',
    btnPri: '#f0f0f0', btnPriTxt: '#111',
    btnSec: '#222', btnSecTxt: '#888',
    lapBg: '#161616', lapTxt: '#666',
    presetBg: '#1e1e1e', presetTxt: '#888',
    arcBg: '#222', arcFg: '#c0a060',
    timerTxt: '#f0f0f0', timerSub: '#c0a060'
  },
  {
    name: 'Forest',
    dot: '#1a2e1a',
    app: '#0f1a0f', appBorder: '#1e3a1e',
    logo: '#2d5a2d', logoIcon: '#a8d8a8', title: '#c8e6c8',
    nav: '#6aaa6a', navActive: 'rgba(100,180,100,0.1)',
    clockCard: '#131f13', clockBorder: '#1e3a1e',
    dial: '#0a140a', dialBorder: '#1e3a1e',
    ring: 'rgba(100,180,100,0.08)',
    tickMaj: '#7ec87e', tickMin: '#1e3a1e',
    nums: '#6aaa6a',
    hh: '#c8e6c8', hm: '#6aaa6a', hs: '#4caf50',
    cdot: '#c8e6c8', cdot2: '#4caf50',
    div: '#1e3a1e', dtime: '#c8e6c8', ddate: '#4a7a4a',
    alarmBg: '#131f13', alarmBorder: '#1e3a1e',
    alarmTime: '#c8e6c8', alarmLabel: '#4a7a4a',
    toggleOn: '#4caf50', toggleOff: '#1e3a1e',
    addBorder: '#2d5a2d', addColor: '#4a7a4a',
    swTxt: '#c8e6c8', swMsTxt: '#4a7a4a',
    btnPri: '#2d5a2d', btnPriTxt: '#c8e6c8',
    btnSec: '#1a2e1a', btnSecTxt: '#6aaa6a',
    lapBg: '#111a11', lapTxt: '#4a7a4a',
    presetBg: '#1a2e1a', presetTxt: '#6aaa6a',
    arcBg: '#1e3a1e', arcFg: '#4caf50',
    timerTxt: '#c8e6c8', timerSub: '#4caf50'
  }
];

let curTheme = 0;

/* set dot colors once */
themes.forEach((t, i) => {
  document.getElementById('th' + i).style.background = t.dot;
});

function applyTheme(i) {
  curTheme = i;
  const t = themes[i];

  const app = document.getElementById('app');
  app.style.background = t.app;
  app.style.borderColor = t.appBorder;

  document.getElementById('appLogo').style.background = t.logo;
  document.getElementById('logoIcon').style.color = t.logoIcon;
  document.getElementById('appTitle').style.color = t.title;

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.style.color = t.nav;
    b.style.background = b.classList.contains('active') ? t.navActive : 'transparent';
  });

  document.getElementById('clockCard').style.background = t.clockCard;
  document.getElementById('clockCard').style.borderColor = t.clockBorder;
  document.getElementById('dial').style.background = t.dial;
  document.getElementById('dial').style.borderColor = t.dialBorder;
  document.getElementById('dialRing').style.borderColor = t.ring;

  document.querySelectorAll('.tick-el').forEach((el, idx) => {
    el.style.background = (idx % 5 === 0) ? t.tickMaj : t.tickMin;
    el.style.opacity    = (idx % 5 === 0) ? '0.75' : '0.4';
  });
  document.querySelectorAll('.hlabel').forEach(el => el.style.color = t.nums);

  document.getElementById('hh').style.background    = t.hh;
  document.getElementById('hm').style.background    = t.hm;
  document.getElementById('hs').style.background    = t.hs;
  document.getElementById('cdot').style.background  = t.cdot;
  document.getElementById('cdot2').style.background = t.cdot2;
  document.getElementById('divLine').style.background = t.div;
  document.getElementById('dtime').style.color      = t.dtime;
  document.getElementById('ddate').style.color      = t.ddate;

  renderAlarms();
  document.getElementById('addAlarmBtn').style.borderColor = t.addBorder;
  document.getElementById('addAlarmBtn').style.color       = t.addColor;

  document.getElementById('swDisplay').style.color = t.swTxt;
  document.querySelectorAll('.sw-ms').forEach(e => e.style.color = t.swMsTxt);

  document.getElementById('lapBtn').style.background      = t.btnSec;
  document.getElementById('lapBtn').style.color           = t.btnSecTxt;
  document.getElementById('swStartBtn').style.background  = t.btnPri;
  document.getElementById('swStartBtn').style.color       = t.btnPriTxt;
  document.getElementById('swResetBtn').style.background  = t.btnSec;
  document.getElementById('swResetBtn').style.color       = t.btnSecTxt;

  document.querySelectorAll('.lap-item').forEach(el => {
    el.style.background = t.lapBg;
    el.style.color      = t.lapTxt;
  });
  document.querySelectorAll('.preset-btn').forEach(el => {
    el.style.background = t.presetBg;
    el.style.color      = t.presetTxt;
  });

  document.getElementById('arcBg').style.stroke    = t.arcBg;
  document.getElementById('arcFg').style.stroke    = t.arcFg;
  document.getElementById('timerCenter').style.color = t.timerTxt;
  document.getElementById('timerSub').style.color    = t.timerSub;

  document.getElementById('timerStartBtn').style.background = t.btnPri;
  document.getElementById('timerStartBtn').style.color      = t.btnPriTxt;
  document.getElementById('timerResetBtn').style.background = t.btnSec;
  document.getElementById('timerResetBtn').style.color      = t.btnSecTxt;

  document.querySelectorAll('.tbtn').forEach((b, bi) => b.classList.toggle('active', bi === i));
}

/* ── NAV ── */
function showPanel(i) {
  document.querySelectorAll('.panel').forEach((p, pi) => p.classList.toggle('active', pi === i));
  document.querySelectorAll('.nav-btn').forEach((b, bi) => {
    b.classList.toggle('active', bi === i);
    b.style.background = bi === i ? themes[curTheme].navActive : 'transparent';
  });
}

/* ── DIAL BUILD ── */
const cx = 100, cy = 100;
for (let i = 0; i < 60; i++) {
  const a = (i * 6 - 90) * Math.PI / 180;
  const maj = i % 5 === 0;
  const d = maj ? 84 : 88, h = maj ? 10 : 5, w = maj ? 2 : 1;
  const el = document.createElement('div');
  el.className = 'tick-el';
  el.style.cssText =
    `position:absolute;` +
    `top:${cy + Math.sin(a) * d - h}px;` +
    `left:${cx + Math.cos(a) * d - w / 2}px;` +
    `transform:rotate(${i * 6}deg);` +
    `transform-origin:50% 100%;` +
    `width:${w}px;height:${h}px;border-radius:2px;`;
  document.getElementById('ticks').appendChild(el);
}
[12,1,2,3,4,5,6,7,8,9,10,11].forEach((n, i) => {
  const a = (i * 30 - 90) * Math.PI / 180, d = 72;
  const el = document.createElement('div');
  el.className = 'hlabel';
  el.textContent = n;
  el.style.cssText +=
    `position:absolute;` +
    `top:${cy + Math.sin(a) * d - 10}px;` +
    `left:${cx + Math.cos(a) * d - 10}px;` +
    `font-size:${n === 12 ? '13px' : '11px'};` +
    `font-weight:${n === 12 ? '500' : '400'};`;
  document.getElementById('hlabels').appendChild(el);
});

/* ── CLOCK ── */
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function updateClock() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(),
        s = now.getSeconds(), ms = now.getMilliseconds();

  document.getElementById('hourHand').style.transform =
    `translateX(-50%) rotate(${(h % 12) * 30 + m * 0.5}deg)`;
  document.getElementById('minHand').style.transform  =
    `translateX(-50%) rotate(${m * 6 + s * 0.1}deg)`;
  document.getElementById('secHand').style.transform  =
    `translateX(-50%) rotate(${s * 6 + ms * 0.006}deg)`;

  const hh = h % 12 || 12, ampm = h < 12 ? 'AM' : 'PM';
  const p = n => String(n).padStart(2, '0');
  document.getElementById('dtime').textContent = `${p(hh)}:${p(m)} ${ampm}`;
  document.getElementById('ddate').textContent = `${DAYS[now.getDay()]}  ${now.getDate()} ${MONTHS[now.getMonth()]}`;
}
setInterval(updateClock, 50);
updateClock();

/* ── ALARM ── */
let alarms = [
  { time: '07:00', label: 'Good Morning', on: true  },
  { time: '09:30', label: 'Meeting',      on: false },
  { time: '22:00', label: 'Sleep',        on: true  }
];

function renderAlarms() {
  const t    = themes[curTheme];
  const list = document.getElementById('alarmList');
  list.innerHTML = '';

  alarms.forEach((a, i) => {
    const el = document.createElement('div');
    el.className = 'alarm-item';
    el.style.cssText = `background:${t.alarmBg};border-color:${t.alarmBorder};`;
    el.innerHTML = `
      <div>
        <div class="alarm-time"  style="color:${t.alarmTime}">${a.time}</div>
        <div class="alarm-label" style="color:${t.alarmLabel}">${a.label}</div>
      </div>
      <div class="alarm-right">
        <button class="toggle ${a.on ? 'on' : 'off'}"
          style="background:${a.on ? t.toggleOn : t.toggleOff}"
          onclick="toggleAlarm(${i})"></button>
        <button class="alarm-delete" style="color:${t.alarmLabel}" onclick="deleteAlarm(${i})">
          <i class="ti ti-trash"></i>
        </button>
      </div>`;
    list.appendChild(el);
  });
}

function toggleAlarm(i) { alarms[i].on = !alarms[i].on; renderAlarms(); }
function deleteAlarm(i) { alarms.splice(i, 1); renderAlarms(); }
function addAlarm() {
  const time  = prompt('Enter time (HH:MM):', '08:00');
  if (!time) return;
  const label = prompt('Label:', 'Alarm');
  alarms.push({ time, label: label || 'Alarm', on: true });
  renderAlarms();
}

/* ── STOPWATCH ── */
let swRunning = false, swStart = 0, swElapsed = 0,
    swInterval = null, laps = [];

function swToggle() {
  if (!swRunning) {
    swRunning = true;
    swStart   = Date.now() - swElapsed;
    document.getElementById('swIcon').className = 'ti ti-player-pause';
    swInterval = setInterval(swTick, 30);
  } else {
    swRunning  = false;
    swElapsed  = Date.now() - swStart;
    document.getElementById('swIcon').className = 'ti ti-player-play';
    clearInterval(swInterval);
  }
}

function swTick() {
  const el  = Date.now() - swStart;
  const m   = Math.floor(el / 60000);
  const s   = Math.floor((el % 60000) / 1000);
  const ms  = Math.floor((el % 1000) / 10);
  const t   = themes[curTheme];
  document.getElementById('swDisplay').innerHTML =
    `${String(m).padStart(2,'0')}:<span>${String(s).padStart(2,'0')}</span>` +
    `<span class="sw-ms" style="color:${t.swMsTxt}">.<span>${String(ms).padStart(2,'0')}</span></span>`;
}

function swReset() {
  swRunning = false;
  clearInterval(swInterval);
  swElapsed = 0;
  laps = [];
  document.getElementById('swIcon').className = 'ti ti-player-play';
  const t = themes[curTheme];
  document.getElementById('swDisplay').innerHTML =
    `00:<span>00</span><span class="sw-ms" style="color:${t.swMsTxt}">.<span>00</span></span>`;
  document.getElementById('lapList').innerHTML = '';
}

function swLap() {
  if (!swRunning && swElapsed === 0) return;
  const el  = swRunning ? (Date.now() - swStart) : swElapsed;
  const m   = Math.floor(el / 60000);
  const s   = Math.floor((el % 60000) / 1000);
  const ms  = Math.floor((el % 1000) / 10);
  laps.push(`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0')}`);

  const t   = themes[curTheme];
  const div = document.createElement('div');
  div.className = 'lap-item';
  div.style.cssText = `background:${t.lapBg};color:${t.lapTxt};`;
  div.innerHTML =
    `<span style="opacity:0.5">Lap ${laps.length}</span><span>${laps[laps.length - 1]}</span>`;
  document.getElementById('lapList').prepend(div);
}

/* ── TIMER ── */
let timerTotal = 300, timerLeft = 300,
    timerRunning = false, timerInterval = null;

function setTimer(sec) {
  timerTotal   = sec;
  timerLeft    = sec;
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timerIcon').className = 'ti ti-player-play';
  document.getElementById('timerSub').textContent = 'READY';
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = Math.floor(timerLeft / 60), s = timerLeft % 60;
  document.getElementById('timerCenter').textContent =
    `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  const prog = timerLeft / timerTotal;
  document.getElementById('arcFg').style.strokeDashoffset = C * (1 - prog);
}

function timerToggle() {
  if (timerLeft <= 0) return;
  if (!timerRunning) {
    timerRunning = true;
    document.getElementById('timerIcon').className = 'ti ti-player-pause';
    document.getElementById('timerSub').textContent = 'RUNNING';
    timerInterval = setInterval(() => {
      timerLeft--;
      updateTimerDisplay();
      if (timerLeft <= 0) {
        timerRunning = false;
        clearInterval(timerInterval);
        document.getElementById('timerIcon').className = 'ti ti-player-play';
        document.getElementById('timerSub').textContent = 'DONE';
      }
    }, 1000);
  } else {
    timerRunning = false;
    clearInterval(timerInterval);
    document.getElementById('timerIcon').className = 'ti ti-player-play';
    document.getElementById('timerSub').textContent = 'PAUSED';
  }
}

function timerReset() {
  timerLeft    = timerTotal;
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timerIcon').className = 'ti ti-player-play';
  document.getElementById('timerSub').textContent = 'READY';
  updateTimerDisplay();
}

/* ── INIT ── */
updateTimerDisplay();
applyTheme(0);
