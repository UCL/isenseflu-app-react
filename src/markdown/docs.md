## The API

As well as the graphs, tables, and CSV exports available from the home page, we also provide an API for programatic access to our data.

### Scores

To fetch score data use the following URL:

```bash
GET /scores?id=[int]&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&resolution=[day|week]&smoothing=[0|3|5|7]
```

#### Request parameters

- `id` - The ID of the model you would like data for
- `startDate` - Start date of requested time period, inclusive. In the format YYYY-MM-DD
- `endDate` - End date of requested time period, inclusive. In the format YYYY-MM-DD
- `resolution` - The density of the data points returned, either day or week
- `smoothing` - Number of days to smooth data over using a moving average filter, either 0, 3, 5 or 7

#### Response

```json
{
  "start_date": "2018-09-01",
  "end_date": "2018-09-16",
  "dates": ["2018-09-16", "2018-09-15", ..., "2018-09-01"],
  "rate_thresholds": {
    "low_value": {
      "label": "Low epidemic rate",
      "value": 13.1
    },
    "high_value": {
      "label": "High epidemic rate",
      "value": 68.7
    },
    "medium_value": {
      "label": "Medium epidemic rate",
      "value": 24.2
    },
    "very_high_value": {
      "label": "Very high epidemic rate",
      "value": 108.9
    }
  },
  "modeldata": [
    {
      "id": 1,
      "name": "Google v2018.07",
      "hasConfidenceInterval": true,
      "average_score": 2.2507245,
      "datapoints": [
        {
          "confidence_interval_lower": 0.0,
          "score_value": 3.682423,
          "score_date": "2018-09-16",
          "confidence_interval_upper": 9.730234
        },
        ...
      ]
    }
  ]
}
```

### Models

To fetch a list of public models available:

```bash
GET /models/
```

#### Response

```json
[
  {
    "name": "Google v2018.07",
    "id": 1
  }
]
```
