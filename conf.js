const DescribeFailureReporter = require('protractor-stop-describe-on-failure');
var request = require('request-promise');

var data_array=[]
var specresult={}    

var testsuite_name=''
var describe_name=''

var myReporter = {


  jasmineStarted: function(suiteInfo) {
  },

  suiteStarted: async function(result) {
    describe_name=result.description
    try{
        await browser.getProcessedConfig().then((config) => { 
        testsuite_name=config.suite
      }).catch(err =>  console.log(err))
    }
    catch (e) {
      console.log(e)};
  },

  specStarted: function(result) {
     
  },

  specDone: function(result) {
    var specresult={}
    specresult['eventType']='TestResult_2'
    specresult['testsuite']=testsuite_name
    specresult['describe']=describe_name
    specresult['it']=result.description
    specresult['result'] = result.status; 
    data_array.push(specresult);

  },

  suiteDone: async function(result) {
  },

  jasmineDone:  async function(result) {
  }
}

exports.config = {
SELENIUM_PROMISE_MANAGER: false,
  framework: 'jasmine',
  suites: {mysuite1: ['spec1.js','spec2.js']},
 
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
    args: ['--disable-gpu','--disable-dev-shm-usage','--no-sandbox']
    }
  },
  onPrepare: function () {
    
    jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));
    jasmine.getEnv().addReporter(myReporter);
  },

   onComplete: async () => {

    console.log(JSON.stringify(data_array));

    const options ={ 
      uri: "https://insights-collector.newrelic.com/v1/accounts/1614879/events",
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
        "X-Insert-Key": "vuFsXye2t6scXqd-QhVHlXCIsA0twnst"
      },
      body: data_array,
      json:true,
      resolveWithFullResponse: true
    }
    try {
        await request(options).then(function (response) {
            console.log("Post succeeded with status %d", response.statusCode);}).
                catch(function (err) {
                    console.log("Post failed with error: "+err);});
     }
     catch (e) {
      console.log(e)}; 

   }

}
