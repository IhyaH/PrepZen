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
            
            // 检测窗口大小变化
            let lastOuterWidth = window.outerWidth;
            let lastOuterHeight = window.outerHeight;
            
            setInterval(function() {
                if (Math.abs(window.outerWidth - lastOuterWidth) > threshold ||
                    Math.abs(window.outerHeight - lastOuterHeight) > threshold) {
                    // 窗口大小异常变化
                    document.body.innerHTML = '';
                }
                lastOuterWidth = window.outerWidth;
                lastOuterHeight = window.outerHeight;
            }, 500);
            
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