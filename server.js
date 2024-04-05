const express = require('express');
const app = express();
const port = process.env.port || 5000;

const rootJson = {
  "model_list": [
    {
      "id": 1,
      "name": "Google v2018.07 (experimental)"
    },
    {
      "id": 2,
      "name": "Google v2018.04"
    },
    {
      "id": 3,
      "name": "Google v2019.06"
    },
    {
      "id": 4,
      "name": "Google v2020.02 (5 clusters)"
    },
    {
      "id": 7,
      "name": "Google v2020.11"
    },
    {
      "id": 8,
      "name": "Google v2020.11 (386 query terms)"
    },
    {
      "id": 9,
      "name": "Google v2022.12 (155 queries)"
    },
    {
      "id": 10,
      "name": "Google v2022.12 (222 queries, no logit)"
    },
    {
      "id": 11,
      "name": "Google v2022.12"
    }
  ],
  "rate_thresholds": {
    "low_value": {
      "label": "Low epidemic rate",
      "value": 10.25
    },
    "medium_value": {
      "label": "Medium epidemic rate",
      "value": 21.7
    },
    "high_value": {
      "label": "High epidemic rate",
      "value": 38.78
    },
    "very_high_value": {
      "label": "Very high epidemic rate",
      "value": 50.12
    }
  },
  "model_data": [
    {
      "id": 11,
      "name": "Google v2022.12",
      "average_score": 3.593220937971831,
      "has_confidence_interval": true,
      "start_date": "2023-09-17",
      "end_date": "2024-03-16",
      "data_points": [
        {
          "score_date": "2024-03-16",
          "score_value": 3.2229930929568047,
          "confidence_interval_lower": 1.24295204982847,
          "confidence_interval_upper": 5.2030341360851455
        },
        {
          "score_date": "2024-03-15",
          "score_value": 3.1018490141385833,
          "confidence_interval_lower": 1.1780696734859835,
          "confidence_interval_upper": 5.025628354791187
        },
        {
          "score_date": "2024-03-14",
          "score_value": 2.886870764239783,
          "confidence_interval_lower": 1.0224795613808557,
          "confidence_interval_upper": 4.7512619670987135
        },
        {
          "score_date": "2024-03-13",
          "score_value": 2.66856866092509,
          "confidence_interval_lower": 0.8868442357082192,
          "confidence_interval_upper": 4.450293086141957
        },
        {
          "score_date": "2024-03-12",
          "score_value": 2.3967637171128167,
          "confidence_interval_lower": 0.7229413398978757,
          "confidence_interval_upper": 4.070586094327753
        },
        {
          "score_date": "2024-03-11",
          "score_value": 2.0536990125387367,
          "confidence_interval_lower": 0.566449655233889,
          "confidence_interval_upper": 3.54094836984358
        },
        {
          "score_date": "2024-03-10",
          "score_value": 1.7803929203877702,
          "confidence_interval_lower": 0.45432734826060966,
          "confidence_interval_upper": 3.10645849251493
        },
        {
          "score_date": "2024-03-09",
          "score_value": 1.6315542297669767,
          "confidence_interval_lower": 0.40070876639093567,
          "confidence_interval_upper": 2.8623996931430202
        },
        {
          "score_date": "2024-03-08",
          "score_value": 1.5427777640471634,
          "confidence_interval_lower": 0.37473235025547497,
          "confidence_interval_upper": 2.7108231778388565
        },
        {
          "score_date": "2024-03-07",
          "score_value": 1.48311267833944,
          "confidence_interval_lower": 0.35994633903459533,
          "confidence_interval_upper": 2.6062790176442867
        },
        {
          "score_date": "2024-03-06",
          "score_value": 1.5043048155032401,
          "confidence_interval_lower": 0.35956708653866204,
          "confidence_interval_upper": 2.6490425444678167
        },
        {
          "score_date": "2024-03-05",
          "score_value": 1.5891798494307132,
          "confidence_interval_lower": 0.3794595426049627,
          "confidence_interval_upper": 2.79890015625646
        },
        {
          "score_date": "2024-03-04",
          "score_value": 1.7265006349483365,
          "confidence_interval_lower": 0.399717740858981,
          "confidence_interval_upper": 3.05328352903769
        },
        {
          "score_date": "2024-03-03",
          "score_value": 1.7728498080030366,
          "confidence_interval_lower": 0.4006604222699967,
          "confidence_interval_upper": 3.1450391937360735
        },
        {
          "score_date": "2024-03-02",
          "score_value": 1.7827244937807167,
          "confidence_interval_lower": 0.39965719447885073,
          "confidence_interval_upper": 3.165791793082583
        },
        {
          "score_date": "2024-03-01",
          "score_value": 1.7700351932908334,
          "confidence_interval_lower": 0.400489082762807,
          "confidence_interval_upper": 3.13958130381886
        },
        {
          "score_date": "2024-02-29",
          "score_value": 1.6950976995286933,
          "confidence_interval_lower": 0.3844296694116153,
          "confidence_interval_upper": 3.0057657296457734
        },
        {
          "score_date": "2024-02-28",
          "score_value": 1.5953948746873134,
          "confidence_interval_lower": 0.36339259642826266,
          "confidence_interval_upper": 2.8273971529463666
        },
        {
          "score_date": "2024-02-27",
          "score_value": 1.5154252867501767,
          "confidence_interval_lower": 0.361575716989924,
          "confidence_interval_upper": 2.6692748565104334
        },
        {
          "score_date": "2024-02-26",
          "score_value": 1.4891452601190966,
          "confidence_interval_lower": 0.3892656830483327,
          "confidence_interval_upper": 2.5890248371898634
        },
        {
          "score_date": "2024-02-25",
          "score_value": 1.6040842433486169,
          "confidence_interval_lower": 0.4411881073850583,
          "confidence_interval_upper": 2.7669803793121766
        },
        {
          "score_date": "2024-02-24",
          "score_value": 1.8427693073653166,
          "confidence_interval_lower": 0.508092791415581,
          "confidence_interval_upper": 3.17744582331505
        },
        {
          "score_date": "2024-02-23",
          "score_value": 2.2458367305615603,
          "confidence_interval_lower": 0.61481035342879,
          "confidence_interval_upper": 3.8768631076943265
        },
        {
          "score_date": "2024-02-22",
          "score_value": 2.7329330299511034,
          "confidence_interval_lower": 0.7568024449203966,
          "confidence_interval_upper": 4.709063614981804
        },
        {
          "score_date": "2024-02-21",
          "score_value": 3.174172028738996,
          "confidence_interval_lower": 0.8915646708075501,
          "confidence_interval_upper": 5.456779386670441
        },
        {
          "score_date": "2024-02-20",
          "score_value": 3.5492585357996305,
          "confidence_interval_lower": 0.9971053835737327,
          "confidence_interval_upper": 6.101411688025524
        },
        {
          "score_date": "2024-02-19",
          "score_value": 3.8774473009374533,
          "confidence_interval_lower": 1.09806104244632,
          "confidence_interval_upper": 6.65683355942858
        },
        {
          "score_date": "2024-02-18",
          "score_value": 4.036044771782404,
          "confidence_interval_lower": 1.13285792910492,
          "confidence_interval_upper": 6.9392316144598825
        },
        {
          "score_date": "2024-02-17",
          "score_value": 4.078843416755096,
          "confidence_interval_lower": 1.1303417731848933,
          "confidence_interval_upper": 7.027345060325298
        },
        {
          "score_date": "2024-02-16",
          "score_value": 4.180721696994407,
          "confidence_interval_lower": 1.0874295024514566,
          "confidence_interval_upper": 7.274013891537353
        },
        {
          "score_date": "2024-02-15",
          "score_value": 4.31530195272649,
          "confidence_interval_lower": 1.0047882815910765,
          "confidence_interval_upper": 7.625815623861897
        },
        {
          "score_date": "2024-02-14",
          "score_value": 4.61080143900928,
          "confidence_interval_lower": 1.0140353289367698,
          "confidence_interval_upper": 8.207567549081785
        },
        {
          "score_date": "2024-02-13",
          "score_value": 4.647310398408993,
          "confidence_interval_lower": 0.9974213230292962,
          "confidence_interval_upper": 8.297199473788693
        },
        {
          "score_date": "2024-02-12",
          "score_value": 4.663196754431694,
          "confidence_interval_lower": 0.9676841434420641,
          "confidence_interval_upper": 8.358709365421326
        },
        {
          "score_date": "2024-02-11",
          "score_value": 4.496048524389397,
          "confidence_interval_lower": 0.8666660238746916,
          "confidence_interval_upper": 8.125431024904106
        },
        {
          "score_date": "2024-02-10",
          "score_value": 4.5511087997936,
          "confidence_interval_lower": 0.796406491134222,
          "confidence_interval_upper": 8.30581110845298
        },
        {
          "score_date": "2024-02-09",
          "score_value": 4.7028883063937466,
          "confidence_interval_lower": 0.8403568925542603,
          "confidence_interval_upper": 8.565419720233237
        },
        {
          "score_date": "2024-02-08",
          "score_value": 4.926930701218437,
          "confidence_interval_lower": 0.9164042418782127,
          "confidence_interval_upper": 8.937457160558663
        },
        {
          "score_date": "2024-02-07",
          "score_value": 5.217057043331564,
          "confidence_interval_lower": 0.9619331217561973,
          "confidence_interval_upper": 9.472180964906913
        },
        {
          "score_date": "2024-02-06",
          "score_value": 5.637179535813306,
          "confidence_interval_lower": 0.9871482305840947,
          "confidence_interval_upper": 10.287210841042503
        },
        {
          "score_date": "2024-02-05",
          "score_value": 6.250576360007966,
          "confidence_interval_lower": 0.9635669719138537,
          "confidence_interval_upper": 11.537585748102066
        },
        {
          "score_date": "2024-02-04",
          "score_value": 6.841056076560663,
          "confidence_interval_lower": 0.9545779125094267,
          "confidence_interval_upper": 12.7275342406119
        },
        {
          "score_date": "2024-02-03",
          "score_value": 7.3516443663501505,
          "confidence_interval_lower": 0.9346453170801591,
          "confidence_interval_upper": 13.768643415620133
        },
        {
          "score_date": "2024-02-02",
          "score_value": 7.271698533907958,
          "confidence_interval_lower": 0.8957992578870754,
          "confidence_interval_upper": 13.647597809928834
        },
        {
          "score_date": "2024-02-01",
          "score_value": 7.088686008379767,
          "confidence_interval_lower": 0.8708567037784173,
          "confidence_interval_upper": 13.3065153129811
        },
        {
          "score_date": "2024-01-31",
          "score_value": 6.5829700967928995,
          "confidence_interval_lower": 0.9001530937653853,
          "confidence_interval_upper": 12.2657870998204
        },
        {
          "score_date": "2024-01-30",
          "score_value": 6.659104916288563,
          "confidence_interval_lower": 1.03967285779066,
          "confidence_interval_upper": 12.278536974786434
        },
        {
          "score_date": "2024-01-29",
          "score_value": 7.1514610032636865,
          "confidence_interval_lower": 1.3948201401859268,
          "confidence_interval_upper": 12.908101866341434
        },
        {
          "score_date": "2024-01-28",
          "score_value": 8.320131245264013,
          "confidence_interval_lower": 1.97822213032671,
          "confidence_interval_upper": 14.662040360201301
        },
        {
          "score_date": "2024-01-27",
          "score_value": 8.981938819287013,
          "confidence_interval_lower": 2.4672653123181765,
          "confidence_interval_upper": 15.496612326255834
        },
        {
          "score_date": "2024-01-26",
          "score_value": 9.272466050294357,
          "confidence_interval_lower": 2.7650880073427238,
          "confidence_interval_upper": 15.779844093245964
        },
        {
          "score_date": "2024-01-25",
          "score_value": 9.288999409212634,
          "confidence_interval_lower": 2.86128306070584,
          "confidence_interval_upper": 15.716715757719399
        },
        {
          "score_date": "2024-01-24",
          "score_value": 9.756545740860558,
          "confidence_interval_lower": 2.97611113223525,
          "confidence_interval_upper": 16.53698034948587
        },
        {
          "score_date": "2024-01-23",
          "score_value": 9.708845285811911,
          "confidence_interval_lower": 2.83834271754306,
          "confidence_interval_upper": 16.57934785408077
        },
        {
          "score_date": "2024-01-22",
          "score_value": 9.062522555564835,
          "confidence_interval_lower": 2.5250276683740065,
          "confidence_interval_upper": 15.600017442755666
        },
        {
          "score_date": "2024-01-21",
          "score_value": 8.220302932565,
          "confidence_interval_lower": 2.2246923797630234,
          "confidence_interval_upper": 14.215913485366968
        },
        {
          "score_date": "2024-01-20",
          "score_value": 7.878240557642297,
          "confidence_interval_lower": 2.19088447666005,
          "confidence_interval_upper": 13.565596638624534
        },
        {
          "score_date": "2024-01-19",
          "score_value": 7.927299176937907,
          "confidence_interval_lower": 2.3019921128874468,
          "confidence_interval_upper": 13.552606240988368
        },
        {
          "score_date": "2024-01-18",
          "score_value": 7.967627714141277,
          "confidence_interval_lower": 2.392566418496353,
          "confidence_interval_upper": 13.5426890097862
        },
        {
          "score_date": "2024-01-17",
          "score_value": 7.503902156208189,
          "confidence_interval_lower": 2.31790703202087,
          "confidence_interval_upper": 12.689897280395499
        },
        {
          "score_date": "2024-01-16",
          "score_value": 6.745381280936104,
          "confidence_interval_lower": 2.0392557072940165,
          "confidence_interval_upper": 11.451506854578179
        },
        {
          "score_date": "2024-01-15",
          "score_value": 5.8064921237309095,
          "confidence_interval_lower": 1.6594221539545633,
          "confidence_interval_upper": 9.953562093507246
        },
        {
          "score_date": "2024-01-14",
          "score_value": 5.18905576824518,
          "confidence_interval_lower": 1.35650384699401,
          "confidence_interval_upper": 9.021607689496351
        },
        {
          "score_date": "2024-01-13",
          "score_value": 4.847660390354833,
          "confidence_interval_lower": 1.2050994827595198,
          "confidence_interval_upper": 8.490221297950148
        },
        {
          "score_date": "2024-01-12",
          "score_value": 4.965640816772623,
          "confidence_interval_lower": 1.2198889941373268,
          "confidence_interval_upper": 8.71139263940792
        },
        {
          "score_date": "2024-01-11",
          "score_value": 5.088629356268277,
          "confidence_interval_lower": 1.2514859616297567,
          "confidence_interval_upper": 8.925772750906793
        },
        {
          "score_date": "2024-01-10",
          "score_value": 5.440017584598547,
          "confidence_interval_lower": 1.3623243226077433,
          "confidence_interval_upper": 9.51771084658935
        },
        {
          "score_date": "2024-01-09",
          "score_value": 5.577486262780584,
          "confidence_interval_lower": 1.4254094472882766,
          "confidence_interval_upper": 9.729563078272875
        },
        {
          "score_date": "2024-01-08",
          "score_value": 5.838168396299853,
          "confidence_interval_lower": 1.4981171463532699,
          "confidence_interval_upper": 10.178219646246433
        },
        {
          "score_date": "2024-01-07",
          "score_value": 5.793547124878,
          "confidence_interval_lower": 1.45319275580489,
          "confidence_interval_upper": 10.133901493951102
        },
        {
          "score_date": "2024-01-06",
          "score_value": 5.73899752110137,
          "confidence_interval_lower": 1.39849292584495,
          "confidence_interval_upper": 10.0795021163578
        },
        {
          "score_date": "2024-01-05",
          "score_value": 5.470332454083967,
          "confidence_interval_lower": 1.2582154600333533,
          "confidence_interval_upper": 9.682449448134584
        },
        {
          "score_date": "2024-01-04",
          "score_value": 5.139101645933521,
          "confidence_interval_lower": 1.0540152180188933,
          "confidence_interval_upper": 9.224188073848149
        },
        {
          "score_date": "2024-01-03",
          "score_value": 4.743224694859117,
          "confidence_interval_lower": 0.8122480674893383,
          "confidence_interval_upper": 8.674201322228896
        },
        {
          "score_date": "2024-01-02",
          "score_value": 4.426535965135517,
          "confidence_interval_lower": 0.6524367067901707,
          "confidence_interval_upper": 8.200635223480864
        },
        {
          "score_date": "2024-01-01",
          "score_value": 4.4290752467031895,
          "confidence_interval_lower": 0.6469832919246526,
          "confidence_interval_upper": 8.211167201481727
        },
        {
          "score_date": "2023-12-31",
          "score_value": 4.588407979457361,
          "confidence_interval_lower": 0.6863156073578276,
          "confidence_interval_upper": 8.490500351556888
        },
        {
          "score_date": "2023-12-30",
          "score_value": 5.168463069857434,
          "confidence_interval_lower": 0.7682046901010896,
          "confidence_interval_upper": 9.56872144961377
        },
        {
          "score_date": "2023-12-29",
          "score_value": 5.644798991214778,
          "confidence_interval_lower": 0.831912702309384,
          "confidence_interval_upper": 10.45768528012017
        },
        {
          "score_date": "2023-12-28",
          "score_value": 6.263643283719887,
          "confidence_interval_lower": 0.9265276075993674,
          "confidence_interval_upper": 11.6007589598404
        },
        {
          "score_date": "2023-12-27",
          "score_value": 6.708296725562563,
          "confidence_interval_lower": 1.0362172514010461,
          "confidence_interval_upper": 12.380376199724067
        },
        {
          "score_date": "2023-12-26",
          "score_value": 7.377430917645956,
          "confidence_interval_lower": 1.17585291963703,
          "confidence_interval_upper": 13.579008915654867
        },
        {
          "score_date": "2023-12-25",
          "score_value": 7.734308307687864,
          "confidence_interval_lower": 1.1964332110090599,
          "confidence_interval_upper": 14.272183404366666
        },
        {
          "score_date": "2023-12-24",
          "score_value": 7.551019483295416,
          "confidence_interval_lower": 1.1008967287279734,
          "confidence_interval_upper": 14.001142237862867
        },
        {
          "score_date": "2023-12-23",
          "score_value": 6.64812881498084,
          "confidence_interval_lower": 0.9312944744472057,
          "confidence_interval_upper": 12.364963155514475
        },
        {
          "score_date": "2023-12-22",
          "score_value": 5.554145165814091,
          "confidence_interval_lower": 0.8013054407968431,
          "confidence_interval_upper": 10.306984890831338
        },
        {
          "score_date": "2023-12-21",
          "score_value": 4.90085591481218,
          "confidence_interval_lower": 0.7614062642445134,
          "confidence_interval_upper": 9.040305565379851
        },
        {
          "score_date": "2023-12-20",
          "score_value": 4.8615619653967235,
          "confidence_interval_lower": 0.853586668211871,
          "confidence_interval_upper": 8.869537262581579
        },
        {
          "score_date": "2023-12-19",
          "score_value": 5.377015111789383,
          "confidence_interval_lower": 1.0600971410773037,
          "confidence_interval_upper": 9.693933082501454
        },
        {
          "score_date": "2023-12-18",
          "score_value": 5.917200521762304,
          "confidence_interval_lower": 1.3335157612720465,
          "confidence_interval_upper": 10.50088528225254
        },
        {
          "score_date": "2023-12-17",
          "score_value": 6.497371626594309,
          "confidence_interval_lower": 1.5268208528506602,
          "confidence_interval_upper": 11.467922400337933
        },
        {
          "score_date": "2023-12-16",
          "score_value": 6.962720039841891,
          "confidence_interval_lower": 1.6762747395138267,
          "confidence_interval_upper": 12.249165340169933
        },
        {
          "score_date": "2023-12-15",
          "score_value": 7.483980743052643,
          "confidence_interval_lower": 1.7905757705173564,
          "confidence_interval_upper": 13.177385715587933
        },
        {
          "score_date": "2023-12-14",
          "score_value": 7.484146568557979,
          "confidence_interval_lower": 1.86428654549593,
          "confidence_interval_upper": 13.104006591620033
        },
        {
          "score_date": "2023-12-13",
          "score_value": 6.944354024511767,
          "confidence_interval_lower": 1.82967963033665,
          "confidence_interval_upper": 12.0590284186869
        },
        {
          "score_date": "2023-12-12",
          "score_value": 5.841280719876266,
          "confidence_interval_lower": 1.585814146598527,
          "confidence_interval_upper": 10.09674729315401
        },
        {
          "score_date": "2023-12-11",
          "score_value": 4.956147215226373,
          "confidence_interval_lower": 1.3263611830670534,
          "confidence_interval_upper": 8.585933247385698
        },
        {
          "score_date": "2023-12-10",
          "score_value": 4.294538824432572,
          "confidence_interval_lower": 1.089689472959088,
          "confidence_interval_upper": 7.499388175906056
        },
        {
          "score_date": "2023-12-09",
          "score_value": 3.8323488425681664,
          "confidence_interval_lower": 0.921701660189829,
          "confidence_interval_upper": 6.742996024946503
        },
        {
          "score_date": "2023-12-08",
          "score_value": 3.4663893060899937,
          "confidence_interval_lower": 0.7753924753326421,
          "confidence_interval_upper": 6.157386136847347
        },
        {
          "score_date": "2023-12-07",
          "score_value": 3.214171360145437,
          "confidence_interval_lower": 0.6850350841696612,
          "confidence_interval_upper": 5.743307636121217
        },
        {
          "score_date": "2023-12-06",
          "score_value": 3.1528108543234197,
          "confidence_interval_lower": 0.6901095905270996,
          "confidence_interval_upper": 5.615512118119743
        },
        {
          "score_date": "2023-12-05",
          "score_value": 2.93450163345145,
          "confidence_interval_lower": 0.6287718764512072,
          "confidence_interval_upper": 5.240231390451694
        },
        {
          "score_date": "2023-12-04",
          "score_value": 2.7025906738198096,
          "confidence_interval_lower": 0.5040134932254831,
          "confidence_interval_upper": 4.90116785441413
        },
        {
          "score_date": "2023-12-03",
          "score_value": 2.4441424425833698,
          "confidence_interval_lower": 0.38456963381371195,
          "confidence_interval_upper": 4.50371525135302
        },
        {
          "score_date": "2023-12-02",
          "score_value": 2.3299859435607764,
          "confidence_interval_lower": 0.32378831902055166,
          "confidence_interval_upper": 4.336183568101
        },
        {
          "score_date": "2023-12-01",
          "score_value": 2.22682755162319,
          "confidence_interval_lower": 0.34164567291771597,
          "confidence_interval_upper": 4.1120094303286665
        },
        {
          "score_date": "2023-11-30",
          "score_value": 2.1719831393379567,
          "confidence_interval_lower": 0.35669105649177496,
          "confidence_interval_upper": 3.9872752221841403
        },
        {
          "score_date": "2023-11-29",
          "score_value": 2.11742835451933,
          "confidence_interval_lower": 0.4075317791995303,
          "confidence_interval_upper": 3.827324929839127
        },
        {
          "score_date": "2023-11-28",
          "score_value": 2.14870053792955,
          "confidence_interval_lower": 0.494418884364501,
          "confidence_interval_upper": 3.8029821914946
        },
        {
          "score_date": "2023-11-27",
          "score_value": 2.0899460731941066,
          "confidence_interval_lower": 0.593408701158479,
          "confidence_interval_upper": 3.5864834452297365
        },
        {
          "score_date": "2023-11-26",
          "score_value": 2.084539707763477,
          "confidence_interval_lower": 0.6533908314853794,
          "confidence_interval_upper": 3.5156885840415733
        },
        {
          "score_date": "2023-11-25",
          "score_value": 1.9531310532230035,
          "confidence_interval_lower": 0.633413560711339,
          "confidence_interval_upper": 3.272848545734664
        },
        {
          "score_date": "2023-11-24",
          "score_value": 1.9292083662938933,
          "confidence_interval_lower": 0.6101342164001533,
          "confidence_interval_upper": 3.248282516187633
        },
        {
          "score_date": "2023-11-23",
          "score_value": 1.8102023125984334,
          "confidence_interval_lower": 0.576098099468399,
          "confidence_interval_upper": 3.0443065257284734
        },
        {
          "score_date": "2023-11-22",
          "score_value": 1.9456798057560434,
          "confidence_interval_lower": 0.6081377652058313,
          "confidence_interval_upper": 3.28322184630626
        },
        {
          "score_date": "2023-11-21",
          "score_value": 2.0595372519261534,
          "confidence_interval_lower": 0.6231031051073783,
          "confidence_interval_upper": 3.49597139874493
        },
        {
          "score_date": "2023-11-20",
          "score_value": 2.3642424846131633,
          "confidence_interval_lower": 0.6940117463130392,
          "confidence_interval_upper": 4.034473222913286
        },
        {
          "score_date": "2023-11-19",
          "score_value": 2.5567233055291134,
          "confidence_interval_lower": 0.771268872957873,
          "confidence_interval_upper": 4.342177738100354
        },
        {
          "score_date": "2023-11-18",
          "score_value": 2.65738815331439,
          "confidence_interval_lower": 0.8136729887007563,
          "confidence_interval_upper": 4.501103317928023
        },
        {
          "score_date": "2023-11-17",
          "score_value": 2.4857949549424436,
          "confidence_interval_lower": 0.767829766872716,
          "confidence_interval_upper": 4.203760143012173
        },
        {
          "score_date": "2023-11-16",
          "score_value": 2.25676743680137,
          "confidence_interval_lower": 0.6926395468753598,
          "confidence_interval_upper": 3.8208953267273835
        },
        {
          "score_date": "2023-11-15",
          "score_value": 2.1221011794608065,
          "confidence_interval_lower": 0.6696117115130527,
          "confidence_interval_upper": 3.5745906474085665
        },
        {
          "score_date": "2023-11-14",
          "score_value": 2.157729038056917,
          "confidence_interval_lower": 0.7278243401619336,
          "confidence_interval_upper": 3.5876337359519037
        },
        {
          "score_date": "2023-11-13",
          "score_value": 2.0661535949408933,
          "confidence_interval_lower": 0.7297840171977069,
          "confidence_interval_upper": 3.402523172684083
        },
        {
          "score_date": "2023-11-12",
          "score_value": 1.95818719486581,
          "confidence_interval_lower": 0.7140074261577304,
          "confidence_interval_upper": 3.2023669635738936
        },
        {
          "score_date": "2023-11-11",
          "score_value": 1.8247654201835466,
          "confidence_interval_lower": 0.6816416237406536,
          "confidence_interval_upper": 2.9678892166264466
        },
        {
          "score_date": "2023-11-10",
          "score_value": 1.7909340947193033,
          "confidence_interval_lower": 0.6698983328202884,
          "confidence_interval_upper": 2.911969856618327
        },
        {
          "score_date": "2023-11-09",
          "score_value": 1.7599811043227067,
          "confidence_interval_lower": 0.6600370048665093,
          "confidence_interval_upper": 2.859925203778907
        },
        {
          "score_date": "2023-11-08",
          "score_value": 1.6223121603192368,
          "confidence_interval_lower": 0.5793049723523843,
          "confidence_interval_upper": 2.66531934828609
        },
        {
          "score_date": "2023-11-07",
          "score_value": 1.5402767883476065,
          "confidence_interval_lower": 0.5212587418394551,
          "confidence_interval_upper": 2.5592948348557565
        },
        {
          "score_date": "2023-11-06",
          "score_value": 1.4908868020788633,
          "confidence_interval_lower": 0.48065577023933437,
          "confidence_interval_upper": 2.5011178339183933
        },
        {
          "score_date": "2023-11-05",
          "score_value": 1.5347658822634465,
          "confidence_interval_lower": 0.49973260237735057,
          "confidence_interval_upper": 2.569799162149547
        },
        {
          "score_date": "2023-11-04",
          "score_value": 1.53859384525994,
          "confidence_interval_lower": 0.5098367369427096,
          "confidence_interval_upper": 2.5673509535771735
        },
        {
          "score_date": "2023-11-03",
          "score_value": 1.4986457077945567,
          "confidence_interval_lower": 0.508818909770479,
          "confidence_interval_upper": 2.4884725058186365
        },
        {
          "score_date": "2023-11-02",
          "score_value": 1.4528299823408333,
          "confidence_interval_lower": 0.5066766106233893,
          "confidence_interval_upper": 2.3989833540582732
        },
        {
          "score_date": "2023-11-01",
          "score_value": 1.4869365113951067,
          "confidence_interval_lower": 0.5298592352850551,
          "confidence_interval_upper": 2.4440137875051566
        },
        {
          "score_date": "2023-10-31",
          "score_value": 1.4875590170346769,
          "confidence_interval_lower": 0.5346373307881657,
          "confidence_interval_upper": 2.44048070328119
        },
        {
          "score_date": "2023-10-30",
          "score_value": 1.5039593683177201,
          "confidence_interval_lower": 0.53639769412153,
          "confidence_interval_upper": 2.471521042513917
        },
        {
          "score_date": "2023-10-29",
          "score_value": 1.4457371963898769,
          "confidence_interval_lower": 0.5175875287933153,
          "confidence_interval_upper": 2.373886863986447
        },
        {
          "score_date": "2023-10-28",
          "score_value": 1.4429422960434568,
          "confidence_interval_lower": 0.5259283385432832,
          "confidence_interval_upper": 2.3599562535436367
        },
        {
          "score_date": "2023-10-27",
          "score_value": 1.4316597416004668,
          "confidence_interval_lower": 0.5357504084247288,
          "confidence_interval_upper": 2.3275690747762066
        },
        {
          "score_date": "2023-10-26",
          "score_value": 1.5072350021845533,
          "confidence_interval_lower": 0.5750820066264687,
          "confidence_interval_upper": 2.43938799774264
        },
        {
          "score_date": "2023-10-25",
          "score_value": 1.6179287201959702,
          "confidence_interval_lower": 0.6000892473726437,
          "confidence_interval_upper": 2.6357681930192935
        },
        {
          "score_date": "2023-10-24",
          "score_value": 1.6385280832101998,
          "confidence_interval_lower": 0.5732599842247743,
          "confidence_interval_upper": 2.7037961821956267
        },
        {
          "score_date": "2023-10-23",
          "score_value": 1.6327486790786268,
          "confidence_interval_lower": 0.525590783900433,
          "confidence_interval_upper": 2.73990657425682
        },
        {
          "score_date": "2023-10-22",
          "score_value": 1.626680334073183,
          "confidence_interval_lower": 0.47969377880071895,
          "confidence_interval_upper": 2.77366688934565
        },
        {
          "score_date": "2023-10-21",
          "score_value": 1.8496862585468998,
          "confidence_interval_lower": 0.5200339930365833,
          "confidence_interval_upper": 3.17933852405722
        },
        {
          "score_date": "2023-10-20",
          "score_value": 1.96182420893376,
          "confidence_interval_lower": 0.549010698862256,
          "confidence_interval_upper": 3.37463771900527
        },
        {
          "score_date": "2023-10-19",
          "score_value": 2.0287262741172167,
          "confidence_interval_lower": 0.5778061864818337,
          "confidence_interval_upper": 3.4796463617526068
        },
        {
          "score_date": "2023-10-18",
          "score_value": 1.8954452870441534,
          "confidence_interval_lower": 0.5670952716134066,
          "confidence_interval_upper": 3.2237953024749064
        },
        {
          "score_date": "2023-10-17",
          "score_value": 1.9802052066756,
          "confidence_interval_lower": 0.634578667543049,
          "confidence_interval_upper": 3.3258317458081534
        },
        {
          "score_date": "2023-10-16",
          "score_value": 2.013197080986987,
          "confidence_interval_lower": 0.676212936794267,
          "confidence_interval_upper": 3.350181225179707
        },
        {
          "score_date": "2023-10-15",
          "score_value": 2.1208100945709067,
          "confidence_interval_lower": 0.7362630476954252,
          "confidence_interval_upper": 3.5053571414463867
        },
        {
          "score_date": "2023-10-14",
          "score_value": 2.0004455356647632,
          "confidence_interval_lower": 0.6783648244995167,
          "confidence_interval_upper": 3.32252624683001
        },
        {
          "score_date": "2023-10-13",
          "score_value": 2.07272597796484,
          "confidence_interval_lower": 0.6935263869543528,
          "confidence_interval_upper": 3.4519255689753265
        },
        {
          "score_date": "2023-10-12",
          "score_value": 2.0242991717941803,
          "confidence_interval_lower": 0.6599671098595847,
          "confidence_interval_upper": 3.38863123372877
        },
        {
          "score_date": "2023-10-11",
          "score_value": 2.149178478274377,
          "confidence_interval_lower": 0.7082173178096176,
          "confidence_interval_upper": 3.5901396387391302
        },
        {
          "score_date": "2023-10-10",
          "score_value": 2.13657137172108,
          "confidence_interval_lower": 0.6878598416479479,
          "confidence_interval_upper": 3.5852829017942067
        },
        {
          "score_date": "2023-10-09",
          "score_value": 2.2325220311433767,
          "confidence_interval_lower": 0.6981581292499422,
          "confidence_interval_upper": 3.766885933036813
        },
        {
          "score_date": "2023-10-08",
          "score_value": 2.0862561725667566,
          "confidence_interval_lower": 0.6130815720047843,
          "confidence_interval_upper": 3.5594307731287302
        },
        {
          "score_date": "2023-10-07",
          "score_value": 1.9080035295231432,
          "confidence_interval_lower": 0.5374145922407587,
          "confidence_interval_upper": 3.2785924668055304
        },
        {
          "score_date": "2023-10-06",
          "score_value": 1.7083151009751598,
          "confidence_interval_lower": 0.43371394424580134,
          "confidence_interval_upper": 2.9829162577045203
        },
        {
          "score_date": "2023-10-05",
          "score_value": 1.6479240377773001,
          "confidence_interval_lower": 0.397869370179947,
          "confidence_interval_upper": 2.897978705374653
        },
        {
          "score_date": "2023-10-04",
          "score_value": 1.5849823802483967,
          "confidence_interval_lower": 0.36706613238500463,
          "confidence_interval_upper": 2.802898628111793
        },
        {
          "score_date": "2023-10-03",
          "score_value": 1.5288010452310636,
          "confidence_interval_lower": 0.36166396599069567,
          "confidence_interval_upper": 2.6959381244714336
        },
        {
          "score_date": "2023-10-02",
          "score_value": 1.5488872328402967,
          "confidence_interval_lower": 0.38837984696346833,
          "confidence_interval_upper": 2.7093946187171336
        },
        {
          "score_date": "2023-10-01",
          "score_value": 1.58194020242386,
          "confidence_interval_lower": 0.4286765151324234,
          "confidence_interval_upper": 2.735203889715303
        },
        {
          "score_date": "2023-09-30",
          "score_value": 1.6087515355691533,
          "confidence_interval_lower": 0.459528874687921,
          "confidence_interval_upper": 2.7579741964503897
        },
        {
          "score_date": "2023-09-29",
          "score_value": 1.53244149768738,
          "confidence_interval_lower": 0.43770732706350435,
          "confidence_interval_upper": 2.6271756683112533
        },
        {
          "score_date": "2023-09-28",
          "score_value": 1.4352257971158335,
          "confidence_interval_lower": 0.4021824745720363,
          "confidence_interval_upper": 2.468269119659627
        },
        {
          "score_date": "2023-09-27",
          "score_value": 1.3806627954478865,
          "confidence_interval_lower": 0.3740159947172097,
          "confidence_interval_upper": 2.3873095961785595
        },
        {
          "score_date": "2023-09-26",
          "score_value": 1.3045477774700502,
          "confidence_interval_lower": 0.35327096821485665,
          "confidence_interval_upper": 2.25582458672524
        },
        {
          "score_date": "2023-09-25",
          "score_value": 1.1889078671676916,
          "confidence_interval_lower": 0.302846661562563,
          "confidence_interval_upper": 2.0749690727728165
        },
        {
          "score_date": "2023-09-24",
          "score_value": 1.0411433599123943,
          "confidence_interval_lower": 0.2796209990259117,
          "confidence_interval_upper": 1.8026657207988732
        },
        {
          "score_date": "2023-09-23",
          "score_value": 0.9821481083272977,
          "confidence_interval_lower": 0.2918729569725173,
          "confidence_interval_upper": 1.6724232596820767
        },
        {
          "score_date": "2023-09-22",
          "score_value": 0.9890011276402614,
          "confidence_interval_lower": 0.3406052261916854,
          "confidence_interval_upper": 1.6373970290888369
        },
        {
          "score_date": "2023-09-21",
          "score_value": 1.0160801041950551,
          "confidence_interval_lower": 0.3839426094657837,
          "confidence_interval_upper": 1.6482175989243302
        },
        {
          "score_date": "2023-09-20",
          "score_value": 1.0109624546865754,
          "confidence_interval_lower": 0.4013506730842617,
          "confidence_interval_upper": 1.6205742362888902
        },
        {
          "score_date": "2023-09-19",
          "score_value": 0.998962522529779,
          "confidence_interval_lower": 0.40952834364071866,
          "confidence_interval_upper": 1.58839670141884
        },
        {
          "score_date": "2023-09-18",
          "score_value": 0.9603994283542985,
          "confidence_interval_lower": 0.4025100217392897,
          "confidence_interval_upper": 1.5182888349693069
        },
        {
          "score_date": "2023-09-17",
          "score_value": 0.905614575550489,
          "confidence_interval_lower": 0.3864376691155796,
          "confidence_interval_upper": 1.4247914819854
        }
      ]
    }
  ]
};

app.get("/api/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(rootJson);
});

app.get("/muistatic/about.html", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send('<div>you are about</div>');
});

app.listen(port, () => console.log(`Express listening on port ${port}`));
