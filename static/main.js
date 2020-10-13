// image view loader
function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var id = '#image' + id;
        reader.onload = function(e) {
            $(id).attr('src', e.target.result);
            console.log(id);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}
$("#imgInp1").change(function() {
    readURL(this, 1);
});
$("#imgInp2").change(function() {
    readURL(this, 2);
});


// ajax send image to api
$('#loading').hide();
$(function() {
    $('#myBtn').click(function() {

        setTimeout(function() {
            $('#loading').show();
        }, 100);
        var form_data = new FormData($('#imageUploadForm')[0]);
        $.ajax({
            type: 'POST',
            url: '/upload',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            complete: function() { setTimeout(function() { $('#loading').hide(); }, 0); },
            success: function(data) {
                console.log(data);
                // Update Image
            },
        });
    });
});
$("#imgInp1").on("change", function() { //auto submit button
    $("#myBtn").click();
});
$("#imgInp2").on("change", function() { //auto submit button
    $("#myBtn").click();
});


//initilize graph with zeros
updateGraph(0, 0, 0);
// Graph updater
function updateGraph(normal, covid, pneumonia) {
    var normal = normal;
    var covid = covid;
    var pneumonia = pneumonia

    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['', 'Normal', 'Covid', 'Pneumonia'],
            ['Disease', normal, covid, pneumonia]
        ]);

        var options = {
            chart: {
                // title: 'Results',
                subtitle: 'Histogram of Predicted Results',
            }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }
};