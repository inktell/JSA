document.querySelector('form').addEventListener('submit', function (e) {
    // 1. Ngăn chặn form tải lại trang
    e.preventDefault();

    // 2. Lấy giá trị từ các ô input (Đã sửa ID cho khớp với HTML)
    const userInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const phoneInput = document.getElementById('phone').value;
    const passwordInput = document.getElementById('password').value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    const validationProvider = {
        // Kiểm tra Email: định dạng chuẩn abc@domain.com
        isEmail: (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        // Kiểm tra Số điện thoại
        isPhoneNumber: (phone) => {
            return /(0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
        },

        // Kiểm tra Password
        isStrongPassword: (password) => {
            // Giải thích Regex password:
            // (?=.*[a-z]) : Ít nhất 1 chữ thường
            // (?=.*[A-Z]) : Ít nhất 1 chữ hoa
            // (?=.*\d)     : Ít nhất 1 số
            // (?=.*[@$!%*?&]) : Ít nhất 1 ký tự đặc biệt
            // .{9,}        : Trên 8 ký tự (tức là từ 9 trở lên)
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{9,}$/;
            return regex.test(password);
        },
        doPasswordsMatch: function (password, confirmPassword) {
            return password === confirmPassword;
        }
    };
    // 3. Validation dữ liệu
    if (!validationProvider.isEmail(emailInput)) {
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng");
        return;
    }
    if (!validationProvider.isPhoneNumber(phoneInput)) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng");
        return;
    }
    if (!validationProvider.isStrongPassword(passwordInput)) {
        alert("Mật khẩu yếu. Vui lòng sử dụng mật khẩu mạnh hơn (ít nhất 9 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt).");
        return;
    }
    if (!validationProvider.doPasswordsMatch(passwordInput, confirmPasswordInput)) {
        alert("Mật khẩu xác nhận không khớp.");
        return;
    }
    // 4. Lưu dữ liệu đăng ký vào localStorage
    localStorage.setItem("db_name", userInput);
    localStorage.setItem("db_email", emailInput);
    localStorage.setItem("db_phone", phoneInput);
    localStorage.setItem("db_pass", passwordInput);
    localStorage.setItem("db_username", userInput); // Lưu tên người dùng để hiển thị sau khi đăng nhập

    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
    // 5. Chuyển hướng sang trang Đăng Nhập
    window.location.href = "login.html";
});