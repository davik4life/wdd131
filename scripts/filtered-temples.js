const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        yearBuilt: 2005,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        yearBuilt: 1888,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        yearBuilt: 2015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        yearBuilt: 2020,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        yearBuilt: 1974,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        yearBuilt: 1986,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        yearBuilt: 1983,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        yearBuilt: 1893,
        imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Salt_Lake_Temple%2C_Utah_-_Sept_2004.jpg/500px-Salt_Lake_Temple%2C_Utah_-_Sept_2004.jpg"
    },
    {
        templeName: "Laie Hawaii Temple",
        location: "Laie, Hawaii, United States",
        dedicated: "1919, November, 27",
        area: 42336,
        yearBuilt: 1919,
        imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/LDS_Laie_Hawaii_Temple_front_view.jpg/500px-LDS_Laie_Hawaii_Temple_front_view.jpg"
    },
    {
        templeName: "Accra Ghana Temple",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        yearBuilt: 2004,
        imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Accra_Temple_-_panoramio.jpg/960px-Accra_Temple_-_panoramio.jpg"
    }
];

const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");
const templeGrid = document.getElementById("temple-grid");
const galleryStatus = document.getElementById("gallery-status");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("primary-navigation");
const filterLinks = navigation.querySelectorAll("a[data-filter]");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}

function createTempleCard(temple) {
    const card = document.createElement("article");
    card.className = "temple-card";

    const heading = document.createElement("h2");
    heading.textContent = temple.templeName;

    const details = document.createElement("dl");
    details.className = "temple-details";

    const templeDetails = [
        ["Location", temple.location],
        ["Dedicated", temple.dedicated],
        ["Size", `${temple.area.toLocaleString("en-US")} sq ft`]
    ];

    templeDetails.forEach(([label, value]) => {
        const row = document.createElement("div");
        const term = document.createElement("dt");
        const description = document.createElement("dd");
        term.textContent = `${label}:`;
        description.textContent = value;
        row.append(term, description);
        details.append(row);
    });

    const image = document.createElement("img");
    image.src = temple.imageUrl;
    image.alt = temple.templeName;
    image.width = 400;
    image.height = 250;
    image.loading = "lazy";
    image.decoding = "async";

    card.append(heading, details, image);
    return card;
}

const filters = {
    home: {
        label: "Showing all temples",
        matches: () => true
    },
    old: {
        label: "Showing temples built before 1900",
        matches: (temple) => temple.yearBuilt < 1900
    },
    new: {
        label: "Showing temples built after 2000",
        matches: (temple) => temple.yearBuilt > 2000
    },
    large: {
        label: "Showing temples larger than 90,000 square feet",
        matches: (temple) => temple.area > 90000
    },
    small: {
        label: "Showing temples smaller than 10,000 square feet",
        matches: (temple) => temple.area < 10000
    }
};

function displayTemples(filterName) {
    const filter = filters[filterName];
    if (!filter) {
        throw new RangeError(`Unknown temple filter: ${filterName}`);
    }

    const selectedTemples = temples.filter(filter.matches);
    templeGrid.replaceChildren(...selectedTemples.map(createTempleCard));
    galleryStatus.textContent = `${filter.label} (${selectedTemples.length})`;

    filterLinks.forEach((link) => {
        if (link.dataset.filter === filterName) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function setMenuOpen(isOpen) {
    if (!menuButton || !navigation) {
        return;
    }

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
    navigation.classList.toggle("is-open", isOpen);
}

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const filterLink = event.target.closest("a[data-filter]");
        if (!(filterLink instanceof HTMLAnchorElement)) {
            return;
        }

        event.preventDefault();
        displayTemples(filterLink.dataset.filter);
        setMenuOpen(false);
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

displayTemples("home");
