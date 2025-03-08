// 图片弹窗功能
document.addEventListener("DOMContentLoaded", function () {
  // 创建弹窗元素
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.innerHTML = `
        <div class="modal-container">
            <button class="modal-close"></button>
            <img class="modal-image" src="" alt="放大图片">
            <div class="modal-title"></div>
        </div>
    `;
  document.body.appendChild(modalOverlay);

  // 获取所有网格项中的图片
  const gridItems = document.querySelectorAll(".grid-item");

  // 为每个网格项添加点击事件
  gridItems.forEach((item) => {
    const img = item.querySelector("img");
    const itemInfo = item.querySelector(".item-info");
    const title = item.querySelector(".title")
      ? item.querySelector(".title").textContent
      : "";

    // 为图片添加点击事件
    img.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      openModal(this.src, title);
    });

    // 为item-info元素也添加点击事件
    if (itemInfo) {
      itemInfo.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(img.src, title);
      });
    }
  });

  // 打开弹窗函数
  function openModal(imgSrc, title) {
    // 设置弹窗图片源和标题
    const modalImage = modalOverlay.querySelector(".modal-image");
    const modalTitle = modalOverlay.querySelector(".modal-title");

    modalImage.src = imgSrc;
    modalTitle.textContent = title;

    // 显示弹窗
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // 防止背景滚动
  }

  // 关闭按钮点击事件
  const closeButton = modalOverlay.querySelector(".modal-close");
  closeButton.addEventListener("click", closeModal);

  // 点击弹窗外区域关闭
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // 关闭弹窗函数
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto"; // 恢复背景滚动
  }

  // ESC键关闭弹窗
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});
