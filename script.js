const addButton = document.querySelector(".add-button");
const cancelButton = document.querySelector(".cancel-button");

const popupWrapper = document.querySelector(".popup-wrapper");
const popupContainer = document.querySelector(".popup-container");

addButton.addEventListener("click", openPopup);
cancelButton.addEventListener("click", closePopup);
popupWrapper.addEventListener("click", function (e) {
    if (e.target === popupWrapper) {
        closePopup();
    }
});

function openPopup() {
    popupWrapper.classList.add("visible");
    popupContainer.classList.add("visible");
}

function closePopup() {
    popupWrapper.classList.remove("visible");
    popupContainer.classList.remove("visible");
}
