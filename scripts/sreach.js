// 1. Cấu hình lấy từ ảnh test thành công của bạn
const CONFIG = {
    API_KEY: 'e1dbdcb0f3msh59c061826b89031p1bf1dcjsn1fea62ce7ffe',
    API_HOST: 'lazada-api.p.rapidapi.com',
    BASE_URL: 'https://lazada-api.p.rapidapi.com/lazada/search/items'
};

/**
 * 2. Hàm gọi API
 */
async function fetchLazadaProducts(keyword = '') {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;

    // Hiển thị loading
    productsList.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-2">Đang tìm sản phẩm...</p>
        </div>`;

    const url = `${CONFIG.BASE_URL}?keywords=${encodeURIComponent(keyword)}&site=vn&page=1&sort=pop`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': CONFIG.API_KEY,
                'x-rapidapi-host': CONFIG.API_HOST
            }
        });

        const result = await response.json();
        console.log("Dữ liệu thực tế từ API:", result);

        // Lấy mảng sản phẩm từ result.data.items (theo log console của bạn)
        const items = result.data?.items || [];
        renderProducts(items);

    } catch (error) {
        console.error("Lỗi gọi API:", error);
        productsList.innerHTML = `<p class="text-center text-danger">Không thể tải dữ liệu. Vui lòng thử lại.</p>`;
    }
}

/**
 * 3. Hàm hiển thị sản phẩm
 */
function renderProducts(products) {
    const productsList = document.getElementById('productsList');
    const productCount = document.getElementById('productCount');
    
    if (productCount) productCount.innerText = products.length;
    productsList.innerHTML = ''; 

    if (products.length === 0) {
        productsList.innerHTML = '<p class="text-center w-100">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    products.forEach(item => {
        const title = item.title || 'Sản phẩm Lazada';
        
        // Xử lý giá hiển thị
        let displayPrice = "Liên hệ";
        if (item.priceShow) {
            displayPrice = item.priceShow;
        } else if (item.price) {
            displayPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price);
        }

        // Ưu tiên lấy ảnh từ API, nếu lỗi dùng ảnh "No Image" sạch hơn
        const imgUrl = item.image || item.img || 'https://placehold.co/400x400?text=No+Image';

        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm border-0 product-card" style="border-radius: 15px; overflow: hidden;">
                    <div style="background: #f8f9fa; padding: 10px;">
                        <img src="${imgUrl}" class="card-img-top" alt="${title}" 
                             style="height: 200px; object-fit: contain;"
                             onerror="this.src='https://placehold.co/400x400?text=Hình+ảnh+lỗi'">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h6 class="card-title text-truncate-2 mb-2" style="font-size: 0.9rem; line-height: 1.4; height: 2.8rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            ${title}
                        </h6>
                        <p class="text-danger fw-bold fs-5 mb-1">${displayPrice}</p>
                        <div class="small text-warning mb-3">
                            <i class="bi bi-star-fill"></i> ${item.ratingScore || '5.0'}
                            <span class="text-muted">(${item.review || 0} đánh giá)</span>
                        </div>
                        <button class="btn btn-primary mt-auto w-100" style="border-radius: 8px;" onclick="addToCart('${item.itemId}')">
                            <i class="bi bi-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>`;
        productsList.insertAdjacentHTML('beforeend', cardHTML);
    });
}

/**
 * 4. Lắng nghe sự kiện
 */
document.addEventListener('DOMContentLoaded', () => {
    // Load mặc định
    fetchLazadaProducts('balo');

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.onclick = () => {
            const query = searchInput.value.trim();
            if (query) fetchLazadaProducts(query);
        };

        searchInput.onkeypress = (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) fetchLazadaProducts(query);
            }
        };
    }
});

function addToCart(id) {
    console.log("Thêm sản phẩm ID:", id);
    alert("Đã thêm vào giỏ hàng!");
}