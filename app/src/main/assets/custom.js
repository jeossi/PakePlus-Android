console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

// === 添加通知权限请求能力 ===
(function enableNotificationCapability() {
    // 确保Notification API可用
    if (!("Notification" in window)) {
        console.warn("当前环境不支持通知API");
        return;
    }
    
    // 创建通知权限请求按钮
    const createNotificationButton = () => {
        const button = document.createElement('button');
        button.id = 'pake-notification-enabler';
        button.textContent = '启用通知功能';
        button.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            padding: 10px 15px;
            background: #007aff;
            color: white;
            border: none;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        button.addEventListener('click', async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    button.textContent = '通知已启用!';
                    button.style.background = '#34C759';
                    setTimeout(() => {
                        button.style.display = 'none';
                        // 发送测试通知
                        new Notification('通知功能已激活', {
                            body: '您可以在系统设置中管理通知权限',
                            icon: '/favicon.ico'
                        });
                    }, 1500);
                }
            } catch (error) {
                console.error('通知权限请求失败:', error);
                button.textContent = '请求失败，请重试';
                button.style.background = '#FF3B30';
            }
        });
        
        document.body.appendChild(button);
    };
    
    // 自动添加启用按钮
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createNotificationButton);
    } else {
        createNotificationButton();
    }
})();
// === 通知权限功能结束 ===

// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })
