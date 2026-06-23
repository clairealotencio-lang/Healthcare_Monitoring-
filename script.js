/* ==========================================================================
   GLOBAL STATE & INITIALIZATION
   ========================================================================== */
// Global variable para sa aktibong role
let selectedRole = 'patient';

// Data storage para sa mga anunsyo
const announcementsData = [
    {
        title: "Seasonal Flu Shots",
        content: "Free Flu vaccinations available.",
        date: "June 9, 2026"
    },
    {
        title: "Free Blood Pressure Screening",
        content: "Saturday screening program.",
        date: "June 6, 2026"
    }
];

// INITIALIZATION KAPAG HANDA NA ANG DOM TREE (UPDATED & SAFE VERSION)
document.addEventListener("DOMContentLoaded", () => {
    // Patakbuhin lang kung umiiral ang bulletins container sa HTML (Ito ang magliligtas sa Trend Page!)
    const checkBulletinsContainer = document.getElementById("bulletinsContainer");
    if (checkBulletinsContainer) {
        renderAnnouncements();
    }
    
    // Auto-attach event sa password fields kung nandoon sa login page
    const showHideBtn = document.querySelector('.password-box span') || document.querySelector('.password-toggle');
    if (showHideBtn) {
        showHideBtn.addEventListener('click', togglePasswordVisibility);
    }

    // Interactivity para sa Trend Filter Dropdown
    const filterDropdown = document.querySelector('.filter-dropdown');
    if (filterDropdown) {
        filterDropdown.addEventListener('change', (e) => {
            console.log(`Filtering data for: ${e.target.value}`);
        });
    }
});

/* ==========================================================================
   1. ROLE SWITCHING FUNCTION
   ========================================================================== */
function selectRole(role) {
    selectedRole = role;
    
    // Suporta para sa bago (.role-switch button) at lumang selector (.role-btn)
    const buttons = document.querySelectorAll('.role-switch button, .role-btn');
    buttons.forEach(btn => {
        const dataRole = btn.getAttribute('data-role');
        if (dataRole) {
            btn.classList.toggle('active', dataRole === role);
        } else {
            // Kung walang data-role attribute, i-fallback sa text content matching
            if (btn.textContent.trim().toLowerCase() === role.toLowerCase()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });

    // Paghahanap sa mga ID/Classes ng DOM Elements mula sa luma at bagong HTML
    const title = document.getElementById('loginTitle') || document.querySelector('.login-form-card h2');
    const loginSubtitle = document.querySelector('.subtitle');
    const roleNote = document.getElementById('loginRoleNote');
    const hiddenField = document.getElementById('selectedRole');

    // Update sa mga Titulo at Subtitle
    if (title) {
        title.textContent = role === 'staff' ? 'Staff Login' : 'Patient Login';
    }

    if (loginSubtitle) {
        loginSubtitle.textContent = role === 'staff' 
            ? 'Sign in to the staff management portal' 
            : 'Sign in to your health portal';
    }

    if (roleNote) {
        roleNote.textContent = role === 'staff'
            ? 'Use your staff credentials to access the staff dashboard.'
            : 'Access your patient account and manage appointments securely.';
    }

    if (hiddenField) {
        hiddenField.value = role;
    }
}

/* ==========================================================================
   2. LOGIN VALIDATION AT ROUTING
   ========================================================================== */
function handleLogin(event) {
    // Pigilan ang default form submit reload kung galing sa standard event listener
    if (event) event.preventDefault();

    // Sumusuporta sa parehong 'loginEmail' (luma) o 'email' (bago) depende sa HTML input IDs mo
    const emailInput = document.getElementById('loginEmail') || document.getElementById('email');
    const passwordInput = document.getElementById('loginPassword') || document.getElementById('password');
    
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');
    const emailField = emailInput?.closest('.login-field');
    const passwordField = passwordInput?.closest('.login-field');

    let valid = true;
    const emailValue = emailInput ? emailInput.value.trim() : '';
    const passwordValue = passwordInput ? passwordInput.value.trim() : '';

    // Email Validation Check
    if (!emailValue) {
        if (emailMessage) emailMessage.textContent = 'Email is required.';
        else alert('Email Address is required.');
        emailField?.classList.add('error');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        if (emailMessage) emailMessage.textContent = 'Invalid email.';
        else alert('Please enter a valid email address.');
        emailField?.classList.add('error');
        valid = false;
    } else {
        if (emailMessage) emailMessage.textContent = '';
        emailField?.classList.remove('error');
    }

    // Password Validation Check
    if (!passwordValue) {
        if (passwordMessage) passwordMessage.textContent = 'Password is required.';
        else alert('Password is required.');
        passwordField?.classList.add('error');
        valid = false;
    } else {
        if (passwordMessage) passwordMessage.textContent = '';
        passwordField?.classList.remove('error');
    }

    if (!valid) return false;

    // Kunin ang active role mula sa global state o kaya sa fallback element
    const currentRole = selectedRole || document.getElementById('selectedRole')?.value || 'patient';
    
    // Dynamic Redirect
    window.location.href = currentRole === 'staff' ? 'staff-dashboard.html' : 'dashboard.html';
    return false;
}

// Tugma para sa lumang function call name kung may inline onclick="login()" pa ang code mo
function login() {
    return handleLogin();
}

/* ==========================================================================
   3. SHOW / HIDE PASSWORD FUNCTIONS
   ========================================================================== */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('loginPassword') || document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    const toggleButton = document.querySelector('.password-toggle');
    const inlineSpan = document.querySelector('.password-box span');

    if (!passwordInput) return;

    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';

    // Suporta para sa lumang UI Icons (🙈 / 👁)
    if (toggleIcon) {
        toggleIcon.textContent = isPassword ? '🙈' : '👁';
    }
    if (toggleButton) {
        toggleButton.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    }
    
    // Suporta naman para sa bagong text-based setup (Show / Hide text toggle)
    if (inlineSpan) {
        inlineSpan.textContent = isPassword ? 'Hide' : 'Show';
    }
}

// Fallback link para sa lumang togglePassword() naming format
function togglePassword() {
    togglePasswordVisibility();
}

/* ==========================================================================
   4. REGISTRATION STEP NAVIGATION
   ========================================================================== */
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    
    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) targetStep.classList.add('active');

    // I-update ang Step Tracker Nodes visual indicators kung mayroon man sa page
    document.querySelectorAll('.step-node').forEach((node, index) => {
        if (index + 1 <= step) {
            node.classList.add('active');
        } else {
            node.classList.remove('active');
        }
    });
}

function prevStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.classList.remove('active'));
    
    const targetStep = document.getElementById(`step-${step}`);
    if (targetStep) targetStep.classList.add('active');

    document.querySelectorAll('.step-node').forEach((node, index) => {
        if (index + 1 > step) {
            node.classList.remove('active');
        }
    });
}

/* ==========================================================================
   5. REGISTRATION SUBMIT
   ========================================================================== */
function handleRegistration() {
    const passInput = document.getElementById('regPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');

    if (!passInput || !confirmInput) return;

    const pass = passInput.value;
    const confirm = confirmInput.value;

    if (!pass || !confirm) {
        alert("Please fill up the password fields.");
        return;
    }

    if (pass !== confirm) {
        alert("Passwords do not match");
        return;
    }

    // Kung may terms check checkbox sa html, kailangan itong i-check muna
    if (agreeTerms && !agreeTerms.checked) {
        alert("You must agree to the Terms of Service and Privacy Policy.");
        return;
    }

    alert("Account Created Successfully");
    window.location.href = "login.html";
}

/* ==========================================================================
   6. ANNOUNCEMENT & BULLETINS RENDERING
   ========================================================================== */
function renderAnnouncements() {
    const container = document.getElementById("bulletinsContainer");
    if (!container) return; // Ligtas na hihinto kapag wala sa active dashboard page ang user

    container.innerHTML = '';

    // Render gamit ang modern flat-card inline layout ng iyong main dashboard
    announcementsData.forEach(item => {
        container.innerHTML += `
            <div class="bulletin-item" style="background: #112229; padding: 15px; border-radius: 12px; margin-bottom: 10px; border-left: 4px solid #0f766e;">
                <h4 style="color: #fff; margin-bottom: 5px;">${item.title}</h4>
                <p style="color: #a0b2bc; font-size: 14px; margin-bottom: 5px;">${item.content}</p>
                <span class="bulletin-date" style="color: #0f766e; font-size: 12px; font-weight: bold;">${item.date}</span>
            </div>
        `;
    });
}