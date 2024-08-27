let employeeCounter = 0;

function createCard(employee) {
    const card = document.createElement('div');
    card.className = 'card';
    card.draggable = true;
    card.id = employee.id;
    card.innerHTML = `
        <div class="card-photo" onclick="uploadPhoto(this)">
            ${employee.photo ? `<img src="${employee.photo}" alt="${employee.name}">` : '+'}
        </div>
        <div class="card-content">
            <h3 class="editable" onclick="editText(this)">${employee.name}</h3>
            <p class="position editable" onclick="editText(this)">${employee.position}</p>
            <p class="nickname editable" onclick="editText(this)">${employee.nickname}</p>
            <a href="member${employee.id.replace('emp', '')}.html" class="btn-primary mt-2">詳細</a>
        </div>
    `;
    return card;
}

function addNewCard(column) {
    employeeCounter++;
    const newEmployee = { 
        id: `emp${employeeCounter}`, 
        name: '新規従業員', 
        position: '役職未設定', 
        nickname: 'ニックネーム未設定', 
        photo: '' 
    };
    const newCard = createCard(newEmployee);
    column.insertBefore(newCard, column.querySelector('.add-card-btn'));
    addDragAndDropListeners();
    createMemberPage(newEmployee);
}

function createMemberPage(employee) {
    // この関数はサーバーサイドで実装する必要があります
    console.log(`Created new member page: member${employee.id.replace('emp', '')}.html`);
}

function uploadPhoto(photoElement) {
    const fileInput = document.getElementById('photoUpload');
    fileInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoElement.innerHTML = `<img src="${e.target.result}" alt="Employee Photo">`;
            };
            reader.readAsDataURL(file);
        }
    };
    fileInput.click();
}

function editText(element) {
    const currentText = element.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    
    input.onblur = function() {
        saveText(element, input);
    };
    
    input.onkeydown = function(event) {
        if (event.key === 'Enter') {
            saveText(element, input);
        }
    };

    element.parentNode.replaceChild(input, element);
    input.focus();
}

function saveText(element, input) {
    const newText = input.value.trim();
    if (newText) {
        element.textContent = newText;
    }
    element.className = element.className.replace('edit-input', 'editable');
    input.parentNode.replaceChild(element, input);
}

function addDragAndDropListeners() {
    const cards = document.querySelectorAll('.card');
    const columns = document.querySelectorAll('.column');

    cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });
}

function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const card = document.querySelector('.dragging');
    const column = this.closest('.column');
    column.insertBefore(card, column.querySelector('.add-card-btn'));
}

// 初期化関数
function initBoard() {
    const addCardBtns = document.querySelectorAll('.add-card-btn');
    addCardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addNewCard(this.closest('.column'));
        });
    });
    addDragAndDropListeners();
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', initBoard);
