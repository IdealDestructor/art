// 动态计算网站统计数据
document.addEventListener('DOMContentLoaded', function() {
    // 计算图片总数 - 统计grid-item元素的数量
    function countPictures() {
        const gridItems = document.getElementsByClassName('grid-item');
        return gridItems.length;
    }

    // 计算类别总数 - 获取不同的类别
    function countCategories() {
        // 获取所有grid-item的类名，提取不同的类别
        const gridItems = document.getElementsByClassName('grid-item');
        const categories = new Set();
        
        for (let i = 0; i < gridItems.length; i++) {
            // 获取类名，通常是类似"grid-item SCENE"这样的格式
            const classNames = gridItems[i].className.split(' ');
            // 第二个类名通常是类别名
            if (classNames.length > 1) {
                categories.add(classNames[1]);
            }
        }
        
        return categories.size;
    }

    // 计算不同地点的数量
    function countLocations() {
        const gridItems = document.getElementsByClassName('grid-item');
        const locations = new Set();
        
        for (let i = 0; i < gridItems.length; i++) {
            // 获取地点信息
            const location = gridItems[i].getAttribute('data-location');
            // 只统计有效的地点信息（非空且非undefined）
            if (location && location.trim() !== "") {
                locations.add(location);
            }
        }
        
        return locations.size;
    }

    // 更新页面上的统计数据
    function updateStats() {
        // 获取统计元素
        const picturesElement = document.querySelector('.banner-column-left');
        const categoriesElement = document.querySelector('.banner-column-center');
        const locationsElement = document.querySelector('.banner-column-right');
        
        // 计算统计数据
        const picturesCount = countPictures();
        const categoriesCount = countCategories();
        const locationsCount = countLocations();
        
        // 更新HTML内容
        if (picturesElement) {
            picturesElement.innerHTML = picturesCount + '<p>Pictures</p>';
        }
        
        if (categoriesElement) {
            categoriesElement.innerHTML = categoriesCount + '<p>Categories</p>';
        }
        
        if (locationsElement) {
            locationsElement.innerHTML = locationsCount + '<p>Locations</p>';
        }
    }
    
    // 执行更新
    updateStats();
});