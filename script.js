const DateTime = luxon.DateTime;

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
    column.insertBefore(newCard, column.lastElementChild);
    addDragAndDropListeners();
    createMemberPage(newEmployee);
}

function createMemberPage(employee) {
    // この関数はサーバーサイドで実装する必要があります
    // ここでは、新しいメンバーページを作成するロジックをシミュレートします
    console.log(`Created new member page: member${employee.id.replace('emp', '')}.html`);
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const totalTasks = checkboxes.length;
    let completedTasks = 0;

    checkboxes.forEach(cb => {
        if (cb.checked) {
            completedTasks++;
            cb.closest('tr').querySelector('.task-text').classList.add('completed');
            cb.closest('tr').querySelector('.crown').textContent = '👑';
        } else {
            cb.closest('tr').querySelector('.task-text').classList.remove('completed');
            cb.closest('tr').querySelector('.crown').textContent = '';
        }
    });

    const progressPercentage = Math.round((completedTasks / totalTasks) * 100);
    document.querySelector('.bar').style.width = `${progressPercentage}%`;
    document.querySelector('.progress-text').textContent = `${progressPercentage}%`;

    const remainingTasks = totalTasks - completedTasks;
    document.getElementById('rank-up-text').textContent = `あと${remainingTasks}個クリアでランクアップ`;
}

// その他の関数（checkEvidence, updateProfilePhoto, addNewTask, updateTaskStatus, editTaskName, saveTaskName, editText, saveText）はそのまま維持

// 初期化関数
function initBoard() {
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        const addCardBtn = column.querySelector('.add-card-btn');
        addCardBtn.addEventListener('click', () => addNewCard(column));
    });
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', initBoard);
