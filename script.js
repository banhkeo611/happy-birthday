// Biến toàn cục để quản lý tiến trình chữ chạy và đếm số hộp đã mở
let typingTimeout;
let openedCount = 0;

// Cấu hình lại dữ liệu: Tách riêng phần text (lời chúc) và phần img (ảnh nếu có)
const rewards = {
    1: {
        title: "Mảnh ghép số 1 🧩",
        text: "Chúc mừng sinh nhật bạn tôi nha! 🎉 Tuổi mới chúc bạn luôn tràn ngập niềm vui, lúc nào cũng cười thật tươi nè và gặp nhiều may mắn nhé!",
        img: null // Hộp này chỉ có chữ
    },
    2: {
        title: "Kỷ niệm đáng nhớ 📸",
        text: "Bức ảnh này ôn lại kỷ niệm xíu nè. Chơi game gặp toàn thần đồng không cay mới lạ  Đã thua rồi còn gì!👇",
        img: "thang.jpg" // Vừa có chữ chạy vừa có ảnh ở dưới
    },
    3: {
        title: "Lời chúc ý nghĩa 🌟",
        text: "Chúc bạn tuổi mới vạn sự như ý, học tập luôn đều suôn sẻ, và đạt nhiều thành quả xứng đáng với công sức bạn bỏ ra nha!",
        img: null
    },
    4: {
        title: "Khoảnh khắc chứng minh 🥰",
        text: "Bất ngờ chưa! Chơi game để giải trí mà nhờ cứ vui là cứ chơi mà thắng như này nữa thế lại mà hay. Đủ wow rồi đó",
        img: "thang21.jpg"
    },
    5: {
        title: "Chiến thắng nào! 🏆",
        text: "Bạn tôi mà lị cứ luôn làm gì bạn thích nhé không sợ gì cả nha! Đca mà nên vậy làm gương cho thằng đệ đi theo luôn nè!",
        img: "thang3.jpg"
    },
    6: {
        title: "Nụ cười tỏa nắng ✨",
        text: " Chúc bạn có một ngày sinh nhật xứng đáng luôn nhiều sức khỏe và rạng rỡ như thế nhá! Cười nhiều hơn nữa và luôn hạnh phúc với gia đình nha!",
        img: null
    },
    7: {
        title: "Điều ước tuổi mới 🎂❤️",
        text: "Hộp quà cuối cùng hy vọng mọi điều ước trong ngày hôm nay của bạn đều sẽ sớm trở thành hiện thực. Happy Birthday to You!",
        img: null
    }
};

function openGift(boxNumber) {
    const music = document.getElementById('bg-music');
    music.play().catch(err => console.log("Trình duyệt chờ tương tác", err));

    triggerConfetti();

    const reward = rewards[boxNumber];
    const rewardBody = document.getElementById('reward-body');
    
    // Dừng hiệu ứng chữ chạy cũ nếu có trước đó
    clearTimeout(typingTimeout);

    // 1. Hiển thị Tiêu đề hộp quà trước
    rewardBody.innerHTML = `<h3 class="reward-title">${reward.title}</h3>`;

    // 2. Tạo thẻ <p> chứa hiệu ứng chữ chạy
    const pElement = document.createElement('p');
    pElement.className = 'reward-text typing-effect';
    rewardBody.appendChild(pElement);

    // 3. Chạy hiệu ứng gõ chữ cho lời chúc
    let index = 0;
    function typeWriter() {
        if (index < reward.text.length) {
            pElement.innerHTML += reward.text.charAt(index);
            index++;
            typingTimeout = setTimeout(typeWriter, 40); // Tốc độ gõ chữ (40ms)
        } else {
            // Khi chữ đã chạy xong, nếu hộp quà này có ảnh -> hiển thị ảnh ra ngay phía dưới mượt mà
            if (reward.img) {
                const imgElement = document.createElement('img');
                imgElement.src = reward.img;
                imgElement.className = 'reward-img animate-fade-in';
                imgElement.alt = 'Kỷ niệm';
                rewardBody.appendChild(imgElement);
            }
        }
    }
    typeWriter();

    // 4. Hiển thị Pop-up lên màn hình
    document.getElementById('reward-modal').classList.remove('hidden');
    
    // 5. Ẩn hộp quà ngoài màn hình chính và tăng biến đếm
    const currentBox = document.querySelector(`.box${boxNumber}`);
    if (currentBox && currentBox.style.display !== 'none') {
        currentBox.style.display = 'none';
        openedCount++;
    }
}

function closeModal() {
    document.getElementById('reward-modal').classList.add('hidden');

    // Kiểm tra nếu đã mở hết 7 hộp quà thì hiện dòng chữ chúc mừng cuối cùng
    if (openedCount === 7) {
        document.getElementById('final-wish').classList.remove('hidden');
        document.querySelector('.guide-title').style.display = 'none';

        // Bắn pháo hoa liên tục hoành tráng
        let duration = 4 * 1000;
        let end = Date.now() + duration;

        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
}

function triggerConfetti() {
    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
    });
}
