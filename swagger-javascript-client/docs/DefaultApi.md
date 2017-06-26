# HelloWorldApp.DefaultApi

All URIs are relative to *http://localhost:10010/*

Method | HTTP request | Description
------------- | ------------- | -------------
[**hello**](DefaultApi.md#hello) | **GET** /hello | 


<a name="hello"></a>
# **hello**
> InlineResponse200 hello(opts)



Returns &#39;Hello&#39; to the caller

### Example
```javascript
var HelloWorldApp = require('hello_server_app');

var apiInstance = new HelloWorldApp.DefaultApi();

var opts = { 
  'name': "name_example" // String | The name of the person to whom to say hello
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.hello(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **String**| The name of the person to whom to say hello | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

