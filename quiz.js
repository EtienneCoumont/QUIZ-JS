var name = sessionStorage.getItem('name') || '';
document.getElementById('username').innerHTML = name;
document.getElementById('end').style.display = 'none';
if (name === 'null') {
    // window.location.href = 'feedback.html';
}
var timer = setInterval(countdown, 1000);

var minutes = 1;
var seconds = 60;
countdown();
function countdown() {
    if (seconds < 10) {
        document.getElementById("seconds").innerHTML = "0" + (--seconds);
    }
    else {
        document.getElementById("seconds").innerHTML = --seconds;
    }
    if (minutes >= 0 || minutes < 10) {
        document.getElementById("minutes").innerHTML = "0" + minutes;
    }
    else {
        document.getElementById("minutes").innerHTML = minutes;
    }

    if (minutes == 0 && seconds == 0) {
        stoptime();
        submittest();
    }
    if (seconds == 0) {
        seconds = 60;
        minutes = minutes - 1;
    }
}
function gotofinalpage() {
    window.location.href = 'feedback.html';
    sessionStorage.removeItem('name');
}
function stoptime() {
    clearInterval(timer);
    minutes = 0;
    seconds = 0;
}
var questions = [
    {
        question: "La biodiversité en Suisse se porte mieux aujourd'hui qu'il y a quelques décennies.",
        options: ["0", "1", "2", "3", "4", "5"],
        ans: "0"
    },
    {
        question: "Comparée au reste de l'Europe, la Suisse compte un taux d'aires protégées élevé.",
        options: ["0", "1", "2", "3", "4", "5"],
        ans: "5"
    },
    {
        question: "La Suisse compte le plus faible taux d'espèces menacées en Europe.",
        options: ["0", "1", "2", "3", "4", "5"],
        ans: "0"
    },
    {
        question: "Je suis méfiant envers les alertes d’urgences émises par les biologistes.",
        options: ["0", "1", "2", "3", "4", "5"],
        ans: "5"
    }
];
var box = document.getElementById("qbox");
var table = document.getElementById("table");
for (let i = 0; i < questions.length; i++) {
    var head = document.createElement('H1');
    var data = document.createTextNode((i + 1) + "." + questions[i].question);
    head.setAttribute("id", "question");
    head.appendChild(data);
    box.appendChild(head);
    for (let op = 0; op < questions[i].options.length; op++) {
        var radio = document.createElement('INPUT');
        radio.setAttribute("type", "radio");
        radio.setAttribute("name", "question" + i);
        radio.setAttribute("value", questions[i].options[op]);
        radio.setAttribute("id", "option" + op);
        var span = document.createElement("SPAN");
        var radiodata = document.createTextNode(questions[i].options[op]);
        span.appendChild(radiodata);
        var breakline = document.createElement("BR");
        box.appendChild(radio);
        box.appendChild(span);
        box.appendChild(breakline);

    }
    var hr = document.createElement('HR');
    box.appendChild(hr);
}
function submittest() {
    stoptime();
    sessionStorage.removeItem('name');
    var ans_value;
    var correctanswers = 0;
    var notanswered = 0;
    var wronganswers = 0;
    var answered = 0
    var result;
    for (var i = 0; i < questions.length; i++) {
        res = document.querySelector('input[name=question' + i + ']:checked');
        var result = (res) ? res.value : 'null';
        if (result !== 'null') {
            answered++;
            if (questions[i].ans === result) {
                correctanswers = correctanswers + 1;
            }
            else {
                wronganswers++;
            }
        }
        else {
            notanswered++;
        }
    }
    document.getElementById("box").style.display = 'none';
    document.getElementById('answered').innerHTML = answered;
    document.getElementById('correct').innerHTML = correctanswers;
    document.getElementById('incorrect').innerHTML = wronganswers;
    var score = correctanswers * 10 - wronganswers * 2;
    document.getElementById('Percentage').innerHTML = score + " (" + (score / (answered * 10)) * 100 + " %)";
    if (notanswered === (questions.length)) {
        document.getElementById('Percentage').innerHTML = "Fail";
    }
    document.getElementById('report').style.display = 'block';
    document.getElementById('end').style.display = 'block';
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Complete Report Analysis"
        },
        data: [{
            type: "area",
            yValueFormatString: "0",
            indexLabel: "{label} {y}",
            dataPoints: [
                { y: answered, label: "Answered" },
                { y: wronganswers, label: "Incorrect" },
                { y: correctanswers, label: "Correct" },
                { y: notanswered, label: "Not Answerd" }
            ]
        }]
    });
    chart.render();
    //document.getElementById('pie').innerHTML=chart;
}