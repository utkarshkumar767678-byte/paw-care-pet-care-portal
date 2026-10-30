
// Get the appointment form
const appointmentForm = document.getElementById("appointmentForm");

// Get the message area
const message = document.getElementById("message");

// Set minimum appointment date to today
const dateInput = document.getElementById("appointmentDate");

const today = new Date();
const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

dateInput.min = localToday;


// Handle form submission
appointmentForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Collect form information
    const ownerName = document.getElementById("ownerName").value.trim();
    const petName = document.getElementById("petName").value.trim();
    const petType = document.getElementById("petType").value;
    const service = document.getElementById("service").value;
    const appointmentDate = dateInput.value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const phone = document.getElementById("phone").value.trim();

    // Check phone number
    if (!/^[0-9]{10}$/.test(phone)) {
        message.style.color = "red";
        message.textContent = "Please enter a valid 10-digit phone number.";
        return;
    }

    // Check appointment date and time
    if (appointmentDate < localToday) {
        message.style.color = "red";
        message.textContent = "Please select today or a future date.";
        return;
    }

    if (appointmentDate === localToday && appointmentTime <=
        `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`) {
        message.style.color = "red";
        message.textContent = "Please select a future appointment time.";
        return;
    }

    // Create appointment object
    const appointment = {
        id: Date.now(),
        ownerName: ownerName,
        petName: petName,
        petType: petType,
        service: service,
        date: appointmentDate,
        time: appointmentTime,
        phone: phone
    };

    // Get existing appointments
    let appointments = JSON.parse(
        localStorage.getItem("appointments")
    ) || [];

    // Save new appointment
    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    // Show confirmation
    message.style.color = "#356348";

    message.textContent =
        `Appointment booked successfully for ${petName}!`;

    // Reset form
    appointmentForm.reset();

    // Keep today's date as minimum
    dateInput.min = localToday;

});
