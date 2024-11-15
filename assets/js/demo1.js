function toggleMenu() {
    var menu = document.getElementById("menu");
    
    if (!menu.classList.contains("show")) {
      menu.style.opacity = 0;
      setTimeout(function() {
        menu.classList.add("show"); // Thêm lớp show để hiển thị menu
        menu.style.opacity = 1; 
      }, 10);
    } else {
      menu.style.opacity = 0;
      setTimeout(function() {
        menu.classList.remove("show"); // Ẩn menu sau khi hiệu ứng opacity hoàn thành
      }, 500);
    }
  }
  
  // Ẩn menu khi nhấn ra ngoài
  document.addEventListener("mousedown", function (event) {
    var menu = document.getElementById("menu");
    var iconHamburger = document.querySelector(".icon_hamburger");
  
    if (
      menu.classList.contains("show") &&
      !menu.contains(event.target) &&
      !iconHamburger.contains(event.target)
    ) {
      menu.style.opacity = 0;
      setTimeout(function() {
        menu.classList.remove("show"); 
      }, 500);
    }
  });
  


  // Hàm hiển thị hoặc ẩn thanh tìm kiếm và overlay
function toggleSearchBar(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
    
    // Lấy các phần tử thanh tìm kiếm và overlay
    const searchBar = document.getElementById('searchBar');
    const overlay = document.getElementById('overlay');
    
    // Kiểm tra trạng thái hiển thị hiện tại và chuyển đổi nó
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
      searchBar.style.display = 'block'; // Hiển thị thanh tìm kiếm
      overlay.style.display = 'block'; // Hiển thị overlay làm mờ nền
    } else {
      searchBar.style.display = 'none'; // Ẩn thanh tìm kiếm
      overlay.style.display = 'none'; // Ẩn overlay làm mờ nền
    }
  }



// Hàm mở/đóng thanh tìm kiếm
function toggleSearchBar(event) {
  event.preventDefault();
  const searchBar = document.getElementById('searchBar');
  const overlay = document.getElementById('overlay');
  const isOpen = searchBar.style.display === 'flex';

  // Toggle hiển thị thanh tìm kiếm và overlay
  searchBar.style.display = isOpen ? 'none' : 'flex';
  overlay.style.display = isOpen ? 'none' : 'block';
}

// Hàm tìm kiếm sản phẩm
function searchProducts() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase(); // Chuyển đổi từ khóa tìm kiếm thành chữ thường
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(function(card) {
    const title = card.querySelector('h4').textContent.toLowerCase(); // Lấy tên sản phẩm và chuyển thành chữ thường
    // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm
    if (title.indexOf(filter) !== -1) {
      card.style.display = 'block';  // Hiển thị sản phẩm nếu khớp
    } else {
      card.style.display = 'none';   // Ẩn sản phẩm nếu không khớp
    }
  });
}


