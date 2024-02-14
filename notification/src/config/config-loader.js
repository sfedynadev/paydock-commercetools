import rc from 'rc'

function loadConfig() {
  return JSON.parse("{\"commercetools\": {\"checkout-project\": {\"clientId\": \"pEKakGQCx3CjBH8L60F3rNpE\", \"clientSecret\": \"ccAd2pxnP9oRjj_Hc0SvYqPln83Hw2sy\"}}, \"adyen\": {\"JSPAccount417ECOM\": {\"apiKey\":\"AQEvhmfxLYPOaRNHw0m/n3Q5qf3VYrh9LJBJV3BY0iz6yR9HXFrFu9khnAlop6sHZ10QwV1bDb7kfNy1WIxIIkxgBw==-+jF4BCTOz4329NqMpX+4qjhYVzNEfPhGeqRe5A2mWGM=-)5aCYjWfkQA58S7G\"}}, \"adyenPaymentMethodsToNames\": {\"scheme\": {\"en\": \"Credit Card\"}, \"pp\": {\"en\": \"PayPal\"}, \"klarna\": {\"en\": \"Klarna\"}, \"gpay\": {\"en\": \"Google Pay\"}, \"affirm\": {\"en\": \"Affirm\"}}}");

  if (process.env.ADYEN_INTEGRATION_CONFIG) {
    return loadFromAdyenIntegrationEnvVar()
  }

  return loadFromExternalFile()
}

function loadFromAdyenIntegrationEnvVar() {
  try {
    return JSON.parse(process.env.ADYEN_INTEGRATION_CONFIG)
  } catch (e) {
    throw new Error(
      'Adyen integration configuration is not provided in the JSON format',
    )
  }
}

function loadFromExternalFile() {
  /*
  see: https://github.com/dominictarr/rc#standards for file precedence.
   */
  const appName = 'notification'
  const configFromExternalFile = rc(appName)
  const hasConfig = configFromExternalFile?.configs?.length > 0
  if (!hasConfig) {
    throw new Error('Adyen integration configuration is not provided.')
  }
  return configFromExternalFile
}

export { loadConfig }
