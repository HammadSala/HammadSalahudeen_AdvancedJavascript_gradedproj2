window.iterationCount = 0;
window.resultArray = {};
var inpString = document.getElementById('InputText');
function showbutton() {
    document.getElementById('clear').style.display = "inline-block"
}
inpString.addEventListener('input', function (event) {

    console.log("Event listnner")
    searchInput();
})
function searchInput(event) {
    //console.log(document.getElementById('InputText').value)
    var inpText = document.getElementById('InputText').value;
    var resultArray = searchResume(inpText);
    displayResumeError(resultArray);
}

function inputclear() {
    //console.log("input cleared");
    document.getElementById('InputText').value = "";
    document.getElementById('Previous').style.display = "none"
    window.resultArray = data.resume;
    displayResumeContent(data.resume[0], 0);
    //console.log(data);
}


function searchResume(inpText) {
    console.log(inpText, inpText);
    if (inpText) {
        console.log("inside search inptext loop", inpText);
        var resultArray = data.resume.filter(function (inp) {
            return inp.basics.AppliedFor.toLowerCase().startsWith(inpText.toLowerCase());
        });

        //console.log(resultArray);
        return resultArray;
    } else {
        document.getElementById('Previous').style.display = "block"
        document.getElementById('Next').style.display = "block"
        return data.resume;
    }


}

function displayResumeError(resultArray) {
    console.log("result array leng", resultArray.length, resultArray);
    if (resultArray.length === 0) {
        //console.log("empty reuslts")
        document.getElementById('ErrorDisplay').style.display = "block";
        document.getElementById('resume-display-area').style.display = "none";
    } else {
        document.getElementById('ErrorDisplay').style.display = "none";
        document.getElementById('resume-display-area').style.display = "block";
        displayResume(resultArray, 0);


    }
}

function displayResume(resultArray, iterationCount) {
    window.iterationCount = iterationCount;
    window.resultArray = resultArray;

    //console.log("display resume", iterationCount, window.iterationCount, resultArray, window.resultArray);
    displayResumeContent(resultArray[iterationCount], iterationCount);

}


document.addEventListener("DOMContentLoaded", function () {
    //console.log("Page loaded")
    document.getElementById('Previous').style.display = "none"
    window.resultArray = data.resume;
    displayResumeContent(data.resume[0], 0);

});

function doiNeedtodisplayNavigation(displayContent, iterationCount) {
    if (iterationCount === 0) {
        document.getElementById('Previous').style.display = "none"

    } else {
        document.getElementById('Previous').style.display = "block"

    }

    if ((resultArray.length - 1) === iterationCount) {

        document.getElementById('Next').style.display = "none"
    } else {
        document.getElementById('Next').style.display = "block"

    }
}

function displayResumeContent(displayContent, iterationCount) {
    doiNeedtodisplayNavigation(displayContent, iterationCount);
    //console.log(displayContent);
    document.getElementById('name').innerText = displayContent.basics.name;
    document.getElementById('appliedFor').innerHTML = displayContent.basics.AppliedFor;
    document.getElementById('mobile-number').innerHTML = displayContent.basics.phone;
    document.getElementById('email').innerHTML = displayContent.basics.email;
    var linkedLink = `<a href="${displayContent.basics.profiles.url}"> ${displayContent.basics.profiles.network}</a>`
    document.getElementById('linkedin').innerHTML = linkedLink;

    var outList = document.createElement('ul');
    displayContent.skills.keywords.forEach(function (content) {
        var insidePara = document.createElement('p');
        insidePara.textContent = content;
        outList.appendChild(insidePara);
    })
    //console.log(outList);
    document.getElementById('tech-skills').innerHTML = "";
    document.getElementById('tech-skills').appendChild(outList);

    var outListHobby = document.createElement('ul');
    displayContent.interests.hobbies.forEach(function (content) {
        var insidePara = document.createElement('p');
        insidePara.textContent = content;
        outListHobby.appendChild(insidePara);
    })
    document.getElementById('hobbies').innerHTML = "";
    document.getElementById('hobbies').appendChild(outListHobby);

    document.getElementById('prev-company-name').innerHTML = displayContent.work["Company Name"];
    document.getElementById('prev-company-position').innerHTML = displayContent.work["Position"];
    document.getElementById('prev-company-start-date').innerHTML = displayContent.work["Start Date"];
    document.getElementById('prev-company-end-date').innerHTML = displayContent.work["End Date"];
    document.getElementById('prev-company-summary').innerHTML = displayContent.work.Summary;
    var projectDetails = `<b>${displayContent.projects.name}</b> : ${displayContent.projects.description}`;
    document.getElementById('project-details').innerHTML = projectDetails;
    var collegeDetails = `${displayContent.education["UG"].institute}, ${displayContent.education["UG"].course}, ${displayContent.education["UG"]["Start Date"]}, ${displayContent.education["UG"]["End Date"]}, ${displayContent.education["UG"].cgpa}`;
    document.getElementById('ug').innerHTML = collegeDetails;
    var seniorSchool = `${displayContent.education["Senior Secondary"]["institute"]}, ${displayContent.education["Senior Secondary"]["cgpa"]}`;
    document.getElementById('senior-secondary').innerHTML = seniorSchool;
    var highSchool = `${displayContent.education["High School"]["institute"]}, ${displayContent.education["High School"]["cgpa"]}`;
    document.getElementById('high-school').innerHTML = highSchool;

    document.getElementById('internship-name').innerHTML = displayContent.Internship["Company Name"];
    document.getElementById('internship-position').innerHTML = displayContent.Internship.Position;
    document.getElementById('internship-start-date').innerHTML = displayContent.Internship["Start Date"];
    document.getElementById('internship-end-date').innerHTML = displayContent.Internship["End Date"];
    document.getElementById('internship-summary').innerHTML = displayContent.Internship.Summary;

    document.getElementById('achievements').innerHTML = displayContent.achievements.Summary;

}

function nextResume() {
    //console.log("next resume",  window.iterationCount, window.resultArray);
    resultArray = window.resultArray;
    iterationCount = window.iterationCount;
    //console.log(window.resultArray.length);
    if (window.iterationCount < (window.resultArray.length - 1)) {
        window.iterationCount++;
        //console.log("iterated," , window.iterationCount);
    }

    displayResumeContent(window.resultArray[window.iterationCount], window.iterationCount);

    if ((resultArray.length - 1) === iterationCount) {

        document.getElementById('Next').style.display = "none"
    }
    if (iterationCount > 0) {
        document.getElementById('Previous').style.display = "block"
    }
}

function previousResume() {
    //console.log( window.iterationCount, window.resultArray.length-1)
    if (window.iterationCount !== 0 && window.iterationCount <= (window.resultArray.length - 1)) {
        window.iterationCount--;
        displayResumeContent(window.resultArray[window.iterationCount], window.iterationCount);
    }
    if (window.iterationCount === 0) {
        document.getElementById('Previous').style.display = "none"

    }
}

