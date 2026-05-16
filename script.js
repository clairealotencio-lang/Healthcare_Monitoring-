// ── LOGIN MODULE ENGINE ──
function handleLogin() {
  const email = document.querySelector('input[type="email"]').value.trim();
  const pass  = document.querySelector('input[type="password"]').value;

  if (!email || !pass) {
    alert('Please enter your email and password.');
    return;
  }

  // Redirects straight to your dashboard file
  window.location.href = 'dashboard.html';
}

// Allow Enter key to trigger login screen check
document.addEventListener('keydown', function (e) {
  // Guard check to ensure we only press enter to login if the inputs exist on screen
  if (e.key === 'Enter' && document.querySelector('input[type="email"]')) {
    handleLogin();
  }
});


// ── MULTI-STEP REGISTRATION ROUTINES ──
function nextStep(stepNumber) {
  const currentStepEl = document.querySelector('.form-step.active');
  const inputs = currentStepEl.querySelectorAll('input[required], select[required]');
  
  for (let input of inputs) {
    if (!input.value) {
      alert('Please fill out all current fields before continuing.');
      input.focus();
      return;
    }
  }

  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.getElementById(`step-${stepNumber}`).classList.add('active');

  if (stepNumber === 2) {
    document.getElementById('node-1').classList.add('completed');
    document.getElementById('node-2').classList.add('active');
    document.getElementById('line-1').classList.add('active');
  } else if (stepNumber === 3) {
    document.getElementById('node-2').classList.add('completed');
    document.getElementById('node-3').classList.add('active');
    document.getElementById('line-2').classList.add('active');
  }
}

function prevStep(stepNumber) {
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.getElementById(`step-${stepNumber}`).classList.add('active');

  if (stepNumber === 1) {
    document.getElementById('node-1').classList.remove('completed');
    document.getElementById('node-2').classList.remove('active');
    document.getElementById('line-1').classList.remove('active');
  } else if (stepNumber === 2) {
    document.getElementById('node-2').classList.remove('completed');
    document.getElementById('node-3').classList.remove('active');
    document.getElementById('line-2').classList.remove('active');
  }
}

function handleRegistration() {
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!email || !password || !confirmPassword) {
    alert('Please enter your details completely.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  alert('Registration parameters verified. Directing pipeline data into your PHP endpoint.');
}


// ── DYNAMIC CENTER ANNOUNCEMENT FEEDS ──
let announcementsData = [
  {
    title: "Scheduled Maintenance: Portal Offline Notice",
    content: "The Mamatid Patient Portal service systems will undergo brief server tuning tasks tomorrow starting at 11:00 PM PST. Expect limited connectivity for up to 30 minutes.",
    date: "Posted: May 16, 2026"
  },
  {
    title: "Free Regular Immunization Scheduling Open",
    content: "The health center desk is now opening free slots for childhood immunizations and seasonal check-ups this week. Please bring your health tracker cards upon confirmation.",
    date: "Posted: May 12, 2026"
  }
];

function renderAnnouncements() {
  const container = document.getElementById("dynamicAnnouncementsContainer");
  if (!container) return; 

  container.innerHTML = "";

  if (announcementsData.length === 0) {
    container.innerHTML = `<div style="color: rgba(255,255,255,0.6); font-size:13px; text-align:center; padding:1rem;">No current notices posted by the health center.</div>`;
    return;
  }

  announcementsData.forEach(item => {
    const cardHtml = `
      <div class="announcement-item">
        <h4>${item.title}</h4>
        <p>${item.content}</p>
        <span class="announcement-date">${item.date}</span>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", cardHtml);
  });
}

function openAnnouncementModal() {
  document.getElementById("announcementModal").classList.add("open");
}

function closeAnnouncementModal() {
  document.getElementById("announcementModal").classList.remove("open");
  document.getElementById("announcementForm").reset();
}

function submitNewAnnouncement(event) {
  event.preventDefault();

  const titleInput = document.getElementById("announceTitle").value.trim();
  const contentInput = document.getElementById("announceContent").value.trim();

  if (!titleInput || !contentInput) return;

  const currentFormattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  announcementsData.unshift({
    title: titleInput,
    content: contentInput,
    date: `Posted: ${currentFormattedDate}`
  });

  renderAnnouncements();
  closeAnnouncementModal();
}