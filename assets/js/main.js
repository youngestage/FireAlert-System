// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDenlpAskSb8mA68k7uTNikhC2yLG2d94",
  authDomain: "fire-alarm-37cd0.firebaseapp.com",
  projectId: "fire-alarm-37cd0",
  storageBucket: "fire-alarm-37cd0.appspot.com",
  messagingSenderId: "403585331337",
  appId: "1:403585331337:web:feffd3c54802ebfce99658",
  measurementId: "G-5M0ZJJ2T7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); 

document.addEventListener('DOMContentLoaded', () => {
    // Sample sensor data (in real-world, you'd fetch this from Firebase)
    const sensorData = {
      temperature: 28.5, // in °C
      humidity: 88, // in %
      smoke: 200 // in ppm
    };
  
    // Selecting the DOM elements
    const tempValue = document.getElementById('temp-value');
    const humidityValue = document.getElementById('humidity-value');
    const smokeValue = document.getElementById('smoke-value');
    const alarmBulb = document.getElementById('alarm-bulb');
  
    // Update the UI with sensor data
    tempValue.textContent = `${sensorData.temperature}°C`;
    humidityValue.textContent = `${sensorData.humidity}%`;
    smokeValue.textContent = `${sensorData.smoke} ppm`;
  
    // Alarm Control (dummy toggle function)
    let alarmOn = false;
    const alarmControlButton = document.getElementById('alarm-control');
    alarmControlButton.addEventListener('click', () => {
      alarmOn = !alarmOn;
      // Change the bulb color based on the alarm state
      alarmBulb.style.backgroundColor = alarmOn ? 'red' : 'white';
    });
  
    // Thermometer gauge logic (bonus)
    const thermometerGauge = document.getElementById('thermometer-gauge');
    thermometerGauge.style.height = `${(sensorData.temperature / 100) * 100}%`; // Mocking as percentage
  });
  
  document.getElementById('device-login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from submitting
    const deviceId = document.getElementById('device-id').value;
    const passcode = document.getElementById('passcode').value;

    // Simulate a basic validation
    if (deviceId === "1234" && passcode === "abcd") {
        alert('Login successful!');
    } else {
        alert('Invalid Device ID or Passcode');
    }
});

// Reference to the database path where your data is stored
const deviceRef = ref(database, 'devices/'); // Example: 'devices/' is the node where device data is stored

// Fetch live data
onValue(deviceRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
        displayDeviceData(data); // Call function to display the data
    } else {
        console.log("No data available");
    }
}, {
    onlyOnce: false // Ensures live updates
});

// Function to display device data on the page
function displayDeviceData(data) {
  const container = document.getElementById('device-data-container');
  container.innerHTML = '';  // Clear previous data

  // Loop through the data and display each device's info
  for (let deviceId in data) {
      const device = data[deviceId];
      const deviceInfo = 
          <div class="device-info">
              <p><strong>Device ID:</strong> ${deviceId}</p>
              <p><strong>Status:</strong> ${device.status}</p>
              <p><strong>Location:</strong> ${device.location}</p>
          </div>
      ;
      container.innerHTML += deviceInfo;
  }
}
