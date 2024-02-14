import rc from 'rc'

function loadConfig() {
  return JSON.parse("{\"commercetools\": {\"commercetoolsProjectKey1\": {\"clientId\": \"xxx\", \"clientSecret\": \"xxx\"}, \"commercetoolsProjectKey2\": {\"clientId\": \"xxx\", \"clientSecret\": \"xxx\"}}, \"adyen\": {\"adyenMerchantAccount1\": {\"apiKey\": \"xxx\"}, \"adyenMerchantAccount2\": {\"apiKey\": \"xxx\"}}, \"adyenPaymentMethodsToNames\": {\"scheme\": {\"en\": \"Credit Card\"}, \"pp\": {\"en\": \"PayPal\"}, \"klarna\": {\"en\": \"Klarna\"}, \"gpay\": {\"en\": \"Google Pay\"}, \"affirm\": {\"en\": \"Affirm\"}}}");

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
  const appName = 'extension'
  /* eslint-disable global-require */
  const configFromExternalFile = rc(appName)
  /* eslint-enable global-require */
  const hasConfig = configFromExternalFile?.configs?.length > 0
  if (!hasConfig) {
    throw new Error('Adyen integration configuration is not provided.')
  }
  return configFromExternalFile
}

export { loadConfig }
