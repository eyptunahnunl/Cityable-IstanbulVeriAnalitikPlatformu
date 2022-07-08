How to pull data from tweeter?

1. Clone or download the repo to your local machine.
(https://github.com/marquisvictor/Optimized-Modified-GetOldTweets3-OMGOT)
2. Unzip it.
3. cd to the unzipped Optimized-Modified-GetOldTweets3-OMGOT-master folder
4. cd again to the GetOldTweets3-0.0.10 folder inside unzipped Optimized-Modified-GetOldTweets3-OMGOT-master folder, and fire up command prompt or terminal right there. 
5. then run the codes in the examples below. 

## Use Cases

**Use case 1 - Get all the tweets by a user:**

```
python cli.py --username "irekponorVictor"
``` 

**Use case 2 - Get all tweets tweeted from a user since 2015-12-20 20:30:15**:
```
python cli.py --username "irekponorVictor" --since "2015-12-20 20:30:15
```

**Use case 3 - Get all tweets tweeted from a user from January 2019 - December 2019 and save in a csv file**:
```
python cli.py --username "irekponorvictor" --since "2019-01-01" --until "2019-12-31" -o user.csv --csv
```

**Use case 4 - Get tweets from a radius of 1km around a place in Lagos, Nigeria and export them to a csv**
```
python cli.py -g="6.465422, 3.406448, 1km" -o Lagos.csv --csv
```

**Use case 5 - Get every tweet containing the word "governance" from every where**
```
python cli.py -s governance
```
---


To classify gathered data, run the twitAnalyze.py code and got an cvs (Due to data is big, it will take long time)

Data format i csv:
twitID  twitDate  twitTime  twitOwner twitText
