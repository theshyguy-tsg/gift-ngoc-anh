// --- DỮ LIỆU ---
//var letterContent = "Alo alo, Tổng đài Matcha xin nghe 🌿📞<br><br>Phát hiện một bé Ngọc Anh đang cần nạp Vitamin vui vẻ! 🚨 Bức thư này được lập trình để xóa tan mọi mệt mỏi và buff 1000% sự yêu đời cho cậu đó.<br><br>Cảm ơn cậu vì đã luôn là một cô gái Song Tử tuyệt vời và đáng iu. Chẳng cần lý do gì to tát, tớ chỉ muốn nói là tớ mê cậu xỉu up xỉu down luôn á!<br><br>Mãi keo, mãi mận, mãi bên nhao nhé! 💚🥰";

var letterContent = "Gửi Ngọc Anh! Tổng đài Matcha xin nghe 🌿📞<br><br>Phát hiện bé Ngọc Anh đang ở những ngày 'nhạy cảm' và cần nạp gấp chút ngọt ngào từ matcha nè! 🚨 Biết là mấy nay em mệt mỏi, đau lưng và khó chịu đúng hong?<br><br>Bức thư này được lập trình để làm 'túi chườm' 37 độ chạy bằng cơm cho em đây. Nhiệm vụ của bé là cứ việc nằm nghỉ, nhõng nhẽo, còn cả thế giới cứ để anh lo!<br><br>Uống miếng trà ấm cho đỡ đau rùi cười lên cái coi nào. Mãi keo, mãi bên nhao nhé! Mong rằng tấm chân thành này đủ để sưởi ấm thế giới của em nhaa 🍵💚<br><br>Shipper gửi: Công Khiêm 🛵💨";


var durationWrite = 20;

// Cập nhật danh sách câu nói rơi xuống (Thêm mấy câu "xàm" vào)
const loveQuotes = [
    "Iu Ngọc Anh nhìu ❤️", 
    "Hết giận nha 🥺", 
    "Matcha tới bắt em kìa 🍵",  // Mới thêm
    "Ăn thịt em đó 😈",        // Mới thêm
    "Chạy đâu cho thoát 🏃‍♂️",    // Mới thêm
    "Bắt được là hôn nha 💋",    // Mới thêm
    "Ngon thì đứng lại 😝",      // Mới thêm
    "Matcha chữa lành 🌿", 
    "Love you 💚", 
    "Mau hồi sức nha ✨",
    "Ôm cái nè 🙆‍♂️"
];
let collectedCount = 0;
const targetCount = 6;
let gameInterval;
let isGameWon = false;
let isLetterWritten = false; // Biến check đã viết thư chưa

// --- ÂM THANH ---
function playMusic() {
    var audio = document.getElementById("sound");
    audio.play().catch(() => {});
}

// --- INIT ---
window.addEventListener("load", () => {
    createStars();
});

// --- PHASE 1 -> PHASE 2: TỪ INTRO SANG CHOICE ---
document.getElementById("introBtn").addEventListener("click", () => {
    document.getElementById("introLayer").classList.add("hidden");
    
    // --- SỬA LỖI MÂY Ở ĐÂY: Ẩn đám mây đi để không che game ---
    document.querySelector(".boxCloud").style.opacity = "0";
    document.querySelector(".boxCloud").style.transform = "translateY(100px)";
    // ---------------------------------------------------------

    document.getElementById("choiceLayer").classList.remove("hidden");
    playMusic();
});

// --- LOGIC NÚT "KHÔNG CHỊU ĐỌC" (Thay đổi nội dung) ---
var btnNo = document.getElementById("noReadBtn");
var countNo = 0;

btnNo.addEventListener("click", () => {
    countNo++;
    if (countNo === 1) {
        btnNo.innerText = "Vẫn hong chịu đọc!";
    } else if (countNo === 2) {
        btnNo.innerText = "Đừng mà, năn nỉ á 🥺";
        // Dịch chuyển nhẹ để tạo cảm giác rung lắc
        btnNo.style.transform = "translate(10px, 10px)";
        setTimeout(() => { btnNo.style.transform = "translate(0, 0)"; }, 200);
    } else if (countNo === 3) {
        btnNo.innerText = "Thôi đọc đi mừ...";
        btnNo.classList.add("disabled"); // Làm mờ và không bấm được nữa
    }
});

