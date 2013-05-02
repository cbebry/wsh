function Console(consoleObj, consoleLineObj) {
    var console = $(consoleObj);
    var consoleLine = $(consoleLineObj);
    var inputhistory = [];
    var currentHistoryView = Infinity;

    return {

        Initialize: function () {
            var $this = this;
            consoleLine.live('keydown', function (e) {
                var keycode = e.which;
                if (keycode == 38 || keycode == 40) {
                    var direction = (keycode == 38 ? -1 : 1);
                    $this.ToggleHistory(direction);
                } else if (keycode == 13) {
                    var cin = $this.ReadLine();
                    $this.UpdateHistory(cin);
                }
            });
        },
        WriteLine: function (data) {
            var cin = this.ReadLine();
            consoleLine.detach();
            var consoleData = console.html();
            console.html(consoleData + "<span class = 'pointToResponse'>></span>" + "<span class = 'dataIn'>" + cin + "</span>" + "<br><br>" + data + " " + consoleLine[0].outerHTML);
            consoleLine = $(consoleLineObj);
        },
        ReadLine: function () {
            var data = consoleLine.val().trim();
            return data;
        },
        ResetHistoryView: function () {
            currentHistoryView = Infinity;
        },
        UpdateHistory: function (input) {
            inputhistory.push(input);
        },
        ToggleHistory: function (direction) {

            direction > 0 ? currentHistoryView++ : currentHistoryView--;

            if (inputhistory.length == 0 || (currentHistoryView == Infinity && direction > 0)) {
                return;
            } else if (currentHistoryView == Infinity && inputhistory.length > 0 && direction < 0) {
                currentHistoryView = inputhistory.length - 1;
            }

            if (currentHistoryView >= inputhistory.length) {
                currentHistoryView = Infinity;
                consoleLine.val("");
                return;
            } else if (currentHistoryView < 0) {
                currentHistoryView = 0;
            }
            consoleLine.val(inputhistory[currentHistoryView]);
            return;
        },
        Focus: function () {
            consoleLine.focus();
        },
        GetHistory: function () {
            return inputhistory;
        }

    }
}
