document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('.form');
    const registerButton = document.getElementById('register-button');
    const loginButton = document.getElementById('login-button');

    window.showForm = function (formName) {
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.getAttribute('data-content') === formName) {
                form.classList.add('active');
            }
        });
    };

    function showCustomAlert(message) {
        if (document.querySelector('.custom-alert')) return;

        registerButton.disabled = true;
        loginButton.disabled = true;

        const alertBox = document.createElement('div');
        alertBox.className = 'custom-alert';
        alertBox.style.position = 'fixed';
        alertBox.style.top = '120px';
        alertBox.style.right = '20px';
        alertBox.style.background = 'rgba(255, 255, 255, 0.2)';
        alertBox.style.backdropFilter = 'blur(10px)';
        alertBox.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        alertBox.style.color = '#fff';
        alertBox.style.padding = '25px 35px';
        alertBox.style.borderRadius = '16px';
        alertBox.style.boxShadow = '0px 0px 20px rgba(255, 255, 255, 0.15)';
        alertBox.style.fontSize = '20px';
        alertBox.style.textAlign = 'right';
        alertBox.style.direction = 'rtl';
        alertBox.style.width = '400px';
        alertBox.style.minHeight = '80px';
        alertBox.style.zIndex = '9999';
        alertBox.style.opacity = '1';
        alertBox.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        alertBox.style.fontWeight = 'bold';
        alertBox.style.userSelect = 'none';

        alertBox.innerText = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
            registerButton.disabled = false;
            loginButton.disabled = false;
        }, 4000);
    }

    function preventPersianInput(event) {
        const persianPattern = /[\u0600-\u06FF]/;
        if (persianPattern.test(event.target.value)) {
            showCustomAlert("❌ ورودی نباید شامل کاراکترهای فارسی باشد.");
            event.target.value = event.target.value.replace(persianPattern, '');
        }
    }

    document.getElementById('register-username').addEventListener('input', preventPersianInput);
    document.getElementById('register-email').addEventListener('input', preventPersianInput);
    document.getElementById('register-password').addEventListener('input', preventPersianInput);
    document.getElementById('login-username').addEventListener('input', preventPersianInput);
    document.getElementById('login-password').addEventListener('input', preventPersianInput);

    registerButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (registerButton.disabled) return;

        const username = document.getElementById('register-username').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value.trim();

        if (!username || !email || !password) {
            showCustomAlert("⚠️ لطفاً همه فیلدها را پر کنید.");
            return;
        }

        fetch('http://localhost/HYPERION/php/rlfpage.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'register', username, email, password })
        })
            .then(response => response.json())
            .then(data => {
                showCustomAlert(data.message);
                if (data.status === "success") {
                    document.getElementById('login-username').value = username;
                    document.getElementById('login-password').value = password;
                    showForm('login');
                }
            })
            .catch(error => {
                console.error('خطا:', error);
                showCustomAlert("❌ خطا در ارسال درخواست.");
            });
    });

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (loginButton.disabled) return;
    
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
    
        if (!username || !password) {
            showCustomAlert("⚠️ لطفاً نام کاربری و رمز عبور را وارد کنید.");
            return;
        }
    
        fetch('http://localhost/HYPERION/php/rlfpage.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', username, password })
        })
        .then(response => response.json())
        .then(data => {
            showCustomAlert(data.message);
            if (data.status === "success" && data.script) {
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("isLoggedIn", "true");
    
                try {
                    const script = document.createElement('script');
                    script.textContent = data.script;
                    document.body.appendChild(script);
                } catch (error) {
                    console.error('خطا در اجرای اسکریپت:', error);
                    // Fallback به روش جایگزین اگر اضافه کردن اسکریپت با خطا مواجه شد
                    setTimeout(() => {
                        if (data.script.includes('adminpage.html')) {
                            window.location.href = 'http://localhost/HYPERION/alphaside/adminpage.html';
                        } else {
                            window.location.href = 'http://localhost/HYPERION/';
                        }
                    }, 2000);
                }
            }
        })
        .catch(error => {
            console.error('خطا:', error);
            showCustomAlert("❌ خطا در ارتباط با سرور.");
        });
    });
});