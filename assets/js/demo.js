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
  


  function searchByTitle() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
        const title = item.querySelector('.gallery-title').innerText.toLowerCase();

        if (title.includes(input)) {
            item.style.display = 'block'; // Hiển thị nếu tên khớp
        } else {
            item.style.display = 'none'; // Ẩn nếu tên không khớp
        }
    });
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
