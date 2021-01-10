import React from "react";
import { Badge, Button, Card, CardBody, CardImg, CardTitle, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMouse } from "@fortawesome/free-solid-svg-icons"

const PostCardOne = ({ posts }) => {
  return (
    <>
      {
        Array.isArray(posts) ? posts.map(({ _id, title, fileUrl, comments, views }) => {
          return (
            <div key={_id} className="col-md-4">
              <Link to={`/post/${_id}`} className="text-dark text-decoration-none">
                <Card className="mb-3">
                  <CardImg top alt="카드이미지" src={fileUrl} />
                  <CardBody>
                    <CardTitle className="text-truncate d-flex justify-content-between">
                      <sapn className="text-truncate">{title}</sapn>
                      <sapn>
                        <FontAwesomeIcon icon={faMouse} />
                        &nbsp;&nbsp;
                        <span>{views}</span>
                      </sapn>
                    </CardTitle>
                    <Row>
                      <Button color="primary" className="p-2 btn-block">
                        More <Badge color="light">{comments.length}</Badge>
                      </Button>
                    </Row>
                  </CardBody>
                </Card>
              </Link>

            </div>
          )
        }) : ""
      }
    </>
  )
}

export default PostCardOne;