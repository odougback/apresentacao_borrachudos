(function () {
  'use strict';

  /* ============ SERVICE WORKER (PWA) ============ */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('sw.js')
        .catch((err) => console.warn('SW registration failed:', err));
    });
  }

  /* ============ LOADER ============ */
  const loader = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');
  const loaderText = document.getElementById('loaderText');
  const pageImages = document.querySelectorAll('.page img');
  const totalImages = pageImages.length;
  let loadedImages = 0;
  let loaderHidden = false;

  function updateLoader() {
    const pct = (loadedImages / totalImages) * 100;
    loaderFill.style.width = pct + '%';
    loaderText.textContent = 'Carregando ' + loadedImages + '/' + totalImages;

    if (loadedImages >= totalImages && !loaderHidden) {
      hideLoader();
    }
  }

  function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 250);
  }

  pageImages.forEach((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      loadedImages++;
    } else {
      img.addEventListener('load', () => {
        loadedImages++;
        updateLoader();
      });
      img.addEventListener('error', () => {
        loadedImages++;
        updateLoader();
      });
    }
  });
  updateLoader();

  // Fallback: hide loader after 10s even if some images fail silently
  setTimeout(hideLoader, 10000);

  /* ============ PAGE TEXTS ============ */
  const pageTexts = [
    {
      title: 'Controle Biológico de Mosquitos Borrachudos',
      body: `
        <p>Material técnico sobre soluções biológicas para o controle de mosquitos borrachudos (simulídeos).</p>
        <ul>
          <li>Soluções biológicas para um ambiente mais saudável</li>
          <li>Eficácia comprovada, tecnologia segura e sustentável</li>
          <li>Proteção que respeita a natureza e as pessoas</li>
        </ul>
      `
    },
    {
      title: 'Ciclo de Vida dos Borrachudos',
      body: `
        <h3>Adultos</h3>
        <ul>
          <li>Medem de <strong>2 a 4 mm</strong></li>
          <li>Machos vivem cerca de <strong>1 semana</strong>; fêmeas de <strong>2 a 4 semanas</strong></li>
          <li>Podem chegar a <strong>85 dias</strong> em condições favoráveis</li>
        </ul>
        <h3>Ovos</h3>
        <ul>
          <li>Fêmea realiza, em média, <strong>2 a 4 posturas</strong> durante a vida adulta</li>
          <li>Cerca de <strong>500 ovos por postura</strong> (variando de 200 a 800)</li>
          <li>Podem permanecer viáveis por longos períodos de seca</li>
        </ul>
        <h3>Larvas</h3>
        <ul>
          <li>Corpo alongado de <strong>3 a 12 mm</strong></li>
          <li>Possuem leques cefálicos que capturam partículas em suspensão</li>
          <li>Fase larval de <strong>7 a 20 dias</strong> (mais longa no inverno)</li>
        </ul>
        <h3>Pupas</h3>
        <ul>
          <li>Ficam fixadas em <strong>casulos de seda</strong></li>
          <li>Presas a substratos com águas correntes</li>
          <li>Não se alimentam — duração de <strong>2 a 6 dias</strong></li>
        </ul>
        <p>O número de gerações por ano varia de acordo com as condições climáticas. O estágio de larva é a fase-alvo do controle biológico com <em>Bacillus thuringiensis israelensis</em> (Bti). Temperatura, umidade, velocidade da água e disponibilidade de substrato influenciam diretamente a duração de cada estágio.</p>
      `
    },
    {
      title: 'Criadouros de Borrachudos',
      body: `
        <h3>Águas correntes</h3>
        <p>As larvas de simulídeos se criam essencialmente em <strong>água corrente</strong>, desde torrenciais cursos montanhosos até rios de movimento lento nas terras baixas, ou mesmo pequenos fios de água.</p>
        <h3>Superfícies sólidas</h3>
        <p>Os ovos, larvas e pupas ficam geralmente aderidos a <strong>superfícies sólidas</strong> (rochas, folhas, galhos de árvore, plantas aquáticas) submersas ou livres em sedimentos do fundo.</p>
        <h3>Plantas aquáticas</h3>
        <p>Os ovos, larvas e pupas ficam geralmente aderidos a <strong>plantas aquáticas, folhas e galhos</strong> submersos ou parcialmente submersos, onde encontram proteção e alimento.</p>
      `
    },
    {
      title: 'Por que controlar borrachudos?',
      body: `
        <ul>
          <li>Borrachudos transmitem doenças como <strong>Encefalites, Oncocercose</strong> e <strong>alergias</strong>.</li>
          <li>Causam <strong>incômodo e danos econômicos</strong> na agricultura, turismo, pecuária e recreação.</li>
          <li>O controle é essencial para <strong>proteger a saúde</strong> das pessoas, dos animais e garantir o <strong>bem-estar</strong> da população.</li>
        </ul>
      `
    },
    {
      title: 'Métodos de Controle de Borrachudos',
      body: `
        <ul>
          <li><strong>Controle Mecânico</strong> — remoção física e manejo do ambiente</li>
          <li><strong>Controle com Produtos Químicos</strong> — risco ambiental e à fauna não-alvo</li>
          <li><strong>Controle com Inseticidas Biológicos</strong> — solução baseada em Bti, alta eficácia e segurança</li>
        </ul>
      `
    },
    {
      title: 'VectoBac® 12AS',
      body: `
        <p>Inseticida biológico à base de <em>Bacillus thuringiensis israelensis</em> (Bti).</p>
        <h3>Especificações</h3>
        <ul>
          <li><strong>Concentração:</strong> 1,2% (1200 BTI UTI/mg)</li>
          <li><strong>Cepa:</strong> AM65-52</li>
          <li><strong>5 toxinas</strong> (Cry e Cyt)</li>
          <li>Formulação em <strong>solução aquosa</strong></li>
          <li>Aditivo gera espuma na água, ajudando a visualizar o alcance</li>
          <li>Utilizado a mais de <strong>30 anos</strong> no programa de controle de borrachudos no Brasil</li>
          <li><strong>Embalagem:</strong> 10 L</li>
        </ul>
        <h3>Por que usar VectoBac® 12AS?</h3>
        <ul>
          <li><strong>Ambientalmente mais seguro</strong> — baixo impacto, não tóxico para peixes, plantas e animais não-alvo</li>
          <li><strong>Custo/benefício</strong> — alta eficácia com excelente custo operacional</li>
          <li><strong>Manejo da resistência</strong> — modo de ação único auxilia o controle</li>
          <li><strong>Segurança</strong> — para aplicadores e a população</li>
          <li><strong>Controle eficiente</strong> — eficaz em baixas concentrações e diferentes condições ambientais</li>
        </ul>
      `
    },
    {
      title: 'Modo de Ação do Bti',
      body: `
        <p>O <em>Bacillus thuringiensis israelensis</em> (Bti) produz proteínas cristalinas que, ao serem ingeridas pelas larvas, atuam no <strong>intestino médio</strong>, causando paralisação e morte.</p>
        <h3>Características da ação</h3>
        <ul>
          <li>Ação altamente específica contra larvas de mosquitos e borrachudos</li>
          <li>Seguro para peixes, plantas, animais e seres humanos</li>
          <li>Eficaz em baixas concentrações e em diferentes condições ambientais</li>
          <li>Ferramenta essencial no manejo integrado de populações</li>
        </ul>
        <h3>Mecanismo</h3>
        <p>Os cristais interagem com a parede intestinal das larvas, rompendo-as rapidamente, cessando sua atividade. A <strong>morte das larvas ocorre em até 24 horas</strong> após a aplicação do produto.</p>
      `
    },
    {
      title: 'Como a Dose de Bti é Calculada',
      body: `
        <p>A dose de VectoBac® 12AS para cada aplicação é calculada com base na <strong>vazão do canal</strong> e na <strong>concentração desejada</strong>.</p>
        <h3>1. Meça as medidas do canal</h3>
        <ul>
          <li><strong>Largura média:</strong> meça em vários pontos ao longo de uma distância conhecida</li>
          <li><strong>Profundidade média:</strong> idem, em vários pontos</li>
        </ul>
        <h3>2. Meça a velocidade média da água</h3>
        <p>Meça o tempo que uma boia leva para percorrer uma distância conhecida (use um flutuador) e calcule a média.</p>
        <p><strong>Velocidade (m/s)</strong> = distância (10 m) / tempo medido (s)</p>
        <h3>3. Calcule a dose (PPM)</h3>
        <p>DOSE = PPM × VAZÃO × TEMPO MÉDIO × LARGURA MÉDIA × PROFUNDIDADE</p>
        <p>Concentrações típicas: <strong>10 ppm, 15 ppm, 25 ppm</strong>.</p>
        <h3>Definições importantes</h3>
        <ul>
          <li><strong>PPM:</strong> partes por milhão — gramas de produto por milhão de gramas de água</li>
          <li><strong>Tempo médio:</strong> tempo de aplicação em minutos</li>
        </ul>
        <p><strong>Importante:</strong> utilizar equipamentos calibrados e seguir as recomendações do rótulo do produto.</p>
      `
    },
    {
      title: 'Calibrando o Regador',
      body: `
        <p>A quantidade de água no regador deve ser suficiente para aplicar o produto pelo período mínimo de <strong>1 minuto</strong>, com o chuveirinho.</p>
        <h3>Objetivo</h3>
        <p>Garantir que o tempo de aplicação seja de, no mínimo, <strong>1 minuto</strong>.</p>
        <h3>Passo a passo</h3>
        <ul>
          <li><strong>1.</strong> Encha o regador até a capacidade que será utilizada na aplicação</li>
          <li><strong>2.</strong> Cronometre o tempo necessário para esvaziar o regador com o chuveirinho até o final</li>
          <li><strong>3.</strong> A quantidade de água deve permitir uma aplicação de no mínimo 1 minuto</li>
        </ul>
        <p>Misturar a <strong>dose calculada</strong> baseada na vazão nesta quantidade de água.</p>
      `
    },
    {
      title: 'Aplicação do Bti em Campo',
      body: `
        <ul>
          <li><strong>1. Aplicação contínua:</strong> aplicar o produto de forma contínua por <strong>no mínimo 1 minuto</strong> para garantir boa dispersão</li>
          <li><strong>2. Distribuição uniforme:</strong> distribuir o produto de maneira uniforme na lâmina d'água</li>
          <li><strong>3. Pontos de turbulência:</strong> priorizar pontos com maior turbulência para melhor mistura</li>
        </ul>
        <p>A eficiência da aplicação depende diretamente da <strong>vazão</strong>, do <strong>tempo de aplicação</strong> e da <strong>distribuição</strong> do produto.</p>
      `
    },
    {
      title: 'Fatores Variáveis para a Aplicação',
      body: `
        <ul>
          <li>Presença de <strong>cachoeiras, remansos ou represas</strong></li>
          <li>Presença de <strong>obstáculos</strong> que impeçam o escoamento da água (lixo plástico, pneus, materiais que não pertencem ao rio)</li>
          <li>Quantidade de <strong>material orgânico</strong> em suspensão</li>
          <li>Para a determinação da distância entre os pontos de aplicação, o melhor método é o <strong>visual</strong> — neste caso o VectoBac 12AS oferece mais uma vantagem (espuma sinalizadora)</li>
        </ul>
        <p>A avaliação destes fatores é essencial para garantir a <strong>eficácia da aplicação</strong> e melhorar os resultados do controle com Bti.</p>
      `
    },
    {
      title: 'Carreamento do Bti no Curso d\'Água',
      body: `
        <ul>
          <li>O produto acompanha o <strong>fluxo da água</strong> ao longo do canal</li>
          <li>A dispersão depende da <strong>vazão e da turbulência</strong></li>
          <li>Espumas ajudam a <strong>visualizar o alcance</strong> da aplicação</li>
        </ul>
        <p>O carreamento eficiente garante que o produto alcance toda a <strong>área-alvo</strong>.</p>
      `
    },
    {
      title: 'Análise Comparativa — 2 Produtos (H-14)',
      body: `
        <p><em>Prof. Dr. Carlos Fernando S. Andrade</em></p>
        <h3>Objetivo</h3>
        <p>Avaliar a eficiência no carreamento para a aplicação de dois produtos comerciais à base de <em>Bacillus thuringiensis israelensis</em> no controle de larvas de <em>Simulium</em> spp.</p>
        <h3>Condições do ensaio</h3>
        <ul>
          <li>Riacho Bracinho (Schroeder, SC)</li>
          <li>Vazão: <strong>2,6 m³/min</strong></li>
          <li>Dose: <strong>15 ppm/1 min</strong></li>
        </ul>
        <h3>Produtos avaliados</h3>
        <ul>
          <li>BT HORUS</li>
          <li><strong>VECTOBAC® 12AS</strong></li>
        </ul>
        <p><strong>Resultado:</strong> VECTOBAC® 12AS apresentou maior eficiência de carreamento ao longo do curso d'água, mantendo altas porcentagens de mortalidade em maiores distâncias.</p>
      `
    },
    {
      title: 'Análise Comparativa — 4 Produtos (H-14)',
      body: `
        <p><em>Prof. Dr. Carlos Fernando S. Andrade</em></p>
        <h3>Objetivo</h3>
        <p>Avaliar a eficiência no carreamento para a aplicação de quatro produtos comerciais à base de <em>Bacillus thuringiensis israelensis</em> no controle de larvas de <em>Simulium</em> spp.</p>
        <h3>Condições do ensaio</h3>
        <ul>
          <li>Riacho Engenho D'Ouro, Paraty/RJ</li>
          <li>Período: dezembro de 2016 a maio de 2017</li>
          <li>Aplicação: <strong>15 ppm/1 min</strong></li>
        </ul>
        <h3>Produtos avaliados</h3>
        <ul>
          <li><strong>VECTOBAC® 12AS</strong></li>
          <li>AEDES CONTROL</li>
          <li>THURMAX</li>
          <li>BTHORUS</li>
        </ul>
        <p><strong>Resultado:</strong> VECTOBAC® 12AS apresentou maior eficiência de carreamento, mantendo altas porcentagens de mortalidade em maiores distâncias ao longo do curso d'água.</p>
      `
    },
    {
      title: 'Considerações Finais',
      body: `
        <ul>
          <li>Os produtos à base de Bti demonstraram <strong>alta eficiência</strong> no controle de larvas de simulídeos, com destaque para o <strong>VECTOBAC® 12AS</strong>.</li>
          <li>A eficácia está diretamente relacionada ao <strong>carreamento</strong>, tempo de aplicação, vazão e distribuição adequada do produto.</li>
          <li>A tecnologia Bti é <strong>segura</strong> para o meio ambiente, organismos não-alvo e seres humanos.</li>
          <li>O VECTOBAC® 12AS oferece <strong>benefícios ambientais, econômicos e operacionais</strong>, com modo de ação único que contribui para a sustentabilidade do controle.</li>
          <li>A <strong>aplicação correta</strong>, seguindo as recomendações técnicas, é fundamental para garantir o máximo desempenho.</li>
          <li>O controle eficiente é essencial para proteger a <strong>saúde pública</strong>, o bem-estar animal e promover o desenvolvimento sustentável.</li>
        </ul>
        <p>A ciência, a tecnologia e o compromisso com o meio ambiente caminham juntos para um <strong>controle biológico eficiente, seguro e sustentável</strong>.</p>
      `
    },
    {
      title: 'Obrigado!',
      body: `
        <p>Seguimos juntos na missão de <strong>proteger ambientes</strong>, preservar vidas e construir um mundo melhor.</p>
      `
    }
  ];

  /* ============ ELEMENTS ============ */
  const pages = Array.from(document.querySelectorAll('.page'));
  const total = pages.length;

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const helperBtn = document.getElementById('helperBtn');
  const audioBtn = document.getElementById('audioBtn');
  const currentEl = document.getElementById('currentPage');
  const totalEl = document.getElementById('totalPages');
  const progressFill = document.getElementById('progressFill');
  const dotsWrap = document.getElementById('dots');

  const modal = document.getElementById('modal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalEyebrow = document.getElementById('modalEyebrow');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  let current = 0;

  totalEl.textContent = total;

  /* ============ DOTS ============ */
  pages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Ir para página ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  /* ============ NAVIGATION ============ */
  function goTo(index) {
    if (index < 0 || index >= total || index === current) return;
    stopReading();
    pages[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    pages[current].classList.add('active');
    dots[current].classList.add('active');
    update();
  }

  function next() {
    if (current < total - 1) goTo(current + 1);
  }

  function prev() {
    if (current > 0) goTo(current - 1);
  }

  function update() {
    currentEl.textContent = current + 1;
    progressFill.style.width = ((current + 1) / total * 100) + '%';
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  /* ============ KEYBOARD ============ */
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      return;
    }
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'Home':
        goTo(0);
        break;
      case 'End':
        goTo(total - 1);
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
      case 'h':
      case 'H':
      case '?':
        openModal();
        break;
    }
  });

  /* ============ FULLSCREEN ============ */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
  fullscreenBtn.addEventListener('click', toggleFullscreen);

  /* ============ TEXT TO SPEECH ============ */
  const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let activeUtterance = null;

  function htmlToReadableText(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent.replace(/\s+/g, ' ').trim();
  }

  function getCurrentReadableText() {
    const data = pageTexts[current];
    if (!data) return '';
    return data.title + '. ' + htmlToReadableText(data.body);
  }

  function setReadingState(isReading) {
    audioBtn.setAttribute('aria-pressed', String(isReading));
    audioBtn.setAttribute('aria-label', isReading ? 'Parar leitura' : 'Ler página em voz alta');
  }

  function stopReading() {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    activeUtterance = null;
    setReadingState(false);
  }

  function startReading() {
    if (!canSpeak) return;

    const text = getCurrentReadableText();
    if (!text) return;

    window.speechSynthesis.cancel();
    activeUtterance = new SpeechSynthesisUtterance(text);
    activeUtterance.lang = 'pt-BR';
    activeUtterance.rate = 0.92;
    activeUtterance.pitch = 1;
    activeUtterance.onend = () => {
      activeUtterance = null;
      setReadingState(false);
    };
    activeUtterance.onerror = () => {
      activeUtterance = null;
      setReadingState(false);
    };

    setReadingState(true);
    window.speechSynthesis.speak(activeUtterance);
  }

  function toggleReading() {
    if (!canSpeak) return;

    if (window.speechSynthesis.speaking || activeUtterance) {
      stopReading();
    } else {
      startReading();
    }
  }

  if (canSpeak) {
    audioBtn.addEventListener('click', toggleReading);
    window.addEventListener('beforeunload', stopReading);
  } else {
    audioBtn.disabled = true;
    audioBtn.setAttribute('aria-label', 'Leitura em voz alta indisponível');
  }

  /* ============ CLICK ZONES ============ */
  document.querySelector('.pages').addEventListener('click', (e) => {
    if (e.target.closest('.nav-btn, .fullscreen-btn, .helper-btn, .audio-btn, .dot, .counter, .modal')) return;
    const x = e.clientX;
    const w = window.innerWidth;
    if (x < w / 2) prev();
    else next();
  });

  /* ============ TOUCH / SWIPE ============ */
  let touchStartX = null;
  document.addEventListener('touchstart', (e) => {
    if (modal.classList.contains('open')) return;
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX = null;
  }, { passive: true });

  /* ============ MODAL ============ */
  function openModal() {
    const data = pageTexts[current];
    if (!data) return;
    modalEyebrow.textContent = 'Página ' + (current + 1) + ' de ' + total;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-panel').scrollTop = 0;
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  helperBtn.addEventListener('click', openModal);
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  /* ============ ROTATE HINT ============ */
  const rotateHint = document.getElementById('rotateHint');
  const rotateHintClose = document.getElementById('rotateHintClose');
  const HINT_KEY = 'rotateHintDismissed';

  function maybeShowRotateHint() {
    if (!rotateHint) return;
    if (sessionStorage.getItem(HINT_KEY) === '1') return;

    const isPortraitMobile =
      window.matchMedia('(max-width: 900px) and (orientation: portrait)').matches;

    if (isPortraitMobile) {
      requestAnimationFrame(() => rotateHint.classList.add('show'));
      // Auto-dismiss after 6s
      setTimeout(dismissRotateHint, 6000);
    } else {
      rotateHint.classList.remove('show');
    }
  }

  function dismissRotateHint() {
    if (!rotateHint) return;
    rotateHint.classList.remove('show');
    sessionStorage.setItem(HINT_KEY, '1');
  }

  if (rotateHintClose) rotateHintClose.addEventListener('click', dismissRotateHint);
  window.addEventListener('orientationchange', () =>
    setTimeout(maybeShowRotateHint, 200)
  );
  window.addEventListener('resize', maybeShowRotateHint);

  /* ============ TOUR ============ */
  const tourSteps = [
    {
      target: null,
      title: 'Bem-vindo!',
      text: 'Vamos te mostrar como navegar pelo material. Leva menos de 30 segundos.'
    },
    {
      target: '.home-btn',
      title: 'Voltar ao site',
      text: 'Retorna para a página principal da Aracaju Comércio e Serviços.',
      placement: 'right'
    },
    {
      target: '.fullscreen-btn',
      title: 'Tela cheia',
      text: 'Maximize o material para uma experiência imersiva. Atalho: F.',
      placement: 'right'
    },
    {
      target: '.helper-btn',
      title: 'Informações',
      text: 'Abre um painel com todo o conteúdo escrito da página atual. Atalho: H.',
      placement: 'right'
    },
    {
      target: '.audio-btn',
      title: 'Leitura em voz alta',
      text: 'Lê o conteúdo da página atual usando a voz do navegador. Clique novamente para parar.',
      placement: 'right'
    },
    {
      target: '.tour-btn',
      title: 'Rever este tutorial',
      text: 'Pode chamar este tutorial novamente a qualquer momento clicando aqui.',
      placement: 'right'
    },
    {
      target: '.dots',
      title: 'Acesso rápido',
      text: 'Clique em qualquer ponto do rodapé para pular direto para uma página específica.',
      placement: 'top'
    },
    {
      target: '.nav-next',
      title: 'Navegar entre páginas',
      text: 'Use as setas laterais para avançar e voltar. No teclado: ← e →. No celular, deslize com o dedo ou toque na metade da tela.',
      placement: 'left'
    },
    {
      target: '.counter',
      title: 'Onde você está',
      text: 'O contador mostra a página atual e o total do material.',
      placement: 'bottom-left'
    }
  ];

  const tour = document.getElementById('tour');
  const tourBtn = document.getElementById('tourBtn');
  const tourSpotlight = document.getElementById('tourSpotlight');
  const tourTooltip = document.getElementById('tourTooltip');
  const tourStepEl = document.getElementById('tourStep');
  const tourTitle = document.getElementById('tourTitle');
  const tourText = document.getElementById('tourText');
  const tourSkip = document.getElementById('tourSkip');
  const tourPrev = document.getElementById('tourPrev');
  const tourNext = document.getElementById('tourNext');
  const materialViewerEl = document.querySelector('.material-viewer');
  const TOUR_KEY = 'tourCompleted';

  let tourIndex = 0;
  let tourActive = false;

  function startTour() {
    tourIndex = 0;
    tourActive = true;
    tour.classList.add('open');
    tour.setAttribute('aria-hidden', 'false');
    materialViewerEl.classList.add('tour-active');
    showTourStep(0);
  }

  function endTour() {
    tourActive = false;
    tour.classList.remove('open');
    tour.setAttribute('aria-hidden', 'true');
    materialViewerEl.classList.remove('tour-active');
    localStorage.setItem(TOUR_KEY, '1');
  }

  function showTourStep(i) {
    if (i < 0 || i >= tourSteps.length) return;
    tourIndex = i;
    const step = tourSteps[i];
    tourStepEl.textContent = i + 1 + ' / ' + tourSteps.length;
    tourTitle.textContent = step.title;
    tourText.textContent = step.text;
    tourPrev.disabled = i === 0;
    tourNext.textContent = i === tourSteps.length - 1 ? 'Concluir' : 'Próximo';

    positionTour(step);
  }

  function positionTour(step) {
    const target = step.target ? document.querySelector(step.target) : null;
    const margin = 12;

    if (!target) {
      // Centered, no spotlight
      tourSpotlight.classList.add('no-target');
      const ttRect = tourTooltip.getBoundingClientRect();
      const tw = ttRect.width || 320;
      const th = ttRect.height || 200;
      tourTooltip.style.top = (window.innerHeight - th) / 2 + 'px';
      tourTooltip.style.left = (window.innerWidth - tw) / 2 + 'px';
      return;
    }

    tourSpotlight.classList.remove('no-target');
    const r = target.getBoundingClientRect();
    const pad = 8;

    // Spotlight rectangle around target
    tourSpotlight.style.top = (r.top - pad) + 'px';
    tourSpotlight.style.left = (r.left - pad) + 'px';
    tourSpotlight.style.width = (r.width + pad * 2) + 'px';
    tourSpotlight.style.height = (r.height + pad * 2) + 'px';

    // Tooltip placement
    const tw = 320;
    const th = 200;
    let top, left;

    switch (step.placement) {
      case 'left':
        top = r.top + r.height / 2 - th / 2;
        left = r.left - tw - margin;
        break;
      case 'right':
        top = r.top + r.height / 2 - th / 2;
        left = r.right + margin;
        break;
      case 'top':
        top = r.top - th - margin;
        left = r.left + r.width / 2 - tw / 2;
        break;
      case 'bottom':
        top = r.bottom + margin;
        left = r.left + r.width / 2 - tw / 2;
        break;
      case 'bottom-left':
        top = r.bottom + margin;
        left = Math.max(margin, r.right - tw);
        break;
      default:
        top = r.bottom + margin;
        left = r.left;
    }

    // Clamp to viewport
    top = Math.max(margin, Math.min(top, window.innerHeight - th - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - tw - margin));

    tourTooltip.style.top = top + 'px';
    tourTooltip.style.left = left + 'px';
  }

  function tourNextStep() {
    if (tourIndex >= tourSteps.length - 1) {
      endTour();
    } else {
      showTourStep(tourIndex + 1);
    }
  }

  function tourPrevStep() {
    if (tourIndex > 0) showTourStep(tourIndex - 1);
  }

  tourBtn.addEventListener('click', startTour);
  tourSkip.addEventListener('click', endTour);
  tourNext.addEventListener('click', tourNextStep);
  tourPrev.addEventListener('click', tourPrevStep);

  document.addEventListener('keydown', (e) => {
    if (!tourActive) return;
    if (e.key === 'Escape') endTour();
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      e.preventDefault();
      tourNextStep();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      tourPrevStep();
    }
  });

  window.addEventListener('resize', () => {
    if (tourActive) positionTour(tourSteps[tourIndex]);
  });

  // Auto-start on first visit (after loader hides)
  function maybeAutoStartTour() {
    if (localStorage.getItem(TOUR_KEY) === '1') return;
    setTimeout(startTour, 800);
  }

  /* ============ INIT ============ */
  update();
  maybeShowRotateHint();

  // Wait for loader to finish before auto-starting tour
  if (loadedImages >= totalImages) {
    maybeAutoStartTour();
  } else {
    const checkInterval = setInterval(() => {
      if (loaderHidden) {
        clearInterval(checkInterval);
        maybeAutoStartTour();
      }
    }, 200);
  }
})();
