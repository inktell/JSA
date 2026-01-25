document.querySelector('form').addEventListener('submit', function (e) {
    // 1. Ngăn chặn form tải lại trang
    e.preventDefault();

    // 2. Lấy giá trị từ các ô input
    const userInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const phoneInput = document.getElementById('phone').value.trim(); 
    const passwordInput = document.getElementById('password').value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    // Đối tượng kiểm tra logic (Validation)
    const validationProvider = {
        isEmail: (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        isStrongPassword: (password) => {
            // Ít nhất 6 ký tự, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
            return regex.test(password);
        },
        doPasswordsMatch: (password, confirmPassword) => {
            return password === confirmPassword;
        }
    };

    // 3. THỰC HIỆN KIỂM TRA (VALIDATION)

    // Kiểm tra Tên
    if (userInput === "") {
        alert("Vui lòng nhập họ tên!");
        return;
    }

    // Kiểm tra Email
    if (!validationProvider.isEmail(emailInput)) {
        alert("Email không đúng định dạng!");
        return;
    }

    // KIỂM TRA SỐ ĐIỆN THOẠI (Rỗng cũng được, nếu nhập thì phải 10-14 số)
    if (phoneInput !== "") {
        if (phoneInput.length < 10 || phoneInput.length >= 15 || !/^\d+$/.test(phoneInput)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập từ 10 đến 14 chữ số.");
            return;
        }
    }

    // Kiểm tra Mật khẩu mạnh
    if (!validationProvider.isStrongPassword(passwordInput)) {
        alert("Mật khẩu yếu! Cần ít nhất 6 ký tự, gồm chữ HOA, chữ thường, số và ký tự đặc biệt.");
        return;
    }

    // Kiểm tra khớp mật khẩu
    if (!validationProvider.doPasswordsMatch(passwordInput, confirmPasswordInput)) {
        alert("Xác nhận mật khẩu không khớp!");
        return;
    }

    // 4. LƯU DỮ LIỆU VÀO LOCALSTORAGE
    try {
        localStorage.setItem("db_name", userInput);
        localStorage.setItem("db_email", emailInput);
        localStorage.setItem("db_phone", phoneInput);
        localStorage.setItem("db_pass", passwordInput);
        localStorage.setItem("db_username", userInput); // Dùng để hiển thị ở Navbar index

        alert("Đăng kí thành công!");

        // 5. CHUYỂN HƯỚNG
        window.location.href = "login.html";
    } catch (error) {
        alert("Lỗi lưu trữ dữ liệu. Hãy đảm bảo trình duyệt của bạn cho phép Cookie/LocalStorage.");
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