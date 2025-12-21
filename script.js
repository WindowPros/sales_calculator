// Load saved pricing
document.addEventListener("DOMContentLoaded", () => {
    const fields = [
        "standard_price",
        "hazard_price",
        "screen_price"
    ];

    fields.forEach(id => {
        const saved = localStorage.getItem(id);
        if (saved !== null) {
            document.getElementById(id).value = saved;
        }

        document.getElementById(id).addEventListener("input", e => {
            localStorage.setItem(id, e.target.value);
        });
    });
});

function calculateBid() {
    const standardPrice = parseInt(document.getElementById("standard_price").value) || 0;
    const hazardPrice = parseInt(document.getElementById("hazard_price").value) || 0;
    const screenPrice = parseInt(document.getElementById("screen_price").value) || 0;

    const totalWindows = parseInt(document.getElementById("total_windows").value) || 0;
    const hazardWindows = parseInt(document.getElementById("total_hazard_windows").value) || 0;

    // Total In/Out price
    const totalInOut = totalWindows * standardPrice * 2 / 2; // same as totalWindows * standardPrice
    // One-side price
    const oneSidePrice = Math.round(totalWindows * standardPrice / 2);
    // Hazard surcharge
    const hazardSurcharge = hazardWindows * hazardPrice;
    // Screen cleaning charge
    const screenCharge = totalWindows * screenPrice;

    // Round everything to whole numbers
    const totalInOutRounded = Math.round(totalInOut);
    
    document.getElementById("results").innerHTML = `
        <h2>Price Breakdown</h2>
        <p><strong>Total In/Out Price:</strong> $${totalInOutRounded}</p>
        <p><strong>One-Side Price:</strong> $${oneSidePrice}</p>
        <p><strong>Hazard Surcharge:</strong> $${hazardSurcharge}</p>
        <p><strong>Screen Cleaning Charge:</strong> $${screenCharge}</p>
    `;
}
