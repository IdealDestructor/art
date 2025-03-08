/**
 * 图片懒加载功能
 * 使用IntersectionObserver API检测图片是否进入视口
 * 只有当图片进入视口时才加载图片
 */
document.addEventListener("DOMContentLoaded", function () {
  // 检查浏览器是否支持IntersectionObserver
  if ("IntersectionObserver" in window) {
    // 获取所有图片元素
    const images = document.querySelectorAll(".grid-item img");

    // 创建占位图URL（可以是一个1x1像素的透明图片）
    const placeholderSrc =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    // 为每个图片设置data-src属性，并将src设为占位图
    images.forEach((img) => {
      // 保存原始图片URL到data-src属性
      img.setAttribute("data-src", img.src);
      // 设置src为占位图
      img.src = placeholderSrc;
      // 添加懒加载标记类
      img.classList.add("lazy");
    });

    // 创建IntersectionObserver实例
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // 当图片进入视口
          if (entry.isIntersecting) {
            const img = entry.target;
            // 从data-src获取真实图片URL
            const src = img.getAttribute("data-src");

            // 设置图片src为真实URL
            if (src) {
              img.src = src;
              // 图片加载完成后移除懒加载标记类
              img.onload = function () {
                img.classList.remove("lazy");
                var myEvent = new Event("resize");
                window.dispatchEvent(myEvent);
              };
            }

            // 图片已处理，取消观察
            observer.unobserve(img);
          }
        });
      },
      {
        // 设置根元素为null，即视口
        root: null,
        // 设置根元素的边距，可以提前加载
        rootMargin: "0px 0px 200px 0px",
        // 设置阈值，当图片有0%进入视口时触发回调
        threshold: 0,
      }
    );

    // 开始观察所有图片
    images.forEach((img) => {
      observer.observe(img);
    });

    // 处理动态加载的图片
    // 当使用AJAX加载更多内容时，需要对新加载的图片应用懒加载
    function handleDynamicImages() {
      const newImages = document.querySelectorAll(".grid-item img:not(.lazy)");
      newImages.forEach((img) => {
        img.setAttribute("data-src", img.src);
        img.src = placeholderSrc;
        img.classList.add("lazy");
        observer.observe(img);
      });
    }

    // 监听AJAX加载完成事件
    $(document).ajaxSuccess(function () {
      setTimeout(handleDynamicImages, 100); // 延迟一点时间确保DOM已更新
    });
  } else {
    // 如果浏览器不支持IntersectionObserver，则不进行懒加载处理
    console.log("浏览器不支持IntersectionObserver API，无法使用懒加载功能");
  }
});
