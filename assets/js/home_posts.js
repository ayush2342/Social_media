{
    // Method to submit form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (event) {
            event.preventDefault();

            $.ajax(
                {
                    type: 'post',
                    url: 'posts/create',
                    data: newPostForm.serialize(),
                    success: function (data) {
                        let newPost = newPostDOM(data.data.post);
                        $('#post-div-container>ul').prepend(newPost);
                        notyFunction(data.message);

                        deletePost($('.delete-post-button',newPost));

                        createComment();
                        likeFunction();

                        
                    },
                    error: function (error) {
                        console.log(error.responseText);
                    }
                }
            )
        })

    }

    //Method to create a Post in DOM

    let newPostDOM = function (i) {
        return `<li id='post-${i._id}'>
        <p>    
        ${i.content} <a class="like-button" href="/likes/toggle/?id=${i._id}&type=Post"> - ${i.likes.length} <i class="fa-solid fa-thumbs-up"></i> Like</a> <br>
            - ${i.user.name}
            
                <a class="delete-post-button" id=${i._id} href="/posts/destroy/${i._id}"> - Delete Post</a>
               
            <form action='comments/create' id="new-comment-form" method="post">
                <textarea name="content" cols="20" rows="1" placeholder="Add a Comment...." required></textarea>
                <input type="hidden" name="post" value="${i._id}">
                <input type="submit" value="Comment">
            </form>

            <div id="comment-div-container">
                <ul id=post-comments-${i._id}>
                   
                </ul>
        
            </div>
            
        </p>
       
    </li>
    `
    }


    //   Method to delete post from DOM

    let deletePost = function (deletelink) {

      
        var element = $(deletelink[0]).attr("id");
        $(`#${element}`).click(function(event)
        {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: deletelink.prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();
                    notyFunction(data.message);
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        })

    }

    let notyFunction = function (message) {
        new Noty({
            theme: 'bootstrap-v4',
            text: message,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }

    // Method to submit form data for new comment using AJAX
    let createComment = function () {
        
        let testform = document.querySelectorAll('#new-comment-form')


        for (let i = 0; i < testform.length; i++) {
            let newCommmentForm = $(testform[i]);
            
            newCommmentForm.submit(function (event) {
                
                event.preventDefault();

                $.ajax(
                    {
                        type: 'post',
                        url: 'comments/create',
                        data: newCommmentForm.serialize(),
                        success: function (data) {
                            let newComment = newCommentDOM(data.data.comment);
                            let postbox = data.data.post._id

                            $(`#comment-div-container #post-comments-${postbox}`).prepend(newComment);
                            notyFunction(data.message);

                            deleteComment($('.delete-comment-button',newComment));
                            likeFunction();

                        },
                        error: function (error) {
                            console.log(error.responseText);
                        }
                    }
                )
            })
        }


    }

    //Method to create a comment in DOM

    let newCommentDOM = function (j) {
        return `<li id='comment-${j._id}'>
        <p>
            Comment - ${j.content} <a class="like-button"  href="/likes/toggle/?id=${j._id}&type=Comment"> - ${j.likes.length} <i class="fa-solid fa-thumbs-up"></i> Like</a> <br>
            @ ${j.user.name} 
            <a href="/comments/destroy/${j._id}" id=${j._id} class="delete-comment-button"> - Delete Comment</a>
        </p>
    </li> `
    }

    //   Method to delete comment from DOM
    let deleteComment = function (deleteCommentLink) {

        console.log(deleteCommentLink)

        var element = $(deleteCommentLink[0]).attr("id");
        $(`#${element}`).click(function(event)
        {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: deleteCommentLink.prop('href'),
                success: function (data) {

                    $(`#comment-${data.data.comment_id}`).remove();
                    notyFunction(data.message);
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        })

    }
  
    //   Method to Like/Unlike Post/Comment from DOM

    let likeFunction = function()
    {
        let likeButtonClick = document.querySelectorAll('.like-button');

        for (var i = 0; i < likeButtonClick.length; i++) {
            let likeLink = $(likeButtonClick[i]);
            likeLink.click(function (event) {
                event.preventDefault();

                $.ajax({
                    type: 'post',
                    url: likeLink.prop('href'),
                    success: function (data) {

                        notyFunction(data.message);
                    },
                    error: function (error) {
                        console.log(error.responseText);
                    }
                });

            })
        }

    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#post-div-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

        });
    }


    let convertCommentsToAjax = function(){
        $('#comment-div-container>ul>li').each(function(){
            let self = $(this);
            let deletecommentButton = $('.delete-comment-button', self);
            deleteComment(deletecommentButton);

        });
    }


    createPost();
    convertPostsToAjax();
    createComment();
    convertCommentsToAjax();
    likeFunction();


}

