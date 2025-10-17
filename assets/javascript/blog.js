console.log('Loading blog.js...');


// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function () {
  // 初始化AOS动画库
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // 初始化Markdown编辑器
  // initMarkdownEditor();

  // 初始化阅读设置
  initReadingSettings();

  // 初始化事件监听
  initEventListeners();

  // 初始化阅读进度条
  // initProgressBar();

  // 检查并应用保存的阅读设置
  // loadSavedSettings();


});


// 初始化阅读设置
function initReadingSettings() {
  // 布局设置
  const layoutButtons = document.querySelectorAll('.layout-btn');
  layoutButtons.forEach(button => {
    button.addEventListener('click', function () {
      const layout = this.getAttribute('data-layout');
      if (layout === 'single') {
        document.body.classList.remove('layout-card');
      } else {
        document.body.classList.add('layout-card');
      }
      if (document.getElementById('article-content')) {
        setLayout(layout);
      }

      // 更新按钮样式
      layoutButtons.forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      this.classList.remove('bg-gray-200', 'text-gray-700');
      this.classList.add('bg-blue-500', 'text-white');
    });
  });

  // 字体设置
  const fontButtons = document.querySelectorAll('.font-btn');
  fontButtons.forEach(button => {
    button.addEventListener('click', function () {
      const font = this.getAttribute('data-font');
      setFont(font);

      // 更新按钮样式
      fontButtons.forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      this.classList.remove('bg-gray-200', 'text-gray-700');
      this.classList.add('bg-blue-500', 'text-white');
    });
  });

  // 字体大小设置
  const fontSizeSlider = document.getElementById('font-size-slider');
  const fontSizeDecrease = document.getElementById('font-size-decrease');
  const fontSizeIncrease = document.getElementById('font-size-increase');

  fontSizeSlider.addEventListener('input', function () {
    setFontSize(this.value);
  });

  fontSizeDecrease.addEventListener('click', function () {
    const currentValue = parseInt(fontSizeSlider.value);
    if (currentValue > 1) {
      fontSizeSlider.value = currentValue - 1;
      setFontSize(fontSizeSlider.value);
    }
  });

  fontSizeIncrease.addEventListener('click', function () {
    const currentValue = parseInt(fontSizeSlider.value);
    if (currentValue < 4) {
      fontSizeSlider.value = currentValue + 1;
      setFontSize(fontSizeSlider.value);
    }
  });

  // 行高设置
  const lineHeightButtons = document.querySelectorAll('.line-height-btn');
  lineHeightButtons.forEach(button => {
    button.addEventListener('click', function () {
      const lineHeight = this.getAttribute('data-line-height');
      setLineHeight(lineHeight);

      // 更新按钮样式
      lineHeightButtons.forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });
      this.classList.remove('bg-gray-200', 'text-gray-700');
      this.classList.add('bg-blue-500', 'text-white');
    });
  });

  // 主题设置
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(button => {
    button.addEventListener('click', function () {
      toggleTheme();
    });
  });

  // 主题切换函数（可绑定到按钮点击事件）
  function toggleTheme() {
    const html = document.documentElement;
    // 切换 html 标签的 dark 类（控制所有 dark: 前缀样式生效）
    html.classList.toggle('dark');
    // 可选：将主题偏好存储到本地存储
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  // 初始化：读取本地存储的主题偏好
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  });

}
// 主题切换
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', function () {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  setTheme(newTheme);

  // 更新主题按钮样式
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.classList.remove('bg-blue-500', 'text-white');
    btn.classList.add('bg-gray-200', 'text-gray-700');

    if (btn.getAttribute('data-theme') === newTheme) {
      btn.classList.remove('bg-gray-200', 'text-gray-700');
      btn.classList.add('bg-blue-500', 'text-white');
    }
  });
});

// 设置布局
function setLayout(layout) {
  const articleContent = document.getElementById('article-content');

  if (!articleContent) return;
  // 移除所有布局类
  articleContent.classList.remove('layout-single', 'layout-double', 'layout-card');

  // 添加选中的布局类
  articleContent.classList.add('layout-' + layout);

  // 保存设置
  saveSetting('layout', layout);
}

