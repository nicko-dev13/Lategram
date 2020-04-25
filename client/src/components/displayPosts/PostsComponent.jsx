import React, { useContext, useEffect } from 'react';
import PostContext from '../../context/posts/postContext';
import postContext from '../../context/posts/postContext';
import Spinner from '../layout/Spinner';

function PostsComponent() {
    const postContext = useContext(PostContext);

    const { posts, loading, getPosts } = postContext;

    useEffect(() => {
        const get_Posts = async () => {
            await getPosts();
        };
        get_Posts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='post-container'>{loading ? <Spinner /> : posts}</div>
    );
}

export default PostsComponent;
