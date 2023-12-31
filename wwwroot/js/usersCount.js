﻿
//create connection

var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to methods that hub invokes aka receive notfications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});

// invoke hub methods aka send notfications to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}
//start connection
function fulfilled() {
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}
function rejected() {
    console.log("Connection to user hub rejected"); 
}
connectionUserCount.start().then(fulfilled, rejected);