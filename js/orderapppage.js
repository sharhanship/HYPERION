document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("odrerapp-form");
    const usernameInput = document.getElementById("username");
    const phoneInput = document.getElementById("forgot-password-phone"); 
    const submitButton = document.querySelector(".btnsendinorderapppage");

    const validPrefixes = [
        "0910", "0911", "0912", "0913", "0914", "0915", "0916", "0917", "0918", "0919",
        "0901", "0902", "0903", "0904", "0905", "0906", "0907", "0908", "0909",
        "0930", "0931", "0932", "0933", "0934", "0935", "0936", "0937", "0938", "0939",
        "0920", "0921", "0922", "0923", "0924", "0925",
        "0960", "0961", "0990", "0991", "0992", "0993", "0994", "0995", "0996", "0997", "0998", "0999",
        "09100", "09101", "09102", "09103", "09104", "09105", "09106", "09107", "09108", "09109",
        "09200", "09201", "09202", "09203", "09204", "09205", "09206", "09207", "09208", "09209",
        "09010", "09011", "09012", "09013", "09014", "09015", "09016", "09017", "09018", "09019",
        "09300", "09301", "09302", "09303", "09304", "09305", "09306", "09307", "09308", "09309",
        "09610", "09611", "09612", "09613", "09614", "09615", "09616", "09617", "09618", "09619"
    ];
    
    let typingBlocked = false; 

    usernameInput.addEventListener("input", function () {
        if (typingBlocked) {
            this.value = ""; 
            return;
        }

        const persianRegex = /[\u0600-\u06FF\u0750-\u077F]/;
        if (persianRegex.test(this.value)) {
            this.value = "";
            typingBlocked = true; 
            showAlert("استفاده از کیبورد فارسی در نام کاربری مجاز نیست!", "red", () => {
                typingBlocked = false; 
            });
        }
    });

    phoneInput.addEventListener("input", function () {
        const inputValue = this.value;

        this.value = inputValue.replace(/\D/g, ""); 

        const prefix = this.value.substring(0, 4);  

        if (this.value.length >= 4 && !validPrefixes.includes(prefix)) {
            this.style.color = "red";
        } else {
            this.style.color = "Green"; 
        }

        if (/[a-zA-Z]/.test(this.value)) {
            this.value = this.value.replace(/[a-zA-Z]/g, ''); 
        }

        if (this.value.length > 11) {
            this.value = this.value.slice(0, 11);
        }
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = document.getElementById("message").value.trim();
        const currentDate = new Date().toISOString(); 

        const prefix = phone.substring(0, 4); 
        if (phone.length >= 4 && !validPrefixes.includes(prefix)) {
            showAlert("شماره تلفن وارد شده معتبر نیست!", "red");
            return;
        }

        submitButton.disabled = true;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost/HYPERION/php/orderapppage.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            console.log(xhr.responseText); 
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    showAlert(response.message, response.color);

                    if (response.status === "success") {
                        form.reset(); 
                        setTimeout(() => {
                            window.location.href = response.redirect;
                        }, 2000); 
                    }
                } catch (error) {
                    console.error("خطای پردازش JSON:", error);
                    console.log("پاسخ دریافتی:", xhr.responseText); 
                    showAlert("خطایی در پردازش داده‌ها رخ داده است", "white");
                }
            } else {
                showAlert("خطا در برقراری ارتباط با سرور", "white");
            }

            setTimeout(() => {
                submitButton.disabled = false;
            }, 3000);
        };

        xhr.send(`username=${encodeURIComponent(username)}&phone=${encodeURIComponent(phone)}&message=${encodeURIComponent(message)}&date=${encodeURIComponent(currentDate)}`);
    });

    function showAlert(message, color, callback) {
        const alertBox = document.createElement("div");
        alertBox.className = "custom-alert";
        alertBox.textContent = message;

        alertBox.style.position = "fixed";
        alertBox.style.top = "120px";
        alertBox.style.right = "20px";
        alertBox.style.background = "rgba(255, 255, 255, 0.2)";
        alertBox.style.backdropFilter = "blur(10px)";
        alertBox.style.border = "1px solid rgba(255, 255, 255, 0.3)";
        alertBox.style.padding = "25px 35px";
        alertBox.style.borderRadius = "16px";
        alertBox.style.boxShadow = "0px 0px 20px rgba(255, 255, 255, 0.15)";
        alertBox.style.fontSize = "20px";
        alertBox.style.textAlign = "right";
        alertBox.style.direction = "rtl";
        alertBox.style.width = "400px";
        alertBox.style.minHeight = "80px";
        alertBox.style.zIndex = "9999";
        alertBox.style.opacity = "1";
        alertBox.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        alertBox.style.fontWeight = "bold";
        alertBox.style.userSelect = "none";

        if (color === "green") {
            alertBox.style.background = "rgba(0, 255, 0, 0.2)";
            alertBox.style.border = "1px solid rgba(0, 255, 0, 0.5)";
            alertBox.style.color = "#00ff00"; 
        } else if (color === "red") {
            alertBox.style.background = "rgba(255, 0, 0, 0.2)";
            alertBox.style.border = "1px solid rgba(255, 0, 0, 0.5)";
            alertBox.style.color = "#ffffff"; 
        } else {
            alertBox.style.background = "rgba(255, 255, 255, 0.2)";
            alertBox.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            alertBox.style.color = "#ffffff"; 
        }

        document.body.appendChild(alertBox);

        setTimeout(function () {
            alertBox.style.opacity = "0";
            setTimeout(function () {
                alertBox.remove();
                if (callback) callback(); 
            }, 300);
        }, 3000);
    }
});
