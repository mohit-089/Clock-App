/* ══════════════════════════════════════════════
   CLOCK APP  –  script.js
   Tabs: Clock + Weather | Alarm | Stopwatch | Timer
   Themes: Pearl | Obsidian | Forest | iOS
══════════════════════════════════════════════ */

/* ── TIMER ARC SETUP ── */
const TC = 2 * Math.PI * 75;
document.getElementById('tarcFg').style.strokeDasharray = TC;
document.getElementById('tarcFg').style.strokeDashoffset = 0;
document.getElementById('tarcBg').style.stroke = 'var(--arc-bg)';

/* ── PICKER DATA ── */
const SOUNDS  = ['None','Radar','Chimes','Crystals','Hillside','Opening','Playtime',
                 'Popcorn','Presto','Ripple','Sencha','Signal','Silk','Slow Rise',
                 'Stargaze','Digital Beep','Classic Bell','Marimba'];
const SNOOZES = ['Off','1 min','2 min','3 min','5 min','10 min','15 min'];
const REPEATS = ['Never','Every Day','Weekdays','Weekends','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

/* ── THEME CLASSES ── */
const THEME_CLS = ['', 't-obsidian', 't-forest', 't-ios'];
const DOT_COLORS = ['#e8e6e1', '#2a2a2a', '#1a2e1a', '#007aff'];

(function initDots() {
  THEME_CLS.forEach((_, i) => {
    document.getElementById('td' + i).style.background = DOT_COLORS[i];
  });
})();

function setTheme(i) {
  const app = document.getElementById('mainApp');
  THEME_CLS.forEach(c => { if (c) app.classList.remove(c); });
  if (THEME_CLS[i]) app.classList.add(THEME_CLS[i]);
  document.querySelectorAll('.tdot').forEach((d, di) => d.classList.toggle('active', di === i));
  /* re-set tog colours */
  renderAlarms();
}

/* ── TAB SWITCHING ── */
function showTab(i) {
  document.querySelectorAll('.pnl').forEach((p, pi) => p.classList.toggle('active', pi === i));
  document.querySelectorAll('.nb').forEach((b, bi) => b.classList.toggle('active', bi === i));
}

/* ── BUILD CLOCK DIAL ── */
(function buildDial() {
  const cx = 90, cy = 90;

  for (let i = 0; i < 60; i++) {
    const a   = (i * 6 - 90) * Math.PI / 180;
    const maj = i % 5 === 0;
    const d   = maj ? 76 : 80;
    const h   = maj ? 9  : 5;
    const w   = maj ? 2  : 1;
    const el  = document.createElement('div');
    el.className = 'tick-el';
    el.style.cssText =
      `position:absolute;` +
      `top:${cy + Math.sin(a) * d - h}px;` +
      `left:${cx + Math.cos(a) * d - w / 2}px;` +
      `transform:rotate(${i * 6}deg);` +
      `transform-origin:50% 100%;` +
      `width:${w}px;height:${h}px;border-radius:2px;` +
      `background:var(--${maj ? 'text-sec' : 'dial-ring'});` +
      `opacity:${maj ? .75 : .4};`;
    document.getElementById('tks').appendChild(el);
  }

  [12,1,2,3,4,5,6,7,8,9,10,11].forEach((n, i) => {
    const a  = (i * 30 - 90) * Math.PI / 180;
    const d  = 65;
    const el = document.createElement('div');
    el.className = 'hlbl';
    el.textContent = n;
    el.style.cssText +=
      `position:absolute;` +
      `top:${cy + Math.sin(a) * d - 9}px;` +
      `left:${cx + Math.cos(a) * d - 9}px;` +
      `font-size:${n === 12 ? '12px' : '10px'};` +
      `font-weight:${n === 12 ? '500' : '400'};`;
    document.getElementById('hls').appendChild(el);
  });
})();

/* ── CLOCK TICK ── */
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

(function startClock() {
  function tick() {
    const now = new Date();
    const h   = now.getHours();
    const m   = now.getMinutes();
    const s   = now.getSeconds();
    const ms  = now.getMilliseconds();

    document.getElementById('hH').style.transform =
      `translateX(-50%) rotate(${(h % 12) * 30 + m * 0.5}deg)`;
    document.getElementById('hM').style.transform =
      `translateX(-50%) rotate(${m * 6 + s * 0.1}deg)`;
    document.getElementById('hS').style.transform =
      `translateX(-50%) rotate(${s * 6 + ms * 0.006}deg)`;

    const hh   = h % 12 || 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    const pad  = n => String(n).padStart(2, '0');
    document.getElementById('dtxt').textContent  = `${pad(hh)}:${pad(m)} ${ampm}`;
    document.getElementById('ddtxt').textContent =
      `${DAYS[now.getDay()]}  ${now.getDate()} ${MONTHS[now.getMonth()]}`;
  }
  setInterval(tick, 50);
  tick();
})();

/* ══════════════════════════════════════════════
   WEATHER
══════════════════════════════════════════════ */
const WX_ICONS = {
  0:'ti-sun', 1:'ti-sun', 2:'ti-cloud', 3:'ti-cloud',
  45:'ti-cloud-fog', 48:'ti-cloud-fog',
  51:'ti-cloud-drizzle', 53:'ti-cloud-drizzle', 55:'ti-cloud-drizzle',
  61:'ti-cloud-rain',   63:'ti-cloud-rain',   65:'ti-cloud-rain',
  71:'ti-snowflake',    73:'ti-snowflake',    75:'ti-snowflake',
  80:'ti-cloud-rain',   81:'ti-cloud-rain',   82:'ti-cloud-rain',
  95:'ti-cloud-storm',  96:'ti-cloud-storm',  99:'ti-cloud-storm'
};
const WX_DESC = {
  0:'Clear sky', 1:'Mostly clear', 2:'Partly cloudy', 3:'Overcast',
  45:'Foggy', 48:'Icy fog',
  51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
  61:'Light rain', 63:'Rain', 65:'Heavy rain',
  71:'Light snow', 73:'Snow', 75:'Heavy snow',
  80:'Rain showers', 81:'Heavy showers', 82:'Violent showers',
  95:'Thunderstorm', 96:'Hail storm', 99:'Heavy hail'
};

async function fetchWeather() {
  const wxBody = document.getElementById('wxBody');
  const wxLoc  = document.getElementById('wxLoc');
  wxBody.innerHTML = '<div class="wx-loading">Detecting location…</div>';
  wxLoc.textContent = 'Detecting…';

  try {
    const pos = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000 })
    );
    const { latitude: lat, longitude: lon } = pos.coords;
    wxBody.innerHTML = '<div class="wx-loading">Fetching weather…</div>';

    const [wxRes, geoRes] = await Promise.all([
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode` +
            `&timezone=auto&wind_speed_unit=kmh`),
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    ]);

    const wxData  = await wxRes.json();
    const geoData = await geoRes.json();
    const c       = wxData.current;
    const code    = c.weathercode;
    const addr    = geoData.address;
    const city    = addr.city || addr.town || addr.village || addr.county || 'Your Location';
    const icon    = WX_ICONS[code] || 'ti-cloud';
    const desc    = WX_DESC[code]  || 'Unknown';

    wxLoc.textContent = city;
    wxBody.innerHTML  = `
      <div class="wx-main">
        <i class="ti ${icon} wx-icon"></i>
        <div>
          <div class="wx-temp">${Math.round(c.temperature_2m)}°C</div>
          <div class="wx-desc">${desc}</div>
        </div>
      </div>
      <div class="wx-details">
        <span class="wx-detail">
          <i class="ti ti-droplet"></i>${c.relative_humidity_2m}% humidity
        </span>
        <span class="wx-detail">
          <i class="ti ti-wind"></i>${Math.round(c.wind_speed_10m)} km/h wind
        </span>
      </div>`;

  } catch (e) {
    const msg = e.code === 1
      ? 'Allow location access and tap retry'
      : 'Could not load weather — check connection';
    wxLoc.textContent = 'Location unavailable';
    wxBody.innerHTML  =
      `<div class="wx-loading">${msg}<br>
       <button class="wx-retry" onclick="fetchWeather()">Retry</button>
       </div>`;
  }
}

fetchWeather();

/* ══════════════════════════════════════════════
   ALARMS
══════════════════════════════════════════════ */
let alarms = [
  { time: '07:00', label: 'Good Morning', on: true,  sound: 'Radar',  snooze: '5 min', repeat: 'Never'     },
  { time: '09:30', label: 'Meeting',      on: false, sound: 'Chimes', snooze: 'Off',   repeat: 'Weekdays'  },
  { time: '22:00', label: 'Sleep',        on: true,  sound: 'Silk',   snooze: '5 min', repeat: 'Every Day' }
];
let expIdx = -1;

function renderAlarms() {
  /* get current tog-on colour from CSS variable */
  const togOn = getComputedStyle(document.getElementById('mainApp'))
                  .getPropertyValue('--tog-on').trim() || '#555';

  const list  = document.getElementById('almList');
  list.innerHTML = '';

  alarms.forEach((a, i) => {
    const isExp = expIdx === i;
    const div   = document.createElement('div');
    div.className = 'alm-item';
    div.innerHTML = `
      <div class="alm-main" onclick="toggleExp(${i})">
        <div>
          <div class="alm-time">${a.time}</div>
          <div class="alm-meta">${a.label} · ${a.repeat}</div>
        </div>
        <div class="alm-right">
          <button class="tog ${a.on ? 'on' : 'off'}"
            style="background:${a.on ? togOn : 'var(--dial-ring)'}"
            onclick="event.stopPropagation(); togAlm(${i})"
            aria-label="Toggle alarm"></button>
          <i class="ti ti-chevron-${isExp ? 'up' : 'down'}"
             style="font-size:13px;color:var(--text-sec);"></i>
        </div>
      </div>
      ${isExp ? `
      <div class="alm-exp">
        <div class="alm-opt" onclick="openPickerFor(${i},'sound')">
          <span class="alm-opt-lbl">
            <i class="ti ti-music"></i>Sound
          </span>
          <span class="alm-opt-val">
            ${a.sound} <i class="ti ti-chevron-right" style="font-size:10px"></i>
          </span>
        </div>
        <div class="alm-opt" onclick="openPickerFor(${i},'snooze')">
          <span class="alm-opt-lbl">
            <i class="ti ti-zzz"></i>Snooze
          </span>
          <span class="alm-opt-val">
            ${a.snooze} <i class="ti ti-chevron-right" style="font-size:10px"></i>
          </span>
        </div>
        <div class="alm-opt" onclick="openPickerFor(${i},'repeat')">
          <span class="alm-opt-lbl">
            <i class="ti ti-repeat"></i>Repeat
          </span>
          <span class="alm-opt-val">
            ${a.repeat} <i class="ti ti-chevron-right" style="font-size:10px"></i>
          </span>
        </div>
        <div class="alm-acts">
          <button class="alm-act alm-del" onclick="delAlarm(${i})">
            <i class="ti ti-trash" style="font-size:12px;vertical-align:-1px;margin-right:3px"></i>Delete
          </button>
          <button class="alm-act alm-edit" onclick="openModal(${i})">
            <i class="ti ti-edit" style="font-size:12px;vertical-align:-1px;margin-right:3px"></i>Edit
          </button>
        </div>
      </div>` : ''}`;
    list.appendChild(div);
  });
}

function toggleExp(i) { expIdx = expIdx === i ? -1 : i; renderAlarms(); }
function togAlm(i)    { alarms[i].on = !alarms[i].on; renderAlarms(); }
function delAlarm(i)  { alarms.splice(i, 1); expIdx = -1; renderAlarms(); }

/* ── MODAL ── */
let editIdx = -1, mSound = 'Radar', mSnooze = '5 min', mRepeat = 'Never';

function openModal(i) {
  editIdx = i;
  const a = i >= 0 ? alarms[i] : null;
  document.getElementById('mTitle').textContent = i >= 0 ? 'Edit Alarm' : 'New Alarm';
  document.getElementById('mTime').value = a ? a.time  : '08:00';
  document.getElementById('mLbl').value  = a ? a.label : '';
  mSound  = a ? a.sound  : 'Radar';
  mSnooze = a ? a.snooze : '5 min';
  mRepeat = a ? a.repeat : 'Never';
  updMVals();
  document.getElementById('modalBg').classList.add('show');
}

function updMVals() {
  const chev = `<i class="ti ti-chevron-right" style="font-size:11px"></i>`;
  document.getElementById('mSoundV').innerHTML  = `${mSound}  ${chev}`;
  document.getElementById('mSnoozeV').innerHTML = `${mSnooze} ${chev}`;
  document.getElementById('mRepeatV').innerHTML = `${mRepeat} ${chev}`;
}

function closeModal() { document.getElementById('modalBg').classList.remove('show'); }

function closeMBg(e) {
  if (e.target === document.getElementById('modalBg')) closeModal();
}

function saveAlarm() {
  const time  = document.getElementById('mTime').value;
  const label = document.getElementById('mLbl').value || 'Alarm';
  if (!time) return;
  const entry = { time, label, on: true, sound: mSound, snooze: mSnooze, repeat: mRepeat };
  if (editIdx >= 0) alarms[editIdx] = { ...alarms[editIdx], ...entry };
  else alarms.push(entry);
  closeModal();
  renderAlarms();
}

/* ── OPTION PICKER ── */
let pKey = '', pForIdx = -1;

function openPicker(k)        { pKey = k; pForIdx = -1;  showPicker(); }
function openPickerFor(i, k)  { pKey = k; pForIdx = i;   showPicker(); }

function showPicker() {
  const opts = pKey === 'sound' ? SOUNDS : pKey === 'snooze' ? SNOOZES : REPEATS;
  const cur  = pKey === 'sound' ? mSound : pKey === 'snooze' ? mSnooze : mRepeat;
  const box  = document.getElementById('pickerBox');
  box.innerHTML = '';

  opts.forEach(o => {
    const d  = document.createElement('div');
    d.className = 'popt' + (o === cur ? ' sel' : '');
    const tick = o === cur
      ? `<i class="ti ti-check" style="font-size:13px;color:var(--text-pri)"></i>`
      : `<span style="width:17px;display:inline-block"></span>`;
    d.innerHTML = tick + ' ' + o;
    d.onclick   = () => selectOpt(o);
    box.appendChild(d);
  });

  document.getElementById('pickerBg').classList.add('show');
}

function selectOpt(v) {
  if      (pKey === 'sound')  { mSound  = v; if (pForIdx >= 0) alarms[pForIdx].sound  = v; }
  else if (pKey === 'snooze') { mSnooze = v; if (pForIdx >= 0) alarms[pForIdx].snooze = v; }
  else                        { mRepeat = v; if (pForIdx >= 0) alarms[pForIdx].repeat = v; }
  updMVals();
  document.getElementById('pickerBg').classList.remove('show');
  if (pForIdx >= 0) renderAlarms();
}

function closePBg(e) {
  if (e.target === document.getElementById('pickerBg'))
    document.getElementById('pickerBg').classList.remove('show');
}

/* ══════════════════════════════════════════════
   STOPWATCH
══════════════════════════════════════════════ */
let swRun  = false, swStart = 0, swEl = 0, swInt = null, laps = [];

function swToggle() {
  if (!swRun) {
    swRun    = true;
    swStart  = Date.now() - swEl;
    document.getElementById('swIco').className = 'ti ti-player-pause';
    swInt = setInterval(swTick, 30);
  } else {
    swRun  = false;
    swEl   = Date.now() - swStart;
    document.getElementById('swIco').className = 'ti ti-player-play';
    clearInterval(swInt);
  }
}

function swTick() {
  const el = Date.now() - swStart;
  const m  = Math.floor(el / 60000);
  const s  = Math.floor((el % 60000) / 1000);
  const ms = Math.floor((el % 1000) / 10);
  document.getElementById('swD').innerHTML =
    `${String(m).padStart(2,'0')}:<span>${String(s).padStart(2,'0')}</span>` +
    `<span class="swms">.<span>${String(ms).padStart(2,'0')}</span></span>`;
}

function swReset() {
  swRun  = false;
  clearInterval(swInt);
  swEl   = 0;
  laps   = [];
  document.getElementById('swIco').className = 'ti ti-player-play';
  document.getElementById('swD').innerHTML   =
    `00:<span>00</span><span class="swms">.<span>00</span></span>`;
  document.getElementById('lapL').innerHTML  = '';
}

function swLap() {
  if (!swRun && swEl === 0) return;
  const el = swRun ? (Date.now() - swStart) : swEl;
  const m  = Math.floor(el / 60000);
  const s  = Math.floor((el % 60000) / 1000);
  const ms = Math.floor((el % 1000) / 10);
  laps.push(`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0')}`);
  const d  = document.createElement('div');
  d.className   = 'lap-item';
  d.innerHTML   = `<span style="opacity:.5">Lap ${laps.length}</span><span>${laps[laps.length - 1]}</span>`;
  document.getElementById('lapL').prepend(d);
}

/* ══════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════ */
let tmrTotal = 300, tmrLeft = 300, tmrRun = false, tmrInt = null;

function setTimer(s) {
  tmrTotal = s; tmrLeft = s; tmrRun = false;
  clearInterval(tmrInt);
  document.getElementById('tIco').className   = 'ti ti-player-play';
  document.getElementById('tSub').textContent = 'READY';
  updTmr();
}

function updTmr() {
  const m = Math.floor(tmrLeft / 60);
  const s = tmrLeft % 60;
  document.getElementById('tCtr').textContent =
    `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.getElementById('tarcFg').style.strokeDashoffset =
    TC * (1 - tmrLeft / tmrTotal);
  document.getElementById('tarcFg').style.stroke = 'var(--arc-fg)';
}

function tmrToggle() {
  if (tmrLeft <= 0) return;
  if (!tmrRun) {
    tmrRun = true;
    document.getElementById('tIco').className   = 'ti ti-player-pause';
    document.getElementById('tSub').textContent = 'RUNNING';
    tmrInt = setInterval(() => {
      tmrLeft--;
      updTmr();
      if (tmrLeft <= 0) {
        tmrRun = false;
        clearInterval(tmrInt);
        document.getElementById('tIco').className   = 'ti ti-player-play';
        document.getElementById('tSub').textContent = 'DONE';
      }
    }, 1000);
  } else {
    tmrRun = false;
    clearInterval(tmrInt);
    document.getElementById('tIco').className   = 'ti ti-player-play';
    document.getElementById('tSub').textContent = 'PAUSED';
  }
}

function setCustomTimer() {
    let mins = document.getElementById("customTime").value;
    if (mins > 0) {
        setTimer(mins * 60);
    } else {
        alert("Please enter a valid time");
    }
}

function tmrReset() {
  tmrLeft  = tmrTotal; tmrRun = false;
  clearInterval(tmrInt);
  document.getElementById('tIco').className   = 'ti ti-player-play';
  document.getElementById('tSub').textContent = 'READY';
  updTmr();
}

/* ── INIT ── */
updTmr();
renderAlarms();
