var Console = function(consoleObj,consoleLineObj) {
	var console = $(consoleObj);
	var consoleLine = $(consoleLineObj);
	return {
		Initialize: function() {
		
		},
		WriteLine: function(data) {
			var cin = this.ReadLine();
			consoleLine.detach();
			var consoleData = console.html();
			console.html(consoleData + "<span class='pointToResponse'>></span>" + "<span class = 'dataIn'>" + cin + "</span>" + "<br><br>" + data + " " + consoleLine[0].outerHTML);
			consoleLine = $(consoleLineObj);					
		},
		ReadLine: function() {
			var data = consoleLine.val().trim();
			return data;
		},
		Focus: function() {
			consoleLine.focus();
		}
	}
}