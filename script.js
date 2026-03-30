// 文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    initializeTheme();

    // 初始化导航栏
    initializeNavbar();

    // 初始化表单验证
    initializeFormValidation();

    // 初始化平滑滚动
    initializeSmoothScroll();

    // 初始化动画效果
    initializeAnimations();

    // 初始化页面特定功能
    initializePageSpecificFeatures();

    // 初始化搜索功能
    initializeSearch();
});

// 主题切换功能
function initializeTheme() {
    const themeBtn = document.getElementById('themeBtn');
    const currentTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = themeBtn.querySelector('i');

    // 应用当前主题
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // 主题切换点击事件
    themeBtn.addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateThemeIcon(newTheme);
        animateButton(themeBtn);
    });

    // 更新主题图标
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // 按钮点击动画
    function animateButton(btn) {
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            btn.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// 导航栏功能
function initializeNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // 移动端导航菜单切换
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // 防止页面滚动
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // 点击导航链接后关闭菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';

            // 移除所有链接的 active 类
            navLinks.forEach(l => l.classList.remove('active'));
            // 给当前点击的链接添加 active 类
            this.classList.add('active');
        });
    });

    // 监听页面滚动，添加导航栏背景效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// 表单验证
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (validateForm(form)) {
                // 提交表单
                submitForm(form);
            }
        });

        // 实时验证
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearError(this);
            });
        });
    });

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name') || field.id;
        let isValid = true;

        // 清除之前的错误
        clearError(field);

        // 验证必填字段
        if (field.hasAttribute('required') && !value) {
            showError(field, `${fieldName} 不能为空`);
            isValid = false;
        }

        // 邮箱验证
        if (field.type === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                showError(field, '请输入有效的邮箱地址');
                isValid = false;
            }
        }

        // 电话号码验证
        if (field.type === 'tel' && value) {
            const phonePattern = /^1[3-9]\d{9}$/;
            if (!phonePattern.test(value.replace(/\D/g, ''))) {
                showError(field, '请输入有效的手机号码');
                isValid = false;
            }
        }

        // 密码强度验证
        if (field.type === 'password' && value) {
            if (value.length < 8) {
                showError(field, '密码长度至少为 8 个字符');
                isValid = false;
            }
        }

        return isValid;
    }

    function showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';

        field.style.borderColor = '#ef4444';
        field.parentNode.appendChild(errorDiv);
    }

    function clearError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    function submitForm(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // 显示加载状态
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 提交中...';

        // 模拟表单提交
        setTimeout(() => {
            // 显示成功信息
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = '<i class="fas fa-check-circle"></i> 提交成功！';
            successDiv.style.color = '#10b981';
            successDiv.style.fontSize = '1rem';
            successDiv.style.marginTop = '1rem';
            successDiv.style.textAlign = 'center';

            form.appendChild(successDiv);

            // 重置表单
            form.reset();

            // 恢复按钮状态
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;

            // 3秒后移除成功信息
            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }, 1500);
    }
}

// 平滑滚动
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // 排除空锚点
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const offsetTop = target.offsetTop - 80; // 考虑导航栏高度

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 动画效果
function initializeAnimations() {
    // 页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-fade');

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.post-card, .article-full, .about-page section');
    animatedElements.forEach(el => observer.observe(el));
}

// 页面特定功能
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname;

    // 首页功能
    if (currentPage.includes('index.html') || currentPage === '/') {
        initializeHomePage();
    }

    // 文章页面功能
    if (currentPage.includes('post')) {
        initializePostPage();
    }

    // 关于页面功能
    if (currentPage.includes('about.html')) {
        initializeAboutPage();
    }

    // 联系页面功能
    if (currentPage.includes('contact.html')) {
        initializeContactPage();
    }
}

