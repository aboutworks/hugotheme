
// function shareToPinterest(imageUrl) {
//   console.log(imageUrl)
//   // 要分享的页面的 URL
//   var pageUrl = window.location.href;
//   // Pinterest 分享的 URL
//   var pinterestUrl = "https://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(pageUrl) + "&media=" + encodeURIComponent(imageUrl);

//   // 打开新窗口分享到 Pinterest
//   window.open(pinterestUrl, "_blank");
// }

// function shareToHuaban(title, imageUrl, description) {
//   // 花瓣网的分享 URL 模板
//   const huabanShareUrl = `http://huaban.com/bookmarklet/?media=${encodeURIComponent(imageUrl)}&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

//   // 打开分享窗口
//   window.open(huabanShareUrl, '_blank', 'width=600,height=400');
// }

// function shareToReddit(url, title) {
//   const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
//   window.open(redditShareUrl, '_blank', 'width=600,height=400');
// }


// // 监听 DOMContentLoaded 事件，确保 DOM 完全加载后再执行代码,滚动时更改当前标题的样式
// document.addEventListener("DOMContentLoaded", function () {
//   const tocLinks = document.querySelectorAll('#toc-nav a');
//   const sections = Array.from(tocLinks).map(link => {
//     const id = link.getAttribute('href').substring(1);
//     return document.getElementById(id);
//   }).filter(Boolean);

//   const observer = new IntersectionObserver(
//     entries => {
//       entries.forEach(entry => {
//         const id = entry.target.id;
//         const activeLink = document.querySelector(`#toc-nav a[href="#${id}"]`);
//         const activeHeading = document.getElementById(id); // 正文标题元素

//         // 清除所有 active 状态
//         tocLinks.forEach(link => {
//           link.classList.remove('active');
//         });

//         sections.forEach(section => {
//           if (section) section.classList.remove('active-heading');
//         });

//         // 添加 active 状态
//         if (entry.isIntersecting && activeLink && activeHeading) {
//           activeLink.classList.add('active');
//           activeHeading.classList.add('active-heading');
//         }
//       });
//     },
//     { rootMargin: '-10% 0px -60% 0px' } // 控制触发位置
//   );

//   sections.forEach(section => {
//     if (section) observer.observe(section);
//   });

//   setTheme(getCurrentTheme());

//   const btn = document.getElementById('theme-toggle');
//   if (btn) {
//     btn.addEventListener('click', toggleTheme);
//   }


// });

// // 切换主题函数 // 获取当前主题：优先从 localStorage，否则用后端传来的默认值
// function getCurrentTheme() {
//   return localStorage.getItem('theme') || "light"; // 默认主题为 light
// }

// function setTheme(theme) {
//   document.body.className = ''; // 清除旧类
//   document.body.classList.add(theme);
// }

// function toggleTheme() {
//   const current = getCurrentTheme();
//   const next = current === 'light' ? 'dark' : 'light';
//   setTheme(next);
//   localStorage.setItem('theme', next);
// }



//   function toggleTags() {
//     const tagList = document.getElementById('tagList');
//     const isCollapsed = tagList.getAttribute('data-collapsed') === 'true';
//     const btn = document.getElementById('toggleTagBtn');

//     if (isCollapsed) {
//       // 展开：移除 data-collapsed 属性，并显示所有项
//       tagList.setAttribute('data-collapsed', 'false');
//       const hiddenItems = tagList.querySelectorAll('.tag-hidden');
//       hiddenItems.forEach(item => item.style.display = 'list-item');
//       btn.textContent = '收起 ▲';
//     } else {
//       // 收起：隐藏超出部分
//       tagList.setAttribute('data-collapsed', 'true');
//       const hiddenItems = tagList.querySelectorAll('.tag-hidden');
//       hiddenItems.forEach(item => item.style.display = 'none');
//       btn.textContent = '展开更多 ▼';
//     }
//   }


  