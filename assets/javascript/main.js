
function shareToPinterest(imageUrl) {
    console.log(imageUrl)
    // 要分享的页面的 URL
    var pageUrl = window.location.href;
    // Pinterest 分享的 URL
    var pinterestUrl = "https://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(pageUrl) + "&media=" + encodeURIComponent(imageUrl);

    // 打开新窗口分享到 Pinterest
    window.open(pinterestUrl, "_blank");
}

function shareToHuaban(title, imageUrl, description) {
  // 花瓣网的分享 URL 模板
  const huabanShareUrl = `http://huaban.com/bookmarklet/?media=${encodeURIComponent(imageUrl)}&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  // 打开分享窗口
  window.open(huabanShareUrl, '_blank', 'width=600,height=400');
}

function shareToReddit(url, title) {
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
  window.open(redditShareUrl, '_blank', 'width=600,height=400');
}