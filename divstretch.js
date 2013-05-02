var test;
function Resizeable(selector) {
	var mousedownX = Array(false, false);
	var mousedownY = Array(false, false);
	var storeW = 0;
	var storeH = 0;
	var storeX = 0;
	var storeY = 0;
	var elem = $(selector);
	var itemOffset = elem.offset();
	var width = parseFloat(elem.css('width'));
	var height = parseFloat(elem.css('height'));
	test = elem.parents();

	elem.mousedown(function (e) {
		itemOffset = elem.offset();
		/////Test
		
		width = parseFloat(elem.css('width'));
		height = parseFloat(elem.css('height'));
		if (Math.abs(e.pageX - itemOffset.left) <= 4) {
			mousedownX[0] = true;
			storeX = itemOffset.left;
			storeW = parseFloat(elem.css('width'));
		} else if (Math.abs(e.pageX - (itemOffset.left + width)) <= 2) {
			mousedownX[1] = true;
		}
		if (Math.abs(e.pageY - itemOffset.top) <= 4) {
			mousedownY[0] = true;
			storeY = itemOffset.top;
			storeH = parseFloat(elem.css('height'));
		} else if (Math.abs(e.pageY - (itemOffset.top + height)) <= 4) {
			mousedownY[1] = true;
		}
	});

	$(document).mouseup(function (e) {
		mousedownX = Array(false, false);
		mousedownY = Array(false, false);
		storeX = 0;
		storeY = 0;
		storeW = 0;
		storeH = 0;
		$('body').css({
		'cursor' : 'default'
		})	
	});

	$(document).mousemove(function (e) {
	
		itemOffset = elem.offset();
		var dragged = false;
		//Horizontal Scale
		if (mousedownX[0] && storeW + (storeX - e.pageX) > 0) {
		  dragged = true;
			elem.css({
				'margin-left': e.pageX - itemOffset.left + parseFloat(elem.css('margin-left')),
				'width': storeW + (storeX - e.pageX),
			});
		} else if (mousedownX[1]) {
		   dragged = true;
			if (e.pageX >= itemOffset.left) {
				elem.css({
					'width': e.pageX - itemOffset.left,	
				});
			}
		}

		if (mousedownY[0] && storeH + (storeY - e.pageY) > 0) {
		   dragged = true;
			elem.css({
				'margin-top': e.pageY - itemOffset.top + parseFloat(elem.css('margin-top')),
				'height': storeH + (storeY - e.pageY),
			});
		} else if (mousedownY[1]) {
		   dragged = true;
			if (e.pageY >= itemOffset.top) {
				elem.css({
					'height': e.pageY - itemOffset.top,
				});
			
				
			}
		}
		 if(!dragged && IsOverEdge(e)){
			$('body').css({
			'cursor' : 'move'
			})
		} else if(dragged) {
			$('body').css({
			'cursor' : 'move'
			})
		}
		else {
			$('body').css({
			'cursor' : 'default'
			})	
		}
		


	})
	
	function IsOverEdge(e) {
	   var width = parseFloat(elem.css('width'));
	   var height = parseFloat(elem.css('height'));
	   var itemOffset = elem.offset();
		if (Math.abs(e.pageX - itemOffset.left) <= 3 || Math.abs(e.pageX - (itemOffset.left + width)) <= 3 || Math.abs(e.pageY - itemOffset.top) <= 3 || Math.abs(e.pageY - (itemOffset.top + height)) <= 3) {
			return true;
		}
		return false;
	}
}