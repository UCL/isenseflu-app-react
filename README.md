![i-sense flu](https://res.cloudinary.com/uclfmedia/image/upload/v1563449524/isenseflu/logo_300.svg)

# isense flu app

Frontend component of i-sense flu application. Displays model scores produced by the i-sense flu api component [https://github.com/UCL/isenseflu-api-flask](https://github.com/UCL/isenseflu-api-flask)

![GitHub release](https://img.shields.io/github/release/UCL/isenseflu-app-react.svg)


## Background

i-sense flu is a multi-module application that uses Google search data to estimate influenza-like illness (flu) rates in England. The i-sense flu app module offers a web interface to visualise the data produced by the i-sense flu api module.


## Features

- Charts generated with Chart.js [https://www.chartjs.org/](https://www.chartjs.org/)
- Allows the display of confidence intervals in the chart
- Supports the display of multiple models
- Scores can be downloaded in CSV format


## Technologies

- ECMAScript 6
- React
- Material UI
- Node
- REST


## Installation

### Requirements

- Node >= 6
- npm >= 5.2
- serve (optional)


### Building

Pass the `REACT_APP_API_HOST` variable pointing to the backend component that serves the data for 
Frontend app.

```
REACT_APP_API_HOST=[relative_path_to_api_endpoint] npm run build
```

### Run the app

The web application can be run with `serve` (install with `npm install serve -g`)

```
serve -s build
```

`serve` uses port 5000 by default.


## Reporting bugs

Please use the GitHub issue tracker for any bugs or feature suggestions:

[https://github.com/UCL/isenseflu-app-react/issues](https://github.com/UCL/isenseflu-app-react/issues)


## Contributing

Pull requests are welcome. For major changes, especially changes that require the addition to new dependencies, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. Follow AirBnB Javascript style in both test and target files. Use the version of `eslint` provided by React Create App included in this project.


## Authors

- David Guzman (Github: [@david-guzman](https://github.com/david-guzman))


## Acknowledgements

i-sense flu publish is supported by the EPSRC IRC project [i-sense](https://www.i-sense.org.uk/) (Early-Warning Sensing Systems for Infectious Diseases).


## Copyright

isenseflu-app-react is licensed under the GNU General Public License, v3. A copy of this license is included in the file [LICENSE.md](LICENSE.md).


&copy; 2019 UCL ([https://www.ucl.ac.uk](https://www.ucl.ac.uk)).
