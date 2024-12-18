// Get all the dot elements, the main image element, and the image container
const dots = document.querySelectorAll('.dot');
const mainImage = document.getElementById('main-image');
const imageContainer = document.querySelector('.image-container');

// Store the list of images (same as data-image attributes of the dots)
const imageUrls = [
  "https://cdn.tgdd.vn/Files/2021/03/09/1333700/cac-loai-banh-ngot-duoc-yeu-thich-nhat-tai-viet-nam-202103090933169585.jpg",
  "https://chupanh.vn/wp-content/uploads/2017/12/concept-chup-anh-mon-an-chum-anh-banh-ngot-nhin-la-me-ma00133.jpg",
  "https://media.istockphoto.com/id/497959594/vi/anh/b%C3%A1nh-t%C6%B0%C6%A1i.jpg?s=612x612&w=0&k=20&c=XkGNX-VSRsVUtYOqnQ_VVgkx9BUFO9e8C7kLnWfx8GM=",
  "https://st.quantrimang.com/photos/image/2019/06/26/banh-sinh-nhat-2.jpg",
  "https://cdn.tgdd.vn/Files/2021/03/09/1333700/cac-loai-banh-ngot-duoc-yeu-thich-nhat-tai-viet-nam-202103090937443232.jpg"
];

let currentImageIndex = 0;
const mainImg = document.getElementById("main-image");

// Function to change the image with fade effect
function changeImage() {
  mainImg.style.opacity = 0;  // Fade out the image
  
  setTimeout(() => {
    mainImg.src = imageUrls[currentImageIndex];  // Change the image source
    mainImg.style.opacity = 1;  // Fade in the new image

    // Cập nhật chỉ số ảnh
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length; // Đảm bảo chỉ số ảnh vòng lại
  }, 1000); // Wait for the fade-out transition to complete
}

// Đổi hình ảnh mỗi 5 giây
setInterval(changeImage, 3000);

// Đảm bảo ảnh đầu tiên được hiển thị ngay lập tức khi tải trang
mainImg.src = imageUrls[currentImageIndex];

// Add event listeners for the dots to change images
dots.forEach((dot, index) => {
  dot.addEventListener('click', function() {
    currentImageIndex = index;  // Set the current image index based on the clicked dot
    changeImage(currentImageIndex);
  });
});

// Add event listener for clicking on the image to cycle through the images
imageContainer.addEventListener('click', function() {
  currentImageIndex = (currentImageIndex + 1) % imageUrls.length; // Cycle through images
  changeImage(currentImageIndex);
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



// Mở/đóng panel giỏ hàng
function toggleCartPanel() {
  const cartPanel = document.getElementById("cartPanel");
  cartPanel.style.display = cartPanel.style.display === "block" ? "none" : "block";
}

// Đóng panel giỏ hàng
function closeCartPanel() {
  document.getElementById("cartPanel").style.display = "none";
}


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
