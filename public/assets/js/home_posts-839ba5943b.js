{let t=function(){let t=$("#new-post-form");t.submit((function(s){s.preventDefault(),$.ajax({type:"post",url:"posts/create",data:t.serialize(),success:function(t){let s=e(t.data.post);$("#post-div-container>ul").prepend(s),o(t.message),n($(".delete-post-button",s)),i($("form",s)),c($(".like-button",s))},error:function(t){console.log(t.responseText)}})}))},e=function(t){return`<li id='post-${t._id}'>\n        <p>    \n        ${t.content} <a class="like-button" id="like-${t._id}" href="/likes/toggle/?id=${t._id}&type=Post"> - ${t.likes.length} <i class="fa-solid fa-thumbs-up"></i> Like</a> <br>\n            - ${t.user.name}\n            \n                <a class="delete-post-button" id="${t._id}" href="/posts/destroy/${t._id}"> - Delete Post</a>\n               \n            <form action='comments/create' id="new-comment-form-${t._id}" method="post">\n                <textarea name="content" cols="20" rows="1" placeholder="Add a Comment...." required></textarea>\n                <input type="hidden" name="post" value="${t._id}">\n                <input type="submit" value="Comment">\n            </form>\n            <div id="comment-div-container">\n                <ul id=post-comments-${t._id}>\n                   \n                </ul>\n        \n            </div>\n            \n        </p>\n       \n    </li>\n    `},n=function(t){var e=$(t[0]).attr("id");$(`#${e}`).click((function(e){e.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),o(t.message)},error:function(t){console.log(t.responseText)}})}))},o=function(t){new Noty({theme:"bootstrap-v4",text:t,type:"success",layout:"topRight",timeout:1500}).show()},i=function(t){var e=$(t[0]).attr("id");let n=$(`#${e}`);n.submit((function(t){t.preventDefault(),$.ajax({type:"post",url:"comments/create",data:n.serialize(),success:function(t){let e=s(t.data.comment),n=t.data.post._id;$(`#comment-div-container #post-comments-${n}`).prepend(e),o(t.message),a($(".delete-comment-button",e)),c($(".like-button",e))},error:function(t){console.log(t.responseText)}})}))},s=function(t){return`<li id='comment-${t._id}'>\n        <p>\n            Comment - ${t.content} <a class="like-button" id="like-${t._id}" href="/likes/toggle/?id=${t._id}&type=Comment"> - ${t.likes.length} <i class="fa-solid fa-thumbs-up"></i> Like</a> <br>\n            @ ${t.user.name} \n            <a href="/comments/destroy/${t._id}" id="${t._id}" class="delete-comment-button"> - Delete Comment</a>\n        </p>\n    </li> `},a=function(t){var e=$(t[0]).attr("id");$(`#${e}`).click((function(e){e.preventDefault(),$.ajax({type:"get",url:t.prop("href"),success:function(t){$(`#comment-${t.data.comment_id}`).remove(),o(t.message)},error:function(t){console.log(t.responseText)}})}))},c=function(t){var e=$(t[0]).attr("id");$(`#${e}`).click((function(n){n.preventDefault(),$.ajax({type:"post",url:t.prop("href"),success:function(t){let n=parseInt($(`#${e}`).attr("data-likes"));n||(n=0),1==t.data.deleted?n-=1:n+=1,$(`#${e}`).attr("data-likes",n),$(`#${e}`).html(`- ${n} Likes`),o(t.message)},error:function(t){console.log(t.responseText)}})}))},l=function(){$("#post-div-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e)}))},r=function(){$("#post-div-container>ul>li").each((function(){let t=$(this),e=$("form",t);i(e)}))},u=function(){$("#comment-div-container>ul>li").each((function(){let t=$(this),e=$(".delete-comment-button",t);a(e)}))},d=function(){$("#post-div-container>ul>li").each((function(){let t=$(this),e=$(".like-button",t);c(e)})),$("#comment-div-container>ul>li").each((function(){let t=$(this),e=$(".like-button",t);c(e)}))};t(),l(),r(),u(),d()}