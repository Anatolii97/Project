$(document).ready(function() {
	$('.header-burger').click(function(event) {
		$('.header-burger,.menu-body').toggleClass('active');
		$('body').toggleClass('lock');
	});
});