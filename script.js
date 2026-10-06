// ==========================================================================
// NEXTGEN STUDIO — ANKUSH PRATAP SINGH PORTFOLIO LOGIC & INTERACTION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------------------
  // 1. TOP SCROLL PROGRESS BAR
  // ------------------------------------------------------------------------
  const scrollProgress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (scrollProgress) scrollProgress.style.width = `${progress}%`;
    }
  });

  // ------------------------------------------------------------------------
  // 2. MOBILE MENU TOGGLE & BACKDROP OVERLAY
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navBackdrop = document.getElementById("navBackdrop");

  function closeMobileMenu() {
    navLinks?.classList.remove("open");
    menuToggle?.classList.remove("active");
    navBackdrop?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      navBackdrop?.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.classList.toggle("menu-open", isOpen);
    });

    navBackdrop?.addEventListener("click", closeMobileMenu);

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // ------------------------------------------------------------------------
  // 3. HERO TYPING EFFECT
  // ------------------------------------------------------------------------
  const typedTextElement = document.getElementById("typedText");
  if (typedTextElement) {
    const roles = [
      "Web Applications & Platforms",
      "Software Systems & Architecture",
      "Mobile Apps (Flutter & Android)",
      "3D & AI Games (Unity Engine)",
      "High-Performance Python REST APIs",
      "Modern UI/UX User Interfaces"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400; // Pause before typing next word
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // ------------------------------------------------------------------------
  // 4. HERO TERMINAL TABS & COPY CONTROLS & DIAGNOSTIC
  // ------------------------------------------------------------------------
  const tabButtons = document.querySelectorAll(".terminal-tabs .tab-btn");
  const tabContents = document.querySelectorAll(".terminal-body");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");

      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetContent = document.getElementById(`tab-${tabId}`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  const copyCodeBtn = document.getElementById("copyCodeBtn");
  const copyCodeTxt = document.getElementById("copyCodeTxt");
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener("click", () => {
      const activeTab = document.querySelector(".terminal-body.active pre");
      if (activeTab) {
        navigator.clipboard.writeText(activeTab.textContent).then(() => {
          if (copyCodeTxt) copyCodeTxt.textContent = "Copied!";
          setTimeout(() => {
            if (copyCodeTxt) copyCodeTxt.textContent = "Copy";
          }, 2000);
        });
      }
    });
  }

  const runDiagBtn = document.getElementById("runDiagBtn");
  const logOutput = document.getElementById("logOutput");
  if (runDiagBtn && logOutput) {
    runDiagBtn.addEventListener("click", () => {
      runDiagBtn.disabled = true;
      runDiagBtn.textContent = "Running diagnostics...";
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const lines = [
        `<p><span class="log-time">[${now}]</span> Initializing hardware integrity check...</p>`,
        `<p><span class="log-time">[${now}]</span> Memory heap allocated. 0 leaks detected.</p>`,
        `<p><span class="log-time">[${now}]</span> Connecting to NextGen Studio cloud endpoints...</p>`,
        `<p class="log-highlight">✅ All systems nominal. Ready for deployment!</p>`
      ];
      let delay = 300;
      lines.forEach((lineHtml, i) => {
        setTimeout(() => {
          logOutput.insertAdjacentHTML("beforeend", lineHtml);
          logOutput.scrollTop = logOutput.scrollHeight;
          if (i === lines.length - 1) {
            runDiagBtn.disabled = false;
            runDiagBtn.textContent = "⚡ Run System Diagnostic";
          }
        }, delay);
        delay += 400;
      });
    });
  }

  // Animated Stat Numbers Counter
  const statNumbers = document.querySelectorAll(".stat-num[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute("data-count"), 10);
        let start = 0;
        const duration = 1200;
        const stepTime = 40;
        const increment = Math.ceil(finalValue / (duration / stepTime));
        const timer = setInterval(() => {
          start += increment;
          if (start >= finalValue) {
            target.textContent = finalValue;
            clearInterval(timer);
          } else {
            target.textContent = start;
          }
        }, stepTime);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // ------------------------------------------------------------------------
  // 5. INTERACTIVE CANVAS PARTICLE BACKGROUND
  // ------------------------------------------------------------------------
  const canvas = document.getElementById("particleCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }

    animateParticles();
  }

  // ------------------------------------------------------------------------
  // 6. 3D CARD TILT & RADIAL SPOTLIGHT HOVER EFFECT
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll(".tilt-card, .glass");
  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);

      if (card.classList.contains("tilt-card")) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      if (card.classList.contains("tilt-card")) {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. SCROLL REVEAL ANIMATIONS
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // ------------------------------------------------------------------------
  // 8. SCROLLSPY & NAVBAR COMPACT ON SCROLL
  // ------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const backToTopBtn = document.getElementById("backToTop");
  const sections = document.querySelectorAll("main section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ------------------------------------------------------------------------
  // 9. PROJECT CATEGORY FILTERING
  // ------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll("#projectFilters .filter-btn");
  const projectCards = document.querySelectorAll("#projectsGrid .project-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // ------------------------------------------------------------------------
  // 10. PROJECT DETAILS MODAL WITH SCROLL LOCK & ESC LISTENER
  // ------------------------------------------------------------------------
  const modal = document.getElementById("projectModal");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");
  const modalOpenBtns = document.querySelectorAll(".open-modal");

  const projectData = {
    pdf: {
      title: "NextGen PDF",
      subtitle: "All-in-One PDF & Document Utility Platform",
      image: "assets/nextgen_pdf.jpg",
      desc: "NextGen PDF is a full-featured web platform engineered to simplify document processing tasks directly in the browser. Users can effortlessly merge multiple PDFs, extract specific pages, split heavy files, compress documents without quality loss, and convert JPG images to PDF format.",
      features: [
        "Fast client-side document processing minimizing server memory load.",
        "Drag-and-drop file upload workstation with real-time conversion meters.",
        "Firebase integration for user authentication and file history storage.",
        "Fully responsive modern UI designed for desktop and mobile."
      ],
      stack: ["HTML5", "CSS3", "JavaScript", "Firebase Hosting", "Firebase Auth"],
      liveUrl: "https://nextgen-pdf.web.app/index.html",
      githubUrl: "https://github.com/NextGen-Studio1"
    },
    chess: {
      title: "APS Chess Pro 3D",
      subtitle: "Interactive 3D Chess Game Engine with Minimax AI",
      image: "assets/aps_chess.jpg",
      desc: "APS Chess Pro 3D is an immersive game project built in Unity. It integrates a custom Artificial Intelligence engine using the Minimax algorithm with Alpha-Beta Pruning to evaluate move trees, optimize decision-making, and challenge human players.",
      features: [
        "Custom Minimax AI algorithm with variable depth calculation & heuristic evaluation.",
        "Real-time move telemetry displaying AI evaluation graphs and win probabilities.",
        "Multiplayer mode using Firebase Realtime Database for instant move sync.",
        "3D board camera controls, dynamic lighting, particle effects, and audio."
      ],
      stack: ["Unity 3D Engine", "C#", "Minimax AI Algorithm", "Alpha-Beta Pruning", "Firebase"],
      githubUrl: "https://github.com/NextGen-Studio1"
    },
    bhakti: {
      title: "Bhakti Sadhna",
      subtitle: "Devotional Mobile Experience (Published on Google Play)",
      image: "assets/bhakti_sadhna.jpg",
      desc: "Bhakti Sadhna is a published Android mobile application built with Flutter. Designed for spiritual growth, it offers users an intuitive platform for daily devotional chanting, spiritual readings, reminders, and interactive quizzes.",
      features: [
        "Digital Jap Mala counter with haptic feedback, custom target loops, and streak tracking.",
        "Devotional reading library containing Aartis, Chalisas, and scripture bookmarks.",
        "Custom notification reminders for morning and evening prayer sessions.",
        "Firestore integration for real-time content updates and offline caching."
      ],
      stack: ["Flutter", "Dart", "Firebase Firestore", "Cloud Messaging", "Android SDK"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.ankush.bhakti_sangrah",
      githubUrl: "https://github.com/NextGen-Studio1"
    }
  };

  function closeModal() {
    modal?.classList.remove("active");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  modalOpenBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-project");
      const data = projectData[key];
      if (!data) return;

      modalContent.innerHTML = `
        <div class="modal-body">
          <div class="modal-banner-box">
            <img src="${data.image}" alt="${data.title}">
          </div>
          <h3>${data.title}</h3>
          <span class="modal-sub">${data.subtitle}</span>
          <p>${data.desc}</p>
          
          <strong style="color: #f8fafc; font-size: 0.95rem; display: block; margin-top: 20px;">Key Technical Highlights:</strong>
          <ul class="modal-features">
            ${data.features.map(f => `<li><span style="color: #22d3ee;">⚡</span> <span>${f}</span></li>`).join("")}
          </ul>
          
          <strong style="color: #f8fafc; font-size: 0.95rem; display: block; margin-top: 15px;">Technologies & Frameworks:</strong>
          <div class="tech-stack" style="margin-top: 10px;">
            ${data.stack.map(s => `<span>${s}</span>`).join("")}
          </div>
          
          <div class="project-actions" style="margin-top: 25px;">
            ${data.liveUrl ? `<a href="${data.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Visit Project ↗</a>` : ''}
            ${data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">GitHub Code ↗</a>` : ''}
          </div>
        </div>
      `;

      modal?.classList.add("active");
      modal?.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 11. LIVE SKILLS SEARCH FILTER
  // ------------------------------------------------------------------------
  const skillsSearch = document.getElementById("skillsSearch");
  const skillPills = document.querySelectorAll(".skill-pill");

  if (skillsSearch) {
    skillsSearch.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();

      skillPills.forEach(pill => {
        const text = pill.textContent.toLowerCase();
        if (query !== "" && text.includes(query)) {
          pill.classList.add("highlight");
        } else {
          pill.classList.remove("highlight");
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 12. COPY EMAIL TO CLIPBOARD
  // ------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      const email = "ankushpratapsingh243301@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.style.color = "#10b981";
        setTimeout(() => {
          copyEmailBtn.style.color = "";
        }, 2000);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 13. CONTACT FORM MAILTO GENERATOR
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const formToast = document.getElementById("formToast");

  if (contactForm && formToast) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = encodeURIComponent(formData.get("subject"));
      const message = encodeURIComponent(`Hello Ankush,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${formData.get("message")}`);

      window.location.href = `mailto:ankushpratapsingh243301@gmail.com?subject=${subject}&body=${message}`;

      formToast.textContent = "Opening your email application...";
      contactForm.reset();

      setTimeout(() => {
        formToast.textContent = "";
      }, 5000);
    });
  }

});
