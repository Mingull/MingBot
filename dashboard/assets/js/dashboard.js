$("input[name='bgColor']").on('input', function () {
    $("input[type='radio']").prop('checked', false);
});

$('.tabs a, #sidebarExtension h4, #sidebarExtension .large-icon, .overviewBtn').on('click', function () {
    $('.tabs a').removeClass('active');
    setModule($(this).attr('id'));
});

function setModule(name) {
    $('.module').hide();
    $(`#${name}Module`).show();
    $(`#${name}`).addClass('active');
}

$('input').on('input', function () {
    $(this)[0].checkValidity()
        ? $(this).removeClass('border border-danger') && $(this).addClass('border border-success')
        : $(this).addClass('border border-danger');


    $('button.btn.btn.success')
        .attr('disabled', !$('form')[0].checkValidity());
})

setModule('rankCard')


let counterSecs = 10;
let counterMins = 1;
let counterHours = 1;
let counterDays = 1;
let counterWeeks;

function calcTimeHourly(milliseconds) {
    const minutes = $('#hMins')[0];
    const seconds = $('#hSecs')[0];
    if (!seconds) return
    if (!minutes) return

    const secText = seconds.innerHTML.split(" ")[0];
    const secTime = seconds.innerHTML.split(" ")[1];
    ;
    const minText = minutes.innerHTML.split(" ")[0];
    const minTime = minutes.innerHTML.split(" ")[1];

    counterSecs = parseInt(secTime);
    counterMins = parseInt(minTime);
    counterSecs--;
    if (counterSecs < 10) counterSecs = "0" + counterSecs;
    if (counterMins < 10) counterMins = "0" + counterMins;

    if (counterSecs == 0) {
        counterSecs = 59;
        seconds.innerHTML = secText + " " + counterSecs;

        counterMins--;
        minutes.innerHTML = minText + " " + counterMins;
    } else {
        seconds.innerHTML = secText + " " + counterSecs;
    }

    if (counterMins < 0) {
        minutes.id = "";
        seconds.id = "";
        minutes.innerHTML = "No hourly cooldown";
        seconds.innerHTML = "Claim you hourly cooldown";
    }
}
function calcTimeDaily(milliseconds) {
    const timer = $('#dTimer')[0];
    // const seconds = $('#dSecs')[0];
    // const minutes = $('#dMins')[0];
    // const hours = $('#dHours')[0];
    if (!timer) return;
    // if (!seconds) return
    // if (!minutes) return
    // if (!hours) return
    const timerText = timer.innerHTML.split(":");
    const hours = timerText[0];
    const minutes = timerText[1];
    const seconds = timerText[2];
    // const secText = seconds.innerHTML.split(" ")[0];
    // const secTime = seconds.innerHTML.split(" ")[1];

    // const minText = minutes.innerHTML.split(" ")[0];
    // const minTime = minutes.innerHTML.split(" ")[1];

    // const hourText = hours.innerHTML.split(" ")[0];
    // const hourTime = hours.innerHTML.split(" ")[1];
    counterSecs = parseInt(seconds);
    counterMins = parseInt(minutes);
    counterHours = parseInt(hours);

    counterSecs--;
    if (counterSecs < 10) counterSecs = "0" + counterSecs;
    if (counterMins < 10) counterMins = "0" + counterMins;
    if (counterHours < 10) counterHours = "0" + counterHours;

    if (counterSecs == 0) {
        counterSecs = 59;
        // timer.innerHTML = counterHours + ":" + counterMins + ":" + counterSecs;

        counterMins--;
        if (counterMins == 0) {
            counterMins = 59;
            // timer.innerHTML = counterHours + ":" + counterMins + ":" + counterSecs;

            counterHours--;
            // timer.innerHTML = counterHours + ":" + counterMins + ":" + counterSecs;
        }// else {
        // timer.innerHTML = counterHours + ":" + counterMins + ":" + counterSecs;
        // }
    }// else {
    // timer.innerHTML = counterHours + ":" + counterMins + ":" + counterSecs;
    // }
    timer.innerHTML = counterHours + ":" + counterMins + ":" + counterSecs;

    // if (counterHours == 0 && counterMins < 0) {
    //     hours.id = "";
    //     minutes.id = "";
    //     seconds.id = "";
    //     hours.innerHTML = "No daily cooldown";
    //     minutes.innerHTML = "Claim you daily cooldown";
    //     seconds.innerHTML = "";
    // }
}
function calcTimeWeekly(milliseconds) {
    const seconds = $('#wSecs')[0];
    const minutes = $('#wMins')[0];
    const hours = $('#wHours')[0];
    const days = $('#wDays')[0];
    if (!seconds) return
    if (!minutes) return
    if (!hours) return
    if (!days) return

    const secText = seconds.innerHTML.split(" ")[0];
    const secTime = seconds.innerHTML.split(" ")[1];

    const minText = minutes.innerHTML.split(" ")[0];
    const minTime = minutes.innerHTML.split(" ")[1];

    const hourText = hours.innerHTML.split(" ")[0];
    const hourTime = hours.innerHTML.split(" ")[1];

    const dayText = hours.innerHTML.split(" ")[0];
    const dayTime = hours.innerHTML.split(" ")[1];

    counterSecs = parseInt(secTime);
    counterMins = parseInt(minTime);
    counterHours = parseInt(hourTime);
    counterDays = parseInt(dayTime);
    counterSecs--;
    if (counterSecs < 10) counterSecs = "0" + counterSecs;
    if (counterMins < 10) counterMins = "0" + counterMins;

    if (counterSecs == 0) {
        counterSecs = 59;
        seconds.innerHTML = secText + " " + counterSecs;

        counterMins--;
        if (counterMins == 0) {
            counterMins = 59;
            minutes.innerHTML = minText + " " + counterMins;

            counterHours--;
            if (counterHours == 0) {
                counterHours = 59;
                hours.innerHTML = hourText + " " + counterHours;

                counterDays--;
                days.innerHTML = dayText + " " + counterDays;
            } else {
                hours.innerHTML = hourText + " " + counterHours;
            }
        } else {
            minutes.innerHTML = minText + " " + counterMins;
        }
    } else {
        seconds.innerHTML = secText + " " + counterSecs;
    }

    if (counterDays == 0 && counterHours == 0 && counterMins < 0) {
        days.id = "";
        hours.id = "";
        minutes.id = "";
        seconds.id = "";
        days.innerHTML = "No weekly cooldown";
        hours.innerHTML = "Claim you weekly cooldown";
        minutes.innerHTML = "";
        seconds.innerHTML = "";
    }
}
function calcTimeMonthly(milliseconds) {
    const seconds = $('#mSecs')[0];
    const minutes = $('#mMins')[0];
    const hours = $('#mHours')[0];
    const days = $('#mDays')[0];
    const weeks = $('#mWeeks')[0];
    if (!seconds) return
    if (!minutes) return
    if (!hours) return
    if (!days) return
    if (!weeks) return

    const secText = seconds.innerHTML.split(" ")[0];
    const secTime = seconds.innerHTML.split(" ")[1];

    const minText = minutes.innerHTML.split(" ")[0];
    const minTime = minutes.innerHTML.split(" ")[1];

    const hourText = hours.innerHTML.split(" ")[0];
    const hourTime = hours.innerHTML.split(" ")[1];

    const dayText = hours.innerHTML.split(" ")[0];
    const dayTime = hours.innerHTML.split(" ")[1];

    const weekText = weeks.innerHTML.split(" ")[0];
    const weekTime = weeks.innerHTML.split(" ")[1];

    counterSecs = parseInt(secTime);
    counterMins = parseInt(minTime);
    counterHours = parseInt(hourTime);
    counterDays = parseInt(dayTime);
    counterWeeks = parseInt(weekTime);
    counterSecs--;
    if (counterSecs < 10) counterSecs = "0" + counterSecs;
    if (counterMins < 10) counterMins = "0" + counterMins;
    if (counterHours < 10) counterHours = "0" + counterHours;
    if (counterDays < 10) counterDays = "0" + counterDays;
    if (counterWeeks < 10) counterWeeks = "0" + counterWeeks;

    if (counterSecs == 0) {
        counterSecs = 59;
        seconds.innerHTML = secText + " " + counterSecs;

        counterMins--;
        if (counterMins == 0) {
            counterMins = 59;
            minutes.innerHTML = minText + " " + counterMins;

            counterHours--;
            if (counterHours == 0) {
                counterHours = 59;
                hours.innerHTML = hourText + " " + counterHours;

                counterDays--;
                if (counterDays == 0) {
                    counterDays = 6;
                    days.innerHTML = dayText + " " + counterDays;

                    counterWeeks--;
                    weeks.innerHTML = weekText + " " + counterWeeks;

                } else {
                    days.innerHTML = dayText + " " + counterDays;
                }
            } else {
                hours.innerHTML = hourText + " " + counterHours;
            }
        } else {
            minutes.innerHTML = minText + " " + counterMins;
        }
    } else {
        seconds.innerHTML = secText + " " + counterSecs;
    }

    if (counterWeeks == 0 && counterDays == 0 && counterHours == 0 && counterMins < 0) {
        weeks.id = "";
        days.id = "";
        hours.id = "";
        minutes.id = "";
        seconds.id = "";
        weeks.innerHTML = "No hourly cooldown";
        days.innerHTML = "Claim you hourly cooldown";
        hours.innerHTML = "";
        minutes.innerHTML = "";
        seconds.innerHTML = "";
    }
}

function calcTime() {
    calcTimeHourly()
    calcTimeDaily()
    calcTimeWeekly()
    calcTimeMonthly()
    setTimeout(() => {
        calcTime()
    }, 1000);
}

calcTime()