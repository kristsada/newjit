document.addEventListener("DOMContentLoaded", function () {
    loadReviews();
});

function goToPage(page) {
    window.location.href = page;
}

async function loadReviews() {
    const response = await fetch("data.json");
    const reviews = await response.json();

    const reviewContainer = document.getElementById("reviews-container");
    reviewContainer.innerHTML = "";

    let summarizedReviews = {};
    let starSum = 0;

    reviews.forEach(review => {
        // สร้าง HTML สำหรับแต่ละรีวิว
        let reviewElement = document.createElement("div");
        reviewElement.classList.add("review");
        reviewElement.innerHTML = `
            <p><strong>${review.name}</strong></p>
            <p>${review.comment}</p>
            <p>⭐️ ${"★".repeat(review.rating)}</p>
            <hr>
        `;
        reviewContainer.appendChild(reviewElement);

        // รวมรีวิวแบบสรุป
        if (!summarizedReviews[review.comment]) {
            summarizedReviews[review.comment] = 1;
        } else {
            summarizedReviews[review.comment]++;
        }
        starSum += review.rating;
    });

    // สรุปรีวิวด้วย AI
    let summary = "รีวิวที่พบบ่อย: ";
    for (let key in summarizedReviews) {
        if (summarizedReviews[key] > 1) {
            summary += `${key} (${summarizedReviews[key]} ครั้ง), `;
        }
    }
    summary += `\nเรตติ้งเฉลี่ย: ${(starSum / reviews.length).toFixed(1)}⭐️`;

    let summaryElement = document.createElement("div");
    summaryElement.classList.add("summary");
    summaryElement.innerHTML = `<p><strong>🔎 สรุปรีวิว</strong></p><p>${summary}</p>`;
    reviewContainer.prepend(summaryElement);
}