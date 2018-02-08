$(document).ready(function ($) {

    // Adding article comments
    $(".edit-article").click(function () {
        location.href = "comments/" + $(this).data("id");
    });

    // Delete all articles
    $("#delete-articles").click(function () {
        $.ajax({
            url: '/delete',
            method: "POST"
        });
    });

    // Delete a single article
    $(".delete-article").click(function () {
        $.ajax({
            url: "/delete",
            method: "POST",
            data: {
                id: $(this).data("id")
            }
        });

        location.reload();
    });

    // Submit a comment
    $("#comment-submit").click(function () {
        let comment = $("#comment-input").val().trim();
        let articleId = $("#article-id").data("id");
        let date = moment().format("YYYY-MM-DD HH:MM:SS");

        if (!comment) {
            window.alert("Enter a comment!");
        } else {
            // TODO: Only do this after successful POST
            setTimeout(function () {
                $("#comments-div").append(`
            <div class="card">
              <header class="card-header">
                <p class="card-header-title">
                  Added: ${date}
                </p>
              </header>
              <div class="card-content">
                <div class="content">
                  ${comment}
                </div>
              </div>
            </div>
            <br>`);

            }, 200)

            $.ajax({
                url: "/comments/" + articleId,
                method: "POST",
                data: {
                    comment: comment,
                    created_date: date
                },
            });

            // Empties out input field
            $("#comment-input").val("");
        }

    });


});