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

    // 计算从2022.1.1到现在的天数
    function countDays() {
        const startDate = new Date('2022-01-01');
        const currentDate = new Date();
        
        // 计算时间差（毫秒）
        const timeDiff = currentDate - startDate;
        
        // 转换为天数
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        return daysDiff;
    }

    // 更新页面上的统计数据
    function updateStats() {
        // 获取统计元素
        const picturesElement = document.querySelector('.banner-column-left');
        const categoriesElement = document.querySelector('.banner-column-center');
        const daysElement = document.querySelector('.banner-column-right');
        
        // 计算统计数据
        const picturesCount = countPictures();
        const categoriesCount = countCategories();
        const daysCount = countDays();
        
        // 更新HTML内容
        if (picturesElement) {
            picturesElement.innerHTML = picturesCount + '<p>Pictures</p>';
        }
        
        if (categoriesElement) {
            categoriesElement.innerHTML = categoriesCount + '<p>Categories</p>';
        }
        
        if (daysElement) {
            daysElement.innerHTML = daysCount + '<p>Days</p>';
        }
    }
    
    // 执行更新
    updateStats();
});