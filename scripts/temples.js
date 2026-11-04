const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("primary-navigation");

if (menuButton && navigation) {
    const setMenuOpen = (isOpen) => {
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
        navigation.classList.toggle("is-open", isOpen);
    };

    menuButton.addEventListener("click", () => {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuButton.focus();
        }
    });

    window.matchMedia("(min-width: 42rem)").addEventListener("change", (event) => {
        if (event.matches) {
            setMenuOpen(false);
        }
    });
}
