/* ==================================
   LIFE CARE HOSPITAL SCRIPT
================================== */

/* COUNTER ANIMATION */

const counters = document.querySelectorAll(".stat-card h2");

counters.forEach(counter => {

    const targetText = counter.innerText;
    const target = parseInt(targetText.replace(/\D/g, ""));

    if (isNaN(target)) return;

    let current = 0;
    const increment = target / 100;

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {

            counter.innerText = targetText;
            clearInterval(timer);

        } else {

            if (targetText.includes("%")) {
                counter.innerText = Math.floor(current) + "%";
            }
            else if (targetText.includes("K")) {
                counter.innerText = Math.floor(current) + "K+";
            }
            else {
                counter.innerText = Math.floor(current) + "+";
            }

        }

    }, 20);

});


/* SCROLL REVEAL */

const revealElements = document.querySelectorAll(
".service-card,.doctor-card,.why-card,.testimonial-card,.stat-card"
);

function reveal() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.classList.add("show");
        }

    });

}

window.addEventListener("scroll", reveal);
reveal();


/* ACTIVE NAVIGATION */

const currentPage =
window.location.pathname.split("/").pop();

const navLinks =
document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {
        link.classList.add("active");
    }

});


/* DOCTOR STATUS */

const doctorCards =
document.querySelectorAll(".doctor-card");

doctorCards.forEach(card => {

    const status = document.createElement("span");

    const statuses = [
        "Available",
        "Busy",
        "In Surgery"
    ];

    const randomStatus =
    statuses[Math.floor(Math.random() * statuses.length)];

    status.innerHTML = randomStatus;
    status.classList.add("doctor-status");

    card.appendChild(status);

});


/* APPOINTMENT BOOKING */

const appointmentForm =
document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
        document.getElementById("name").value;

        const email =
        document.getElementById("email").value;

        const phone =
        document.getElementById("phone").value;

        const doctor =
        document.getElementById("doctor").value;

        const department =
        document.getElementById("department").value;

        const date =
        document.getElementById("date").value;

        const time =
        document.getElementById("time").value;

        if (
            name === "" ||
            phone === "" ||
            doctor === "" ||
            department === "" ||
            date === "" ||
            time === ""
        ) {

            alert("Please fill all fields.");
            return;

        }

        const appointmentID =
        Math.floor(1000 + Math.random() * 9000);

        const appointmentData = {

            id: appointmentID,
            name: name,
            email: email,
            phone: phone,
            doctor: doctor,
            department: department,
            date: date,
            time: time,
            status: "Confirmed"

        };

        localStorage.setItem(
            "patient_" + appointmentID,
            JSON.stringify(appointmentData)
        );

        document.getElementById("appointmentId").textContent =
        appointmentID;

        document.getElementById("resultName").textContent =
        name;

        document.getElementById("resultDoctor").textContent =
        doctor;

        document.getElementById("resultDepartment").textContent =
        department;

        document.getElementById("resultDate").textContent =
        date;

        document.getElementById("resultTime").textContent =
        time;

        document.getElementById("appointmentResult").style.display =
        "block";

        alert(
            "Appointment Booked Successfully!\n\nYour Appointment ID is: LC" +
            appointmentID +
            "\n\nPlease save this ID."
        );

    });

}
/* SYMPTOM CHECKER */

function checkSymptoms(){

    const symptom =
    document.getElementById("symptom").value;

    const result =
    document.getElementById("symptomResult");

    let department = "";

    switch(symptom){

        case "Chest Pain":
            department = "Cardiology";
            break;

        case "Headache":
            department = "Neurology";
            break;

        case "Bone Fracture":
            department = "Orthopedics";
            break;

        case "Skin Allergy":
            department = "Dermatology";
            break;

        case "Fever":
            department = "General Medicine";
            break;

        case "Ear Pain":
            department = "ENT";
            break;

        case "Kidney Pain":
            department = "Nephrology";
            break;

        case "Cancer Symptoms":
            department = "Oncology";
            break;

        case "Pregnancy Checkup":
            department = "Gynecology";
            break;

        case "Breathing Difficulty":
            department = "Emergency Medicine";
            break;

        default:
            department = "Please select a symptom.";
    }

    result.innerHTML =
    "Recommended Department: <strong>" +
    department +
    "</strong>";

}

window.checkSymptoms = checkSymptoms;
/* BMI CALCULATOR */

function calculateBMI(){

    const weight =
    document.getElementById("weight").value;

    const height =
    document.getElementById("height").value / 100;

    if(weight === "" || height === 0){

        alert("Please enter weight and height.");
        return;

    }

    const bmi =
    (weight / (height * height)).toFixed(1);

    let status = "";

    if(bmi < 18.5){

        status = "Underweight";

    }
    else if(bmi < 25){

        status = "Normal Weight";

    }
    else if(bmi < 30){

        status = "Overweight";

    }
    else{

        status = "Obese";

    }

    document.getElementById("bmiResult").innerHTML =

    "<h4>Your BMI: " + bmi + "</h4>" +
    "<p>Status: <strong>" + status + "</strong></p>";

}

window.calculateBMI = calculateBMI;
/* AUTO SELECT DOCTOR */

const departmentSelect =
document.getElementById("department");

const doctorSelect =
document.getElementById("doctor");

if(departmentSelect && doctorSelect){

departmentSelect.addEventListener("change", function(){

const doctors = {

"Cardiology":
"Dr. Sarah Wilson - Cardiology",

"Neurology":
"Dr. David John - Neurology",

"Orthopedics":
"Dr. Michael Lee - Orthopedics",

"Pediatrics":
"Dr. Emily Thomas - Pediatrics",

"Dermatology":
"Dr. Robert Martin - Dermatology",

"Gynecology":
"Dr. Jennifer Clark - Gynecology",

"ENT":
"Dr. James Walker - ENT",

"General Medicine":
"Dr. Olivia Brown - General Medicine",

"Radiology":
"Dr. William Scott - Radiology",

"Emergency Medicine":
"Dr. Sophia Green - Emergency Medicine",

"Oncology":
"Dr. Daniel Carter - Oncology",

"Nephrology":
"Dr. Rachel Adams - Nephrology"

};

doctorSelect.value =
doctors[this.value] || "";

});

}
/* PATIENT PORTAL */

function viewAppointment(){

    let appointmentId =document.getElementById("searchAppointmentId").value.trim();

appointmentId =
appointmentId.replace("LC", "");

    const data =
    JSON.parse(
        localStorage.getItem(
            "patient_" + appointmentId
        )
    );

    if(data){

        document.getElementById(
            "patientResult"
        ).innerHTML = `

        <div class="appointment-result"
             style="display:block">

        <h3>Appointment Details</h3>

        <p><strong>Appointment ID:</strong>
        LC${data.id}</p>

        <p><strong>Name:</strong>
        ${data.name}</p>

        <p><strong>Doctor:</strong>
        ${data.doctor}</p>

        <p><strong>Department:</strong>
        ${data.department}</p>

        <p><strong>Date:</strong>
        ${data.date}</p>

        <p><strong>Time:</strong>
        ${data.time}</p>

        <p><strong>Status:</strong>
        ${data.status}</p>

        </div>

        `;

    }else{

        document.getElementById(
            "patientResult"
        ).innerHTML =
        "<p style='color:red'>Appointment not found.</p>";

    }

}

window.viewAppointment = viewAppointment;

const dateInput =
document.getElementById("date");

if(dateInput){

    const today =
    new Date().toISOString().split("T")[0];

    dateInput.min = today;

}