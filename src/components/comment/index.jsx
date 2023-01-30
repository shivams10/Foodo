import { useEffect, useState } from "react";

import "./index.css";
import StarRating from "../starRating";
import { BsStarFill } from "react-icons/bs";

const Comment = ({ chooseRating }) => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalRating, SetTotalRating] = useState(0);
  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onClickHandler = () => {
    if (name.trim() === "") {
      window.alert("Please Enter Name");
    } else if (comment.trim() === "") {
      window.alert("Please Enter Comment");
    } else if (!rating) {
      window.alert("Please add rating");
    } else {
      setName("");
      setComment("");
      setCommentList([...commentList, { name, comment, rating,file }]);
      calculateTotalRating();
    }
  };

  function calculateTotalRating() {
    setFile(null)
    let Rate = 0;
    commentList.forEach((element) => {
      Rate += element.rating;
    });
    SetTotalRating(Rate / commentList.length);
    chooseRating(totalRating);
  }

  useEffect(() => {
    calculateTotalRating();
    chooseRating(totalRating);
  }, [totalRating, commentList]);

  const onDelete = (id) => {
    const newList = commentList.filter((item, i) => i !== id);
    setCommentList(newList);
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };
  const onNameChangeHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="comment-form">
        <div className="comment-container">
          <h4>Add a Comment</h4>
          <div className="comment-name">
            <label>Name</label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={onNameChangeHandler}
              placeholder="Enter Your Name"
            />
          </div>
          <div className="message">
            <label>Comment</label>
            <textarea
              name="message"
              rows="5"
              value={comment}
              onChange={onChangeHandler}
              placeholder="Add a comment"
            ></textarea>
          </div>
          <div className="image-input">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <StarRating onChange={setRating} />
          <button className="submit-button" onClick={onClickHandler}>
            Submit
          </button>
        </div>
        <div className="comment-list">
          <h4>Comments: {commentList.length}</h4>
          {commentList.length == 0 && (
            <div className="no-comment">Be first to comment</div>
          )}
          {commentList.map(({ name, comment, rating, file }, index) => {
            return (
              <div key={index} className="comment-description">
               {file && <div className="commented-image">
                  <img src={file} />
                </div>}
                <div className="rated">
                  Rated:{" "}
                  {Array.from(Array(rating), (star, index) => {
                    return (
                      <span key={index}>
                        {" "}
                        <BsStarFill className="stars" />
                      </span>
                    );
                  })}
                </div>
                <div className="commented">➤ {comment}</div>
                <div className="commenter">
                  <b>- {name}</b>
                </div>
                <button className="delete" onClick={() => onDelete(index)}>
                  delete
                </button>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comment;
