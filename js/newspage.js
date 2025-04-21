document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", (event) => {
            const newsPost = event.target.closest('.news-post');
            const fullContent = newsPost.querySelector('.full-content');
            const readMoreBtn = newsPost.querySelector('.read-more');

            if (fullContent.style.maxHeight === '0px' || fullContent.style.maxHeight === '') {
                fullContent.style.display = 'block';
                fullContent.style.maxHeight = fullContent.scrollHeight + 'px';
                newsPost.classList.add('expanded');
                readMoreBtn.textContent = 'بستن مطلب';
            } else {
                fullContent.style.maxHeight = '0px';
            
                newsPost.classList.remove('expanded');
                readMoreBtn.textContent = 'ادامه مطلب';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost/HYPERION/php/newspage.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.querySelector(".news-post").innerHTML = "<p class='error-msg'>" + data.error + "</p>";
            } else {
                document.querySelector(".news-post h2").textContent = data.title;
                document.querySelector(".date-time").textContent = "تاریخ: " + data.publish_date;
                document.querySelector(".author").textContent = "نویسنده: " + data.author;
                document.querySelector(".full-content p").textContent = data.content;
            }
        })
        .catch(error => console.error("خطا در دریافت خبر:", error));
});

