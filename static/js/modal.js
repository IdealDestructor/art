// 图片弹窗功能
document.addEventListener("DOMContentLoaded", function () {
  // 创建弹窗元素
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";
  modalOverlay.innerHTML = `
        <div class="modal-container">
            <button class="modal-close"></button>
            <button class="modal-prev">&#10094;</button>
            <button class="modal-next">&#10095;</button>
            <img class="modal-image" src="" alt="放大图片">
            <div class="modal-title"></div>
            <div class="modal-location"></div>
        </div>
    `;
  document.body.appendChild(modalOverlay);

  // 获取所有网格项中的图片
  const gridItems = document.querySelectorAll(".grid-item");
  // 存储所有图片信息的数组
  const allImages = [];

  // 为每个网格项添加点击事件并收集图片信息
  gridItems.forEach((item) => {
    const img = item.querySelector("img");
    const itemInfo = item.querySelector(".item-info");
    const title = item.querySelector(".title")
      ? item.querySelector(".title").textContent
      : "";
    // 获取地点信息，如果没有则设为空字符串
    const location = item.getAttribute("data-location") || "";

    // 将图片信息存入数组
    allImages.push({
      src: img.src,
      title: title,
      location: location,
    });

    // 为图片添加点击事件
    img.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      // 找到当前图片在数组中的索引
      const index = allImages.findIndex((image) => image.src === this.src);
      openModal(index);
    });
  });

  // 当前显示的图片索引
  let currentImageIndex = 0;

  // 打开弹窗函数
  function openModal(index) {
    // 验证索引是否有效
    if (index < 0 || index >= allImages.length || !allImages[index]) {
      console.error("无效的图片索引:", index);
      return;
    }

    currentImageIndex = index;
    updateModalContent();

    // 显示弹窗
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // 防止背景滚动
  }

  // 更新弹窗内容
  function updateModalContent() {
    // 确保当前索引有效
    if (currentImageIndex < 0 || currentImageIndex >= allImages.length) {
      console.error("更新模态框内容时索引无效:", currentImageIndex);
      return;
    }

    const imageData = allImages[currentImageIndex];
    // 确保imageData存在且有src属性
    if (!imageData || !imageData.src) {
      console.error("图片数据无效:", imageData);
      return;
    }

    const modalImage = modalOverlay.querySelector(".modal-image");
    const modalTitle = modalOverlay.querySelector(".modal-title");
    const modalLocation = modalOverlay.querySelector(".modal-location");
    const prevButton = modalOverlay.querySelector(".modal-prev");
    const nextButton = modalOverlay.querySelector(".modal-next");

    // 设置图片、标题和地点
    modalImage.src = imageData.src;
    modalTitle.textContent = imageData.title || "";

    // 设置地点信息
    if (imageData.location && imageData.location.trim() !== "") {
      modalLocation.innerHTML = `<img src="static/img/address-min.svg" class="location-icon"> ${imageData.location}`;
      modalLocation.style.display = "block";
    } else {
      modalLocation.style.display = "none";
    }

    // 处理导航按钮显示状态
    prevButton.style.display = currentImageIndex > 0 ? "block" : "none";
    nextButton.style.display =
      currentImageIndex < allImages.length - 1 ? "block" : "none";
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

  // 上一张按钮点击事件
  const prevButton = modalOverlay.querySelector(".modal-prev");
  prevButton.addEventListener("click", function (e) {
    e.stopPropagation();
    if (currentImageIndex > 0) {
      currentImageIndex--;
      updateModalContent();
    }
  });

  // 下一张按钮点击事件
  const nextButton = modalOverlay.querySelector(".modal-next");
  nextButton.addEventListener("click", function (e) {
    e.stopPropagation();
    if (currentImageIndex < allImages.length - 1) {
      currentImageIndex++;
      updateModalContent();
    }
  });

  // 关闭弹窗函数
  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto"; // 恢复背景滚动
  }

  // 键盘导航
  document.addEventListener("keydown", function (e) {
    if (modalOverlay.classList.contains("active")) {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft" && currentImageIndex > 0) {
        currentImageIndex--;
        updateModalContent();
      } else if (
        e.key === "ArrowRight" &&
        currentImageIndex < allImages.length - 1
      ) {
        currentImageIndex++;
        updateModalContent();
      }
    }
  });
});
