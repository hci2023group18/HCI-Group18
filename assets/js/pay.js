// Lấy dữ liệu đơn hàng từ localStorage
const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

// Kiểm tra nếu có đơn hàng
if (selectedItems.length === 0) {
  document.getElementById('inforcake').innerHTML = '<p>Không có sản phẩm trong đơn hàng.</p>';
} else {
  // Hiển thị thông tin đơn hàng
  let orderContent = '<ul>';
  selectedItems.forEach(function(item) {
    orderContent += `
      <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <!-- Nhóm ảnh và tên -->
      <div style="display: flex; align-items: center;">
        <img src="assets/image/sp1.png" style="width: 50px; border-radius: 5px; margin-right: 10px;">
        <span>${item.name}</span>
      </div>
      <!-- Giá -->
      <span>£${item.price.toFixed(2)}</span>
    </li>
    `;
  });
  orderContent += '</ul>';
  document.getElementById('inforcake').innerHTML = orderContent;
}

// Lấy dữ liệu đơn hàng từ localStorage
const selectedItemss = JSON.parse(localStorage.getItem('selectedItems')) || [];

// Kiểm tra nếu có đơn hàng
if (selectedItemss.length === 0) {
  document.getElementById('total-price').innerHTML = '<p>Không có sản phẩm trong đơn hàng.</p>';
} else {
  // Hiển thị thông tin đơn hàng
  let orderContent = '<ul>';
  selectedItemss.forEach(function(item) {
    orderContent += `
      <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <span>£${item.totalPrice.toFixed(2)}</span>
    </li>
    `;
  });
  orderContent += '</ul>';
  document.getElementById('total-price').innerHTML = orderContent;
}
document.getElementById("pay-now-button").addEventListener("click", function() {
  // Ẩn nút Pay Now
  document.getElementById("pay-now-button").style.display = "none";

  // Hiển thị thông báo giao dịch thành công
  document.getElementById("success-message").classList.remove("hidden");

  // Bạn có thể thêm hiệu ứng hoặc thêm các hành động khác nếu cần
});



