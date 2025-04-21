document.addEventListener('wheel', (e) => {
  e.preventDefault();
}, { passive: false });

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

function fetchUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost/HYPERION/php/adminpanel.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const users = JSON.parse(xhr.responseText);
          const userListContainer = document.querySelector('.user-list-container table tbody');
          userListContainer.innerHTML = '';

          users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td><input type="text" value="${user.username}" class="cyber-input editable" disabled></td>
              <td><input type="email" value="${user.email}" class="cyber-input editable" disabled></td>
              <td><input type="text" value="${user.password}" class="cyber-input editable" disabled></td>
              <td>
                <button class="cyber-button delete-btn" onclick="deleteUser(${user.id})">حذف</button>
              </td>
            `;
            userListContainer.appendChild(tr);
          });
        } catch (error) {
          console.error('خطا در تجزیه JSON:', error);
        }
      }
    }
  };
  xhr.send('fetchUsers=true');
}

function deleteUser(userId) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost/HYPERION/php/adminpanel.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (xhr.responseText === 'success') {
          alert('کاربر با موفقیت حذف شد!');
          fetchUsers();
        } else {
          alert('خطا در حذف کاربر!');
        }
      }
    }
  };
  xhr.send('deleteUser=true&userId=' + userId);
}

function fetchOrders() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost/HYPERION/php/adminpanel.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const orders = JSON.parse(xhr.responseText);
          const orderListContainer = document.querySelector('.order-list-container table tbody');
          orderListContainer.innerHTML = '';

          orders.forEach(order => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${order.username}</td>
              <td>${order.request_type}</td>
              <td class="details" onclick="showDetails(event)">${order.details}</td>
              <td>${order.order_date} - ${order.order_time}</td>
              <td>${order.phone}</td>
              <td>
                <button class="reject-btn" onclick="deleteOrder(${order.id})">حذف</button>
              </td>
            `;
            orderListContainer.appendChild(tr);
          });
        } catch (error) {
          console.error('خطا در تجزیه JSON:', error);
        }
      }
    }
  };
  xhr.send('fetchOrders=true');
}

function deleteOrder(orderId) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost/HYPERION/php/adminpanel.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        if (xhr.responseText === 'success') {
          alert('درخواست با موفقیت حذف شد!');
          fetchOrders();
        } else {
          alert('خطا در حذف درخواست!');
        }
      }
    }
  };
  xhr.send('deleteOrder=true&orderId=' + orderId);
}

function showDetails(event) {
  const detailsText = event.target.textContent;
  const alertBox = document.createElement('div');
  alertBox.classList.add('custom-alert-box');
  alertBox.style.position = 'fixed';
  alertBox.style.top = '50%';
  alertBox.style.left = '50%';
  alertBox.style.transform = 'translate(-50%, -50%)';
  alertBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  alertBox.style.padding = '20px';
  alertBox.style.borderRadius = '10px';
  alertBox.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.5)';
  alertBox.style.zIndex = '1000';
  alertBox.style.maxWidth = '90%';
  alertBox.style.width = '500px';
  alertBox.style.overflowWrap = 'break-word';

  const content = document.createElement('div');
  content.classList.add('alert-content');
  content.innerHTML = `
    <p>${detailsText}</p>
    <button class="close-alert-btn" onclick="closeAlert(event)">بستن</button>
  `;

  alertBox.appendChild(content);

  document.body.appendChild(alertBox);

  content.style.color = '#fff';
  content.style.fontFamily = 'Arial, sans-serif';
  content.style.fontSize = '16px';
  content.style.fontWeight = 'bold';
  content.style.lineHeight = '1.5';
  content.style.textAlign = 'center';
  content.style.wordWrap = 'break-word';
  const button = content.querySelector('.close-alert-btn');
  button.style.marginTop = '10px';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#333';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.style.borderRadius = '5px';
  button.style.fontSize = '16px';
  button.style.transition = 'background-color 0.3s ease';

  button.addEventListener('mouseover', function () {
    button.style.backgroundColor = '#555';
    button.style.fontFamily = 'Arial, sans-serif';
  });
  button.addEventListener('mouseout', function () {
    button.style.backgroundColor = '#333';
  });
}

function closeAlert(event) {
  const alertBox = event.target.closest('.custom-alert-box');
  if (alertBox) {
    alertBox.remove();
  }
}

window.onload = function () {
  fetchUsers();
  fetchOrders();
};


document.addEventListener('DOMContentLoaded', function () {
  const newsForm = document.querySelector('#news-form form');

  newsForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('input[placeholder="موضوع خبر"]').value.trim();
    const author = document.querySelector('input[placeholder="نام نویسنده"]').value.trim();
    const publish_date = document.querySelector('input[type="datetime-local"]').value;
    const content = document.querySelector('textarea[placeholder="متن خبر..."]').value.trim();

    if (title === '' || author === '' || publish_date === '' || content === '') {
      alert('لطفاً همه فیلدها را پر کنید!');
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost/HYPERION/php/adminpanel.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText === 'success') {
          alert('خبر با موفقیت ثبت شد!');
          newsForm.reset();
        } else {
          alert('خطا در ثبت خبر!');
        }
      }
    };

    xhr.send(`addNews=true&title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&publish_date=${encodeURIComponent(publish_date)}&content=${encodeURIComponent(content)}`);
  });
});