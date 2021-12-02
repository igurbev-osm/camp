import { useContext, useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import { SessionContext } from "../../../context/SessionContext";
import _pointServiceF from "./../../../server/point";

const Comments = ({ point, addStack, done }) => {
    const _axios = useContext(SessionContext);    
    const [comments, setComments] = useState([]);
    useEffect(
        () => {
            (async () => {
                const _pointService = _pointServiceF.bind(_axios)();
                setComments(await _pointService.getPointComments(point.id));
            })();
        }, [point.id, _axios]
    );

    return (
        <div className="dialog-content-holder">
            <div className=" comments-container">

                {comments && comments.map(c => <div key={c.id} className="comment-holder">
                    <p className="comment-date"><b>{c.author}</b>: {new Date(c.date).toLocaleDateString("en-UK")}</p>
                    <p className="comment-text">{c.comment}</p>
                </div>)}

            </div>

            <div className="content-footer">
                <Button variant="primary" className="btn-secondary" onClick={() => done(point)} > Close </Button>
            </div>
        </div>
    );
}

export default Comments;