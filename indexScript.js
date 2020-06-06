let application_id = "52b667af24a1de9eb0d3959cee2fc4d8";
let xhr = new XMLHttpRequest();

function getIdRequest() {
    let nick = document.getElementById("nick").value;
    xhr.open("GET", "https://api.worldoftanks.ru/wot/account/list/?application_id=" + application_id + "&search=" + nick);
    xhr.onreadystatechange = getId;
    xhr.send();
}

function getId() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let resData = JSON.parse(xhr.responseText);

        if (!resData.meta["count"]) { // если не найдет ниодного совпадения по этому нику
            alert("Wrong nick!");
        } else {
            let account_id = resData.data[0].account_id;// если надет - берем первого, он тот, который нам нужен
            getAchievements(account_id);
        }
    }
}

function getAchievements(account_id) {
    xhr.open("GET", "https://api.worldoftanks.ru/wot/account/achievements/?application_id=" + application_id + "&account_id=" + account_id);
    xhr.onreadystatechange = update;
    xhr.send();
}


function update() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        let resData = JSON.parse(xhr.responseText);
        let achiv = resData.data;
        getAchievementsTable(achiv);
    }
}

function getAchievementsTable(achiv) {

    let achivHtml = "<tr> Achievements </tr>";
    achivHtml += "<tr><td> Medal: </td><td> Amount: </td></tr>";

    for (const key in achiv) {

        for (let medal in achiv[key].achievements) {
            achivHtml += "<tr>";
            achivHtml += "<td>" + medal + "</td><td>" + achiv[key].achievements[medal] + "</td>";
            achivHtml += "</tr>";
        }
    }
    document.getElementById("achiv-table-body").innerHTML = achivHtml;


    let seriaHtml = "<tr> Max series of achievements </tr>";
    seriaHtml += "<tr><td> Achievement: </td><td> seria: </td></tr>";

    for (const key in achiv) {

        for (let medal in achiv[key].max_series) {
            seriaHtml += "<tr>";
            seriaHtml += "<td>" + medal + "</td><td>" + achiv[key].max_series[medal] + "</td>";
            seriaHtml += "</tr>";
        }
    }
    document.getElementById("seria-table-body").innerHTML = seriaHtml;

    let fragsHtml = "<tr> Frags </tr>";
    fragsHtml += "<tr><td> Frags: </td><td> Amount: </td></tr>";

    for (const key in achiv) {

        for (let frag in achiv[key].frags) {
            fragsHtml += "<tr>";
            fragsHtml += "<td>" + frag + "</td><td>" + achiv[key].frags[frag] + "</td>";
            fragsHtml += "</tr>";
        }
    }
    document.getElementById("frags-table-body").innerHTML = fragsHtml;
}