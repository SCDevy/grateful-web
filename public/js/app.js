$(document).ready(function() {
    $.ajax({
        url: '/api/comments',
        dataType: 'json',
        cache: false,
        success: function(data) {
            for(var i = 0; i < data.length; i++) {
                var id = 'submission' + i;
                renderSubmission(data[i], id);
                // animateSubmission('#' + id);
            }
        },
        error: function(xhr, status, err) {
            console.error(this.url, status, err.toString());
        }
    });
});

function renderSubmission(data, id) {
    var startingPosition = randomPosition();

    $('#content').append(function() {
        var text = '<p class="text">&ldquo;' + data.text + '&rdquo;</p>';
        var date = '<div class="date">' + data.date + '</div>';
        // var submission = '<div class="submission" id="' + id + '">' + text + date + '</div>';
        var submission = '<div style="top:' + startingPosition[0] + 'px; left:' + startingPosition[1] + 'px;" class="submission" id="' + id + '">' + text + date + '</div>';
        return submission;
    });
}

function animateSubmission(selector) {
    var newPosition = randomPosition();
    $(selector).animate({ top: newPosition[0], left: newPosition[1] }, 16000, function() {
        console.log("animating...");
        animateSubmission(selector);
    });
}

function randomPosition() {
    var h = $('#content').height() - 160; // extra padding a four-line submission element
    var w = $('#content').width() - 520; // width of submission element

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh,nw];
}
