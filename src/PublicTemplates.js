import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export const Article = (props) => (
  <div className="col border rounded p-0">
    <div className="bg-light text-dark form-row m-0 p-2">
      <header>
        <h4>{props.header}</h4>
      </header>
    </div>
    {props.children}
  </div>
);

export const FormFooter = (props) => (
  <div className="bg-light form-row border-top m-0 p-2">
    {props.children}
  </div>
);

export const About = () => {
  return (
    <article className="mb-5 text-content">
      <p>
        i-Sense Flu (version 2; find more about version 1 here) uses Google search data to
        estimate influenza-like illness (flu) rates in England. Daily flu rate estimates reflect on
        data from the past 7 days. This website is supported by the EPSRC IRC
        project <a href="https://www.i-sense.org.uk/">i-sense</a> (Early-Warning Sensing Systems for
        Infectious Diseases) and a Google Research Sponsorship.
      </p>
      <p>
        Note that regional scores (i.e., everything but the scores for "England") are still under
        development. All estimates should be considered as experimental (see the website&apos;s
        disclaimer below).
      </p>

      <header className="mt-5">
        <h3>Research Team</h3>
      </header>
      <p>
        The research team behind i-Sense Flu is based at
        the <a href="http://www.cs.ucl.ac.uk/">Computer Science Department</a> of <a href="http://www.ucl.ac.uk/">University College London</a>.
      </p>
      <dl>
        <dt><a href="http://www.lampos.net">Vasileios Lampos</a></dt><dd>Senior Research Fellow</dd>
        <dt><a href="http://www.cs.ucl.ac.uk/people/D.Guzman.html">David Guzman</a></dt><dd>Lead Software Engineer</dd>
        <dt><a href="http://www0.cs.ucl.ac.uk/people/B.Zou.html">Bin Zou</a></dt><dd>PhD Student</dd>
        <dt><a href="http://mediafutures.cs.ucl.ac.uk/people/IngemarCox/">Ingemar J. Cox</a></dt><dd>Professor in Information Retrieval</dd>
      </dl>
      <dl>
        <dt><strong>Past Members:</strong></dt><dd><a href="http://www.jkg.dk">Jens K. Geyti</a></dd>
      </dl>

      <header className="mt-5">
        <h3>Relevant Publications</h3>
      </header>

      <ListGroup flush>
        <ListGroupItem className="pl-0">
          Vasileios Lampos, Andrew Miller, Steve Crossan and Christian Stefansen. <a href="http://www.nature.com/articles/srep12760">Advances in nowcasting influenza-like illness rates using search query logs</a>. <strong>Scientific Reports</strong>, vol. 5 (12760), 2015. doi:10.1038/srep12760.
        </ListGroupItem>
        <ListGroupItem className="pl-0">
          Vasileios Lampos, Bin Zou and Ingemar J. Cox. <a href="http://dl.acm.org/citation.cfm?doid=3038912.3052622">Enhancing feature selection using word embeddings: The case of flu surveillance</a>. <strong>Proc. of the 2017 World Wide Web Conference</strong>, pp. 695-704, 2017.
        </ListGroupItem>
        <ListGroupItem className="pl-0">
          Vasileios Lampos. <a href="https://arxiv.org/abs/1612.03494">Flu Detector: Estimating influenza-like illness rates from online user-generated content</a>. Technical Report, <strong>Computing Research Repository</strong>, 2016. arXiv:1612.03494.
        </ListGroupItem>
        <ListGroupItem className="pl-0">
          Moritz Wagner, Vasileios Lampos, Ingemar J. Cox and Richard Pebody. <a href="https://www.nature.com/articles/s41598-018-32029-6">The added value of online user-generated content in traditional methods for influenza surveillance</a>. <strong>Scientific Reports</strong>, vol. 8 (13963), 2018. doi:10.1038/s41598-018-32029-6.
        </ListGroupItem>
        <ListGroupItem className="pl-0">
          Vasileios Lampos, Elad Yom-Tov, Richard Pebody and Ingemar J. Cox. <a href="http://link.springer.com/article/10.1007/s10618-015-0427-9">Assessing the impact of a health intervention via user-generated Internet content</a>. <strong>Data Mining and Knowledge Discovery</strong>, vol. 29 (5), pp. 1434-1457, 2015. doi:10.1007/s10618-015-0427-9.
        </ListGroupItem>
        <ListGroupItem className="pl-0">
          Moritz Wagner, Vasileios Lampos, Elad Yom-Tov, Richard Pebody, Ingemar J. Cox. <a href="https://www.jmir.org/2017/12/e416">Estimating the Population Impact of a New Pediatric Influenza Vaccination Program in England Using Social Media Content</a>. <strong>Journal of Medical Internet Research</strong>, vol. 19 (12), 2017. doi:10.2196/jmir.8184.
        </ListGroupItem>
        <ListGroupItem className="pl-0">
          Bin Zou, Vasileios Lampos and Ingemar J. Cox. <a href="https://dl.acm.org/citation.cfm?id=3186050">Multi-Task Learning Improves Disease Models from Web Search</a>. <strong>Proc. of the 2018 World Wide Web Conference</strong>, pp. 87-96, 2018.
        </ListGroupItem>
      </ListGroup>

      <header className="mt-5">
        <h3>Disclaimer</h3>
      </header>
      <p>
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
      </p>

    </article>
  );
};

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
