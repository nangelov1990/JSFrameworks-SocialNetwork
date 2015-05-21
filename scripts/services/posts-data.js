"use strict";

SocialNetwork.factory('postsData', function ($resource) {
    var resourse = $resource(
        baseServiceUrl + 'Posts/:id',
        { id: '@id'},
        { update: {
                method: 'PUT'
            }
        });

    function createNewPost(post) {
        return resourse.save(post);
    };

    function getPostById(id) {
        return resourse.get({id: id});
    };

    function editPost(id, postContent) {
        return resourse.update({id: id}, postContent);
    };

    function deletePost(id) {
        return resourse.delete({id: id});
    };

    function getNumberOfPostLikes(id) {
        var idForLikes = id + '/likes';

        return resourse.get({id: idForLikes});
    };

    function getPostLikesUsers(id) {
        var idForLikes = id + '/likes/preview';

        return resourse.get({id: idForLikes});
    };

    function likePost(id) {
        var idOfPost = id + '/likes';
        
        return resourse.getAllResponseHeaders({id: idOfPost});        
    };

    function unlikePost(id) {
        var idOfPost = id + '/likes';

        return resourse.get({id: idOfPost});
    };
});