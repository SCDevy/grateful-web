var currentSubmissions = [];

$(document).ready(function() {
    $.ajax({
        url: '/api/comments',
        dataType: 'json',
        cache: false,
        success: function(data) {
            for(var i = 0; i < data.length; i++) {
                var id = 'submission' + i;
                currentSubmissions[i] = id;
                if(i === 0) {
                    startingPosition = [
                        $('#content').height() / 2 - 80,
                        $('#content').width() / 2 - 260
                    ];
                }
                else {
                    var startingPosition = randomPosition();
                }
                renderSubmission(data[i], id, startingPosition);
                fadeSubmissions(0);
            }
        },
        error: function(xhr, status, err) {
            console.error(this.url, status, err.toString());
        }
    });
});

function renderSubmission(data, id, startingPosition) {
    $('#content').append(function() {
        var text = '<p class="text">&ldquo;' + data.text + '&rdquo;</p>';
        var date = '<div class="date">' + data.date + '</div>';
        // var submission = '<div class="submission" id="' + id + '">' + text + date + '</div>';
        var submission = '<div style="display: none; top:' + startingPosition[0] + 'px; left:' + startingPosition[1] + 'px;" class="submission" id="' + id + '">' + text + date + '</div>';
        return submission;
    });
}

function animateSubmission(selector) {
    var newPosition = randomPosition();
    $(selector).animate({ top: newPosition[0], left: newPosition[1] }, 16000, function() {
        animateSubmission(selector);
    });
}

function fadeSubmissions(currentSubmission) {
    var submission = $('#' + currentSubmissions[currentSubmission]);
    submission.fadeIn(900);
    setTimeout(function() {
        var newPosition = randomPosition();
        submission.fadeOut(900, function() {
            submission.css({'top': newPosition[0], 'left': newPosition[1]});
        });
        if(currentSubmission === currentSubmissions.length - 1) {
            fadeSubmissions(0);
        }
        else {
            currentSubmission++;
            fadeSubmissions(currentSubmission);
        }
    }, 4200);
}

function randomPosition() {
    var h = $('#content').height() - 160 - 40; // extra padding a four-line submission element
    var w = $('#content').width() - 520 - 40; // width of submission element

    var nh = Math.floor(Math.random() * h) + 20;
    var nw = Math.floor(Math.random() * w) + 20;

    return [nh,nw];
}
