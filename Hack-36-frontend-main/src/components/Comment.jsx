import React from "react"
import { Paper,Typography } from "@mui/material" 
import {RichTextEditor} from "@mantine/rte"
const Comment = ({comment}) => {
    console.log("comment",comment);
    return (
        <Paper
            style={{ width: "100%" }}
            elevation={3}
            sx={{ borderRadius: 1, minHeight: "3.5em", mt: 1, mb: 2, p: 2 }}
          >
            <Typography variant="body1" style={{ color: "grey" }}>
              {comment.name}{"  "} {comment.rating}⭐
            </Typography> 
            <RichTextEditor readOnly={true} value={comment.comment} />
            <Typography variant="caption" style={{ color: "grey" }}>
              {new Date(comment.createdAt).toLocaleString()}

            </Typography>
          </Paper>
    )
}

export default Comment