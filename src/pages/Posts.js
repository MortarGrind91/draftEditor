import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import apiRoutes from '../config/apiRoutes';

import Loader from '../componets/Loader';

const PER_PAGE = 10;

const columns = ['id', 'title', 'body'];

export default function Posts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [archive, setArchive] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * PER_PAGE;

    setOffset(offset);
  };

  const loadPosts = useCallback(
    (data) => {
      const allPosts = data ?? archive;

      const posts = allPosts.slice(offset, offset + PER_PAGE);
      setPosts(posts);
      setPageCount(Math.ceil(allPosts.length / PER_PAGE));
    },
    [offset, archive],
  );

  useEffect(() => {
    if (archive.length === 0) {
      (async () => {
        try {
          const response = await fetch(apiRoutes.GET_POSTS);
          const data = await response.json();
          setArchive(data);
          loadPosts(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
    loadPosts();
  }, [loadPosts, archive.length]);

  if (loading) return <Loader />;

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr className="table-row ">
            {columns.map((column, i) => (
              <th key={i} className="table-column">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="table-row">
              <td className="table-column">
                <Link to={`/post/${post.id}`} className="link">
                  {post.id}
                </Link>
              </td>
              <td className="table-column">{post.title}</td>
              <td className="table-column">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={'react-paginate'}
        activeClassName={'active'}
      />
    </div>
  );
}
