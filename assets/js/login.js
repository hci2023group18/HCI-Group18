

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
  document.getElementById('register-form').style.display = 'none';
    document.getElementById('forgot-password-form').style.display = 'none';
}

function showForgotPassword() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('forgot-password-form').style.display = 'block';
  
}

function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
    document.getElementById('forgot-password-form').style.display = 'none';
}


// Xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      alert("Login successful!");

      // Lưu trạng thái đăng nhập và thông tin người dùng vào localStorage
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('currentUser', JSON.stringify(user)); // Lưu thông tin người dùng đã đăng nhập

      // Lưu thông tin đơn hàng riêng biệt cho mỗi tài khoản
      const userCart = getUserCart(user.email); // Lấy thông tin đơn hàng từ server hoặc database
      sessionStorage.setItem('userCart', JSON.stringify(userCart));

        displayUserCart(userCart);
        displayUserEmail();

      // Hiển thị nút logout
      document.getElementById('logout-btn').style.display = 'block';
      document.getElementById('login-form').style.display = 'none';
      document.getElementById('show-email').style.display = 'block';

      // Chuyển hướng trang sau khi đăng nhập thành công
      window.location.href = 'cart.html'; 
  } else {
      alert("Invalid credentials.");
  }
}

function getUserCart(email) {
  const carts = JSON.parse(localStorage.getItem('carts')) || {};
  
  // Nếu chưa có giỏ hàng cho email, tạo giỏ hàng trống
  if (!carts[email]) {
      carts[email] = [];
      localStorage.setItem('carts', JSON.stringify(carts));
  }
  
  return carts[email]; // Trả về giỏ hàng của người dùng
}



function handleLogout() {

  sessionStorage.clear();
  // Xóa thông tin đăng nhập từ sessionStorage
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('currentUser');
  sessionStorage.removeItem('userCart'); // Nếu bạn lưu thông tin đơn hàng ở đây


   // Ẩn nút logout
   document.getElementById('logout-btn').style.display = 'none';
   document.getElementById('login-form').style.display = 'block';

   // Quay lại trang đăng nhập
   window.location.replace('index.html');
  
}

// xử lý đăng ký tài khoản
function handleRegister(event) {
  event.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const carts = JSON.parse(localStorage.getItem('carts')) || {};
  carts[email] = []; // Gán giỏ hàng rỗng cho email
  localStorage.setItem('carts', JSON.stringify(carts));


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

function displayUserCart(cart) {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; // Xóa nội dung cũ của giỏ hàng

  if (!cart || cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
      cart.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('cart-item');
          itemElement.innerHTML = `
              <p>Item: ${item.item}</p>
              <p>Quantity: ${item.quantity}</p>
          `;
          cartContainer.appendChild(itemElement);
      });
  }
}

// Hiển thị email khi người dùng đã đăng nhập
function displayUserEmail() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')); // Lấy thông tin người dùng từ sessionStorage
  const emailDiv = document.getElementById('user-email');
  emailDiv.textContent = currentUser ? currentUser.email : "Không có thông tin người dùng";

  if (currentUser && currentUser.email) {
      // Hiển thị email trong phần tử
      emailDiv.textContent = currentUser.email;
  } else {
      // Nếu không có email, ẩn phần hiển thị email
      emailDiv.textContent = "Không có thông tin người dùng";
  }
}


document.addEventListener('DOMContentLoaded', function () {
  checkLoginStatus();
  displayUserEmail();
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(sessionStorage.getItem('currentUser'));
  const userCart = JSON.parse(sessionStorage.getItem('userCart'));

  if (isLoggedIn && user) {
    displayUserEmail(); // Hiển thị email người dùng
    if (userCart) {
      displayUserCart(userCart); // Hiển thị giỏ hàng
    }
    console.log('User:', user);
    console.log('User Cart:', userCart);
  } else {
    console.log('No user or cart data available');
  }
});


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

function updateUserCart(email, cart) {
  const carts = JSON.parse(localStorage.getItem('carts')) || {};
  carts[email] = cart; // Gán giỏ hàng mới cho email
  localStorage.setItem('carts', JSON.stringify(carts)); // Lưu lại vào localStorage
}

function addToCart(item) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
  }

  const email = currentUser.email;
  const userCart = getUserCart(email);
  
  // Thêm sản phẩm mới vào giỏ hàng
  userCart.push(item);
  sessionStorage.setItem('userCart', JSON.stringify(userCart)); // Cập nhật sessionStorage
  updateUserCart(email, userCart); // Cập nhật localStorage

  displayUserCart(userCart);
  alert("Item added to cart.");
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
  
// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const logoutButton = document.getElementById('logout-btn');
  const loginForm = document.getElementById('login-form');
  const showEmail = document.getElementById('show-email');
  const dangxuat = document.getElementById('dangxuat');


  if (isLoggedIn) {
      logoutButton.style.display = 'block'; // Hiển thị nút
      loginForm.style.display = 'none';
      showEmail.style.display = 'block';
      dangxuat.style.display = 'block';
  } else {
      logoutButton.style.display = 'none'; // Ẩn nút
      loginForm.style.display = 'block';   // Hiển thị form đăng nhập
  }
}

