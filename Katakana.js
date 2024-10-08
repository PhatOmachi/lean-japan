// Danh sách Katakana và Romaji tương ứng
const katakana = [
    { char: 'ア', romaji: 'a' }, { char: 'イ', romaji: 'i' }, { char: 'ウ', romaji: 'u' }, { char: 'エ', romaji: 'e' }, { char: 'オ', romaji: 'o' },
    { char: 'カ', romaji: 'ka' }, { char: 'キ', romaji: 'ki' }, { char: 'ク', romaji: 'ku' }, { char: 'ケ', romaji: 'ke' }, { char: 'コ', romaji: 'ko' },
    { char: 'サ', romaji: 'sa' }, { char: 'シ', romaji: 'shi' }, { char: 'ス', romaji: 'su' }, { char: 'セ', romaji: 'se' }, { char: 'ソ', romaji: 'so' },
    { char: 'タ', romaji: 'ta' }, { char: 'チ', romaji: 'chi' }, { char: 'ツ', romaji: 'tsu' }, { char: 'テ', romaji: 'te' }, { char: 'ト', romaji: 'to' },
    { char: 'ナ', romaji: 'na' }, { char: 'ニ', romaji: 'ni' }, { char: 'ヌ', romaji: 'nu' }, { char: 'ネ', romaji: 'ne' }, { char: 'ノ', romaji: 'no' },
    { char: 'ハ', romaji: 'ha' }, { char: 'ヒ', romaji: 'hi' }, { char: 'フ', romaji: 'fu' }, { char: 'ヘ', romaji: 'he' }, { char: 'ホ', romaji: 'ho' },
    { char: 'マ', romaji: 'ma' }, { char: 'ミ', romaji: 'mi' }, { char: 'ム', romaji: 'mu' }, { char: 'メ', romaji: 'me' }, { char: 'モ', romaji: 'mo' },
    { char: 'ヤ', romaji: 'ya' }, { char: 'ユ', romaji: 'yu' }, { char: 'ヨ', romaji: 'yo' },
    { char: 'ラ', romaji: 'ra' }, { char: 'リ', romaji: 'ri' }, { char: 'ル', romaji: 'ru' }, { char: 'レ', romaji: 're' }, { char: 'ロ', romaji: 'ro' },
    { char: 'ワ', romaji: 'wa' }, { char: 'ヲ', romaji: 'wo' }, { char: 'ン', romaji: 'n' }
];

const flashcard = document.getElementById('flashcard');
const choicesDiv = document.getElementById('choices');

// Biến để lưu chữ Katakana hiện tại và đáp án
let currentCard = {};
let answerRomaji = "";

// Hàm để tạo flashcard ngẫu nhiên
function randomCard() {
    const randomIndex = Math.floor(Math.random() * katakana.length);
    currentCard = katakana[randomIndex];
    answerRomaji = currentCard.romaji;
    flashcard.textContent = currentCard.char;

    // Hiển thị các lựa chọn romaji
    generateChoices();
}

// Hàm để tạo ra 5 lựa chọn ngẫu nhiên (trong đó có 1 đúng)
function generateChoices() {
    choicesDiv.innerHTML = ""; // Xóa các nút cũ

    // Sao chép danh sách katakana để chọn các romaji ngẫu nhiên
    let options = [...katakana];
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

// Tạo ký tự Katakana đầu tiên khi tải trang
randomCard();