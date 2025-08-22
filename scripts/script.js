// 页面初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initButtons();
});

// 初始化选项卡功能
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 移除所有选项卡和内容的 active 类
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // 为点击的选项卡和对应内容添加 active 类
            tab.classList.add('active');
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// 初始化按钮事件监听
function initButtons() {
    const measureButton = document.getElementById('measure-button');
    if (measureButton) {
        measureButton.addEventListener('click', showDeviceModal);
    }

    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
}

// 切换右上角菜单的显示和隐藏
function toggleMenu() {
    const menu = document.getElementById('menu-dropdown');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// 显示设备选择弹窗
function showDeviceModal() {
    // 检查弹窗是否已存在
    if (document.getElementById('deviceSelectionModal')) {
        return;
    }

    // 创建弹窗的 HTML 结构
    const modalHTML = `
        <div class="modal-overlay show" id="deviceSelectionModal">
            <div class="modal-content device-modal">
                <h2 class="modal-title">请选择需要测量的设备</h2>
                <ul class="device-list">
                    <li>
                        <button class="device-item" data-device="body-fat">
                            <img src="https://via.placeholder.com/50" alt="体脂秤">
                            <div class="device-info">
                                <span class="device-name">智能体脂秤</span>
                                <span class="device-model">Model S4</span>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button class="device-item" data-device="weight">
                            <img src="https://via.placeholder.com/50" alt="体重秤">
                            <div class="device-info">
                                <span class="device-name">智能体重秤</span>
                                <span class="device-model">Model B2</span>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button class="device-item" data-device="kitchen">
                            <img src="https://via.placeholder.com/50" alt="厨房秤">
                            <div class="device-info">
                                <span class="device-name">智能厨房秤</span>
                                <span class="device-model">Model K1</span>
                            </div>
                        </button>
                    </li>
                </ul>
                <button id="closeDeviceModal" class="close-modal-btn">
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
            </div>
        </div>
    `;
    
    // 将弹窗添加到 body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 为新创建的弹窗元素添加事件监听
    document.getElementById('closeDeviceModal').addEventListener('click', closeDeviceModal);
    document.querySelectorAll('.device-item').forEach(item => {
        item.addEventListener('click', function() {
            const deviceType = this.dataset.device;
            startMeasurement(deviceType);
        });
    });
}

// 关闭设备选择弹窗
function closeDeviceModal() {
    const modal = document.getElementById('deviceSelectionModal');
    if (modal) {
        modal.classList.remove('show');
        // 动画结束后移除元素
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// 开始测量
function startMeasurement(deviceType) {
    console.log(`开始测量: ${deviceType}`);
    closeDeviceModal();

    // 显示加载动画
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.className = 'loading-overlay show';
    loadingOverlay.innerHTML = `<div class="spinner"></div><p>正在测量中...</p>`;
    document.body.appendChild(loadingOverlay);

    // 模拟测量过程
    setTimeout(() => {
        loadingOverlay.remove();
        // 跳转到结果页
        window.location.href = 'results.html';
    }, 2000);
}
