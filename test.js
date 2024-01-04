let btnCalculate = document.querySelector('#ageCalculate');
let dayInput = document.querySelector('#day')
let monthInput = document.querySelector('#month')
let yearInput = document.querySelector('#year')
let dayLabel = document.querySelector('#daylabel')
let monthLabel = document.querySelector('#monthLabel')
let yearLabel = document.querySelector('#yearLabel')
let dayError = document.querySelector('#dayError')
let monthError = document.querySelector('#monthError')
let yearError = document.querySelector('#yearError')


btnCalculate.addEventListener('click', () => {
    calculateAge();
    console.log('ello')
})

function checkInput(day) {
    if (day === "") {
        dayInput.style.borderColor = "red";
        dayError.textContent = 'field required';
        dayLabel.style.color = "red"
    } else if (day < 1 || day > 31) {
        dayInput.style.borderColor = "red";
        dayError.textContent = 'Invalid Day';
        dayLabel.style.color = "red"
    } else {
        dayInput.style.borderColor = " hsl(0, 0%, 86%)";
        dayError.textContent = '';
        dayLabel.style.color = " hsl(0, 0%, 86%)"
    }
}
function checkMonthInput(month) {
    if (month === "") {
        monthInput.style.borderColor = "red"
        monthError.textContent = 'field required'
        monthLabel.style.color = "red"
    } else if (month < 1 || month > 12) {
        monthInput.style.borderColor = "red"
        monthError.textContent = 'invalid month'
        monthLabel.style.color = "red"
    } else {
        monthInput.style.borderColor = " hsl(0, 0%, 86%)";
        monthError.textContent = '';
        monthLabel.style.color = " hsl(0, 0%, 86%)"
    }
}
function checkYearInput(year) {
    const currentYear = new Date().getFullYear();

    let isValid = year <= currentYear - 1;
    if (year === "") {
        yearInput.style.borderColor = "red"
        yearError.textContent = 'field required'
        yearLabel.style.color = "red"
    } else if (isValid) {
        yearInput.style.borderColor = " hsl(0, 0%, 86%)";
        yearError.textContent = '';
        yearLabel.style.color = " hsl(0, 0%, 86%)"


    } else if (!isValid) {
        yearInput.style.borderColor = "red"
        yearError.textContent = 'Must be is the past'
        yearLabel.style.color = "red"

    }

}

//check id date is valid or not. 

function isLeapYear(year) {
    // Function to check if a year is a leap year
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isValidDate(day, month, year) {

    let inputs = document.getElementsByTagName('input');
    let labels = document.getElementsByTagName('label');
    let inputsArray = [...inputs]

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const currentYear = new Date().getFullYear();
    let isValidYear = year <= currentYear - 1;

    if (!day || !month || !year) {
        console.log('empty dates , month or year');
        return false; // Empty values

    }

    if (!isValidYear) {
        console.log('invalid year');
        return false; // Empty values

    }

    if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
        console.log('invalid month or day');
        inputsArray.map((item, index) => {
            item.style.borderColor = "red";
            labels[index].style.color = "red";
            dayError.textContent = 'Invalid year';
        })
        return false; // Invalid month or day
    }

    if (month === 2 && day === 29 && !isLeapYear(year)) {
        console.log('invalid year');
        inputsArray.map((item, index) => {

            item.style.borderColor = "red";
            labels[index].style.color = "red";
            dayError.textContent = 'field required';


        })
        return false; // February 29 is not valid in non-leap years
    }
    return true; // Valid date

}

function calculateAge() {
    //check if any input is empty
    checkInput(dayInput.value)
    checkMonthInput(monthInput.value)
    checkYearInput(yearInput.value)
    const day = parseInt(document.getElementById('day').value, 10);
    const month = parseInt(document.getElementById('month').value, 10);
    const year = parseInt(document.getElementById('year').value, 10);
    if (isValidDate(day, month, year)) {
        const birthDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        const currentDate = moment();


        // Calculate the difference in years
        const ageInYears = currentDate.diff(birthDate, 'years');

        // Subtract the calculated years from the current date
        const remainingDays = currentDate.subtract(ageInYears, 'years');

        // Calculate the difference in months
        const ageInMonths = remainingDays.diff(birthDate, 'months');

        // Subtract the calculated months from the remaining days
        const remainingDaysAfterMonths = remainingDays.subtract(ageInMonths, 'months');

        // Calculate the difference in days
        const ageInDays = remainingDaysAfterMonths.diff(birthDate, 'days');

        // Update spans with calculated values
        document.getElementById('yearsSpan').innerText = ageInYears;
        document.getElementById('monthsSpan').innerText = ageInMonths;
        document.getElementById('daysSpan').innerText = ageInDays;

    }

}