const binSetups = {
    apartment: "a compact countertop caddy, emptied into a community collection or outdoor bin",
    tumbler: "a sealed tumbler that is easy to turn in a small yard",
    openPile: "an open outdoor pile with room for leaves and garden trimmings"
};

const materials = [
    { name: "Vegetable trimmings", category: "greens", guidance: "Chop large pieces so microbes can reach more surface area." },
    { name: "Fruit peels", category: "greens", guidance: "Add citrus in moderation and mix it into the center of the pile." },
    { name: "Coffee grounds", category: "greens", guidance: "Spread grounds in a thin layer and balance them with dry browns." },
    { name: "Tea leaves", category: "greens", guidance: "Loose leaves are ready to add; remove staples from tea bags." },
    { name: "Fresh grass clippings", category: "greens", guidance: "Mix small amounts through the pile to prevent dense, slimy layers." },
    { name: "Dry leaves", category: "browns", guidance: "Keep a bag of dry leaves nearby to cover each addition of food scraps." },
    { name: "Shredded cardboard", category: "browns", guidance: "Tear plain, uncoated cardboard into small pieces and moisten it." },
    { name: "Paper egg cartons", category: "browns", guidance: "Rip cartons into pieces; leave out plastic or foam packaging." },
    { name: "Straw", category: "browns", guidance: "Use a loose layer to add air space and absorb extra moisture." },
    { name: "Untreated wood chips", category: "browns", guidance: "Use sparingly because larger pieces break down slowly." }
];

const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.getElementById("site-navigation");

function setMenuOpen(isOpen) {
    if (!menuButton || !siteNavigation) {
        return;
    }

    menuButton.setAttribute("aria-expanded", `${isOpen}`);
    menuButton.setAttribute("aria-label", `${isOpen ? "Close" : "Open"} navigation menu`);
    menuButton.querySelector("span").textContent = `${isOpen ? "×" : "☰"}`;
    siteNavigation.classList.toggle("is-open", isOpen);
}

function updateFooter() {
    const yearElement = document.getElementById("current-year");
    const modifiedElement = document.getElementById("last-modified");

    if (yearElement) {
        yearElement.textContent = `${new Date().getFullYear()}`;
    }
    if (modifiedElement) {
        modifiedElement.textContent = `Last updated: ${document.lastModified}`;
    }
}

function createMaterialCard(material) {
    const card = document.createElement("article");
    card.className = `material-card material-card--${material.category}`;

    const category = document.createElement("p");
    category.className = "material-category";
    category.textContent = `${material.category === "greens" ? "Green" : "Brown"} material`;

    const heading = document.createElement("h3");
    heading.textContent = material.name;

    const guidance = document.createElement("p");
    guidance.textContent = material.guidance;
    card.append(category, heading, guidance);
    return card;
}

function renderMaterials(filter = "all") {
    const materialGrid = document.getElementById("material-grid");
    const materialCount = document.getElementById("material-count");

    if (!materialGrid || !materialCount) {
        return;
    }

    const visibleMaterials = materials.filter((material) => filter === "all" || material.category === filter);
    materialGrid.replaceChildren(...visibleMaterials.map(createMaterialCard));
    materialCount.textContent = visibleMaterials.length > 0
        ? `Showing ${visibleMaterials.length} ${filter === "all" ? "compost materials" : `${filter === "greens" ? "green" : "brown"} materials`}.`
        : `No materials match this filter.`;
}

function initializeMaterialFilters() {
    const controls = document.querySelector(".filter-controls");

    if (!controls) {
        return;
    }

    renderMaterials();
    controls.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const button = event.target.closest("button[data-material-filter]");
        if (!(button instanceof HTMLButtonElement)) {
            return;
        }

        controls.querySelectorAll("button[data-material-filter]").forEach((item) => {
            item.setAttribute("aria-pressed", `${item === button}`);
        });
        renderMaterials(button.dataset.materialFilter);
    });
}

function initializeBinPreference() {
    const form = document.getElementById("setup-form");
    const savedMessage = document.getElementById("setup-confirmation");
    const binChoice = document.getElementById("bin-choice");
    const homeMessage = document.getElementById("saved-setup");
    const storageKey = "compostMadeSimpleBin";

    const savedBin = localStorage.getItem(storageKey);
    if (binChoice && savedBin && binSetups[savedBin]) {
        binChoice.value = savedBin;
        if (savedMessage) {
            savedMessage.textContent = `Your saved setup: ${binSetups[savedBin]}.`;
            savedMessage.hidden = false;
        }
    }
    if (homeMessage && savedBin && binSetups[savedBin]) {
        homeMessage.textContent = `Your saved setup is ${binSetups[savedBin]}.`;
        homeMessage.hidden = false;
    }

    if (!form || !binChoice || !savedMessage) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const selectedBin = binChoice.value;

        if (!binSetups[selectedBin]) {
            savedMessage.textContent = `Choose a setup before saving your preference.`;
            savedMessage.hidden = false;
            return;
        }

        localStorage.setItem(storageKey, selectedBin);
        savedMessage.textContent = `Saved: ${binSetups[selectedBin]}.`;
        savedMessage.hidden = false;
    });
}

function initializeQuestionForm() {
    const form = document.getElementById("question-form");
    const message = document.getElementById("question-confirmation");
    const countElement = document.getElementById("question-count");
    const countKey = "compostMadeSimpleQuestionCount";

    if (!form || !message || !countElement) {
        return;
    }

    countElement.textContent = `${Number(localStorage.getItem(countKey)) || 0}`;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) {
            return;
        }

        const formData = new FormData(form);
        const visitorName = formData.get("visitorName").trim();
        const topic = formData.get("topic");
        const nextCount = (Number(localStorage.getItem(countKey)) || 0) + 1;

        localStorage.setItem(countKey, `${nextCount}`);
        countElement.textContent = `${nextCount}`;
        message.textContent = `Thanks, ${visitorName}. Your ${topic} question was checked for this demo. It was not sent or saved; only the submission count is stored in this browser.`;
        message.hidden = false;
        form.reset();
    });
}

if (menuButton && siteNavigation) {
    menuButton.addEventListener("click", () => {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    siteNavigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuButton.focus();
        }
    });

    window.matchMedia("(min-width: 44rem)").addEventListener("change", (event) => {
        if (event.matches) {
            setMenuOpen(false);
        }
    });
}

updateFooter();
initializeMaterialFilters();
initializeBinPreference();
initializeQuestionForm();
