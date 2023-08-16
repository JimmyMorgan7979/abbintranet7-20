const adminPassword = "abb240"

function addEnable(){
    //var password = "test";
    var userPass = prompt("Enter Password to continue");
    if (userPass === adminPassword){
        document.getElementById("addCard").removeAttribute("disabled");
        document.getElementById("addCard").className = "btn btn-success";

    }
}

function editEnable(x){
    //var password = "test";
    var userPass = prompt("Enter Password to continue");
    if (userPass === adminPassword){
        document.getElementById(x).removeAttribute("disabled");
        document.getElementById(x).className = "btn btn-success m-2";
    }
}

function moveEnable(){
    //var password = "test";
    var userPass = prompt("Enter Password to continue");
    if(userPass === adminPassword){
        document.getElementById("moveButton").removeAttribute("disabled");
        document.getElementById("moveButton").className = "btn btn-success";
    }
}

function addPartEnable(){
    var userPass = prompt("Enter Password to continue");
    if(userPass === adminPassword){
        document.getElementById("addPart").removeAttribute("disabled");
        document.getElementById("addPart").className = "btn btn-success mx-3";
    }
}