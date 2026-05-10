/* -------------------------------------------------------
   1. TEMA CLARO / ESCURO
------------------------------------------------------- */
const themeBtn   = document.getElementById('theme-toggle');
const bodyEl     = document.body;

// Restaura preferência salva no localStorage
if (localStorage.getItem('tema') === 'dark') {
  bodyEl.classList.add('dark');
  themeBtn.textContent = '☀️';
}

// Alterna o tema ao clicar
themeBtn.addEventListener('click', () => {
  const isDark = bodyEl.classList.toggle('dark');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('tema', isDark ? 'dark' : 'light');
});


/* -------------------------------------------------------
   2. MENU HAMBÚRGUER (mobile)
------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});


/* -------------------------------------------------------
   3. DESTAQUE DO LINK ATIVO conforme seção visível
      Usa Intersection Observer para detectar qual
      seção está na viewport e atualiza o nav.
------------------------------------------------------- */
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove "active" de todos os links
      navAnchors.forEach(a => a.classList.remove('active'));
      // Adiciona "active" no link correspondente
      const id = entry.target.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(sec => observer.observe(sec));


/* -------------------------------------------------------
   4. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
------------------------------------------------------- */
const form         = document.getElementById('contact-form');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');

// Regex para validação de e-mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Exibe ou esconde mensagem de erro de um campo.
 * @param {HTMLElement} field  - O input/textarea
 * @param {HTMLElement} errEl  - O elemento de mensagem de erro
 * @param {boolean}     hasErr - true para mostrar erro, false para esconder
 */
function setError(field, errEl, hasErr) {
  if (hasErr) {
    field.classList.add('error');
    errEl.classList.add('visible');
  } else {
    field.classList.remove('error');
    errEl.classList.remove('visible');
  }
}

// Evento de envio do formulário
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Impede o envio real da página

  // Captura valores dos campos
  const nome     = document.getElementById('nome');
  const email    = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');

  // Elementos de erro
  const nomeErr     = document.getElementById('nome-error');
  const emailErr    = document.getElementById('email-error');
  const mensagemErr = document.getElementById('mensagem-error');

  let valido = true;

  // Validação: nome não pode estar vazio
  if (nome.value.trim() === '') {
    setError(nome, nomeErr, true);
    valido = false;
  } else {
    setError(nome, nomeErr, false);
  }

  // Validação: e-mail deve estar preenchido e ter formato válido
  if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
    setError(email, emailErr, true);
    valido = false;
  } else {
    setError(email, emailErr, false);
  }

  // Validação: mensagem não pode estar vazia
  if (mensagem.value.trim() === '') {
    setError(mensagem, mensagemErr, true);
    valido = false;
  } else {
    setError(mensagem, mensagemErr, false);
  }

  // Se tudo válido: simula envio, limpa campos e exibe modal
  if (valido) {
    nome.value     = '';
    email.value    = '';
    mensagem.value = '';
    modalOverlay.classList.add('show');
  }
});

// Fecha o modal ao clicar no botão
modalClose.addEventListener('click', () => {
  modalOverlay.classList.remove('show');
});

// Fecha o modal ao clicar fora da caixa
modalOverlay.addEventListener('click', function(e) {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('show');
  }
});
