// Toggle popup popup visibility and focus inpur

const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");
const popupBackground = document.querySelector(".popup-background");
const popupContainer = document.querySelector(".popup-container");

addButton.addEventListener("click", openPopup);
cancelButton.addEventListener("click", closePopup);

popupBackground.addEventListener("click", function (e) {
    if (e.target === popupBackground) {
        popupInput.value = "";
        closePopup();
    }
});

function openPopup() {
    popupBackground.classList.add("open");
    popupContainer.classList.add("open");
    popupInput.focus();
}

function closePopup() {
    popupBackground.classList.remove("open");
    popupContainer.classList.remove("open");
}

// Add a new todo item to the list

const popupInput = document.querySelector(".popup-input");
const applyButton = document.querySelector(".apply-button");
const todosContainer = document.querySelector(".todos-container");

const itemsList = [];

applyButton.addEventListener("click", function () {
    let popupInputValue = popupInput.value.trim();
    if (popupInputValue === "") {
        return;
    } else {
        itemsList.push({ text: popupInputValue, completed: false });
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

// Toggle filter, update selected option

const filterButton = document.querySelector(".filter-button");
const filterButtonSpan = filterButton.querySelector("span");
const filterDropdown = document.querySelector(".filter-dropdown");
const dropdownOptions = document.querySelectorAll(".dropdown-options");

let currentFilter = "";

filterButton.addEventListener("click", function (e) {
    e.stopPropagation();
    openDropdown();
});

filterDropdown.addEventListener("click", function (e) {
    e.stopPropagation();
    if (e.target.classList.contains("dropdown-options")) {
        currentFilter = e.target.textContent;
        filterButtonSpan.textContent = currentFilter.toUpperCase();

        setActiveOption(currentFilter);
        closeDropdown();
        renderList();
    }
});

document.addEventListener("click", function () {
    if (filterDropdown.classList.contains("open")) {
        closeDropdown();
    }
});

function openDropdown() {
    filterButton.classList.toggle("open");
    filterDropdown.classList.toggle("open");
}

function closeDropdown() {
    filterButton.classList.remove("open");
    filterDropdown.classList.remove("open");
}

function setActiveOption(activeFilter) {
    dropdownOptions.forEach(function (option) {
        if (option.textContent === activeFilter) {
            option.classList.add("active");
        } else {
            option.classList.remove("active");
        }
    });
}

// Handle marking complete, editing, and deleting todos

todosContainer.addEventListener("click", function (e) {
    const itemCheckbox = e.target.closest(".item-checkbox");
    if (itemCheckbox) {
        const itemIndex = itemCheckbox.dataset.index;
        itemsList[itemIndex].completed = itemCheckbox.checked;
    }

    const editButton = e.target.closest(".edit-button");
    if (editButton) {
        const todoItem = editButton.closest(".todo-item");
        const itemContentSpan = todoItem.querySelector(".item-content span");
        const itemIndex = editButton.dataset.index;

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = itemContentSpan.textContent;
        editInput.classList.add("edit-input");

        itemContentSpan.replaceWith(editInput);
        editInput.focus();

        editInput.addEventListener("blur", function () {
            itemsList[itemIndex].text = editInput.value.trim();
            renderList();
        });

        editInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                editInput.blur();
            }
        });
    }

    const deleteButton = e.target.closest(".delete-button");
    if (deleteButton) {
        const itemIndex = deleteButton.dataset.index;
        itemsList.splice(itemIndex, 1);
        renderList();
    }
});

// Filter todos based on search input

const searchInput = document.querySelector(".search-input");
let currentSearch = "";

searchInput.addEventListener("input", function () {
    currentSearch = searchInput.value.toLowerCase();
    renderList();
});

// Render todos with current filters and search applied

function renderList() {
    let filteredItems = itemsList.filter(function (item) {
        if (currentFilter === "Complete") {
            return item.completed;
        }

        if (currentFilter === "Incomplete") {
            return !item.completed;
        }

        return true;
    });

    if (currentSearch) {
        filteredItems = filteredItems.filter(function (item) {
            return item.text.toLowerCase().includes(currentSearch);
        });
    }

    let renderedItems = "";
    for (let i = 0; i < filteredItems.length; i++) {
        renderedItems += `<li class="todo-item">
                            <div class="item-content">
                                <input type="checkbox" class="item-checkbox" data-index="${i}" ${
            filteredItems[i].completed ? "checked" : ""
        } />
                                <span>${filteredItems[i].text}</span>
                            </div>

                            <div class="item-actions">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="1"
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
                                    stroke-width="1"
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
