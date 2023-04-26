{
    // Method to submit form data for new post using AJAX
   let createPost = function()
   {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function(event)
    {
        event.preventDefault();

        $.ajax(
            {
                type:'post',
                url:'posts/create',
                data:newPostForm.serialize(),
                success:function(data)
                {
                    let newPost = newPostDOM(data.data.post);
                    $('#post-div-container>ul').prepend(newPost);
                    notyFunction(data.message);

                    
                        deletePost();

                    // deletePost($('.delete-post-button',newPost))
                },
                error:function(error)
                {
                    console.log(error.responseText);
                }
            }
        )
    })
    
   } 

      //Method to create a Post in DOM

      let newPostDOM = function(i)
      {
        return `<li id='post-${i._id}'>
        <p>    
        ${i.content}<br>
            - ${i.user.name}
           
                <a class="delete-post-button" href="/posts/destroy/${i._id}"> - Delete Post</a>
               
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

    let deletePost = function()
    {
        // $(deletelink).click(function(event)
        // let element=deletelink[0];
        // console.log(element)

        // element.addEventListener("click",function(event)
        //     {
        //     event.preventDefault();
        //     })

        // $(deletelink).click(function(event)
        // {
        //     console.log('test')
        //     event.preventDefault();
        // })

         let deleteButtonClick=document.querySelectorAll('.delete-post-button');
       
        for(var i=0;i<deleteButtonClick.length;i++)
            {
            let deletelink=$(deleteButtonClick[i]);
            deletelink.click(function(event)
            {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: deletelink.prop('href'),
                success: function(data) {
                   $(`#post-${data.data.post_id}`).remove();
                   notyFunction(data.message);
                },
                error: function(error) {
                   console.log(error.responseText);
                   }
                });
                        
            })
            }

     
        // $('#post-div-container').on('click', '.delete-post-button', function(event) 
        // {
        //     event.preventDefault();
        
        //     let deleteLink = $(this);
            
        //     $.ajax({
        //         type: 'get',
        //         url: deleteLink.prop('href'),
        //         success: function(data) {
        //             $(`#post-${data.data.post_id}`).remove();
        //             notyFunction(data.message);
        //         },
        //         error: function(error) {
        //             console.log(error.responseText);
        //         }
        //     });
        // });
        
    }

    let notyFunction = function(message)
    {
        new Noty({
            theme:'bootstrap-v4',
            text: message,
            type:'success',
            layout:'topRight',
            timeout:1500
        }).show();
    }

    // Method to submit form data for new comment using AJAX
    let createComment = function()
   {
    let testform=document.querySelectorAll('#new-comment-form')

    for(let i=0;i<testform.length;i++)
    {
        let newCommmentForm = $(testform[i]);
        newCommmentForm.submit(function(event)
    {
        event.preventDefault();

        $.ajax(
            {
                type:'post',
                url:'comments/create',
                data:newCommmentForm.serialize(),
                success:function(data)
                {
                    let newComment = newCommentDOM(data.data.comment);
                    let postbox=data.data.post._id
                
                    $(`#comment-div-container #post-comments-${postbox}`).prepend(newComment);
                    notyFunction(data.message);

                    deleteComment();

                },
                error:function(error)
                {
                    console.log(error.responseText);
                }
            }
        )
    })
    }
    
    
   } 

    //Method to create a comment in DOM

    let newCommentDOM = function(j)
      {
        return `<li id='comment-${j._id}'>
        <p>
            Comment - ${j.content} @ ${j.user.name}
            <a href="/comments/destroy/${j._id}" class="delete-comment-button"> - Delete Comment</a>
        </p>
    </li> `
      }

    //   Method to delete comment from DOM
    let deleteComment = function()
    {
        // $(deleteLink).click(function(event)

        let deleteButtonClick=document.querySelectorAll('.delete-comment-button');
       
        for(var i=0;i<deleteButtonClick.length;i++)
            {
            let deletelink=$(deleteButtonClick[i]);
            deletelink.click(function(event)
            {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: deletelink.prop('href'),
                success: function(data) {

                   $(`#comment-${data.data.comment_id}`).remove();
                   notyFunction(data.message);
                },
                error: function(error) {
                   console.log(error.responseText);
                   }
                });
                        
            })
            }
        
    }


      createPost();
      deletePost();
      createComment();
      deleteComment();

}

