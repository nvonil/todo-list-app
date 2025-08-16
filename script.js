// Popup visibility logic

const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");
const popupWrapper = document.querySelector(".popup-wrapper");
const popupContainer = document.querySelector(".popup-container");

addButton.addEventListener("click", openPopup);
cancelButton.addEventListener("click", closePopup);
popupWrapper.addEventListener("click", function (e) {
    if (e.target === popupWrapper) {
        popupInput.value = "";
        closePopup();
    }
});

function openPopup() {
    popupWrapper.classList.add("visible");
    popupContainer.classList.add("visible");
    popupInput.focus();
}

function closePopup() {
    popupWrapper.classList.remove("visible");
    popupContainer.classList.remove("visible");
}

// Add new item logic

const popupInput = document.querySelector(".popup-input");
const applyButton = document.querySelector(".apply-button");
const todosContainer = document.querySelector(".todos-container");

const itemsList = [];

applyButton.addEventListener("click", function () {
    let popupInputValue = popupInput.value.trim();
    if (popupInputValue === "") {
        return;
    } else {
        itemsList.push(popupInputValue);
        popupInput.value = "";

        closePopup();
        renderList();
    }
});

popupInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        applyButton.click();
    }
});

function renderList() {
    let renderedItems = "";
    for (let i = 0; i < itemsList.length; i++) {
        renderedItems += `<li class="todo-item">
                            <div class="item-content">
                                <input type="checkbox" />
                                <span>${itemsList[i]}</span>
                            </div>

                            <div class="item-actions">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-pencil-icon lucide-pencil edit-button"
                                >
                                    <path
                                        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                                    />
                                    <path d="m15 5 4 4" />
                                </svg>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-trash-icon lucide-trash delete-button"
                                    data-index="${i}"
                                >
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </div>
                         </li>`;
    }
    todosContainer.innerHTML = renderedItems;
}

// Filter popup visibility logic

const filterContainer = document.querySelector(".filter-container");
const filterDropdown = document.querySelector(".filter-dropdown");

filterContainer.addEventListener("click", function (e) {
    e.stopPropagation(); // prevents event bubbling to parent listeners
    openDropdown();
});

document.addEventListener("click", function () {
    // counts clicks everywhere, including the filter container
    if (filterDropdown.classList.contains("open")) {
        closeDropdown();
    }
});

function openDropdown() {
    filterContainer.classList.toggle("open");
    filterDropdown.classList.toggle("open");
}

function closeDropdown() {
    filterContainer.classList.remove("open");
    filterDropdown.classList.remove("open");
}

// Individual item deletion logic / Individual item edit logic

todosContainer.addEventListener("click", function (e) {
    const editButton = e.target.closest(".edit-button");
    if (editButton) {
        const todoItem = editButton.closest(".todo-item");
        const itemContentSpan = todoItem.querySelector(".item-content span");
        const itemIndex = Array.from(todosContainer.children).indexOf(todoItem);

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = span.textContent;
        editInput.classList.add("edit-input");

        itemContentSpan.replaceWith(input);
        editInput.focus();

        editInput.addEventListener("blur", function () {
            saveEdit(editInput, itemIndex);
        });

        editButton.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                saveEdit(editInput, itemIndex);
            }
        });
    }

    const deleteButton = e.target.closest(".delete-button");
    if (deleteButton) {
        const itemIndex = deleteButton.dataset.index;
        deleteItem(itemIndex);
    }
});

function saveEdit(input, index) {
    itemsList[index] = input.value.trim();
    renderList();
}

function deleteItem(index) {
    itemsList.splice(index, 1);
    renderList();
}
