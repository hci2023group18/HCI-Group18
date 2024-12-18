

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

document.addEventListener('DOMContentLoaded', function () {
  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const quantityInput = document.getElementById('quantity');
  const addToCartBtn = document.getElementById('add-to-cart');

  // Quantity control
  decreaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value, 10);
      if (quantity > 1) quantityInput.value = --quantity;
  });

  increaseBtn.addEventListener('click', () => {
      let quantity = parseInt(quantityInput.value, 10);
      quantityInput.value = ++quantity;
  });

  // Add to cart
  addToCartBtn.addEventListener('click', () => {
      const productName = "Brighton Blackout Cake";
      const price = 17.95; // Fixed price
      const size = document.querySelector('input[name="size"]:checked').value;
      const cut = document.getElementById('cut-option').value;
      const quantity = parseInt(quantityInput.value, 10);
      const total = (price * quantity).toFixed(2);

      // Create product object
      const product = { name: productName, size, cut, quantity, total };

      // Get cart from localStorage, or initialize it as an empty array
      let cart = JSON.parse(localStorage.getItem('cart'));
      if (!Array.isArray(cart)) {
          cart = []; // Ensure cart is an array
      }

      // Add product to cart
      cart.push(product);

      // Save the updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
  });
});
document.getElementById('add-to-cart').addEventListener('click', function() {
  const size = document.querySelector('input[name="size"]:checked').value;
  const cut = document.getElementById('cut-option').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = 17.95; // Giá cố định cho sản phẩm

  // Tạo đối tượng sản phẩm
  const product = {
      name: 'Brighton Blackout Cake',
      size: size,
      cut: cut,
      quantity: quantity,
      price: price,
      totalPrice: price * quantity
  };

  // Lấy giỏ hàng từ localStorage hoặc khởi tạo một mảng trống nếu không có dữ liệu
  let cart = JSON.parse(localStorage.getItem('cart'));

  // Nếu cart không phải là mảng, khởi tạo lại cart là mảng trống
  if (!Array.isArray(cart)) {
      cart = [];
  }

  // Thêm sản phẩm vào giỏ hàng
  cart.push(product);

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Thông báo sản phẩm đã được thêm vào giỏ hàng
  alert('Sản phẩm đã được thêm vào giỏ hàng');
  window.location.reload();
});



document.addEventListener('DOMContentLoaded', () => {
  // Lấy số lượng sản phẩm từ localStorage
  const cartItemCount = localStorage.getItem('cartItemCount') || 0;

  // Lấy phần tử hiển thị số trên icon
  const iconCountElement = document.getElementById('icon-count');

  // Cập nhật số hiển thị trên Trang chủ
  iconCountElement.textContent = cartItemCount;
});

document.addEventListener('DOMContentLoaded', () => {
  // Kiểm tra trạng thái đăng nhập từ sessionStorage
  const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Hoặc localStorage nếu cần

  // Lấy phần tử hiển thị số lượng sản phẩm trong giỏ hàng
  const iconCountElement = document.getElementById('icon-count');

  // Nếu chưa đăng nhập, hiển thị số lượng đơn hàng là 0
  if (!isLoggedIn) {
    iconCountElement.textContent = 0;
    // Có thể vô hiệu hóa các nút "Add to Cart" hoặc giỏ hàng nếu chưa đăng nhập
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.disabled = true; // Vô hiệu hóa nút "Thêm vào giỏ"
    });
  } else {
    // Nếu đã đăng nhập, lấy số lượng sản phẩm từ localStorage (nếu có)
    const cartItemCount = localStorage.getItem('cartItemCount') || 0;
    iconCountElement.textContent = cartItemCount;

    // Kích hoạt lại các nút "Add to Cart" nếu người dùng đã đăng nhập
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.disabled = false; // Bật lại các nút "Thêm vào giỏ"
    });
  }
});
