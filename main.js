    /* ── cursor ── */
    const cur = document.getElementById('cur'), curR = document.getElementById('cur-r');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px' });
    document.addEventListener('mousedown', () => cur.classList.add('c'));
    document.addEventListener('mouseup', () => cur.classList.remove('c'));
    (function loop() { rx += (mx - rx) * .1; ry += (my - ry) * .1; curR.style.left = rx + 'px'; curR.style.top = ry + 'px'; requestAnimationFrame(loop) })();
    document.querySelectorAll('a,button,input,textarea').forEach(el => {
      el.addEventListener('mouseenter', () => { cur.classList.add('h'); curR.classList.add('h') });
      el.addEventListener('mouseleave', () => { cur.classList.remove('h'); curR.classList.remove('h') });
    });

    /* ── scroll progress ── */
    const prog = document.getElementById('progress');
    window.addEventListener('scroll', () => {
      const s = document.documentElement;
      prog.style.width = (s.scrollTop / (s.scrollHeight - s.clientHeight) * 100) + '%';
    }, { passive: true });

    /* ── theme ── */
    const tb = document.getElementById('themeBtn'), ti = document.getElementById('themeIcon');
    const moonSVG = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
    const sunSVG = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>`;
    let dark = false;
    const setTheme = d => {
      dark = d;
      document.documentElement.setAttribute('data-theme', d ? 'dark' : 'light');
      ti.innerHTML = d ? sunSVG : moonSVG;
    };
    tb.addEventListener('click', () => setTheme(!dark));
    /* if(window.matchMedia('(prefers-color-scheme: dark)').matches)setTheme(true); */

    /* ── mobile drawer ── */
    const ham = document.getElementById('hamBtn'), drw = document.getElementById('mobDrawer'), ov = document.getElementById('mobOv');
    const toggleDrawer = o => {
      ham.classList.toggle('open', o); drw.classList.toggle('open', o); ov.classList.toggle('open', o);
      ham.setAttribute('aria-expanded', String(o)); drw.setAttribute('aria-hidden', String(!o));
      document.body.style.overflow = o ? 'hidden' : '';
    };
    ham.addEventListener('click', () => toggleDrawer(!drw.classList.contains('open')));
    ov.addEventListener('click', () => toggleDrawer(false));
    drw.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleDrawer(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && drw.classList.contains('open')) toggleDrawer(false) });

    /* ── scroll reveal ── */
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') });
    }, { threshold: .08 });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));

    /* ── sticky project showcase ── */
    const showcase = document.getElementById('projShowcase');
    const visualItems = document.querySelectorAll('.proj-visual-item');
    const infoPanels = document.querySelectorAll('.proj-info-panel');
    if (showcase && visualItems.length) {
      const projObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const pid = entry.target.dataset.project;
            infoPanels.forEach(p => { p.classList.remove('active') });
            const target = document.getElementById('info-' + pid);
            if (target) target.classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
      visualItems.forEach(item => projObs.observe(item));
    }

    /* ── hero photo ── */
    (() => {
      const el = document.getElementById('heroPhoto');
      if (!el) return;
      const paths = [
        '/mnt/user-data/uploads/ChatGPT_Image_Jun_3__2026__12_20_14_AM.png',
        '/mnt/user-data/uploads/1780426247563_image.png',
        'soumili_photo.jpg'
      ];
      let i = 0;
      const tryNext = () => {
        if (i >= paths.length) return;
        const img = new Image();
        img.onload = () => { el.src = img.src; el.style.display = 'block'; const ph = el.nextElementSibling; if (ph) ph.style.display = 'none' };
        img.onerror = () => { i++; tryNext() };
        img.src = paths[i++];
      };
      tryNext();
    })();



    /* ── contact form ── */
    document.getElementById('csubmit').addEventListener('click', () => {
      const n = document.getElementById('cname').value.trim();
      const e = document.getElementById('cemail').value.trim();
      const m = document.getElementById('cmsg').value.trim();
      const sub = encodeURIComponent('Portfolio Inquiry' + (n ? ' from ' + n : ''));
      const bod = encodeURIComponent((n ? 'Name: ' + n + '\n' : '') + (e ? 'Email: ' + e + '\n' : '') + (m ? '\nMessage:\n' + m : ''));
      window.location.href = 'mailto:logitechsoumili@gmail.com?subject=' + sub + '&body=' + bod;
    });
  