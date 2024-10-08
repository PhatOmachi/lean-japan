// Danh sách Hiragana và Romaji tương ứng
const hiragana = [
    { char: 'あ', romaji: 'a' }, { char: 'い', romaji: 'i' }, { char: 'う', romaji: 'u' }, { char: 'え', romaji: 'e' }, { char: 'お', romaji: 'o' },
    { char: 'か', romaji: 'ka' }, { char: 'き', romaji: 'ki' }, { char: 'く', romaji: 'ku' }, { char: 'け', romaji: 'ke' }, { char: 'こ', romaji: 'ko' },
    { char: 'さ', romaji: 'sa' }, { char: 'し', romaji: 'shi' }, { char: 'す', romaji: 'su' }, { char: 'せ', romaji: 'se' }, { char: 'そ', romaji: 'so' },
    { char: 'た', romaji: 'ta' }, { char: 'ち', romaji: 'chi' }, { char: 'つ', romaji: 'tsu' }, { char: 'て', romaji: 'te' }, { char: 'と', romaji: 'to' },
    { char: 'な', romaji: 'na' }, { char: 'に', romaji: 'ni' }, { char: 'ぬ', romaji: 'nu' }, { char: 'ね', romaji: 'ne' }, { char: 'の', romaji: 'no' },
    { char: 'は', romaji: 'ha' }, { char: 'ひ', romaji: 'hi' }, { char: 'ふ', romaji: 'fu' }, { char: 'へ', romaji: 'he' }, { char: 'ほ', romaji: 'ho' },
    { char: 'ま', romaji: 'ma' }, { char: 'み', romaji: 'mi' }, { char: 'む', romaji: 'mu' }, { char: 'め', romaji: 'me' }, { char: 'も', romaji: 'mo' },
    { char: 'や', romaji: 'ya' }, { char: 'ゆ', romaji: 'yu' }, { char: 'よ', romaji: 'yo' },
    { char: 'ら', romaji: 'ra' }, { char: 'り', romaji: 'ri' }, { char: 'る', romaji: 'ru' }, { char: 'れ', romaji: 're' }, { char: 'ろ', romaji: 'ro' },
    { char: 'わ', romaji: 'wa' }, { char: 'を', romaji: 'wo' }, { char: 'ん', romaji: 'n' }
];

const flashcard = document.getElementById('flashcard');
const choicesDiv = document.getElementById('choices');

// Biến để lưu chữ Hiragana hiện tại và đáp án
let currentCard = {};
let answerRomaji = "";

// Hàm để tạo flashcard ngẫu nhiên
function randomCard() {
    const randomIndex = Math.floor(Math.random() * hiragana.length);
    currentCard = hiragana[randomIndex];
    answerRomaji = currentCard.romaji;
    flashcard.textContent = currentCard.char;

    // Hiển thị các lựa chọn romaji
    generateChoices();
}

// Hàm để tạo ra 5 lựa chọn ngẫu nhiên (trong đó có 1 đúng)
function generateChoices() {
    choicesDiv.innerHTML = ""; // Xóa các nút cũ

    // Sao chép danh sách hiragana để chọn các romaji ngẫu nhiên
    let options = [...hiragana];
    // Loại bỏ đáp án đúng khỏi danh sách ngẫu nhiên
    options = options.filter(option => option.romaji !== answerRomaji);
    // Lấy 4 đáp án sai ngẫu nhiên
    const randomOptions = [];
    while (randomOptions.length < 4) {
        const randomOption = options[Math.floor(Math.random() * options.length)];
        if (!randomOptions.includes(randomOption.romaji)) {
            randomOptions.push(randomOption.romaji);
        }
    }
    // Thêm đáp án đúng vào danh sách
    randomOptions.push(answerRomaji);
    // Trộn ngẫu nhiên danh sách lựa chọn
    randomOptions.sort(() => Math.random() - 0.5);

    // Tạo nút cho mỗi lựa chọn
    randomOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => checkAnswer(option));
        choicesDiv.appendChild(button);
    });
}

// Hàm kiểm tra đáp án và hiển thị thông báo
function checkAnswer(selectedRomaji) {
    if (selectedRomaji === answerRomaji) {
        Swal.fire({
            icon: 'success',
            title: 'Chính xác!',
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            randomCard(); // Tự động chuyển sang ký tự mới sau 3 giây
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sai rồi!',
            text: `Đáp án đúng là: ${answerRomaji}`,
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            randomCard(); // Tự động chuyển sang ký tự mới sau 3 giây
        });
    }
}

// Tạo ký tự Hiragana đầu tiên khi tải trang
randomCard();
