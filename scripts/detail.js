const CONFIG = {
    API_KEY: 'cfc266bb44mshf23a451ea830b9bp117a1ajsn66b83e4f597a',
    API_HOST: 'lazada-api.p.rapidapi.com',
    BASE_URL: 'https://lazada-api.p.rapidapi.com/lazada/item/detail' 
};

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Chặn ngay nếu ID là undefined
    if (productId && productId !== 'undefined' && productId !== 'null') {
        fetchProductDetail(productId);
    } else {
        document.getElementById('productTitle').innerText = "Mã sản phẩm không hợp lệ!";
    }
});

async function fetchProductDetail(id) {
    try {
        const response = await fetch(`${CONFIG.BASE_URL}?itemId=${id}&site=vn`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': CONFIG.API_KEY,
                'x-rapidapi-host': CONFIG.API_HOST
            }
        });

        const result = await response.json();
        
        // Kiểm tra cấu trúc data trả về
        if (result && result.data) {
            renderDetail(result.data);
        } else {
            document.getElementById('productTitle').innerText = "Sản phẩm này đã ngừng kinh doanh hoặc ID sai.";
        }
    } catch (error) {
        console.error("Lỗi kết nối:", error);
        document.getElementById('productTitle').innerText = "Lỗi kết nối máy chủ API.";
    }
}

function renderDetail(data) {
    // Chỉ đổ dữ liệu nếu phần tử HTML tồn tại (tránh lỗi trắng trang)
    const titleEl = document.getElementById('productTitle');
    const priceEl = document.getElementById('currentPrice');
    const mainImg = document.getElementById('mainImg');
    const descEl = document.getElementById('desc-pane');

    if (titleEl) titleEl.innerText = data.title || "Sản phẩm không tên";
    if (priceEl) priceEl.innerText = data.priceShow || "Liên hệ";
    if (mainImg) mainImg.src = data.images?.[0] || data.image || 'https://placehold.co/600';
    if (descEl) descEl.innerHTML = data.description || "Chưa có mô tả chi tiết.";
    
    // Cập nhật Breadcrumb
    const breadcrumb = document.getElementById('breadcrumbActive');
    if (breadcrumb) breadcrumb.innerText = data.title || "Chi tiết";
}