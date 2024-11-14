// Mảng chứa các đường dẫn ảnh
const images = [
    "https://cdn.tgdd.vn/Files/2021/03/09/1333700/cac-loai-banh-ngot-duoc-yeu-thich-nhat-tai-viet-nam-202103090937443232.jpg",
    "https://culacstudio.com/wp-content/uploads/chup-anh-san-pham-banh-kem-cai-lo-nuong-copy-1024x683.jpg",
    "https://daubepgiadinh.vn/wp-content/uploads/2018/05/hinh-banh-cupcake.jpg",
    "https://chupanh.vn/wp-content/uploads/2017/12/concept-chup-anh-mon-an-chum-anh-banh-ngot-nhin-la-me-ma00133.jpg",
    "https://anhquanbakery.com/uploads/images/banh-macaron-nhan-kem-socola-ganache-sieu-de-thuong.jpg"
  ];
 
let currentImageIndex = 0; // Mặc định ảnh đầu tiên sẽ được hiển thị

// Thay đổi ảnh khi click vào dot
function changeImage(index) {
    const mainImage = document.getElementById("main-image");
    const dots = document.querySelectorAll(".dot");

    // Mờ dần ảnh hiện tại
    mainImage.style.opacity = 0;

    // Chờ ảnh mờ hết rồi thay đổi ảnh
    setTimeout(() => {
        mainImage.src = images[index - 1]; // Chọn ảnh từ mảng dựa trên chỉ số
        mainImage.style.opacity = 1; // Hiển thị ảnh mới

        // Cập nhật trạng thái các dot
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index - 1].classList.add("active");
    }, 2000); // Thời gian đợi để ảnh mờ hết trước khi đổi ảnh
}

// Thêm sự kiện khi click vào ảnh
document.getElementById("main-image").addEventListener("click", () => {
    // Thay đổi ảnh tiếp theo khi click vào ảnh chính
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeImage(currentImageIndex + 1); // Index bắt đầu từ 1
});

// Cập nhật các chấm tròn để thay đổi ảnh khi click
const dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        changeImage(index + 1); // Index bắt đầu từ 1
    });
});
  


  window.addEventListener("scroll", function () {
    const mainImage = document.getElementById("main-image");
    const scrollPosition = window.scrollY;
  
    // Khi cuộn, ảnh sẽ di chuyển lên dần
    if (scrollPosition < 300) {
      mainImage.style.transform = `translateY(-${scrollPosition / 3}px)`;
    } else {
      mainImage.style.transform = `translateY(-100%)`; // Ẩn ảnh khi cuộn qua một khoảng nhất định
    }
  });

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
  