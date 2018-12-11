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
    <TableRow hover>
      <TableCell>{props.score_date}</TableCell>
      {
        props.model_scores.map(s => {
          return (
            <TableCell key={s.model_id}>{s.score_value}</TableCell>
          );
        })
      }
    </TableRow>
  );
}

export const generateQueryUrl = (modeldata, start_date, end_date) => {
  const modelids = modeldata.map(m => m.id).map(m => `id=${m}`).join('&');
  const endpointUrl = `${process.env.REACT_APP_API_HOST}/csv?${modelids}&`;
  const dateParam = `startDate=${start_date}&endDate=${end_date}`;
  return `${endpointUrl}${dateParam}`;
}

export const generateTableMatrix = (allDates, modeldata) => {
  let matrix = []
  allDates !== undefined && allDates.forEach(ad => {

    const score_values = modeldata.map(m => {
      const id = m.id;
      const val = m.datapoints.filter(
        p => {return p.score_date === ad}
      ).map(
        p => p.score_value
      );
      return {
        model_id: id,
        score_value: val[0]
      };
    });

    const row = {
      score_date: ad,
      model_scores: score_values
    }

    matrix.push(row);
  });
  return matrix;
}

class RawScoresComponent extends React.Component {

  state = {
    page: 0,
    rowsPerPage: 10
  }

  handleChangePage = (page) => (event) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {

    const { allDates, endDate, modeldata, startDate } = this.props;

    const { page, rowsPerPage } = this.state;

    const totalCount = (allDates !== undefined) ? allDates.length : 0;

    return (
      <Article header="Raw Scores">
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {
                  modeldata.map(m => {
                    return (
                      <TableCell key={m.id}>{m.name} (England)</TableCell>
                    );
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                generateTableMatrix(allDates, modeldata)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return <ScoreRow key={row.score_date} {...row} />
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
            <Button href={generateQueryUrl(modeldata, startDate, endDate)} variant="contained">
              Export to CSV
            </Button>
          </FormFooter>
        </Grid>
      </Article>
    );
  }
}

export const RawScores = withStyles(styles)(RawScoresComponent);
