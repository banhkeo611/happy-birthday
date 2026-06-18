// Cấu hình nội dung cho từng hộp quà ở đây
const rewards = {
    1: {
        title: "Mảnh ghép số 1 🧩",
        html: `<p class="reward-text">Chúc mừng sinh nhật cậu! 🎉 Tuổi mới chúc cậu luôn tràn ngập niềm vui, lúc nào cũng cười thật tươi và gặp nhiều may mắn nhé!</p>`
    },
    2: {
        title: "Kỷ niệm đáng nhớ 📸",
        html: `<p class="reward-text">Bức ảnh này nhìn đáng yêu cực kỳ luôn nè! 👇</p>
               <img src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500" class="reward-img" alt="Kỷ niệm">`
    },
    3: {
        title: "Điều ước tuổi mới 🎂✨",
        html: `<p class="reward-text">Hộp quà cuối cùng hy vọng mọi điều ước trong ngày hôm nay của cậu đều sẽ sớm trở thành hiện thực. Happy Birthday to You! ❤️</p>`
    }
};

function openGift(boxNumber) {
    // 1. Kích hoạt phát nhạc nền sinh nhật (chỉ chạy ở lần bấm hộp đầu tiên)
    const music = document.getElementById('bg-music');
    music.play().catch(err => console.log("Chờ tương tác trình duyệt", err));

    // 2. Bắn pháo hoa giấy chúc mừng
    triggerConfetti();

    // 3. Đổ dữ liệu nội dung của hộp đó vào Modal
    const rewardBody = document.getElementById('reward-body');
    rewardBody.innerHTML = `
        <h3 class="reward-title">${rewards[boxNumber].title}</h3>
        ${rewards[boxNumber].html}
    `;

    // 4. Hiển thị Modal lên màn hình
    document.getElementById('reward-modal').classList.remove('hidden');

    // 5. Ẩn hộp quà vừa bấm ngoài màn hình chính để không bấm lại được nữa
    document.querySelector(`.box${boxNumber}`).style.display = 'none';
}

function closeModal() {
    document.getElementById('reward-modal').classList.add('hidden');
}

function triggerConfetti() {
    // Hiệu ứng pháo hoa bắn từ dưới lên giữa màn hình
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}