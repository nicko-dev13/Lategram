import React, { useContext } from 'react';
import Userimage from './Userimage';
import AuthContext from '../../context/auth/authContext';
import PostsComponent from '../displayPosts/PostsComponent';
import { useEffect } from 'react';
import postContext from '../../context/posts/postContext';
import Spinner from '../layout/Spinner';

function Userinfo() {
    const authContext = useContext(AuthContext);

    const PostContext = useContext(postContext);

    const { getPosts, loading, posts } = PostContext;

    useEffect(() => {
        getPosts();
        // eslint-disable-next-line
    }, []);

    const { user } = authContext;

    return (
        <div className='user-info'>
            <div className='info-header'>
                <Userimage width='15vw' />
                <div className='info'>
                    <p>{user.name}</p>
                    <span>
                        {' '}
                        <b>99</b> posts{' '}
                    </span>
                    <span>
                        {' '}
                        <b>420</b> followers{' '}
                    </span>
                    <span>
                        {' '}
                        <b>69</b> following{' '}
                    </span>
                    <p>Also known as pako and cko and mako and kako and taco</p>
                </div>
            </div>
            {!loading && posts !== null ? (
                posts.map((post) => (
                    <PostsComponent key={post._id} post={post} />
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
}

export default Userinfo;
