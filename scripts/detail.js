// Biến toàn cục lưu trữ danh sách sản phẩm từ API
let allProducts = [];

/**
 * 1. Xử lý tìm kiếm sản phẩm
 * Lưu ý: API Key phải được xử lý ở Backend để tránh lỗi 'process is not defined'
 */
async function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        alert('Vui lòng nhập từ khóa tìm kiếm');
        return;
    }

    // Hiển thị trạng thái đang tải
    const container = document.getElementById('productsList');
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2">Đang tìm kiếm sản phẩm...</p>
        </div>`;

    try {
        // Gọi đến API (giả định bạn có backend tại /api/lazada/search)
        const response = await fetch('/api/lazada/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchTerm }),
        });

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            allProducts = data.items; // Lưu vào biến toàn cục để lọc
            displayProductsList(allProducts);
            document.getElementById('productCount').textContent = allProducts.length;
        } else {
            container.innerHTML = '<p class="text-center">Không tìm thấy sản phẩm nào.</p>';
            document.getElementById('productCount').textContent = '0';
        }
    } catch (error) {
        console.error('Lỗi:', error);
        container.innerHTML = '<p class="text-center text-danger">Có lỗi xảy ra khi tải dữ liệu.</p>';
    }
}

/**
 * 2. Logic Lọc theo Khoảng Giá (Ô nhập số)
 */
function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('priceMin').value) || 0;
    const maxPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;

    if (minPrice < 0 || (maxPrice !== Infinity && maxPrice < minPrice)) {
        alert("Khoảng giá không hợp lệ!");
        return;
    }

    // Lọc từ mảng allProducts đã tải về trước đó
    const filteredResults = allProducts.filter(product => {
        const price = parseFloat(product.price);
        return price >= minPrice && price <= maxPrice;
    });

    displayProductsList(filteredResults);
    document.getElementById('productCount').textContent = filteredResults.length;
}

/**
 * 3. Render danh sách sản phẩm ra HTML
 */
function displayProductsList(products) {
    const container = document.getElementById('productsList');
    container.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 mb-4';
        
        // Format giá tiền Việt Nam
        const formattedPrice = Math.round(product.price).toLocaleString('vi-VN');

        productDiv.innerHTML = `
            <div class="card h-100 shadow-sm product-card" onclick="viewDetail('${product.id}')">
                <img src="${product.image || 'https://via.placeholder.com/200'}" class="card-img-top p-3" alt="${product.name}" style="height: 200px; object-fit: contain;">
                <div class="card-body">
                    <h6 class="card-title text-truncate-2" style="height: 3rem; overflow: hidden;">${product.name}</h6>
                    <div class="d-flex align-items-center mb-2">
                        <span class="text-warning small">
                            <i class="bi bi-star-fill"></i> ${product.rating || 5}
                        </span>
                        <span class="text-muted small ms-2">| Đã bán ${product.sold || 0}</span>
                    </div>
                    <h5 class="text-danger fw-bold">${formattedPrice} đ</h5>
                    <button class="btn btn-primary btn-sm w-100 mt-2">Xem chi tiết</button>
                </div>
            </div>
        `;
        container.appendChild(productDiv);
    });
}

// Lắng nghe sự kiện click nút Search trong HTML của bạn
document.getElementById('searchBtn').addEventListener('click', searchProducts);

// Hỗ trợ nhấn phím Enter để tìm kiếm
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchProducts();
});