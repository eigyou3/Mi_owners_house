// ── Scroll Reveal（先に定義。動的生成要素は個別にobserveする）──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▼ コンセプト背景（画像 or 動画を自動判定）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONCEPT_BG = 'images/assets/concept_bg.mp4'; // ← ここを変更するだけ

function setConceptBg() {
  const sec = document.querySelector('.sec-concept');
  const existing = document.querySelector('.concept-bg');
  if (existing) existing.remove();
  if (!CONCEPT_BG) return;
  let el;
  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(CONCEPT_BG)) {
    el = document.createElement('video');
    el.src = CONCEPT_BG;
    el.autoplay = true; el.muted = true; el.loop = true; el.playsInline = true;
  } else {
    el = document.createElement('img');
    el.src = CONCEPT_BG; el.alt = '';
  }
  el.className = 'concept-bg';
  sec.insertBefore(el, sec.firstChild);
  if (el.tagName === 'VIDEO') el.play().catch(() => {});
}
setConceptBg();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▼ 動画URL（Dropboxのdl=1リンク）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const VIDEO_URL = 'https://www.dropbox.com/scl/fi/da3tinu09ifb1tjeg14or/m-tei.mp4?rlkey=f03soqey1nmj4wzg1phlymcqz&raw=1';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▼ ギャラリー写真（name=ラベル, after=完成写真, before=工事中写真, 画像の高さ）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const galleryItems = [
  { name:'exterior',   after:'images/assets/gaikan_night.png', before:'images/assets/gaikan_before.png'},
  { name:'entrance', after:'images/assets/entrance.mp4'},

  { name:'living',     after:'images/assets/living.png', before:'images/assets/living_before.png' },
  { name:'stairs',    after:'images/assets/stairs.png', before:'images/assets/stairs_before.png' },

  { name:'dining',     after:'images/assets/dining.mp4', before:'' },



  { name:'curtain', after:'images/assets/concept_bg.mp4', before:'images/assets/curtain_before.png'},

  
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▼ 一問一答（topicとdialogueを編集）
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const qaData = [
  {
    topic: '家づくりのきっかけ',
    title: '家を建てたい！と思ったのはなんだったんでしょうか？',
    dialogue: [
      { speaker:'', role:'wife',    text:'ずっと念願だったんです。' },
      { speaker:'', role:'wife',    text:'以前から（こまいホームの投稿を）Instagramで見ていて。別荘心地の広告を見つけたときに、これだ！って思いました。' },
      { speaker:'', role:'husband', text:'いつかはと思ってたけど、いますぐとは思ってなかった。' },
      { speaker:'', role:'wife',    text:'別荘心地を見た瞬間に決まった。' },
      { speaker:'', role:'husband', text:'うん。' },
    ]
  },
  {
    topic: 'こまいホームを選んだ理由',
    title: '他社さんとも悩まれていたとお聞きしてますが弊社で決めていただいたご理由は？',
    dialogue: [
      { speaker:'', role:'wife',    text:'もう一社にも図面を出してもらっていた。' },
      { speaker:'', role:'wife',    text:'けど船屋さんの人柄に惹かれて。ね。' },
      { speaker:'', role:'husband', text:'うん、人柄が良かった。' },
　　]
  },
  {
    topic: '担当者について',
    title: 'ちょうど席を外しているので<br>ずばりなぜ、船屋（担当者）にお任せいただけたのかこっそりお聞かせいただけますか？',
    dialogue: [
      { speaker:'', role:'wife',    text:'社長とは感じさせない腰の低さと丁寧な接客に惹かれました。' },
      { speaker:'', role:'husband', text:'ほんとうに、感じさせないよね。' },
      { speaker:'', role:'wife',    text:'すごい、親身に寄り添ってくれたので安心しておまかせできました。' },
      { speaker:'', role:'husband', text:'うん。それで決まりました。' },
    ]
  },
  
  {
    topic: 'コンセプト・こだわり',
    title: '実際に建った家をご覧になられてどうですか？',
    dialogue: [
      { speaker:'', role:'wife',    text:'えー、全部。（笑）' },
      { speaker:'', role:'husband', text:'ホテルライクな感じも出しつつ、過ぎない感じが良くって。' },
      { speaker:'', role:'wife',    text:'木の温かみを消しすぎずね。' },
      { speaker:'', role:'husband', text:'落ち着いた感じを出せた。' },
      { speaker:'', role:'husband', text:'このカーテンの感じとかも狙い通りです！' },
      { speaker:'', role:'wife',    text:'最初は平屋がいいなと思っていて、規格のプランだと収納が足りなそうだと思って今の形になったけど、１階で完結する感じには出来たし満足です。' },
      { speaker:'', role:'husband', text:'理想通りです。' },
    ]
  },
  {
    topic: '計画中のことについて',
    title: 'コーディネーターとの打ち合わせや、工事中についてどうでしたか？<br>改善してほしい点とかありましたか？',
    dialogue: [
      { speaker:'', role:'wife',    text:'私たち戸松（コーディネーター）さんには大信頼を置いていて。' },
      { speaker:'', role:'husband', text:'うんうん（笑）' },
      { speaker:'', role:'wife',    text:'別荘心地のコンセプトからつくった戸松さんがいるなら間違いない。困ったら言うとおりにすれば間違いないと思ってます。' },
      { speaker:'', role:'husband', text:'（改善点は）ないです！' },
    ]
  },
  {
    topic: 'これから建てる方へ',
    title: 'このページをご覧になられるお家づくりを検討中の方に何か一言伝えていただけないでしょうか？',
    dialogue: [
      { speaker:'', role:'wife',    text:'早く建てたらって思う！' },
      { speaker:'', role:'wife',    text:'友達と家づくりについて話すことがあるんですけど。えっ、そんなところまで決めれたの？って。' },
      { speaker:'', role:'husband', text:'あぁ、巾木とか。' },
      { speaker:'', role:'wife',    text:'そうそう、私たちはすっごく悩んで決めた巾木や窓台など工務店によっては決めないんだと思って。' },
      { speaker:'', role:'wife',    text:'全部決めれるのがこまいホームだよって伝えたいです、答えになっているかわからないけど...' },

    ]
  },
];

// ── 動画セット ──
// (mainVideoは廃止・イントロ動画に統合)

// ── FAB シェアボタン ──
function toggleFab() {
  document.getElementById('fabItems').classList.toggle('open');
}
document.addEventListener('click', e => {
  if (!e.target.closest('.fab-wrap')) {
    document.getElementById('fabItems').classList.remove('open');
  }
});

// ── ギャラリー生成（動画対応・2カラム自動振り分け）──
function isVideo(src) { return src && /\.(mp4|webm|mov)(\?.*)?$/i.test(src); }

const colLeft  = document.getElementById('colLeft');
const colRight = document.getElementById('colRight');

// 全アイテムをまず生成（非表示状態）
const pendingItems = galleryItems.map((item, i) => {
  const el = document.createElement('div');
  el.className = 'masonry-item reveal';
  el.style.transitionDelay = `${(i % 2) * 0.1}s`;
  const hasBefore = !!item.before;
  const mediaHTML = isVideo(item.after)
    ? `<video src="${item.after}" autoplay muted loop playsinline style="width:100%;display:block;pointer-events:none;"></video>`
    : `<img src="${item.after}" alt="${item.name}">`;
  el.innerHTML = `
    ${mediaHTML}
    <div class="masonry-label">
      <span>${item.name}</span>
      ${hasBefore ? '<span class="masonry-before-badge">Before あり</span>' : ''}
    </div>`;
  if (hasBefore) el.addEventListener('click', () => openGModal(item));
  return { el, item };
});

// 順番通りに、その時点で低い方の列へ追加していく
function placeNext(index) {
  if (index >= pendingItems.length) return;
  const { el, item } = pendingItems[index];

  const media = el.querySelector('img, video');
  let placed = false;
  const doPlace = () => {
    if (placed) return;
    placed = true;
    const leftH  = colLeft.getBoundingClientRect().height;
    const rightH = colRight.getBoundingClientRect().height;
    (leftH <= rightH ? colLeft : colRight).appendChild(el);
    // DOM追加後に明示的に再生（未接続要素でのplay()は反映されないブラウザがある）
    if (media.tagName === 'VIDEO') media.play().catch(() => {});
    observer.observe(el);
    placeNext(index + 1);
  };

  // 読み込みに失敗しても止まらないよう2秒でタイムアウト
  const timeout = setTimeout(doPlace, 2000);
  const wrappedPlace = () => { clearTimeout(timeout); doPlace(); };

  if (media.tagName === 'IMG') {
    if (media.complete && media.naturalWidth > 0) wrappedPlace();
    else { media.addEventListener('load', wrappedPlace); media.addEventListener('error', wrappedPlace); }
  } else {
    if (media.readyState >= 1) wrappedPlace();
    else { media.addEventListener('loadedmetadata', wrappedPlace); media.addEventListener('error', wrappedPlace); }
  }
}
placeNext(0);

// ── ギャラリーモーダル ──
function openGModal(item) {
  const inner = document.getElementById('gModalInner');
  const beforeHTML = isVideo(item.before)
    ? `<video class="g-modal-img" src="${item.before}" autoplay muted loop playsinline></video>`
    : `<img class="g-modal-img" src="${item.before}" alt="Before">`;
  const afterHTML = isVideo(item.after)
    ? `<video class="g-modal-img" src="${item.after}" autoplay muted loop playsinline></video>`
    : `<img class="g-modal-img" src="${item.after}" alt="After">`;
  inner.innerHTML = `
    <div style="position:relative;">
      ${beforeHTML}
      <div style="position:absolute;bottom:12px;left:12px;" class="g-modal-badge">Before</div>
    </div>
    <div style="position:relative;">
      ${afterHTML}
      <div style="position:absolute;bottom:12px;right:12px;" class="g-modal-badge">After</div>
    </div>`;
  document.getElementById('fabItems').classList.remove('open');
  document.body.classList.add('modal-open');
  document.getElementById('gModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  inner.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
}
function closeGModal() {
  document.getElementById('gModal').classList.remove('open');
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}
document.getElementById('gModal').addEventListener('click', e => {
  if (e.target === document.getElementById('gModal')) closeGModal();
});

// ── QAカード生成 ──
const cards = document.getElementById('qaCards');
qaData.forEach((qa, i) => {
  const el = document.createElement('div');
  el.className = 'qa-card reveal';
  el.style.transitionDelay = `${i * 0.08}s`;
  el.innerHTML = `
    <div class="qa-num">0${i+1}</div>
    <div class="qa-card-title">${qa.topic}</div>
    <div class="qa-card-hint">${qa.title}</div>
    <span class="qa-arrow">→</span>`;
  el.addEventListener('click', () => openQaModal(i));
  cards.appendChild(el);
  observer.observe(el);
});

// ── QAモーダル（左右タップで前後移動）──
let qaModalIndex = 0;

function renderQaModal(index) {
  qaModalIndex = (index + qaData.length) % qaData.length;
  const qa = qaData[qaModalIndex];
  const inner = document.getElementById('qaModalInner');
  const lines = qa.dialogue.map(d => `
    <div class="dialogue-line ${d.role}">
      <span class="dialogue-speaker">${d.speaker}</span>
      <div class="dialogue-bubble">${d.text}</div>
    </div>`).join('');
  inner.innerHTML = `
    <p class="qa-modal-topic">${qa.topic}</p>
    <h3 class="qa-modal-title">${qa.title}</h3>
    <div class="dialogue">${lines}</div>
    <div class="qa-modal-count">${qaModalIndex + 1} / ${qaData.length}</div>`;
}

function openQaModal(index) {
  renderQaModal(index);
  document.getElementById('fabItems').classList.remove('open');
  document.body.classList.add('modal-open');
  document.getElementById('qaModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeQaModal() {
  document.getElementById('qaModal').classList.remove('open');
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
}
document.getElementById('qaModal').addEventListener('click', e => {
  const modal = document.getElementById('qaModal');
  if (e.target === modal) { closeQaModal(); return; }
  // ナビ矢印・閉じるボタンはそちらのハンドラに任せる
  if (e.target.closest('.qa-nav-arrow') || e.target.closest('.qa-modal-close')) return;
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeGModal(); closeQaModal(); }
  if (document.getElementById('qaModal').classList.contains('open')) {
    if (e.key === 'ArrowRight') renderQaModal(qaModalIndex + 1);
    if (e.key === 'ArrowLeft')  renderQaModal(qaModalIndex - 1);
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ▼ イントロ動画 → 終了後にコンセプトへ
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// (ページは常に自然な状態。動画はfixedで上に重ねるだけ)

const introVideo   = document.getElementById('introVideo');
const introVideoEl = document.getElementById('introVideoEl');
const introSkip    = document.getElementById('introSkip');
const introTapHint = document.getElementById('introTapHint');

if (VIDEO_URL) {
  introVideoEl.src = VIDEO_URL;
  introVideoEl.load();
}

// 動画再生中はページの裏スクロールをロック
window.scrollTo(0, 0);
document.body.classList.add('intro-locked');

function finishIntro() {
  window.scrollTo(0, 0); // 動画終了時点で確実にトップへ
  introVideo.classList.add('fading');
  setTimeout(() => {
    introVideo.classList.add('hidden');
    introVideoEl.pause();
    document.body.classList.remove('intro-locked');
    window.scrollTo(0, 0); // ロック解除後にも念のためトップへ
  }, 1100);
}

// 音付き自動再生を試みる。ブラウザにブロックされたらタップで再生。
function tryAutoplayWithSound() {
  introVideoEl.muted = false;
  const p = introVideoEl.play();
  if (p !== undefined) {
    p.then(() => {
      introTapHint.classList.add('hidden');
    }).catch(() => {
      // 自動再生ブロック → タップ待ち表示
      introTapHint.classList.remove('hidden');
    });
  }
}
tryAutoplayWithSound();

introTapHint.addEventListener('click', () => {
  introVideoEl.muted = false;
  introVideoEl.play();
  introTapHint.classList.add('hidden');
});

introVideoEl.addEventListener('ended', finishIntro);
introSkip.addEventListener('click', finishIntro);

// 動画URLが無い場合は3秒でスキップ（プレビュー用）
if (!VIDEO_URL) {
  introTapHint.classList.add('hidden');
  setTimeout(finishIntro, 2500);
}

// 静的にHTMLに書かれているreveal要素を観察
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Share ──
function shareX(){ const u=encodeURIComponent(location.href),t=encodeURIComponent('komai home'); window.open(`https://twitter.com/intent/tweet?text=${t}&url=${u}`,'_blank'); }
function shareLine(){ window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(location.href)}`,'_blank'); }
function copyLink(){
  navigator.clipboard.writeText(location.href).then(()=>{
    ['copyBtn', 'footerCopyBtn'].forEach(id => {
      const b = document.getElementById(id);
      if (!b) return;
      const original = b.innerHTML;
      b.textContent = 'copied!';
      setTimeout(()=>{ b.innerHTML = original; }, 2000);
    });
  });
}

// ── 動画をもう一度見る ──
function replayIntro() {
  introVideo.classList.remove('hidden', 'fading');
  document.body.classList.add('intro-locked');
  window.scrollTo(0, 0);
  introVideoEl.currentTime = 0;
  introVideoEl.muted = false;
  introVideoEl.play().catch(() => { introTapHint.classList.remove('hidden'); });
}