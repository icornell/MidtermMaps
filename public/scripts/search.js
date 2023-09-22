//Include jQuery library
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>;

// Include the search form
$(document).ready(function () {

  $("form").submit(function (event) {
    event.preventDefault();

    var query = $('input[name="query"]').val();

    $.ajax({
      url: "/search",
      method: "GET",
      data: { query: query },
      success: function (data) {
        $("#search-results").html(data);
      },
      error: function () {
        console.log("Error occurred while fetching search results.");
      },
    });
  });
});

