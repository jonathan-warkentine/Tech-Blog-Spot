module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },

    isFav: (postID, favsArr=[]) => {
      return favsArr.map(post => post.id).includes(postID)? 'true': 'false';
    }
}