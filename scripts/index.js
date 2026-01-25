document.addEventListener('DOMContentLoaded', function () {
    const loginLink = document.getElementById('loginLink');
    const userMenu = document.getElementById('userMenu');
    const userNameSpan = document.getElementById('userName');

    // Lấy tên người dùng đã lưu từ localStorage
    const loggedInUser = localStorage.getItem("db_username");

    if (loggedInUser) {
        // 1. Ẩn nút Đăng Nhập
        loginLink.parentElement.style.display = 'none';

        // 2. Hiện Menu Người Dùng
        userMenu.style.display = 'block';

        // 3. Hiển thị tên người dùng
        userNameSpan.textContent = "Chào, " + loggedInUser;
    } else {
        // Nếu chưa đăng nhập thì đảm bảo trạng thái đúng
        loginLink.parentElement.style.display = 'block';
        userMenu.style.display = 'none';
    }
});

// Hàm xử lý đăng xuất
function logout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        // Xóa trạng thái đăng nhập (chỉ xóa tên để giữ lại db cho lần sau, hoặc xóa hết tùy bạn)
        localStorage.removeItem("db_username");
        
        // Load lại trang để cập nhật giao diện
        window.location.reload();
    }
}

// Hàm xử lý lọc giá
function applyPriceFilter() {
    const minPrice = document.getElementById('priceMin').value;
    const maxPrice = document.getElementById('priceMax').value;
    
    console.log("Đang lọc giá từ:", minPrice, "đến:", maxPrice);
}