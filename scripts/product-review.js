const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" }
];

const productSelect = document.getElementById("product");
const reviewForm = document.querySelector(".review-form");

products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.name;
    option.textContent = product.name;
    productSelect.append(option);
});

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submissionId = typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const formData = new FormData(reviewForm);
    formData.set("submissionId", submissionId);

    const confirmationUrl = new URL(reviewForm.action);
    confirmationUrl.search = new URLSearchParams(formData).toString();
    window.location.assign(confirmationUrl.href);
});