// Hàm mở modal và cập nhật thông tin sản phẩm
function openOrderModal(productName, productPrice, productId) {
    document.getElementById('orderModal').style.display = 'block';
    
    // Cập nhật thông tin bánh trong form
    document.getElementById('productName').innerText = productName;
    document.getElementById('productPrice').innerText = productPrice;
    document.getElementById('totalPrice').innerText = "Tổng tiền: " + (productPrice * document.getElementById('quantity').value);
  
    // Reset form cho sản phẩm mới
    document.getElementById('quantity').value = 1;
    document.getElementById('address').value = '';
    document.getElementById('phone').value = '';
  
    // Ẩn nút Hủy đơn nếu chưa đặt hàng
    document.getElementById('cancelOrderBtn').style.display = 'none';
  
    // Lưu thông tin sản phẩm đã chọn
    document.getElementById('orderModal').setAttribute('data-product-id', productId);
  }
  
  function submitOrder() {
    // Lấy giá trị từ các trường trong form
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const productPrice = document.getElementById('productPrice').innerText.replace("VND", "").trim();
    const total = quantity * parseInt(productPrice);
  
    // Kiểm tra nếu trường nào bị bỏ trống
    if (!quantity || !address || !phone) {
      alert("Vui lòng điền đầy đủ thông tin trước khi đặt hàng!");
      return; // Ngừng thực thi nếu thông tin không hợp lệ
    }
  
    // Kiểm tra độ dài và định dạng số điện thoại
    if (!/^\d{10,11}$/.test(phone)) {
      alert("Số điện thoại không hợp lệ! Vui lòng nhập 10-11 chữ số.");
      return;
    }
  
    // Nếu tất cả thông tin hợp lệ
    alert("Đã đặt hàng thành công! Tổng tiền: " + total + " VND");
  
    // Hiển thị nút hủy đơn sau khi đã mua
    document.getElementById('cancelOrderBtn').style.display = 'inline-block';
    closeOrderModal();
  }
  
  
  // Hàm đóng modal
  function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
  }
  
  // Hàm hủy đơn
  function cancelOrder() {
    alert("Đơn hàng đã bị hủy!");
    closeOrderModal();
  }
  
  // Bấm vào bánh
  function selectProduct(productId) {
    const product = getProductById(productId);  // Lấy thông tin sản phẩm từ id (ví dụ: tên, giá)
    openOrderModal(product.name, product.price, product.id);
  }
  
  // Giả sử bạn có một danh sách các sản phẩm
  const products = [
    { id: 1, name: "Brighton Blackout Cake", price: 35000 },
    { id: 2, name: "Vegan Burger Bun", price: 40000 },
    { id: 3, name: "Sourdough Pizza Kit", price: 38000 },
    { id: 4, name: "Brioche Burger Bun", price: 45000 },
    { id: 5, name: "The Flour Pot Gift Card", price: 35000 },
    { id: 6, name: "Lemon & Blueberry Danish", price: 40000 },
    { id: 7, name: "Vanills Calebration Cake", price: 38000 },
    { id: 8, name: "Almond Croissant", price: 45000 },
  ];
  
  // Hàm lấy sản phẩm theo id
  function getProductById(id) {
    return products.find(product => product.id === id);
  }
  

  
  let cart = []; // Mảng chứa các sản phẩm đã đặt

  // Hàm để thêm sản phẩm vào giỏ
  function addToCart(productName, productPrice, quantity) {
    const cartItem = {
      name: productName,
      price: productPrice,
      quantity: quantity,
      status: "Đang giao"
    };
  
    cart.push(cartItem); // Thêm vào mảng giỏ hàng
    updateCartDisplay(); // Cập nhật giao diện
  }
  
  // Hàm hiển thị giỏ hàng
  function toggleCartPanel() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.style.display = cartPanel.style.display === 'none' ? 'block' : 'none';
  }
  
  // Hàm cập nhật giao diện giỏ hàng
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Giỏ hàng hiện đang trống</p>";
      return;
    }
  
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Giá: ${item.price} x ${item.quantity}</p>
        <p>Trạng thái: <span class="status">${item.status}</span></p>
        <button onclick="cancelOrder(${index})">Hủy hàng</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });
  }
  
  // Hàm đặt hàng
  function submitOrder() {
    const productName = document.getElementById('productName').innerText;
    const productPrice = document.getElementById('productPrice').innerText;
    const quantity = document.getElementById('quantity').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
  
    if (!address || !phone || !quantity) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
  
    // Thêm sản phẩm vào giỏ
    addToCart(productName, productPrice, quantity);
  
    // Đóng form đặt hàng
    closeOrderModal();
    alert("Đặt hàng thành công!");
  }
  
  // Hàm hủy hàng
  function cancelOrder(index) {
    cart.splice(index, 1); // Xóa sản phẩm khỏi giỏ hàng
    updateCartDisplay(); // Cập nhật lại giỏ hàng
    alert("Đơn hàng đã được hủy.");
  }
  