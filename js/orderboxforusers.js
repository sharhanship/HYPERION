document.addEventListener("DOMContentLoaded", function () {
    const username = sessionStorage.getItem("username");

    if (!username) {
        console.error("کاربر وارد نشده است");
        return;
    }

    fetch("http://localhost/HYPERION/php/orderboxforusers.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const requestsBox = document.querySelector(".requests-box");
                requestsBox.innerHTML = ""; 

                if (data.requests.length === 0) {
                    requestsBox.innerHTML = "<p>شما هیچ درخواستی ثبت نکرده‌اید.</p>";
                    return;
                }

                data.requests.forEach(request => {
                    const requestElement = document.createElement("div");
                    requestElement.classList.add("request");
                    requestElement.innerHTML = `
                        <h3>${request.request_type}</h3>
                        <p>نوع درخواست: <span class="request-type">${request.request_type}</span></p>
                        <div class="details">
                            <p>تاریخ: ${request.order_date}</p>
                            <p>زمان: ${request.order_time}</p>
                        </div>
                        <button class="delete-btn" data-id="${request.id}">🗑 حذف</button>
                    `;
                    requestsBox.appendChild(requestElement);
                });

                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.style.padding = "8px 12px";
                    button.style.border = "none";
                    button.style.borderRadius = "8px";
                    button.style.backgroundColor = "#ff4d4d";
                    button.style.color = "white";
                    button.style.fontSize = "14px";
                    button.style.cursor = "pointer";
                    button.style.transition = "0.3s";
                    button.style.marginTop = "10px";

                    button.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#cc0000";
                    });

                    button.addEventListener("mouseleave", function () {
                        this.style.backgroundColor = "#ff4d4d";
                    });

                    button.addEventListener("click", function () {
                        const requestId = this.getAttribute("data-id");
                        deleteRequest(requestId, username, this.parentElement);
                    });
                });
            } else {
                console.error("خطا در دریافت درخواست‌ها:", data.message);
            }
        })
        .catch(error => console.error("خطا در ارتباط با سرور:", error));
});

// تابع حذف درخواست
function deleteRequest(requestId, username, requestElement) {
    fetch("http://localhost/HYPERION/php/orderboxforusers.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ action: "delete", id: requestId, username: username })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                requestElement.remove();
            } else {
                console.error("خطا در حذف درخواست:", data.message);
            }
        })
        .catch(error => console.error("خطا در ارتباط با سرور:", error));
}