// 设置字体
function setFont(font) {
  const articleContent = document.getElementById('article-content');
  if (!articleContent) return;
  // 移除所有字体类
  articleContent.classList.remove('font-sans', 'font-serif', 'font-mono');

  // 添加选中的字体类
  articleContent.classList.add('font-' + font);

  // 保存设置
  saveSetting('font', font);
}

// 设置字体大小
function setFontSize(size) {
  const articleContent = document.getElementById('article-content');
  if (!articleContent) return;
  // 移除所有字体大小类
  articleContent.classList.remove('font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl');

  // 根据大小值添加对应的类
  const sizeClasses = ['', 'font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl'];
  articleContent.classList.add(sizeClasses[size]);

  // 保存设置
  saveSetting('fontSize', size);
}

// 设置行高
function setLineHeight(lineHeight) {
  const articleContent = document.getElementById('article-content');
  if (!articleContent) return;
  // 移除所有行高类
  articleContent.classList.remove('line-height-tight', 'line-height-normal', 'line-height-relaxed');

  // 添加选中的行高类
  articleContent.classList.add('line-height-' + lineHeight);

  // 保存设置
  saveSetting('lineHeight', lineHeight);
}

// // 设置主题
// function setTheme(theme) {
//   const html = document.documentElement;
//   const body = document.getElementById('app-body');
//   const header = document.getElementById('main-header');
//   const themeIcon = document.getElementById('theme-icon');

//   // 移除所有主题类
//   body.classList.remove('bg-gray-50', 'bg-amber-50', 'bg-gray-900');
//   body.classList.remove('text-gray-800', 'text-gray-700', 'text-gray-100');
//   html.classList.remove('dark');

//   // 根据主题设置样式
//   if (theme === 'dark') {
//     html.classList.add('dark');
//     body.classList.add('bg-gray-900', 'text-gray-100');
//     themeIcon.classList.remove('fa-moon-o');
//     themeIcon.classList.add('fa-sun-o');

//     // 调整编辑器主题
//     if (window.simplemde) {
//       window.simplemde.codemirror.setOption('theme', 'monokai');
//     }
//   } else if (theme === 'sepia') {
//     body.classList.add('bg-amber-50', 'text-gray-700');
//     themeIcon.classList.remove('fa-sun-o');
//     themeIcon.classList.add('fa-moon-o');

//     // 调整编辑器主题
//     if (window.simplemde) {
//       window.simplemde.codemirror.setOption('theme', 'eclipse');
//     }
//   } else {
//     body.classList.add('bg-gray-50', 'text-gray-800');
//     themeIcon.classList.remove('fa-sun-o');
//     themeIcon.classList.add('fa-moon-o');

//     // 调整编辑器主题
//     if (window.simplemde) {
//       window.simplemde.codemirror.setOption('theme', 'default');
//     }
//   }

//   // 更新阅读卡片背景色
//   const readingCards = document.querySelectorAll('.reading-card');
//   readingCards.forEach(card => {
//     if (theme === 'dark') {
//       card.classList.remove('bg-white', 'bg-amber-100');
//       card.classList.add('bg-gray-800');
//     } else if (theme === 'sepia') {
//       card.classList.remove('bg-white', 'bg-gray-800');
//       card.classList.add('bg-amber-100');
//     } else {
//       card.classList.remove('bg-amber-100', 'bg-gray-800');
//       card.classList.add('bg-white');
//     }
//   });

//   // 保存设置
//   saveSetting('theme', theme);
// }

// 保存设置到localStorage
function saveSetting(key, value) {
  try {
    localStorage.setItem('readingSettings_' + key, value);
  } catch (e) {
    console.error('无法保存设置:', e);
  }
}

