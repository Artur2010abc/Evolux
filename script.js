// Evolux Academia - JavaScript Principal
// Versão melhorada com funcionalidades avançadas

class EvoluxSite {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupBackToTop();
    this.setupAnimations();
    this.loadAulasExtras();
    this.setupFormValidation();
  }

  setupEventListeners() {
    // Event listeners para quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', () => {
      this.setupLazyLoading();
      this.setupSmoothScroll();
    });

    // Event listeners para scroll
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16)); // 60fps

    // Event listeners para resize
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  setupScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileLinks = document.querySelectorAll('.nav-mobile a');

    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });

      // Fechar menu ao clicar em um link
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });

      // Fechar menu ao clicar fora
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
          hamburger.classList.remove('active');
          mobileNav.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
  }

  setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('show');
        } else {
          backToTopBtn.classList.remove('show');
        }
      });

      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  setupAnimations() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animação em cascata para cards
          if (entry.target.classList.contains('cards')) {
            const cards = entry.target.querySelectorAll('.card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in');
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.section, .card, .hero-content');
    animateElements.forEach(el => observer.observe(el));
  }

  setupSmoothScroll() {
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupLazyLoading() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  async loadAulasExtras() {
    const container = document.getElementById('aulasExtrasContainer');
    if (!container) return;

    try {
      // Simular carregamento (já que não temos API real)
      await this.delay(1000);
      
      // Mostrar mensagem "Em andamento" com estilo melhorado
      container.innerHTML = `
        <div class="aulas-status">
          <div class="status-icon">🚧</div>
          <h3>Aulas Extras</h3>
          <p>Em andamento - Novidades em breve!</p>
        </div>
      `;
      
    } catch (error) {
      console.error('Erro ao carregar aulas extras:', error);
      container.innerHTML = `
        <div class="aulas-status error">
          <div class="status-icon">⚠️</div>
          <h3>Ops!</h3>
          <p>Erro ao carregar aulas extras. Tente novamente mais tarde.</p>
        </div>
      `;
    }
  }

  setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });

      // Validação em tempo real
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let message = '';

    // Remover mensagens de erro anteriores
    this.removeFieldError(field);

    // Validação de campo obrigatório
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      message = 'Este campo é obrigatório';
    }
    // Validação de email
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        message = 'Digite um email válido';
      }
    }
    // Validação de telefone
    else if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(value) || value.length < 10) {
        isValid = false;
        message = 'Digite um telefone válido';
      }
    }

    if (!isValid) {
      this.showFieldError(field, message);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  }

  removeFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  handleScroll() {
    // Parallax effect para hero
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }

    // Mostrar/esconder elementos baseado no scroll
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Atualizar barra de progresso se existir
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  }

  handleResize() {
    // Ajustar layout em mudanças de tamanho
    this.updateViewportHeight();
  }

  updateViewportHeight() {
    // Fix para altura do viewport em mobile
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  // Utility functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Métodos públicos para interação externa
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Auto-remover após 5 segundos
    setTimeout(() => {
      notification.remove();
    }, 5000);

    // Remover ao clicar no X
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = section.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Inicializar o site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  window.evoluxSite = new EvoluxSite();
});

// Expor algumas funções globalmente para uso em HTML
window.scrollToSection = (sectionId) => {
  if (window.evoluxSite) {
    window.evoluxSite.scrollToSection(sectionId);
  }
};

window.showNotification = (message, type) => {
  if (window.evoluxSite) {
    window.evoluxSite.showNotification(message, type);
  }
};



// Funcionalidades avançadas adicionais

