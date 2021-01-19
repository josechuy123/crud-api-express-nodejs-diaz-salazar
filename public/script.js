function iniciarMap(){
 
  var coord = {lat:19.24935828035389 ,lng: -103.69731343009585};
  var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 18,
    center: coord
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map
  });
}