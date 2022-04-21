module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },

    isFav: (postID, favsArr=[]) => {
      console.log(postID, favsArr.map(post => post.id).includes(postID))
      return favsArr.map(post => post.id).includes(postID)? 'true': 'false';
    },

    eq: (val1, val2) => {
      return val1 == val2;
    }
}