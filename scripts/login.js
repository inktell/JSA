document.querySelector('form').addEventListener('submit', function (e) {
    // 1. Ngăn chặn form tải lại trang
    e.preventDefault();

    // 2. Lấy giá trị từ các ô input
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // 3. Lấy dữ liệu người dùng đã đăng ký từ localStorage
    // Giả sử thông tin đăng ký lưu ở các key: db_email, db_pass, db_name
    const savedEmail = localStorage.getItem("db_email");
    const savedPass = localStorage.getItem("db_pass");
    const savedName = localStorage.getItem("db_name");

    // 4. Kiểm tra logic đăng nhập
    if (emailInput === savedEmail && passwordInput === savedPass) {
        
        // --- LƯU DỮ LIỆU ĐĂNG NHẬP THÀNH CÔNG ---
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", savedName);
        localStorage.setItem("userEmail", savedEmail);
        // Lưu một avatar mặc định cho trang Profile
        localStorage.setItem("userAvatar", "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png");

        alert("Đăng nhập thành công! Chào mừng " + savedName);

        // 5. Chuyển hướng sang trang  Trang chủ
        window.location.href = "index.html"; 

    } else {
        alert("Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!");
    }
});

function togglePassword(inputId, element) {
    const passwordInput = document.getElementById(inputId);
    const icon = element.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}