const services = {
  steel: { code: 'AF / 01', title: 'Structural steel detailing', description: 'Coordinated 3D models and drawing packages developed around fabricator standards, erection logic, and project-specific requirements.', items: ['Shop & assembly drawings', 'Erection plans', 'Material reports & CNC data', 'Model-based clash review'] },
  connections: { code: 'AF / 02', title: 'Connection design', description: 'Practical connection solutions developed with load paths, shop preferences, material efficiency, and field installation in view.', items: ['Connection calculations', 'Design sketches', 'Delegated design support', 'Engineer review coordination'] },
  bim: { code: 'AF / 03', title: 'BIM coordination', description: 'A shared model environment that helps structural, architectural, and building systems teams surface conflicts before they reach the field.', items: ['Federated model review', 'Clash identification', 'Constructability coordination', 'Revision tracking'] },
  misc: { code: 'AF / 04', title: 'Miscellaneous metals', description: 'Focused detailing for stairs, rails, ladders, platforms, canopies, and other packages that demand close interface coordination.', items: ['Stairs & railings', 'Equipment platforms', 'Ladders & embeds', 'Field dimension tracking'] }
};

const serviceTabs = [...document.querySelectorAll('.service-tabs button')];
serviceTabs.forEach((button) => button.addEventListener('click', () => {
  serviceTabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));
  button.setAttribute('aria-selected', 'true');
  const service = services[button.dataset.service];
  document.querySelector('#service-code').textContent = service.code;
  document.querySelector('#service-title').textContent = service.title;
  document.querySelector('#service-description').textContent = service.description;
  document.querySelector('#service-list').innerHTML = service.items.map((item) => `<li>${item}</li>`).join('');
}));

document.querySelectorAll('.process-list li').forEach((item) => {
  item.querySelector('button').addEventListener('click', () => {
    document.querySelectorAll('.process-list li').forEach((row) => {
      const active = row === item;
      row.classList.toggle('active', active);
      row.querySelector('button').setAttribute('aria-expanded', String(active));
      row.querySelector('i').textContent = active ? '−' : '+';
    });
  });
});

const fitCopy = {
  Commercial: 'Share the design set, project tonnage, target submittal dates, and fabricator standards.',
  Industrial: 'Share equipment interfaces, access steel scope, model standards, and the construction sequence.',
  Infrastructure: 'Share governing agency criteria, structure type, staged releases, and coordination requirements.',
  'Miscellaneous metals': 'Share architectural plans, field dimensions, finish requirements, and interface details.'
};
document.querySelectorAll('.fit-options button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.fit-options button').forEach((item) => item.classList.remove('selected'));
  button.classList.add('selected');
  document.querySelector('#fit-result-text').textContent = fitCopy[button.dataset.fit];
}));

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  mobileMenu.hidden = open;
});
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}));

const form = document.querySelector('.project-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    const fieldValid = field.value.trim() && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value));
    field.closest('.field').classList.toggle('invalid', !fieldValid);
    valid = valid && fieldValid;
  });
  const status = form.querySelector('.form-status');
  if (valid) {
    status.textContent = 'Thanks — your brief is ready. Connect this form to your preferred inbox or CRM before launch.';
    status.className = 'form-status full success';
    form.reset();
  } else {
    status.textContent = 'Please complete the highlighted fields.';
    status.className = 'form-status full';
  }
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