// 首页功能
function initializeHomePage() {
    // 文章卡片悬停效果
    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 随机显示帖子，每隔 30 秒刷新
    const allPosts = Array.from(document.querySelectorAll('.post-card'));
    const visiblePosts = 6; // 每次显示的帖子数量

    function shufflePosts() {
        // 随机打乱数组
        for (let i = allPosts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
        }

        // 显示前 visiblePosts 个帖子
        allPosts.forEach((post, index) => {
            if (index < visiblePosts) {
                post.style.display = 'block';
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                // 添加淡入效果
                setTimeout(() => {
                    post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                post.style.display = 'none';
            }
        });
    }

    // 初始化显示帖子
    shufflePosts();

    // 每隔 30 秒刷新一次
    const refreshInterval = setInterval(shufflePosts, 30000);

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();

            // 清除刷新定时器
            clearInterval(refreshInterval);

            // 显示所有帖子以便搜索
            allPosts.forEach(post => {
                post.style.display = 'block';
            });

            // 搜索和排序
            const searchResults = allPosts.filter(post => {
                const title = post.querySelector('.post-title').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

                return title.includes(query) || excerpt.includes(query) || tags.some(tag => tag.includes(query));
            });

            const nonSearchResults = allPosts.filter(post => !searchResults.includes(post));

            // 创建新的文章列表容器
            const postsGrid = document.querySelector('.posts-grid');
            postsGrid.innerHTML = '';

            // 将搜索结果显示在最上面
            searchResults.concat(nonSearchResults).forEach((post, index) => {
                // 如果是搜索结果，添加高亮效果
                if (searchResults.includes(post)) {
                    post.style.borderLeft = '4px solid #3b82f6';
                    post.style.paddingLeft = '0.5rem';
                } else {
                    post.style.borderLeft = 'none';
                    post.style.paddingLeft = '0';
                }

                postsGrid.appendChild(post);
            });

            // 如果没有搜索到结果，显示提示
            if (query && searchResults.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <p style="text-align: center; color: var(--text-secondary); font-size: 1.1rem;">
                        <i class="fas fa-search"></i> 未找到相关内容
                    </p>
                `;
                postsGrid.appendChild(noResults);
            }
        });
    }
}

// 文章页面功能
function initializePostPage() {
    // 代码高亮
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    }

    // 阅读进度条
    initializeReadingProgress();

    // 分享功能
    initializeShareButtons();

    // 目录导航
    initializeTableOfContents();
}

// 阅读进度条
function initializeReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background-color: #3b82f6;
        z-index: 9999;
        transition: width 0.1s ease;
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;

        progressBar.style.width = `${scrolled}%`;
    });
}

// 分享功能
function initializeShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');

    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const title = document.querySelector('.article-title').textContent;
            const url = window.location.href;

            // 构建分享链接
            const shareUrl = encodeURIComponent(url);
            const shareTitle = encodeURIComponent(title);

            let shareLink = '';

            if (button.dataset.platform === 'twitter') {
                shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
            } else if (button.dataset.platform === 'facebook') {
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            } else if (button.dataset.platform === 'linkedin') {
                shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
            } else {
                // 复制链接到剪贴板
                navigator.clipboard.writeText(url).then(() => {
                    showToast('链接已复制到剪贴板');
                });
                return;
            }

            window.open(shareLink, '_blank', 'width=600,height=400');
        });
    });
}

// 目录导航
function initializeTableOfContents() {
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');

    if (headings.length > 0) {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = '<h3>目录</h3><ul></ul>';

        const articleContent = document.querySelector('.article-content');
        articleContent.parentNode.insertBefore(tocContainer, articleContent);

        const tocList = tocContainer.querySelector('ul');

        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.setAttribute('id', id);

            const listItem = document.createElement('li');
            const link = document.createElement('a');

            link.textContent = heading.textContent;
            link.href = `#${id}`;
            link.style.paddingLeft = heading.tagName === 'H2' ? '0' : '1rem';
            link.style.fontSize = heading.tagName === 'H2' ? '1rem' : '0.875rem';

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
    }
}

// 关于页面功能
function initializeAboutPage() {
    // 技能卡片动画
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'rotateY(180deg)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'rotateY(0)';
        });
    });

    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(item);
    });
}

// 联系页面功能
function initializeContactPage() {
    // 联系方法卡片动画
    const contactMethods = document.querySelectorAll('.contact-method');

    contactMethods.forEach((method, index) => {
        method.style.animationDelay = `${index * 0.1}s`;
        method.style.opacity = '0';
        method.style.transform = 'translateX(-20px)';

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }
            });
        }, { threshold: 0.2 });

        observer.observe(method);
    });

    // 表单字段聚焦效果
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#3b82f6';
        });

        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '';
        });
    });
}

// 搜索功能
function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');

    if (searchBtn && searchInput) {
        // 搜索按钮点击事件
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();

            if (query) {
                searchPosts(query);
            }
        });

        // 搜索框回车事件
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();

                if (query) {
                    searchPosts(query);
                }
            }
        });
    }
}

// 搜索文章
function searchPosts(query) {
    const posts = document.querySelectorAll('.post-card');
    const noResults = document.querySelector('.no-results');

    let hasResults = false;

    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

        const matches = title.includes(query.toLowerCase()) ||
                      excerpt.includes(query.toLowerCase()) ||
                      tags.some(tag => tag.includes(query.toLowerCase()));

        if (matches) {
            post.style.display = '';
            hasResults = true;
        } else {
            post.style.display = 'none';
        }
    });

    // 显示/隐藏无结果提示
    if (noResults) {
        noResults.style.display = hasResults ? 'none' : 'block';
    }
}

// 显示提示消息
function showToast(message, duration = 3000) {
    // 检查是否已有提示
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            background-color: #1e293b;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            opacity: 0;
            transition: all 0.3s ease;
        `;

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';

    // 自动隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100%)';
        toast.style.opacity = '0';
    }, duration);
}

// 实用工具函数
function debounce(func, wait) {
    let timeout;

    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;

    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('zh-CN', options);
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.message);

    // 显示友好的错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fee2e2;
            color: #991b1b;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            max-width: 80%;
        ">
            <h3 style="margin-bottom: 0.5rem;">页面加载错误</h3>
            <p style="margin-bottom: 0;">${e.message}</p>
            <button onclick="window.location.reload()" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background-color: #991b1b;
                color: white;
                border: none;
                border-radius: 0.25rem;
                cursor: pointer;
            ">刷新页面</button>
        </div>
    `;

    document.body.appendChild(errorDiv);
});

// 网络状态检测
window.addEventListener('online', function() {
    showToast('网络连接已恢复');
});

window.addEventListener('offline', function() {
    showToast('网络连接已断开，请检查网络设置');
});