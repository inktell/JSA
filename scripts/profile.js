document.addEventListener("DOMContentLoaded", function () {
    displayUserProfile();
});

function displayUserProfile() {
    // Lấy đúng Key đã lưu từ trang Đăng ký
    const name = localStorage.getItem("db_name");
    const email = localStorage.getItem("db_email");
    const phone = localStorage.getItem("db_phone");

    // 1. Cập nhật phần Sidebar (phần chữ nhỏ dưới avatar)
    const sidebarName = document.querySelector(".profile-sidebar h5");
    const sidebarUsername = document.querySelector(".profile-sidebar p");
    
    if (sidebarName) sidebarName.innerText = name || "Khách hàng";
    if (sidebarUsername) sidebarUsername.innerText = "@" + (name ? name.toLowerCase().replace(/\s/g, '') : "user");

    // 2. Cập nhật phần Nội dung chi tiết (Phần hiển thị)
    // Lưu ý: Bạn cần thêm ID vào HTML ở bước 2 dưới đây để code này chạy được
    const nameDisplay = document.getElementById("info-name");
    const emailDisplay = document.getElementById("info-email");
    const phoneDisplay = document.getElementById("info-phone");

    if (nameDisplay) nameDisplay.innerText = name || "Chưa cập nhật";
    if (emailDisplay) emailDisplay.innerText = email || "Chưa cập nhật";
    if (phoneDisplay) phoneDisplay.innerText = phone || "Chưa cập nhật";
}

// Thêm vào trong profile.js
document.querySelector(".btn-secondary-custom").addEventListener("click", function() {
    if(confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        // Nếu muốn xóa sạch dữ liệu thì dùng: localStorage.clear();
        // Nếu chỉ muốn thoát thì chuyển hướng:
        window.location.href = "login.html"; 
    }
});