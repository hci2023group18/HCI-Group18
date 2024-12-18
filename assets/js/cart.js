
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
 // Lấy giỏ hàng từ localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hiển thị sản phẩm trong giỏ hàng
const cartItemsContainer = document.getElementById('cart-items');
let totalPrice = 0;

// Kiểm tra nếu giỏ hàng có sản phẩm
if (cart.length === 0) {
  cartItemsContainer.innerHTML = '<tr><td colspan="7">Giỏ hàng trống!</td></tr>';
} else {
  cart.forEach(function(product,index) {
    if (product.price && product.totalPrice) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><input type="checkbox" class="cart-checkbox" data-index="${index}" onchange="calculateTotal()"></td> <!-- Thêm checkbox -->
          <td>${product.name}</td>
          <td>${product.size}</td>
          <td>${product.cut}</td>
          <td>${product.quantity}</td>
          <td>£${product.price.toFixed(2)}</td>
          <td>£${product.totalPrice.toFixed(2)}</td>
          <td><button class="btn btn-danger" onclick="removeFromCart(${cart.indexOf(product)})">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
  } else {
      console.error('Product data is invalid', product);
  }
  });
}

// Hiển thị tổng giá trị giỏ hàng
document.getElementById('total-price').textContent = `Tổng Giá: £${totalPrice.toFixed(2)}`;

// Hàm để xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1); // Xóa sản phẩm tại vị trí 'index'
    localStorage.setItem('cart', JSON.stringify(cart)); // Cập nhật lại localStorage
    location.reload(); // Tải lại trang để hiển thị lại giỏ hàng
}

function calculateTotal() {
  let total = 0;

  // Lấy tất cả các checkbox trong giỏ hàng
  const checkboxes = document.querySelectorAll('.cart-checkbox');

  checkboxes.forEach(function(checkbox) {
      // Kiểm tra xem checkbox có được tick hay không
      if (checkbox.checked) {
          // Lấy index từ data-index của checkbox
          const index = checkbox.getAttribute('data-index');

          // Lấy sản phẩm tương ứng với index trong giỏ hàng (cart)
          const product = cart[index];

          // Cộng tổng giá trị của sản phẩm vào total
          total += product.totalPrice;
      }
  });

  // Cập nhật lại tổng giá trị trên giao diện
  document.getElementById('total-price').textContent = 'Tổng Giá: £' + total.toFixed(2);
}
// cart.js

// Hàm xử lý checkout
function checkout() {
  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    // Nếu chưa đăng nhập, hiển thị thông báo và dừng checkout
    alert("Bạn cần đăng nhập để thực hiện thanh toán.");
    window.location.href = 'login.html';
    return;  // Dừng xử lý checkout
  }

//Lấy tất cả các checkbox trong giỏ hàng
const checkboxes2 = document.querySelectorAll('input[type="checkbox"]:checked');
if (checkboxes2.length === 0) {
  // Nếu không có checkbox nào được chọn, hiển thị thông báo
  alert("Không có đơn hàng nào để thanh toán!");
  return; // Dừng chức năng checkout
}

 // Lấy dữ liệu giỏ hàng từ localStorage
 let cart = JSON.parse(localStorage.getItem('cart')) || [];

 // Lưu các sản phẩm được chọn vào mảng
 let selectedItems = [];
 let selectedIndexes = []; // Mảng lưu các chỉ số sản phẩm được chọn

 checkboxes2.forEach(function (checkbox) {
   const index = parseInt(checkbox.getAttribute('data-index'), 10); // Chuyển index từ chuỗi sang số nguyên
   const product = cart[index]; // Lấy sản phẩm từ giỏ hàng
   selectedItems.push(product); // Thêm vào danh sách sản phẩm đã chọn
   selectedIndexes.push(index); // Thêm chỉ số sản phẩm vào mảng selectedIndexes
 });

 // Lọc lại giỏ hàng, loại bỏ các sản phẩm có chỉ số trong selectedIndexes
 const updatedCart = cart.filter((product, index) => !selectedIndexes.includes(index));

 // Cập nhật lại localStorage cho giỏ hàng mới
 localStorage.setItem('cart', JSON.stringify(updatedCart));

 // Lưu các đơn hàng đã chọn (để hiển thị trên trang đặt hàng)
 localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

 // Hiển thị thông báo thành công
 alert("Đặt hàng thành công!");

 // Cập nhật lại giao diện giỏ hàng (nếu bạn không tải lại trang)
 renderCart(updatedCart);

 // Cập nhật lại số lượng hiển thị trên icon
 updateIconCount();
 window.location.reload();
}

// Hàm render lại giỏ hàng
function renderCart(updatedCart) {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Xóa giỏ hàng cũ

  if (updatedCart.length === 0) {
    cartItemsContainer.innerHTML = '<tr><td colspan="7">Giỏ hàng trống!</td></tr>';
  } else {
    updatedCart.forEach(function (product, index) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><input type="checkbox" class="cart-checkbox" data-index="${index}" onchange="calculateTotal()"></td>
        <td>${product.name}</td>
        <td>${product.size}</td>
        <td>${product.cut}</td>
        <td>${product.quantity}</td>
        <td>£${product.price.toFixed(2)}</td>
        <td>£${product.totalPrice.toFixed(2)}</td>
        <td><button class="btn btn-danger" onclick="removeFromCart(${cart.indexOf(product)})">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });
  }
}


// Hàm cập nhật số hiển thị trên icon
function updateIconCount() {
  // Lấy tất cả các checkbox trong giỏ hàng
  const checkboxes = document.querySelectorAll('.cart-checkbox');

  // Đếm số lượng checkbox
  const count = checkboxes.length;

  // Lấy phần tử hiển thị số trên icon
  const iconCountElement = document.getElementById('icon-count');

  // Cập nhật số hiển thị
  iconCountElement.textContent = count;
  // Lưu số lượng sản phẩm vào localStorage
  localStorage.setItem('cartItemCount', count);
}

// Gọi hàm khi trang được tải
document.addEventListener('DOMContentLoaded', updateIconCount);

// Gọi lại hàm sau khi thêm hoặc xóa sản phẩm
function addOrRemoveItem() {
  // Xử lý thêm hoặc xóa sản phẩm
  // Sau đó, cập nhật số trên icon
  updateIconCount();
}

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


document.addEventListener('DOMContentLoaded', () => {
  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // Dùng sessionStorage để kiểm tra đăng nhập

  // Nếu chưa đăng nhập, ẩn giỏ hàng
  if (!isLoggedIn) {
    document.getElementById('cart-items').innerHTML = '<tr><td colspan="4">Bạn cần đăng nhập để xem giỏ hàng.</td></tr>';
    return; // Dừng thực thi nếu chưa đăng nhập
  }

  // Nếu đã đăng nhập, hiển thị giỏ hàng
  const cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy giỏ hàng từ localStorage
  const cartBody = document.getElementById('cart-items');
});
