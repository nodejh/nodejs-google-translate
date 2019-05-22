#!/usr/bin/env node

'use strict';

const {
  detectLanguage,
  listLanguagesWithTarget,
  listLanguages,
  translateText,
  translateTextWithModel,
} = require('./src/index');

require(`yargs`)
  .demandCommand(1)
  .command(
    `detect <text..>`,
    `Detects the language of one or more strings.`,
    {},
    async opts => await detectLanguage(opts.text).catch(console.error)
  )
  .command(
    `list [target]`,
    `Lists available translation languages. To language names in a language other than English, specify a target language.`,
    {},
    async opts => {
      if (opts.target) {
        await listLanguagesWithTarget(opts.target).catch(console.error);
      } else {
        await listLanguages().catch(console.error);
      }
    }
  )
  .command(
    `translate <toLang> <text..>`,
    `Translates one or more strings into the target language.`,
    {},
    async opts =>
      await translateText(opts.text, opts.toLang).catch(console.error)
  )
  .command(
    `translate-with-model <toLang> <model> <text..>`,
    `Translates one or more strings into the target language using the specified model.`,
    {},
    async opts =>
      await translateTextWithModel(opts.text, opts.toLang, opts.model).catch(
        console.error
      )
  )
  .example(`$0 detect "Hello world!"`, `Detects the language of a string.`)
  .example(
    `$0 detect "Hello world!" "Goodbye"`,
    `Detects the languages of multiple strings.`
  )
  .example(
    `$0 list`,
    `Lists available translation languages with names in English.`
  )
  .example(
    `$0 list es`,
    `Lists available translation languages with names in Spanish.`
  )
  .example(
    `$0 translate ru "Good morning!"`,
    `Translates a string into Russian.`
  )
  .example(
    `$0 translate ru "Good morning!" "Good night!"`,
    `Translates multiple strings into Russian.`
  )
  .example(
    `$0 translate-with-model ru nmt "Good morning!" "Good night!"`,
    `Translates multiple strings into Russian using the Premium model.`
  )
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://github.com/nodejh/nodejs-google-translate`)
  .help()
  .strict().argv;

