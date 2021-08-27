import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiRoutes from '../config/apiRoutes';

import DraftEditor from '../componets/DraftEditor';
import Loader from '../componets/Loader';

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${apiRoutes.GET_POSTS}/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <Link to="/" className="link link__back">
        &#8592; Go back
      </Link>
      <h1 className="title">{post.title}</h1>
      <DraftEditor body={post.body} />
    </div>
  );
}
