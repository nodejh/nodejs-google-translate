'use strict';
const chalk = require('chalk');
const ora = require('ora');

async function detectLanguage(text) {
  console.time('detectLanguage');
  // [START translate_detect_language]

  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const text = 'The text for which to detect language, e.g. Hello, world!';

  // Detects the language. "text" can be a string for detecting the language of
  // a single piece of text, or an array of strings for detecting the languages
  // of multiple texts.
  let [detections] = await translate.detect(text);
  detections = Array.isArray(detections) ? detections : [detections];
  console.log('Detections:');
  detections.forEach(detection => {
    console.log(`${detection.input} => ${detection.language}`);
  });

  // [END translate_detect_language]
  console.timeEnd('detectLanguage');
}

async function listLanguages() {
  console.time('listLanguages');
  // [START translate_list_codes]

  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  // Lists available translation language with their names in English (the default).
  const [languages] = await translate.getLanguages();

  console.log('Languages:');
  languages.forEach(language => console.log(language));

  // [END translate_list_codes]
  console.timeEnd('listLanguages');
}

async function listLanguagesWithTarget(target) {
  console.time('listLanguagesWithTarget');
  // [START translate_list_language_names]

  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  // const target = 'The target language for language names, e.g. ru';

  // Lists available translation language with their names in a target language
  const [languages] = await translate.getLanguages(target);

  console.log('Languages:');
  languages.forEach(language => console.log(language));

  // [END translate_list_language_names]
  console.timeEnd('listLanguagesWithTarget');
}

async function translateText(text, target) {
  const timeStart = new Date();
  const spinner = ora({
    text: chalk.grey('Loading...'),
    spinner: 'hearts',
  }).start();

  // [START translate_translate_text]
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const text = 'The text to translate, e.g. Hello, world!';
  // const target = 'The target language, e.g. ru';

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];

  console.log('\n');
  // console.log(chalk.grey('Translations:'));
  translations.forEach((translation, i) => {
    console.log(chalk.green(`${text[i]} => (${target}) ${translation}`));
  });

  console.log('\n');
  spinner.succeed(chalk.grey(`${new Date() - timeStart}ms`));
  // [END translate_translate_text]
}

async function translateTextWithModel(text, target, model) {
  console.time('translateTextWithModel');

  // [START translate_text_with_model]
  // Imports the Google Cloud client library
  const {Translate} = require('@google-cloud/translate');

  // Creates a client
  const translate = new Translate();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const text = 'The text to translate, e.g. Hello, world!';
  // const target = 'The target language, e.g. ru';
  // const model = 'The model to use, e.g. nmt';

  const options = {
    // The target language, e.g. "ru"
    to: target,
    // Make sure your project is whitelisted.
    // Possible values are "base" and "nmt"
    model: model,
  };

  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate(text, options);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
  // [END translate_text_with_model]

  console.timeEnd('translateTextWithModel');
}


module.exports = {
  detectLanguage,
  listLanguagesWithTarget,
  listLanguages,
  translateText,
  translateTextWithModel,
}