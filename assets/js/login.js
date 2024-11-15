

function toggleSearchBar(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    const overlay = document.getElementById("overlay");
    const searchBar = document.getElementById("searchBar");

    if (overlay.style.display === "block") {
        // Đóng thanh tìm kiếm
        overlay.style.display = "none";
        searchBar.style.display = "none";
    } else {
        // Mở thanh tìm kiếm
        overlay.style.display = "block";
        searchBar.style.display = "block";
    }
}

/* login */
// Lưu trữ thông tin tài khoản (có thể sử dụng LocalStorage hoặc Cookie)
const users = JSON.parse(localStorage.getItem('users')) || [];

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
}

function showForgotPassword() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

// Xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert("Login successful!");
        // Lưu trạng thái đăng nhập hoặc chuyển trang nếu cần
    } else {
        alert("Invalid credentials.");
    }
}

// Xử lý quên mật khẩu
function handleForgotPassword(event) {
    event.preventDefault();
    const email = document.getElementById('forgot-email').value;

    const user = users.find(user => user.email === email);
    if (user) {
        alert("Password reset link sent to your email.");
        // Gửi email hoặc thực hiện một số hành động khác
    } else {
        alert("Email not found.");
    }
}

// Xử lý đăng ký tài khoản
function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("Email is already registered.");
        return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert("Account created successfully!");
    showLogin();
}


function toggleMenu() {
    var menu = document.getElementById("menu");
    
    // Nếu menu đang ẩn, set lại opacity để có thể hiển thị lại menu từ từ
    if (!menu.classList.contains("show")) {
      menu.style.opacity = 0; // Đảm bảo opacity là 0 khi bắt đầu ẩn
      setTimeout(function() {
        menu.classList.add("show"); // Thêm lớp show để menu trượt vào
        menu.style.opacity = 1; // Đưa opacity về 1 khi menu xuất hiện
      }, 10); // Đảm bảo thời gian chờ ngắn để hiệu ứng được kích hoạt
    } else {
      // Nếu menu đã hiển thị, chúng ta sẽ giảm opacity trước khi ẩn
      menu.style.opacity = 0;
      setTimeout(function() {
        menu.classList.remove("show"); // Gỡ bỏ lớp show để menu biến mất
      }, 500); // Đợi 0.5 giây trước khi ẩn hoàn toàn
    }
  }
  
  // Ẩn menu khi nhấn ra ngoài
  document.addEventListener("click", function (event) {
    var menu = document.getElementById("menu");
    var iconHamburger = document.querySelector(".icon_hamburger");
  
    // Kiểm tra xem có phải nhấn ra ngoài menu không và nếu có thì ẩn menu
    if (
      menu.classList.contains("show") &&
      !menu.contains(event.target) &&
      !iconHamburger.contains(event.target)
    ) {
      menu.style.opacity = 0; // Tạo hiệu ứng mờ dần
      setTimeout(function () {
        menu.classList.remove("show"); // Ẩn menu sau khi opacity giảm dần
      }, 500); // Chờ hiệu ứng opacity kết thúc trước khi ẩn menu
    }
  });
  

  