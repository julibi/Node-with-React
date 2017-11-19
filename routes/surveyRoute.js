const _ = require('lodash');
const Path = require('path-parser');
//u get the URL library for free when u install node
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  // app.post('/api/surveys/webhooks', (req, res) => {
  //   const events = _.map(req.body, (event) => {
  //     const pathname= new URL(event.url).pathname;
  //     const p = new Path('/api/surveys/:surveyId/:choice');
  //     //resul of const match will eiter be null or an object like this:
  //     //{ surveyId: '5a106c845949a46aaf3de644', choice: 'no' }
  //     const match = console.log(p.test(pathname));
  //     if (match) {
  //       // return { email: event.email, surveyId: match.surveyId, choice: match.choice }
  //     }
  //   });
  // });
//same as above, just restructured:
    app.post('/api/surveys/webhooks', (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice');
      _.chain(req.body)
      .map(({ email, url }) => {
        console.log(email, url);
      //resul of const match will eiter be null or an object like this:
      //{ surveyId: '5a106c845949a46aaf3de644', choice: 'no' }
      const match = p.test(new URL(url).pathname);
      //match cannot be destructured, because it might be null
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice }
      }
    })
    .compact()
    //this says, look at compactEvents and its email and surveyId, if there is
    //a duplicate, remove them
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne({
        _id: surveyId,
        //this is the record we want to find
        //second argument stands for how we want to update it
        //$ signals mongo operator
        recipients: {
          $elemMatch: { email: email, responded: false }
        }
        }, {
          //$inc is a mongo operator that increments
          //suqre brackets are key interpolation!
          $inc: {[ choice ]: 1},
          //the $ here stands for the recipients elementMatch from above
          //%is like a placeholder here
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec(); //execactually executes the query inside mongodb
    })
    .value();
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      //destructuring
      title,
      subject,
      body,
      recipients: recipients.split(',').map( email => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //Great place to send an email!
    try {
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch(error) {
      res.status(422);
    }
  });
};

