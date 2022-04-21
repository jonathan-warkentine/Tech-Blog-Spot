//Add event listener to the submit button
document.getElementById("submitdraft").addEventListener('click', submitPost);

function submitPost(){
    const content = document.getElementById("content").value;

    if (content) {
        fetch('/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                content,
                post_id: document.getElementById("content").getAttribute('postid')
            })
        })
        .then(result => result.status == 200? submitStatus(true): submitStatus(false));
    }
    else {
        alert('No Comment!!');
    }
}

function submitStatus(success){
    $('#draft').empty(); //clears the page of drafting tools
    if (success){
        // $('#draft').addClass('text-center');
        $('#draft').append('<h2 class="text-success text-center">Post Successfully Submitted!</h2>')
    }
}