$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    }
  );

  var html5Slider = document.getElementById('html5');

noUiSlider.create(html5Slider, {
	start: [ 10, 30 ],
  direction: 'rtl',
  step: 1,
	connect: true,
	range: {
		'min': 20,
		'max': 40
	}
});
