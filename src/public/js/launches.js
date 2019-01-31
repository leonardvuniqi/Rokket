$(document).ready(function () {
    // When the page is ready make an ajax request to our server to get the 5 most recent rocket launches
    $.ajax({
        type: "GET",
        url: "/api/launch",
        success: function (response) {
            console.log('ajax success');
        }
    })
    .done(launchData => {
        // When the data is returned hide the loading spinner and show the map
        $('#loadingspinner').hide();
        $('#map').css("display", "block");

        // create a plots object to hold our plots for the launches
        let plots = {};
        console.log(launchData);

        // iterate through each launch creating a plot for that launch to be placed on the map
        launchData.launches.forEach(launch => {
            // create a new plot object
            let plot = {};
            // set the plots latitude and longitude
            plot.latitude = launch.location.pads[0].latitude;
            plot.longitude = launch.location.pads[0].longitude;
            // when we hover over a plot this tooltip will show up, in this case we are using bootstrap 4 card
            plot.tooltip = {
                content: "<div class='card' style='width: 18rem;'>" + 
                            "<img class='card-img-top' src='" + launch.rocket.imageURL + "' width='100' height='300'/>" +
                            "<div class='card-body'>" +
                                "<h5 class='card-title'>" + launch.name + "</h5>" + 
                                "<h6 class='card-subtitle text-muted'>" + launch.location.name + "</h6>" + 
                                "<p class='card-text'>Rocket is set to go off at: <span><br/>" + launch.windowstart + "</span></p>" +
                            "</div>" +
                         "</div>"
            };
            // Change the plot color
            plot.attrs = {
                fill: '#ff2836'
            };
            // Add the plot to the plots object
            plots[launch.id] = plot;
        });

        // Create our mapael map, with zoom feature enabled, and with our plots
        $(".mapcontainer").mapael({
            map: {
                name: "world_countries",
                defaultPlot: {
                    size: 10
                },
                zoom: {
                    enabled: true,
                    maxLevel: 10
                }
            },
            plots: plots
        });
    });
});