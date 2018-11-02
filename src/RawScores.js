import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/core/styles/withStyles';

import { Article, FormFooter } from './PublicTemplates';
import { RawScoresActions } from './RawScoresActions';

const styles = theme => ({

});

const ScoreRow = (props) => {
  return (
    <TableRow key={props.key} hover>
      <TableCell>{props.score_date}</TableCell>
      <TableCell>{props.score_value}</TableCell>
    </TableRow>
  );
}

const generateQueryUrl = (modeldata) => {
  const endpointUrl = `${process.env.REACT_APP_API_HOST}/csv/${modeldata.id}`;
  const dateParam = `startDate=${modeldata.start_date}&endDate=${modeldata.end_date}`;
  return `${endpointUrl}?${dateParam}`;
}

export default class RawScoresComponent extends React.Component {

  state = {
    page: 0,
    rowsPerPage: 10
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {

    const { modeldata } = this.props;

    const { page, rowsPerPage } = this.state;

    const totalCount = (modeldata.datapoints !== undefined) ? modeldata.datapoints.length : 0;

    return (
      <Article header="Raw Scores">
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>{modeldata.name} (England)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (modeldata.datapoints !== undefined) &&

                modeldata.datapoints
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .reverse()
                .map(point => {
                  return <ScoreRow key={point.score_date} {...point}></ScoreRow>
                })
              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={2}
                  count={totalCount}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  backIconButtonProps={{
                    'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'Next Page',
                  }}
                  ActionsComponent={RawScoresActions}
                  />
              </TableRow>
            </TableFooter>
          </Table>
          <FormFooter>
            <Button href={generateQueryUrl(modeldata)} variant="contained">Export to CSV</Button>
          </FormFooter>
        </Grid>
      </Article>
    );
  }
}

export const RawScores = withStyles(styles)(RawScoresComponent);
