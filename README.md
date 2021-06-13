<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [adonis5-scheduler](#adonis5-scheduler)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Creating your first task](#creating-your-first-task)
    - [Starting the scheduler](#starting-the-scheduler)
  - [Thanks](#thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# adonis5-scheduler
> AdonisJS5, cron, cronjob, scheduler

[![travis-image]][travis-url] [![typescript-image]][typescript-url] [![npm-image]][npm-url] [![license-image]][license-url]

This library provides an easy way to schedule recurring tasks for AdonisJS v5.

[![How it works](https://img.youtube.com/vi/QV1EXaaNXv4/0.jpg)](https://www.youtube.com/watch?v=QV1EXaaNXv4 "How it works")

## Installation
Install it:
```bash
npm i adonis5-scheduler
```

Connect all dependences:
```bash
node ace invoke adonis5-scheduler
```

## Usage

### Creating your first task

```bash
node ace make:task MyTaskName
```

### Starting the scheduler
Starting an instance of the kue listener is easy with the included ace command.

The provider looks for jobs in the app/Tasks directory of your AdonisJS project and will automatically register a handler for any tasks that it finds.
```sh
node ace scheduler:run
```

| Name        | Required | Type      | Static | Description                                           |
|-------------|----------|-----------|--------|--------------------------------------------------------|
| schedule    | true     | many      | true   | The schedule for which the task should run. [More docs.](https://github.com/node-schedule/node-schedule#cron-style-scheduling)      |
| handle      | true     | function  | false  | A function that is called for this task.               |

## Thanks

Special thanks to the creator(s) of [AdonisJS](http://adonisjs.com/) for creating such a great framework and [nrempel](https://github.com/nrempel) creator [scheduler package for Adonis v4](https://github.com/nrempel/adonis-scheduler)

[travis-image]: https://img.shields.io/travis/reg2005/adonis5-scheduler/master.svg?style=for-the-badge&logo=travis
[travis-url]: https://travis-ci.org/reg2005/adonis5-scheduler "travis"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/adonis5-scheduler.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/adonis5-scheduler "npm"

[license-image]: https://img.shields.io/npm/l/adonis5-scheduler?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"
