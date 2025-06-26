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
            
            // 保存原始console对象
            const originalConsole = window.console;
            
            // 检测控制台（更安全的方式）
            let consoleAccessCount = 0;
            Object.defineProperty(window, 'console', {
                get: function() {
                    consoleAccessCount++;
                    if (consoleAccessCount > 3) {
                        devToolsOpen = true;
                    }
                    return originalConsole;
                },
                configurable: true
            });
            
            // 检测调试器（添加错误处理）
            function detectDebugger() {
                try {
                    const start = performance.now();
                    debugger;
                    const end = performance.now();
                    if (end - start > 100) {
                        // 检测到调试器，显示警告而不是直接跳转
                        if (!document.getElementById('debugger-warning')) {
                            const warning = document.createElement('div');
                            warning.id = 'debugger-warning';
                            warning.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #ff4444; color: white; padding: 20px; border-radius: 8px; z-index: 1000000; font-size: 16px; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3);';
                            warning.innerHTML = '检测到调试器，请关闭后继续';
                            document.body.appendChild(warning);
                            
                            // 3秒后自动移除警告
                            setTimeout(() => {
                                if (warning.parentNode) {
                                    warning.parentNode.removeChild(warning);
                                }
                            }, 3000);
                        }
                    }
                } catch (e) {
                    // 静默处理错误
                }
            }
            
            setInterval(detectDebugger, 2000);
            
            // 智能开发者工具检测（防止滚动误报）
            let devToolsDetected = false;
            let initialSizeDiff = null;
            let isScrolling = false;
            let scrollTimeout = null;
            let detectionHistory = [];
            let lastCheckTime = 0;
            
            // 监听滚动事件
            let scrollListener = function() {
                isScrolling = true;
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    isScrolling = false;
                }, 1000); // 滚动停止1秒后才恢复检测
            };
            
            if (typeof window !== 'undefined' && window.addEventListener) {
                window.addEventListener('scroll', scrollListener, { passive: true });
                window.addEventListener('resize', scrollListener, { passive: true });
            }
            
            function checkDevTools() {
                try {
                    // 检查窗口对象是否存在
                    if (typeof window === 'undefined' || !window.outerHeight || !window.innerHeight) {
                        return;
                    }
                    
                    // 检测移动设备，移动设备跳过检测
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                                   window.innerWidth <= 768;
                    
                    if (isMobile) {
                        return;
                    }
                    
                    // 如果正在滚动，跳过检测
                    if (isScrolling) {
                        return;
                    }
                    
                    const currentTime = Date.now();
                    const heightDiff = window.outerHeight - window.innerHeight;
                    const widthDiff = window.outerWidth - window.innerWidth;
                    
                    // 首次运行时记录初始差值（浏览器UI造成的正常差值）
                    if (initialSizeDiff === null) {
                        initialSizeDiff = {
                            height: heightDiff,
                            width: widthDiff
                        };
                        return;
                    }
                    
                    // 计算相对于初始状态的变化
                    const heightChange = Math.abs(heightDiff - initialSizeDiff.height);
                    const widthChange = Math.abs(widthDiff - initialSizeDiff.width);
                    
                    // 记录检测历史（用于趋势分析）
                    detectionHistory.push({
                        time: currentTime,
                        heightChange: heightChange,
                        widthChange: widthChange
                    });
                    
                    // 只保留最近10次检测记录
                    if (detectionHistory.length > 10) {
                        detectionHistory.shift();
                    }
                    
                    // 更严格的阈值：只有当尺寸变化超过400px时才认为是开发者工具
                    const threshold = 400;
                    
                    // 需要连续3次检测都超过阈值才触发警告（防止偶发性变化）
                    let consecutiveDetections = 0;
                    if (detectionHistory.length >= 3) {
                        for (let i = detectionHistory.length - 3; i < detectionHistory.length; i++) {
                            const record = detectionHistory[i];
                            if (record.heightChange > threshold || record.widthChange > threshold) {
                                consecutiveDetections++;
                            }
                        }
                    }
                    
                    if (consecutiveDetections >= 3) {
                        if (!devToolsDetected) {
                            devToolsDetected = true;
                            // 显示警告而不是直接清空页面
                            if (!document.getElementById('devtools-warning')) {
                                const warning = document.createElement('div');
                                warning.id = 'devtools-warning';
                                warning.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; z-index: 999999; text-align: center;';
                                warning.innerHTML = '<div>请关闭开发者工具后刷新页面<br><small style="font-size: 16px; margin-top: 10px; display: block;">Press F5 to refresh</small></div>';
                                document.body.appendChild(warning);
                            }
                        }
                    } else {
                        // 开发者工具已关闭，移除警告
                        const warning = document.getElementById('devtools-warning');
                        if (warning && warning.parentNode) {
                            warning.parentNode.removeChild(warning);
                            devToolsDetected = false;
                        }
                    }
                } catch (e) {
                    // 静默处理错误
                }
            }
            
            // 延迟启动检测，给页面加载时间
            setTimeout(function() {
                setInterval(checkDevTools, 3000); // 每3秒检测一次
            }, 2000);
            
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
    
    // 页面完整性检查（优化版本）
    let originalHTML = '';
    let integrityCheckEnabled = true;
    
    // 延迟获取原始HTML，确保页面完全加载
    setTimeout(function() {
        try {
            if (document.documentElement) {
                originalHTML = document.documentElement.outerHTML;
            }
        } catch (e) {
            integrityCheckEnabled = false;
        }
    }, 2000);
    
    function checkPageIntegrity() {
        try {
            if (!integrityCheckEnabled || !originalHTML || !document.documentElement) {
                return;
            }
            
            const currentHTML = document.documentElement.outerHTML;
            
            // 只检查关键结构变化，忽略动态内容变化
            const originalStructure = originalHTML.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ');
            const currentStructure = currentHTML.replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ');
            
            // 计算变化程度
            const changeRatio = Math.abs(originalStructure.length - currentStructure.length) / originalStructure.length;
            
            // 只有当变化超过30%时才认为是恶意修改
            if (changeRatio > 0.3) {
                console.warn('检测到页面结构被大幅修改');
                // 可以选择是否重新加载页面
                // location.reload();
            }
        } catch (e) {
            // 静默处理错误
        }
    }
    
    setInterval(checkPageIntegrity, 10000);
    
    // 防止iframe嵌入（添加错误处理）
    try {
        if (window.top !== window.self) {
            // 尝试跳转到顶层窗口
            if (window.top.location) {
                window.top.location = window.self.location;
            } else {
                // 如果无法访问顶层窗口，则在当前窗口显示警告
                document.body.innerHTML = '<div style="text-align:center;padding:50px;font-size:18px;">此页面不允许在iframe中显示</div>';
            }
        }
    } catch (e) {
        // 跨域限制时的处理
        try {
            document.body.innerHTML = '<div style="text-align:center;padding:50px;font-size:18px;">此页面不允许在iframe中显示</div>';
        } catch (innerE) {
            // 静默处理错误
        }
    }
    
    // 添加虚假的调试信息（安全方式）
    try {
        if (window.console && typeof window.console.log === 'function') {
            console.log('Debug mode: false');
            console.log('Protection level: maximum');
            console.log('Monitoring: active');
        }
    } catch (e) {
        // 静默处理错误
    }
    
})();

// 导出保护函数（如果需要）
try {
    if (typeof module !== 'undefined' && module && module.exports) {
        module.exports = {
            init: function() {
                try {
                    if (window.console && typeof window.console.log === 'function') {
                        console.log('Protection system initialized');
                    }
                } catch (e) {
                    // 静默处理错误
                }
            },
            version: '1.0.1',
            description: 'Enhanced protection system with error handling'
        };
    }
} catch (e) {
    // 静默处理模块导出错误
}