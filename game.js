(function () {
  "use strict";

  const cfg = window.GAME_CONFIG;
  const ITEMS = window.GAME_ITEMS;
  const CUSTOMERS = window.GAME_CUSTOMERS;
  const GROUP_LABEL = { main: "主食", side: "小食", drink: "饮料", dessert: "甜品" };
  const TASTE_SPEECH = {
    spicy: "要辣，别太清淡。",
    mild: "不要辣，谢谢。",
    any: "随便，能吃饱就行。"
  };
  const MUTE_KEY = "fandian-muted";

  const $ = (id) => document.getElementById(id);
  const els = {
    hud: $("hud"),
    score: $("score"),
    combo: $("combo"),
    timer: $("timer"),
    timerBox: $("timerBox"),
    hearts: $("hearts"),
    startScreen: $("startScreen"),
    gameScreen: $("gameScreen"),
    overScreen: $("overScreen"),
    startBtn: $("startBtn"),
    startBest: $("startBest"),
    todayLabel: $("todayLabel"),
    sourceNote: $("sourceNote"),
    orderCard: $("orderCard"),
    customerFace: $("customerFace"),
    customerName: $("customerName"),
    targetKcal: $("targetKcal"),
    budget: $("budget"),
    taste: $("taste"),
    tasteDemand: $("tasteDemand"),
    speech: $("speech"),
    menuGrid: $("menuGrid"),
    pickedCount: $("pickedCount"),
    totalKcal: $("totalKcal"),
    totalPrice: $("totalPrice"),
    clearBtn: $("clearBtn"),
    serveBtn: $("serveBtn"),
    toast: $("toast"),
    resultPop: $("resultPop"),
    patienceTrack: $("patienceTrack"),
    patienceFill: $("patienceFill"),
    chefBubble: $("chefBubble"),
    pkBanner: $("pkBanner"),
    pkBannerText: $("pkBannerText"),
    pkCloseBtn: $("pkCloseBtn"),
    pkStartBtn: $("pkStartBtn"),
    overHint: $("overHint"),
    overTitle: $("overTitle"),
    finalScore: $("finalScore"),
    finalStars: $("finalStars"),
    finalServed: $("finalServed"),
    finalCombo: $("finalCombo"),
    finalBest: $("finalBest"),
    overLine: $("overLine"),
    againBtn: $("againBtn"),
    shareBtn: $("shareBtn"),
    muteBtn: $("muteBtn")
  };

  const ITEMS_BY_ID = new Map(ITEMS.map((item) => [item.id, item]));
  const itemButtons = new Map();
  const dateKey = getDateKey();
  const baseDeck = buildBaseDeck();
  let rng = mulberry32(hashString(dateKey + ":orders"));
  let deck = baseDeck.slice();
  let audioCtx = null;
  const PK_KEY = "fandian-pk:" + dateKey;
  let pkTarget = 0;

  const state = {
    phase: "start",
    score: 0,
    hearts: cfg.hearts,
    combo: 0,
    bestCombo: 1,
    served: 0,
    order: null,
    selected: new Set(),
    remaining: cfg.duration * 1000,
    endAt: 0,
    locked: false,
    timerId: 0,
    nextTimeout: 0,
    toastTimeout: 0,
    resultTimeout: 0,
    chefBubbleTimeout: 0,
    pkBtnTimeout: 0,
    shareBtnTimeout: 0,
    patienceMax: 0,
    patienceEndAt: 0,
    urgentShown: false,
    muted: false
  };

  function getDateKey() {
    const d = new Date();
    return [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("-");
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    let value = seed;
    return function random() {
      value |= 0;
      value = (value + 0x6d2b79f5) | 0;
      let t = Math.imul(value ^ (value >>> 15), 1 | value);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(list, random) {
    const result = list.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      const temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }
    return result;
  }

  function buildBaseDeck() {
    const mains = ITEMS.filter((item) => item.group === "main");
    const sides = ITEMS.filter((item) => item.group === "side");
    const drinks = ITEMS.filter((item) => item.group === "drink");
    const desserts = ITEMS.filter((item) => item.group === "dessert");
    const combos = [];

    for (const main of mains) {
      for (const drink of drinks) {
        for (const side of [null].concat(sides)) {
          for (const dessert of [null].concat(desserts)) {
            const picked = [main, drink, side, dessert].filter(Boolean);
            const kcal = picked.reduce((sum, item) => sum + item.kcal, 0);
            const price = picked.reduce((sum, item) => sum + item.price, 0);
            if (kcal < 350 || kcal > 1000 || price > 58) continue;
            combos.push({
              items: picked.map((item) => item.id),
              kcal,
              price,
              spicy: picked.some((item) => item.spicy)
            });
          }
        }
      }
    }

    return shuffle(combos, mulberry32(hashString(dateKey + ":deck")));
  }

  function formatPrice(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function formatMoney(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  /* 顾客每单真随机，且不与上一单重复（订单题目仍按日期固定，保证同日可比） */
  let lastCustomer = null;
  function pickCustomer() {
    let customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    while (CUSTOMERS.length > 1 && customer === lastCustomer) {
      customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    }
    lastCustomer = customer;
    return customer;
  }

  function loadBest() {
    try {
      return Number(localStorage.getItem("fandian-best:" + dateKey)) || 0;
    } catch (error) {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      localStorage.setItem("fandian-best:" + dateKey, String(value));
    } catch (error) {
      // file:// 或隐私模式下可能不可用，不影响游戏。
    }
  }

  /* 好友 PK：分享链接带 ?pk=分数，被分享人打开即应战；存 localStorage 以便免参数重开 */
  function loadPk() {
    try {
      const param = Number(new URLSearchParams(location.search).get("pk"));
      if (Number.isFinite(param) && param > 0) {
        pkTarget = Math.floor(param);
        localStorage.setItem(PK_KEY, String(pkTarget));
        return;
      }
      const stored = Number(localStorage.getItem(PK_KEY));
      if (Number.isFinite(stored) && stored > 0) pkTarget = Math.floor(stored);
    } catch (error) {
      // 存储不可用时静默跳过。
    }
  }

  function updatePkBanner() {
    if (!pkTarget) return;
    els.pkBanner.hidden = false;
    els.pkBannerText.textContent = "⚔️ 好友下了战书：" + pkTarget + " 分，敢应吗？";
    els.shareBtn.textContent = "反击回去";
  }

  function dismissPk() {
    pkTarget = 0;
    try {
      localStorage.removeItem(PK_KEY);
    } catch (error) {
      // 存储不可用时仅隐藏本次横幅。
    }
    els.pkBanner.hidden = true;
    els.shareBtn.textContent = "挑战好友";
    showToast("战书已关闭", "warn");
    beep(300, 0.05, "sine", 0.03);
  }

  function readMuted() {
    try {
      return localStorage.getItem(MUTE_KEY) === "1";
    } catch (error) {
      return false;
    }
  }

  function writeMuted(value) {
    try {
      localStorage.setItem(MUTE_KEY, value ? "1" : "0");
    } catch (error) {
      // 忽略存储失败。
    }
  }

  function applyMuted(value) {
    state.muted = value;
    els.muteBtn.textContent = value ? "🔇" : "🔊";
    els.muteBtn.setAttribute("aria-pressed", String(value));
    els.muteBtn.setAttribute("aria-label", value ? "打开音效" : "关闭音效");
    if (value) {
      stopBgm();
    } else if (state.phase === "playing") {
      startBgm();
    }
  }

  function beep(frequency, duration, type, gain) {
    if (state.muted) return;
    try {
      if (!audioCtx) {
        const activation = navigator.userActivation;
        if (activation && !activation.isActive) return;
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
      const oscillator = audioCtx.createOscillator();
      const volume = audioCtx.createGain();
      const now = audioCtx.currentTime;
      const level = gain || 0.045;
      oscillator.type = type || "sine";
      oscillator.frequency.value = frequency;
      volume.gain.setValueAtTime(level, now);
      volume.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      oscillator.connect(volume);
      volume.connect(audioCtx.destination);
      oscillator.start(now);
      oscillator.stop(now + duration);
    } catch (error) {
      // 音效失败不影响游戏。
    }
  }

  function playSelect() {
    beep(560, 0.05, "triangle", 0.035);
  }

  function playSuccess(stars) {
    const notes = stars === 3 ? [660, 880, 1320] : stars === 2 ? [620, 880] : [520];
    notes.forEach((frequency, index) => {
      window.setTimeout(() => beep(frequency, 0.09, "triangle", 0.05), index * 70);
    });
  }

  function playFail() {
    beep(150, 0.22, "sawtooth", 0.05);
  }

  /* ---------- 背景音乐：Web Audio 合成的轻快循环，无外部文件 ---------- */
  let bgmTimerId = 0;
  let bgmStep = 0;
  let bgmNextTime = 0;
  const BGM_TEMPO = 138;               // BPM
  const BGM_STEP = 60 / BGM_TEMPO / 2; // 八分音符时长
  const BGM_MELODY = [
    523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33,
    523.25, 659.25, 783.99, 880, 1046.5, 880, 783.99, 0,
    523.25, 659.25, 783.99, 659.25, 880, 783.99, 659.25, 587.33,
    880, 783.99, 659.25, 783.99, 659.25, 587.33, 523.25, 0
  ];
  const BGM_BASS = [
    130.81, 0, 196, 0, 220, 0, 196, 0,
    174.61, 0, 130.81, 0, 220, 0, 196, 0,
    130.81, 0, 196, 0, 220, 0, 196, 0,
    174.61, 0, 130.81, 0, 196, 0, 130.81, 0
  ];

  function bgmNote(freq, when, dur, type, level) {
    try {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const vol = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      vol.gain.setValueAtTime(level, when);
      vol.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      osc.connect(vol);
      vol.connect(audioCtx.destination);
      osc.start(when);
      osc.stop(when + dur);
    } catch (error) {
      // 合成失败不影响游戏。
    }
  }

  function startBgm() {
    stopBgm();
    if (state.muted) return;
    if (!audioCtx) {
      const activation = navigator.userActivation;
      if (activation && !activation.isActive) return;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    bgmStep = 0;
    bgmNextTime = audioCtx.currentTime + 0.08;
    bgmTimerId = window.setInterval(() => {
      if (state.muted || state.phase !== "playing" || !audioCtx) {
        stopBgm();
        return;
      }
      const rate = state.remaining <= 10000 ? 1.18 : 1;
      const stepDur = BGM_STEP / rate;
      while (bgmNextTime < audioCtx.currentTime + 0.25) {
        const idx = bgmStep % BGM_MELODY.length;
        if (BGM_MELODY[idx]) bgmNote(BGM_MELODY[idx], bgmNextTime, stepDur * 0.92, "square", 0.016);
        if (BGM_BASS[idx]) bgmNote(BGM_BASS[idx], bgmNextTime, stepDur * 1.7, "triangle", 0.028);
        bgmNextTime += stepDur;
        bgmStep += 1;
      }
    }, 100);
  }

  function stopBgm() {
    window.clearInterval(bgmTimerId);
    bgmTimerId = 0;
  }

  function renderMenu() {
    const artLib = window.GAME_ART && window.GAME_ART.items ? window.GAME_ART.items : null;
    const fragment = document.createDocumentFragment();
    for (const item of ITEMS) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "item";
      button.dataset.id = item.id;
      button.setAttribute("aria-pressed", "false");
      button.title = item.name + " · 蛋白质 " + item.protein + "g";
      const visual = artLib && artLib[item.id] ? artLib[item.id] : item.emoji;
      button.innerHTML =
        '<span class="item__emoji">' + visual + "</span>" +
        '<span class="item__name">' + item.name + "</span>" +
        '<span class="item__meta">' +
          "<span>" + GROUP_LABEL[item.group] + " · " + item.kcal + " kcal</span>" +
          '<span class="item__price">¥' + formatPrice(item.price) + "</span>" +
          (item.spicy ? '<span class="badge badge--spicy">辣</span>' : "") +
          (item.fried ? '<span class="badge badge--fried">炸</span>' : "") +
        "</span>";
      button.addEventListener("click", () => toggleItem(item.id));
      itemButtons.set(item.id, button);
      fragment.appendChild(button);
    }
    els.menuGrid.appendChild(fragment);
  }

  function toggleItem(id) {
    if (state.phase !== "playing" || state.locked) return;
    if (state.selected.has(id)) {
      state.selected.delete(id);
      playSelect();
    } else {
      if (state.selected.size >= cfg.maxItems) {
        showToast("最多只能选 " + cfg.maxItems + " 件", "warn");
        beep(180, 0.08, "square", 0.04);
        return;
      }
      state.selected.add(id);
      playSelect();
    }
    renderSelection();
    updateTray();
  }

  function renderSelection() {
    for (const [id, button] of itemButtons) {
      const selected = state.selected.has(id);
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    }
  }

  function selectedItems() {
    return Array.from(state.selected, (id) => ITEMS_BY_ID.get(id)).filter(Boolean);
  }

  function updateTray() {
    const picked = selectedItems();
    const kcal = picked.reduce((sum, item) => sum + item.kcal, 0);
    const price = picked.reduce((sum, item) => sum + item.price, 0);
    els.pickedCount.textContent = String(picked.length);
    els.totalKcal.textContent = String(kcal);
    els.totalPrice.textContent = formatPrice(price);
    els.totalPrice.classList.toggle(
      "is-over",
      Boolean(state.order) && price > state.order.budget
    );
  }

  function updateHud(bumpScore) {
    els.score.textContent = String(state.score);
    els.combo.textContent = "x" + Math.max(1, state.combo);
    els.hearts.textContent = "❤️".repeat(state.hearts) + "🖤".repeat(cfg.hearts - state.hearts);
    els.hearts.setAttribute("aria-label", "剩余 " + state.hearts + " 颗心");
    if (bumpScore) {
      els.score.classList.remove("is-bump");
      void els.score.offsetWidth;
      els.score.classList.add("is-bump");
    }
  }

  function updateTimer() {
    const seconds = Math.max(0, Math.ceil(state.remaining / 1000));
    els.timer.textContent = String(seconds);
    els.timerBox.classList.toggle("is-urgent", state.phase === "playing" && seconds <= 10);
  }

  function renderOrder(order) {
    const customer = order.customer;
    const faceArt = window.GAME_ART && window.GAME_ART.customers ? window.GAME_ART.customers[customer.slot] : null;
    els.customerFace.innerHTML = faceArt || customer.face;
    els.customerName.textContent = customer.name;
    els.targetKcal.textContent = String(order.targetKcal);
    els.budget.textContent = formatMoney(order.budget);
    els.taste.textContent = order.taste === "spicy" ? "要辣" : order.taste === "mild" ? "不要辣" : "随便";
    els.tasteDemand.classList.toggle("is-mild", order.taste === "mild");
    els.tasteDemand.classList.toggle("is-any", order.taste === "any");
    els.speech.textContent = "“" + customer.line + TASTE_SPEECH[order.taste] + "”";
    els.orderCard.classList.remove("is-in", "is-fail");
    void els.orderCard.offsetWidth;
    els.orderCard.classList.add("is-in");
  }

  function drawOrder() {
    if (!deck.length) deck = baseDeck.slice();
    const combo = deck.pop();
    const customer = pickCustomer();
    const taste = combo.spicy ? "spicy" : rng() < 0.25 ? "any" : "mild";
    const elapsed = cfg.duration * 1000 - state.remaining;
    const margin = elapsed < 20000 ? 8 : elapsed < 40000 ? 6 : 4;
    const patience = elapsed < 20000 ? 18 : elapsed < 40000 ? 15 : 12;
    return {
      combo: combo,
      customer: customer,
      taste: taste,
      targetKcal: combo.kcal,
      budget: Math.ceil(combo.price + margin),
      patience: patience
    };
  }

  function nextOrder() {
    if (state.phase !== "playing") return;
    state.order = drawOrder();
    state.selected.clear();
    state.locked = false;
    state.patienceMax = state.order.patience;
    state.patienceEndAt = performance.now() + state.order.patience * 1000;
    state.urgentShown = false;
    els.patienceFill.style.transform = "scaleX(1)";
    els.patienceTrack.classList.remove("is-low");
    setChefMood("normal");
    renderOrder(state.order);
    renderSelection();
    updateTray();
  }

  function evaluate(picked, order) {
    if (!picked.length) {
      return { ok: false, type: "warn", reason: "先选一个主食和一杯饮料" };
    }
    const hasMain = picked.some((item) => item.group === "main");
    const hasDrink = picked.some((item) => item.group === "drink");
    if (!hasMain) {
      return { ok: false, type: "warn", reason: "还差一个主食" };
    }
    if (!hasDrink) {
      return { ok: false, type: "warn", reason: "还差一杯饮料" };
    }

    const price = picked.reduce((sum, item) => sum + item.price, 0);
    const kcal = picked.reduce((sum, item) => sum + item.kcal, 0);
    const hasSpicy = picked.some((item) => item.spicy);

    if (price > order.budget + 0.001) {
      return {
        ok: false,
        type: "fail",
        reason: "超预算 ¥" + formatPrice(price - order.budget)
      };
    }
    if (order.taste === "spicy" && !hasSpicy) {
      return { ok: false, type: "fail", reason: "顾客要辣，没选辣味" };
    }
    if (order.taste === "mild" && hasSpicy) {
      return { ok: false, type: "fail", reason: "顾客不要辣，辣味超标" };
    }

    const diff = Math.abs(kcal - order.targetKcal);
    if (diff > 150) {
      return {
        ok: false,
        type: "fail",
        reason: "热量差 " + Math.round(diff) + " kcal，太离谱"
      };
    }

    return {
      ok: true,
      type: "ok",
      diff: diff,
      stars: diff <= 30 ? 3 : diff <= 80 ? 2 : 1
    };
  }

  function patienceLeftRatio() {
    if (!state.order || !state.patienceMax) return 1;
    const left = Math.max(0, state.patienceEndAt - performance.now());
    return Math.min(1, left / (state.patienceMax * 1000));
  }

  function updatePatience() {
    if (state.phase !== "playing" || !state.order || state.locked) return;
    const ratio = patienceLeftRatio();
    els.patienceFill.style.transform = "scaleX(" + ratio + ")";
    els.patienceTrack.classList.toggle("is-low", ratio < 0.35);
    if (ratio < 0.35 && !state.urgentShown) {
      state.urgentShown = true;
      setChefMood("urgent");
      showChefBubble("快点呀！");
    }
    if (ratio <= 0) {
      failOrder("顾客等不及，走了");
    }
  }

  function setChefMood(mood) {
    const mascots = window.GAME_ART && window.GAME_ART.mascots;
    if (!mascots) return;
    const art = mascots[mood] || mascots.normal;
    document.querySelectorAll(".chef-art").forEach((el) => {
      el.innerHTML = art;
    });
  }

  function showChefBubble(text) {
    els.chefBubble.textContent = text;
    els.chefBubble.classList.add("is-show");
    window.clearTimeout(state.chefBubbleTimeout);
    state.chefBubbleTimeout = window.setTimeout(() => {
      els.chefBubble.classList.remove("is-show");
    }, 1100);
  }

  function failOrder(reason) {
    state.locked = true;
    state.hearts = Math.max(0, state.hearts - 1);
    state.combo = 0;
    updateHud();
    showResult("-1 ♥", reason, "bad");
    showToast(reason, "bad");
    els.orderCard.classList.remove("is-fail");
    void els.orderCard.offsetWidth;
    els.orderCard.classList.add("is-fail");
    playFail();
    setChefMood("sad");
    showChefBubble("别走啊！");
    buzz(60);

    if (state.hearts <= 0) {
      window.setTimeout(() => endGame("hearts"), 780);
      return;
    }

    window.clearTimeout(state.nextTimeout);
    state.nextTimeout = window.setTimeout(() => {
      if (state.phase === "playing" && state.remaining > 0) nextOrder();
    }, 860);
  }

  function serve() {
    if (state.phase !== "playing" || state.locked || !state.order) return;
    const picked = selectedItems();
    const result = evaluate(picked, state.order);

    if (!result.ok && result.type === "warn") {
      showToast(result.reason, "warn");
      beep(220, 0.08, "square", 0.04);
      return;
    }

    state.locked = true;
    const patienceRatio = patienceLeftRatio();

    if (result.ok) {
      const multiplier = result.stars === 3 ? Math.min(3, state.combo + 1) : 1;
      const base = Math.max(20, Math.round(100 - result.diff * 0.6));
      const starBonus = result.stars === 3 ? 60 : result.stars === 2 ? 30 : 0;
      const perfectBonus = result.diff <= 10 ? 50 : 0;
      const speedBonus = patienceRatio >= 0.6 ? 30 : 0;
      const points = Math.round((base + starBonus) * multiplier) + perfectBonus + speedBonus;

      state.score += points;
      state.served += 1;
      if (result.stars === 3) {
        state.combo = Math.min(3, state.combo + 1);
        state.bestCombo = Math.max(state.bestCombo, state.combo);
      } else {
        state.combo = 0;
      }

      updateHud(true);
      showResult("+" + points, "★".repeat(result.stars), "good");
      let toastText =
        (result.stars === 3 ? "完美配餐" : result.stars === 2 ? "不错" : "勉强过关") +
        " +" + points;
      if (multiplier > 1) toastText += " · x" + multiplier;
      if (perfectBonus) toastText += " · 斤两不差 +50";
      if (speedBonus) toastText += " · 手速 +30";
      showToast(toastText, "good");
      playSuccess(result.stars);
      setChefMood("happy");
      showChefBubble(result.stars === 3 ? "稳！" : result.stars === 2 ? "不错哦" : "勉强收下");
      if (result.stars === 3) confettiBurst();
      buzz(result.stars === 3 ? [30, 40, 30] : 20);
    } else {
      failOrder(result.reason);
      return;
    }

    updateTray();

    window.clearTimeout(state.nextTimeout);
    state.nextTimeout = window.setTimeout(() => {
      if (state.phase === "playing" && state.remaining > 0) nextOrder();
    }, 640);
  }

  function clearSelection() {
    if (state.phase !== "playing" || state.locked || !state.selected.size) return;
    state.selected.clear();
    renderSelection();
    updateTray();
    beep(300, 0.05, "sine", 0.03);
  }

  function startTimer() {
    state.endAt = performance.now() + cfg.duration * 1000;
    state.remaining = cfg.duration * 1000;
    updateTimer();
    window.clearInterval(state.timerId);
    state.timerId = window.setInterval(() => {
      if (state.phase !== "playing") return;
      state.remaining = Math.max(0, state.endAt - performance.now());
      updateTimer();
      if (state.remaining <= 0) {
        endGame("time");
        return;
      }
      updatePatience();
    }, 100);
  }

  function clearTimers() {
    window.clearInterval(state.timerId);
    window.clearTimeout(state.nextTimeout);
    stopBgm();
    state.timerId = 0;
    state.nextTimeout = 0;
  }

  function startGame() {
    clearTimers();
    state.phase = "playing";
    state.score = 0;
    state.hearts = cfg.hearts;
    state.combo = 0;
    state.bestCombo = 1;
    state.served = 0;
    state.order = null;
    state.selected.clear();
    state.locked = false;
    state.remaining = cfg.duration * 1000;
    lastCustomer = null;
    state.urgentShown = false;
    state.patienceMax = 0;
    state.patienceEndAt = 0;
    els.chefBubble.classList.remove("is-show");
    window.clearTimeout(state.shareBtnTimeout);
    setChefMood("normal");
    rng = mulberry32(hashString(dateKey + ":orders"));
    deck = baseDeck.slice();

    els.startScreen.hidden = true;
    els.overScreen.hidden = true;
    els.gameScreen.hidden = false;
    els.hud.hidden = false;
    els.toast.classList.remove("is-show");
    els.resultPop.classList.remove("is-show");

    renderSelection();
    updateHud();
    updateTray();
    nextOrder();
    startTimer();
    beep(520, 0.08, "triangle", 0.045);
    startBgm();
  }

  function endGame(reason) {
    if (state.phase !== "playing") return;
    state.phase = "over";
    state.locked = true;
    clearTimers();
    state.remaining = 0;
    updateTimer();

    const previousBest = loadBest();
    const isNewBest = state.score > previousBest;
    if (isNewBest) saveBest(state.score);
    const best = Math.max(previousBest, state.score);

    els.overTitle.textContent = reason === "time" ? "时间到，收摊" : "心用完，收摊";
    els.finalScore.textContent = String(state.score);
    els.finalServed.textContent = String(state.served);
    els.finalCombo.textContent = "x" + Math.max(1, state.bestCombo);
    els.finalBest.textContent = String(best);
    els.finalStars.textContent = starsForScore(state.score);
    if (pkTarget && state.score > pkTarget) {
      els.overLine.textContent = "🏆 超越好友！" + pkTarget + " → " + state.score + " 分，反击回去！";
    } else if (pkTarget && state.score === pkTarget) {
      els.overLine.textContent = "和好友打平！再来一局分出胜负。";
    } else if (pkTarget) {
      els.overLine.textContent = "差 " + (pkTarget - state.score) + " 分输给好友，再来一局扳回一城！";
    } else if (isNewBest) {
      els.overLine.textContent = "新纪录！这波配餐很稳。";
    } else {
      els.overLine.textContent = overLineFor(state.served);
    }
    els.shareBtn.textContent = overShareLabel();
    els.overHint.textContent = "挑战链接带你的成绩（" + state.score + " 分），朋友打开就能跟你同题 PK。";

    els.toast.classList.remove("is-show");
    els.resultPop.classList.remove("is-show");
    els.chefBubble.classList.remove("is-show");
    window.clearTimeout(state.chefBubbleTimeout);
    els.gameScreen.hidden = true;
    els.hud.hidden = true;
    els.startScreen.hidden = true;
    els.overScreen.hidden = false;
    setChefMood(isNewBest ? "happy" : "sad");
    playSuccess(isNewBest ? 3 : 2);
  }

  function starsForScore(score) {
    if (score <= 0) return "☆☆☆☆☆";
    if (score >= 1400) return "★★★★★";
    if (score >= 900) return "★★★★☆";
    if (score >= 550) return "★★★☆☆";
    if (score >= 280) return "★★☆☆☆";
    return "★☆☆☆☆";
  }

  function overLineFor(served) {
    if (served >= 8) return "手速和算力都在线，再来一局冲纪录。";
    if (served >= 5) return "稳，下一局把连击拉满。";
    if (served >= 2) return "差一点，再试一次就顺了。";
    return "先熟悉一下菜单，下一局会快很多。";
  }

  function showToast(message, type) {
    els.toast.textContent = message;
    els.toast.className = "toast is-show" + (type ? " toast--" + type : "");
    window.clearTimeout(state.toastTimeout);
    state.toastTimeout = window.setTimeout(() => {
      els.toast.classList.remove("is-show");
    }, 1500);
  }

  function showResult(text, sub, type) {
    els.resultPop.innerHTML =
      "<span>" + text + "</span>" +
      (sub ? "<small>" + sub + "</small>" : "");
    els.resultPop.className = "result-pop is-show" + (type === "bad" ? " is-bad" : "");
    window.clearTimeout(state.resultTimeout);
    state.resultTimeout = window.setTimeout(() => {
      els.resultPop.classList.remove("is-show");
    }, 900);
  }

  /* 3 星撒花：DOM 彩屑，1.8 秒后自动清理 */
  function confettiBurst() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#d9251d", "#ffc72c", "#f08a2a", "#1f9d55", "#7fb6dd"];
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    for (let i = 0; i < 26; i += 1) {
      const bit = document.createElement("span");
      bit.className = "confetti-bit";
      bit.style.left = Math.random() * 100 + "vw";
      bit.style.background = colors[Math.floor(Math.random() * colors.length)];
      bit.style.animationDelay = (Math.random() * 0.25).toFixed(2) + "s";
      bit.style.animationDuration = (0.9 + Math.random() * 0.7).toFixed(2) + "s";
      const size = 6 + Math.random() * 6;
      bit.style.width = size.toFixed(1) + "px";
      bit.style.height = (size * (Math.random() > 0.5 ? 1 : 1.8)).toFixed(1) + "px";
      layer.appendChild(bit);
    }
    document.body.appendChild(layer);
    window.setTimeout(() => layer.remove(), 1900);
  }

  function buzz(pattern) {
    if (!navigator.vibrate) return;
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      // 部分环境不支持，忽略。
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // 继续用旧方法。
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (error) {
      ok = false;
    }
    area.remove();
    return ok;
  }

  function shareBaseUrl() {
    if (cfg.shareUrl) return cfg.shareUrl.replace(/\/+$/, "");
    return location.protocol.indexOf("http") === 0 ? location.origin + location.pathname : "";
  }

  async function shareScore() {
    const base = shareBaseUrl();
    const hasScore = state.score > 0;
    const url = base && hasScore ? base + "?pk=" + state.score : "";
    const text =
      "我在《饭点大作战》今日同题挑战" +
      (hasScore
        ? "拿了 " + state.score + " 分，成功出餐 " + state.served +
          " 单，最高连击 x" + Math.max(1, state.bestCombo) + "。点链接跟我 PK！"
        : "开了个头，你能超过我吗？");

    /* 系统分享只在触屏/手机上用；电脑上系统分享面板体验差且常发不出去，直接复制 */
    const isTouch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const isMobileUA = /Android|iPhone|iPad|Mobi/i.test(navigator.userAgent);
    if ((isTouch || isMobileUA) && navigator.share && url) {
      try {
        await navigator.share({ title: "饭点大作战", text: text, url: url });
        return;
      } catch (error) {
        if (error && error.name === "AbortError") {
          showToast("分享已取消，可再点一次", "warn");
          return;
        }
        // 其他错误（如分享不可用）继续走复制。
      }
    }

    const ok = await copyText(url ? text + " " + url : text);
    showToast(
      ok ? (url ? "挑战链接已复制，发给朋友一决胜负！" : "已复制战绩（在线版才有挑战链接）") : "复制失败，请直接截图",
      ok ? "good" : "warn"
    );
    els.shareBtn.textContent = ok ? "✓ 已复制，去粘贴给朋友" : "✗ 复制失败，再试一次";
    window.clearTimeout(state.shareBtnTimeout);
    state.shareBtnTimeout = window.setTimeout(() => {
      els.shareBtn.textContent = overShareLabel();
    }, 1800);
    beep(ok ? 760 : 180, 0.08, "triangle", 0.04);
  }

  /* 结算页分享按钮的常态文案（随 PK 战局变化） */
  function overShareLabel() {
    if (!pkTarget) return "挑战好友 · " + state.score + " 分";
    if (state.score > pkTarget) return "反击回去 · " + state.score + " 分";
    return "再战好友 · " + state.score + " 分";
  }

  /* 开始页主动发起挑战：用今日最高分生成战书链接 */
  const PK_BTN_LABEL = "⚔️ 挑战好友 · 发战绩链接";
  async function shareBest() {
    const best = loadBest();
    if (best <= 0) {
      showToast("先玩一局，才有成绩挑战好友", "warn");
      beep(180, 0.08, "square", 0.04);
      return;
    }
    const base = shareBaseUrl();
    const url = base ? base + "?pk=" + best : "";
    const text = "《饭点大作战》今日同题挑战，我最高拿了 " + best + " 分。" + (url ? "点链接跟我 PK！" : "你能超过我吗？");
    const ok = await copyText(url ? text + " " + url : text);
    showToast(
      ok ? (url ? "战书已复制，发给朋友吧" : "已复制战绩（在线版才有挑战链接）") : "复制失败，请直接截图",
      ok ? "good" : "warn"
    );
    els.pkStartBtn.textContent = ok ? "✓ 战书已复制，去粘贴给朋友" : "✗ 复制失败，再试一次";
    window.clearTimeout(state.pkBtnTimeout);
    state.pkBtnTimeout = window.setTimeout(() => {
      els.pkStartBtn.textContent = PK_BTN_LABEL;
    }, 1800);
    beep(ok ? 760 : 180, 0.08, "triangle", 0.04);
  }

  function init() {
    els.sourceNote.textContent = cfg.source;
    const now = new Date();
    els.todayLabel.textContent = (now.getMonth() + 1) + " 月 " + now.getDate() + " 日 · 今日挑战";
    els.startBest.textContent = String(loadBest());
    applyMuted(readMuted());
    loadPk();
    updatePkBanner();
    renderMenu();

    els.startBtn.addEventListener("click", startGame);
    els.serveBtn.addEventListener("click", serve);
    els.clearBtn.addEventListener("click", clearSelection);
    els.againBtn.addEventListener("click", startGame);
    els.shareBtn.addEventListener("click", shareScore);
    els.pkStartBtn.addEventListener("click", shareBest);
    els.pkCloseBtn.addEventListener("click", dismissPk);
    els.muteBtn.addEventListener("click", () => {
      applyMuted(!state.muted);
      writeMuted(state.muted);
      if (!state.muted) beep(620, 0.06, "triangle", 0.04);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && state.phase === "playing") {
        event.preventDefault();
        serve();
      }
      if (event.key.toLowerCase() === "m") {
        applyMuted(!state.muted);
        writeMuted(state.muted);
      }
    });

    window.addEventListener("beforeunload", clearTimers);

    if (new URLSearchParams(location.search).has("play")) startGame();
  }

  init();
})();
