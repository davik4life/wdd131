const params = new URLSearchParams(window.location.search);
const product = params.get("product");
const rating = params.get("rating");
const installationDate = params.get("installationDate");
const submissionId = params.get("submissionId");
const reviewCountKey = "productReviewCount";
const submissionIdsKey = "productReviewSubmissionIds";
const countElement = document.getElementById("review-count");
const messageElement = document.getElementById("confirmation-message");
const detailsElement = document.getElementById("review-details");

let reviewCount = Number(localStorage.getItem(reviewCountKey)) || 0;
const previousSubmissionIds = JSON.parse(localStorage.getItem(submissionIdsKey) || "[]");
const isValidSubmission = Boolean(product && rating && installationDate && submissionId);

if (isValidSubmission) {
    messageElement.textContent = `Thank you for reviewing ${product}. Your ${rating}-star rating has been recorded.`;
    detailsElement.hidden = false;
    document.getElementById("confirmed-product").textContent = product;
    document.getElementById("confirmed-rating").textContent = `${rating} out of 5 stars`;
    document.getElementById("confirmed-date").textContent = installationDate;

    if (!previousSubmissionIds.includes(submissionId)) {
        reviewCount += 1;
        previousSubmissionIds.push(submissionId);
        localStorage.setItem(reviewCountKey, String(reviewCount));
        localStorage.setItem(submissionIdsKey, JSON.stringify(previousSubmissionIds));
    }

    const features = params.getAll("features");
    if (features.length > 0) {
        const featuresList = document.getElementById("confirmed-features");
        features.forEach((feature) => {
            const item = document.createElement("li");
            item.textContent = feature;
            featuresList.append(item);
        });
        document.getElementById("confirmed-features-wrap").hidden = false;
    }

    const writtenReview = params.get("writtenReview");
    if (writtenReview) {
        document.getElementById("confirmed-review").textContent = writtenReview;
        document.getElementById("confirmed-review-wrap").hidden = false;
    }
} else {
    messageElement.textContent = "No review details were received. Submit the form to post a product review.";
}

countElement.textContent = `${reviewCount}`;
