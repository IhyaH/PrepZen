// 源代码保护工具脚本
// 用于混淆和保护JavaScript代码

(function() {
    'use strict';
    
    // 简单的字符串编码函数
    function encode(str) {
        return btoa(encodeURIComponent(str));
    }
    
    function decode(str) {
        return decodeURIComponent(atob(str));
    }
    
    // 动态执行保护代码
    const protectionCode = encode(`
        // 高级反调试保护
        (function() {
            let devToolsOpen = false;
            let threshold = 160;
            
            // 检测控制台
            Object.defineProperty(window, 'console', {
                get: function() {
                    devToolsOpen = true;
                    return {
                        log: function() {},
                        warn: function() {},
                        error: function() {},
                        info: function() {},
                        clear: function() {}
                    };
                }
            });
            
            // 检测调试器
            setInterval(function() {
                const start = performance.now();
                debugger;
                const end = performance.now();
                if (end - start > 100) {
                    // 检测到调试器
                    window.location.href = 'about:blank';
                }
            }, 1000);
            
            // 检测开发者工具（通过窗口内外尺寸差异）
            let devToolsDetected = false;
            
            function checkDevTools() {
                const widthThreshold = 160;
                const heightThreshold = 160;
                
                // 检测开发者工具是否打开（内外窗口尺寸差异）
                if (window.outerHeight - window.innerHeight > heightThreshold ||
                    window.outerWidth - window.innerWidth > widthThreshold) {
                    if (!devToolsDetected) {
                        devToolsDetected = true;
                        // 显示警告而不是直接清空页面
                        const warning = document.createElement('div');
                        warning.id = 'devtools-warning';
                        warning.style.cssText = `
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,0.9);
                            color: white;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 24px;
                            z-index: 999999;
                            text-align: center;
                        `;
                        warning.innerHTML = '<div>请关闭开发者工具后刷新页面<br><small style="font-size: 16px; margin-top: 10px; display: block;">Press F5 to refresh</small></div>';
                        document.body.appendChild(warning);
                    }
                } else {
                    // 开发者工具已关闭，移除警告
                    const warning = document.getElementById('devtools-warning');
                    if (warning) {
                        warning.remove();
                        devToolsDetected = false;
                    }
                }
            }
            
            // 每2秒检测一次，减少频率
            setInterval(checkDevTools, 2000);
            
        })();
    `);
    
    // 动态注入保护代码
    setTimeout(function() {
        try {
            eval(decode(protectionCode));
        } catch(e) {
            // 静默处理错误
        }
    }, 1000);
    
    // 页面完整性检查
    const originalHTML = document.documentElement.outerHTML;
    setInterval(function() {
        if (document.documentElement.outerHTML !== originalHTML) {
            // 检测到页面被修改
            location.reload();
        }
    }, 5000);
    
    // 防止iframe嵌入
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // 添加虚假的调试信息
    console.log('Debug mode: false');
    console.log('Protection level: maximum');
    console.log('Monitoring: active');
    
})();

// 导出保护函数（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init: function() {
            console.log('Protection system initialized');
        }
    };
}