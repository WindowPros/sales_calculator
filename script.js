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

    const standardWindows = Math.max(totalWindows - hazardWindows, 0);

    const standardTotal = standardWindows * standardPrice;
    const hazardTotal = hazardWindows * hazardPrice;
    const screenTotal = totalWindows * screenPrice;

    const total = standardTotal + hazardTotal + screenTotal;

    document.getElementById("results").innerHTML = `
        <h2>Price Breakdown</h2>
        <p><strong>Total Price:</strong> $${total}</p>
        <ul>
            <li>Standard windows: $${standardTotal}</li>
            <li>Hazard windows: $${hazardTotal}</li>
            <li>Screens: $${screenTotal}</li>
        </ul>
    `;
}
