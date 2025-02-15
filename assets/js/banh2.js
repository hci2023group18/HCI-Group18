
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
  