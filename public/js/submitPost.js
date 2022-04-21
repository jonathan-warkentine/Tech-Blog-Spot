//Add event listener to the submit button
document.getElementById("submitdraft").addEventListener('click', submitPost);

function submitPost(){
    const title = document.getElementById('title').value;
    const content = document.getElementById('post').value;
    let tags = document.getElementById('tags').value;
    tags = tags.replaceAll(',', '');

    if (title && content && tags) {
        const post = {
            title,
            content,
            tags
        };

        fetch('api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(post)
        })
        .then(result => result.status == 200? submitStatus(true): submitStatus(false));
    }
    else {
        alert('Check Your Input and Try Again');
    }
    

    
}

function submitStatus(success){
    $('#draft').empty(); //clears the page of drafting tools
    if (success){
        // $('#draft').addClass('text-center');
        $('#draft').append('<h2 class="text-success text-center">Post Successfully Submitted!</h2>')
    }
}