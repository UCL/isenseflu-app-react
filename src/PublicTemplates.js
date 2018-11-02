import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Divider from '@material-ui/core/Divider';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	paper: {
    //...theme.mixins.gutters(),
    marginBottom: theme.spacing.unit * 3,
  },
	header: {
		padding: theme.spacing.unit,
		backgroundColor: grey[50],
	},
	formToolbar: {
		backgroundColor: grey[100],
		padding: theme.spacing.unit,
	}
});

const anchorStyles = theme => ({
	root: {
    color: 'inherit',
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  primary: {
    color: theme.palette.primary.main,
},
});

const AnchorComponent = (props) => {

	const { children, classes, className, variant, ...other } = props;

	return (
		<a
      className={classNames(
        classes.root,
        {
          [classes.primary]: variant === 'primary',
        },
        className,
      )}
      {...other}
    >
      {children}
		</a>
	);

};

AnchorComponent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary']),
};

const Anchor = withStyles(anchorStyles)(AnchorComponent);

export const ArticleComponent = (props) => {
	return (
		<Paper className={props.classes.paper}>
			<Grid container spacing={0}>
				<Grid item xs={12} className={props.classes.header}>
					<Typography variant="h5" component="h2">
						{props.header}
					</Typography>
				</Grid>
				<Grid container item xs={12}>
					{props.children}
				</Grid>
			</Grid>
		</Paper>
	)
};

ArticleComponent.propTypes = {
  header: PropTypes.string.isRequired
};

export const Article = withStyles(styles, { withTheme: true })(
  ArticleComponent
);


const FormFooterComponent = (props) => (
  <Toolbar variant="dense" className={props.classes.formToolbar} disableGutters>
    {props.children}
  </Toolbar>
);

export const FormFooter = withStyles(styles)(FormFooterComponent);

const AboutComponent = (props) => {
  return (
    <article>
      <Typography variant="body1" gutterBottom>
        i-Sense Flu (version 2; find more about version 1 here) uses Google search data to
        estimate influenza-like illness (flu) rates in England. Daily flu rate estimates reflect on
        data from the past 7 days. This website is supported by the EPSRC IRC
        project <Anchor variant="primary" href="https://www.i-sense.org.uk/">i-sense</Anchor> (Early-Warning Sensing Systems for
        Infectious Diseases) and a Google Research Sponsorship.
      </Typography>
      <Typography variant="body1">
        Note that regional scores (i.e., everything but the scores for "England") are still under
        development. All estimates should be considered as experimental (see the website&apos;s
        disclaimer below).
      </Typography>

      <Typography variant="h6" component="h3">Research Team</Typography>
      <Typography variant="body1">
        The research team behind i-Sense Flu is based at
        the <Anchor variant="primary" href="http://www.cs.ucl.ac.uk/">Computer Science Department</Anchor> of <Anchor variant="primary" href="http://www.ucl.ac.uk/">University College London</Anchor>.
      </Typography>
      <dl>
        <dt><Anchor variant="primary" href="http://www.lampos.net">Vasileios Lampos</Anchor></dt><dd>Senior Research Fellow</dd>
        <dt><Anchor variant="primary" href="http://www.cs.ucl.ac.uk/people/D.Guzman.html">David Guzman</Anchor></dt><dd>Lead Software Engineer</dd>
        <dt><Anchor variant="primary" href="http://www0.cs.ucl.ac.uk/people/B.Zou.html">Bin Zou</Anchor></dt><dd>PhD Student</dd>
        <dt><Anchor variant="primary" href="http://mediafutures.cs.ucl.ac.uk/people/IngemarCox/">Ingemar J. Cox</Anchor></dt><dd>Professor in Information Retrieval</dd>
      </dl>
      <dl>
        <dt><strong>Past Members:</strong></dt><dd><a href="http://www.jkg.dk">Jens K. Geyti</a></dd>
      </dl>

      <Typography variant="h6" component="h3">Relevant Publications</Typography>

			<Typography variant="body1" gutterBottom>
				Vasileios Lampos, Andrew Miller, Steve Crossan and Christian Stefansen. <Anchor variant="primary" href="http://www.nature.com/articles/srep12760">Advances in nowcasting influenza-like illness rates using search query logs</Anchor>. <strong>Scientific Reports</strong>, vol. 5 (12760), 2015. doi:10.1038/srep12760.
			</Typography>
			<Divider />
			<Typography variant="body1" gutterBottom>
				Vasileios Lampos, Bin Zou and Ingemar J. Cox. <Anchor variant="primary" href="http://dl.acm.org/citation.cfm?doid=3038912.3052622">Enhancing feature selection using word embeddings: The case of flu surveillance</Anchor>. <strong>Proc. of the 2017 World Wide Web Conference</strong>, pp. 695-704, 2017.
			</Typography>
			<Divider />
			<Typography variant="body1" gutterBottom>
				Vasileios Lampos. <Anchor variant="primary" href="https://arxiv.org/abs/1612.03494">Flu Detector: Estimating influenza-like illness rates from online user-generated content</Anchor>. Technical Report, <strong>Computing Research Repository</strong>, 2016. arXiv:1612.03494.
			</Typography>
			<Divider />
			<Typography variant="body1" gutterBottom>
				Moritz Wagner, Vasileios Lampos, Ingemar J. Cox and Richard Pebody. <Anchor variant="primary" href="https://www.nature.com/articles/s41598-018-32029-6">The added value of online user-generated content in traditional methods for influenza surveillance</Anchor>. <strong>Scientific Reports</strong>, vol. 8 (13963), 2018. doi:10.1038/s41598-018-32029-6.
			</Typography>
			<Divider />
			<Typography variant="body1" gutterBottom>
				Vasileios Lampos, Elad Yom-Tov, Richard Pebody and Ingemar J. Cox. <Anchor variant="primary" href="http://link.springer.com/article/10.1007/s10618-015-0427-9">Assessing the impact of a health intervention via user-generated Internet content</Anchor>. <strong>Data Mining and Knowledge Discovery</strong>, vol. 29 (5), pp. 1434-1457, 2015. doi:10.1007/s10618-015-0427-9.
			</Typography>
			<Divider />
			<Typography variant="body1" gutterBottom>
				Moritz Wagner, Vasileios Lampos, Elad Yom-Tov, Richard Pebody, Ingemar J. Cox. <Anchor variant="primary" href="https://www.jmir.org/2017/12/e416">Estimating the Population Impact of a New Pediatric Influenza Vaccination Program in England Using Social Media Content</Anchor>. <strong>Journal of Medical Internet Research</strong>, vol. 19 (12), 2017. doi:10.2196/jmir.8184.
			</Typography>
			<Divider />
			<Typography variant="body1">
				Bin Zou, Vasileios Lampos and Ingemar J. Cox. <Anchor variant="primary" href="https://dl.acm.org/citation.cfm?id=3186050">Multi-Task Learning Improves Disease Models from Web Search</Anchor>. <strong>Proc. of the 2018 World Wide Web Conference</strong>, pp. 87-96, 2018.
			</Typography>

      <Typography variant="h6" component="h3">Disclaimer</Typography>
      <Typography variant="body1" component="p">
        The information contained in this web site serves as a demonstration of research currently
        under way at University College London (UCL) and is provided 'as is' without warranty of
        any kind. Any reliance you place on this information is strictly at your own risk. Flu
        Detector is a demonstration of a research product and is used for research purposes only.
        We make no claim for its medical usability. UCL is not responsible for any use of this data.
        Through this web site you are able to link to other web sites which are not under our
        control. Therefore, the inclusion of any links does not necessarily imply a recommendation
        or endorses the view expressed within them. Access to this web site may be suspended
        temporarily and without any notice in circumstances of system failure or maintenance or for
        reasons beyond our control. We reserve the right to remove or alter the content of this
        web site at any time and without prior notice.
      </Typography>

    </article>
  );
};

