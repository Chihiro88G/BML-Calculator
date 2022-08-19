function clickCalculateButton() {

    // set variables from html elements
    var data = {
        gender: document.getElementById("gender").value,
        age: document.getElementById("age").value,
        feet: document.getElementById("feet").value,
        inches: document.getElementById("inches").value,
        stones: document.getElementById("stones").value,
        pounds: document.getElementById("pounds").value,
        activity_level: '',
        tab_item: ''
    }

    // activity level radio button
    var radio_elements = document.getElementsByName("activity_level");
    for (let i = 0; i < radio_elements.length; i++) {
        if (radio_elements.item(i).checked) {
            data.activity_level = radio_elements.item(i).id;
        }
    }

    // set metric or imperial
    var metric_or_imperial = document.getElementsByName("tab_item");
    for (let i = 0; i < metric_or_imperial.length; i++) {
        if (metric_or_imperial.item(i).checked) {
            data.tab_item = metric_or_imperial.item(i).id;
        }
    }

    // validation check
    var message = document.getElementById("message");
    message.innerHTML = "";
    var errors = validationCheck(data);
    if (errors != "") {
        message.innerHTML = "You need to enter the value(s): " + errors;
        return;
    }

    // calculate BMR
    var BMR = 0;
    if (data.tab_item == "metric") {
        BMR = Math.round(calculateMetricBMR(data));
    }

    if (data.tab_item == "imperial") {
        BMR = Math.round(calculateImperialBMR(data));
    }

    // calculate calorie intake based on activity level
    var calorie_intake = calculateCalorieIntake(BMR, data.activity_level)
    // message.innerHTML = `Your BMR is ${BMR}. Daily calorie requirement is ${Math.round(calorie_intake)} cal.`;
    document.writeln(`<h2>Your BMR is ${BMR}. <br>Daily calorie requirement is ${Math.round(calorie_intake)} cal.</h1>`);
}


// validation check
function validationCheck(data) {
    var errors = "";
    if (data.gender == null || data.gender == "") {
        errors = errors + "Gender ";
    }
    if (data.age == null || data.age == "") {
        errors = errors + "Age ";
    }
    if ((data.feet == 0 && data.inches == 0) || (data.feet == "" && data.inches == "") ||
        (data.feet == 0 && data.inches == "") || (data.feet == "" && data.inches == 0)) {
        errors = errors + "Height ";
    }
    if ((data.stones == 0 && data.pounds == 0) || (data.stones == "" && data.pounds == "") ||
        (data.stones == 0 && data.pounds == "") || (data.stones == "" && data.pounds == 0)) {
        errors = errors + "Weignt ";
    }
    if (data.activity_level == null || data.activity_level == "") {
        errors = errors + "ActivityLevel";
    }
    return errors;
}

// calculate metric BMR
function calculateMetricBMR(data) {

    var BMR, kg, cm, inches, pounds = 0;
    if (data.feet != 0 || data.feet != "") {
        cm = feetToCm(data.feet);
    }
    if ((data.feet == 0 || data.feet == "") && data.inches != 0) {
        cm = inchesToCm(data.inches);
    }
    if (data.stones != 0 || data.stones != "") {
        kg = stonesToKg(data.stones);
    }
    if ((data.stones == 0 || data.stones == "") && data.pounds != 0) {
        kg = poundsToKg(data.pounds);
    }

    // BMR depending on gender
    if (data.gender == "male") {
        BMR = (10 * kg) + (6.25 * cm) - (5 * data.age) + 5;
    } else {
        BMR = (10 * kg) + (6.25 * cm) - (5 * data.age) - 161;
    }
    return BMR
}

// calculate imperial BMR
function calculateImperialBMR(data) {

    var BMR, inches, pounds = 0;
    if (data.feet != 0 || data.feet != "") {
        inches = feetToInches(data.feet);
    }
    if ((data.feet == 0 || data.feet == "") && data.inches != 0) {
        inches = data.inches;
    }
    if (data.stones != 0 || data.stones != "") {
        pounds = stonesToPounds(data.stones);
    }
    if ((data.stones == 0 || data.stones == "") && data.pounds != 0) {
        pounds = data.pounds;
    }

    // BMR depending on gender
    if (data.gender == "male") {
        BMR = (4.536 * pounds) + (15.88 * inches) - (5 * data.age) + 5;
    } else {
        BMR = (4.536 * pounds) + (15.88 * inches) - (5 * data.age) - 161;
    }
    return BMR
}

// feet to cm
function feetToCm(feet) {
    var cm = feet * 30.48;
    return cm
}

// inches to cm
function inchesToCm(inches) {
    var cm = inches * 2.54;
    return cm
}

// feet to inches
function feetToInches(feet) {
    var inches = feet * 12;
    return inches
}

// stones to kg
function stonesToKg(stones) {
    var kg = stones * 6.35029;
    return kg
}

// pounds to kg
function poundsToKg(pounds) {
    var kg = pounds * 0.453592;
    return kg
}

// stones to pounds
function stonesToPounds(stones) {
    var pounds = stones * 14;
    return pounds
}

// calculate calorie intake based on activity level
function calculateCalorieIntake(BMR, activity_level) {
    var calorie_intake = 0;
    switch (activity_level) {
        case "sedentary":
            calorie_intake = BMR * 1.2;
            break;
        case "lightly_active":
            calorie_intake = BMR * 1.375;
            break;
        case "moderately_active":
            calorie_intake = BMR * 1.55;
            break;
        case "very_active":
            calorie_intake = BMR * 1.725;
            break;
        case "super_active":
            calorie_intake = BMR * 1.9;
            break;
    }
    return calorie_intake;
}