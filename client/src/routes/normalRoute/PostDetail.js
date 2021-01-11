import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  USER_LOADING_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  POST_DELETE_REQUEST,
} from "../../redux/types";
import { Button, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom"
import { GrowingSpinner } from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse
} from "@fortawesome/free-solid-svg-icons";
import CKEditor from "@ckeditor/ckeditor5-react";
import BallonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Comments from "../../components/comments/Comment";


const PostDetail = (req) => {
  const dispatch = useDispatch()
  const { postDetail, creatorID, loading, title } = useSelector((state) => state.post)
  const { userId, userName } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)

  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id
    })
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token")
    })
  }, [dispatch, req.match.params.dispatch])

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token")
      }
    })
  }

  const EditButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" claaName="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link to={`/post/${req.match.params.id}/edit`} claaName="btn btn-success btn-block">
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
         </Button>
        </Col>
      </Row>
    </>
  )

  const HomeButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" claaName="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </>
  )

  const Body = (
    <>
      {userId === creatorID ? EditButton : HomeButton};
      <Row className="border-bottom border-top border-primary p-3 mb-3 justity-content-between">
        {(() => {
          if (postDetail && postDetail.creatorID) {
            return (
              <>
                <div className="font-weight-bold text-big">
                  <span className="mr-3">
                    <Button color="info">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end">
                  {postDetail.creator.name}
                </div>
              </>
            )
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span>{postDetail.date}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse} />
            &nbsp;
            <span>{postDetail.views.length}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BallonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(comments)
                ? comments.map(({ contents, creator, date, _id, creatorName }) => (
                  <div key={_id}>
                    <Row className="justify-content-between p-2">
                      <div className="font-wieght-bold">
                        {creatorName ? creatorName : creator}
                      </div>
                      <div className="text-small">
                        <span className="font-weight-bold">
                          {date.split(" ")[0]}
                        </span>
                        <span className="font-weight-light">
                          {" "}
                          {date.split(" ")[1]}
                        </span>
                      </div>
                    </Row>
                    <Row className="p-2">
                      <div>
                        {contents}
                      </div>
                    </Row>
                    <hr />
                  </div>
                ))
                : "Creator"
              }
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              >
              </Comments>
            </Container>
          </Row>
        </>
      ) : ""}
    </>
  )

  return (
    <div>
      <Helmet title={`POST | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  )
}

export default PostDetail;