// 加载保存的设置
function loadSavedSettings() {
  // 布局设置
  const savedLayout = localStorage.getItem('readingSettings_layout');
  if (savedLayout) {
    setLayout(savedLayout);

    // 更新按钮样式
    const layoutButtons = document.querySelectorAll('.layout-btn');
    layoutButtons.forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-gray-200', 'text-gray-700');

      if (btn.getAttribute('data-layout') === savedLayout) {
        btn.classList.remove('bg-gray-200', 'text-gray-700');
        btn.classList.add('bg-blue-500', 'text-white');
      }
    });
  }

  // 字体设置
  const savedFont = localStorage.getItem('readingSettings_font');
  if (savedFont) {
    setFont(savedFont);

    // 更新按钮样式
    const fontButtons = document.querySelectorAll('.font-btn');
    fontButtons.forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-gray-200', 'text-gray-700');

      if (btn.getAttribute('data-font') === savedFont) {
        btn.classList.remove('bg-gray-200', 'text-gray-700');
        btn.classList.add('bg-blue-500', 'text-white');
      }
    });
  }

  // 字体大小设置
  const savedFontSize = localStorage.getItem('readingSettings_fontSize');
  if (savedFontSize) {
    const fontSizeSlider = document.getElementById('font-size-slider');
    fontSizeSlider.value = savedFontSize;
    setFontSize(savedFontSize);
  }

  // 行高设置
  const savedLineHeight = localStorage.getItem('readingSettings_lineHeight');
  if (savedLineHeight) {
    setLineHeight(savedLineHeight);

    // 更新按钮样式
    const lineHeightButtons = document.querySelectorAll('.line-height-btn');
    lineHeightButtons.forEach(btn => {
      btn.classList.remove('bg-blue-500', 'text-white');
      btn.classList.add('bg-gray-200', 'text-gray-700');

      if (btn.getAttribute('data-line-height') === savedLineHeight) {
        btn.classList.remove('bg-gray-200', 'text-gray-700');
        btn.classList.add('bg-blue-500', 'text-white');
      }
    });
  }

  // 主题设置
   const savedTheme = localStorage.getItem('readingSettings_theme');
   if (savedTheme) {
     setTheme(savedTheme);

     // 更新按钮样式
     const themeButtons = document.querySelectorAll('.theme-btn');
     themeButtons.forEach(btn => {
       btn.classList.remove('bg-blue-500', 'text-white');
       btn.classList.add('bg-gray-200', 'text-gray-700');

       if (btn.getAttribute('data-theme') === savedTheme) {
         btn.classList.remove('bg-gray-200', 'text-gray-700');
         btn.classList.add('bg-blue-500', 'text-white');
       }
     });
   }

   //阅读进度
   const savedProgress = localStorage.getItem('readingProgress');
   if (savedProgress && savedProgress > 0) {
     // 询问用户是否要继续阅读
     // if (confirm('是否要继续上次的阅读进度？')) {
     //   const docHeight = document.body.offsetHeight - window.innerHeight;
     //   const scrollTop = (savedProgress / 100) * docHeight;

     //   window.scrollTo({
     //     top: scrollTop,
     //     behavior: 'smooth'
     //   });
     // }
   }
}

// 图片预览功能
function openModal(imageSrc) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');

  modal.style.display = 'flex';
  modalImg.src = imageSrc;

  // 禁止背景滚动
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  modal.style.display = 'none';

  // 恢复背景滚动
  document.body.style.overflow = 'auto';
}

// 点击模态框外部关闭
window.onclick = function (event) {
  const modal = document.getElementById('image-modal');
  if (event.target === modal) {
    closeModal();
  }
}

// 键盘导航
document.addEventListener('keydown', function (event) {
  const modal = document.getElementById('image-modal');

  // 按ESC键关闭模态框
  if (event.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }

  // 按箭头键滚动页面
  if (event.key === 'ArrowUp') {
    window.scrollBy({
      top: -100,
      behavior: 'smooth'
    });
  } else if (event.key === 'ArrowDown') {
    window.scrollBy({
      top: 100,
      behavior: 'smooth'
    });
  }
}
);

