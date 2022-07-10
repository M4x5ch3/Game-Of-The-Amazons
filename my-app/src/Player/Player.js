//legacy code
//potentially used at later point
fetch('https://gruppe12.toni-barth.com/players')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error));