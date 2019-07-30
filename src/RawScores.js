import React from 'react';
import PropTypes from 'prop-types';

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
import RawScoresActions from './RawScoresActions';

const styles = () => ({

});

const ScoreRow = (props) => {
  const { modelScores, scoreDate } = props;
  return (
    <TableRow hover>
      <TableCell>{scoreDate}</TableCell>
      { modelScores.map(s => (<TableCell key={s.model_id}>{s.score_value}</TableCell>)) }
    </TableRow>
  );
};

ScoreRow.propTypes = {
  modelScores: PropTypes.array.isRequired,
  scoreDate: PropTypes.string.isRequired,
};

export const generateQueryUrl = (modeldata, startDate, endDate) => {
  const modelids = modeldata.map(m => m.id).map(m => `id=${m}`).join('&');
  let apihost = `${process.env.REACT_APP_API_HOST}`;
  apihost += apihost.endsWith('/') ? '' : '/';
  return `${apihost}csv?${modelids}&startDate=${startDate}&endDate=${endDate}&ctype=.csv`;
};

export const generateTableMatrix = (allDates, modeldata) => {
  const matrix = [];
  if (allDates === undefined) {
    return matrix;
  }
  allDates.forEach((ad) => {
    const scoreValues = modeldata.map((m) => {
      const { id } = m;
      const val = m.datapoints.filter(
        p => p.score_date === ad,
      ).map(
        p => p.score_value,
      );
      return {
        model_id: id,
        score_value: val[0],
      };
    });

    const row = {
      scoreDate: ad,
      modelScores: scoreValues,
    };

    matrix.push(row);
  });
  return matrix;
};

class RawScoresComponent extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 10,
  }

  handleChangePage = (page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      allDates, endDate, modeldata, startDate,
    } = this.props;

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
                  modeldata.map(m => (<TableCell key={m.id}>{`${m.name} (England)`}</TableCell>))
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                generateTableMatrix(allDates, modeldata)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (<ScoreRow key={row.scoreDate} {...row} />))
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
            <Button
              href={generateQueryUrl(modeldata, startDate, endDate)}
              variant="contained"
              download
            >
              Export to CSV
            </Button>
          </FormFooter>
        </Grid>
      </Article>
    );
  }
}

RawScoresComponent.propTypes = {
  allDates: PropTypes.array.isRequired,
  endDate: PropTypes.string.isRequired,
  modeldata: PropTypes.array.isRequired,
  startDate: PropTypes.string.isRequired,
};

export const RawScores = withStyles(styles)(RawScoresComponent);
