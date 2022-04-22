export async function delPost(el){
    if (confirm('Are You Sure You Want to Delete this Post?')){
        await fetch(`/api/posts/${el.getAttribute('postid')}`, {
            method: 'DELETE',
        });

        document.location.reload();
    }
};