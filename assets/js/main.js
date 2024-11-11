document.addEventListener("DOMContentLoaded", function() {
    const alarmControlButton = document.getElementById("alarm-control");
    const alarmBulb = document.getElementById("alarm-bulb");

    alarmControlButton.addEventListener("click", function() {
        alarmBulb.classList.toggle("active");
    });

    // Dummy data (you can replace this with real backend data later)
    const tempValue = document.getElementById("temp-value");
    const humidityValue = document.getElementById("humidity-value");
    const smokeValue = document.getElementById("smoke-value");

    // Simulate live data updates
    setInterval(() => {
        tempValue.textContent = (Math.random() * 10 + 20).toFixed(1) + "°C";
        humidityValue.textContent = Math.floor(Math.random() * 20 + 60) + "%";
        smokeValue.textContent = Math.floor(Math.random() * 500) + " ppm";
    }, 5000);
});