// Formulário de contato funcional
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    // Validar dados
    if (!this.validateData(data)) {
      return;
    }

    // Mostrar loading
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      // Simular envio (em produção, conectar com backend real)
      await this.simulateSubmit(data);
      
      // Sucesso
      window.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      this.form.reset();
      
    } catch (error) {
      // Erro
      window.showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.', 'error');
      console.error('Erro no envio:', error);
      
    } finally {
      // Restaurar botão
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  validateData(data) {
    const { nome, email, mensagem } = data;
    
    if (!nome || nome.trim().length < 2) {
      window.showNotification('Por favor, digite seu nome completo.', 'error');
      return false;
    }
    
    if (!email || !this.isValidEmail(email)) {
      window.showNotification('Por favor, digite um email válido.', 'error');
      return false;
    }
    
    if (!mensagem || mensagem.trim().length < 10) {
      window.showNotification('Por favor, digite uma mensagem com pelo menos 10 caracteres.', 'error');
      return false;
    }
    
    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async simulateSubmit(data) {
    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Em produção, fazer requisição real para o backend
    console.log('Dados do formulário:', data);
    
    // Simular sucesso (95% de chance)
    if (Math.random() > 0.05) {
      return { success: true };
    } else {
      throw new Error('Erro simulado');
    }
  }
}

// Sistema de notificações melhorado
class NotificationSystem {
  constructor() {
    this.container = this.createContainer();
    this.notifications = [];
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'notifications-container';
    container.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    `;
    document.body.appendChild(container);
    return container;
  }

  show(message, type = 'info', duration = 5000) {
    const notification = this.createNotification(message, type);
    this.container.appendChild(notification);
    this.notifications.push(notification);

    // Animar entrada
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    });

    // Auto-remover
    setTimeout(() => {
      this.remove(notification);
    }, duration);

    return notification;
  }

  createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      background: var(--dark-bg-card);
      border: 1px solid ${this.getBorderColor(type)};
      border-radius: var(--border-radius-md);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s ease;
      color: var(--text-secondary);
    `;

    const icon = this.getIcon(type);
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'notification-close';
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      margin-left: auto;
    `;

    closeBtn.addEventListener('click', () => this.remove(notification));

    notification.innerHTML = `
      <span style="font-size: 1.25rem;">${icon}</span>
      <span>${message}</span>
    `;
    notification.appendChild(closeBtn);

    return notification;
  }

  getBorderColor(type) {
    switch (type) {
      case 'success': return 'var(--primary-green)';
      case 'error': return '#ff6666';
      case 'warning': return '#ffaa00';
      default: return 'rgba(102, 255, 102, 0.3)';
    }
  }

  getIcon(type) {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }

  remove(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }, 300);
  }
}

// Sistema de loading para seções
class LoadingSystem {
  static show(element, message = 'Carregando...') {
    const loader = document.createElement('div');
    loader.className = 'section-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <p>${message}</p>
      </div>
    `;
    
    loader.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(10, 10, 10, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      border-radius: inherit;
    `;

    element.style.position = 'relative';
    element.appendChild(loader);
    
    return loader;
  }

  static hide(loader) {
    if (loader && loader.parentNode) {
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 300);
    }
  }
}

// Contador animado para estatísticas
class AnimatedCounter {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseInt(target);
    this.duration = duration;
    this.current = 0;
    this.increment = this.target / (duration / 16);
    this.hasAnimated = false;
  }

  start() {
    if (this.hasAnimated) return;
    this.hasAnimated = true;
    this.animate();
  }

  animate() {
    this.current += this.increment;
    
    if (this.current >= this.target) {
      this.current = this.target;
      this.element.textContent = this.formatNumber(this.current);
      return;
    }
    
    this.element.textContent = this.formatNumber(Math.floor(this.current));
    requestAnimationFrame(() => this.animate());
  }

  formatNumber(num) {
    if (this.target >= 1000) {
      return num.toLocaleString('pt-BR');
    }
    return num.toString();
  }
}

// Parallax suave para elementos
class ParallaxController {
  constructor() {
    this.elements = [];
    this.init();
  }

  init() {
    // Encontrar elementos com data-parallax
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      this.elements.push({ element: el, speed });
    });

    if (this.elements.length > 0) {
      this.bindEvents();
    }
  }

  bindEvents() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateParallax() {
    const scrollTop = window.pageYOffset;
    
    this.elements.forEach(({ element, speed }) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Verificar se o elemento está visível
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = -(scrollTop - elementTop) * speed;
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
  }
}

// Sistema de lazy loading melhorado
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      this.images.forEach(img => {
        this.observer.observe(img);
        img.classList.add('lazy-loading');
      });
    } else {
      // Fallback para navegadores antigos
      this.loadAllImages();
    }
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadImage(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    img.onload = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
    };

    img.onerror = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
    };

    img.src = src;
    img.removeAttribute('data-src');
  }

  loadAllImages() {
    this.images.forEach(img => this.loadImage(img));
  }
}

// Inicialização das funcionalidades avançadas
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar sistemas
  window.notificationSystem = new NotificationSystem();
  window.contactForm = new ContactForm();
  window.parallaxController = new ParallaxController();
  window.lazyLoader = new LazyLoader();

  // Sobrescrever função global de notificação
  window.showNotification = (message, type) => {
    window.notificationSystem.show(message, type);
  };

  // Inicializar contadores animados
  const statNumbers = document.querySelectorAll('.stat-number');
  const counters = [];
  
  statNumbers.forEach(el => {
    const target = el.textContent.replace(/\D/g, '');
    if (target) {
      const counter = new AnimatedCounter(el, target);
      counters.push(counter);
    }
  });

  // Observar estatísticas para animar quando visíveis
  if (counters.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => counter.start());
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
  }

  // Adicionar barra de progresso de scroll
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  // Melhorar experiência de navegação
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Fechar menu mobile se estiver aberto
        const mobileNav = document.querySelector('.nav-mobile');
        const hamburger = document.querySelector('.hamburger');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Adicionar efeitos de hover nos cards
  document.querySelectorAll('.card, .team-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('featured')) {
        card.style.transform = '';
      }
    });
  });

  // Melhorar acessibilidade
  document.addEventListener('keydown', (e) => {
    // ESC para fechar menu mobile
    if (e.key === 'Escape') {
      const mobileNav = document.querySelector('.nav-mobile');
      const hamburger = document.querySelector('.hamburger');
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });

  // Adicionar indicador de loading para links externos
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
      link.addEventListener('click', () => {
        window.showNotification('Abrindo link externo...', 'info');
      });
    }
  });
});

// Função para otimizar performance
function optimizePerformance() {
  // Preload de imagens críticas
  const criticalImages = [
    'https://images.unsplash.com/photo-1534438327298-14b7e19a4547',
    './images/Alayne_Silva.webp',
    './images/Helena_Bezerra.webp'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Otimizar scroll performance
  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
      // Código de scroll otimizado aqui
    }, 150);
  }, { passive: true });
}

// Executar otimizações
optimizePerformance();

