function selectRole(role){
    const title = document.getElementById('loginTitle');
    const hiddenField = document.getElementById('selectedRole');
    const buttons = document.querySelectorAll('.role-btn');
    const roleNote = document.getElementById('loginRoleNote');

    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-role') === role);
    });

    if(title){
        title.textContent = role === 'staff' ? 'Staff Login' : 'Patient Login';
    }

    if(hiddenField){
        hiddenField.value = role;
    }

    if(roleNote){
        roleNote.textContent = role === 'staff'
            ? 'Use your staff credentials to access the staff dashboard.'
            : 'Access your patient account and manage appointments securely.';
    }
}

function login(){
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailMessage = document.getElementById('emailMessage');
    const passwordMessage = document.getElementById('passwordMessage');
    const emailField = emailInput?.closest('.login-field');
    const passwordField = passwordInput?.closest('.login-field');

    let valid = true;

    if (!emailInput || !emailInput.value.trim()) {
        emailMessage.textContent = 'Email is required.';
        emailField?.classList.add('error');
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailMessage.textContent = 'Invalid email.';
        emailField?.classList.add('error');
        valid = false;
    } else {
        emailMessage.textContent = '';
        emailField?.classList.remove('error');
    }

    if (!passwordInput || !passwordInput.value.trim()) {
        passwordMessage.textContent = 'Password is required.';
        passwordField?.classList.add('error');
        valid = false;
    } else {
        passwordMessage.textContent = '';
        passwordField?.classList.remove('error');
    }

    if (!valid) return;

    const selectedRole = document.getElementById('selectedRole')?.value || 'patient';
    window.location.href = selectedRole === 'staff' ? 'staff-dashboard.html' : 'dashboard.html';
}

function togglePassword(){
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    const toggleButton = document.querySelector('.password-toggle');

    if (!passwordInput || !toggleIcon || !toggleButton) return;

    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.textContent = isPassword ? '🙈' : '👁';
    toggleButton.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
}

function nextStep(step){
    document.querySelectorAll('.form-step')
    .forEach(el=>el.classList.remove('active'));

    document.getElementById(`step-${step}`)
    .classList.add('active');
}

function prevStep(step){
    document.querySelectorAll('.form-step')
    .forEach(el=>el.classList.remove('active'));

    document.getElementById(`step-${step}`)
    .classList.add('active');
}

function handleRegistration(){

    const pass =
    document.getElementById('regPassword').value;

    const confirm =
    document.getElementById('confirmPassword').value;

    if(pass !== confirm){
        alert("Passwords do not match");
        return;
    }

    alert("Account Created Successfully");

    window.location.href="login.html";
}

const announcementsData = [
{
title:"Seasonal Flu Shots",
content:"Free Flu vaccinations available.",
date:"June 9, 2026"
},
{
title:"Free Blood Pressure Screening",
content:"Saturday screening program.",
date:"June 6, 2026"
}
];

function renderAnnouncements(){

const container =
document.getElementById("bulletinsContainer");

if(!container) return;

container.innerHTML='';

announcementsData.forEach(item=>{

container.innerHTML += `
<div class="bulletin-item">
<h4>${item.title}</h4>
<p>${item.content}</p>
<span class="bulletin-date">${item.date}</span>
</div>
`;

});
}

document.addEventListener("DOMContentLoaded",()=>{
renderAnnouncements();
});