import React, { useEffect, useState }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getAccomodationReviews } from "../../api/api";

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

export default function AccomodationReviews({ acc }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAccomodationReviews(acc._id).then((reviews) => {
      setReviews(reviews);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="reviews table">
        <TableHead>
          <TableRow>
            <TableCell >Student</TableCell>
            <TableCell >Review</TableCell>
            <TableCell >Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((r) => (
            <TableRow key={r._id}>
              <TableCell component="th" scope="row">
                {r.student_name}
              </TableCell>
              <TableCell >{r.summary}</TableCell>
              <TableCell >{r?.date?.substring(0,10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}