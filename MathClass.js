/*
 * Math, statistics and sorting related functions
 */

/*
 * Calculates the sum of an array of numbers
 */
exports.calculateSum = function(array){
	var sum = 0;
	
	for(var i=0; i<array.length; i++)
	{
		var tempNum = array[i];
		sum = sum + Number(tempNum);
	}

	return sum;
}


/*
 * Calculates the average of an array of numbers
 */
exports.calculateAverage = function(array)
{
	var sum = this.calculateSum(array);
	var average = sum / array.length;
	return average;
}//end function


/*
 * Calculates the standard deviation for an array of numbers
 * Stddev for population
 */
exports.calculateStandardDeviation = function(array)
{
	var mean = this.calculateAverage(array);
	var sum = 0;
	var total = 0;

	for(var i=0; i<array.length; i++)
	{
		var tempNum = Number(array[i]);
		if(!isNaN(tempNum))
		{
			var distanceFromMean = tempNum - mean;
			var distanceSquare = distanceFromMean * distanceFromMean;
			sum = sum + distanceSquare;
			total++;
		}
	}

	var variance = sum / total; //stdev for population
	var standardDeviation = Math.sqrt(variance);
	
	return standardDeviation;
}


/*
 * Takes a number and rounds it to the number of decimal places
 * Max decimal places is 4
 */
exports.roundWithDecimalPlaces = function(num,places)
{
	if(places == 1){
		places = 10;
	}else if(places == 2){
		places = 100;
	}else if(places == 3){
		places = 1000;
	}else if(places == 4){
		places = 10000;
	}else{
		places = 1;
	}
	
	if(!isNaN(num))
	{
		num = Math.round(num * places) / places;
	}

	return num;
}


/*
 * Calculates the upperbound confidence interval
 * Takes the average, standard deviation, sample size and confidence level (as percent)
 * Confidence levels can only be 50, 60,70,80,90,95,99
 * Returns upperbound of confidence interval
 */
exports.calcualteConfidenceUpper = function(avg, stddev, size, conf)
{
	var marginOfError = this.calculateMarginOrError(avg, stddev, size, conf);
	var upper = avg + marginOfError;
	return upper;
}


/*
 * Calculates the lowerbound confidence interval
 * Takes the average, standard deviation, sample size and confidence level (as percent)
 * Confidence levels can only be 50, 60,70,80,90,95,99
 * Returns lowerbound of confidence interval
 */
exports.calcualteConfidenceLower = function(avg, stddev, size, conf)
{
	var marginOfError = this.calculateMarginOrError(avg, stddev, size, conf);
	var lower = avg - marginOfError;
	return lower;
}//end function

/*
 * Calculates the Margin of Error given a confidence value
 * The Margin of error minus the average equals the lower bound confidence interval
 * The Margin of error plus the average equals the upper bound confidence interval
 * Takes the average, standard deviation, sample size and confidence level (as percent)
 * Confidence levels can only be 50, 60,70,80,90,95,99
 */
exports.calculateMarginOrError = function(avg, stddev, size, conf)
{
	var zScore = getZValue(conf); //Calc Z score
	var sqrtOfSample = Math.sqrt(size); //Calc square root of sample size
	var standardError = stddev / sqrtOfSample; //Calc standard error
	var marginOfError = standardError * zScore; //Calc margin of error
	return marginOfError;
}


/*
 * Returns the Z value for a given critical value
 * Only returns value for 50,60,70,80,90,95,99 confidence values
 */
function getZValue(conf)
{
	if(conf == 50){
		return 0.68;
	}else if(conf == 60){
		return 0.84;
	}else if(conf == 70){
		return 1.04;
	}else if(conf == 80){
		return 1.28
	}else if(conf == 90){
		return 1.645;
	}else if(conf == 95){
		return 1.96;
	}else if(conf == 99){
		return 2.576;
	}else{
		return 0
	}
}


/*
 * Sorts an array of objects
 * Takes the array of objects and the key to sort by (key must be a number type)
 * Sorts from highest to lowest
 * Returns sorted Array
 */
exports.sortArrayOfObjects = function(arr, key)
{
	var swapped;

    do {
    	swapped = false;
    	
        for (var i=0; i < arr.length+1; i++) {
        	if(arr[i+1]){	
        	
        		if (Number(arr[i][key]) < Number(arr[i+1][key])) 
        		{
                	var temp = arr[i];
                	arr[i] = arr[i+1];
                	arr[i+1] = temp;
                	swapped = true;
            	}//end if 
            	
        	}//end if
        }//end for
        
    } while (swapped);

	return arr;
	
}