export const About = withStyles(styles)(AboutComponent);

export const Docs = () => {
  return (
    <article className="mb-4">
      <header>
        <h3>The API</h3>
      </header>
      <p>
        As well as the graphs, tables, and CSV exports available from the home page, we also
        provide an API for programatic access to our data.
      </p>
      <section>
        <header>
          <h4>Scores</h4>
        </header>
        <p>
          To fetch score data use the following URL:
        </p>
        <pre className="bg-light border p-1">
          GET /api/scores/[model-id]?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&resolution=[day|week]&smoothing=[0|3|5|7]
        </pre>
        <header>
          <h5>Request parameters</h5>
        </header>
        <dl className="row">
          <dt className="col-2"><pre>model-id</pre></dt>
          <dd className="col-10">The ID of the model you&apos;d like data for</dd>
          <dt className="col-2"><pre>startDate</pre></dt>
          <dd className="col-10">Start date of requested time period, inclusive. In the format YYYY-MM-DD</dd>
          <dt className="col-2"><pre>endDate</pre></dt>
          <dd className="col-10">End date of requested time period, inclusive. In the format YYYY-MM-DD</dd>
          <dt className="col-2"><pre>resolution</pre></dt>
          <dd className="col-10">The density of the data points returned, either day or week</dd>
          <dt className="col-2"><pre>smoothing</pre></dt>
          <dd className="col-10">Number of days to smooth data over using a moving average filter, either 0, 3, 5 or 7</dd>
        </dl>
        <header>
          <h5>Response</h5>
        </header>
        <pre className="bg-light p-1">
{`{
    "displayModel": true,
    "id": 1,
    "sourceType": "google",
    "average_score": 2.8756543043478264,
    "parameters": {
        "smoothing": 7,
        "georegion": "e"
    },
    "start_date": "2018-09-01",
    "end_date": "2018-09-23",
    "name": "Google v2018.07",
    "datapoints": [
        {
            "score_date": "2018-09-23",
            "score_value": 4.735919,
            "confidence_interval_lower": 0.0,
            "confidence_interval_upper": 10.81382
        }, ....
    ]
}`}
        </pre>
      </section>
      <section>
        <header>
          <h4>Models</h4>
        </header>
        <p>
          To fetch a list of public models available:
        </p>
        <pre className="bg-light border p-1">
          GET /api/models/
        </pre>
        <header>
          <h5>Response</h5>
        </header>
        <pre className="bg-light p-1">
{`[
    {
        "name": "Google v2018.07",
        "id": 1
    }
]`}
        </pre>
      </section>
    </article>
  );
};