// --- PHASE 2 -> PHASE 3: VÀO ĐỌC THƯ & CHƠI GAME ---
document.getElementById("yesReadBtn").addEventListener("click", () => {
    document.getElementById("choiceLayer").classList.add("hidden");
    document.getElementById("letterLayer").classList.remove("hidden");
    
    // Mở thiệp tự động lần đầu
    setTimeout(() => {
        document.querySelector(".cardValentine").classList.add("open");
        if (!isLetterWritten) {
            effectWrite();
            isLetterWritten = true;
        }
    }, 500);

    // Bắt đầu game săn Matcha
    setTimeout(startMatchaHunt, 1000);
});

// --- LOGIC ĐÓNG/MỞ THIỆP ---
document.querySelector(".cardValentine").addEventListener("click", function(e) {
    // Ngăn chặn việc click vào nút nhận quà thì đóng thiệp
    if (e.target.id === 'receiveGiftBtn') return;
    
    this.classList.toggle("open");
});

// --- LOGIC GAME SĂN MATCHA ---
function startMatchaHunt() {
    gameInterval = setInterval(() => {
        if (!isGameWon) spawnMatchaCup();
    }, 1500); 
}

function spawnMatchaCup() {
    const container = document.getElementById('gameArea');
    const cup = document.createElement('img');
    cup.src = './img/deco1.png';
    cup.classList.add('matcha-item');
    
    // Random vị trí 2 bên (Tránh che thiệp ở giữa)
    let x, y;
    if (Math.random() > 0.5) {
        x = Math.random() * (window.innerWidth * 0.2); // 20% bên trái
    } else {
        x = window.innerWidth * 0.8 + Math.random() * (window.innerWidth * 0.2) - 60; // 20% bên phải
    }
    y = Math.random() * (window.innerHeight - 100);

    cup.style.left = `${x}px`;
    cup.style.top = `${y}px`;
    
    cup.onclick = function(e) {
        e.stopPropagation(); // Không ảnh hưởng click thiệp
        if(isGameWon) return;
        collectedCount++;
        document.getElementById('score').innerText = collectedCount;
        
        gsap.to(cup, { scale: 1.5, opacity: 0, duration: 0.2, onComplete: () => cup.remove() });
        
        if(collectedCount >= targetCount) {
            winGame();
        }
    };
    container.appendChild(cup);
    
    setTimeout(() => {
        if(cup.parentNode) {
            gsap.to(cup, { scale: 0, opacity: 0, duration: 0.5, onComplete: () => cup.remove() });
        }
    }, 3000);
}

// --- THẮNG GAME ---
function winGame() {
    isGameWon = true;
    clearInterval(gameInterval);
    document.getElementById('gameArea').innerHTML = ''; 
    
    // Hiện nút nhận quà
    document.getElementById("receiveGiftBtn").classList.remove("hidden");
    document.querySelector('.mission-text').innerText = "Đã gom đủ! Bấm nhận quà bên dưới 👇";
}

// --- NHẬN QUÀ -> HỘP QUÀ ---
document.getElementById("receiveGiftBtn").addEventListener("click", (e) => {
    e.stopPropagation(); // Chặn sự kiện đóng thiệp
    document.getElementById("letterLayer").classList.add("hidden");
    document.getElementById("giftLayer").classList.remove("hidden");
});

// --- MỞ QUÀ -> CALL ---
document.getElementById("giftBox").addEventListener("click", () => {
    document.getElementById("giftLayer").classList.add("hidden");
    document.getElementById("finalLayer").classList.remove("hidden");
    startFallingText();
});

// --- HELPER FUNCTIONS ---
function createStars() {
    const container = document.getElementById('starContainer');
    for(let i=0; i<30; i++){
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() + 's';
        container.appendChild(star);
    }
}

function startFallingText() {
    const container = document.getElementById("fallingContainer");
    for (let i = 0; i < 20; i++) {
        const el = document.createElement("div");
        el.classList.add("falling-text");
        el.innerHTML = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
        el.style.left = `${Math.random() * 90}%`;
        el.style.top = `${-100 - Math.random() * 500}px`;
        container.appendChild(el);

        gsap.to(el, {
            y: window.innerHeight + 200,
            duration: 5 + Math.random() * 5,
            ease: "none",
            repeat: -1,
            delay: Math.random() * 2
        });
    }
}

function effectWrite() {
    var boxLetter = document.querySelector(".letterContent");
    boxLetter.innerHTML = ""; 
    var i = 0;
    function typing() {
        if (i < letterContent.length) {
            if (letterContent.substring(i, i + 4) === "<br>") {
                boxLetter.innerHTML += "<br>";
                i += 4;
            } else {
                boxLetter.innerHTML += letterContent.charAt(i);
                i++;
            }
            setTimeout(typing, durationWrite);
        }
    }
    typing();
}