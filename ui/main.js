
var submit = document.getElementById('submit');
submit.onclick = function () { 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log('user logged in');
                aletr('logged in successfully');
            }
            else if(request.status === 403) {
                alert('username/password is incorrect');
            } else if(request.status === 500) {
                alert('Something went wrong on server');
                
            }
        }
    };
  var username=document.getElementById('username').value;
  var password=document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST','http://phemanthkumar23.imad.hasura-app.io/submit-name?name=' + name, true);
  request.setRequestHeader('conetnt-type', 'application/json');
  request.send(JSON.stringify({username:username,password: password}));
};