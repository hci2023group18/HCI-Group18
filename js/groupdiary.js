// Mở tab
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;

    // Ẩn tất cả các tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }

    // Xóa lớp active khỏi tất cả các tab button
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].classList.remove("active");
    }

    // Hiển thị tab hiện tại và thêm lớp active vào tab button đã chọn
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Mở tab Week1 mặc định khi trang web tải
document.getElementsByClassName("tab-button")[0].click();
