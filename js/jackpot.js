window.addEventListener("load", function () {
    setTimeout(function () {
        const adminPanelBtn = document.getElementById("admin-panel-btn");
        const rlfPageBtn = document.getElementById("rlfpage-btn");
        const exitUserBtn = document.getElementById("exituserbtn");
        const userNameElement = document.getElementById("user-name");
        const cards = document.querySelectorAll('.card');

           window.addEventListener("resize", checkScreenSize);
         function checkScreenSize() {
            if (window.innerWidth <= 900) { 
                window.location.href = "http://localhost/HYPERION/html/indexforphone.html"; 
            }
        }

        checkScreenSize();
        
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");

        if (isLoggedIn === "true") {
            rlfPageBtn.style.opacity = "0.5";
            rlfPageBtn.style.pointerEvents = "none";
            adminPanelBtn.style.opacity = "1";
            adminPanelBtn.style.pointerEvents = "auto";
            exitUserBtn.style.opacity = "1";
            exitUserBtn.style.pointerEvents = "auto";

            const username = sessionStorage.getItem("username");
            if (userNameElement) {
                userNameElement.textContent = username;
            }
        } else {
            rlfPageBtn.style.opacity = "1";
            rlfPageBtn.style.pointerEvents = "auto";
            adminPanelBtn.style.opacity = "0.5";
            adminPanelBtn.style.pointerEvents = "none";
            exitUserBtn.style.opacity = "0.5";
            exitUserBtn.style.pointerEvents = "none";

            if (userNameElement) {
                userNameElement.textContent = "";
            }
        }

        exitUserBtn.addEventListener('click', function () {
            showLogoutConfirmation();
            exitUserBtn.style.pointerEvents = "none";
        });

        function showLogoutConfirmation() {
            let confirmBox = document.createElement("div");
            confirmBox.id = "logout-confirmation";
            confirmBox.innerHTML = ` 
                <p>آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟</p>
                <button id="confirm-logout">بله</button>
                <button id="cancel-logout">خیر</button>
            `;

            confirmBox.style.position = "fixed";
            confirmBox.style.top = "50%";
            confirmBox.style.left = "50%";
            confirmBox.style.transform = "translate(-50%, -50%)";
            confirmBox.style.background = "rgba(0, 0, 0, 0.51)";
            confirmBox.style.backdropFilter = "blur(5px)";
            confirmBox.style.border = "2px solid rgba(255, 255, 255, 0.3)";
            confirmBox.style.fontWeight = "bold";
            confirmBox.style.userSelect = "none";
            confirmBox.style.color = "white";
            confirmBox.style.padding = "20px";
            confirmBox.style.borderRadius = "12px";
            confirmBox.style.fontSize = "20px";
            confirmBox.style.textAlign = "center";
            confirmBox.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.5)";
            confirmBox.style.zIndex = "1000";
            document.body.appendChild(confirmBox);

            let buttons = confirmBox.querySelectorAll("button");
            buttons.forEach(button => {
                button.style.margin = "10px";
                button.style.padding = "12px 24px";
                button.style.border = "none";
                button.style.borderRadius = "8px";
                button.style.fontSize = "18px";
                button.style.cursor = "pointer";
                button.style.transition = "all 0.3s ease-in-out";
                button.style.userSelect = "none";
                button.style.fontWeight = "bold";
            });

            let confirmBtn = document.getElementById("confirm-logout");
            confirmBtn.style.background = "#4CAF50";
            confirmBtn.style.color = "white";
            confirmBtn.style.padding = "12px 24px";
            confirmBtn.style.border = "none";
            confirmBtn.style.borderRadius = "8px";
            confirmBtn.style.fontSize = "18px";
            confirmBtn.style.cursor = "pointer";
            confirmBtn.style.transition = "all 0.3s ease-in-out";
            confirmBtn.style.boxShadow = "0 4px 8px rgba(0, 255, 0, 0.5)";
            confirmBtn.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

            confirmBtn.addEventListener("mouseover", function () {
                confirmBtn.style.transform = "scale(1)";
                confirmBtn.style.background = "#45a049";
                confirmBtn.style.boxShadow = "0 6px 12px rgba(0, 255, 0, 0.7)";
            });
            confirmBtn.addEventListener("mouseout", function () {
                confirmBtn.style.transform = "scale(1)";
                confirmBtn.style.background = "#4CAF50";
                confirmBtn.style.boxShadow = "0 4px 8px rgba(0, 255, 0, 0.5)";
            });

            let cancelBtn = document.getElementById("cancel-logout");
            cancelBtn.style.background = "#f44336";
            cancelBtn.style.color = "white";
            cancelBtn.style.padding = "12px 24px";
            cancelBtn.style.border = "none";
            cancelBtn.style.borderRadius = "8px";
            cancelBtn.style.fontSize = "18px";
            cancelBtn.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            cancelBtn.style.cursor = "pointer";
            cancelBtn.style.transition = "all 0.3s ease-in-out";
            cancelBtn.style.boxShadow = "0 4px 8px rgba(255, 0, 0, 0.5)";

            cancelBtn.addEventListener("mouseover", function () {
                cancelBtn.style.transform = "scale(1)";
                cancelBtn.style.background = "#e53935";  // رنگ ملایم‌تر
                cancelBtn.style.boxShadow = "0 6px 12px rgba(255, 0, 0, 0.7)";
            });
            cancelBtn.addEventListener("mouseout", function () {
                cancelBtn.style.transform = "scale(1)";
                cancelBtn.style.background = "#f44336";
                cancelBtn.style.boxShadow = "0 4px 8px rgba(255, 0, 0, 0.5)";
            });

            confirmBtn.addEventListener("click", function () {
                sessionStorage.removeItem("isLoggedIn");
                sessionStorage.removeItem("username");
                rlfPageBtn.style.opacity = "1";
                rlfPageBtn.style.pointerEvents = "auto";
                adminPanelBtn.style.opacity = "0.5";
                adminPanelBtn.style.pointerEvents = "none";
                exitUserBtn.style.opacity = "0.5";
                exitUserBtn.style.pointerEvents = "none";
                document.body.removeChild(confirmBox);
                window.location.href = 'http://localhost/HYPERION/';
            });

            cancelBtn.addEventListener("click", function () {
                document.body.removeChild(confirmBox);
                exitUserBtn.style.pointerEvents = "auto";  
            });
        }

        function checkLoginStatus() {
            return sessionStorage.getItem('isLoggedIn') === 'true';
        }

        function showPersistentMessage() {
            let messageBox = document.getElementById("login-warning");

            if (!messageBox) {
                messageBox = document.createElement("div");
                messageBox.id = "login-warning";
                messageBox.textContent = "❌ برای استفاده از این خدمت، ابتدا وارد شوید یا ثبت‌نام کنید.";
                messageBox.style.position = "fixed";
                messageBox.style.width = "900px";
                messageBox.style.textAlign = "center";
                messageBox.style.direction = "rtl";
                messageBox.style.userSelect = "none";
                messageBox.style.bottom = "350px";
                messageBox.style.left = "45%";
                messageBox.style.transform = "translateX(-50%)";
                messageBox.style.background = "rgba(0, 0, 0, 0.582)";
                messageBox.style.backdropFilter = "blur(15px)";
                messageBox.style.border = "2px solid rgba(255, 255, 255, 0.3)";
                messageBox.style.color = "white";
                messageBox.style.padding = "10px 20px";
                messageBox.style.borderRadius = "8px";
                messageBox.style.fontSize = "40px";
                messageBox.style.fontWeight = "bold";
                messageBox.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)";
                document.body.appendChild(messageBox);
            }
        }

        cards.forEach(card => {
            if (!checkLoginStatus()) {
                card.style.pointerEvents = 'none';
                card.style.opacity = '0.5';
                showPersistentMessage();
            } else {
                card.style.pointerEvents = 'auto';
                card.style.opacity = '1';
                let messageBox = document.getElementById("login-warning");
                if (messageBox) {
                    messageBox.remove();
                }
            }
        });
    }, 100);
});
